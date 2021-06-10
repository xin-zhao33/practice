import React, { Component } from 'react'
import { Button ,message} from 'antd';

export default class App extends Component {

  handelClick = ()=>{
    message.info('This is a normal message');
  }

  render() {
    return (
      <div>
       <Button type='primary' onClick={this.handelClick}>primary</Button>
      </div>
    )
  }
}
