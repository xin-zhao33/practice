//根据老的state 和指定的action 生成并返回新的state的函数
import { combineReducers } from 'redux'

import { getUsers } from '../utils/storyUtils.js'
import { SET_HEAD_TITLE , RECEIVE_USER} from './action_types'

const initHeadTitle = '首页'
function headTitle (state = initHeadTitle, action) {
  switch (action.type) {
    case SET_HEAD_TITLE:
      return action.data
    default:
      return state
  }
}
  
const initUser = getUsers() || {}
function user (state = initUser, action) {
  switch (action.type) {
    case RECEIVE_USER:
      return action.user
    default:
      return state
  }
}

export default combineReducers({
  headTitle,
  user
})
