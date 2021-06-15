import React, { Component } from 'react'

import { Form, Input, Button, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { reqLogin } from '../../../api/index'
import './FormBox.less'

const Item = Form.Item
export default class FormBox extends Component {
  onFinish = async (values) => {
    const { username, password } = values
    const res = await reqLogin(username, password)
    if (res.status === 0) {
      message.success('登录成功!')
      this.props.toAdmin()
    } else {
      message.error(res.msg)
    }
  };
  onFinishFailed = (errorInfo) => {
    console.log(errorInfo);
    message.error('请输入用户名或密码!');
  };
  passwordValidator = (rule, val, callback) => {
    // const reg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/
    const reg = /^[a-zA-Z0-9_]+$/
    if (!val) {
      callback(new Error('请输入密码!'))
    }
    if (reg.test(val)) {
      callback()
    } else {
      callback(new Error('请输入正确的11位手机号!'))
    }
  }

  render() {
    return (
      <div>
        <Form
          name="normal_login"
          className="login-form"
          onFinish={this.onFinish}
          onFinishFailed={this.onFinishFailed}
          initialValues={{ remember: true }}
        >
          <Item
            name="username"
            rules={[{ required: true, whitespace: false, message: '请输入用户名!' }, { min: 4, max: 12, message: '请输入4~12位账号!' }, { pattern: /^[a-zA-Z0-9_]+$/, message: '用户名必须包含字母、数字、下划线!' }]}
          >
            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="请输入用户" />
          </Item>
          <Item
            name="password"
            rules={[{ validator: this.passwordValidator }]}
          >
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="请输入密码"
            />
          </Item>
          <Item>
            <Button type="primary" htmlType="submit" className="login-form-button">
              登录
            </Button>
          </Item>
        </Form>
      </div>
    )
  }
}
