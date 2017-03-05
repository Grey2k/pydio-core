/*
 * Copyright 2007-2013 Charles du Jeu - Abstrium SAS <team (at) pyd.io>
 * This file is part of Pydio.
 *
 * Pydio is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Pydio is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with Pydio.  If not, see <http://www.gnu.org/licenses/>.
 *
 * The latest code can be found at <https://pydio.com>.
 */

/**
 * Singleton class that manages all actions. Can be called directly using pydio.getController().
 */
class Controller extends Observable{

    /**
     * Standard constructor
     * @param pydioObject Pydio
     * @param dataModelElementId
     */
	constructor(pydioObject, dataModelElementId=null)
	{
        super();
        this._pydioObject = pydioObject;
		this._registeredKeys = new Map();
		this.usersEnabled = pydioObject.Parameters.get("usersEnabled");

		this.subMenus = [];
		this.actions = new Map();
		this.defaultActions = new Map();
		this.toolbars = new Map();
        this._guiActions = new Map();

        this.contextChangedObs = function(event){
            window.setTimeout(function(){
                this.fireContextChange();
            }.bind(this), 0);
        }.bind(this);
        this.selectionChangedObs = function(event){
            window.setTimeout(function(){
                this.fireSelectionChange();
            }.bind(this), 0);
        }.bind(this);

        if(dataModelElementId){
            this.localDataModel = true;
            try{
                this._dataModel = document.getElementById(dataModelElementId).ajxpPaneObject.getDataModel();
            }catch(e){}
            if(this._dataModel) {
                this._connectDataModel();
            }else{
                this._pydioObject.observeOnce("datamodel-loaded-" + dataModelElementId, function(){
                    this._dataModel = document.getElementById(dataModelElementId).ajxpPaneObject.getDataModel();
                    this._connectDataModel();
                }.bind(this));
            }
        }else{
            this.localDataModel = false;
            this._connectDataModel();
        }

        if(this.usersEnabled){
            this._pydioObject.observe("user_logged", function(user){
                this.setUser(user);
            }.bind(this));
            if(this._pydioObject.user) {
                this.setUser(this._pydioObject.user);
            }
        }

	}

    publishActionEvent(eventName, data){
        this._pydioObject.fire(eventName, data);
    }

    _connectDataModel(){
        if(this.localDataModel){
            this._dataModel.observe("context_changed", this.contextChangedObs);
            this._dataModel.observe("selection_changed", this.selectionChangedObs);
            this.loadActionsFromRegistry();
            this._pydioObject.observe("registry_loaded", function(registry){
                this.loadActionsFromRegistry(registry);
            }.bind(this));
        }else{
            this._pydioObject.observe("context_changed", this.contextChangedObs);
            this._pydioObject.observe("selection_changed", this.selectionChangedObs);
            this._dataModel = this._pydioObject.getContextHolder();
        }
    }

    updateGuiActions(actions){
        actions.forEach(function(v, k){
            this._guiActions.set(k, v);
            this.registerAction(v);
        }.bind(this));
        //this.notify("actions_refreshed");
    }

    deleteFromGuiActions(actionName){
        this._guiActions.delete(actionName);
        //this.notify("actions_refreshed");
    }

    refreshGuiActionsI18n(){
        this._guiActions.forEach(function(value, key){
            value.refreshFromI18NHash();
        });
    }
    
    getDataModel(){
        return this._dataModel;
    }

    destroy(){
        if(this.localDataModel && this._dataModel){
            this._dataModel.stopObserving("context_changed", this.contextChangedObs);
            this._dataModel.stopObserving("selection_changed", this.selectionChangedObs);
        }
    }

    getMessage(messageId){
        try{
            return this._pydioObject.MessageHash[messageId];
        }catch(e){
            return messageId;
        }
    }

    uiMountComponents(componentsNodes){
        if(this._pydioObject && this._pydioObject.UI){
            return this._pydioObject.UI.mountComponents(componentsNodes);
        }
    }

    /**
     * COMPATIBILITY METHD
     * @param xmlDoc
     * @returns {*}
     */
    parseXmlMessage(xmlDoc){
        Logger.debug("Controller.parseXmlMessage() is deprecated, use PydioApi instead");
        return PydioApi.getClient().parseXmlMessage(xmlDoc);
    }

