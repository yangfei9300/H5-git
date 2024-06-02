<script>
	export default {
		onLoad() {
			
			
			
			// http://192.168.0.69:8080?exType=3&exhId=149    全屋
			// http://192.168.0.69:8080?exType=5&exhId=150    建材
			// http://192.168.0.69:8080?exType=4&exhId=155    秋交会
			// http://192.168.0.69:8080?exType=7&exhId=153    西安五金
			// http://192.168.0.69:8080?exType=2&exhId=151    体博会
			// http://192.168.0.69:8080?exType=12&exhId=158    武汉
			// http://192.168.0.69:8080?exType=1&exhId=148     环保
		}, 
		// 18853917606
		onLaunch: function(options) {
			console.log("项目初始化")
			// var encrypt = getApp().aesEncrypt('exType=8&exhId=137&upUid=17753910424');
			// console.log('===encrypt===',encrypt);
			// var decrypt = getApp().aesDecrypt(encrypt);
			// console.log('===decrypt===',decrypt);
			var url = window.location.href;
			url = this.$tools.toDuanlianjie(url);
			console.log("lbh", url);
			// if (url.indexOf("lbh") >= 0) {
			// 	uni.setStorageSync("nowExhId", "123")
			// 	uni.setStorageSync("exType", "4")
			// } else if (url.indexOf("ljh") >= 0) {
			// 	uni.setStorageSync("nowExhId", "129")
			// 	uni.setStorageSync("exType", "9")
			// }
			uni.setStorageSync("locationhref", url);
			console.log('App Launch', options, options.clear == 1);
			if (url.indexOf("clear=1") >= 0) {
				uni.clearStorageSync();
			}  
			//判断是否有自己的手机号
			this.$tools.initDate();
			if (url.indexOf("wxPhone") >= 0) {
				var data = this.$tools.getRequestParams();
				console.error("手机号", data);
				uni.setStorageSync('unionid', data.wxPhone);
			}
			//检查浏览器
			var ua = navigator.userAgent.toLowerCase();
			var isWeixin = ua.indexOf('micromessenger') != -1;
			if (!isWeixin) {
				console.error("请使用微信浏览器打开！");
				uni.setStorageSync("isWeixin", "2")
			} else {
				uni.setStorageSync("isWeixin", "1") //是微信浏览器
				console.error("这里是微信浏览器");
			}
		},
		onShow: function() {
			console.log('App Show');
		},
		onHide: function() {
			console.log('App Hidehan--feng--po');
		},
		methods: {
			// 1环保
			// 2体博会
			// 3临沂全屋定制
			// 4秋季全国五金会
			// 7西安五金
			// 8叶集展会
			// 9林交会
			// 10南宁全屋
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
			//AES加密
			aesEncrypt(encrypt) {
				//加密值
				var e = this.AES.encrypt(encrypt, '1234567891234567', '1234567891234567')
				// console.error("加密结果",e);
				return e;
			},
			//AES解密
			aesDecrypt(decrypt) {
				// console.error("解密值",decrypt);
				//解密值
				var d = this.AES.decrypt(decrypt, '1234567891234567', '1234567891234567')
				// console.error("解密结果",d);
				return d;
			},
		}
	}
</script>

<style lang="scss">
	*{
		-webkit-overflow-scrolling: touch;
	}
	/*每个页面公共css */
	@import url("/style/style.css");
	@import url("/style/style_rpx.css");
	@import "/style/ty_style_scss.scss";
</style>