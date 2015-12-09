
import React from 'react';
import ReactDOM from 'react-dom';

var StarsFrame = React.createClass({
	render (){
		var stars = [];
		var starKey = '';
		for (var i = 0; i < this.props.numberOfStars; i++){
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

});


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
					{this.props.selectedNumbers}
				</div>
			</div>
		);

	}

});

var NumbersFrame = React.createClass({

	render (){

		var numbers = [], 
			className,
			selectedNumbers = this.props.selectedNumbers,
			selectNumber = this.props.selectNumber;

		var numberKey = '';
		for (var i = 1; i < 9; i++){
			numberKey = 'number'+i;
			className = "numbers selected-"+ (selectedNumbers.indexOf(i) >= 0);
			numbers.push(<div className={className} key={numberKey} onClick={selectNumber.bind(null, i)}>{i}</div>);
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
	getInitialState (){
		return {
			numberOfStars: Math.floor(Math.random()*9) + 1,
			selectedNumbers: []
		};
	},

	_selectNumber (clickedNumber){
		if (this.state.selectedNumbers.indexOf(clickedNumber) < 0){
			this.setState({
				selectedNumbers: this.state.selectedNumbers.concat(clickedNumber)
			});
		}

	},

	render (){
		return (
			<div id="game">
				<h2>Play Nine</h2>
				<hr/>
				<div className="clearfix">
					<StarsFrame numberOfStars={this.state.numberOfStars} />
					<ButtonFrame />
					<AnswerFrame selectedNumbers={this.state.selectedNumbers} />
				</div>

				<NumbersFrame selectedNumbers={this.state.selectedNumbers}
							selectNumber={this._selectNumber}/>

			</div>
		);
	}
});


ReactDOM.render(
	<Game />, 
	document.getElementById('container')
);