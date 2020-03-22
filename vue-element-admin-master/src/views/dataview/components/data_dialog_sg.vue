<template>
  <el-dialog title="开标记录" :visible.sync="dialogTableVisible">
    <el-form
      :model="form1"
      size="small">
      <el-row>
        <el-col :span="6">
          <el-form-item label="分标编号"
                        :label-width="formLabelWidth">
            <span>{{ form1.fb }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="18">
          <el-form-item label="分标名称" :label-width="formLabelWidth">
            <span>{{ form1.fb_name }}</span>
          </el-form-item>
        </el-col>
        <el-row>
          <el-col :span="6">
            <el-form-item label="最高限价" :label-width="formLabelWidth">
              <span>{{ form1.max_price | moneyConvert}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="招标金额" :label-width="formLabelWidth">
              <span>{{ form1.bid_price | moneyConvert }}</span>
            </el-form-item>
          </el-col>
        </el-row>
      </el-row>
      <el-row>
        <el-col :span="6">
          <el-form-item label="包号" :label-width="formLabelWidth">
            <span>{{ form1.pnum }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="18">
          <el-form-item label="包名称" :label-width="formLabelWidth">
            <span>{{ form1.pname}}</span>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-form :model="form2">
      <el-row>
        <el-col :span="6">
          <el-form-item label="开标时间" :label-width="formLabelWidth">
            <span>{{ form2.opentime }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="18">
          <el-form-item label="开标时间" :label-width="formLabelWidth">
            <span>{{ form2.openlocation }}</span>
          </el-form-item>
        </el-col>
      </el-row>

    </el-form>
    <el-table
      :data="gridDatasg"
      height="300">
      <el-table-column type="index" label="序号" width="50"></el-table-column>
      <el-table-column property="company" label="投标厂家" width="400"></el-table-column>
      <el-table-column property="bid_price" label="投标金额(万元)">
      </el-table-column>
    </el-table>
  </el-dialog>
</template>

<script>
  export default {
    props: [
      'dialogTableVisibleSg',
      'gridDatasg'
    ],
    data() {
      return {
        formLabelWidth:50,
        dialogTableVisible: this.dialogTableVisibleSg,
        form1: {},
        form2: {},
        gridDatasg: []
      }
    },
    watch: {
      dialogTableVisibleSg: {
        handler(newValue) {
          console.log(newValue)
        }
      }
    },
    methods: {
      openDialog() {
        this.dialogTableVisible = true
      }
    },
    filters: {
      moneyConvert(value) {
        var result = ''
        while (value.length > 3) {
          result = ',' + value.slice(-3) + result;
          value = value.slice(0, value.length - 3);
        }
        if (value) { result = value + result; }
        return result
      }
    }
  }
</script>

<style scoped>

</style>
