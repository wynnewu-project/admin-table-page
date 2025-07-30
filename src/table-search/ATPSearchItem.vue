<template>
	<el-select
		v-if="type === 'select'"
		clearable
		style="width: 100%"
		:placeholder="translate?.('placeholder.select')"
	>
		<el-option
			v-for="option in selectOptions"
			:key="option.value"
			:value="option.value"
			:label="option.label"
		/>
	</el-select>
	<el-date-picker
		v-else-if="type === 'date'"
		value-format="YYYY-MM-DD"
		style="width: 100%"
	/>
	<el-input
		v-else
		clearable
	/>
</template>

<script setup lang="ts">
import type { ColumnSearchConfig } from "@/type/table";
import { computed, inject } from "vue";
import type { ComposerTranslation } from "vue-i18n";

const props = withDefaults(
	defineProps<{
		type: string;
		label?: string;
		selectOptions?: ColumnSearchConfig["selectOptions"];
	}>(),
	{
		type: "input",
		selectOptions: () => [],
	},
);

const translate = inject<ComposerTranslation>("translate");

const selectOptions = computed(() =>
	props.selectOptions.map((op) => {
		if (typeof op === "string" || typeof op === "number") {
			return { value: op, label: String(op) };
		}
		return op;
	}),
);
</script>
