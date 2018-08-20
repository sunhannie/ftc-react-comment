
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import {fetchPostsIfNeeded,fetchDataInGet,requestGet,addComment} from '../../reducers/question'

import CommentOne from '../commentOne/commentOne.js'

class CommentList extends Component {
  constructor () {
    super()
    this.state = { comments: '' }
  }

  componentDidMount () {
    this.props.dispatch(fetchDataInGet()); 
    // this.props.addComment('add comment');
    // this._loadComments();
    console.log('aa');
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
    //  requestData={props.request_data}
 
    const props = this.props.request_data;
     console.log('request');//为什么会执行2遍？
    return (
        <div>
         {props.map((comment, i) =>
          <CommentOne
            requestData={props[i]}
            key={i}
            index={i}
            onDeleteComment={this.handleDeleteComment.bind(this)} />
        )}
        {/*<CommentOne requestData={props}/>*/}
        </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    comments: state,
    request_data:state.requestReducer
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    dispatch,
    initComments: () => {
      dispatch(requestGet())
    },
    addComment: (data) => {
      dispatch(addComment(data))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CommentList)
