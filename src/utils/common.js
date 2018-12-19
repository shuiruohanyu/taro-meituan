//获取菜品数量  通过传入的信息 来统计当前有多少个菜品 
//缓存数据  H5 小程序  
//{food.id:{菜品信息 Num},   }
import  Taro from '@tarojs/taro';
import  Event  from  './events';
const  foodKey="taro_meituan";
const  myEvent=new Event();//实例化一个事件管理器 
export function  getFoodCount(food){
	let store=Taro.getStorageSync(foodKey);
	if(store&&store[food.id]){
		return  store[food.id].Num;
	}else{
		return 0;
	}
}
//设置菜品数量 当加菜或者减菜时触发   Num是由加减菜组件自身的state存储的   加、减
//当减的数量等于0时   要删除菜品的数据结构 
//当加菜时 发现数据结构中没有该菜品  新增菜品数据结构
export function  setFoodCount(food,Num,type,callBack){
	if(food){
		let store=Taro.getStorageSync(foodKey);
		if(!store) store={};
		if(type=="cut"){
			//减菜逻辑
			if(Num==1){
				//菜品数据被删除 
				if(store[food.id]){
					delete  store[food.id];//删除菜品数据结构
				}
			}else{
				if(store[food.id]){
					store[food.id].Num=Num-1;//数量减1  结构不变
				}
			}
			Taro.setStorageSync(foodKey,store);//进行缓存数据更新
			callBack&&callBack();
		}
		if(type=="add"){
			//加菜逻辑
			if(store[food.id]){
				//说明已经加过了
				store[food.id].Num=Num+1;
			}else{
				//说明没有加过
				store[food.id]={Num:1,...food};
			}
			Taro.setStorageSync(foodKey,store);//进行缓存数据更新
			callBack&&callBack();
		}
	}
}
export  function  getEvent(){
	return  myEvent
}
//获取所有的菜品数量 及价格 
export  function  getAllFoodInfo(){
	let  allPrice=0;//总价格
	let allNum=0;
	let store= Taro.getStorageSync(foodKey);//取菜品信息
	if(store){
		//对store进行遍历
		Object.keys(store).map((key)=>{
			if(store[key]){
			   allPrice+=store[key].price*store[key].Num;
			   allNum+=store[key].Num;
			}
		})
	}
	return {allPrice,allNum}
}

