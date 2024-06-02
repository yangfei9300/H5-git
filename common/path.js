// 测试
// export const BASE_URL = 'http://192.168.0.22:9001'
// export const BASE_URL_ZLF = 'http://192.168.0.22:9004'
// export const BASE_IMG = 'http://192.168.0.22:9001'
// export const BASE_VIDEO = 'https://frd-yhc.oss-cn-hangzhou.aliyuncs.com'
// 老服务器
// export const BASE_URL = 'https://shandongtibohui.zsyflive.com'  
// export const BASE_URL_ZLF = 'http://47.95.150.89:9004'
// export const BASE_IMG = 'https://shandongtibohui.zsyflive.com'
// export const BASE_VIDEO = 'https://frd-yhc.oss-cn-hangzhou.aliyuncs.com'
   
// 新服务器
// export const BASE_URL = 'https://shandongtibohui.zsyflive.com'  
// export const BASE_URL_ZLF = 'http://47.104.166.115:9004'
// export const BASE_IMG = 'https://shandongtibohui.zsyflive.com'
// export const BASE_VIDEO = 'https://frd-yhc.oss-cn-hangzhou.aliyuncs.com'

// 好服务器
// export const BASE_URL = 'https://shandongtibohui.zsyflive.com'  
// export const BASE_URL_ZLF = 'http://47.105.106.174:9020'
// export const BASE_IMG = 'https://shandongtibohui.zsyflive.com'
// export const BASE_VIDEO = 'https://frd-yhc.oss-cn-hangzhou.aliyuncs.com'
// 负载均衡域名
// export const BASE_URL = 'https://shandongtibohui.zsyflive.com'  
// export const BASE_URL_ZLF = 'http://gtm-cn-9lb393pra07.zsyflive.com'
// export const BASE_IMG = 'https://shandongtibohui.zsyflive.com'
// export const BASE_VIDEO = 'https://frd-yhc.oss-cn-hangzhou.aliyuncs.com'
// 首鑫电脑远程地址
 // export const BASE_URL = 'https://6ld4218856.goho.co'
 // export const BASE_URL_ZLF = 'https://64n2188z56.vicp.fun'
 // export const BASE_IMG = 'https://6ld4218856.goho.co '
 // export const BASE_VIDEO = 'https://frd-yhc.oss-cn-hangzhou.aliyuncs.com'
   
   
   
// 正式 prod-api   
export const BASE_URL = 'https://shandongtibohui.zsyflive.com'  
export const BASE_URL_ZLF = 'https://frdzlfapi.zsyflive.com'
export const BASE_IMG = 'https://shandongtibohui.zsyflive.com'
export const BASE_VIDEO = 'https://frd-yhc.oss-cn-hangzhou.aliyuncs.com'
// 是否报名  
const enrollcheckvisitor=BASE_URL_ZLF + '/api/visitor/check/enroll'
// 判断是否打卷
const whetheransapi=BASE_URL_ZLF + '/api/visitor/ans/whether'
// 根据unionid查询观众信息
const infovisitor=BASE_URL_ZLF + '/api/visitor/info'
// 根据unionid新建观众信息  
const insertinfovisitor=BASE_URL_ZLF + '/api/visitor/info/insert'
// 是否存在战团 
const existgroupvisitor=BASE_URL_ZLF + '/api/visitor/group/exist'
// 问卷调查  
const exhtypeminiapp=BASE_URL + '/miniapp/exhtype'
// 发短信  
const getphonesendmsg=BASE_URL + '/miniapp/getphone/sendmsg'
 
// 验证验证码是否正确
const getphonebinding=BASE_URL + '/miniapp/getphone/binding'
// 验证验证码  
const getphoneupdate=BASE_URL + '/miniapp/getphone/update'
//  4.报名
const enrollvisitorapi=BASE_URL_ZLF + '/api/visitor/enroll'
// 保存用户问卷
const ansvisitorapi=BASE_URL_ZLF + '/api/visitor/ans'
// 获取获取展会信息
const enrollconfig=BASE_URL + '/miniapp/enroll/config'
// 分享获取具体参数 
const ticketwxminiapp=BASE_URL + '/miniapp/wx/ticket'
// 是否报名以及答题
const enroll2check=BASE_URL_ZLF + '/api/visitor/check/enroll2'
// 5.创建展团
const creategroupvisitor=BASE_URL_ZLF + '/api/visitor/group/create'
// 5.邀请列表
const referrerlist=BASE_URL_ZLF + '/api/visitor/referrer/list'
// 5.到场人数
const referrerCountarrive=BASE_URL_ZLF + '/api/visitor/referrerCount/arrive'
// 查询报名展会的信息）（不是注册信息）
const enrollinfovisitor=BASE_URL_ZLF + '/api/visitor/info/enroll'
// 展商选择开展月份
const afterans=BASE_URL_ZLF + '/api/visitor/ans/after/'
// 加密接口短信
const getphonesendmsgE=BASE_URL + '/miniapp/getphone/sendmsgE'



 export default {
	 getphonesendmsgE,
	 enrollinfovisitor,afterans,
	 referrerlist,referrerCountarrive,
	 enrollconfig,ticketwxminiapp,enroll2check,
 	enrollcheckvisitor,whetheransapi,infovisitor,
	insertinfovisitor,existgroupvisitor,ansvisitorapi,
	exhtypeminiapp,getphonesendmsg,enrollvisitorapi,
	BASE_URL,BASE_URL_ZLF,BASE_IMG,BASE_VIDEO,creategroupvisitor
 }
