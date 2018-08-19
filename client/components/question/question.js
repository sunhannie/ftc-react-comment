import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import Range from './range.js';
import ColumnChart from './column-chart/column-chart.js';
import questionCss from './question.scss';
import {connect} from 'react-redux'
import {rootReducer,markQuestion1,requestGet,fetchDataInGet,addCountAsync} from '../../reducers/question'

class Question extends Component {
  constructor(props) {
    super(props);
    const { questions } = this.props; // eslint-disable-line
    this.markQuestion = this.markQuestion.bind(this);
    this.state = {
      answered: false,
      value: '50',
    };
    
    // console.log(this.props)
  }
  markQuestion(event, value) {
    // 加上preventDefault，不会跳转页面，即不会重新刷新页面。action是表单提交的默认事件，在你的提交事件中，增加阻止默认事件的语句。
    if (event) {
      event.preventDefault();
    }
    console.log('value'+value);
    this.setState({
        answered:true,
        value,
    });
    if (this.props.markQuestion1) {
      console.log('test include markQuestion1 props in question.js');
      this.props.markQuestion1({
        answeredQ:this.state.answered,
        valueQ:this.state.value
      });
    }
    // this.props.requestGet('中国');

    
    // addCountAsync();
  }



 componentDidMount() {
    this.props.dispatch(fetchDataInGet('中国')); //怎么能包含dispatch呢？ 
    // const { dispatch, selectedSubreddit } = this.props;
    // dispatch(fetchPostsIfNeeded(selectedSubreddit))
    console.log({...this.props});  //props怎么会有dispatch
  }
  render() {
     
    const {props} = this.props;
    const rangeMin = this.props.options[0];
    const rangeMax = this.props.options[1];

    const crossheadLookup = {
      19: '当前穆斯林人口',
      20: '未来穆斯林人口',
      21: '健康保险支出',
      22: '拥有房产的比例',
      23: '财富分配',
      24: '幸福感',
      26: '对堕胎的态度',
      27: '对同性恋的态度',
      28: '对婚前性行为的态度',
    };
    const crosshead = crossheadLookup[this.props.questionId];


    const chart =  (
      <ColumnChart
        data={this.props.responsesData}
        initialWidth={800}
        inputMin={rangeMin}
        inputMax={rangeMax}
        userAnswer={this.state.value}
        actualAnswer={this.props.answer}
        countryAnswer={this.props.countryAnswer}
      />
    );

    return (
      <div  className="question-container" >
        <h2 className="o-typography-subhead--crosshead" ref={node => { this.container = node; }}>
          {this.props.questionIndex + 1}.{crosshead}
        </h2>

        <p className="o-typography-lead--small">
          {this.props.questionText}
        </p>
        <Range 
        min={rangeMin}
        max={rangeMax}
        step={rangeMax / 100}
        thumbSize={28}
        onSubmit={this.markQuestion}/>

        {chart}

    {/*写法：变量字符串需要加上``，尽管前面有其它字符串*/}
        <div className={`reslut-container  ${this.state.answered ? 'active' : 'notActive'} `}>
          <div className="legend">
            <div className="actual-situation"><span className="circle"></span><span>实际情况</span></div>
            <div className="response"><span className="circle"></span><span>你的回答</span></div>
            <div className="survey"><span className="circle"></span><span>问卷调查结果</span></div>
          </div>

          <div className="percentage">
            <div className="answer"><span>答案是</span><span>{this.props.answer}&#37;</span></div>
            <div className="thinking"><span>你认为是</span><span>{this.state.value}</span></div>
            <div className="survey-people"><span>调查民众答案</span><span>{this.props.countryAnswer}&#37;</span></div>
          </div>
        </div>
       </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    test:['test question','test1 result'],
    mark_question_data:state.mark_question_data
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    dispatch,
    markQuestion1: (questions) => {
      dispatch(markQuestion1(questions))
    },
    requestGet: (request_get_data) => {
      dispatch(requestGet(request_get_data)) ; 
    }
  }
}
// action和reducer只是定义接口，reducer是用来合state的。action中包含什么？必须这样写，会把mapStateToProps和mapDispatchToProps的属性合并进去，
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Question)
// export default Question;  
