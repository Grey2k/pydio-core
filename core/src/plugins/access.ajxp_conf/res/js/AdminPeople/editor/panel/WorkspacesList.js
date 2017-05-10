import WorkspaceCard from '../parameters/WorkspaceCard'
import WorkspaceAcl from '../acl/WorkspaceAcl'
import ParamsMixins from '../parameters/ParamsMixins'

export default React.createClass({

    propTypes:{
        listType:React.PropTypes.oneOf(['acl', 'parameters']),
        roleType:React.PropTypes.oneOf(['user', 'group', 'role']),
        roleParent:React.PropTypes.object,
        roleWrite:React.PropTypes.object,
        roleRead:React.PropTypes.object,
        roleScope:React.PropTypes.object,
        globalData:React.PropTypes.object,
        filterCards:React.PropTypes.func,
        titleOnly:React.PropTypes.bool,
        showModal:React.PropTypes.func,
        hideModal:React.PropTypes.func,
        displayFormPanel:React.PropTypes.bool,
        showGlobalScopes:React.PropTypes.object,
        globalScopesFilterType:React.PropTypes.string,
        initialEditCard:React.PropTypes.string,
        Controller:React.PropTypes.object,
        aclShowPermissionsMask:React.PropTypes.bool
    },

    getDefaultProps(){
        return {listType:'parameters'};
    },

    getInitialState:function(){
        return {
            activeCard: (this.props.initialEditCard?this.props.initialEditCard:null)
        };
    },

    componentWillReceiveProps: function(newProps){
        if(newProps.initialEditCard){
            this.setState({activeCard: (newProps.initialEditCard?newProps.initialEditCard:null)});
        }
    },

    toggleEditMode:function(wsId){
        if(this.state.activeCard == wsId){
            this.setState({activeCard:null});
        }else {
            this.setState({activeCard: wsId});
        }
    },

    render: function(){
        var filterFunc = this.props.filterCards;
        var filter = function(wsId, role){
            if(!filterFunc) return true;
            else return filterFunc(wsId, role);
        };
        var globalData = this.props.globalData || {};
        var pluginsFilter;

        var globalPluginsFilter = function(pluginName){
            if(!globalData.PLUGINS_SCOPES){
                return true;
            }
            var isGlobal = false;
            if(globalData.PLUGINS_SCOPES.GLOBAL_TYPES){
                globalData.PLUGINS_SCOPES.GLOBAL_TYPES.map(function(value){
                    if(pluginName.indexOf(value+'.') === 0 || pluginName == 'core.' + value) {
                        isGlobal = true;
                    }
                });
                if(isGlobal) return false;
            }
            if(globalData.PLUGINS_SCOPES.GLOBAL_PLUGINS) {
                globalData.PLUGINS_SCOPES.GLOBAL_PLUGINS.map(function(p){
                    if(pluginName == p) isGlobal = true;
                });
                if(isGlobal) return false;
            }
            return true;
        };

        if(!this.props.showGlobalScopes){
            // FILTER OUT GLOBAL PLUGINS & CHECK ACTIVE ACCESS & META PLUGINS
            pluginsFilter = function(scopeId, pluginName, paramName){
                if(!globalPluginsFilter(pluginName)){
                    return false;
                }
                var parts = pluginName.split('.');
                var pType = parts[0];
                var pName = parts[1];
                if(globalData.REPOSITORIES_DETAILS && globalData.REPOSITORIES_DETAILS[scopeId]){
                    var driver = globalData.REPOSITORIES_DETAILS[scopeId]['driver'];
                    if(pType == 'access' && pName != driver){
                        // Not the correct access driver
                        return false;
                    }
                    var metas = globalData.REPOSITORIES_DETAILS[scopeId]['meta'];
                    if(['metastore', 'meta', 'index'].indexOf(pType) !== -1 && metas.indexOf(pluginName) === -1){
                        // Meta not active on this workspace, ignore.
                        return false;
                    }
                }
                // Last step could check dependencies on all other plugins....
                return true;
            };
        }else{
            if(this.props.globalScopesFilterType == 'workspace'){
                // FILTER OUT JUST GLOBAL PLUGINS
                pluginsFilter = function(scopeId, pluginName, paramName){
                    return globalPluginsFilter(pluginName);
                };
            }else if(this.props.globalScopesFilterType == 'global'){
                pluginsFilter = function(scopeId, pluginName, paramName){
                    return !globalPluginsFilter(pluginName);
                };
            }else if(this.props.globalScopesFilterType == 'global-noscope'){
                var scopeParams = this.props.roleData.SCOPE_PARAMS;
                pluginsFilter = function(scopeId, pluginName, paramName){
                    if(globalPluginsFilter(pluginName)) return false;
                    if(paramName){
                        for(var key in scopeParams){
                            if (!scopeParams.hasOwnProperty(key)) continue;
                            var parts = scopeParams[key].name.split('/');
                            if(pluginName == parts[1] && paramName == parts[2]) return false;
                        }
                    }
                    return true;
                };
            }
        }

        var workspaces = [], wsLabels, uniqueScope=false;
        if(this.props.showGlobalScopes){
            wsLabels = this.props.showGlobalScopes;
            if(Object.keys(this.props.showGlobalScopes).length == 1){
                uniqueScope = true;
            }
        }else{
            wsLabels = this.props.globalData ? this.props.globalData.REPOSITORIES: {};
        }
        for(var wsId in wsLabels){
            if(!wsLabels.hasOwnProperty(wsId)) continue;
            if(!filter(wsId, this.props.roleRead)) continue;
            if(this.props.displayFormPanel){

                // get parameters
                var params = [];
                var values = {};
                var nameToPlugin={};
                ParamsMixins.browseParams(
                    this.props.roleRead?this.props.roleRead.PARAMETERS:{},
                    this.props.roleParent?this.props.roleParent.PARAMETERS:{},
                    wsId,
                    function(pluginName, paramName, paramValue, paramAttributes, inherited, type){
                        this.push(paramAttributes);
                        values[paramName] = paramValue;
                        nameToPlugin[paramName] = pluginName;
                    }.bind(params),
                    pluginsFilter,
                    'parameter',
                    true,
                    true
                );

                var changeParameter = function(paramName, newValue, oldValue, additionalFormData=null){
                    if(newValue == oldValue) return;
                    this.props.Controller.updateParameter('parameter', 'update', wsId, nameToPlugin[paramName], paramName, newValue, additionalFormData);
                }.bind(this);

                var fp = (
                    <PydioForm.FormPanel
                        key="form"
                        parameters={params}
                        onParameterChange={changeParameter}
                        values={values}
                        binary_context={this.props.Controller.getBinaryContext()}
                        depth={-2}
                    />
                );
                workspaces.push(fp);

            }else{
                if(this.props.listType == 'parameters'){
                    workspaces.push(
                        <WorkspaceCard
                            key={wsId}
                            id={wsId}
                            label={wsLabels[wsId]}
                            titleOnly={this.props.titleOnly}
                            role={this.props.roleRead}
                            roleParent={this.props.roleParent}
                            roleType={this.props.roleType}
                            toggleEdit={this.toggleEditMode}
                            editMode={this.state.activeCard == wsId}
                            editOnly={this.props.editOnly}
                            pluginsFilter={pluginsFilter}
                            showModal={this.props.showModal}
                            hideModal={this.props.hideModal}
                            noParamsListEdit={this.props.noParamsListEdit}
                            uniqueScope={uniqueScope}
                            Controller={this.props.Controller}
                        />
                    );
                }else{
                    workspaces.push(
                        <WorkspaceAcl
                            key={wsId}
                            id={wsId}
                            label={wsLabels[wsId]}
                            titleOnly={this.props.titleOnly}
                            role={this.props.roleWrite}
                            roleParent={this.props.roleParent}
                            showPermissionMask={this.props.aclShowPermissionsMask}
                            supportsFolderBrowsing={!globalData.REPOSITORIES_DETAILS[wsId].scope}
                            pluginsFilter={pluginsFilter}
                            showModal={this.props.showModal}
                            hideModal={this.props.hideModal}
                            uniqueScope={uniqueScope}
                            Controller={this.props.Controller}
                        />
                    );

                }
            }
        }
        return (
            <div className={this.props.displayFormPanel?"":"material-list"}>
                {workspaces}
            </div>
        );
    }

});
