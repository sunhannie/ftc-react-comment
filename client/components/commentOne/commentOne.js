
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'

import  './commentOne.scss'

import CommentReply from '../commentInput/commentReply.js'
import Login from '../login/login.js'
import {GetCookie} from '../../../util/api'

class CommentOne extends Component {
  constructor () {
    super()
    
    
    this.state = { 
      comments: '' ,
      supportCount:0,
      disagreeCount:0,
      isHideComment:false
    }
    // this.handleInputChange = this.handleInputChange.bind(this);
    this.handleTextareaChange = this.handleTextareaChange.bind(this);
    // console.log(this.props);
    this.deleteComment = this.deleteComment.bind(this);
  }

  componentWillMount () {
    
    const request = this.props.requestData;
    this.setState({
      supportCount:request.support_count,
      disagreeCount:request.disagree_count,
      supportWord:'支持',
      disagreeWord:'反对',
      isShow:false,
      isShowLogin:false
    })
  }

  componentWillUnmount () {
    
  }

 deleteComment(){
   this.setState({
        isHideComment: true,
   });
   this.props.onDeleteComment(this.props.index);
 }

  handleTextareaChange (event) {
    this.setState({
      content: event.target.value
    })
  }
  reply(){
    console.log('reply'+GetCookie('USER_ID'));
    let userId = GetCookie('USER_ID') ;
    if(userId){
      this.setState({
        isShow:true,
        isShowLogin:false
      })
    }else{
      this.setState({
        isShow:false,
        isShowLogin:true
      })
    }
  }
  support(){

    this.setState({
      supportCount:Number(this.state.supportCount)+1,
      supportWord:'已支持',
    })
  }
  disagree(){
    this.setState({
      disagreeCount:Number(this.state.disagreeCount)+1,
      disagreeWord:'已反对',
    })
  }

  handleIsShowreply () {
    
    this.setState({
      isShow:false
    })
  }

handleLogin(){
  this.setState({
    isShowLogin:false
  })
}
 Greeting() {
    if(this.state.isShow){
        return  <CommentReply isShow={this.state.isShow} handleIsShowreply={this.handleIsShowreply.bind(this)}/>
    }else{
      return 
      <Login isShow={this.state.isShow} handleLogin={this.handleLogin.bind(this)}/>
     
    }
}

  render () {

    const greet = this.Greeting();
    const request = this.props.requestData;
   
    return (
      // 当点击支持时，数量加1

      
     <div  className={`comment-container ${ this.state.isHideComment ? 'hide' : 'show'} `}  >

      {/*<div className="comment-container">*/}
        
          <div>
              <div className="ding"></div>
              <span>{request.dnewdate}</span>
              <b>{request.nickname}</b>
              <font className="grey">{request.user_area}</font>
         </div>

         <dd>{request.talk}</dd>

        {/*如果没有登录，点击回复，出现Login，否则出现CommentReply */}
        {/*{greet}*/}

        <CommentReply isShow={this.state.isShow} handleIsShowreply={this.handleIsShowreply.bind(this)}/>

        <Login isShowLogin={this.state.isShowLogin} handleLogin={this.handleLogin.bind(this)}/>
        
        <div className="delete-comment" onClick={this.deleteComment}>删除</div>
        <div className="reply-comment">
            <span onClick={this.reply.bind(this)}>回复</span>
            <span onClick={this.support.bind(this)}>{this.state.supportWord}</span>
            (<font color="#BA2636">{this.state.supportCount}</font>) 
            <span onClick={this.disagree.bind(this)}>{this.state.disagreeWord}</span>
            (<font>{this.state.disagreeCount}</font>)
        </div>

        
    </div>

    // {
    //         this.props.isHide ?
    //             :
    //             null
    //         }

  /*逻辑是，评论有1条仅仅是dd中包含一句话，当有2条评论时，在p上加上class并在之前加上cmt_quote，它包含cmt_oldautherinfo；当有3条评论时，在cmt_oldautherinfo前加上*/
    /*<dd>
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
    </dd>*/

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

// const mapStateToProps = (state) => {
//   return {
//     comments: state
//   }
// }

// export default connect(
//   mapStateToProps,
// )(CommentOne)
export default CommentOne