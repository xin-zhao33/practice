import React, { Component } from 'react'
import { Card, Select, Input, Button, Table, Space, message } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import LinkButton from '../../../../components/link-button'

import { PAGE_SIZE } from '../../../../utils/constants'
import { productList, queryProduct } from '../../../../api/index'

import './ProductHome.less'

export default class ProductHome extends Component {

  state = {
    dataSource: [],
    loading: false,
    total: '',
    searchType: 'productName',
    searchName: '',
    pageNum: 1
  }
  // 表格初始化
  initTable = () => {
    this.columns = [
      {
        title: '商品名称',
        dataIndex: 'name',
      },
      {
        title: '商品描述',
        dataIndex: 'desc',
      },
      {
        title: '价格',
        dataIndex: 'price',
        render: (price) => '￥' + price
      },
      {
        title: '状态',
        dataIndex: 'status',
        render: (status) => {
          return (
            <div>
              <Button type='primary'>下架</Button>
              <span>在售</span>
            </div>
          )
        }
      },
      {
        title: '操作',
        render: (product) => (
          <Space size="middle">
            <LinkButton onClick={() => this.props.history.push('/product/addupdate', product)}>编辑</LinkButton>
            <LinkButton onClick={() => this.props.history.push('/product/detail', product)}>详情</LinkButton>
          </Space>
        ),
      },
    ];
  }
  // 添加
  toAddPages = () => {
    this.props.history.push('/product/addupdate')
  }
  // 列表数据
  getTableList = async (pageNum) => {
    const { searchName, searchType } = this.state
    this.setState({ loading: true })
    let res
    if (searchName) {
      res = await queryProduct({ searchType, searchName, pageNum, pageSize: PAGE_SIZE, })
      this.setState({ loading: false })
    } else {
      res = await productList({ pageNum, pageSize: PAGE_SIZE })
      this.setState({ loading: false })
    }
    if (res.status === 0) {
      console.log(res)
      this.setState({
        dataSource: res.data.list,
        total: res.data.total
        // dataSource: [{
        //   "status": 1,
        //   "imgs": [
        //     "image-1559402396338.jpg"
        //   ],
        //   "_id": "5ca9e05db49ef916541160cd",
        //   "name": "联想ThinkPad 翼4809",
        //   "desc": "年度重量级新品，X390、T490全新登场 更加轻薄机身设计9",
        //   "price": 65999,
        //   "pCategoryId": "5ca9d6c0b49ef916541160bb",
        //   "categoryId": "5ca9db9fb49ef916541160cc",
        //   "detail": "<p><span style=\"color: rgb(228,57,60);background-color: rgb(255,255,255);font-size: 12px;\">想你所需，超你所想！精致外观，轻薄便携带光驱，内置正版office杜绝盗版死机，全国联保两年！</span> 222</p>\n<p><span style=\"color: rgb(102,102,102);background-color: rgb(255,255,255);font-size: 16px;\">联想（Lenovo）扬天V110 15.6英寸家用轻薄便携商务办公手提笔记本电脑 定制【E2-9010/4G/128G固态】 2G独显 内置</span></p>\n<p><span style=\"color: rgb(102,102,102);background-color: rgb(255,255,255);font-size: 16px;\">99999</span></p>\n",
        //   "__v": 0
        // },]
      })
    } else {
      message.error(res.msg)
    }

  }
  // input 
  inputValue = (e) => {
    console.log(e.target.value)
    this.setState({
      searchName: e.target.value
    })
  }
  // select
  selectInfo = (value) => {
    console.log(value)
    this.setState({
      searchType: value
    })
  }
  // 分页
  onChange = (page) => {
    this.getTableList(page)
  }



  componentDidMount() {
    this.initTable()
    this.getTableList(1)
  }
  render() {

    const { dataSource, total, searchType, searchName } = this.state

    const title = (
      <div className='product-l'>
        <Select defaultValue={searchType} className='select' onChange={this.selectInfo}>
          <Select.Option value="productName">按名称搜索</Select.Option>
          <Select.Option value="productDesc">按描述搜索</Select.Option>
        </Select>
        <Input placeholder='请输入关键字' className='input' value={searchName} onChange={this.inputValue} />
        <Button type='primary' onClick={() => this.getTableList(1)}>搜索</Button>
      </div>
    )
    const extra = (
      <div>
        <Button type='primary' onClick={this.toAddPages}><PlusOutlined />添加商品</Button>
      </div>
    )



    return (
      <Card title={title} extra={extra}>
        <div>
          <Table
            rowKey="_id"
            dataSource={dataSource}
            columns={this.columns}
            bordered
            pagination={{ defaultPageSize: PAGE_SIZE, showSizeChanger: false, total, onChange: this.onChange }} />
        </div>
      </Card>
    )
  }
}
