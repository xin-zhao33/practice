import ajax from './api'
import jsonp from 'jsonp'
import { Message } from 'antd'

// 登录
export const reqLogin = (username, password) =>
  ajax('/login', { username, password }, 'POST')

export const reqAddUser = user => ajax('/manage/user/add', user, 'POST')

// 高德 天气

export const reqWeather = city => {
  return new Promise((resolve, reject) => {
    const url = `https://restapi.amap.com/v3/weather/weatherInfo?key=7354f4b04428c25eb951b4230130f5ba&city=${city}`
    jsonp(url, {}, (err, data) => {
      // console.log('jsonp()',err,data)
      if (data.count === '1' && data.info === 'OK') {
        const weatherInfo = data.lives[0]
        resolve(weatherInfo)
      } else {
        Message.error('获取天气数据失败!')
      }
    })
  })
}

