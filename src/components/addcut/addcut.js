import  Taro,{Component}  from  '@tarojs/taro';
import {View,Text,Image} from '@tarojs/components';
import {getFoodCount,setFoodCount,getEvent}  from '../../utils/common';
const  myEvent=getEvent();
import './addcut.less';
class  AddCut  extends  Component{
	constructor(){
		super(...arguments);
		this.state={
			Num:0
		};
	}
	componentDidMount(){
		this.setState({Num:getFoodCount(this.props.food)});
		myEvent.on("changeCata",()=>{
			//监听到分类改变 进行菜品数量刷新
			this.setState({Num:getFoodCount(this.props.food)});
		})
	}
	//减1的逻辑
	CutFood(){
		if(this.props.food){
			if(this.state.Num>0){
				setFoodCount(this.props.food,this.state.Num,"cut",()=>{
					this.setState({Num:getFoodCount(this.props.food)}) 
					myEvent.emit("addcut")
				});
			}else{
				console.error("当前加减菜品出现异常")
			}
		}
	}
	//加1的逻辑
	AddFood(){
		if(this.props.food){
			setFoodCount(this.props.food,this.state.Num,"add",()=>{
				this.setState({Num:getFoodCount(this.props.food)})
				myEvent.emit("addcut")
			});
			
		}
	}
	render(){
		let {Num}=this.state;
		let hideClass=Num>0?"":"hide";
	   return  (<View className="addcut">
	   	<Image  onClick={this.CutFood.bind(this)} className={"opeate_img "+hideClass} src={require('../../assets/img/cut.png')}></Image>
	   	<Text className={"food_num "+hideClass}>{Num}</Text>
	   	<Image onClick={this.AddFood.bind(this)} className="opeate_img" src={require('../../assets/img/add.png')}></Image>
	   </View>)
	}
}
export default AddCut;