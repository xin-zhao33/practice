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


// 品类列表
export const getCategory = (parentId)=>ajax('/manage/category/list',{parentId},'GET')

// 添加分类
export const addCategory = ({parentId,categoryName})=>ajax('/manage/category/add',{parentId,categoryName},'POST')

// 编辑分类
export const editCategory = ({categoryId,categoryName})=>ajax('/manage/category/update',{categoryId,categoryName},'POST')

// 商品管理列表
export const productList =({pageNum,pageSize})=>ajax('/manage/product/list',{pageNum,pageSize},'GET')

// 商品搜索
export const queryProduct=({pageNum,pageSize,searchName,searchType})=>ajax('/manage/product/search',{pageNum,pageSize,[searchType]:searchName},'GET')

// 添加商品
export const addProduct = ({categoryId,pCategoryId,name,desc,price,detail,imgs})=>ajax('/manage/product/add',{categoryId,pCategoryId,name,desc,price,detail,imgs},'POST')

// 更新商品
export const updateProduct = ({_id,categoryId,pCategoryId,name,desc,price,detail,imgs})=>ajax('/manage/product/update',{_id,categoryId,pCategoryId,name,desc,price,detail,imgs},'POST')

// 角色列表
export const roleList =()=>ajax('/manage/role/list', 'GET')

// 添加角色
export const addRoleName = ({roleName})=> ajax('/manage/role/add', {roleName} ,'POST')

// 更新权限 
export const updateRole = (role) => ajax('/manage/role/update',role,'POST')