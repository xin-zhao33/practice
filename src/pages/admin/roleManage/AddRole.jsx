import React, { Component } from 'react'
import { Input } from 'antd'

export default class AddRole extends Component {
  state = {
    inputVal: ''
  }
  onChange = (e) => {
    this.setState({
      inputVal: e.target.value
    })
  }

  render() {
    const { inputVal } = this.state
    return (
      <div className='add-role' style={{ display: 'flex', alignItems:'center'}}>
        <span style={{ marginRight: '10px', width: '80px' }}>角色名称:</span>
        <Input value={inputVal} placeholder='请输入角色名称' onChange={this.onChange}></Input>
      </div>
    )
  }
}
