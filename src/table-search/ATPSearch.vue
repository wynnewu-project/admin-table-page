<template>
	<el-card style="margin-bottom: 8px">
		<el-form
			ref="formRef"
			label-suffix=":"
			:model="query"
			:label-position="breakpoint === 'xs' ? 'top' : 'right'"
		>
			<el-row :gutter="24">
				<atp-search-render
					:search-fields="showFields"
					:col-breakpoint="colBp"
				/>
				<template v-if="showHidden && hiddenFields.length">
					<atp-search-render
						:search-fields="hiddenFields"
						:col-breakpoint="colBp"
					/>
				</template>
				<el-col
					:span="buttonColSpan"
					style="overflow: hidden"
				>
					<div style="float: right">
						<el-button @click="handleResetSearch">
							{{ translate?.("button.reset") }}
						</el-button>
						<template v-if="hiddenFields.length">
							<el-button
								link
								type="primary"
								v-if="showHidden"
								@click="showHidden = false"
							>
								{{ translate?.("button.collapse") }}
								<el-icon><arrow-up /></el-icon>
							</el-button>
							<el-button
								link
								type="primary"
								v-else
								@click="showHidden = true"
							>
								{{ translate?.("button.expand") }}
								<el-icon><arrow-down /></el-icon>
							</el-button>
						</template>
					</div>
				</el-col>
			</el-row>
		</el-form>
	</el-card>
</template>

<script setup lang="ts">
import type { SearchField } from "@/type/table";
import AtpSearchRender from "./ATPSearchRender.vue";
import { ArrowUp, ArrowDown } from "@element-plus/icons-vue";

import { computed, inject, ref, useTemplateRef, type Ref } from "vue";
import type { ComposerTranslation } from "vue-i18n";
import type { Breakpoint } from "@/type/media";

const props = withDefaults(
	defineProps<{
		showFields?: SearchField[];
		hiddenFields?: SearchField[];
	}>(),
	{
		showFields: () => [],
		hiddenFields: () => [],
	},
);

const colBp: Record<Breakpoint, number> = {
	xs: 24,
	sm: 12,
	md: 8,
	lg: 6,
	xl: 6,
};

const translate = inject<ComposerTranslation>("translate");

const formRef = useTemplateRef("formRef");

const breakpoint = inject<Ref<Breakpoint>>("breakpoint");
const query = inject<Ref<Record<PropertyKey, unknown>>>("query");
const showHidden = ref(false);

const buttonColSpan = computed(() => {
	const bp: Breakpoint = breakpoint?.value ?? "xl";
	const colWidth = colBp[bp];
	const perRow = 24 / colWidth;
	let fieldCnt = props.showFields.length;
	if (showHidden.value) {
		fieldCnt += props.hiddenFields.length;
	}
	return 24 - (fieldCnt % perRow) * colWidth;
});

const handleResetSearch = () => {
	if (!formRef.value) return;
	formRef.value.resetFields();
};
</script>
