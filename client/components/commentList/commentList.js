
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
    this.props.dispatch(fetchDataInGet()); 
    // this._loadComments();
  }

  componentWillUnmount () {
      
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
