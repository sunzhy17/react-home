import { Icon, NavBar, Toast } from 'antd-mobile'
import React from 'react'
import axios from 'axios'
import { AutoSizer, List } from 'react-virtualized'
import './index.scss'

// 列表家数据
const list = Array.from(new Array(50)).map((item,index) =>`第${index}行数据`)

class City extends React.Component{
    constructor (props) {
        super(props)
        this.state = {
            cityList: {
                indexList:[]
            }
        }
    }
    componentDidMount(){
        this.loadData()
        // 手动计算屏幕的可视区域的宽度和高度
        // let w = document.documentElement.clientWidth
        // let h = document.documentElement.clientHeight
        // console.log(w,h)
    }
    loadData = async() => {
        // 添加加载提示信息
        Toast.loading('正在加载', 0)
        // 加载热门城市数据
        let hotCity = await axios.get('area/hot')

        // 加载城市的列表数据   
        let data = await axios.get('area/city',{
            params:{
                level: 1
            }
        })
        let ret = this.translateDataFormat(data.body)
        // 添加热门城市
        ret.indexList.unshift('hot')
        ret.objCityList['hot'] = hotCity.body
        
        // 添加当前城市数据
        ret.indexList.unshift('#')
        // 获取当前城市的详细数据
        let currentCity = await axios('area/info', {
            params: {
                name: '北京'
            }
        })
        ret.objCityList['#'] = [currentCity.body]

        this.setState({
            cityList: ret
        })
        // 隐藏提示效果
        Toast.hide()
    }
    renderCityList = () => {
        // 渲染城市列表
        let obj = this.state.cityList.objCityList
        let indexs = this.state.cityList.indexList
        let lists = []
        if(obj) {
            // for(let key in obj) {
            //     // 获取到当前爱抚的城市列表
            //     lists.push(<li>{key}</li>)
            //     let citys = obj[key]
            //     citys.forEach(city => {
            //         lists.push(<li>{city.label}</li>)
            //     })
            // }
            indexs.forEach(letter => {
                lists.push(<li key={letter}>{letter}</li>)
                let citys = obj[letter]
                citys.forEach(city => {
                    if(letter === 'hot') {
                        lists.push(<li key={city.short}>{city.label}</li>)
                    }else if(letter === '#') {
                        lists.push(<li key={city.value + '#'}>{city.label}</li>)
                    }else {
                        lists.push(<li key={city.value}>{city.label}</li>)
                    }
                })
            })
        }

        
        // let obj = this.state.cityList.objCityList
       
        // let indexs = this.state.cityList.indexList
        // console.log(obj)
        // let lists = []
        // if(obj) {
        //     obj.sort((o1, o2) => {
        //         let v1 = o1.short.substr(0,1)
        //         let v2 = o2.short.substr(0,1)
        //         console.log(v1,v2)
        //         return v1.charCodeAt() - v2.charCodeAt()
        //     }) 
        //     for(let key in obj) {
        //         // 获取到当前爱抚的城市列表
        //         lists.push(<li>{key}</li>)
        //         let citys = obj[key]
        //         citys.forEach(city => {
        //             lists.push(<li>{city.label}</li>)
        //         })
        //     }
        // }

        return (
            <ul>{lists}</ul>
        )
    }
    translateDataFormat = (data) => {
        // 把原始的城市列表数据转换为对象格式
        /**
         * a:[{},{},{}],
         * b:[{},{},{}],
         * c:[{},{},{}]
         * .....
         */
        let objCityList = {}
        let indexList = []
        // 实现城市列表数据分组：根据城市的首字母进行划分
        data.forEach(item =>{
            //  获取城市的首字母    
            let firstLetter = item.short.substr(0,1)
            if(objCityList[firstLetter]) {
                // objCityList对象中包含该字符
                objCityList[firstLetter].push({
                    label: item.label,
                    value: item.value,
                    short: item.short
                })
            }else {
                // objCityList对象中不包含该字符
                objCityList[firstLetter] = [{
                    label: item.label,
                    value: item.value,
                    short: item.short
                }]
                // 如果列表中不包含该首字母就添加到对应索引
                indexList.push(firstLetter)
            }
        })
        //  对数组中的首字母进行排序
        indexList.sort()
        return {
            objCityList,
            indexList
        }
    }
    // 用于产生每一行的模版
    rowRenderer =({
        key,
        style,
        index
    }) => {
        // 渲染每一个条目的模版
        const {objCityList, indexList} = this.state.cityList
        // 获取到标题的字符
        let letter = indexList[index]
        // 获取字符下对应的城市列表数据 
        let clist = objCityList[letter]
        return (
            <div key={key} style={style} className='city'>
                {/* 行标题 */}
                <div className="title">{letter}</div>
                {clist.length>0 && clist.map(item => (
                    <div 
                        className='name' 
                        key={item.value}
                        onClick={() => {
                            // 只有一线城市数据：如果是一线城市就选中，否则提示没有数据
                            if(['北京','上海','广州','深圳'].includes(item.label)){
                                // 是一线城市:选中该城市（将城市数据保存在缓存中）
                                localStorage.setItem('currentCity', JSON.stringify({
                                    label: item.label,
                                    value: item.value
                                }))
                                // 跳回到主页面
                                this.props.history.push('/home')
                            }else {
                                // 不是一线城市
                                Toast.info('该城市没有房源',2)
                            }
                        }}>
                            {item.label}
                        </div>
                ))}
            </div>
        )
    }
    calcRowHeight = ({index}) => {
        const {objCityList, indexList} = this.state.cityList
        // 根据索引获取标题的字符
        let letter = indexList[index]
        // 根据标题字符，获取城市列表数据
        let clist = objCityList[letter]
        // 计算行高：标题的高度+条目的高度*城市数
        return 36 + 50 * clist.length
    }
    render() {
        const {cityList} = this.state
        return (
            <div className='cityList'>
                {/* 顶部导航栏 */}
                <NavBar
                className="navbar"
                    mode="light"
                    leftContent={<Icon type='left' size='lg'/>}
                    onLeftClick={() => {
                        // this.props.history.push('/home')
                        // this.props.history.goBack()
                        this.props.history.go(-1)
                    }}
                    >城市选择</NavBar>
                    {/* {this.renderCityList()} */}
                    <AutoSizer>
                        {({height, width}) => {
                            // 只要数据获取之后，才进行列表渲染，保证列表可以获取数据
                            if(cityList){
                                return <List
                                    width={width}
                                    height={height}
                                    rowCount={cityList.indexList.length}
                                    rowHeight={this.calcRowHeight}
                                    rowRenderer={this.rowRenderer}
                                />
                            }
                        }}
                    </AutoSizer>
            </div>
        )
    }
}

export default City