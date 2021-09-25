import './App.css';
import { Button } from 'antd-mobile'
import 'antd-mobile/dist/antd-mobile.css'
// 配置整体路由
import { BrowserRouter, Route, Redirect, Switch} from 'react-router-dom'

import Login from './views/login/Login'
import Home from './views/home/Home'
import City from './views/City';

import Test from './views/Test'

import axios from 'axios';

//配置请求基本路径
axios.defaults.baseURL = 'http://localhost:8080/'
//配置响应拦截器
axios.interceptors.response.use((res)=>{
  return res.data
})

function NotFound () {
  return <div>没有该页面</div>
}
function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/login' component={Login}></Route>
        <Route path='/home' component={Home}></Route>
        <Route path='/city' component={City}></Route>
        <Route path='/test' component={Test}></Route>
        <Redirect exact from='/' to='/home'></Redirect>
        <Route component={NotFound}></Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
