
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {fetchDataInPost} from '../../reducers/question'
import commentInput from './commentInput.scss'


class CommentReply extends Component {
//   static propTypes = {
//     comment: PropTypes.object.isRequired,
//     onDeleteComment: PropTypes.func,
//     index: PropTypes.number
//   }

  constructor () {
    super()
    this.state = { 
      content:'',
      isShow: false 
    }
    this.handleTextareaChange = this.handleTextareaChange.bind(this);
  }

  componentWillMount () {
    this.setState({
      isShow:this.props.isShow
    })
  }

  componentWillUnmount () {
    
  }

  handleTextareaChange (event) {
    this.setState({
      content: event.target.value
    })
  }
  submitReply(){
    this.props.handleIsShowreply();  //改变父的state，进一步改变此组件的props
    this.props.dispatch(fetchDataInPost(this.state.content)); 
    // this.textareaEle.style.backgroundColor = 'yellow';
    this.textareaEle.value = '';
  }

  render () {
    const props = this.props;
    
    return (
      <div className={`replybox  ${this.props.isShow ? 'show' : 'hide'} `}>
          <div id="reply-input-container">
               <b>回复此评论：</b>
               <textarea className="commentTextArea" rows="3" onChange={this.handleTextareaChange.bind(this)} ref={ele => { this.textareaEle = ele; }}></textarea>

                <div className="submit-section"><button className="comment_btn button ui-light-btn" onClick={this.submitReply.bind(this)}>提交回复</button></div>
        </div>
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
    dispatch
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CommentReply)
// export default CommentReply