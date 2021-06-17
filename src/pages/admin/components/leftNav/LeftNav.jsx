import React, { Component } from 'react'
import { Menu } from 'antd'
import { Link } from 'react-router-dom'
import menuList from '../../../../config/menuConfig.js'
import logo from '../../../../assets/images/logo.png'
import './LeftNav.less'
const { SubMenu } = Menu
export default class LeftNav extends Component {
  getMenuNodes = (menuList) => {
    return menuList.map(item => {
      if (!item.children) {
        return (
          <Menu.Item key={item.key}>
            <Link to={item.key}>
              <i className={['iconfont', `icon-${item.icon}`].join(' ')}></i>{item.title}
            </Link>
          </Menu.Item>
        )
      } else {
        return (
          <SubMenu key={item.key} title={item.title} style={{fontSize:'14px'}} className={['icon', 'iconfont', item.icon].join(' ')}>
            {this.getMenuNodes(item.children)}
          </SubMenu>
        )
      }
    })
  }
  render() {
    return (
      <div className='left-nav'>
        <header className='left-title'>
          <img src={logo} alt='' />
          <h1>硅谷后台</h1>
        </header>
        <div className='left-menu'>
          <Menu
            mode='inline'
            theme='dark'
          >
            {
              this.getMenuNodes(menuList)
            }
            {/* <Menu.Item key='1'>
              <Link to='/home'>
                <i className='iconfont icon-home'></i>首页
              </Link>
            </Menu.Item>
            <SubMenu key='sub1'  title='商品'>
              <Menu.Item key='4' >
                <Link to='/category'>品类管理</Link>
              </Menu.Item>
              <Menu.Item key='5' >
                <Link to='/productManage'>商品管理</Link>
              </Menu.Item>
            </SubMenu>
            <Menu.Item key='2' >
              <Link to='/userManage'>用户管理</Link>
            </Menu.Item>
            <Menu.Item key='3' >
              <Link to='/roleManage'>角色管理</Link>
            </Menu.Item>
            <SubMenu key='sub2' title='图形图表'>
              <Menu.Item key='6'>
                <Link to='/barManange'>柱状图</Link>
              </Menu.Item>
              <Menu.Item key='7'>
                <Link to='/lineManage'>折线图</Link>
              </Menu.Item>
              <Menu.Item key='8'>
                <Link to='/pieManage'>饼图</Link>
              </Menu.Item>
            </SubMenu> */}
          </Menu>
        </div>
      </div>
    )
  }
}
