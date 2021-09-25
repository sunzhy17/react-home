import React from 'react'

class Test extends React.Component {
    componentDidMount() {
        // 初始化地图服务
        // 创建地图实例对象并绑定地图渲染的位置（ID选择器）
        let map = new window.BMapGL.Map("map")
        // 创建一个地理坐标
        let point = new window.BMapGL.Point(116.404, 39.915)
        // 设置默认显示的地图中心和缩放系数
        map.centerAndZoom(point, 10)
    }
    render() {
        return (
            <div id='map' style={{width:'100%', height:'100%'}}></div>
        )
    }
}

export default Test