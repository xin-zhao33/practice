import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import store from './redux/store'

import 'antd/dist/antd.css'
import './assets/font/iconfont.css'

import { getUsers } from './utils/storyUtils'
import memoryUtils from './utils/memoryUtils'

import App from './App'

const users = getUsers()
memoryUtils.users = users

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
