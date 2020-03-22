<template>
  <div style="display: inline;">
    <el-cascader
      size="small"
      v-model="cascaderValueDatexl"
      placeholder="项目年份"
      :options="projectOptionsDate"
      @change="handleChangexl"
      style="margin-right: 10px"
    ></el-cascader>
    <el-select v-model="cascaderValueproxl"
               placeholder="项目批次"
               style="width: 400px;margin-right: 10px"
               size="small">
      <el-option
        v-for="item in projectOptionsRootxl"
        :key="item.id"
        :label="item.label"
        :value="item.id">
      </el-option>
    </el-select>
  </div>
  <div style="display: inline;">
    <el-button type="info" size="small" @click="seeData">查阅</el-button>
  </div>
  <el-table
    borderd
    :data="tableData"
    style="width: 100%">
    <el-table-column type="expand">
      <template slot-scope="props">
        <el-form label-position="left" inline class="demo-table-expand">
          <el-form-item label="商品名称">
            <span>{{ props.row.name }}</span>
          </el-form-item>
          <el-form-item label="所属店铺">
            <span>{{ props.row.shop }}</span>
          </el-form-item>
          <el-form-item label="商品 ID">
            <span>{{ props.row.id }}</span>
          </el-form-item>
          <el-form-item label="店铺 ID">
            <span>{{ props.row.shopId }}</span>
          </el-form-item>
          <el-form-item label="商品分类">
            <span>{{ props.row.category }}</span>
          </el-form-item>
          <el-form-item label="店铺地址">
            <span>{{ props.row.address }}</span>
          </el-form-item>
          <el-form-item label="商品描述">
            <span>{{ props.row.desc }}</span>
          </el-form-item>
        </el-form>
      </template>
    </el-table-column>
    <el-table-column
      v-for="item in tableColumnData"
      :label="item.label"
      :prop="item.prop">
    </el-table-column>
  </el-table>
  <el-pagination
    background
    layout="prev, pager, next"
    :total="totalquerys"
    page-size="50">
  </el-pagination>
</template>

<script>
  export default {
    name: 'xl_data'
  }
</script>

<style scoped>

</style>
