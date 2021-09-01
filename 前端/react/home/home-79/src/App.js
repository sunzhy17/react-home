import './App.css';
import { Button } from 'antd-mobile'
import 'antd-mobile/dist/antd-mobile.css'
// 配置整体路由
import { BrowserRouter, Route, Redirect, Switch} from 'react-router-dom'

import Login from './views/login/Login'
import Home from './views/home/Home'


function NotFound () {
  return <div>没有该页面</div>
}
function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/login' component={Login}></Route>
        <Route path='/home' component={Home}></Route>
        <Redirect exact from='/' to='/home'></Redirect>
        <Route component={NotFound}></Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
