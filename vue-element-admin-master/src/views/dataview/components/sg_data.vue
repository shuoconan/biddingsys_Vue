<template>
  <div>
  <div style="display: inline;">
    <el-cascader
      size="small"
      v-model="cascaderValueDatesg"
      placeholder="项目年份"
      :options="projectOptionsDate"
      @change="handleChangesg"
      style="margin-right: 10px"
    ></el-cascader>
    <el-select v-model="cascaderValueprosg"
               placeholder="项目批次"
               style="width: 400px;margin-right: 10px"
               size="small">
      <el-option
        v-for="item in projectOptionsRootsg"
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
    ref='table'
    height="600px"
    :data="tableDatasg"
    :row-style="TableRowClassName"
  >
    <el-table-column type="expand">
      <template slot-scope="props">
        <el-form label-position="left" inline class="demo-table-expand">
          <el-row>
            <el-col :span="8">
              <el-form-item label="分包名称">
                <span>{{ props.row.fb_name }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="分包编号">
                <span>{{ props.row.fb }}</span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="包名称">
                <span>{{ props.row.pname }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="包号">
                <span>{{ props.row.pnum }}</span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="建设地点">
                <span>{{ props.row.proj_location }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="招标范围">
                <span>{{ props.row.bid_range }}</span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="计划开工日期">
                <span>{{ props.row.plan_date }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="标段工期">
                <span>{{ props.row.bid_days }} 天</span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20">
              <el-form-item label="企业资质条件">
                <span>{{ props.row.bid_certificate_rules }}</span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20">
              <el-form-item label="主要人员要求">
                <span>{{ props.row.people_rules }}</span>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </template>
    </el-table-column>
    <el-table-column
      type="index"
      :index="indexMethodsg"
      label="序号"
      width="50px">
    </el-table-column>
    <el-table-column
      prop="fb"
      label="分标号"
      width="80px">
    </el-table-column>
    <el-table-column
      prop="fb_name"
      label="分包名称"
      width="120px">
    </el-table-column>
    <el-table-column
      prop="pnum"
      label="包号"
      width="80px">
    </el-table-column>
    <el-table-column
      prop="pro_comp"
      label="项目单位"
      width="160px">
    </el-table-column>
    <el-table-column
      prop="pname"
      label="包名称">
    </el-table-column>
    <el-table-column
      prop="vol_level"
      label="电压等级"
      width="100px">
    </el-table-column>
    <el-table-column
      prop="bid_price"
      label="招标金额"
      width="100px">
      <template slot-scope="scope">
        <span>{{ scope.row.bid_price | moneyConvert}}</span>
      </template>
    </el-table-column>

    <el-table-column
      prop="max_price"
      label="最高限价"
      width="100px">
      <template slot-scope="scope">
        <span>{{ scope.row.max_price | moneyConvert}}</span>
      </template>
    </el-table-column>
    <el-table-column
      fixed="right"
      style="margin-right: 20px"
      label="操作"
      width="100px"
      >
      <template slot-scope="scope">
        <div v-if="scope.row.bid_flag === 'yes'">
          <el-button  @click="handleOpenBidsg(scope.row)" type="text" size="small">查看开标记录</el-button>
        </div>
        <span v-if="scope.row.bid_flag === 'nr'">无记录</span>
        <span v-if="scope.row.bid_flag === 'lb'">流标</span>
      </template>
    </el-table-column>
  </el-table>
  <el-pagination
    background
    :hide-on-single-page="hide_page_value"
    :current-page="currentpagesg"
    layout="prev, pager, next"
    :total="totalquerys"
    @current-change="currentpagechangesg"
    page-size="50"
    style="position: fixed;bottom: 0px">
  </el-pagination>
  <data_dialog_sg ref="dialog_table_sg"></data_dialog_sg>
  </div>
</template>

<script>
  import { getRootData, getTableData, getTableColumn, getOpenData } from '../../../api/data'
  import data_dialog_sg from './data_dialog_sg'
  export default {
    name: 'sg_data',
    components: {
      data_dialog_sg
    },
    data() {
      return {
        projectOptionsDate: [
          {
            value: 'all',
            label: '全部年份'
          }, {
            value: '2019',
            label: '2019年'
          }, {
            value: '2020',
            label: '2020年'
          }, {
            value: '2021',
            label: '2021年'
          }, {
            value: '2022',
            label: '2022年'
          }
        ],
        tableDatasg: [],
        projectOptionsRootsg:[],
        cascaderValueDatesg: ['all'],
        cascaderValueprosg: ['0'],
        hide_page_value: 'true',
        currentpagesg: '1',
        dialogTableVisibleSg:false,
        totalquerys: 0,
        cascaderValue: ['wholeItem'],
      }
    },
    methods: {
      handleChangesg() {
        let data = {
          cascaderValueDate: this.cascaderValueDatesg,
          cascaderValue: 'sgpro'
        }
        console.log(data)
        getRootData(data).then(response => {
          this.projectOptionsRootsg = response.data
        }).then(response => {
          getTableColumn(data).then(response => {
            this.tableColumnData = response.data
          })
        })
      },
      seeData() {
        const requestData = {
          data_id: this.cascaderValueprosg,
          data_page: 1
        }
        getTableData(requestData).then(response => {
          let data =  response.data
          this.totalquerys = data['count']
          this.tableDatasg = data['biddata']
        })
        console.log(this.tableDatasg)
      },
      currentpagechangesg(val){
        this.currentpagesg = val
        const requestData = {
          data_id: this.cascaderValueprosg,
          data_page: val
        }
        getTableData(requestData).then(response => {
          let data =  response.data
          this.totalquerys = data['count']
          this.tableDatasg = data['biddata']
        })
        this.$nextTick(() => {
          this.$refs.table.bodyWrapper.scrollTop = 0
        })
      },
      indexMethodsg (index) {
        let curpage = this.currentpagesg   //单前页码，具体看组件取值
        let limitpage = 50    //每页条数，具体是组件取值
        return (index+1) + (curpage-1)*limitpage
      },
      handleOpenBidsg(data) {
        var _this = this
        console.log(data.id)
        let datas = {
          data_id: data.id
        }
        getOpenData(datas).then(response =>{
          let data = response.data
          console.log(data['form1'])
          _this.$refs.dialog_table_sg.form1 = data['form1']
          _this.$refs.dialog_table_sg.form2 = data['form2']
          _this.$refs.dialog_table_sg.gridDatasg = data['gridDatasg']
        }).then(()=>{
          _this.$refs.dialog_table_sg.dialogTableVisible = true
        })

      },
      TableRowClassName({row, rowIndex}) {
        console.log(rowIndex)
        console.log(row.bid_flag)
        if (row['bid_flag'] === 'lb') {
          return {
            background: 'oldlace'
        }
        }
        if (row['bid_flag'] === 'yes') {
          return {
            background: '#f0f9eb'
        }
        }
        return {}
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
