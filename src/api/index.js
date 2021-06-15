import ajax from './api'
// export function reqLogin (username,password){
//   return ajax('/login',{username,password},'POST')
// }

export const reqLogin = (username, password) => ajax('/login', { username, password }, 'POST')

export const reqAddUser = (user) => ajax('/manage/user/add',user,'POST')