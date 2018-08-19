
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import CommentOne from '../commentOne/commentOne.js'

class CommentList extends Component {
  constructor () {
    super()
    this.state = { content: '' }
  }

  componentWillMount () {
   
  }

  componentWillUnmount () {
    
  }



  render () {
   
    return (
        <div>
        <CommentOne />
        <CommentOne />
        <CommentOne />
        </div>
    )
  }
}

export default CommentList