
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import commentInput from './commentInput.scss'

class CommentInput extends Component {
//   static propTypes = {
//     comment: PropTypes.object.isRequired,
//     onDeleteComment: PropTypes.func,
//     index: PropTypes.number
//   }

  constructor () {
    super()
    this.state = { content: '' }
    // this.handleInputChange = this.handleInputChange.bind(this);
    this.handleTextareaChange = this.handleTextareaChange.bind(this);
  }

  componentWillMount () {
   
  }

  componentWillUnmount () {
    
  }
//   handleContentChange (event) {
//     this.setState({
//       content: event.target.value
//     })
//   }

  handleTextareaChange (event) {
    this.setState({
      content: event.target.value
    })
  }


  render () {
   
    return (
      
      <div className="replybox" id="reFDW3jRbmFIw_eb">
          <div id="reply-input-container">
               <b>回复此评论：</b>
               <textarea id="replycontent" className="commentTextArea" rows="3" onChange={this.handleTextareaChange.bind(this)}></textarea>

                <div className="submint-section"><button className="comment_btn submitbutton button ui-light-btn" id="addnewcommentr" >提交回复</button></div>
        </div>
    </div>
    )
  }
}

export default CommentInput