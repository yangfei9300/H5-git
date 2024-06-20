<template>
	<view>
		<view class="colonn">
			<view class="roww center_center topviuews">
				<view class="w-50"></view>
				<view class="colonn">
					<image :src="$tools.getlogos(exType)" class="headimng"></image>
					<view class="xingming txtShowLength">{{ bmxxInfo.visitorName }}</view>
				</view>
				<view class="w-70 h-180"></view>
				<view class="colonn allline">
					<view class="roww">
						<image src="/static/yaoyueicon.png" class="w-50 h-50"></image>
						<view class="font_size7_r m-left-15 color6_r">我的邀约</view>
					</view>
					<view class="roww m-top-20">
						<!-- <view class="colonn ">
							<view class="roww duiqi color6_r">
								<view class="fs-40">4</view>
								<view class="fs-20">人</view>
							</view>
							<view class="fs-15 color6_r">发送邀请</view>
						</view> -->
						<view class="colonn">
							<view class="roww duiqi color6_r">
								<view class="fs-40" v-if="turnoutNum.params">
									{{ turnoutNum.params.referrerCount ? turnoutNum.params.referrerCount : 0 }}
								</view>
								<view class="fs-20">人</view>
							</view>
							<view class="fs-25 color6_r">登记成功</view>
						</view>
						<view class="colonn m-left-25">
							<view class="roww duiqi color6_r">
								<view class="fs-40" v-if="turnoutNum.params">
									{{ turnoutNum.params.referrerArriveCount ? turnoutNum.params.referrerArriveCount : 0 }}
								</view>
								<view class="fs-20">人</view>
							</view>
							<view class="fs-25 color6_r">展会入场</view>
						</view>
						<view class="allline"></view>
					</view>
				</view>
				<image @click.stop="ifShowClick" src="../../static/frd.png" class="w-150 h-150"></image>
				<view class="w-50"></view>
			</view>
			<!-- <image class="imagess"></image> -->
			<view class="colonn">
				<view class="colonn center_center">
					<view class="yqhyxfl roww center_center" 
					@click.stop="copyUrl">
						<view>点击复制邀约链接</view>
						<view class="w-10"></view>
					</view>
					<view class="yqhyxfl roww center_center" 
					@click.stop="openClick(1)"
					v-if="yubaominghuacn.invitationRules"
					>
						<!--  @click.stop="zhezhaoShowCLick" -->
						<view>查看邀约规则</view>
						<view class="w-10"></view>
						<image src="/static/xiangshangzhanhang.png" class="w-40 h-40" v-if="guizeOpen"></image>
						<image src="/static/xiangxiazhanhang.png" class="w-40 h-40" v-if="!guizeOpen"></image>
					</view>
					<view class="m-all-25" v-if="guizeOpen">
						<rich-text :nodes="yubaominghuacn.invitationRules"></rich-text>
					</view>
					<view class="yqhyxfl roww center_center" @click.stop="openClick(2)">
						<view>我的邀约记录</view>
						<view class="w-10"></view>
						<image src="/static/xiangshangzhanhang.png" class="w-40 h-40" v-if="yaoyueJilu"></image>
						<image src="/static/xiangxiazhanhang.png" class="w-40 h-40" v-if="!yaoyueJilu"></image>
					</view>
				</view>

				<view v-if="yaoyueJilu" 
				class="roww m-top-20 p-bottom-10 center_center border_bottom p-left-20 p-right-20" v-for="(item, index) in referrerUserList">
					<image class="headimg" 
					:src="$tools.getlogos(exType)"></image>
					<view class="colonn">
						<view class="fs-27 w-300 txtShowLength">{{ item.visitorName }}</view>
					</view>
					<view class="allline"></view>
					<view style="color: red; font-size: 27rpx" v-if="item.status == 0">未核销</view>
					<view style="color: blue; font-size: 27rpx" v-if="item.status == 1">已核销</view>
					<view class="w-15"></view>
				</view>
			</view>
		</view>

		<view v-if="ifShow" 
		class="huuibeijing colonn center_center"
		style="background-color: rgba(255, 255, 255, 0.5);"
		>  
			<view style="font-size: 30rpx; color: black; font-weight: bold">观众邀约码</view>
			<view class="h-30"></view>
			<tki-qrcode cid="qrcode2" ref="qrcode2" :val="qrValue" :size="size" :onval="onval" :loadMake="loadMake" :usingComponents="true" @result="qrR" />
			<view class="h-20"></view>
			<view class="qrimg" @click.stop="ifShowClick">关闭</view>
			<view class="h-20"></view>
			<view style="color: black">【请大家截图保存（或者长按二维码保存）】</view>
		</view>
	</view>
</template>

<script>
	const CryptoJS = require('crypto-js') // 引用AES源码js
	const key = CryptoJS.enc.Utf8.parse('2020081720200817') // 十六位十六进制数作为密钥
	
