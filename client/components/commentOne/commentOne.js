
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import commentOne from './commentOne.scss'

import CommentReply from '../commentInput/commentReply.js'

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

         {/*<dd>在中共习近平执政下，别说140万亿，就是1400万亿家庭资产也无所谓。马克思主义是要消灭私有制的！习政府随时都可下令全部共产国有化！这些资产随时都可消失！这就是世纪工程混改！</dd>*/}

{/*逻辑是，评论有1条仅仅是dd中包含一句话，当有2条评论时，在p上加上class并在之前加上cmt_quote，它包含cmt_oldautherinfo；当有3条评论时，在cmt_oldautherinfo前加上*/}
    <dd>
      <div className="cmt_quote">
        <div className="cmt_quote">
           	<div className="cmt_oldautherinfo">
            	<span className="cmt_oldauther">来自江苏省常州市 [ augmouse ] 的原贴:</span>
            </div>
            <p className="cmt_oldcmt">中国商业养老保险公司信誉太差，老百姓根本不相信</p>
        </div>
        <div className="cmt_oldautherinfo">
            	<span className="cmt_oldauther">来自北京市 [ hhy1770547592 ] 的原贴:</span>
        </div>
        <p className="cmt_oldcmt">同感</p>
      </div>
      绝对赞同
    </dd>

        <CommentReply/>
        <div className="replycomment">
            <a href='javascript:cmt_reply("lbdTJ8s8YA__2d","h");'>回复</a> <a id="hstlbdTJ8s8YA__2d" href='javascript:voteComment("lbdTJ8s8YA__2d","#hst", "support");'>支持</a>
            (<font id="hstslbdTJ8s8YA__2d" color="#BA2636">143</font>) 
            <a id="hdtlbdTJ8s8YA__2d" href='javascript:voteComment("lbdTJ8s8YA__2d","#hdt","disagree");'>反对</a>
            (<font id="hdtdlbdTJ8s8YA__2d">8</font>)
        </div>
    </div>


    /*<div class="commentcontainer">
      <dt>
      <span>今天 10:09</span>
      <b>hhy1770547592</b> 
      <font class="grey">来自北京市</font
      ><div class="clearfloat"></div>
    </dt>

    <dd>
      <div class="cmt_quote">
        <div class="cmt_quote">
           	<div class="cmt_oldautherinfo">
            	<span class="cmt_oldauther">来自江苏省常州市 [ augmouse ] 的原贴:</span>
            </div>
            <p class="cmt_oldcmt">中国商业养老保险公司信誉太差，老百姓根本不相信</p>
        </div>
        <div class="cmt_oldautherinfo">
            	<span class="cmt_oldauther">来自北京市 [ hhy1770547592 ] 的原贴:</span>
        </div>
          <p class="cmt_oldcmt">同感</p>
      </div>
      绝对赞同
    </dd>

          <div class="replybox" id="reFDW3jRbmFIw_eb"></div>

          <dt class="replycomment"><a href='javascript:cmt_reply("FDW3jRbmFIw_eb","");'>回复</a> <a id="stFDW3jRbmFIw_eb" href='javascript:voteComment("FDW3jRbmFIw_eb","#st","support");'>支持</a>(<font id="stsFDW3jRbmFIw_eb">4</font>) <a id="dtFDW3jRbmFIw_eb" href='javascript:voteComment("FDW3jRbmFIw_eb","#dt","disagree");'>反对</a>(<font id="dtdFDW3jRbmFIw_eb">0</font>)
          </dt>
      </div>*/
    )
  }
}

export default CommentOne