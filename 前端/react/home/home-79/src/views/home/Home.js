import React from 'react'
// import { BrowserRouter, Route, Link} from 'react-router-dom'
import {TabBar} from 'antd-mobile'
import './Home.css'

class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedTab: ''
        }
    }
    renderMenuItem = () => {
        // 动态生成菜单
        let menuData = [{
            id: 'home',
            title: '主页'
        },{
            id: 'find',
            title: '找房'
        },{
            id: 'info',
            title: '资讯'
        },{
            id: 'my',
            title: '我的'
        }]
        return menuData.map(item => {
            return (
                <TabBar.Item
                title={item.title}
                key={item.id}
                icon={<div style={{
                  width: '22px',
                  height: '22px',
                  background: 'url(https://zos.alipayobjects.com/rmsportal/sifuoDUQdAFKAVcFGROC.svg) center center /  21px 21px no-repeat' }}
                />
                }
                selectedIcon={<div style={{
                  width: '22px',
                  height: '22px',
                  background: 'url(https://zos.alipayobjects.com/rmsportal/iSrlOTqrKddqbOmlvUfq.svg) center center /  21px 21px no-repeat' }}
                />
                }
                selected={this.state.selectedTab === item.id}
                onPress={() => {
                  this.setState({
                    selectedTab: item.id
                  });
                }}
              >
                    </TabBar.Item>
            )
        })
    }
    render() {
        return (
            <div className='menu'>
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