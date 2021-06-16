import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { Layout } from 'antd';
import memoryUtils from '../../utils/memoryUtils'
import LeftNav from './components/leftNav/LeftNav'
import NavTop from './components/header/NavTop'

const { Header, Footer, Sider, Content } = Layout;


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
          <Header>
            <NavTop />
          </Header>
          <Content>Content</Content>
          <Footer>Footer</Footer>
        </Layout>
      </Layout>
    )
  }
}
