import React, { Component } from 'react'
import AddCategroy from './form/AddCategroy'
import EditCategroy from './form/EditCategroy';
import { Card, Button, Table, message, Modal } from 'antd';
import { PlusOutlined, ArrowRightOutlined } from '@ant-design/icons'

import LinkButton from '../../../components/link-button';
import { getCategory } from '../../../api/index.js'

export default class Category extends Component {

  state = {
    loading: false,
    firstTableList: [],
    secondTableList: [],
    parentId: '0',
    categoryName: '',
    showStatus: 0, // 1 添加  2 修改
  }

  initTable = () => {
    this.columns = [
      {
        title: '分类名称',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '操作',
        width: 300,
        render: (categroy) => (
          <span >
            <LinkButton onClick={() => { this.editCategoryInfo(categroy) }}>修改分类</LinkButton>
            {
              this.state.parentId === '0' ? <LinkButton onClick={() => { this.subCategroy(categroy) }}>查看子分类</LinkButton> : null
            }

          </span>
        ),
      },
    ]
  }

  getTableList = async () => {

    const { parentId } = this.state
    this.setState({ loading: true })
    const res = await getCategory(parentId)
    this.setState({ loading: false })
    if (res.status === 0) {
      if (parentId === '0') {

        this.setState({ firstTableList: res.data })
      } else {
        this.setState({ secondTableList: res.data })
      }
    } else {
      message.error('请求分类列表数据失败!')
    }
  }

  subCategroy = (categroy) => {
    this.setState({
      parentId: categroy._id,
      categoryName: categroy.name
    }, () => {
      this.getTableList()
    })
  }

  showFirstTableList = () => {
    this.setState({
      secondTableList: [],
      parentId: '0',
      categoryName: ''
    })
  }
  // 关闭
  handleCancel = () => {
    this.setState({
      showStatus: 0
    })
  }
  // 添加
  addCategoryInfo = () => {
    this.setState({
      showStatus: 1
    })
  }

  getFormData = () => {
    // this.child.onFinish()
    console.log(this)
  }

  addOk = () => {
    this.getFormData()
  }
  // 编辑
  editCategoryInfo = (categroy) => {
    this.setState({
      showStatus: 2
    })
    this.dataName = categroy.name
    console.log(categroy)
  }
  componentDidMount() {
    this.getTableList()
  }

  componentWillMount() {
    this.initTable()
  }
  render() {
    const { firstTableList, loading, secondTableList, parentId, categoryName, showStatus } = this.state

    const title = parentId === '0' ? '一级分类标题' : (
      <span>
        <LinkButton onClick={this.showFirstTableList}>一级分类标题</LinkButton>
        <ArrowRightOutlined />
        <span>{categoryName}</span>
      </span>
    )

    const extra = (
      <Button type="primary" onClick={this.addCategoryInfo}>
        <PlusOutlined />添加
      </Button>
    )

    const dataName = this.dataName || ''

    return (
      <div>
        <Card title={title} extra={extra} style={{ width: '100%' }}>
          <Table loading={loading} rowKey='_id' bordered dataSource={parentId === '0' ? firstTableList : secondTableList} columns={this.columns} pagination={{ defaultPageSize: 5 }} />
        </Card>
        {/* 添加 */}
        <Modal title="Basic Modal" visible={showStatus === 1} onOk={this.addOk} onCancel={this.handleCancel}>
          <AddCategroy></AddCategroy>
        </Modal>
        {/* 修改 */}
        <Modal title="修改分类" visible={showStatus === 2} onOk={this.edidOk} onCancel={this.handleCancel}>
          <EditCategroy categroyInfo={dataName} onRef={(ref) => { this.child = ref }}></EditCategroy>
        </Modal>
      </div>
    )
  }
}
