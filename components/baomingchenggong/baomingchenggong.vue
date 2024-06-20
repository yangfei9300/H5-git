<template>
	<view>
		<view class="colonn center_center m-top-50">
			<view class="w-650 fs-30">您已登记成功，请至展会现场凭下方二维码入场参观</view>

			<block v-if="nowExhId==149||nowExhId==150">
				<view class="fs-35 fw-b m-top-30" style="padding:0rpx 30rpx;">
					第八届中国（临沂）全屋定制精品展览会
				</view>
				<view class="fs-25 m-top-15">2024年04月18-21日</view>
				<view class="fs-35 fw-b m-top-30" style="padding:0rpx 30rpx;text-align: center;">
					第四届中国（临沂）绿色建筑建材产业博览会
				</view>
				<view class="fs-25 m-top-15">2024年04月19-21日</view>

			</block>
			<block v-else>
				<view class="fs-35 fw-b m-top-30" style="padding:0rpx 30rpx;" v-if="yubaominghuacn.params">
					{{yubaominghuacn.params.exhName}}</view>
				<view class="fs-25 m-top-15" v-if="yubaominghuacn.params.exhStartTime">
					{{yubaominghuacn.params.exhStartTime}}至{{yubaominghuacn.params.exhEndTime}}</view>
			</block>

			<view class="colonn m-top-30" v-if="BaomingInfo">
				<view class="colonn center_center background1">
					<view class="h-30"></view>
					<view class="roww center_center" 
					v-if="BaomingInfo.visitorName">
						<view>{{BaomingInfo.visitorName}}</view>
						<!-- <view @click.stop="getShareUrl"
						style="font-size: 25rpx;color: blue;"
						>(复制分享链接)</view> -->
					</view>
					<view class="m-top-15 fs-25" v-if="BaomingInfo.visitorProvince">
						{{BaomingInfo.visitorProvince}},
						{{BaomingInfo.visitorCity}}
						<block v-if="BaomingInfo.visitorAddress">
							{{BaomingInfo.visitorAddress}}
						</block>
					</view>
					<view class="h-30"></view>
				</view>
				<view class="colonn w-650  center_center" 
				style="background-color: #e6e6e6;">
					<view class="h-30"></view>
					<view class="fw-b fs-30">确认码</view>
					<view class="h-30 m-top-15">{{BaomingInfo.id}}</view>
					<slot class="w-300 h-300 m-bottom-20"></slot>
					<view class="h-30 m-top-15 fs-30">登记时间：{{BaomingInfo.createTime}}</view>
					<view class="h-50"></view>
				</view>
				
				<view class="colonn center_center">
					<view class="yqhyxfl" @click.stop="zhezhaoShowCLick">邀请好友登记享福利</view>
					<view class="yqhyxfl" @click.stop="toJilu">查看我的邀约记录</view>
					<!-- <view class="yqhyxfl"
					@click.stop="totime" v-if="exType==2"
					>下届开展时间统计</view> -->
				</view>

				<view class="colonn w-600 fs-25 m-top-20">
					<view><rich-text :nodes="yubaominghuacn.notice"></rich-text></view>
				</view>
				<view class="h-50"></view>
			</view>
		</view>

		<!-- <view
		style="position: fixed;bottom: 200rpx;right: 100rpx;"
		>团</view> -->
		
		<!-- <block v-if="exType!=1">
			<image src="/static/tuan.png"
			class="w-100 h-100 yojiatu"
			 v-if="groupId" @click.stop="qrAlertShowClick"></image>
			<image src="/static/tuan2.png" 
			class="w-100 h-100 yojiatu" 
			v-if="!groupId" @click.stop="creategroupvisitorSet1">
			</image>
		</block> -->
		

		<view class="colonn center_center huuibeijing" v-if="qrAlertShow">
			<!-- :src="meQrImg" -->
			<!-- src="https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTLFDTSP7aeSBByIHYYqPZZZtA4h0Tjp9rvYCgE6U01cVJx9uYzjwibNJhKO6Eh6IWZ3LA13RNpicHJg/132"
			 -->
			<image :src="meQrImg" class="w-500 h-500 m-bottom-50"></image>
			<view style="color: white;font-weight: bold;" class="m-bottom-50">长按图片下载</view>

			<image src="/static/close.png" @click.stop="qrAlertShowClick" class="w-50 h-50"></image>
			<view @click.stop="toHtyaoyue" class="saddasd">使用H5邀约</view>

		</view>

		<view class="w-750 zhezhaoim" style="height: 100vh;" 
		catchtouchmove="preventTouchMove" 
		v-if="zhezhaoShow"
			@click.stop="zhezhaoShowCLick">
			<image src="/static/b48f2c733bb0eaefb146c86f485a1aa.png"
			 class="w-450 poab" style="right: 0rpx;top: 0rpx;"
				mode="widthFix"></image>
		</view>


	</view>
