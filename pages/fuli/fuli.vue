<template>
	<view class="colonn center_center">
		<image
		 mode="widthFix" class="w-750"
		 v-if="yubaominghuacn.exhType==1" :src="yubaominghuacn.cover"
		></image>
		<rich-text v-else
		:nodes="yubaominghuacn.invitationRules"></rich-text>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				yubaominghuacn:{}
			}
		},
		onLoad() {
			var yubaominghuacn = uni.getStorageSync('yubaominghuacn');
			if(yubaominghuacn){
				this.yubaominghuacn=yubaominghuacn;
				setTimeout(res=>{
					this.yubaominghuacn = uni.getStorageSync('yubaominghuacn');
				},1000)
			}
		},
		methods: {
			
		}
	}
</script>

<style>
@import url(fuli.css);
</style>
