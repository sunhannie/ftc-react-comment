import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import { Users } from './data.js';
import login from './login.scss';
import {SetCookie,isLocal} from '../../../util/api'

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username:'',
      password:'',
      error: '',
      isShow: false,
      isExistUserName:false
    };
    // this.handleChange = this.handleChange.bind(this);
    // this.handleChangeRM = this.handleChangeRM.bind(this);
    // this.login = this.login.bind(this);
  }
inlineCheckEmail(username){
  if(username != '') {
    let url = '';
    if(isLocal()){
      url = 'http://localhost:3002/checkemail'
    }else{
      url = '/ajax/checkemail'
    }
   
    let obj = {
      'username':username
    }
    var xhr = new XMLHttpRequest();
    xhr.open('POST', url);              
    xhr.setRequestHeader('Content-Type', 'text/plain');
    xhr.onreadystatechange = () => {    
        if (xhr.status === 200) { 
            // var response = xhr.responseText;         
            this.setState({
              isExistUserName:true
            })
        }
    }
    
    xhr.send(JSON.stringify(obj));    
 
  }
}
  // 还需要focus
validateUsername(event) {
    let username =   event.target.value ;
    if (!username) {  
      this.setState({
        error:'用户名不能为空',
        isShow:true
      });
    }else{
      // let re = /^[^_][a-zA-Z0-9_]+$/;//首字母不是下划线
      let re = /^[a-zA-Z0-9_]+$/;
      if (!re.test(username)) {
        this.setState({
          error: '用户名只能包含大小写、数字和下划线',
          isShow:true
        })
      }else{
         this.inlineCheckEmail(username);
         this.setState({
          error: '',
          isShow:false
        })
      }

    }

  }

  validatePassword(event) {
    let password =   event.target.value ;
    if (!password) {
      this.setState({
        error: '密码不能为空',
        isShow:true
      });
      return false;
    }

    // this.setState({
    //   errorForPassword: ''
    // });
    // return true;
  }

 usernameChange(event){
    this.setState({
      username: event.target.value
    })
 }
 passwordChange(event){
    this.setState({
      password: event.target.value
    })
 }   
login(){
  SetCookie('USER_ID',this.state.username,null,null,'')
}
// 第一次this.props.isShow 默认是false，然后点击再判断有没有cookie，当点击才知道有没有cookie
  render() {
    const props = this.props;

    return (

    <div className={`container login-container ${this.props.isShowLogin ? 'show' : 'hide'} `}>
        <div className="">用户名</div>
        <input type="text" autocorrect="off" maxLength="20" name="username" className="user-input" onChange={this.usernameChange.bind(this)} onBlur = {this.validateUsername.bind(this)}/>
        <div className="">密码</div>
        <input type="password" name="password" maxLength="20" className="user-input" onChange={this.passwordChange.bind(this)} onBlur = {this.validatePassword.bind(this)}/>
        <div className={`error-msg  ${this.state.isShow ? 'show' : 'hide'} `}>{this.state.error}</div>
        <button type="submit" className="button ui-light-btn" onClick={this.login.bind(this)}>登录后发表评论</button>
        
        <div className="centerButton"><a href="http://user.ftchinese.com/register" target="_blank"><button className="ui-light-btn">免费注册</button></a></div>
    </div>
    
    );
  }

}

export default Login;