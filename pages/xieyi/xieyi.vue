<template>
	<view class="p-all-20">
		<block v-if="options.type==1">
			<rich-text :nodes="xieyis.agreement"></rich-text>
		</block>
		<block v-if="options.type==2">
			<rich-text :nodes="xieyis.policy"></rich-text>
		</block>
	</view>
</template>

<script>
	export default {
		data() {
			return { 
				xieyis:{},
				options:{},
			}
		},
		onLoad(options) {
				this.options=options;
				if(options.type==1){
					uni.setNavigationBarTitle({
						title:"用户服务协议"
					})
				}else if(options.type==2){
					uni.setNavigationBarTitle({
						title:"隐私政策"
					})
				}
			this.exhtypeminiapp();   
		},
		methods: {
			exhtypeminiapp(){
				var data={
					  "id":uni.getStorageSync("exType")
				} 
				this.$axios
					.axios('POSt', this.$paths.exhtypeminiapp, data)
					.then(res => {   
						if (res.code == 200) {
							this.xieyis=res.data;
							//解析富文本带图片问题
							this.xieyis.agreement=this.$tools.formatRichText(this.xieyis.agreement);
							this.xieyis.policy=this.$tools.formatRichText(this.xieyis.policy);
							
						} else {
							this.$tools.showToast(res.msg);
						}
					})
					.catch(err => {
						console.log("baossd",err)
					});
			},
		}
	}
</script>

<style>
@import url(xieyi.css);
</style>
