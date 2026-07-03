<template>
	<v-app id="inspire" class="bg-image">
		<v-app-bar class="px-3 transparent-bg" density="compact" flat>
			<v-app-bar-title>KGG的个人主页</v-app-bar-title>
			<v-tabs color="grey-darken-2" centered>
				<v-tab v-for="link in links" :key="link.text" :text="link.text" :to="link.url"></v-tab>
			</v-tabs>
			<v-spacer></v-spacer>
			<v-avatar
				color="grey-darken-1" size="32"
				v-if="!user"
				@click="openLoginDialog"
			>
				<span class="white--text" style="font-size: 0.6rem">?</span>
			</v-avatar>
			<v-menu v-else v-model="menu" :close-on-content-click="false" location="bottom" open-on-hover>
				<template v-slot:activator="{ props }">
					<v-avatar v-bind="props" color="grey-darken-1" size="32">
						<v-img v-if="userAvatar" :src="userAvatar" alt="err" />
						<span v-else class="white--text" style="font-size: 0.6rem">我很<br/>神秘</span>
					</v-avatar>
				</template>
				<UserMe></UserMe>
			</v-menu>
		</v-app-bar>

		<v-main class="bg-grey-lighten-3 transparent-bg">
			<v-expand-transition>
				<router-view></router-view>
			</v-expand-transition>
		</v-main>

		<LoginModal></LoginModal>
		<RegisterModal></RegisterModal>
		<ForgetModal></ForgetModal>
		<ChangeAvatarModal></ChangeAvatarModal>
	</v-app>
	<v-snackbar v-model="snackbar" :timeout="snackbarTimeout" color="success">
		{{ snackbarMessage }}
	</v-snackbar>
</template>

<script setup>
	import { onMounted, computed, ref } from 'vue';
	import { useRoute } from 'vue-router';
	import LoginModal from "./modals/LoginModal.vue"
	import RegisterModal from "./modals/RegisterModal.vue"
	import ForgetModal from "./modals/ForgetModal.vue"
	import ChangeAvatarModal from "@/modals/ChangeAvatarModal.vue";
	import {openLoginDialog, snackbar, snackbarMessage, snackbarTimeout} from "./js/userDialog.js";
	import {user, fetchUserInfo} from "./js/api.js";
	import UserMe from "@/components/UserMe.vue";

	const menu = ref(false);

	const route = useRoute()
	const isAdminPage = computed(() => route.path.startsWith('/admin'))

	const userLinks = [
		{'text':'主页', 'url': '/'},
		{'text':'站长日记', 'url': '/form'},
		{'text':'文章', 'url': '/article'},
		{'text':'游戏', 'url': '/game'},
		{'text':'关于', 'url': '/about'},
	]
	const adminLinks = [
		{'text':'仪表盘', 'url': '/admin'},
		{'text':'举报', 'url': '/admin/reports'},
		{'text':'弹幕管理', 'url': '/admin/barrages'},
		{'text':'论坛管理', 'url': '/admin/messages'},
		{'text':'人员管理', 'url': '/admin/users'},
	]
	const links = computed(() => isAdminPage.value ? adminLinks : userLinks)

	const userAvatar = computed(() => {
		return user.value && user.value.avatar ? user.value.avatar : '';
	});

	onMounted(async () => {
		await fetchUserInfo();
	});
</script>

<style scoped>
.bg-image{
  background-image: url('/bg.jpg');
  background-size: 100vw 100vh;
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed;
}
.transparent-bg {
  background-color: rgba(255, 255, 255, 0.5) !important;
}
</style>
