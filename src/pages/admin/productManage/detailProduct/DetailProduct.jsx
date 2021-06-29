import React, { Component } from 'react'
import { Card, List } from 'antd'
import { ArrowLeftOutlined } from '@ant-design/icons'
import { BASE_URL_IMGS } from '../../../../utils/constants'
import './DetailsProduct.less'

const Item = List.Item
export default class DetailProduct extends Component {
  render() {
    const title = (
      <div onClick={() => this.props.history.push('/product')} className='to-home'>
        <ArrowLeftOutlined className='arrow-left' /> <span>商品详情</span>
      </div>
    )
    const { desc, name, detail, price, imgs } = this.props.location.state
    return (
      <Card title={title}>
        <List>
          <Item className='list-item'>
            <span className='list-l'>商品名称:</span>
            <span>{name}</span>
          </Item>
          <Item className='list-item'>
            <span className='list-l'>商品描述:</span><span>{desc}</span>
          </Item>
          <Item className='list-item'>
            <span className='list-l'>商品价格:</span><span>{price}元</span>
          </Item>
          <Item className='list-item'>
            <span className='list-l'>所属分类:</span><span>联想ThinkPad</span>
          </Item>
          <Item className='list-item'>
            <span className='list-l'>商品图片:</span>
            {
              imgs.map((img, index) => {
                return (
                  <img key={index} src={BASE_URL_IMGS + img} alt="img" />
                )
              })
            }
          </Item>
          <Item className='list-item'>
            <span className='list-l'>商品详情:</span>
            <span dangerouslySetInnerHTML={{ __html: detail }}></span>
          </Item>
        </List>
      </Card>
    )
  }
}