    /**
     * Submits a form using Connexion class.
     * @param formName String The id of the form
     * @param post Boolean Whether to POST or GET
     * @param completeCallback Function Callback to be called on complete
     */
    submitForm(formName, post, completeCallback){
        Logger.debug("Controller.submitForm() is deprecated, use PydioApi instead");
        return PydioApi.getClient().submitForm(formName, post, completeCallback);
    }


	/**
	 * Stores the currently logged user object
	 * @param oUser User User instance
	 */
	setUser(oUser)
	{	
		this.oUser = oUser;
		if(oUser != null && oUser.id != 'guest' && oUser.getPreference('lang') != null
			&& oUser.getPreference('lang') != ""
			&& oUser.getPreference('lang') != this._pydioObject.currentLanguage
            && !oUser.lock
            )
		{
            this._pydioObject.loadI18NMessages(oUser.getPreference('lang'));
		}
	}
			
	/**
	 * Filter the actions given the srcElement passed as arguments.
	 * @param actionsSelectorAtt String An identifier among selectionContext, genericContext, a webfx object id
     * @param ignoreGroups Array a list of groups to ignore
	 * @returns Array
	 */
	getContextActions(actionsSelectorAtt, ignoreGroups, onlyGroups)
	{		
		var contextActions = [];
		var defaultGroup;
        var contextActionsGroup = new Map();
		this.actions.forEach(function(action){
			if(!action.context.contextMenu && !(onlyGroups && onlyGroups.length)) return;
			if(actionsSelectorAtt == 'selectionContext' && !action.context.selection) return;
			if(actionsSelectorAtt == 'directoryContext' && !action.context.dir) return;
			if(actionsSelectorAtt == 'genericContext' && action.context.selection) return;
			if(action.contextHidden || action.deny) return;
            action.context.actionBarGroup.split(',').forEach(function(barGroup){
                if(!contextActionsGroup.has(barGroup)){
                    contextActionsGroup.set(barGroup, []);
                }
            });
            var isDefault = false;
			if(actionsSelectorAtt == 'selectionContext'){
				// set default in bold
				var userSelection = this._dataModel;
				if(!userSelection.isEmpty()){
					var defaultAction = 'file';
					if(userSelection.isUnique() && (userSelection.hasDir() || userSelection.hasMime(['ajxp_browsable_archive']))){
						defaultAction = 'dir';
					}
					if(this.defaultActions.get(defaultAction) && action.options.name == this.defaultActions.get(defaultAction)){
						isDefault = true;
					}
				}
			}
            action.context.actionBarGroup.split(',').forEach(function(barGroup){
                let menuItem = action.getMenuData();
                menuItem.isDefault = isDefault;
                contextActionsGroup.get(barGroup).push(menuItem);
                if(isDefault){
                    defaultGroup = barGroup;
                }
            });
		}.bind(this));
        var first = true, keys = [];
        for(var k of contextActionsGroup.keys()){
            if(defaultGroup && k == defaultGroup) continue;
            keys.push(k);
        }
        keys.sort();
        if(defaultGroup && contextActionsGroup.has(defaultGroup)){
            keys.unshift(defaultGroup);
        }
        let actionsPushed = {};
        keys.map(function(key){
            var value = contextActionsGroup.get(key);
            if(!first){
                contextActions.push({separator:true});
            }
            if(ignoreGroups && ignoreGroups.indexOf(key) !== -1){
                return;
            }
            if(onlyGroups && onlyGroups.indexOf(key) === -1){
                return;
            }
            first = false;
            value.forEach(function(mItem){
                const actionId = mItem.action_id;
                if(!actionsPushed[actionId]){
                    contextActions.push(mItem);
                    actionsPushed[actionId] = true;
                }
            });
        });
		return contextActions;
	}
	

