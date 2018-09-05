
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import {fetchDataInGet,requestGet} from '../../reducers/question'

import CommentOne from '../commentOne/commentOne.js'

class CommentList extends Component {
  constructor () {
    super()
    this.state = { 
      comments: ''
    }
  }

  componentDidMount () {
    console.log('componentDidMount');
    this.props.dispatch(fetchDataInGet()); 
  }

    componentWillMount () {
    console.log('componentWillMount');
  }

  componentWillUnmount () {
    console.log('componentWillUnmount');
  }

  //这里，“不安全”不是指安全性，而是表示使用这些生命周期的代码将更有可能在未来的React版本中存在缺陷，特别是一旦启用了异步渲染。这些不安全都没有执行
  // UNSAFE_componentWillReceiveProps(){
  //   console.log('UNSAFE_componentWillReceiveProps');
  // }
  // UNSAFE_componentWillMount(){
  //   console.log('UNSAFE_componentWillMount');
  // }
  // UNSAFE_componentWillUpdate(){  
  //   console.log('UNSAFE_componentWillUpdate');
  // }

  // componentWillUpdate(){
  //   console.log('componentWillUpdate');
  // }
  // static getDerivedStateFromProps(nextProps, prevState) {
  //   console.log('getDerivedStateFromProps');  //执行2遍
  // }
  // getSnapshotBeforeUpdate(prevProps, prevState) {
  //   console.log('getSnapshotBeforeUpdate'); //执行1遍
  // }

  handleDeleteComment (index) {
    console.log('delete'+index);
  }


  render () {
   
    const comments = this.props.comments;
    const isLoading = this.props.isLoading;
    console.log(this.props);//为什么会执行2遍？因为componentDidMount中dispatch的函数，触发了state更新，所以会触发两次。（也就是说第一次进入到页面的时候，因为需要去fetch数据，所以会在没数据的情况下有一次渲染，等fetch成功后，会再一次进行渲染。）第一次this.props.comments为[]，所以开始会闪一下，有空白的情况。怎么让没有闪的情况呢？可以添加isLoading


    var commentCom = isLoading ? <div>Loading</div>  : comments.map((comment, i) =>
        <CommentOne
          requestData={comments[i]}
          key={i}
          index={i}
          onDeleteComment={this.handleDeleteComment.bind(this)} />
        )

    return (
      <div>
      {/*{
        isLoading ? <div>2</div>  : <div>1</div>
      
      }*/}
      {commentCom}
      </div>
     
    )
  }
}

const mapStateToProps = (state) => {
  return {
    // state:state,  //state包含rootReducer中所有
    ...state.requestReducer
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
