
import React from 'react';
import ReactDOM from 'react-dom';




var StarsFrame = React.createClass({
	render (){
		var numberOfStars = Math.floor(Math.random()*9) + 1;

		var stars = [];
		var starKey = '';
		for (var i = 0; i < numberOfStars; i++){
			starKey = 'star'+i;
			stars.push(<span className="glyphicon glyphicon-star" key={starKey}></span>);
		}

		return (
			<div id="stars-frame">
				<div className="well">
					{stars}
				</div>
			</div>
		);
	}

})

var ButtonFrame = React.createClass({

	render (){
		return (
			<div id="button-frame">
				<button className="btn btn-primary btn-lg">=</button>
			</div>
		);
	}
});

var AnswerFrame = React.createClass({

	render (){
		return (
			<div id="answer-frame">
				<div className="well">
					...
				</div>
			</div>
		);

	}

});

var NumbersFrame = React.createClass({

	render (){

		var numbers = [];


		var numberKey = '';
		for (var i = 1; i < 9; i++){
			numberKey = 'number'+i;
			numbers.push(<div className="number" key={numberKey}>{i}</div>);
		}

		return (
			<div id="numbers-frame">
				<div className="well">
					{numbers}
				</div>
			</div>
		);

	}

});

var Game = React.createClass({

	render (){
		return (
			<div id="game">
				<h2>Play Nine</h2>
				<hr/>
				<div className="clearfix">
					<StarsFrame />
					<ButtonFrame />
					<AnswerFrame />
				</div>

				<NumbersFrame />

			</div>
		);
	}
});


ReactDOM.render(
	<Game />, 
	document.getElementById('container')
);