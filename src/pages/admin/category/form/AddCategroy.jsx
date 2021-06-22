import React, { Component } from 'react'
import { Select, Input } from 'antd'

const { Option } = Select;
export default class AddCategroy extends Component {

  state = {
    inputVal: '',
    selectInfo: ''
  }
  onGenderChange = (_, option) => {
    if (option) {
      this.setState({
        selectInfo: option.value
      })
    }
  }
  onChange = (e) => {
    this.setState({
      inputVal: e.target.value
    })
  }

  render() {
    const { inputVal } = this.state
    const optionList = this.props.categroyList
    const defaultVal = this.props.parentId
    
    return (
      <div>
        <Select
          defaultValue={defaultVal}
          onChange={this.onGenderChange}
          allowClear
          style={{ width: '100%', marginBottom: '20px' }}
        >
          <Option value='0' >一级分类列表</Option>
          {
            optionList.map(item => <Option value={item._id} key={item._id}>{item.name}</Option>)
          }
        </Select>
        <Input value={inputVal} onChange={this.onChange} placeholder='请输入分类名称' />
      </div >

    )
  }
}
