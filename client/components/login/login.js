import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import { Users } from './data.js';
import login from './login.scss';
import {SetCookie} from '../../../util/api'

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
    console.log(this.props.isShow)
    return (

    <div className={`container ${this.props.isShowLogin ? 'show' : 'hide'} `}>
        <div className="">用户名</div>
        <input type="text" autocorrect="off" name="username" className="user-id" onChange={this.usernameChange.bind(this)}/>
        <div className="">密码</div>
        <input type="password" name="password" className="user-id" onChange={this.passwordChange.bind(this)}/>
        <button type="submit" className="button ui-light-btn" onClick={this.login.bind(this)}>登录后发表评论</button>
        <div className="status-msg"></div>
        <div className="centerButton"><a href="http://user.ftchinese.com/register" target="_blank"><button className="ui-light-btn">免费注册</button></a></div>
    </div>
    
    );
  }

}

export default Login;