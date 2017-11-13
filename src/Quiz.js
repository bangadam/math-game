import React, {Component} from 'react';
import QuizOptionsComponent from './QuizOptionsComponent';
import classNames from "classnames";

class Quiz extends Component {
    constructor(props) {
        super(props);

        let riddle = this.playGame();
        // eslint-disable-next-line 
        let correct = false;

        this.state = {riddle};

        this.renderOptions = this.renderOptions.bind(this);
        this.checkResults = this.checkResults.bind(this);
        this.checkAnswer = this.checkAnswer.bind(this);
        this.play = this.play.bind(this);

    } 

    checkResults(option) {
        if(this.state.riddle.answer === option) {
            this.setState({correct: true, gameOver: true});
        }else {         
            this.setState({correct: false, gameOver: true});            
        }
    }

    play() {
        this.setState({correct: false, gameOver: false});
        this.playGame();
    }

    checkAnswer() {
        if(this.state.correct) {
            return <h1>Bagus Jawaban kamu benar, Klik tombol mulai lagi !</h1>
        }else {
            return <h1>Oh tidak Jawaban kamu salah, Klik tombol mulai lagi !</h1>
        }
    }

    renderOptions() {
        return(
            <div className="options">
                {this.state.riddle.resultArray.map((option, i) => 
                    <QuizOptionsComponent option={option} key={i} checkResults={(option) => this.checkResults(option)} />                
                )};
            </div>
        )
    }

    randomNumber(min, max) {
        return Math.floor(Math.random() * (max-min+1)) + min;
    }

    generateRandomOptions(sum) {
        let resultsArray = [];
        let randomNumberArray = [];

        while(randomNumberArray.length <= 3) {
            let randomNumber = this.randomNumber(1,19);
            if(randomNumberArray.indexOf(randomNumber) > -1) continue;
            randomNumberArray.push(randomNumber);
        }

        // console.log(randomNumberArray);
        for(let i = 0;i < 3;i++) {
            let addSubtract = this.randomNumber(0,1);
            let result = sum;
            if(addSubtract === 1) {
                // add number to result
                result += randomNumberArray[i];
                resultsArray.push(result);
            }else {
                // subtract the number from result
                result -= randomNumberArray[i];
                resultsArray.push(result);
            }
        }

        // console.log(resultsArray);
        return resultsArray;        
    }

    playGame() {
        let field1 = this.randomNumber(20,50);
        let field2 = this.randomNumber(20,50);        
        let result = field1 + field2;
        let resultsArray = this.generateRandomOptions(result);
        resultsArray.push(result);
        resultsArray.sort(function(a,b) {return 0.5 - Math.random()});
        // console.log(resultsArray);
        let riddle = {
            resultArray: resultsArray,
            field1: field1,
            field2: field2,
            answer: result
        }

        if(this.state && this.state.gameOver) {
            this.setState({riddle: riddle});
        }else {
            return riddle
        }
    }
    render() {
        return(
            <div className="quiz">
                <div className="quiz-content">
                    {/* Soal */}
                    <p className="questions">Berapakah Hasil Jumlah dari Angka 
                        <span className="text-info">{this.state.riddle.field1}</span> dan 
                        <span className="text-info">{this.state.riddle.field2}</span> ?
                    </p>
                    {/* Jawaban */}
                    {this.renderOptions()}

                    <br/>
                    {/* jawaban {this.state.correct ? "true" : "false"}
                    gameOver {this.state.gameOver ? "true" : "false"} */}
                    <div className={classNames("after", {"hide": !this.state.gameOver}, {'wrong animated bounceInDown': !this.state.correct}, {'correct animated bounceInDown': this.state.correct})}>
                        {this.checkAnswer()}
                    </div>

                </div>
                <div className="play-again">
                    <button className="button" onClick={this.play}>Main Lagi</button>
                </div>
            </div>
        );
    }
}

export default Quiz;