import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import { Users } from './data.js';
import login from './login.scss';
class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username:'',
      password:'',
      errorForUsername: '',
      errorForPassword: '',
      shouldHide:false,
      value: ''
    };
    // this.handleChange = this.handleChange.bind(this);
    // this.handleChangeRM = this.handleChangeRM.bind(this);
    // this.login = this.login.bind(this);
  }


 usernameChange(){

 }
 passwordChange(){

 }   
login(){

}

  render() {
    const props = this.props;
    return (

    <div className={`container  ${this.props.isShow ? 'hide' : 'show'} `}>
        <div class="username-label">用户名</div>
        <input type="text" autocorrect="off" name="username" class="user_id textinput user-name" onChange={this.usernameChange.bind(this)}/>
        <div class="password-label">密码</div>
        <input type="password" name="password" class="user_id textinput password" onChange={this.passwordChange.bind(this)}/>
        <button type="submit" class="comment_btn submitbutton button ui-light-btn" onClick={this.login.bind(this)}>登录后发表评论</button>
        <div class="topmargin statusmsg"></div>
        <div class="centerButton"><a href="http://user.ftchinese.com/register" target="_blank"><button class="ui-light-btn stress">免费注册</button></a></div>
    </div>
    
    );
  }

}

export default Login;