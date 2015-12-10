
import React from 'react';
import ReactDOM from 'react-dom';

// bit.ly//s-pcs
var _possibleCombinationSum = function(arr, n) {
  if (arr.indexOf(n) >= 0) { return true; }
  if (arr[0] > n) { return false; }
  if (arr[arr.length - 1] > n) {
    arr.pop();
    return _possibleCombinationSum(arr, n);
  }
  var listSize = arr.length, combinationsCount = (1 << listSize)
  for (var i = 1; i < combinationsCount ; i++ ) {
    var combinationSum = 0;
    for (var j=0 ; j < listSize ; j++) {
      if (i & (1 << j)) { combinationSum += arr[j]; }
    }
    if (n === combinationSum) { return true; }
  }
  return false;
};



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
		var disabled, button, correct = this.props.correct;

		switch(correct){
			case true:
				button = (
					<button className="btn btn-success btn-lg" onClick={this.props.acceptAnswer}>
						<span className="glyphicon glyphicon-ok"></span>
					</button>
				);
				break;
			case false:
				button = (
					<button className="btn btn-danger btn-lg">
						<span className="glyphicon glyphicon-remove"></span>
					</button>
				);
				break;
			default:
				disabled = (this.props.selectedNumbers.length === 0);
				button = (
					<button className="btn btn-primary btn-lg" disabled={disabled}
						onClick={this.props.checkAnswer}>=</button>
				);
		}

		

		return (
			<div id="button-frame">
				{button}
				<br/><br/>
				<button className="btn btn-warning btn-xs" onClick={this.props.redraw} disabled={this.props.redraws === 0}>
					<span className="glyphicon glyphicon-refresh"></span>
					&nbsp;{this.props.redraws}
				</button>
			</div>
		);
	}
});

var AnswerFrame = React.createClass({

	render (){
		var props = this.props;
		var answerKey;
		var selectedNumbers = props.selectedNumbers.map(function(i){
			answerKey = "answer"+i;
			return (
				<span onClick={props.unselectedNumber.bind(null, i)} key={answerKey}>{i}</span>
			);
		});
		return (
			<div id="answer-frame">
				<div className="well">
					{selectedNumbers}
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
			selectNumber = this.props.selectNumber,
			usedNumbers = this.props.usedNumbers;

		var numberKey = '';
		for (var i = 1; i <= 9; i++){
			numberKey = 'number'+i;
			className = "numbers selected-"+ (selectedNumbers.indexOf(i) >= 0);
			className += " used-" + (usedNumbers.indexOf(i) >= 0);
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

var DoneFrame = React.createClass({

	render(){
		return (
			<div className="well text-center">
				<h2>{this.props.doneStatus}</h2>
				<button className="btn btn-default" onClick={this.props.resetGame}>Play again</button>
			</div>
		);
	}

});

var Game = React.createClass({
	getInitialState (){
		return {
			numberOfStars:this._randomNumber(),
			selectedNumbers: [],
			usedNumbers: [],
			redraws: 5,
			correct: null,
			doneStatus: null
		};
	},

	_resetGame (){
		this.replaceState(this.getInitialState());
	},


	_randomNumber (){
		return Math.floor(Math.random()*9) + 1;
	},

	_selectNumber (clickedNumber){
		if (this.state.selectedNumbers.indexOf(clickedNumber) < 0){
			this.setState({
				selectedNumbers: this.state.selectedNumbers.concat(clickedNumber),
				correct: null
			});
		}

	},

	_unselectedNumber (clickedNumber){
		var selectedNumbers = this.state.selectedNumbers,
			indexOfNumber = selectedNumbers.indexOf(clickedNumber);

			selectedNumbers.splice(indexOfNumber, 1);

			this.setState({
				selectedNumbers: selectedNumbers,
				correct: null
			});
	},

	_checkAnswer (){
		var correct = (this.state.numberOfStars === this._sumOfSelectedNumbers());
		this.setState({ correct: correct});
	},

	_sumOfSelectedNumbers (){
		return this.state.selectedNumbers.reduce(function(p, n){
			return p+n;
		}, 0);
	},

	_acceptAnswer (){
		var usedNumbers = this.state.usedNumbers.concat(this.state.selectedNumbers);
		this.setState({
			selectedNumbers: [],
			usedNumbers: usedNumbers,
			correct: null,
			numberOfStars: this._randomNumber()
		}, function(){
			this._updateDoneStatus();
		});

	},

	_redraw (){
		if (this.state.redraws > 0){
			this.setState({
				numberOfStars: this._randomNumber(),
				correct: null,
				selectedNumbers: [],
				redraws: this.state.redraws - 1
			}, function(){
				this._updateDoneStatus();
			});
		}

	},

	_possibleSolution(){
		var numberOfStars = this.state.numberOfStars,
			possibleNumbers = [],
			usedNumbers = this.state.usedNumbers;

		for (var i = 1; i <= 9; i++) {
			if (usedNumbers.indexOf(i) < 0){
				possibleNumbers.push(i);
			}
		}


		return _possibleCombinationSum(possibleNumbers, numberOfStars);

	},

	_updateDoneStatus (){
		if (this.state.usedNumbers.length === 9){
			this.setState({doneStatus: 'Done. Nice !'});
			return;
		}

		if (this.state.redraws === 0 && !this._possibleSolution()){
			this.setState({doneStatus: 'Game Over!'});
		}

	},

	render (){
		var selectedNumbers = this.state.selectedNumbers;
		var numberOfStars = this.state.numberOfStars;
		var correct = this.state.correct;
		var usedNumbers = this.state.usedNumbers;
		var redraws = this.state.redraws;
		var doneStatus = this.state.doneStatus;
		var bottomFrame;

		if (doneStatus){
			bottomFrame = <DoneFrame doneStatus={doneStatus} resetGame={this._resetGame} />
		} else {
			bottomFrame =  <NumbersFrame selectedNumbers={selectedNumbers}
							selectNumber={this._selectNumber}
							usedNumbers={usedNumbers} />
		}

		return (
			<div id="game">
				<h2>Play Nine</h2>
				<hr/>
				<div className="clearfix">
					<StarsFrame numberOfStars={numberOfStars} />
					<ButtonFrame selectedNumbers={selectedNumbers}
									correct={correct}
									checkAnswer={this._checkAnswer}
									acceptAnswer = {this._acceptAnswer}
									redraw = {this._redraw}
									redraws = {redraws}/>
					<AnswerFrame selectedNumbers={selectedNumbers} 
								 unselectedNumber={this._unselectedNumber}/>
				</div>
				{bottomFrame}
			</div>
		);
	}
});


ReactDOM.render(
	<Game />, 
	document.getElementById('container')
);