<template>
	<view>
		<!-- BASE_IMG+ -->
		
		<image v-if="yubaominghuacn.banner" 
		class="topimg" mode="aspectFill"   
		:src="yubaominghuacn.banner"></image>
		<view 
		@longpress="toClear"
		style="width: 100rpx;height: 100rpx;background-color: red;position: absolute;top: 0rpx;right: 0rpx;opacity: 0;"
		></view>
		<view
		@longpress="toClear1"
		style="width: 100rpx;height: 100rpx;background-color: red;position: absolute;top: 0rpx;left: 0rpx;opacity: 0;"
		></view>
		<view style="height: 20rpx;"></view>
		<xiayibu :xiabiao="menuindex" ></xiayibu>
		<baomingxinxi @baomingInfoClick="baomingInfoClick" v-if="menuindex==0"></baomingxinxi>
		<tianxiewenjuan @toTijiaoJuanzi="toTijiaoJuanzi" 
		 v-if="menuindex==1" 
		 @xiayibu="xiayibu"
		></tianxiewenjuan>
		<!-- <allwenti  @toTijiaoJuanzi="toTijiaoJuanzi" 
		 v-if="menuindex==1" 
		 @xiayibu="xiayibu"
		></allwenti> -->
		<baomingchenggong :yubaominghuacn="yubaominghuacn"  
		v-if="menuindex==2">
			<view class="colonn center_center" style="margin-top: 40upx;">
				
				<tki-qrcode v-if="ifShow" 
				cid="qrcode2" ref="qrcode2" 
				:val="qrValue" :size="size" 
				:onval="onval" :loadMake="loadMake"  
				 :usingComponents="true"
				  @result="qrR" />
				  <view v-else style="width: 400rpx;height: 400rpx;">
					  
				  </view>
				  <view class="h-20"></view>
				  <view class="roww center_center">
					 <!-- <view @click.stop="loadQrValue"
					  style="font-weight: bold;color: blue;"
					  class="fs-25"
					  >点击刷新二维码</view> -->
					  <view @click.stop="getQrValue"
					  style="font-weight: bold;color: blue;"
					  class="fs-25"
					  >点击刷新二维码（有效期30分钟）</view>
					  <!-- <view @click="getQrValue">chakan</view> -->
				  </view>
				  <view class="h-30"></view>
			</view>
		</baomingchenggong>
		
		<!--<view class="righta colonn">
			<view>预</view>
			<view>登</view>
			<view>记</view>
			<view>福</view>
			<view>利</view>
		</view> -->
		<view class="righta1 " v-if="yubaominghuacn.invitationRules">
			<image src="/static/fuli.png"
			class="w-150" mode="widthFix"
			@click.stop="tofuli"
			></image>
		</view>
		
	</view>
</template>

