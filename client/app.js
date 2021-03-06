import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import {connect} from 'react-redux'


import CommentInput from './components/commentInput/commentInput.js';
import CommentList from './components/commentList/commentList.js';
import Login from './components/login/login.js';


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

    
  }

  render() {
    
    return (
    	<div className="allcomments">

        <CommentList />
        <CommentInput/>
        <Login />
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
      // dispatch(addQuestion(questions))
    }
    
  }
}
// action和reducer只是定义接口，reducer是用来合state的。action中包含什么？
export default  connect(
  mapStateToProps,
  mapDispatchToProps
)(App)