    getToolbarsActions(toolbarsList = [], groupOtherList = []){

        let toolbars = new Map(), groupOtherBars = new Map();
        let lastTbarAdded;
        this.actions.forEach(function(action){
            if(action.context.actionBar){
                action.context.actionBarGroup.split(",").map(function(barGroup){
                    if(toolbarsList.indexOf(barGroup) === -1 && groupOtherList.indexOf(barGroup) === -1 ) {
                        return;
                    }
                    let tBarUpdate = (toolbarsList.indexOf(barGroup) !== -1 ? toolbars : groupOtherBars);
                    if(tBarUpdate.get(barGroup) == null){
                        tBarUpdate.set(barGroup, []);
                    }
                    tBarUpdate.get(barGroup).push(action);
                    if(tBarUpdate === toolbars){
                        lastTbarAdded = barGroup;
                    }
                }.bind(this));
            }
        }.bind(this));

        // Regroup actions artificially
        if(groupOtherList.length){
            var submenuItems = [];
            groupOtherList.map(function(otherToolbar){

                var otherActions = groupOtherBars.get(otherToolbar);
                if(!otherActions) return;
                otherActions.map(function(act){
                    submenuItems.push({actionId:act});
                });
                if(groupOtherList.indexOf(otherToolbar) < groupOtherList.length - 1){
                    submenuItems.push({separator:true});
                }

            }.bind(this) );
            var moreAction = new Action({
                name:'group_more_action',
                icon_class:'icon-none',
                text:MessageHash[456],
                title:MessageHash[456],
                hasAccessKey:false,
                subMenu:true,
                callback:function(){}
            }, {
                selection:false,
                dir:true,
                actionBar:true,
                actionBarGroup:'get',
                contextMenu:false,
                infoPanel:false

            }, {}, {}, {dynamicItems: submenuItems});
            this.registerAction(moreAction);
            this.actions.set("group_more_action", moreAction);
            toolbars.set('MORE_ACTION', [moreAction]);
        }

        return toolbars;

    }

	/**
	 * Generic method to get actions for a given component part.
	 * @param ajxpClassName String 
	 * @param widgetId String
	 * @returns []
	 */
	getActionsForAjxpWidget(ajxpClassName, widgetId){
		var actions = [];
		this.actions.forEach(function(action){
			if(action.context.ajxpWidgets && (
                action.context.ajxpWidgets.indexOf(ajxpClassName+'::'+widgetId) != -1
                ||
                action.context.ajxpWidgets.indexOf(ajxpClassName) != -1
                )
                && !action.deny) actions.push(action);
		});
		return actions;		
	}
	
	/**
	 * Finds a default action and fires it.
	 * @param defaultName String ("file", "dir", "dragndrop", "ctrldragndrop")
	 */
	fireDefaultAction(defaultName){
		var actionName = this.defaultActions.get(defaultName); 
		if(actionName){
			arguments[0] = actionName;
			if(actionName == "ls"){
				var action = this.actions.get(actionName);
				if(action) action.enable(); // Force enable on default action
			}
			this.fireAction.apply(this, arguments);
		}
	}
	
	/**
	 * Fire an action based on its name
	 * @param actionName String The name of the action
	 */
	fireAction (actionName)	{
		var action = this.actions.get(actionName);
		if(action != null) {
			var args = Array.from(arguments).slice(1);
			action.apply(args);
		}
	}
	
	/**
	 * Registers an accesskey for a given action. 
	 * @param key String The access key
	 * @param actionName String The name of the action
	 * @param optionnalCommand String An optionnal argument 
	 * that will be passed to the action when fired.
	 */
	registerKey(key, actionName, optionnalCommand){		
		if(optionnalCommand){
			actionName = actionName + "::" + optionnalCommand;
		}
		this._registeredKeys.set(key.toLowerCase(), actionName);
	}
	
	/**
	 * Remove all registered keys.
	 */
	clearRegisteredKeys(){
		this._registeredKeys = new Map();
	}
	/**
	 * Triggers an action by its access key.
	 * @param keyName String A key name
	 */
	fireActionByKey(keyName)
	{	
		if(this._registeredKeys.get(keyName))
		{
			if(this._registeredKeys.get(keyName).indexOf("::")!==-1){
				var parts = this._registeredKeys.get(keyName).split("::");
				this.fireAction(parts[0], parts[1]);
			}else{
				this.fireAction(this._registeredKeys.get(keyName));
			}
			return true;
		}
		return false;
	}
	