<script>
	import ayQrcode from "@/components/ay-qrcode/ay-qrcode.vue"
	import tkiQrcode from '@/components/tki-qrcode/tki-qrcode.vue'
	
	const CryptoJS = require('crypto-js') // 引用AES源码js
	const key = CryptoJS.enc.Utf8.parse('2020081720200817') // 十六位十六进制数作为密钥
	
	export default {
		components: {
			ayQrcode,tkiQrcode
		},
		data() {
			return {
				menuindex:2,
				//二维码相关参数
				modal_qr: false,
				url: 'https://pixabay.com/images/search/?order=ec', // 要生成的二维码值
				yubaominghuacn:{},
				baomingInfoClick1:{},
				showModal:false,
				ifShow:false,
				size:400,
				onval: false, // val值变化时自动重新生成二维码
				loadMake: true, // 组件加载完成后自动生成二维码
				qrValue:"",
				src: '' ,// 二维码生成后的图片地址或base64
				
				exType:"",
				
			}
		},
		onLoad(options) {
			
			var yubaominghuacn = uni.getStorageSync('yubaominghuacn');
			if(yubaominghuacn){
				this.yubaominghuacn=yubaominghuacn;
				setTimeout(res=>{
					this.yubaominghuacn = uni.getStorageSync('yubaominghuacn');
				},1000)
			}
			
			this.BASE_IMG=this.$paths.BASE_IMG;
			
			this.exType=parseInt(uni.getStorageSync("exType"))
			
			this.initDate();
			this.menuindex=parseInt(options.menuindex)
			let that = this;
			// that.showQrcode();//一加载生成二维码
			
			this.yubaominghuacn=uni.getStorageSync("yubaominghuacn");
			this.baomingInfoClick1=uni.getStorageSync("baomingInfoClick");
			
			if(!this.yubaominghuacn){
				this.cicizhanhuixinxi()
			}else{
				// var timestamp = Date.parse(new Date());
				// var qrValue= timestamp+"-"+ uni.getStorageSync("unionid")
				// var content= this.Encrypt(qrValue);
				// this.qrValue=content;
				// this.ifShow=true;
				this.getQrValue();
			}
		},
		methods: {
			tofuli(){
				uni.navigateTo({
					url:"/pages/fuli/fuli"
				})
			},
			getQrValue(){
				this.ifShow=false;
				var exType = uni.getStorageSync('exType');
				var nowExhId = uni.getStorageSync('nowExhId');
				var unionid=uni.getStorageSync("unionid");
				var timestamp = Date.parse(new Date());
				// timestamp=timestamp-2200000
				var qrValue = 'https://frdzhtsignup.zsyflive.com?exType=' + exType + '&exhId=' + nowExhId + '&upUid=' + unionid+"&timestamp="+timestamp;
				var txt=qrValue.split("?")[1];
				var toJaimiStr=getApp().aesEncrypt(txt);
				toJaimiStr="https://frdzhtsignup.zsyflive.com/frd/"+toJaimiStr;
				this.qrValue=toJaimiStr;
				console.log("asdasd",this.qrValue)
				setTimeout(res=>{
					this.ifShow=true;
				},50)
			},
			loadQrValue(){
				this.ifShow=false;
				var timestamp = Date.parse(new Date());
				timestamp=timestamp-2200000
				var qrValue= timestamp+"-"+ uni.getStorageSync("unionid")
				var content= this.Encrypt(qrValue);
				this.qrValue=content;
				console.log("erweima",this.qrValue)
				setTimeout(res=>{
					this.ifShow=true;
				},50)
			},
			// 解密方法
			Decrypt(word) {
				let decrypt = CryptoJS.AES.decrypt(word, key, {
					mode: CryptoJS.mode.ECB,
					padding: CryptoJS.pad.Pkcs7
				})
				let decryptedStr = decrypt.toString(CryptoJS.enc.Utf8)
				return decryptedStr.toString()
			},
			// 加密方法
			Encrypt(word) {
				let encrypted = CryptoJS.AES.encrypt(word, key, {
					mode: CryptoJS.mode.ECB,
					padding: CryptoJS.pad.Pkcs7
				});
				return encrypted.toString()
			},
			toClear1(){
				uni.clearStorageSync();
				setTimeout(res=>{
					uni.reLaunch({
						url:"/pages/login/login"
					})
				},1000)
			},
			toClear(){
				// upUid
				var unionid=uni.getStorageSync("unionid");
				if(unionid){
					uni.showModal({
						title:unionid+"是否作为分享人手机号",
						success: (res) => {
							if (res.confirm) {
								uni.setStorageSync("upUid",unionid);
								uni.removeStorageSync("unionid");
								
							} else if (res.cancel) {
								uni.removeStorageSync("unionid");
								console.log('用户点击取消');
							}
						},
						complete:res=>{
							uni.reLaunch({
								url:"/pages/login/login"
							})
						}
					})
				}
				
				
				
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
						// if (res.code == 200) {
							var exType=uni.getStorageSync("exType")
								this.util.jwxModule(
								res,
								this.$tools.gettitle(),
								this.$tools.gettitle(),
								window.location.href,
								"https://shandongtibohui.zsyflive.com/profile/upload/2022/08/03/16b9760cd7064e6aa756604b7202d396_20220803092628A006.png"
								)
					})
					.catch(err => {
						console.log("错误信息",err);
					});
			},
			
			//将浏览器参数个实话
			initDate(){
				var url=window.location.href
				
				
				url=this.$tools.toDuanlianjie(url);
				
				
				if(url.indexOf("?")>=0){
					url=url.split("?")
					if(url.length>=3){
						uni.setStorageSync("canshu",url[2]);
					}
				}
				
				if(url.length==2&&url[1].indexOf("#")>=0){
					url=url[1].split("#");
					console.log("浏览器地址2",url);
					var canshu=url[0];
					uni.setStorageSync("canshu",canshu);
				}else
				if(url.length==2&&url[1].indexOf("#")<0){
					var canshu=url[1];
					uni.setStorageSync("canshu",canshu);
				}
				
				
				var data=this.getRequestParams();
				if(data.exhId){
					uni.setStorageSync("nowExhId",data.exhId)
				}
				if(data.exType){
					
					var exType_Store=uni.getStorageSync("exType");
					if(exType_Store&&exType_Store!=data.exType){
						
						this.$tools.showToast("请先登录");
						
						setTimeout(res=>{
							
							if(data.exType!=3&&data.exType!=5){
								uni.reLaunch({
									url:"/pages/login/login"
								})
							}
							
						},1500)
						
						
						return false;
					}
					
					uni.setStorageSync("exType",data.exType);
					
					uni.setNavigationBarTitle({
						title:this.$tools.gettitle()
					})
					
				}
				var unionid=uni.getStorageSync("unionid");
				if((data.upUid&&unionid!=data.upUid)||(!unionid&&data.upUid)){
					uni.setStorageSync("upUid",data.upUid);
				}
				if(data.name){
					uni.setStorageSync("name", data.name);
					if (data.name.indexOf("%") >=0) {
						data.name=decodeURI(data.name);
					}
				}
				this.options=data;
				var unionid=uni.getStorageSync("unionid");
				if(!unionid){
					this.$tools.showToast("请先登录");
					setTimeout(res=>{
						var canshu=uni.getStorageSync("canshu")
						canshu=encodeURI(canshu)
						uni.reLaunch({ 
							url:"/pages/login/login?"+canshu
						})
						return 
					},1500)
				}
				// this.toShare()
				this.$tools.shareWx()
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
			// 二维码
			qrR(res) {
				this.src = res
			},
			// 获取此次报名信息
			cicizhanhuixinxi(){
				var data = {
					exhId:uni.getStorageSync("nowExhId"),//
				}
				this.$axios
					.axios('post', this.$paths.enrollconfig, data)
					.then(res => {    
						if (res.code == 200) {
							if(res.data.length>0){
								this.yubaomingInfo=res.data[0];
								uni.setStorageSync("yubaominghuacn",this.yubaomingInfo)
								this.yubaominghuacn=res.data[0];
								this.handleShowCodeClick();
							}else{
								this.yubaomingInfo=null;
							}
						} else {
							this.$tools.showToast(res.msg);
						}
					})
					.catch(err => {});
			},
			handleShowCodeClick(){
				
				var timestamp = Date.parse(new Date());
				var qrValue= timestamp+"-"+ uni.getStorageSync("unionid")
				var content= this.Encrypt(qrValue);
				this.qrValue=content;
				
				
				
				this.ifShow=true;
			},
			
			// 二维码
			// initQrCode(){
			// 	console.log("二维码挟制",this.BaomingInfo)
			// 	new qrCode('myQrcode', {
			// 		text:this.BaomingInfo.id+"",
			// 		width: 200,  
			// 		height: 200,
			// 		colorDark: "#333333",
			// 		colorLight: "#FFFFFF",
			// 		correctLevel: qrCode.CorrectLevel.H
			// 	})
			// },
			// 获取报名信息
			infovisitorGet(){
				console.log("infovisitorGet")
				var unionid=uni.getStorageSync("unionid");
				if(!unionid){
					this.$tools.showToast("请先登录");
					return false;
				} 
				var data1={
					'unionid':unionid,
					// params:{
					// 	exhId: uni.getStorageSync("nowExhId"),
					// }
				}
				this.$axios
					.axios('POST', 
					this.$paths.infovisitor, 
					data1)
					.then(res => {
						if(res.code==200){
							this.BaomingInfo=res.data;
							this.handleShowCodeClick();
						}else{
							// this.$tools.showToast(res.msg);
						}
					})  
					.catch(err => {
						console.log('错误回调', err);
					});
			},
			// 蒋问卷提交到后台
			tijiaowenjuan(){
				// var data = {
				// 	type:uni.getStorageSync("exType"),//1是环保展
				// 	'openid':uni.getStorageSync("openid"),
				// 	exhId:uni.getStorageSync("nowExhId"),//
				// 	name:uni.getStorageInfoSync("baomingxinxiYu").visitorName,
				// 	phonenum:uni.getStorageInfoSync("baomingxinxiYu").phonenum,
				// }
				// var wenjuanResult=this.wenjuanResult;
				// var dajuan="";
				// for(var a=0;a<wenjuanResult.length;a++){
				// 	// for(var b=0;b<wenjuanResult[a].quesOption)
				// 	dajuan=dajuan+"第"+(a+1)+"题:"+wenjuanResult[a].quesTitle+"    答:"+wenjuanResult[a].seltxt+"    ";
				// 	console.log(wenjuanResult[a].seltxt)
				// }
				// data.answer=dajuan;
				
				
				
				var wenjuanResult=this.wenjuanResult;
				var dataList=[];
				for(var a=0;a<wenjuanResult.length;a++){
					var  info=wenjuanResult[a];
					console.log("题目详情",info);
					var obg={
						'visitorId':uni.getStorageSync("visitorId"),
						exhId:uni.getStorageSync("nowExhId"),
						'questionnaireId':info.questionnaireId,
						'questionId':info.id,
						'answerContent':info.seltxt.join(",")
					}
					dataList.push(obg);
				}
				
				this.$axios
					.axios('POST', this.$paths.ansvisitorapi, dataList)
					.then(res => {
						if (res.code == 200) {
							console.log("问题提交层高")
							this.infovisitorGet();
							this.xiayibu(2);
						} else {
							this.$tools.showToast(res.msg);
						}
					})
					.catch(err => {});
			},
			// 问卷结果
			toTijiaoJuanzi(res){
				console.log("问卷内容",res);
				this.wenjuanResult=res.zhanhuiwenjuan;
				this.tijiaowenjuan();
				
			},
			xiayibu(index){
				this.menuindex=index;
			},
			// 报名信息结果
			baomingInfoClick(res){  
				console.log("报名信息",res)
				uni.setStorageSync("baomingInfoClick",res)
				this.baomingInfoClick1=res.form;
				this.baomingInfo=res;
				this.xiayibu(1);
			},
			// 展示二维码
			showQrcode() {
				let _this = this;
				this.modal_qr = true;
				// uni.showLoading()
				setTimeout(function() {  
					// uni.hideLoading()
					_this.$refs.qrcode.crtQrCode()
				}, 100)
			},
			
			//传入组件的方法
			hideQrcode() {
				this.modal_qr = false;
			},
		}
	}
</script>

<style>
.topimg{
	width: 750rpx;
	height: 400rpx;
	background-color: #f5f5f5;
}
.righta{
	width: 60rpx;
	background-color: red;
	position: fixed;
	bottom: 150rpx;
	right: 0rpx;
	text-align: center;
	color: white;
	padding:20rpx 0rpx;
	border-radius: 15rpx 0rpx 0rpx 15rpx;
}
.righta1{
	position: fixed;
	bottom: 350rpx;
	right: 20rpx;
}
</style>
