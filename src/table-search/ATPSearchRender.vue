<template>
	<el-col
		v-bind="colBreakpoint"
		v-for="{ name, type, label, ...field } in searchFields"
		:key="name"
	>
		<el-form-item
			:label="label"
			:prop="name"
		>
			<atp-search-item
				v-model="query![name]"
				:type="type"
				v-bind="field"
			/>
		</el-form-item>
	</el-col>
</template>

<script setup lang="ts">
import { inject, type Ref } from "vue";
import AtpSearchItem from "./ATPSearchItem.vue";
import type { Breakpoint } from "@/type/media";
import type { SearchField } from "@/type/table";

withDefaults(
	defineProps<{
		colBreakpoint?: Record<Breakpoint, number>;
		searchFields?: SearchField[];
	}>(),
	{
		searchFields: () => [],
	},
);

const query = inject<Ref<Record<PropertyKey, unknown>>>("query");
</script>
