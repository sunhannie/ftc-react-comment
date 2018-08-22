
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
    //  requestData={props.request_data}
 
    const props = this.props.request_data;
     console.log(this.props);//为什么会执行2遍？
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
    state:state,
    request_data:state.requestReducer
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
