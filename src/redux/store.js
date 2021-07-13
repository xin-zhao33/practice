// redux 核心管理库
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk' // 异步redux
import { composeWithDevTools } from 'redux-devtools-extension'

import reducer from './reducer'
// 向外默认暴露store
export default createStore(reducer, composeWithDevTools(applyMiddleware(thunk)))
