/**
 * Created by johnny on 15/01/2017.
 */
import React, {Component} from 'react'
import Popup from './Popup';
require('../styles/App.css');

export default class App extends Component {

    constructor() {
        super();
        var inputs = [];
        for (var i=0;i<9;i++){
            inputs.push(undefined);
        }
        this.state = {
            inputs: inputs,
            input: 'X',
            openModal: false,
        };
        this.selectedInput = 'X';
    }

    componentDidMount() {
        var that = this;
        setTimeout(function(){
            that.setState({openModal: true});
        }, 1000)
    }

    onSelectedInputChange = (e) => {
        this.selectedInput = e;
        this.setState({openModal: false});
        const that = this;
        if (e === 'O') {
            setTimeout(function () {
                that.aiMove()
            }, 500);
        }
    };

    aiMove = () => {
        if (this.state.input == this.selectedInput) {
            return
        }
        var index = 0;
        const inputs = this.state.inputs;
        if (inputs.toString() === ',,,,,,,,'){
            index = Math.floor(Math.random()*8);
        }else {
            while (inputs[index]) {
                index = Math.floor(Math.random() * 8);
            }
        }
        this.handleMove(index);
    }

    onInputClick = (e) => {
        const id = e.target.id;
        // const input = this.state.input;
        var that = this
        this.handleMove(id, function () {
            const {inputs,input} = that.state;
            if (!inputs.includes(undefined)) {
                return
            }
            if (input != this.selectedInput) {
                that.aiMove()
            }
        });
    };

    handleMove = (id, func) => {
        var tmpInpus = this.state.inputs;
        if (tmpInpus[id]) {
            return
        }
        tmpInpus[id] = this.state.input;
        const input = this.state.input === 'X' ? 'O' : 'X';
        this.setState({inputs: tmpInpus, input: input}, func);
        const result = this.checkWinner()
        if (!result) {
            return
        }else {
            if (result == true) {
                alert('tie!')
            } else {
                alert('winner ' + result)
            }
            const initInputs = this.state.inputs.map(function(v){
                return undefined
            });
            this.setState({inputs: initInputs, input: 'X'});
            const that = this;
            if (this.selectedInput == 'O') {
                setTimeout(function () {
                    that.aiMove()
                }, 500);
            }
        }
    }

    checkWinner = () => {
        const rules = [
            [0,1,2],
            [3,4,5],
            [6,7,8],
            [0,3,6],
            [1,4,7],
            [2,5,8],
            [0,4,8],
            [2,4,6],
        ];
        const inputs = this.state.inputs;
        for (var i=0;i<rules.length;i++){
            const rule = rules[i];
            if (inputs[rule[0]] &&
                inputs[rule[0]] == inputs[rule[1]] &&
                inputs[rule[1]] == inputs[rule[2]]){
                return inputs[rule[0]];
            }
        }
        for (var j=0;j<inputs.length;j++){
            if (!inputs[j]){
                return undefined
            }
        }
        return true
    }

    render() {

        var components = [];
        for (var i=0;i<this.state.inputs.length;i++){
            components.push(<button id={i} key={i} onClick={this.onInputClick}>{this.state.inputs[i]}</button>)
        }

        return (
            <div>
                <h2>Hint: 'X' goes first</h2>
                <h2>Next player: {this.state.input}</h2>
                <div className="container">
                    <div className="content">
                        {components}
                    </div>
                </div>
                <Popup open={this.state.openModal} didSelectValue={this.onSelectedInputChange}/>
            </div>
        );
    }
}