export default {
	data() {
		return {
			referrerUserList: [], //邀请列表
			exType: null,
			turnoutNum: {}, //到场人数
			registrationNum: 0,
			pagenum: 1,

			bmxxInfo: {}, //报名信息
			guizeOpen: false,
			yaoyueJilu: false,

			yubaominghuacn: {}, //展会配置
			isRush: true, //是否继续加载

			// 二维码
			ifShow: false,
			size: 400,
			onval: false, // val值变化时自动重新生成二维码
			loadMake: true, // 组件加载完成后自动生成二维码
			qrValue: '',
			src: '', // 二维码生成后的图片地址或base64
			unionid: '',
			shareUrl: ''
		};
	},
	onLoad() {
		this.yubaominghuacn = uni.getStorageSync('yubaominghuacn');
		// this.info.content =  this.info.content.replace(/\<img/gi, '<img style="width:100%" ')
		this.bmxxInfo = uni.getStorageSync('bmxxInfo');
		this.exType = uni.getStorageSync('exType');
		// this.referrerlist();
		this.referrerCountarrive();
		this.openClick(3);

		if (this.yubaominghuacn.invitationRules) {
			this.yubaominghuacn.invitationRules = this.yubaominghuacn.invitationRules.replace(/\<img/gi, '<img style="width:100%" ');
		}
		this.unionid = uni.getStorageSync('unionid');
		if (!this.unionid) {
			return false;
		}
		var exType = uni.getStorageSync('exType');
		var nowExhId = uni.getStorageSync('nowExhId');
		
		var timestamp = Date.parse(new Date());
		// timestamp=timestamp-2200000
		var qrValue = 'https://frdzhtsignup.zsyflive.com?exType=' + exType + '&exhId=' + nowExhId + '&upUid=' + this.unionid+"&timestamp="+timestamp;
		var txt=qrValue.split("?")[1];
		var toJaimiStr=getApp().aesEncrypt(txt);
		toJaimiStr="https://frdzhtsignup.zsyflive.com/frd/"+toJaimiStr;
		this.qrValue=toJaimiStr;
		// this.qrValue = qrValue;
		var isWeixin = uni.getStorageSync('isWeixin');
		if (isWeixin && isWeixin == 1) {
			this.$tools.shareWx();
		}
	},
	onReachBottom() {
		if (this.yaoyueJilu) {
			if (this.referrerUserList.length < this.turnoutNum.params.referrerCount) {
				this.referrerlist();
			}
		}
	},
	methods: {
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
		copyUrl() {
			// var txt=this.qrValue.split("?")[1];
			// var toJaimiStr=getApp().aesEncrypt(txt);
			// toJaimiStr="https://frdzhtsignup.zsyflive.com/frd/"+toJaimiStr;
			this.$copyText(this.qrValue)
				.then((res) => {
					console.log('asd', res);
					uni.showToast({
						title: '复制成功',
						icon: 'none'
					});
				})
				.catch((res) => {
					console.log('复制报错', res);
				});
		},
		// 二维码
		qrR(res) {
			this.src = res;
		},
		ifShowClick() {
			this.ifShow = !this.ifShow;
		},

		openClick(type) {
			if (type == 1) {
				this.guizeOpen = !this.guizeOpen;
				this.yaoyueJilu = false;
			}
			if (type == 2) {
				this.guizeOpen = false;
				this.yaoyueJilu = !this.yaoyueJilu;
				if (this.yaoyueJilu && this.referrerUserList.length <= 0) {
					this.referrerlist();
				}
			}
			if (type == 3) {
				this.guizeOpen = false;
				this.yaoyueJilu = false;
			}
		},
		// 获取到场人数
		referrerCountarrive() {
			var data = {
				exhId: uni.getStorageSync('nowExhId'),
				referrerId: uni.getStorageSync('unionid')
			};
			this.$axios
				.axios('POST', this.$paths.referrerCountarrive, data)
				.then((res) => {
					if (res.code == 200) {
						this.turnoutNum = res.data;
						console.log(this.turnoutNum);
					} else {
						this.$tools.showToast(res.msg);
					}
				})
				.catch((err) => {});
		},
		// 获取邀请列表
		referrerlist() {
			var data = {
				exhId: uni.getStorageSync('nowExhId'),
				referrerId: uni.getStorageSync('unionid')
			};
			this.$axios
				.axios('POST', this.$paths.referrerlist + '?pageNum=' + this.pagenum + '&pageSize=15', data)
				.then((res) => {
					if (res.code == 200) {
						this.referrerUserList = this.referrerUserList.concat(res.rows);

						this.pagenum = this.pagenum + 1;
					} else {
						this.$tools.showToast(res.msg);
					}
				})
				.catch((err) => {});
		}
	}
};
</script>

<style>
@import url(yaoyuejilu.css);
</style>