</template>

<script>
	const qrCode = require('../../style/weapp-qrcode.js')
	export default {
		name: "baomingchenggong",
		props: {
			'yubaominghuacn': {
				type: Object,
				value: {}
			},
		},
		data() {
			return {
				qrPath: '123',
				text: '123123',
				size: 400,
				quality: 'L',
				colorDark: '#000000',
				colorLight: 'red',

				BaomingInfo: {}, //报名信息

				groupId: null,

				meQrImg: "", //图片地址
				BASE_IMG: "",
				BASE_URL_ZLF: "",
				qrAlertShow: false,
				zhezhaoShow: false,
				exType: "",

				nowExhId: "",
			};
		},
		beforeMount() {
			console.log("yubaominghuacn", this.yubaominghuacn)
			this.BASE_IMG = this.$paths.BASE_IMG;
			this.BASE_URL_ZLF = this.$paths.BASE_URL_ZLF;
			this.handleShowCodeClick();
			this.infovisitorGet()

			var exType = uni.getStorageSync("exType");
			this.exType = exType;
			var nowExhId = uni.getStorageSync("nowExhId");
			this.nowExhId = nowExhId;
			this.isToLink();
		},
		methods: {

			// 获取手气
			isToLink() {
				var yubaominghuacn = uni.getStorageSync("yubaominghuacn");
				console.log("获取手气手气手气",yubaominghuacn);
				if (yubaominghuacn) {
					
					var nowExhId=uni.getStorageSync("nowExhId");
					var linkUp = uni.getStorageSync("linkUp"+nowExhId);
				
					if (!linkUp && yubaominghuacn.jumpType == 1) {
						uni.showModal({
							title: "提示",
							content: yubaominghuacn.jumpText,
							// 注释这个注册这个
							showCancel:false,
							success: (res) => {
								uni.setStorageSync 
								("linkUp"+nowExhId,'nowExhId'+nowExhId);
								if (res.confirm) {
									window.location.href=yubaominghuacn.jumpPath;
								}
							}
						})
					}
				}
			},


			totime() {
				uni.navigateTo({
					url: "/pages/kzsjtj/kzsjtj"
				})
			},
			preventTouchMove() {},
			toJilu() {
				uni.navigateTo({
					url: "/pages/yaoyuejilu/yaoyuejilu"
				})
			},

			zhezhaoShowCLick() {
				this.zhezhaoShow = !this.zhezhaoShow;
			},

			toHtyaoyue() {
				uni.navigateTo({
					url: "/pages/groupQr/groupQr"
				})
			},

			qrAlertShowClick() {
				var exType = uni.getStorageSync("exType");
				console.log("qrAlertShowClick", exType, exType == 7)
				// if (exType == 7 || exType == 8 || exType == 9 || exType == 10) {
					uni.navigateTo({
						url: "/pages/groupQr/groupQr"
					})
				// } else {
				// 	this.qrAlertShow = !this.qrAlertShow;
				// }
			},
			// 创建战团
			creategroupvisitorSet1() {
				uni.showModal({
					title: '提示',
					content: '确定要创建展团吗？',
					success: (res) => {
						if (res.confirm) {
							this.creategroupvisitorSet();
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			},
			// 创建战团
			creategroupvisitorSet() {
				// baomingInfoClick
				var baomingxinxiYu = uni.getStorageSync("baomingxinxiYu");
				var userInfo = uni.getStorageSync("userInfo");
				var data = {
					'visitorId': this.BaomingInfo.visitorId,
					'exhId': uni.getStorageSync("nowExhId"),
					'groupName': '',
					'visitorName': this.BaomingInfo.visitorName,
					'visitorAvatar': "",
				}
				this.$axios
					.axios('post', this.$paths.creategroupvisitor, data)
					.then(res => {
						if (res.code == 200) {
							this.$tools.showToast("展团创建成功");
							this.groupId = res.data;
							this.meQrImg = res.data.qrCode;
							this.existgroupvisitorGet()
						} else {
							this.$tools.showToast(res.msg);
						}
					})
					.catch(err => {});
			},

			// 是否存在战团  existgroupvisitor
			existgroupvisitorGet() {
				console.log("报名信", this.BaomingInfo)
				var data = {
					exhId: uni.getStorageSync("nowExhId"),
					params: {
						unionid: this.BaomingInfo.unionid ? this.BaomingInfo.unionid : uni.getStorageSync("unionid")
					}
				}
				console.log("是否存在战团", data);
				this.$axios
					.axios('POST',
						this.$paths.existgroupvisitor,
						data)
					.then(res => {
						if (res.code == 200) {
							this.groupId = res.data;
							this.meQrImg = res.data1.qrCode;
						} else {

						}
					})
					.catch(err => {
						console.log('错误回调', err);
					});
			},

			// 获取浏览器地址参数
			getRequestParams() {
				var requestParams = {};
				var url = location.search;
				if (url.indexOf("?") !== -1) {
					var str = url.substr(1);
					var params = str.split("&");
					for (var i = 0; i < params.length; i++) {
						var param = params[i];
						var d = param.split("=");
						requestParams[d[0]] = decodeURIComponent(d[1]);
					}
				}
				return requestParams;
			},
			getCanshu() {
				console.log("获取参数")
				var url = window.location.href
				console.log("浏览器地址", url);
				if (url.indexOf("?") >= 0) {
					url = url.split("?")
				}

				console.log("浏览器地址", url);
				if (url[1].indexOf("#") >= 0) {
					url = url[1].split("#");
					console.log("浏览器地址", url);
					var canshu = url[0];
					console.log("浏览器地址", canshu);

					var href = "https://frdzhtsignup.zsyflive.com/?" + canshu + "#/";
					window.location.href = href;
				}
			},
			getShareUrl() {
				var nowExhId = uni.getStorageSync("nowExhId");
				var exType = uni.getStorageSync("exType");
				var unionid = uni.getStorageSync("unionid");
				var name = uni.getStorageSync("name");

				var url = "https://frdzhtsignup.zsyflive.com?exType=" + exType + "&exhId=" + nowExhId + "&upUid=" + unionid

				if (name) {
					url = url + "&name=" + name;
				}
				url = encodeURI(url);
				console.log(url)
				this.$copyText(url).then(
					res => {
						uni.showToast({
							title: '复制成功'
						})
					}
				)
			},
			infovisitorGet() {
				var unionid = uni.getStorageSync("unionid");
				if (!unionid) {
					this.$tools.showToast("请先登录");
					return false;
				}
				var data1 = {
					'unionid': unionid,
					params: {
						exhId: uni.getStorageSync("nowExhId"),
					}
				}
				console.log("---infovisitor个人信息", )
				this.$axios
					.axios('POST',
						// this.$paths.infovisitor, 
						this.$paths.enrollinfovisitor,
						data1)
					.then(res => {
						if (res.code == 200) {
							this.BaomingInfo = res.data;
							uni.setStorageSync("bmxxInfo", this.BaomingInfo)
							console.log("BaomingInfo", this.BaomingInfo)
							this.existgroupvisitorGet()
						} else {
							this.$tools.showToast(res.msg);
							console.log("报名信息")
							this.getCanshu()
						}
					})
					.catch(err => {
						console.log('错误回调', err);
					});
			},

			handleShowCodeClick() {
				this.initQrCode();
			},
			initQrCode() {
				new qrCode('werfsdfsdf', {
					text: "asdasdasd",
					width: 200,
					height: 200,
					colorDark: "#333333",
					colorLight: "#FFFFFF",
					correctLevel: qrCode.CorrectLevel.H
				})
			},
		}
	}
</script>

<style>
	.zhezhaoim {
		position: fixed;
		bottom: 0rpx;
		left: 0rpx;
		background-color: rgba(0, 0, 0, 0.7);
	}

	.yqhyxfl {
		width: 550rpx;
		height: 80rpx;
		background-color: #2E7EFC;
		border-radius: 10rpx;
		margin-top: 20rpx;
		text-align: center;
		color: white;
		line-height: 80rpx;
	}

	.yojiatu {
		position: fixed;
		bottom: 150rpx;
		right: 50rpx;
	}

	.saddasd {
		background-color: blue;
		text-align: center;
		line-height: 70rpx;
		color: white;
		width: 350rpx;
		height: 70rpx;
		border-radius: 15rpx;
		margin-top: 50rpx;
	}
</style>