<template> 
  <div class="button-tool"> 
    <div class="button-tool-custom">
      <el-button 
        v-for="{ text, onClick, ...btn} in buttons"
        :key="text"
        type="primary"
        @click="onClick"
        v-bind="btn"
      >{{ text }}</el-button>
    </div>
    <div class="button-tool-default">
      <template v-if="refresh">
        <el-button-group>
          <el-tooltip :content="t('button.refresh')" v-if="refresh === 'manual'" placement="top" >
            <el-button :icon="RefreshRight" @click="handleManualRefresh"/>
          </el-tooltip>
          <template v-if="typeof(refresh) === 'number'">
            <el-tooltip :content="t('button.autoRefresh')" placement="top" v-if="paused">
              <el-button :icon="Refresh" @click="handleAutoRefresh"/> 
            </el-tooltip>
            <el-tooltip :content="t('button.pauseRefresh')" placement="top" v-else>
              <el-button :icon="VideoPause" @click="handlePauseAutoRefresh"/> 
            </el-tooltip>
          </template>
        </el-button-group>
      </template>
    </div>
  </div>
</template>

<script setup> 
import { VideoPause, Refresh, RefreshRight } from "@element-plus/icons-vue";

import { inject, ref } from "vue";

defineProps({
  buttons: {
    type: Array,
    default: []
  },
  refresh: {
    type: [ String, Number ],
    default: ""
  }
})


const emits = defineEmits([
  "manualRefresh",
  "autoRefresh",
  "pauseAutoRefresh"
])

const t = inject("translate");

const paused = ref(false);

const handleManualRefresh = () => {
  emits("manualRefresh");
}

const handleAutoRefresh = () => {
  paused.value = false;
  emits("autoRefresh");
}

const handlePauseAutoRefresh = () => {
  paused.value = true;
  emits("pauseAutoRefresh");
}

</script>

<style lang="scss">
@use "../../style/atp-table-tool.scss";
</style>
