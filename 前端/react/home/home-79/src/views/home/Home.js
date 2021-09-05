import React from 'react'
import { BrowserRouter, Route, Link, Switch, Redirect} from 'react-router-dom'
import {TabBar} from 'antd-mobile'
import './Home.css'
import '../../assets/fonts/iconfont.css'
import Index from '../index/Index'
import Find from '../find/Find'
import Info from '../info/Info'
import My from '../my/My'


class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedTab: 'index'
        }
    }
    renderMenuItem = () => {
        // 动态生成菜单
        let menuData = [{
            id: 'index',
            title: '主页',
            icon: 'icon-ind'
        },{
            id: 'find',
            title: '找房',
            icon: 'icon-findHouse'
        },{
            id: 'info',
            title: '资讯',
            icon: 'icon-myinfo'
        },{
            id: 'my',
            title: '我的',
            icon: 'icon-my'
        }]
        return menuData.map(item => {
            return (
                <TabBar.Item
                title={item.title}
                key={item.id}
                icon={<i className={'iconfont ' + item.icon}></i>}
                selectedIcon={<i className={'iconfont ' + item.icon}></i>}
                selected={this.state.selectedTab === item.id}
                onPress={() => {
                  this.setState({
                    selectedTab: item.id
                  });
                //  通过编程式导航控制路由跳转
                  console.log(this.props)
                  this.props.history.push('/home/'+ item.id)
                }}
              >
                </TabBar.Item>
            )
        })
    }
    render() {
        return (
            <div className='menu'>
                {/* 顶部内容区 */}
                <Switch>
                    <Redirect exact from='/home' to='/home/index'></Redirect>
                    <Route path='/home/index' component={Index}></Route>
                    <Route path='/home/find' component={Find}></Route>
                    <Route path='/home/info' component={Info}></Route>
                    <Route path='/home/my' component={My}></Route>
                </Switch>
                {/* 底部菜单区 */}
                <TabBar
                    unselectedTintColor="#949494"
                    tintColor="#33A3F4" 
                    barTintColor="white"
                    noRenderContent={true}
                >
                    {this.renderMenuItem()}
                   
                </TabBar>
            </div>
        )
    }
}

export default Home