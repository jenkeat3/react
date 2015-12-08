
import React from 'react';
import ReactDOM from 'react-dom';

var Button = React.createClass({

	render() {
		return (
			<button>Go</button>
		);
	}

});

ReactDOM.render(
	<Button />, 
	document.getElementById('root')
);