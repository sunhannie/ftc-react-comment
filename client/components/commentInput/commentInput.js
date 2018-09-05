
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {fetchDataInPost} from '../../reducers/question'
import commentInput from './commentInput.scss'

class CommentInput extends Component {
  constructor () {
    super()
    this.state = { content: '' }
    this.handleTextareaChange = this.handleTextareaChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    console.log('nextProps');  //此组件第一次为什么会出现，我觉得是因为添加了react-redux的原因，其它组件props变化了，导致全局props变化，所以此组件也会触发？
  }


  handleTextareaChange (event) {
    this.setState({
      content: event.target.value
    })
  }

  submitReply(){
    this.props.dispatch(fetchDataInPost(this.state.content)); 
  }


  render () {
    
    return (
      
      <div className="">
          <div className="reply-input-container">
               <div>FT中文网欢迎读者发表评论，部分评论会被选进《读者有话说》栏目。我们保留编辑与出版的权利。</div>
               <textarea id="replycontent" className="commentTextArea" rows="3" onChange={this.handleTextareaChange.bind(this)}></textarea>

                <div className="submint-section"><button className="comment_btn submitbutton button ui-light-btn" onClick={this.submitReply.bind(this)}>提交评论 </button></div>
        </div>
    </div>

    
    )
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    dispatch
  }
}

export default connect(
  mapDispatchToProps
)(CommentInput)
