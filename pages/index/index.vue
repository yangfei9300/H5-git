<template>
	<view>
		
		<!-- BASE_IMG+ -->
		
		
		
		
		<block v-if="exType!=1">
			<view class="colonn viewhom colonn center_center"
			:style="{  
				'background-image':'url('+yubaomingInfo.cover+')'
				}"   
				   style="background-size: 100% 100%;background-repeat: no-repeat;"
			>
			<!-- saldh alsk阿斯利康对你好 -->
				<view class="colonn " 
				style="position: absolute;bottom: 200rpx;z-index: 1010">
					<view class="tiquerweima" @click.stop="toPre(1)">领取门票</view>
				</view>
			</view>
		</block>
		<block v-else>
			<image :src="yubaomingInfo.cover"
			class="w-750" mode="widthFix"
			></image>
			<view class="roww center_center"
			style="position: fixed;bottom: 200rpx;z-index: 1010;left: 175rpx;">
				<view class="tiquerweima1" @click.stop="toPre(1)">领取门票</view>
			</view>
		</block>
		<!-- <block v-else>
			<view class="colonn viewhom colonn center_center"
			>
				<view class="colonn " style="position: absolute;bottom: 200rpx;z-index: 1010">
					<view class="tiquerweima" @click.stop="toPre(1)">观众登记</view>
					<view class="tiquerweima" @click.stop="toPre">提取二维码</view>
				</view>
			</view>
		</block> -->
	</view>
</template>
  
