import React, { Component } from 'react'
import { Form, Select, Input } from 'antd'

const { Option } = Select;
const Item = Form.Item
export default class AddCategroy extends Component {

  onGenderChange = (value) => {
    console.log(value)
  }

  onFinish = (values) => {
    console.log('Success:', values);
  }

  render() {
    return (
      <Form onFinish={this.onFinish} initialValues={{ remember: true }}>
        <Item name='select' rules={[{ required: true, message: '请选择' }]}>
          <Select
            placeholder="Select a option and change input text above"
            onChange={this.onGenderChange}
            allowClear
            // value='male'
          >
            <Option value="male">male</Option>
            <Option value="female">female</Option>
            <Option value="other">other</Option>
          </Select>
        </Item>
        <Item rules={[{ required: true ,message: '请输入名称!'}]}>
          <Input value='aaa' placeholder='请输入分类名称' />
        </Item>
      </Form>
    )
  }
}
