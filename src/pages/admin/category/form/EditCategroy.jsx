import React, { Component } from 'react'
import { Input } from 'antd'
import PropTypes from 'prop-types'

class EditCategroy extends Component {

  static propTypes = {
    categroyInfo: PropTypes.string.isRequired
  }

  state = {
    inputVal: this.props.categroyInfo
  }
  inputValue = (e) => {
    this.setState({
      inputVal: e.target.value
    })
  }
  componentWillReceiveProps(props) {
    this.setState({
      inputVal: props.categroyInfo
    })
  }
  render() {
    const { inputVal } = this.state
    return (
      <div>

        <Input value={inputVal} onChange={this.inputValue} placeholder='请输入分类名称'></Input>

      </div>
    )
  }
}

export default EditCategroy



