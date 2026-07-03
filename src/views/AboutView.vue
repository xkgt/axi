<template>
	<Container>
		<v-sheet color="#ffffff7f" rounded="lg">
			<div class="about">
				<h1>关于本项目</h1>
				<p><strong>作者：</strong>KGG_XK</p>
				<p><strong>QQ：</strong>1838926478</p>
				<p><strong>哔哩哔哩：</strong><a href="https://space.bilibili.com/349780481" target="_blank">点击访问</a></p>
        <br>
				<p><strong>技术栈：</strong></p>
				<p>前端：Vue + Vuetify</p>
				<p>后端：Python + FastAPI</p>
			</div>
		</v-sheet>
	</Container>
</template>

<script setup>
	import Container from '../components/Container.vue'
</script>

<style>
	.about {
		display: flex;
		flex-direction: column;
		height: 600px;
		align-items: center;
		justify-content: center;
		text-align: center;
		padding: 20px; /* 新增内边距 */
		font-family: 'Arial', sans-serif; /* 新增字体 */
		line-height: 1.6; /* 新增行高 */
		color: #333; /* 修改文字颜色 */
	}

	h1 {
		font-size: 2rem;
		margin-bottom: 20px;
		color: #444;
		text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1); /* 新增阴影效果 */
	}
</style>