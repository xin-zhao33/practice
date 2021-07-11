import React, { Component } from 'react'
import { Card, Button, Table, Modal, message } from 'antd'
import AddRole from './AddRole'
import MenuManage from './MenuManage'
import { roleList, addRoleName, updateRole } from '../../../api/index'
import { PAGE_SIZE } from '../../../utils/constants'
import { formateDate } from '../../../utils/dateUtils'

export default class RoleManage extends Component {
  constructor(props) {
    super(props);
    this.columns = [
      {
        title: '角色名称',
        dataIndex: 'name',
      },
      {
        title: '创建时间',
        dataIndex: 'create_time',
        render: (create_time) => formateDate(create_time)
      },
      {
        title: '授权时间',
        dataIndex: 'auth_time',
        render: formateDate
      },
      {
        title: '授权人',
        dataIndex: 'auth_name',
      },
    ]
    this.addInfo = React.createRef()
    this.updateRole = React.createRef()
  }
  state = {
    dataSource: [],
    selectedRowKeys: [],
    isVisible: false,
    isManage: false
  }
  onRow = (role) => {
    return {
      onClick: event => {
        this.role = role
        this.setState({ selectedRowKeys: [role._id] })
      }, // 点击行
    }
  }
  getTableData = async () => {
    const res = await roleList()
    console.log(res)
    if (res.status === 0) {
      const dataSource = [...res.data]
      this.setState({
        dataSource
      })
    }

  }
  onSelectChange = selectedRowKeys => {
    this.setState({ selectedRowKeys });
  }

  AddUserRole = () => {
    this.setState({
      isVisible: true
    })
  }
  addOk = async () => {
    const roleName = this.addInfo.current.state.inputVal
    const res = await addRoleName({ roleName })
    if (res.status === 0) {
      message.success('添加角色成功!')
      this.getTableData()
      this.addInfo.current.setState({
        inputVal: ''
      })
    } else {
      message.success(res.msg)
    }
    this.setState({
      isVisible: false
    })
  }

  addCancel = () => {
    this.addInfo.current.setState({
      inputVal: ''
    })
    this.setState({
      isVisible: false
    })
  }
  // 管理权限
  setRole = () => [
    this.setState({
      isManage: true
    })
  ]
  setOk = async () => {
    this.role.menus = this.updateRole.current.state.menus
    const res = await updateRole(this.role)
    console.log(res)
    if (res.status === 0) {
      message.success('修改权限成功!')
      const selectedRowKeys = [...res.data]
      this.setState({
        selectedRowKeys
      })
    }
    this.setState({
      isManage: false
    })
  }

  setCancel = () => {
    this.setState({
      isManage: false
    })
  }

  componentDidMount() {
    this.getTableData()
  }


  render() {
    const { dataSource, selectedRowKeys, isVisible, isManage } = this.state
    const hasSelected = selectedRowKeys.length;
    const title = (
      <div>
        <Button type='primary' style={{ marginRight: '10px' }} onClick={this.AddUserRole}>创建角色</Button>
        <Button type='primary' disabled={hasSelected === 0 ? true : false} onClick={this.setRole}>设置角色权限</Button>
      </div>
    )

    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
      type: 'radio'
    }


    return (
      <Card title={title}>
        <Table
          rowKey='_id'
          bordered
          rowSelection={rowSelection}
          columns={this.columns}
          dataSource={dataSource}
          onRow={this.onRow}
          pagination={{ defaultPageSize: PAGE_SIZE, defaultCurrent: 1 }}
        ></Table>
        <Modal title="添加角色" visible={isVisible} onOk={this.addOk} onCancel={this.addCancel}>
          <AddRole ref={this.addInfo} ></AddRole>
        </Modal>
        <Modal title='修改权限' visible={isManage} onOk={this.setOk} onCancel={this.setCancel}>
          <MenuManage role={this.role} ref={this.updateRole}></MenuManage>
        </Modal>
      </Card>
    )
  }
}
