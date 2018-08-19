import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import {connect} from 'react-redux'


import Overlay from './components/overlay/overlay.js';

import Overview from './components/overview/overview.js';
import Question from './components/question/question.js';

import {rootReducer,addQuestion,requestGet,markQuestion1} from './reducers/question'


class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      questionsLoaded: false,
      questions: [],
      questionsLength: 0,
      activeQuestion: 0,
      score: 0,
      complete: false,
      chooseQuestions: true,
      country: null,
    };
    this.setQuestions = this.setQuestions.bind(this);
    
  }


  setQuestions(value) {
    

    const key = value.toLowerCase().replace(/\s/g, '-');
    const data = '../client/data/china.json';
    // const data = 'http://www.ftchinese.com/ig/perils-of-perception/china.json';
    const init = {
      method:  'GET',
      headers:{ 
        'Content-Type': 'text/plain',
        'Accept': 'application/json',
      },
      mode: 'same-origin',
      credentials: 'include',
      redirect: 'error'
    }


      fetch(data,init)
      .then(res => res.json())
      .then(({ questions }) => {this.setState({
        questionsLoaded: true,
        questions,
        country: value,
        questionsLength: questions
          .filter(question => question.answer !== '')
          .sort((a, b) => Number(a.meta.qid.slice(1)) - Number(b.meta.qid.slice(1)))
          .slice(2)
          .length,
      });

      // 
      if (this.props.requestGet) {
        // console.log('test include requestGet props'+this.state.questionsLoaded);
        this.props.requestGet({
          questionsG: questions,
        });
      }

    });

      // 写在外面this.state.questionsLoaded还是默认值，因为不能立马获取到setState值，需要后面加函数
      if (this.props.addQuestion) {
        // console.log('test include one markQuestion props'+this.state.questionsLoaded);  
        this.props.addQuestion({
          answeredOtherQ:this.state.questions,
          valueOtherQ:this.state.country
        });
      }
      
  }
  // store.getState()获取的是reducer中的值;this.state获取的是当前组件的值
  render() {
// 默认哪些没有激活，如果触发滚动就激活按钮，点击按钮显示下面图标，子动作把元素传给父
    const questions = this.state.questions
      .filter(question => question.answer !== '')
      .sort((a, b) => Number(a.meta.qid.slice(1)) - Number(b.meta.qid.slice(1)))
      .slice(2)
      .map((question, i) => <Question 
      key={question.meta.qid}
      questionId={question.id}
      questionIndex={i} 
      questionType={question.meta.type}
      questionText={question.text}
      answer={Number(question.answer)}
      countryAnswer={Number(question.meta.perceived)}
      responsesData={question.responses}
      options={Object.keys(question.options).map(option =>
              question.options[option]
            ).filter(option => option !== null)}
      questions = {this.state.questions}/>
    );

    return (
    	<div>
        <Overview />
        <Overlay setQuestions={this.setQuestions} questions1={this.props.questions1}/>
        {/*<Question questions = {this.state.questions}/>*/}
        {questions}

      </div>
    );
  }
}
// mapStateToProps怎么能合并进去呢？
// 注意写法：
const mapStateToProps = (state) => {
  return {
    test:['test index','test1']
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addQuestion: (questions) => {
      dispatch(addQuestion(questions))
    },
    requestGet: (request_get_data) => {
      dispatch(requestGet(request_get_data)) ; 
    }
    
  }
}
// action和reducer只是定义接口，reducer是用来合state的。action中包含什么？
export default  connect(
  mapStateToProps,
  mapDispatchToProps
)(App)