
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import commentOne from './commentOne.scss'

class CommentOne extends Component {
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
      
      <div className="commentcontainer">
          <div>
              <div className="ding"></div>
              <span>08-16 16:14</span>
              <b>minzhuziyou</b>
              <font className="grey">来自山西省太原市</font>
         </div>
         <div>在中共习近平执政下，别说140万亿，就是1400万亿家庭资产也无所谓。马克思主义是要消灭私有制的！习政府随时都可下令全部共产国有化！这些资产随时都可消失！这就是世纪工程混改！</div>
        <div className="replybox" id="rehlbdTJ8s8YA__2d"></div>
        <div className="replycomment">
            <a href='javascript:cmt_reply("lbdTJ8s8YA__2d","h");'>回复</a> <a id="hstlbdTJ8s8YA__2d" href='javascript:voteComment("lbdTJ8s8YA__2d","#hst", "support");'>支持</a>
            (<font id="hstslbdTJ8s8YA__2d" color="#BA2636">143</font>) 
            <a id="hdtlbdTJ8s8YA__2d" href='javascript:voteComment("lbdTJ8s8YA__2d","#hdt","disagree");'>反对</a>
            (<font id="hdtdlbdTJ8s8YA__2d">8</font>)
        </div>
    </div>
    )
  }
}

export default CommentOne