	/**
	 * Complex function called when drag'n'dropping. Basic checks of who is child of who.
	 * @param fileName String The dragged element 
	 * @param destDir String The drop target node path
	 * @param destNodeName String The drop target node name
	 * @param copy Boolean Copy or Move
	 */
	applyDragMove(fileName, destDir, destNodeName, copy)
	{
		if((!copy && (!this.defaultActions.has('dragndrop') || this.getDefaultAction('dragndrop').deny)) ||
			(copy && (!this.defaultActions.has('ctrldragndrop')||this.getDefaultAction('ctrldragndrop').deny))){
			return;
		}
        var fileNames;
		if(fileName == null) fileNames = this._dataModel.getFileNames();
		else fileNames = [fileName];
        // Check that dest is not the direct parent of source, ie current rep!
        if(destDir == this._dataModel.getContextNode().getPath()){
            this._pydioObject.displayMessage('ERROR', MessageHash[203]);
            return;
        }
        // Check that dest is not child of source it self
        for(var i=0; i<fileNames.length;i++){
            if(destDir.lastIndexOf(fileNames[i],0) === 0){
                this._pydioObject.displayMessage('ERROR', MessageHash[202]);
                return;
            }
        }
        var params = {};
        params['get_action'] = this.defaultActions.get(copy?'ctrldragndrop':'dragndrop');
        params['nodes[]'] = fileNames;
        params['dest'] = destDir;
        params['dir'] = this._dataModel.getContextNode().getPath();
        PydioApi.getClient().request(params, function(transport){
            this.parseXmlMessage(transport.responseXML);
        }.bind(PydioApi.getClient()));
	}
	
	/**
	 * Get the action defined as default for a given default string
	 * @param defaultName String
	 * @returns Action
	 */
	getDefaultAction (defaultName){
		if(this.defaultActions.has(defaultName)){
			return this.actions.get(this.defaultActions.get(defaultName));
		}
		return null;
	}

	/**
	 * Spreads a selection change to all actions and to registered components 
	 * by triggering ajaxplorer:actions_refreshed event.
	 */
	fireSelectionChange(){
		this.actions.forEach(function(action){
			action.fireSelectionChange(this._dataModel);
		}.bind(this));
        this.notify("actions_refreshed");
	}
	
	/**
	 * Spreads a context change to all actions and to registered components 
	 * by triggering ajaxplorer:actions_refreshed event.
	 */
	fireContextChange(){
		this.actions.forEach(function(action){
			action.fireContextChange(this._dataModel,
                                     this.usersEnabled,
									 this.oUser);
		}.bind(this));
        this.notify("actions_refreshed");
	}

	notify(eventName, memo){
        if(this.localDataModel){
            super("actions_refreshed", memo);
        }else{
            this._pydioObject.fire("actions_refreshed");
        }
    }

	/**
	 * Remove all actions
	 */
	removeActions(){
		this.actions.forEach(function(action){
			action.remove();
		});
		this.actions = new Map();
		this.clearRegisteredKeys();
	}
	
	/**
	 * Create actions from XML Registry
	 * @param registry DOMDocument
	 */
	loadActionsFromRegistry (registry=null){
        if(!registry) {
            registry = pydio.getXmlRegistry();
        }
		this.removeActions();
		this.parseActions(registry);
        this._guiActions.forEach(function(act){
            this.registerAction(act);
        }.bind(this));
        this.notify("actions_loaded");
		this.fireContextChange();
		this.fireSelectionChange();		
	}
	
	/**
	 * Registers an action to this manager (default, accesskey).
	 * @param action Action
	 */
	registerAction (action){
		var actionName = action.options.name;
		this.actions.set(actionName, action);
		if(action.defaults){
			for(var key in action.defaults) {
                if(action.defaults.hasOwnProperty(key)){
                    this.defaultActions.set(key, actionName);
                }
            }
		}
		if(action.options.hasAccessKey){
			this.registerKey(action.options.accessKey, actionName);
		}
		if(action.options.specialAccessKey){
			this.registerKey("key_" + action.options.specialAccessKey, actionName);
		}
		action.setManager(this);
	}
	
	/**
	 * Parse an XML action node and registers the action
	 * @param documentElement DOMNode The node to parse
	 */
	parseActions(documentElement){		
		var actions = XMLUtils.XPathSelectNodes(documentElement, "actions/action");
		for(var i=0;i<actions.length;i++){
			if(actions[i].nodeName != 'action') continue;
            if(actions[i].getAttribute('enabled') == 'false') continue;
			var newAction = new Action();
            newAction.setManager(this);
			newAction.createFromXML(actions[i]);
			this.registerAction(newAction);
		}
	}
	/**
	 * Find an action by its name
	 * @param actionName String
	 * @returns Action
	 */
	getActionByName (actionName){
		return this.actions.get(actionName);		
	}

}