import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './index.less'
import  Head  from  '../../components/head/head';
import  Food  from  '../../components/food/food';
import  Bottom  from  '../../components/bottom/bottom';

export default class Index extends Component {

  config = {
    navigationBarTitleText: '首页'
  }
  constructor(){
  	 super(...arguments)
  }
  componentWillMount () { }

  componentDidMount () {
  //	var _this=this;
  	this.setState({name:"李四"},()=>{
  		  	console.log(this.state.name);
  	})
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }
   
  
 
  render () {
    return (
      <View className='index'>
      <Head />
      <Food />
      <Bottom />
      </View>
    )
  }
}

