
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import {fetchDataInGet,requestGet} from '../../reducers/question'

import CommentOne from '../commentOne/commentOne.js'

class CommentList extends Component {
  constructor () {
    super()
    this.state = { comments: '' }
  }

  componentDidMount () {
    console.log('componentDidMount');
    this.props.dispatch(fetchDataInGet()); 
    // this._loadComments();
  }

    componentWillMount () {
    console.log('componentWillMount');
  }

  componentWillUnmount () {
    console.log('componentWillUnmount');
  }

  //这里，“不安全”不是指安全性，而是表示使用这些生命周期的代码将更有可能在未来的React版本中存在缺陷，特别是一旦启用了异步渲染。这些不安全都没有执行
  UNSAFE_componentWillReceiveProps(){
    console.log('UNSAFE_componentWillReceiveProps');
  }
  UNSAFE_componentWillMount(){
    console.log('UNSAFE_componentWillMount');
  }
  UNSAFE_componentWillUpdate(){  
    console.log('UNSAFE_componentWillUpdate');
  }

  componentWillUpdate(){
    console.log('componentWillUpdate');
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    console.log('getDerivedStateFromProps');  //执行2遍
  }
  getSnapshotBeforeUpdate(prevProps, prevState) {
    console.log('getSnapshotBeforeUpdate'); //执行1遍
  }
   _loadComments () {
      // this.props.initComments();
  }
  handleDeleteComment (index) {
    // if (this.props.onDeleteComment) {
    //   this.props.onDeleteComment(index)
    // }
  }



  render () {
    console.log('render');
    const comments = this.props.comments;
    // comments = Array.from(comments);
     console.log(comments);//为什么会执行2遍？
    /*const commentCom = '';
   
    if(!this.isEmptyObj(comments)){
      var comments1 = comments;
     
       commentCom = comments1.map((comment, i) =>
          <CommentOne
            requestData={comments1[i]}
            key={i}
            index={i}
            onDeleteComment={this.handleDeleteComment.bind(this)} />
        )
    }
    */
    return (
        <div>
         {comments.map((comment, i) =>
          <CommentOne
            requestData={comments[i]}
            key={i}
            index={i}
            onDeleteComment={this.handleDeleteComment.bind(this)} />
        )}
        </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    state:state,
    comments:state.requestReducer
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    dispatch,
    initComments: () => {
      dispatch(requestGet())
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CommentList)
