<template>
		<Container>
			<v-expansion-panels v-model="panel" multiple>
				<v-expansion-panel class="transparent-bg">
					<v-expansion-panel-title expand-icon="mdi-menu-down">
						网站推荐
					</v-expansion-panel-title>
					<v-expansion-panel-text>
						<div class="hrefs">
							<Href class="href" v-for="web in webs"
							v-bind="web" :icon="web.icon ? web.icon : web.url+'/favicon.ico'"></Href>
						</div>
					</v-expansion-panel-text>
				</v-expansion-panel>

				<v-expansion-panel class="transparent-bg">
					<v-expansion-panel-title expand-icon="mdi-menu-down">
						每日诗词
					</v-expansion-panel-title>
					<v-expansion-panel-text>
						<div class="poetry-container">
							<p class="poetry-content">{{poetry.content}}</p>
							<p class="poetry-title">《{{poetry.origin}}》 {{poetry.author}}</p>
						</div>
						<v-btn @click="updatePoetry" style="margin-top: 5px;">换一首</v-btn>
					</v-expansion-panel-text>
				</v-expansion-panel>

				<v-expansion-panel class="transparent-bg">
					<v-expansion-panel-title expand-icon="mdi-menu-down">
						来张cat
					</v-expansion-panel-title>
					<v-expansion-panel-text>
						<CatBoard />
					</v-expansion-panel-text>
				</v-expansion-panel>

				<v-expansion-panel class="transparent-bg">
					<v-expansion-panel-title expand-icon="mdi-menu-down">
						?
					</v-expansion-panel-title>
					<v-expansion-panel-text>
						<v-btn @click="startGame">当你点击这个按钮时，一切都变了</v-btn>
					</v-expansion-panel-text>
				</v-expansion-panel>
			</v-expansion-panels>

		</Container>
	</template>

	<script setup>
		import { ref, onMounted } from 'vue';
		import Container from '../components/Container.vue'
		import Href from '../components/Href.vue'
		import CatBoard from '../components/CatBoard.vue'
		import { poetry, updatePoetry } from '../js/api';
	  import {showSnackbar} from "@/js/userDialog.js";

		// 推荐
		const webs = [
			{title: "哔哩哔哩", url: "https://www.bilibili.com", desc: "B站大学"},
	    {title: "GitHub", url: "https://github.com", desc: "面向cv编程", icon: "/github.png"},
	    {title: "印象笔记", url: "https://flowus.cn", desc: "记笔记的网站，很方便", icon: "https://cdn2.flowus.cn/fe-web-app-images/favicon.png"},
	    {title: "智慧树", url: "https://www.zhihuishu.com", desc: "进来考试"},
	    {title: "深度睡觉", url: "https://www.deepseek.com", desc: "梁圣的恩情还不完"},
	    {title: "百炼", url: "https://bailian.console.aliyun.com", desc: "进来用大模型", icon: "/ali.svg"},
	    {title: "KimiAI", url: "https://kimi.moonshot.cn", desc: "简洁优秀的AI网站", icon: "https://statics.moonshot.cn/kimi-chat/favicon.ico"},
	    {title: "Qwen", url: "https://chat.qwen.ai", desc: "阿里旗下的AI", icon: "https://assets.alicdn.com/g/qwenweb/qwen-webui-fe/0.0.168/favicon.png"},
	    {title: "zread", url: "https://zread.ai", desc: "AI分析你的项目"},
		]
		const panel = ref([0, 1, 2]);

	  const startGame = () => {
	    var s = document.createElement('script');
	    s.type='text/javascript';
	    document.body.appendChild(s);
	    s.src='//hi.kickassapp.com/kickass.js';
	    showSnackbar("按WASD移动，空格攻击。网站很贵，下手轻点")
	  }

		// 在组件挂载时获取新诗词
		onMounted(() => {
			// 如果诗词对象为空或没有内容，则获取新诗词
			if (!poetry.value || !poetry.value.content) {
				updatePoetry();
			}
		});

	</script>

	<style>
	.hrefs {
	  display: flex;
	  flex-wrap: wrap;
	  /* justify-content: center; */

	}
	.href {
		/* margin- */
		margin: 18px;
		margin-top: 0px;
	}

	.transparent-bg {
	  background-color: rgba(255, 255, 255, 0.5) !important; /* 半透明背景色 */
	}

	.poetry-container {
	  background-image: linear-gradient(#f0e6d2, #d2c7a8); /* 渐变色背景 */
	  padding: 20px;
	  font-family: 'Times New Roman', serif;
	}


	.poetry-title {
	  text-align: right;
	  font-size: 18px;
	  margin-bottom: 10px;
	}

	/* .poetry-author {
	  text-align: right;
	  font-size: 18px;
	} */

	.poetry-content {
	  /* text-align: center; */
	  font-size: 20px;
	  line-height: 1.6;
	}
	</style>
