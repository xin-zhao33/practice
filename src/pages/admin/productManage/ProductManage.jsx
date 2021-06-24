import React, { Component } from 'react'
import {Route,Switch,Redirect} from 'react-router-dom'
import ProductHome from './productHome/ProductHome'
import AddProduct from './addProduct/AddProduct'
import DetailProduct from './detailProduct/DetailProduct'

export default class ProductManage extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route path='/product' component={ProductHome} exact />
          <Route path='/product/addupdate' component={AddProduct} />
          <Route path='/product/detail' component={DetailProduct} />
          <Redirect to='product' />
        </Switch>
      </div>
    )
  }
}