<script>
	export default {
		data() {
			return {
				'type': 0, //0未报名，1未答题，2报名成功
				yubaomingInfo: {},
				BASE_IMG: "",
				exType: ""
			}
		},
		onLoad(options) {
			console.error("首页先跑")
			// this.isBaoming();
			this.exType=uni.getStorageSync("exType")
			this.initDate();
			this.BASE_IMG = this.$paths.BASE_IMG;
			console.log('BASE_IMG', this.BASE_IMG)
			var unionid=uni.getStorageSync("unionid");
			if(unionid){
				this.isBaoming2();
			}else{
				setTimeout(res=>{
					this.$tools.showToast("请先登录");
					uni.reLaunch({
						url:"/pages/login/login"
					})
				},1000)
			}
			this.getConfig();



			
		},
		methods: {
			
			// 一城双展
			saveScare(exType,exhId){
				uni.setStorageSync("nowExhId",exhId);
				uni.setStorageSync("exType",exType);
				this.exType=exType;
				
				var data = this.getRequestParams();
				data.exType=exType;
				data.exhId=exhId;
				
				
				
				let searchParams = new URLSearchParams(data).toString();
				console.log("标准格式",searchParams);
				uni.setStorageSync("canshu",searchParams)

				
			},
			
			// 判断是否报名以及答题了
			isBaoming2(){
				var data={
					params:{
						'unionid':uni.getStorageSync("unionid")
					},
					'exhId':uni.getStorageSync("nowExhId")
				}
				this.$axios
					.axios('post', this.$paths.enroll2check, data)
					.then(res => {  
						if(res.exhType&&res.exhId){
							this.saveScare(res.exhType,res.exhId); 
						}
						var type=0;
						if(res.code==200){
							console.log("已报名一大题")
							type=2;
							
						}else if(res.code==601){
							console.log("已报名未大题")
							type=1;
							uni.setStorageSync("visitorId",res.data)
						}else if(res.code==500){
							console.log("未报名")
						}
						this.type=type;
						if(type==2){
							uni.navigateTo({
								url:"/pages/preRegistration/preRegistration?menuindex=" + type
							})
						}
						
					})
					.catch(err => {});
			},
			
// 分享  	this.util.jwxModule(res.data.data,this.mealData.mealshare.title,this.mealData.mealshare.subtitle,window.location.href,this.mealData.mealshare.small_img)
			
			toShare(){
				
				var url=window.location.href
							let os = ""
						    var xinxi=uni.getSystemInfoSync();
							console.log()
							
						    var link = "";
						    if (xinxi.platform!='ios') {
								link = url
						    }else{
								link = window.location.href.split('#')[0];
						    }
				
				var data={  
					params:{
						exhType:parseInt(uni.getStorageSync("exType")),
						url:link
					}
				}
				// this.$paths.ticketwxminiapp
				this.$axios
					.axios('post', this.$paths.ticketwxminiapp , data)
					.then(res => {    
						console.log("获取分享数据",res);
						// if (res.code == 200) {
							
							try{
								var exType=uni.getStorageSync("exType")
									this.util.jwxModule(
									res,
									this.$tools.gettitle(),
									this.$tools.gettitle(),
									window.location.href,
									"https://shandongtibohui.zsyflive.com/profile/upload/2022/08/03/16b9760cd7064e6aa756604b7202d396_20220803092628A006.png"
									)
							}catch(e){
								//TODO handle the exception
								console.log("薄袄报错",e)
							}
							
							
					})
					.catch(err => {});
			},
			//将浏览器参数个实话
			initDate() {
				var url = window.location.href
				
				url=this.$tools.toDuanlianjie(url);
				
				console.log("浏览器地址1", url);
				if (url.indexOf("?") >= 0) {
					url = url.split("?")
					if (url.length >= 3) {
						uni.setStorageSync("canshu", url[2]);
					}
				}
				
				if (url.length == 2 && url[1].indexOf("#") >= 0) {
					url = url[1].split("#");
					console.log("浏览器地址2", url);
					var canshu = url[0];
					uni.setStorageSync("canshu", canshu);
				} else
				if (url.length == 2 && url[1].indexOf("#") < 0) {
					console.log("浏览器地址2", url);
					var canshu = url[1];
					uni.setStorageSync("canshu", canshu);
				}
				var data = this.getRequestParams();
				console.log("浏览器地址参数实体类3", data);
				console.log("aa", data, "上级手机号",data.upUid)
				if (data.exhId) {
					uni.setStorageSync("nowExhId", data.exhId)
				}
				
				
				
				if (data.exType) {
					
					var exType_Store=uni.getStorageSync("exType");
					
					if(exType_Store&&exType_Store!=data.exType){
						uni.setStorageSync("exType", data.exType);
						// if(data.exType!=3&&data.exType!=5){
							setTimeout(res=>{
								uni.reLaunch({
									url:"/pages/login/login"
								})
							},500)
						// }
						return false; 
					}
					
					uni.setStorageSync("exType", data.exType);
					uni.setNavigationBarTitle({
						title:this.$tools.gettitle()
					})
				}
				var unionid = uni.getStorageSync("unionid");
				if ((data.upUid && unionid != data.upUid) || (!unionid && data.upUid)) {
					uni.setStorageSync("upUid", data.upUid);
				}
				
				if (data.name) {
					uni.setStorageSync("name", data.name);
					if (data.name.indexOf("%") >=0) {
						data.name=decodeURI(data.name);
					}
				}
				this.options = data;
				var unionid = uni.getStorageSync("unionid");
				if (!unionid) {
					this.$tools.showToast("请先登录");
					setTimeout(res => {
						var canshu = uni.getStorageSync("canshu")
						canshu=encodeURI(canshu)
						uni.reLaunch({
							url: "/pages/login/login?" + canshu
						})
						return
					}, 1000)
				}
				var isWeixin=uni.getStorageSync("isWeixin")
				if(isWeixin&&isWeixin==1){
					this.$tools.shareWx()
				}
			},
			// 获取浏览器地址参数
			getRequestParams() {
				var requestParams = {};
				//    var url = location.search;
				// console.log("getRequestParams",url)
				//    if (url.indexOf("?") !== -1) {
				var str = uni.getStorageSync("canshu");
				var params = str.split("&");
				for (var i = 0; i < params.length; i++) {
					var param = params[i];
					var d = param.split("=");
					requestParams[d[0]] = decodeURIComponent(d[1]);
				}
			 // }
				return requestParams;
			},
			getConfig() {
				var data = {
					exhId: uni.getStorageSync("nowExhId"), //
				}
				this.$axios
					.axios('post', this.$paths.enrollconfig, data)
					.then(res => {
						if (res.code == 200) {
							if (res.data.length > 0) {
								this.yubaomingInfo = res.data[0];
								uni.setStorageSync("yubaominghuacn", this.yubaomingInfo)
								console.log(this.yubaomingInfo)
							} else {
								this.yubaomingInfo = null;
							}
						} else {
							this.$tools.showToast(res.msg);
						}
					})
					.catch(err => {});
			},
			//获取个人信息
			getLoginInfo() {
				var data = {
					// params:{
					// 	exhId: uni.getStorageSync("nowExhId"),
					// },
					unionid: uni.getStorageSync("unionid")
				}
				this.$axios
					.axios('POST', this.$paths.infovisitor, data)
					.then(res => {
						if (res.code == 200) {
							this.type = 1;
							this.isDati(res.data.id);
						} else {
							// this.$tools.showToast(res.msg);
						}
					})
					.catch(err => {});
			},
			//判断是否报名了
			isBaoming() {
				var data = {
					exhId: uni.getStorageSync("nowExhId"),
					'params': {
						'unionid': uni.getStorageSync("unionid")
					}
				}
				this.$axios
					.axios('POST', this.$paths.enrollcheckvisitor, data)
					.then(res => {
						if (res.code == 200) {
							this.type = 1;
							this.isDati(res.data);
						} else {
							// this.$tools.showToast(res.msg);
						}
					})
					.catch(err => {});
			},
			// 判断是否答题了
			isDati(visitorId) {
				var data = {
					exhId: uni.getStorageSync("nowExhId"),
					visitorId: visitorId,
				}
				uni.setStorageSync("visitorId",visitorId);
				this.$axios
					.axios('POST', this.$paths.whetheransapi, data)
					.then(res => {
						if (res.code == 200) {
							this.type = 2
						} else {
							this.$tools.showToast("未答题");
						}
					})
					.catch(err => {});
			},
			toPre() {  
				var canshu = uni.getStorageSync("canshu");
				if (canshu) {
					canshu=encodeURI(canshu)
					uni.navigateTo({
						url: "/pages/preRegistration/preRegistration?menuindex=" + this.type + "&" + canshu
					})
				} else {
					uni.navigateTo({    
						url: "/pages/preRegistration/preRegistration?menuindex=" + this.type
					})
				}  
			}
		}
	}
</script>


<style>
	@import url(index.css);
</style>
