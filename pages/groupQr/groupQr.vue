<template>
	<view>
		<!-- <image src="/static/fanhuijia.png"
		class="w-40 h-40 m-all-50" @click="toback"
		></image> -->

		<view class="colonn w-750 center_left33_zhen " 
		v-if="ifShow" style="height: 100vh;">
			<view class="h-150"></view>
			<view style="font-weight: bold;">团长二维码</view>
			<view class="h-50"></view>
			<tki-qrcode cid="qrcode2" ref="qrcode2" :val="qrValue" :size="size" :onval="onval" :loadMake="loadMake"
				:usingComponents="true" @result="qrR" />
			<view class="h-50"></view>
			<view>请大家截图保存（或者长按二维码保存）</view>
			<view class="h-30"></view>
			<view style="color:#2E7EFC;font-weight: bold;"
			 @click.stop="copyGet">点击复制分享链接</view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				ifShow: false,
				size: 400,
				onval: false, // val值变化时自动重新生成二维码
				loadMake: true, // 组件加载完成后自动生成二维码
				qrValue: "",
				src: '', // 二维码生成后的图片地址或base64
				unionid: "",
				shareUrl: ""
			}
		},
		onLoad() {
			this.unionid = uni.getStorageSync("unionid");
			if (!this.unionid) {
				return false;
			}
			var exType = uni.getStorageSync("exType")
			var nowExhId = uni.getStorageSync("nowExhId")
			var qrValue = "https://frdzhtsignup.zsyflive.com?exType=" + exType + "&exhId=" + nowExhId + "&upUid=" + this
				.unionid;
			this.qrValue = qrValue;
			this.ifShow = true;
			setTimeout(res => {
				this.toShare();
			}, 50)

			// var toJaimiStr = this.$tools.toJaimi();
			// console.log("加密结果", toJaimiStr);
			// if (toJaimiStr != "") {
			// 	this.shareUrl = toJaimiStr;
			// }
		},
		methods: {
			
			
		
			
			copyGet(){
				var txt=this.qrValue.split("?")[1];
				var toJaimiStr=getApp().aesEncrypt(txt);
				toJaimiStr="https://frdzhtsignup.zsyflive.com/frd/"+toJaimiStr;
				
				this.$copyText(toJaimiStr).then(
							res => {
								console.log("asd",res)
								uni.showToast({
									title: '复制成功',
									icon: 'none'
								})
							}
						).catch(res=>{
							console.log("asd111",res)
						})
			},
			
			// 二维码
			qrR(res) {
				this.src = res
			},
			toback() {
				uni.navigateBack({
					delta: 1
				})
			},



			toShare() {
				try {
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
					// this.$paths.ticketwxminiapp
					this.$axios
						.axios('post', this.$paths.ticketwxminiapp, data)
						.then(res => {
							console.log("获取分享数据", res);
							// if (res.code == 200) {

							try {
								var exType = uni.getStorageSync("exType")
								this.util.jwxModule(
									res,
									this.$tools.gettitle(),
									this.$tools.gettitle(),
									window.location.href,
									"https://shandongtibohui.zsyflive.com/profile/upload/2022/08/03/16b9760cd7064e6aa756604b7202d396_20220803092628A006.png"
								)
							} catch (e) {
								//TODO handle the exception
								console.log("薄袄报错", e)
							}


						})
						.catch(err => {});


				} catch (e) {
					//TODO handle the exception
				}

			},

		}
	}
</script>

<style>

</style>