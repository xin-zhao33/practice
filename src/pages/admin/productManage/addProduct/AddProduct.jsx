import React, { Component } from 'react'
import { Form, Input, Upload, Button, Cascader, Card, message } from 'antd'
import { PlusOutlined, ArrowLeftOutlined } from '@ant-design/icons'
import { getCategory, addProduct } from '../../../../api/index'
import './addProduct.less'

const { Item } = Form
const { TextArea } = Input;
function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}
export default class AddProduct extends Component {

  state = {
    fileList: [],
    optionLists: []
  }
  initOption = (data) => {
    const optionLists = data.map(c => ({
      value: c._id,
      label: c.name,
      isLeaf: false,
    }))
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
    console.log(value)
    const { name, desc, price, category, detail, imgs } = value
    // const {categoryId, pCategoryId} = category
    const categoryId = category[1]
    const pCategoryId = category[0]
    this.addProducts({ categoryId, pCategoryId, name, desc, price, detail, imgs })
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
  // 上传
  handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
      previewTitle: file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
    });
  };
  loadData = async selectedOptions => {
    const targetOption = selectedOptions[selectedOptions.length - 1];
    // const targetOption = selectedOptions[0];
    targetOption.loading = true;
    // load options lazily
    const subCategorys = await this.getCategorys(targetOption.value)

    targetOption.loading = false;
    if (subCategorys && subCategorys.length > 0) {
      const childOtions = subCategorys.map(c => ({
        value: c._id,
        label: c.name,
        isLeaf: true,
      }))
      targetOption.children = childOtions
    } else {
      targetOption.isLeaf = true
    }

    this.setState({
      optionLists: [...this.state.optionLists],
    })
  };

  handleChange = ({ fileList }) => this.setState({ fileList });
  componentDidMount() {
    this.getCategorys()
    console.log(this.props.location.state)
    const product = this.props.location.state
    this.status = !!product
  }
  render() {
    const uploadButton = (
      <div>
        <PlusOutlined />
        <div style={{ marginTop: 8 }}>上传图片</div>
      </div>
    )
    const { fileList } = this.state

    const title = (
      <div onClick={() => this.props.history.push('/product')} className='to-home'>
        <ArrowLeftOutlined className='arrow-left' /> <span>{this.status ? '修改商品' : '添加商品'}</span>
      </div>
    )
    const product = this.props.location.state || {}
    product.category = [product.categoryId,product.pCategoryId]
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
            <Upload
              action='http://132.232.84.228:5000/upload'
              listType="picture-card"
              fileList={fileList}
              onPreview={this.handlePreview}
              onChange={this.handleChange}
            >
              {fileList.length >= 8 ? null : uploadButton}
            </Upload>
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
