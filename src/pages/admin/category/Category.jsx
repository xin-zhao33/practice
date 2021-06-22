import React, { Component } from 'react'
import AddCategroy from './form/AddCategroy'
import EditCategroy from './form/EditCategroy';
import { Card, Button, Table, message, Modal } from 'antd';
import { PlusOutlined, ArrowRightOutlined } from '@ant-design/icons'

import LinkButton from '../../../components/link-button';
import { getCategory, editCategory, addCategory } from '../../../api/index.js'

export default class Category extends Component {

  state = {
    loading: false,
    firstTableList: [],
    secondTableList: [],
    categroyList: [],
    parentId: '0',
    categoryName: '',
    categoryId: '',
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
  // 表格数据
  getTableList = async () => {

    const { parentId } = this.state
    this.setState({ loading: true })
    const res = await getCategory(parentId)
    this.setState({ loading: false })
    if (res.status === 0) {
      if (parentId === '0') {

        this.setState({ firstTableList: res.data })
        this.setState({
          categroyList: res.data
        })
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
    this.setState({
      categroyList: this.state.firstTableList
    })
  }
  // 关闭
  handleCancel = () => {
    this.setState({
      showStatus: 0,
    })

    this.child.setState({ inputVal: '' })
  }
  // 添加
  addCategoryInfo = () => {
    this.setState({
      showStatus: 1
    })
  }

  addOk = async () => {
    const parentId = this.child.state.selectInfo || '0'
    const categoryName = this.child.state.inputVal
    const res = await addCategory({ parentId, categoryName })
    if (res.status === 0) {
      message.success('添加成功')
      if (parentId === '0') {
        this.getTableList()
      }
      this.setState({
        showStatus: 0,
      })
    } else {
      message.error(res.msg)
    }
  }
  // 编辑
  editCategoryInfo = (categroy) => {
    this.setState({
      showStatus: 2
    })
    this.dataName = categroy.name
    this.setState({
      categoryId: categroy._id
    })
  }

  subForm = React.createRef()

  editOk = async () => {
    const categoryName = this.subForm.current.state.inputVal
    const { categoryId } = this.state
    const res = await editCategory({ categoryId, categoryName })
    if (res.status === 0) {
      message.success('修改成功!')
      this.getTableList()
      this.setState({
        showStatus: 0
      })
    } else {
      message.error('修改数据失败!')
      this.setState({
        showStatus: 0
      })
    }
  }

  componentDidMount() {
    this.getTableList()
  }

  componentWillMount() {
    this.initTable()
  }
  render() {
    const { firstTableList, loading, secondTableList, parentId, categoryName, showStatus, categroyList } = this.state
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
          <Table loading={loading} rowKey='_id' bordered dataSource={parentId === '0' ? firstTableList : secondTableList} columns={this.columns} pagination={{ defaultPageSize: 5,pageSizeOptions:[5,15,25],showSizeChanger:false }} />
        </Card>
        {/* 添加 */}
        <Modal title="Basic Modal" visible={showStatus === 1} onOk={this.addOk} onCancel={this.handleCancel}>
          <AddCategroy categroyList={categroyList} parentId={parentId} ref={c => this.child = c}></AddCategroy>
        </Modal>
        {/* 修改 */}
        <Modal title="修改分类" visible={showStatus === 2} onOk={this.editOk} onCancel={this.handleCancel}>
          <EditCategroy categroyInfo={dataName} ref={this.subForm} />
        </Modal>
      </div>
    )
  }
}
