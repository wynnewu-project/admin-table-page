<template>
	<div class="button-tool">
		<div class="button-tool-custom">
			<template
				v-for="{
					type = 'primary',
					label,
					onClick,
					hidden,
					disabledWhenNoSelect,
					disabled,
					...btn
				} in buttons"
				:key="label"
			>
				<el-button
					v-if="!hidden"
					:type="type"
					@click="onClick"
					:disabled="
						disabledWhenNoSelect && isMultipleSelected && !hasSelected
							? true
							: disabled
					"
					v-bind="btn"
				>
					{{ label }}
				</el-button>
			</template>
		</div>
		<div class="button-tool-default">
			<slot name="right_tools" />
			<template v-if="refresh">
				<el-divider
					direction="vertical"
					v-if="enableRightTools"
				/>
				<el-button-group>
					<el-tooltip
						:content="translate?.('button.refresh')"
						v-if="refresh === 'manual'"
						placement="top"
					>
						<el-button
							:icon="RefreshRight"
							@click="handleManualRefresh"
						/>
					</el-tooltip>
					<template v-if="typeof refresh === 'number'">
						<el-tooltip
							:content="translate?.('button.autoRefresh')"
							placement="top"
							v-if="paused"
						>
							<el-button
								:icon="Refresh"
								@click="handleAutoRefresh"
							/>
						</el-tooltip>
						<el-tooltip
							:content="translate?.('button.pauseRefresh')"
							placement="top"
							v-else
						>
							<el-button
								:icon="VideoPause"
								@click="handlePauseAutoRefresh"
							/>
						</el-tooltip>
					</template>
				</el-button-group>
			</template>
		</div>
	</div>
</template>

<script setup lang="ts">
import type { ToolButton } from "@/type/table";
import { VideoPause, Refresh, RefreshRight } from "@element-plus/icons-vue";
import { inject, ref } from "vue";
import type { ComposerTranslation } from "vue-i18n";

defineProps<{
	buttons: ToolButton[];
	refresh?: string | number;
	enableRightTools?: boolean;
	hasSelected?: boolean;
	isMultipleSelected?: boolean;
}>();

const emits = defineEmits(["manualRefresh", "autoRefresh", "pauseAutoRefresh"]);

const translate = inject<ComposerTranslation>("translate");

const paused = ref(false);

const handleManualRefresh = () => {
	emits("manualRefresh");
};

const handleAutoRefresh = () => {
	paused.value = false;
	emits("autoRefresh");
};

const handlePauseAutoRefresh = () => {
	paused.value = true;
	emits("pauseAutoRefresh");
};
</script>

<style lang="scss">
@use "../../style/atp-table-tool.scss";
</style>
