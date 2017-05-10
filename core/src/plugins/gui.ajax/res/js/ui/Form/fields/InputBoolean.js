import FormMixin from '../mixins/FormMixin'
const React = require('react')
const {Toggle} = require('material-ui')

/**
 * Boolean input
 */
export default React.createClass({

    mixins:[FormMixin],

    getDefaultProps:function(){
        return {
            skipBufferChanges:true
        };
    },

    onCheck:function(event, newValue){
        this.props.onChange(newValue, this.state.value);
        this.setState({
            dirty:true,
            value:newValue
        });
    },

    getBooleanState:function(){
        let boolVal = this.state.value;
        if(typeof boolVal  === 'string'){
            boolVal = (boolVal == "true");
        }
        return boolVal;
    },

    render:function(){
        const boolVal = this.getBooleanState();
        return(
            <span>
                <Toggle
                    toggled={boolVal}
                    onToggle={this.onCheck}
                    disabled={this.props.disabled}
                    label={this.isDisplayForm()?this.props.attributes.label:null}
                    labelPosition={this.isDisplayForm()?'left':'right'}
                />
            </span>
        );
    }

});
