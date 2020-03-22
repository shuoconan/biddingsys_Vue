<template>
  <div>
    <el-tabs v-model="activeName"
             @tab-click="handleClick"
             style="margin-left: 10px"
    >
      <el-tab-pane label="国网项目" name="sgpro">
        <sg_data></sg_data>
      </el-tab-pane>
      <el-tab-pane label="兴力项目" name="xlpro">

      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
  import sg_data from './components/sg_data'
  export default {
    name: 'index',
    components: {
      sg_data
    },
    data() {
      return {
        tableColumnData:[],
        tableColumnExpandData:[],
        projectOptionsRootxl:[],
        cascaderValueDatexl: ['all'],
        cascaderValueproxl: ['0'],
        activeName:'',
      }
    },
    methods: {
      handleClick() {
        console.log(this.activeName)
      },
      handleChangexl() {
        let data = {
          cascaderValueDate: this.cascaderValueDatexl,
          cascaderValue: this.activeName
        }
        getRootData(data).then(response => {
          this.projectOptionsRootxl = response.data
        }).then(response => {
          getTableColumn(data).then(response => {
            this.tableColumnData = response.data
            console.log(response.data)
          })
        })
      },


    }
  }
</script>

<style scoped>

</style>
