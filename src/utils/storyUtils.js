import store from 'store'
const USER_KEY = 'user_key'

function saveUsers(val) {
  // localStorage.setItem(USER_KEY, JSON.stringify(val))
  store.set(USER_KEY, val)
}

function getUsers() {
  // return JSON.parse(localStorage.getItem(USER_KEY) || '{}')
  return store.get(USER_KEY)
}

function removeUser() {
  // localStorage.removeItem(USER_KEY)
  store.remove(USER_KEY)
}

export {saveUsers, getUsers, removeUser}

