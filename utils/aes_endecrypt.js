/**
 * 工具类
 */
import Vue from 'vue'
import CryptoJS from 'crypto-js'
let keyStr = "abcde123456";//加密密钥
let ivStr  = "yyuuide45678";//矢量
 
//加密
export function aes_encrypt(word){ 
    keyStr = keyStr ? keyStr : 'hfhfuu8dolv98bt6';
    var key  = CryptoJS.enc.Utf8.parse(keyStr);
	var iv   = CryptoJS.enc.Utf8.parse(ivStr);
    // var srcs = CryptoJS.enc.Utf8.parse(word);
    var encrypted = CryptoJS.AES.encrypt(word, key, {
		iv:iv,
		mode:CryptoJS.mode.CBC,
		padding: CryptoJS.pad.Pkcs7});
    return encrypted.toString();
}
 
//解密  
export function aes_decrypt(word){  
    keyStr = keyStr ? keyStr : 'hfhfuu8dolv98bt6';
    var key  = CryptoJS.enc.Utf8.parse(keyStr);//
	var iv   = CryptoJS.enc.Utf8.parse(ivStr);
	// const restoreBase64 = word.replace(/\-/g,'+').replace(/_/g,'/');
	var restoreBase64=word.replace(/[\r\n]/g,'');
 
    var decrypt = CryptoJS.AES.decrypt(restoreBase64, key, {
		iv:iv,
		mode:CryptoJS.mode.CBC,
		padding: CryptoJS.pad.Pkcs7});
		console.log("解密",CryptoJS.enc.Utf8.stringify(decrypt).toString());
    return CryptoJS.enc.Utf8.stringify(decrypt).toString();
}