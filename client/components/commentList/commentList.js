
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

  componentWillMount () {
    var aa = this.props.dispatch(fetchDataInGet()); 
    this._loadComments();
    console.log('aa'+aa);
  }

  componentWillUnmount () {
      
  }
   _loadComments () {
      this.props.initComments();
  }


  render () {
    //  requestData={props.request_data}
 
    const props = this.props;
    console.log(props);//为什么会执行2遍？
    return (
        <div>
        <CommentOne requestData={props}/>
        <CommentOne requestData={props}/>
        <CommentOne requestData={props}/>
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
    }

  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CommentList)
