import React, { Component } from 'react'
import { Form, Input, Button, Cascader, Card, message } from 'antd'
import { ArrowLeftOutlined } from '@ant-design/icons'
import { getCategory, addProduct } from '../../../../api/index'
import UploadImg from './UploadImg'
import './addProduct.less'

const { Item } = Form
const { TextArea } = Input;

export default class AddProduct extends Component {

  constructor(props) {
    super(props)
    this.imgs = React.createRef();
  }
  state = {
    optionLists: []
  }

  initOption = async (data) => {
    const optionLists = data.map(c => ({
      value: c._id,
      label: c.name,
      isLeaf: false,
    }))

    if (this.status) {
      const { categoryId } = this.props.location.state || {}
      const sub = await this.getCategorys(categoryId)
      console.log(sub)
      const childOtions = sub.map(c => ({
        value: c._id,
        label: c.name,
        isLeaf: true,
      }))
      console.log(childOtions)
      const targetOption = optionLists.find(option => option.value === categoryId)
      console.log(targetOption)
      targetOption.children = childOtions
    }
    this.setState({ optionLists })
  }
  getCategorys = async (parentId) => {
    const res = await getCategory(parentId)
    if (res.status === 0) {
      const result = res.data
      if (!parentId) {
        this.initOption(result)
      } else {
        return result
      }
    }
  }
  onFinish = (value) => {

    // const { name, desc, price, category, detail, imgs } = value
    value.imgs = this.imgs.current.getImgs()
    console.log(value)
    // // const {categoryId, pCategoryId} = category
    // const categoryId = category[1]
    // const pCategoryId = category[0]
    // this.addProducts({ categoryId, pCategoryId, name, desc, price, detail, imgs })
  }
  addProducts = async ({ categoryId, pCategoryId, name, desc, price, detail, imgs }) => {
    const res = await addProduct({ categoryId, pCategoryId, name, desc, price, detail, imgs })
    console.log(res)
    if (res.status === 0) {
      message.success('添加商品成功!')
      this.props.history.push('/product')
    }
  }
  validator = (_, value, callBack) => {
    if (value * 1 > 0) {
      callBack()
    } else {
      callBack('价格必须大于0')
    }
  }

  loadData = async selectedOptions => {
    // 得到选择的option对象
    const targetOption = selectedOptions[0]
    // 显示loading
    targetOption.loading = true

    // 根据选中的分类, 请求获取二级分类列表
    const subCategorys = await this.getCategorys(targetOption.value)
    // 隐藏loading
    targetOption.loading = false
    // 二级分类数组有数据
    if (subCategorys && subCategorys.length>0) {
      // 生成一个二级列表的options
      const childOptions = subCategorys.map(c => ({
        value: c._id,
        label: c.name,
        isLeaf: true
      }))
      // 关联到当前option上
      targetOption.children = childOptions
    } else { // 当前选中的分类没有二级分类
      targetOption.isLeaf = true
    }

    // 更新options状态
    this.setState({
      optionLists: [...this.state.optionLists],
    })
  }

  componentDidMount() {
    this.getCategorys()

    const product = this.props.location.state
    this.status = !!product
  }
  render() {


    const title = (
      <div onClick={() => this.props.history.push('/product')} className='to-home'>
        <ArrowLeftOutlined className='arrow-left' /> <span>{this.status ? '修改商品' : '添加商品'}</span>
      </div>
    )
    const product = this.props.location.state || {}
    product.category = [product.categoryId, product.pCategoryId]
    // const { name, desc, price } = product || {}
    return (
      <Card title={title}>
        <Form
          onFinish={this.onFinish}
          wrapperCol={{ span: 8 }}
        initialValues={product}
        >
          <Item label='商品名称' name="name" rules={[{ required: true, message: '请输入商品名称!' }]}>
            <Input placeholder='请输入商品名称'></Input>
          </Item>
          <Item label='商品描述' name='desc' rules={[{ required: true, message: '请输入商品描述!' }]}>
            <TextArea autoSize={{ minRows: 2, maxRows: 6 }} ></TextArea>
          </Item>
          <Item label='商品价格' name='price' rules={[{ required: true, message: '请输入商品价格!' }, { validator: this.validator }]} >
            <Input type='number' addonAfter="元" ></Input>
          </Item>
          <Item label='商品分类' name='category' rules={[{ required: true, message: '请选择商品分类!' }]}>
            <Cascader
              options={this.state.optionLists} loadData={this.loadData} >
            </Cascader>
          </Item>
          <Item label='商品图片' name='imgs'>
            <UploadImg ref={this.imgs} />
          </Item>
          <Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Item>
        </Form>
      </Card >

    )
  }
}
