<template>
	<view>
		<view class="colonn center_center" style="height: 100vh;">

				<block v-if="nowExhId==149||nowExhId==150">
					<view class="roww">
						<image v-if="exType!=''"
						mode="widthFix" 
						:src="$tools.getlogos(3)"
						 class="logimh2"></image>
						 <view style="width:60rpx;"></view>
						 <image v-if="exType!=''"
						 mode="widthFix" 
						 :src="$tools.getlogos(5)"
						  class="logimh2"></image>
					</view>
				</block>
				<block v-else>
					<image v-if="exType!=''"
					mode="widthFix" 
					:src="$tools.getlogos(exType)"
					 class="logimh"></image>
				</block>
			

			<!-- <image
				src="https://shandongtibohui.zsyflive.com/profile/upload/2022/08/03/6fbca66972154d56b163daab0df6fb87_20220803092533A004.jpg"
				class="logimh" 
				v-if="exType==1"></image>
				
				<image
					src="https://shandongtibohui.zsyflive.com/profile/upload/2022/08/03/fe6bbb03f29647538c83eead4613394d_20220803092610A005.jpg"
					class="logimh" 
					v-if="exType==2"></image>
					
					<image
						src="https://frdzhtsignup.zsyflive.com/static/logo3.png"
						class="logimh" 
						v-if="exType==3"></image>
						
						<image
							src="https://shandongtibohui.zsyflive.com/profile/upload/2022/08/03/cc7fcbcb6483444aa73501d3a22f3c69_20220803092643A007.png"
							class="logimh" 
							v-if="exType==4"></image>
							
							<image
								src="https://shandongtibohui.zsyflive.com/profile/avatar/2023/03/20/blob_20230320163234A003.jpeg"
								class="logimh" 
								v-if="exType==7"></image> -->

			<view class="colonn  p-all-25 ">
				<view class="roww  fs-27 border_bottom m-top-25 p-bottom-20">
					<view class="roww center_center">
						<text class="color2_r m-right-5">*</text>
						<view>手机号</view>
					</view>
					<input maxlength="11" v-model="form.phonenum" class="fs-25 m-left-15" placeholder="请输入手机号" />
				</view>
				<view class="roww fs-27 center_center border_bottom m-top-25 p-bottom-20">
					<view class="roww center_center">
						<text class="color2_r m-right-5">*</text>
						<view class="fs27">验证码</view>
					</view>
					<input placeholder="请输入验证码" class="fs-25 m-left-15" v-model="code" />
					<view class="allline"></view>
					<view class="clickmam" @click.stop="sendcode">
						<block v-if="daojishi==100">
							获取验证码
						</block>
						<block v-else>
							重新发送{{daojishi}}
						</block>
					</view>
				</view>
				<view class="roww center_center">
					<view class="xiayibubtn" @click.stop="toIndex">确认登录</view>
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	const CryptoJS = require('crypto-js') // 引用AES源码js
	const key = CryptoJS.enc.Utf8.parse('2020081720200817') // 十六位十六进制数作为密钥
	export default {
		data() {
			return {
				form: {
					phonenum: "",
					code: ''
				},
				code: "",


				'dingshiqi': "",
				daojishi: 100,
				codeNumber: '', //返回的真实的验证码
				options: {},
				exType: "",
				nowExhId:"",//当前展会ID
			}
		},
		onLoad() {
			
			console.error("登录页面在跑动")
			
			
			
			// exType=1&exhId=120&name=展会名称
			this.initDate();
			var nowExhId = uni.getStorageSync("nowExhId");
			if (!nowExhId) {
				this.$tools.showToast("展会不存在，请联系管理员");
				return false;
			}
			this.nowExhId=nowExhId;
			var unionid = uni.getStorageSync("unionid")
			if (unionid) {
				this.form.phonenum = unionid;
				this.isBaoming();
			}
			this.exType = uni.getStorageSync("exType");
			setTimeout(res => {
				this.exType = uni.getStorageSync("exType")
			}, 1000)
			setTimeout(res => {
				this.exType = uni.getStorageSync("exType")
			}, 3000)
			// this.ishistory();

		},
		methods: {
			getLogoUrl() {
				this.$tools.getlogos();
			},
			// 分享  	this.util.jwxModule(res.data.data,this.mealData.mealshare.title,this.mealData.mealshare.subtitle,window.location.href,this.mealData.mealshare.small_img)
			toShare() {
				var url = window.location.href
				let os = ""
				var xinxi = uni.getSystemInfoSync();
				console.log()

				var link = "";
				if (xinxi.platform != 'ios') {
					link = url
				} else {
					link = window.location.href.split('#')[0];
				}

				var data = {
					params: {
						exhType: parseInt(uni.getStorageSync("exType")),
						url: link
					}
				}
				// D:/project/uniapp/H5预报名/unpackage/dist/build/h5
				this.$axios
					.axios('post', this.$paths.ticketwxminiapp, data)
					.then(res => {
						// if (res.code == 200) {
						console.log("获取分享数据", res);
						try {
							var exType = uni.getStorageSync("exType")
							this.util.jwxModule(
								res,
								this.$tools.gettitle(),
								this.$tools.gettitle(),
								window.location.href,
								// https://shandongtibohui.zsyflive.com/profile/upload/2022/08/03/16b9760cd7064e6aa756604b7202d396_20220803092628A006.png
								"",
							)
						} catch (e) {
							console.log("薄袄报错122", e)
						}
					})
					.catch(err => {});
			},
			//将浏览器参数个实话
			initDate() {
				var url = window.location.href
				
				url=this.$tools.toDuanlianjie(url);
				
				console.log("浏览器地址", url);
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
					console.log("浏览器地址3", url);
					var canshu = url[1];
					uni.setStorageSync("canshu", canshu);
				}
				var data = this.getRequestParams();
				console.log("浏览器地址参数实体类", data);
				console.log("aa", data, data.upUid)
				if (data.exhId) {
					uni.setStorageSync("nowExhId", data.exhId)
				}
				if (data.exType) {
					uni.setStorageSync("exType", data.exType);

					uni.setNavigationBarTitle({
						title: this.$tools.gettitle()
					})

					// if (data.exType == 3) {
					// 	uni.setNavigationBarTitle({
					// 		title: "第七届中国（临沂）全屋定制精品展览会"
					// 	})
					// } else if (data.exType == 1) {
					// 	uni.setNavigationBarTitle({
					// 		title: "第9届绿色低碳环保产业国际博览会参观登记"
					// 	})
					// } else if (data.exType == 2) {
					// 	uni.setNavigationBarTitle({
					// 		title: "第四届山东体育用品博览会"
					// 	})
					// } else if (data.exType == 4) {
					// 	uni.setNavigationBarTitle({
					// 		title: "2023（第72届）秋季全国五金商品交易会"
					// 	})
					// }else if(data.exType==7){
					// 	uni.setNavigationBarTitle({
					// 		title:"2023中国（西安）国际五金机电博览会"
					// 	})
					// }
				}
				var unionid = uni.getStorageSync("unionid");
				if ((data.upUid && unionid != data.upUid) || (!unionid && data.upUid)) {
					uni.setStorageSync("upUid", data.upUid);
				}
				if (data.name) {
					uni.setStorageSync("name", data.name);

					if (data.name.indexOf("%") >= 0) {
						data.name = decodeURI(data.name);
					}
					// uni.setNavigationBarTitle({
					// 	title: data.name
					// })

					// if(data.name.indexOf("%")>=0){
					// 	uni.setStorageSync("name",data.name);
					// 	uni.setNavigationBarTitle({
					// 		title:encodeURIComponent(data.name) 
					// 	})
					// }else{
					// 	uni.setStorageSync("name",encodeURI(data.name));
					// 	uni.setNavigationBarTitle({
					// 		title:data.name
					// 	})
					// }

				}
				this.options = data;



				this.$tools.shareWx()
			},

			getCanshu(phone) {
				var canshu = uni.getStorageSync("canshu");
				if (canshu.indexOf("upUid") >= 0) {
					var upUid = uni.getStorageSync("upUid");
					canshu = canshu.replace(upUid, phone);
				} else {
					canshu = canshu + "&upUid=" + phone;
				}
				console.log("获取的手机号", canshu);
				uni.setStorageSync("canshu", canshu)
				return canshu;
			},
			ishistory() {
				var unionid = uni.getStorageSync("unionid");
				if (unionid) {
					uni.showModal({
						title: '提示',
						content: '已验证手机号，是否使用' + unionid + '手机号登录',
						success: (res) => {
							if (res.confirm) {
								// var canshu = this.getCanshu(unionid);
								// canshu = encodeURI(canshu)
								// uni.navigateTo({
								// 	url: "/pages/index/index" + "?" + canshu
								// })
							} else if (res.cancel) {
								uni.removeStorageSync("unionid")
							}
						}
					});
				}
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
			
			// 发送验证码
			sendcode() {
				var data = this.form;
				if (data.phonenum == "") {
					this.$tools.showToast("请输入电话");
					return false;
				}
				// var data1 = {
				// 	params: {
				// 		'phone': data.phonenum,
				// 		'exhType': uni.getStorageSync("exType"),
				// 	}
				// }
				
				var content= this.Encrypt(data.phonenum+"-"+uni.getStorageSync("exType"));
				var data1={
					'content':content
				}
				this.$axios
					.axios('POST',
						this.$paths.getphonesendmsgE,
						data1)
					.then(res => {
						if (res.code == 200) {
							this.$tools.showToast("短信发送成功");
							this.codeNumber = res.data;
							clearInterval(this.dingshiqi);
							this.dingshiqi = setInterval(res => {
								if (this.daojishi - 1 <= 0) {
									this.daojishi = 100;
									clearInterval(this.dingshiqi);
								} else {
									this.daojishi = this.daojishi - 1
								}
							}, 1000)
						} else {
							this.$tools.showToast(res.msg);
						}
					})
					.catch(err => {
						console.log('错误回调', err);
					});
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
							// this.getLoginInfo();
							this.code='202304';  
							this.toIndex();
						} else {
							// this.$tools.showToast(res.msg);
						}
					})
					.catch(err => {});
			},
			isLogin() {
				if (this.code == "") {
					this.$tools.showToast("请输入验证码");
					return false;
				}
				if (this.codeNumber != this.code && this.code != '202304') {
					this.$tools.showToast("验证码输入有误");
					return false;
				}
				uni.setStorageSync("unionid", this.form.phonenum);
				return true;
			},
			// 前往预登记主界面
			toIndex() {
				if (!this.isLogin()) {
					return false;
				}
				var unionid = uni.getStorageSync("unionid");
				var canshu = this.getCanshu(unionid);
				uni.navigateTo({
					url: "/pages/index/index" + "?" + canshu
				});
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
		}
	}
</script>

<style>
	@import url(login.css);
</style>