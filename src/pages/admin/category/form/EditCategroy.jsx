import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Input } from 'antd'

export default class EditCategroy extends Component {

  state = {
    val: ''
  }
  onFinish = (val) => {
    console.log(val)
  }
  onChange = (e) => {
    console.log(e.target.value)
  }
  componentDidMount() {
    if (this.props.onRef) {
      this.props.onRef(this);
    }

  }

  render() {
    const sharedProps = {
      defaultValue: this.props.categroyInfo,
    }
    return (
      <div>
        <Input {...sharedProps} placeholder='请输入需要修改的内容!' onChange={this.onChange}></Input>
      </div>
    )
  }
}
EditCategroy.propTypes = {
  categroyInfo: PropTypes.string
}



