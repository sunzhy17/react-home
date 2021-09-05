// 主页
import React from 'react'
import { NavBar, Icon, Carousel, Flex, WhiteSpace, Grid } from 'antd-mobile'
import axios from 'axios'
import './Index.scss'

// 菜单的路径
import nav1 from '../../assets/images/nav-1.png'
import nav2 from '../../assets/images/nav-2.png'
import nav3 from '../../assets/images/nav-3.png'
import nav4 from '../../assets/images/nav-4.png'

class Index extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            swiper: [],
            groups: [],
            news: [],
            imgHeight: 212
        }
    }
    componentDidMount() {
        this.loadSwiper()
        this.loadGroup()
        this.loadNews()
    }
    loadSwiper= async () => {
        // axios.get('home/swiper')
        //     .then(res => {
        //         this.setState({
        //             swiper: res.data.body,
        //             imgHeight: 212
        //         })
        //     })
        let res = await axios.get('home/swiper')
        this.setState({
            swiper: res.body
        })
    }
    renderSwiper = () => {
        return this.state.swiper.map(item => {
            return (
                <a
                    key={item.id}
                    href="http://itcast.cn"
                    style={{ display: 'inline-block', width: '100%', height: this.state.imgHeight }}
                >
                <img
                    src={'http://localhost:8080'+item.imgSrc}
                    alt=""
                    style={{ width: '100%', verticalAlign: 'top' }}
                    onLoad={() => {
                        // 图片加载完成时出发
                        window.dispatchEvent(new Event('resize'));
                        //处理a标签的高度
                        this.setState({ imgHeight: 'auto' });
                    }}
                />
                </a>
            )
        })
    }
    renderMenu = () => {
        let menuData = [{
            id: 1,
            mname: '整租',
            imgSrc: nav1
        },{
            id: 2,
            mname: '合租',
            imgSrc: nav2
        },{
            id: 3,
            mname: '地图找房',
            imgSrc: nav3
        },{
            id: 4,
            mname: '去出租',
            imgSrc: nav4
        }]
        return menuData.map(item => (
            <Flex.Item key={item.id}>
                <img src={item.imgSrc} ></img>
                <p>{item.mname}</p>
            </Flex.Item>
        ))
    }
    loadGroup = async() => {
        // 租房小组数据加载
        let data = await axios.get('home/groups')
        this.setState({
            groups: data.body
        })
    }
    renderGridItem = (item) => {
        return (
            <Flex className='grid-item' justify='between'>
                <div className="desc">
                    <h3>{item.title}</h3>
                    <p>{item.desc}</p>
                </div>
                <img src={`http://localhost:8080${item.imgSrc}`} alt="" />
            </Flex>
        )
    }
    loadNews = async() => {
        // 最新资讯
        let data = await axios.get('home/news')
        this.setState({
            news: data.body
        })
    }
    renderNews = () => {
        return this.state.news.map(item => (
            <div className="news-item" key={item.id}>
                <div className="imgwrap">
                    <img className="img" src={`http://localhost:8080${item.imgSrc}`} alt=''></img>
                </div>
                <Flex className="content" direction="column" justify="between">
                    <h3 className="title">{item.title}</h3>
                    <Flex className="info" justify="between">
                        <span>{item.from}</span>
                        <span>{item.date}</span>
                    </Flex>
                </Flex>
            </div>
        ))
    }
    render() {
        return (
            <div>
                {/* 导航栏 */}
                <NavBar
                    mode="dark"
                    leftContent={'深圳'}
                    rightContent={[
                        <Icon key="0" type="search" style={{ marginRight: '16px' }} />
                    ]}
                    >首页</NavBar>
                {/* 轮播图 */}
                <Carousel
                    autoplay={false}
                    infinite>
                   {this.renderSwiper()}
                </Carousel>
                {/* 菜单 */}
                <WhiteSpace size="lg" />
                <Flex className='home-menu'>
                    {this.renderMenu()}
                </Flex>
                {/* 租房小组 */}
                <div className='group'>
                    <Flex className='group-title' justify='between'>
                        <h3>租房小组</h3>
                        <span>更多</span>
                    </Flex>
                    <Grid data={this.state.groups}
                    columnNum={2}
                    square={false}
                    renderItem={this.renderGridItem}
                    />
                </div>
                {/* 最新资讯 */}
                <div className="news">
                    <h3 className="group-title">最新资讯</h3>
                    {this.renderNews()}
                </div>
            </div>
        )
    }
}
export default Index