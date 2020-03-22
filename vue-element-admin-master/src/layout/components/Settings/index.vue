<template>
  <div class="drawer-container">
    <div>
      <h3 class="drawer-title">任务进度查看</h3>
      <div v-if="task_item.length === 0">
        暂无任务
      </div>
      <div v-else>
        <div v-for="item in task_item">
          <span>{{ item.filename }}</span>
          <el-progress :percentage="item.percent"></el-progress>
          <el-divider></el-divider>
        </div>
      </div>
      </div>
  </div>
</template>

<script>
import { getFileUploadStatus } from '../../../api/file'
export default {
  data() {
    return {
      task_item:[]
    }
  },
  computed: {

  },
  methods: {

  },
  mounted() {
    setInterval(()=>{
      getFileUploadStatus().then(response => {
        let data = response.data
        this.task_item = data
      })
    }, 10000)
  }
}
</script>

<style lang="scss" scoped>
.drawer-container {
  padding: 5px;
  font-size: 14px;
  line-height: 1.5;
  word-wrap: break-word;

  .drawer-title {
    margin-bottom: 12px;
    color: rgba(0, 0, 0, .85);
    font-size: 14px;
    line-height: 22px;
  }

  .drawer-item {
    color: rgba(0, 0, 0, .65);
    font-size: 14px;
    padding: 5px 0;
  }

  .drawer-switch {
    float: right
  }
}
</style>
