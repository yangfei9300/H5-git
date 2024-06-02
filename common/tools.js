import axios1 from './axios.js'; //程序基础配置
import path1 from './path.js'; //程序基础配置
import util1 from './js/util.js'; //程序基础配置

var tools = {
	
	// 对数据进行加密
	toJaimi(){
		var exType=uni.getStorageSync("exType");
		var nowExhId=uni.getStorageSync("nowExhId");
		var unionid=uni.getStorageSync("unionid");
		if(exType==""||nowExhId==""||unionid==""){
			this.showToast("数据不足，链接生成失败");
			return
		}
		var txt="exType="+exType+"&exhId="+nowExhId+"&upUid="+unionid;
		var decrypt = getApp().aesEncrypt(txt);
		return decrypt;
	},
	
	// 获取加密的数据
	toDuanlianjie(url){
		if(url.indexOf("/frd/")>=0){
			if(url.indexOf("#")>=0){
				url=url.split("#")[0];
			}
			var urlData=url.split("/")[url.split("/").length-1];
			console.log('===encrypt1encrypt===',urlData);
			var decrypt = getApp().aesDecrypt(urlData);
			url=url.split("/frd")[0]
			url=url+"?"+decrypt;
			console.log('===encrypturlurlurl===',url);
		}
		return url;
	},
	
	getlogos(type){
		var logos={
			'1':'https://shandongtibohui.zsyflive.com/profile/upload/2022/08/03/6fbca66972154d56b163daab0df6fb87_20220803092533A004.jpg',
			'2':'https://shandongtibohui.zsyflive.com/profile/upload/2022/08/03/fe6bbb03f29647538c83eead4613394d_20220803092610A005.jpg',
			'3':'https://frdzhtsignup.zsyflive.com/static/logo3.png',
			'4':'https://shandongtibohui.zsyflive.com/profile/upload/2022/08/03/cc7fcbcb6483444aa73501d3a22f3c69_20220803092643A007.png',
			'7':'https://shandongtibohui.zsyflive.com/profile/avatar/2023/03/20/blob_20230320163234A003.jpeg',
			'8':'https://shandongtibohui.zsyflive.com/profile/upload/2022/08/03/5b7a91c9080c8042574c9ec8763888d.png',
			'9':'https://shandongtibohui.zsyflive.com/profile/upload/2022/08/03/4a80f53502799bd30d0633b53c51e21.jpg',
			'10':'https://shandongtibohui.zsyflive.com/profile/upload/2022/08/03/7041baff1cbb8a8e97aa7c54c398b59.png',
			'11':'https://shandongtibohui.zsyflive.com/profile/upload/2022/08/03/64862440c0b451323f79f6d22551748.png',
			'5':'https://shandongtibohui.zsyflive.com/profile/upload/2022/08/03/35c8a0876feaff57765811023b70451.png',
			'12':'https://shandongtibohui.zsyflive.com/profile/upload/2022/08/03/wuhan.png',
			
		}
		return logos[type+'']
	},
	
	initDate() {
		var url = window.location.href
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
	},
	
	getRequestParams() {
		var requestParams = {};
		var str = uni.getStorageSync("canshu");
		var params = str.split("&");
		for (var i = 0; i < params.length; i++) {
			var param = params[i];
			var d = param.split("=");
			requestParams[d[0]] = decodeURIComponent(d[1]);
		}
		return requestParams;
	},
	
	// 微信公众号分享
	shareWx(){
		console.error("分下工")
		var wxShare=uni.getStorageSync("wxShare")
		var isObsolete=true;//true过时了
		if(wxShare){
			if(((new Date().getTime())-wxShare.time)>6000000){
				isObsolete=true
			}else{
				isObsolete=false;
			}
		}
		// if(!isObsolete){//
		// 	this.toShareWx(wxShare.data);
		// 	return
		// }
		var url = window.location.href
		let os = ""
		var xinxi = uni.getSystemInfoSync();
		
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
		axios1
			.axios('post', path1.ticketwxminiapp, data)
			.then(res => {
				// if (res.code == 200) {
				uni.setStorageSync("wxShare",{
					'data':res,
					time:new Date().getTime()
				})
				this.toShareWx(res);
			})
			.catch(err => {});
	},
	toShareWx(res){
		
		console.log("分享调用")
		try {
			util1.jwxModule(
				res,
				this.gettitle(),
				this.gettitle(),
				window.location.href,
				"https://shandongtibohui.zsyflive.com/profile/upload/2022/08/03/16b9760cd7064e6aa756604b7202d396_20220803092628A006.png"
			)
		} catch (e) {
			console.log("薄袄报错122", e)
		}
	},
	gettitle(){
		var exType=uni.getStorageSync("exType")
		if(exType==3){
			var title="第八届（临沂）全屋定制精品展"
		}else if(exType==1){
			var title="第10届国际绿色环保产业博览会"
		}else if(exType==2){
			var title="第五届山东体育用品博览会"
		}else if(exType==4){
			var title="2024（第73届）秋季全国五金商品交易会"
		}else if(exType==7){
			var title="2024中国（西安）国际五金机电博览会"
		}else if(exType==8){
			var title="首届叶集定制家居暨供应链产业博览会"
		}else if(exType==9){
			var title="第十九届中国木业产业及供应链博览会"
		}else if(exType==10){
			var title="2024广西木业供应链博览会"
		}else if(exType==11){
			var title="第十六届中国农资交易会"
		}else if(exType==5){
			var title="第四届中国（临沂）绿色建筑建材产业博览会"
		}
		return title
	},
	//解决富文本图片溢出
	formatRichText(html) {
			let newContent = html.replace(/<img[^>]*>/gi, function(match, capture) {
				match = match.replace(/style="[^"]+"/gi, '').replace(/style='[^']+'/gi, '');
				match = match.replace(/width="[^"]+"/gi, '').replace(/width='[^']+'/gi, '');
				match = match.replace(/height="[^"]+"/gi, '').replace(/height='[^']+'/gi, '');
				return match;
			});
			newContent = newContent.replace(/style="[^"]+"/gi, function(match, capture) {
				match = match.replace(/width:[^;]+;/gi, 'max-width:100%;').replace(/width:[^;]+;/gi, 'max-width:100%;');
				return match;
			});
			newContent = newContent.replace(/<br[^>]*\/>/gi, '');
			newContent = newContent.replace(/\<img/gi,
				'<img style="max-width:100%;height:auto;display:inline-block;margin:10rpx auto;"');
			return newContent;
		},
	getKaishijieshu(){
		var nowDate = new Date();
		var cloneNowDate = new Date();
		var fullYear = nowDate.getFullYear();
		var month = nowDate.getMonth() + 1; // getMonth 方法返回 0-11，代表1-12月
		var endOfMonth = new Date(fullYear, month, 0).getDate(); // 获取本月最后一天
		function getFullDate(targetDate) {
		        var D, y, m, d;
		        if (targetDate) {
		            D = new Date(targetDate);
		            y = D.getFullYear();
		            m = D.getMonth() + 1;
		            d = D.getDate();
		        } else {
		            y = fullYear;
		            m = month;
		            d = date;
		        }
		        m = m > 9 ? m : '0' + m;
		        d = d > 9 ? d : '0' + d;
		        return y + '-' + m + '-' + d;
		    };
		var endDate = getFullDate(cloneNowDate.setDate(endOfMonth));//当月最后一天
		var starDate = getFullDate(cloneNowDate.setDate(1));//当月第一天
		console.log(starDate)
		console.log(endDate)
	},
	// 验证手机号
	isphone(phone) {
		if (!(/^1[3456789]\d{9}$/.test(phone))) {
			return false;
		}
		return true;
	},
	isEmail(email) {
		if (email.search(/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/) != -1)
			return true;
		else
			return false;
	},
	//获取订单编号
	getOrderNumber() {
		var timestamp = Date.parse(new Date());
		var Range = 100 - 1;
		var Rand = Math.random();
		return timestamp + (1 + Math.round(Rand * Range));
	},
	//获取随机数
	getSuiji() {
		var Range = Max - Min;
		var Rand = Math.random();
		return (Min + Math.round(Rand * Range));
	},
	//轻提示
	showToast(txt) {
		uni.showToast({
			title: txt,
			'icon': 'none'

		})
	},
	//计算多长时间前
	getDateDiff(dateTimeStamp) {
		var minute = 1000 * 60;
		var hour = minute * 60;
		var day = hour * 24;
		var halfamonth = day * 15;
		var month = day * 30;
		var year = day * 365;
		var now = new Date().getTime();
		var diffValue = now - dateTimeStamp;
		if (diffValue < 0) {
			return;
		}
		var yearC = diffValue / year;
		var monthC = diffValue / month;
		var weekC = diffValue / (7 * day);
		var dayC = diffValue / day;
		var hourC = diffValue / hour;
		var minC = diffValue / minute;
		if (yearC >= 1) {
			result = "" + parseInt(yearC) + "年前";
		}
		if (monthC >= 1) {
			result = "" + parseInt(monthC) + "月前";
		} else if (weekC >= 1) {
			result = "" + parseInt(weekC) + "周前";
		} else if (dayC >= 1) {
			result = "" + parseInt(dayC) + "天前";
		} else if (hourC >= 1) {
			result = "" + parseInt(hourC) + "小时前";
		} else if (minC >= 1) {
			result = "" + parseInt(minC) + "分钟前";
		} else
			result = "刚刚";
		return result;
	},
	timestampToTime(timestamp) {
		var date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
		var Y = date.getFullYear() + '-';
		var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
		var D = (date.getDate()<10?'0'+date.getDate():date.getDate()) + ' ';
		var h = (date.getHours()<10?'0'+date.getHours():date.getHours()) + ':';
		var m = (date.getMinutes()<10?'0'+date.getMinutes():date.getMinutes()) + ':';
		var s = (date.getSeconds()<10?'0'+date.getSeconds():date.getSeconds());
		return Y+M+D+h+m+s;
	},
	
	/**判断是否是手机号**/
	isPhoneNumber(tel) {
	    var reg =/^0?1[3|4|5|6|7|8][0-9]\d{8}$/;
	    return reg.test(tel);
	}
}

//将时间戳转换成正常时间格式
export default tools;
