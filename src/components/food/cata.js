import  Taro,{Component}  from  '@tarojs/taro';
import {View,Text,Image} from '@tarojs/components';
import {getEvent}  from  '../../utils/common';
let  event=getEvent();
import './cata.less';
class  Cata  extends  Component{
	constructor(){
		super(...arguments);
		this.state={
			selectCata:null,
			cata:[
			{name:"专场",id:1},
			{name:"热销",id:2},
			{name:"折扣",id:3},
			{name:"主食",id:4},
			{name:"热炒",id:5},
			{name:"凉菜",id:6},
			{name:"特色乱炖",id:7},
			]
		};
	}
	clickHandle(item){
		if(this.state.selectCata&&this.state.selectCata.id!=item.id){
			this.setState({selectCata:item},()=>{
				this.props.onChangeCata&&this.props.onChangeCata(this.state.selectCata)
			})
			event.emit("changeCata");
		}else if(!this.state.selectCata){
			this.setState({selectCata:item},()=>{
				this.props.onChangeCata&&this.props.onChangeCata(this.state.selectCata)
			})
			event.emit("changeCata");
		}
	}
	render(){
		let {cata,selectCata}=this.state;
	   return  (<View className="cata">{
	   	cata.map((item,index)=>{
	   		return  (<Text  onClick={this.clickHandle.bind(this,item)} className={"cata_name "+((selectCata&&selectCata.id==item.id)?"select":"")} key={item.id}>{item.name}</Text>)
	   	})
	   }
	   </View>)
	}
}
export default Cata;