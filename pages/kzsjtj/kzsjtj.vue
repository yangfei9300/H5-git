<template>
	<view>
		<image class="w-750 h-400" src="https://frd-yhc.oss-cn-hangzhou.aliyuncs.com/2023/3/15/8b9e487f41c14934977ea5f3088437f0.jpg"></image>
		<view class="colonn" style="padding:20rpx;">
			<view>下一届展会举办时间，您更倾向于?</view>
			<view class="roww center_center w-750" style="padding:25rpx 25rpx 0rpx 0rpx;"
			@click="selClick(1)"
			>
				<image 
				:src="selIndex==1?img[1]:img[0]" class="w-40 h-40"></image>
				<view class="w-20"></view>
				<view>3月</view>
				<view class="allline"></view>
			</view>
			<view class="roww center_center w-750" style="padding:25rpx 25rpx 0rpx 0rpx;"
			
			@click="selClick(2)">
				<image :src="selIndex==2?img[1]:img[0]" class="w-40 h-40"></image>
				<view class="w-20"></view>
				<view>7月</view>
				<view class="allline"></view>
			</view>
			<view class="roww center_center  w-750" style="padding:25rpx 25rpx 25rpx 0rpx;"
			@click="selClick(3)"
			>
				<image :src="selIndex==3?img[1]:img[0]"  class="w-40 h-40"></image>
				<view class="w-20"></view>
				<view>10月</view>
				<view class="allline"></view>
			</view>
			<view class="h-100"></view>
			<view class="colonn center_center">
				<view class="btnsub" @click.stop="submit">确认提交</view>
				<view>{{kzsj?'您已提交过问卷，请勿重复提交':""}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				selIndex:-1,
				img:['/static/xuanzhongno.png','/static/xuanzhongsel.png'],
				kzsj:null
			}
		},
		onLoad() {
		     var selIndex=uni.getStorageSync("kzsj");
			 if(selIndex){
				 this.selIndex=selIndex;
				 this.kzsj=selIndex;
			 }
		},
		methods: {
			selClick(index){
				this.selIndex=index;
			},
			submit(){
				if(this.selIndex<0){
					this.$tools.showToast("请先选择月份")
					return false;
				}
				
				var selIndex=uni.getStorageSync("kzsj");
				if(selIndex){
					this.$tools.showToast("您已提交过，请勿重复提交")
					return false;
				}
				 var data = {
				 	
				 }
				 this.$axios
				 	.axios('GET', this.$paths.afterans+this.selIndex, data)
				 	.then(res => {
				 		if (res.code == 200) {
				 			this.$tools.showToast("提交成功");
							uni.setStorageSync("kzsj",this.selIndex  );
							 this.kzsj=this.selIndex;
				 		} else {
				 			this.$tools.showToast(res.msg);
				 		}
				 	})
				 	.catch(err => {});
			},
		}
	}
</script>

<style>
.btnsub{
	width: 700rpx;
	height: 80rpx;
	background-color: dodgerblue;
	text-align: center;
	line-height: 80rpx;
	color: white;
}
</style>
