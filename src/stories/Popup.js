/**
 * Created by johnny on 17/01/2017.
 */
import React, {Component, PropTypes} from 'react';
require('../styles/Popup.css');

export default class Popup extends Component {

    static propTypes = {
        open: PropTypes.bool,
        didSelectValue: PropTypes.func,
    };

    static defaultProps = {
        open: false
    };

    onValueSelect = (e) => {
        const value = e.target.innerHTML;
        this.props.didSelectValue(value);
    };

    render() {
        const className = 'modalDialog ' + (this.props.open ? 'open' : '');
        console.log(className);
        return (
            <div id="openModel" className={className}>
                <div>
                    <h2>Choose a player to continue.'X' go first.</h2>
                    <button onClick={this.onValueSelect}>X</button> <button onClick={this.onValueSelect}>O</button>
                </div>
            </div>
        );
    }
}