import React from "react";
import ResultContainer from "./ResultContainer";
import OptionContainer from "./OptionContainer";
import QuestionContainer from './QuestionContainer'
import QuizIndex from './QuizIndex'
import Timer from './Timer'
import axios from 'axios';
import { Row, Col, Button} from "react-bootstrap";

import * as actionCreators from '../redux/actions';
import { connect } from 'react-redux';

class QuizContainer extends React.Component {
  constructor(props) {
    super(props)
  
    this.state = {
      quizInfo:[],
      currentQuestion: 0,
      myAnswer: null,
      options: [],
      score: 0,
      disabled: true,
      isEnd: false,
      seconds: 10
    }
  }

  loadQuizData = () => {
    // console.log(quizData[0].question
    const answer = this.state.quizInfo[this.state.currentQuestion].correct_answer
    const optionsNames = this.state.quizInfo[this.state.currentQuestion].incorrect_answers.concat(answer)
    function shuffle(optionsNames) {
      optionsNames.sort(() => Math.random() - 0.5);
      console.log(optionsNames)
      // const values = array
      return optionsNames
    }
    shuffle(optionsNames)

    // console.log(answer)
    // const options = (this.state.quizInfo[this.state.currentQuestion].incorrect_answers).concat(answer)
    // console.log("oprions", options)
    this.setState(() => {
      return {
        questions: this.state.quizInfo[this.state.currentQuestion].question,
        answer: this.state.quizInfo[this.state.currentQuestion].correct_answer,
        // options: this.state.quizInfo[this.state.currentQuestion].incorrect_answers.concat(answer)
        options: optionsNames
      };
    });
  };


  async componentDidMount() {
    const response = await axios.get('https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple')
    const data = response.data.results
    this.setState({quizInfo: data}) 
    this.loadQuizData()

    this.myInterval = setInterval(() => {
        const { seconds } = this.state
        // console.log("Interval")
        if (seconds > 0) {
            this.setState(({ seconds }) => ({
                seconds: seconds - 1
            }))
        }
        if (seconds === 0) {
            this.setState({
                seconds: 10
            })

            {this.state.currentQuestion < this.state.quizInfo.length - 1 && (
              this.nextQuestionHandler()
            )}
            {this.state.currentQuestion === this.state.quizInfo.length - 1 && (
              this.finishHandler()
            )}
        } 
      }, 1000)
   }

   componentWillUnmount() {
      clearInterval(this.myInterval)
  }

  nextQuestionHandler = () => {
    const { myAnswer, answer } = this.state;

    // this.props.onNextQuestion();

    if (myAnswer === answer) {
      console.log("TRUE")
      this.setState((prevState) =>({
        score: prevState.score + 1
      }))
    }
    else{
      console.log("FALSE")
    }
    this.setState({
      currentQuestion: this.state.currentQuestion + 1,
      seconds: 10
    });
    // console.log(this.state.currentQuestion);
  };

  componentDidUpdate(prevProps, prevState) {
    // this.props.onNextQuestion();
    // console.log("currentQuestion",this.state.currentQuestion+1)
    // console.log("quizInfo.length",this.state.quizInfo.length)
    // console.log("componentDidUpdate")
    const answer = this.state.quizInfo[this.state.currentQuestion].correct_answer;
    const optionsNames = this.state.quizInfo[this.state.currentQuestion].incorrect_answers.concat(answer)
    function shuffle(optionsNames) {
      optionsNames.sort(() => Math.random() - 0.5);
      // console.log(optionsNames)
      return optionsNames
    }
    shuffle(optionsNames)
    if (this.state.currentQuestion !== prevState.currentQuestion) {
      this.setState((state) => {
        return {
          disabled: true,
          questions: this.state.quizInfo[this.state.currentQuestion].question,
          answer: this.state.quizInfo[this.state.currentQuestion].correct_answer,
          // options: this.state.quizInfo[this.state.currentQuestion].incorrect_answers.concat(answer)
          options: optionsNames
        };
      });
    }
  }
  //check answer
  checkAnswer = answer => {
    this.setState({ myAnswer: answer, disabled: false });
  };

  finishHandler = () => {
    if (this.state.currentQuestion === this.state.quizInfo.length - 1) {
      // console.log("Finish")
      this.setState({
        isEnd: true
      });
      clearInterval(this.myInterval)
    }
  };

  render() {
    const { options, myAnswer, currentQuestion, isEnd, seconds } = this.state;
    // console.log("My answer", myAnswer)
    // console.log("Score", this.state.score)
    // console.log(this.state.quizInfo)
    if (isEnd) {
      return (
        <ResultContainer finalScore={this.state.score}/>
          );
    }

    else {
      return (
        <div className="App">

          <QuizIndex currQuestion={currentQuestion} totQuestions={this.state.quizInfo.length} />
       
          <Timer seconds={seconds} />

          <QuestionContainer questions={this.state.questions}/>

          <OptionContainer 
            optionNames={options} 
            clickedOption={(option) => this.checkAnswer(option)}
            seletedOption={myAnswer}
            answerOptions={options}
          />
          
          <Row className="mt-3 mb-3">
            <Col>
              {currentQuestion < this.state.quizInfo.length - 1 && (
                <Button
                  variant="primary"
                  className="next_btn"
                  disabled={this.state.disabled}
                  onClick={this.nextQuestionHandler}
                >
                  Next
                </Button>
              )}
            </Col>
          </Row>

          <Row>
            <Col>
              {currentQuestion === this.state.quizInfo.length - 1 && (
              <Button className="ui inverted button" onClick={this.finishHandler}>
                Finish
              </Button>
              )}  
            </Col>
          </Row>
          
        </div>
      );
    }
  }
}
const mapStateToProps = state => {
  return{

  }
}

const mapDispatchToProps = dispatch => {
  return{
      // onNextQuestion: () => dispatch(actionCreators.nextQuestion()),
      // setResultAnswer: (data) => dispatch(actionCreators.setAnswer(data))
  }
}
export default QuizContainer;
// export default connect(mapStateToProps, mapDispatchToProps)(QuizContainer);
