<template>
	<v-btn height="70" width="170" @click="goToUrl()">
		<div>
			<div class="icon">
				<v-img width="30" height="30" max-height="30" aspect-ratio="1/1" :src="props.icon"></v-img>
				<p class="title">{{props.title}}</p>
			</div>
			<div>
				<p class="desc">{{props.desc}}</p>
			</div>
		</div>
	</v-btn>
</template>

<script setup>
	const props = defineProps(["title", "desc", "url", "icon"])
	
	const goToUrl = (url) => {
		window.open(props.url, '_blank');
	}
</script>

<style>
	.icon {
	  display: flex;
	  align-items: center;
	}
	.title {
		margin: 5px;
	}
	.no-warp {
		white-space: nowrap;
	}
	.desc {
		white-space: normal; /* 确保文本会换行 */
		color: gray; /* 设置文本颜色为灰色 */
		font-size: 12px;
	}
</style>