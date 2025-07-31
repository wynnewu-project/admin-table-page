<template>
	<el-container style="height: 100%">
		<el-main style="padding: 0">
			<el-scrollbar height="calc(100vh - 132px)">
				<h1 class="page-title">{{ title }}</h1>
				<slot />
			</el-scrollbar>
		</el-main>
		<el-aside
			width="200px"
			style="padding: 0 16px"
			v-if="links && links.length"
		>
			<h1>CONTENTS</h1>
			<ul style="list-style: none; padding: 0; font-size: 0.7em; gap: 16px">
				<li
					v-for="link in links"
					:key="link"
					style="margin-top: 10px"
				>
					<el-link
						:type="route.hash === `#${link}` ? 'primary' : 'default'"
						:href="`#${link}`"
						>{{ link }}</el-link
					>
				</li>
			</ul>
		</el-aside>
	</el-container>
</template>
<script setup lang="ts">
import { act } from "react";
import { watch } from "vue";
import { useRoute } from "vue-router";

defineProps<{
	links?: string[];
	title: string;
}>();
const route = useRoute();
console.log(route);
watch(route, (newRoute) => {
	console.log("Route changed:", newRoute);
});
</script>
