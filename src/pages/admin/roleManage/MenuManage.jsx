import React, { Component } from 'react'
import { Tree, Input } from 'antd';
import menuList from '../../../config/menuConfig';
export default class MenuManage extends Component {
  constructor(props) {
    super(props);

    const menus = props.role.menus
    this.state = { treeData: menuList, menus }
  }
  // state = {
  //   treeData: menuList,
  //   menus: []
  // }
  onCheck = (checkedKeys) => {
    console.log(checkedKeys, 'checkedKeys');
    this.setState({
      menus: checkedKeys
    })
  }
  getMenus = () => {
    return this.state.menus
  }
  static getDerivedStateFromProps(nextProps, state) {
    const nextMenus = nextProps.role.menus
    const { menus } = state
    console.log(nextMenus.toString() !== menus.toString())
    // eslint-disable-next-line eqeqeq
    if (nextProps.role.menus.toString() !== menus.toString()) {
      return {
        menus: nextMenus
      }
    }

    return null
  }

  render() {
    const { treeData, menus } = this.state
    return (
      <div>
        <Input value={this.props.role.name} disabled></Input>
        <Tree
          checkable
          defaultExpandAll
          checkedKeys={menus}
          onCheck={this.onCheck}
          treeData={treeData}
        />
      </div>
    )
  }
}
