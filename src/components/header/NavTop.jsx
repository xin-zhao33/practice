import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import { Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';

import LinkButton from '../link-button/index.jsx';
import { formateDate } from '../../utils/dateUtils.js'
import memoryUtils from '../../utils/memoryUtils'
import { removeUser } from '../../utils/storyUtils'
import { reqWeather } from '../../api/index.js'
import menuList from '../../config/menuConfig'

import './NavTop.less'

class NavTop extends Component {
  state = {
    curTime: formateDate(new Date()),
    weather: '',
    temperature: '',
    city: ''
  }



  getWeather = async () => {
    try {
      const res = await reqWeather(610100)
      const { weather, temperature, city } = res
      this.setState({ weather, temperature, city })
    } catch (error) {
      console.log(error)
    }
  }

  getTitle = () => {
    const path = this.props.location.pathname
    let title
    menuList.forEach(item => {
      if (item.key === path) {
        title = item.title
      } else if (item.children) {
        item.children.forEach(cItem => {
          if (cItem.key === path) {
            title = item.title
          }
        })
      }
    })
    return title
  }

  getTime = () => {
    this.timer = setInterval(() => {
      const curTime = formateDate(new Date())
      this.setState({ curTime })
    }, 1000);
  }

  logout = () => {
    Modal.confirm({
      title: '您确定要退出吗?',
      icon: <ExclamationCircleOutlined />,
      onOk:()=> {
        memoryUtils.users = {}
        removeUser()
        this.props.history.replace('/login')
      }
    });
  }

  componentDidMount() {
    this.getTime()
    this.getWeather()
  }

  componentWillUnmount() {
    clearInterval(this.timer)
  }

  render() {
    const { curTime, weather, temperature, city } = this.state
    const users = memoryUtils.users.username
    const title = this.getTitle()
    return (
      <div className='headers'>
        <div className='header-top'>
          <span>欢迎,{users}</span>
          {/* <span className='logout' onClick={this.logout}>退出</span> */}
          <LinkButton onClick={this.logout}>退出</LinkButton>
        </div>
        <div className='header-bottom'>
          <div className='header-bottom-l'>{title}</div>
          <div className='header-bottom-r'>
            <span>{curTime}</span>
            <span>{city}</span>
            <span>{temperature}°</span>
            <span>{weather}</span>
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(NavTop)
