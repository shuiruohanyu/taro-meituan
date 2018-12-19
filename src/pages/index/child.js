import  Taro,{Component} from  '@tarojs/taro';
import {View,Text} from '@tarojs/components';
class  Child  extends   Component{
	clickHandle(){
		this.props.onMessage();
	}
	render(){
		return (<View onClick={this.clickHandle.bind(this)}>{this.props.name}</View>)
		
	}
}
export default  Child;
