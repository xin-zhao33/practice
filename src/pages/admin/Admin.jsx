import React, { Component } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { Layout } from 'antd';
import memoryUtils from '../../utils/memoryUtils'
import LeftNav from './components/leftNav/LeftNav'
import NavTop from './components/header/NavTop'
import Home from './home/Home'
import ProductManage from './productManage/ProductManage'
import Category from './category/Category'
import UserManage from './userManage/UserManage'
import RoleManage from './roleManage/RoleManage'
import BarManage from './barManage/BarManage'
import LineManage from './lineManage/LineManage'
import PieManage from './pieManage/PieManage'

const { Footer, Sider, Content } = Layout;


export default class Admin extends Component {
  render() {
    const users = memoryUtils.users
    if (!users || !users._id) {
      return <Redirect to='/login' />
    }
    return (

      <Layout style={{ height: "100%", }}>
        <Sider>
          <LeftNav />
        </Sider>
        <Layout>
          <NavTop />
          <Content>

            <Switch>
              <Route path='/home' component={Home}></Route>
              <Route path='/category' component={Category}></Route>
              <Route path='/product' component={ProductManage}></Route>
              <Route path='/user' component={UserManage}></Route>
              <Route path='/role' component={RoleManage}></Route>
              <Route path='/charts/bar' component={BarManage}></Route>
              <Route path='/charts/line' component={LineManage}></Route>
              <Route path='/charts/pie' component={PieManage}></Route>
              <Redirect to='/home'/>
            </Switch>

          </Content>
          <Footer style={{ textAlign: 'center', color: '#ccc' }}>推荐使用谷歌浏览器,可以获得更加页面操作体验</Footer>
        </Layout>
      </Layout>
    )
  }
}
