import React, { Component } from 'react'
import { BrowserRouter, Route, Switch,Redirect } from 'react-router-dom'
import Login from './pages/login/Login'
import Admin from './pages/admin/Admin'

export default class App extends Component {
  render () {
    return (
      <BrowserRouter>
        <Switch>
          <Route path='/login' component={Login}></Route>
          <Route path='/admin' component={Admin}></Route>
          <Redirect from='/' to='/login' />
        </Switch>
      </BrowserRouter>
    )
  }
}
