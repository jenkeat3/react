
import React from 'react';
import ReactDOM from 'react-dom';

var Button = React.createClass({

	getInitialState(){
		return {
			button_go: 1
		};
	},

	handleClick(){
		this.setState({button_go: this.state.button_go + 1});
	},

	render() {
		return (
			<button onClick={this.handleClick}>{this.state.button_go}</button>
		);
	}
});

ReactDOM.render(
	<Button />, 
	document.getElementById('root')
);