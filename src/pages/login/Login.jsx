import React, { Component } from 'react'
import FormBox from './form/FormBox'
import './login.less'
import logo from './images/logo.png'
export default class Login extends Component {

  render() {
    return (
      <div className='login'>
        <header className='login-header'>
          <img src={logo} alt="" />
          <span>React项目:后台管理系统</span>
        </header>
        <section className='login-content'>
          <h2>用户登录</h2>
          <FormBox />
        </section>
      </div>
    )
  }
}
