import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';

import {getUsers} from './utils/storyUtils'
import memoryUtils from './utils/memoryUtils'

import App from './App';

const users = getUsers()
memoryUtils.users = users

ReactDOM.render(

    <App />,
  document.getElementById('root')
);


