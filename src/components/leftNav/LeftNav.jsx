import React, { Component } from 'react'
import { Menu } from 'antd'
import { Link, withRouter } from 'react-router-dom'
import menuList from '../../config/menuConfig.js'
import logo from '../../assets/images/logo.png'
import './LeftNav.less'
const { SubMenu } = Menu
class LeftNav extends Component {
  getMenuNodes = (menuList) => {
    // return menuList.map(item => {
    //   if (!item.children) {
    //     return (
    //       <Menu.Item key={item.key}>
    //         <Link to={item.key}>
    //           <i className={['iconfont', `icon-${item.icon}`].join(' ')}></i>{item.title}
    //         </Link>
    //       </Menu.Item>
    //     )
    //   } else {
    //     return (
    //       <SubMenu key={item.key} title={item.title} style={{fontSize:'14px'}} className={['icon', 'iconfont', item.icon].join(' ')}>
    //         {this.getMenuNodes(item.children)}
    //       </SubMenu>
    //     )
    //   }
    // })


    return menuList.reduce((pre, item) => {
      const paths = this.props.location.pathname
      if (!item.children) {

        pre.push(
          (
            <Menu.Item key={item.key}>
              <Link to={item.key}>
                <i className={['iconfont', `icon-${item.icon}`].join(' ')}></i>{item.title}
              </Link>
            </Menu.Item>
          )
        )
      } else {
        item.children.forEach(route => {
          if (paths.indexOf(route.key) === 0) {
            this.openKey = item.key
          }
        })

        pre.push(
          (
            <SubMenu key={item.key} title={item.title} style={{ fontSize: '14px' }} className={['icon', 'iconfont', item.icon].join(' ')}>
              {this.getMenuNodes(item.children)}
            </SubMenu>
          )
        )
      }
      return pre
    }, [])
  }

  render() {
    const menuNodes = this.getMenuNodes(menuList)
    let paths = this.props.location.pathname

    if (paths.indexOf('/product') === 0) {
      paths = '/product'
    }

    const openKey = this.openKey
    return (
      <div className='left-nav'>
        <Link to='/home'>
          <header className='left-title'>
            <img src={logo} alt='' />
            <h1>硅谷后台</h1>
          </header>
        </Link>
        <div className='left-menu'>
          <Menu
            mode='inline'
            theme='dark'
            selectedKeys={[paths]}
            defaultOpenKeys={[openKey]}
          >
            {
              menuNodes
            }
          </Menu>
        </div>
      </div>
    )
  }
}

export default withRouter(LeftNav)
