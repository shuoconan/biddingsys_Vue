<template>
<div>
    <sticky :class-name="'sub-navbar'" >
      <el-cascader
        v-model="cascaderValue"
        size="small"
        placeholder="筛选单位"
        :options="options"
        @change="handleChange"></el-cascader>
        <el-button v-loading="loading" type="info" size="small" @click="addDialogFormVisible = true">新增</el-button>
        <el-button v-loading="loading" type="warning" size="small" @click="subEdit">编辑</el-button>
        <el-button v-loading="loading" type="danger" size="small"@click="subDel">删除</el-button>
    </sticky>
    <el-table
      ref="multipleTable"
      v-loading="loading"
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
      :align="tableAlign"
      :header-align = "headerAlign"
      @selection-change="handleSelectionChange">
      <el-table-column
        type="selection"
        width="50">
      </el-table-column>
      <el-table-column
        prop="companyRegions"
        label="地区"
        width="200"
        >
      </el-table-column>
      <el-table-column
        prop="companyName"
        label="公司名称"
        width="200">
      </el-table-column>
      <el-table-column
        prop="companyCode"
        label="公司代码"
        width="120">
      </el-table-column>
      <el-table-column
        prop="companyRole"
        label="联系人"
        width="80">
      </el-table-column>
      <el-table-column
        prop="roleMobile"
        label="联系人电话"
        width="120">
      </el-table-column>
      <el-table-column
        prop="companyFax"
        label="公司传真"
        width="120">
      </el-table-column>
      <el-table-column
        prop="companyAddress"
        label="公司地址"
        >
      </el-table-column>
    </el-table>
    <el-dialog title="新增单位" :visible.sync="addDialogFormVisible">
      <el-form :model="addForm">
        <el-form-item label="单位名称" :label-width="addFormLabelWidth">
          <el-input v-model="addForm.companyName" autocomplete="off" style="width: 100%"></el-input>
        </el-form-item>
        <el-row>
          <el-col span="12">
            <el-form-item label="单位类型" :label-width="addFormLabelWidth">
              <el-select v-model="addForm.companyOptionsSelectedValue" placeholder="请选择">
                <el-option
                  v-for="item in companyOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                  style="width: 100%"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col span="12">
            <el-form-item label="单位代码" :label-width="addFormLabelWidth">
              <el-input v-model="addForm.companyCode" autocomplete="off" style="width: 100%"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col span="12">
            <el-form-item label="单位地区" :label-width="addFormLabelWidth">
              <el-cascader
                ref="regionCascader"
                style="width: 100%"
                v-model="addForm.companyRegions"
                :options="regionValue"
                :props="{ expandTrigger: 'hover' }"
                @change="handleChange"
                :show-all-levels= "showAllLevels"
              ></el-cascader>
            </el-form-item>
          </el-col>
          <el-col span="12">
            <el-form-item label="单位传真" :label-width="addFormLabelWidth">
              <el-input v-model="addForm.companyFax" autocomplete="off" style="width: 100%"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col span="12">
            <el-form-item label="联系人" :label-width="addFormLabelWidth">
              <el-input v-model="addForm.companyRole" autocomplete="off" ></el-input>
            </el-form-item>
          </el-col>
          <el-col span="12">
            <el-form-item label="联系电话" :label-width="addFormLabelWidth">
              <el-input v-model="addForm.roleMobile" autocomplete="off" ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="公司地址" :label-width="addFormLabelWidth">
          <el-input v-model="addForm.companyAddress" autocomplete="off" style="width: 100%"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addDialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="onaddsubmit">确 定</el-button>
      </div>
    </el-dialog>
  <el-dialog title="编辑单位" :visible.sync="editDialogFormVisible">
    <el-form :model="editForm">
      <el-form-item label="单位名称" :label-width="addFormLabelWidth">
        <el-input v-model="editForm.companyName" autocomplete="off" style="width: 100%"></el-input>
      </el-form-item>
      <el-row>
        <el-col span="12">
          <el-form-item label="单位类型" :label-width="addFormLabelWidth">
            <el-select v-model="editForm.companyOptionsEditSelectedValue" placeholder="请选择">
              <el-option
                v-for="item in companyOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
                style="width: 100%"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col span="12">
          <el-form-item label="单位代码" :label-width="addFormLabelWidth">
            <el-input v-model="editForm.companyCode" autocomplete="off" style="width: 100%"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col span="12">
          <el-form-item label="单位地区" :label-width="addFormLabelWidth">
            <el-cascader
              v-model="editForm.companyRegions"
              style="width: 100%"
              :options="regionValue"
              :props="{ expandTrigger: 'hover' }"
              @change="handleChange"
              :show-all-levels= "showAllLevels"
            ></el-cascader>
          </el-form-item>
        </el-col>
        <el-col span="12">
          <el-form-item label="单位传真" :label-width="addFormLabelWidth">
            <el-input v-model="editForm.companyFax" autocomplete="off" style="width: 100%"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col span="12">
          <el-form-item label="联系人" :label-width="addFormLabelWidth">
            <el-input v-model="editForm.companyRole" autocomplete="off" ></el-input>
          </el-form-item>
        </el-col>
        <el-col span="12">
          <el-form-item label="联系电话" :label-width="addFormLabelWidth">
            <el-input v-model="editForm.roleMobile" autocomplete="off" ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="公司地址" :label-width="addFormLabelWidth">
        <el-input v-model="editForm.companyAddress" autocomplete="off" style="width: 100%"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="addDialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="addDialogFormVisible = false">保 存</el-button>
    </div>
  </el-dialog>
</div>
</template>

<script>
import Sticky from '../../components/Sticky/index'
import { regionData } from 'element-china-area-data'
import { addCompany, listCompany, delCompany, regionConvert } from '../../api/company'
export default {
  components: {
    Sticky
  },
  data() {
    return {
      tableData: [],
      loading: false,
      headerAlign: 'center',
      tableAlign: 'center',
      companyOptions: [
        {
          value: 'wholeItem',
          label: '全部'
        }, {
          value: 'inSys',
          label: '本单位系统内'
        }, {
          value: 'notSys',
          label: '非本单位系统内'
        }, {
          value: 'notInSys',
          label: '非系统内'
        }
      ],
      regionValue: regionData,
      addForm: {},
      editForm: {},
      addDialogFormVisible: false,
      editDialogFormVisible: false,
      selecedValue: '',
      showAllLevels: true,
      addFormLabelWidth: '80px',
      companyOptionsSelectedValue: '',
      companyMutipleSelection: [],
    }
  },
  methods: {
    handleSelectionChange(val) {
      console.log(val)
      this.companyMutipleSelection = val
    },
    subEdit() {
      if (this.companyMutipleSelection.length === 1) {
        this.editForm = this.companyMutipleSelection[0]
        this.editDialogFormVisible = true
      } else {
        this.$message.error('请选择一条信息进行编辑')
      }
    },
    onaddsubmit() {
      this.addForm.companyRegions = this.addForm.companyRegions.join('-')
      addCompany(this.addForm)
        .then(() => {
                 this.addDialogFormVisible = false
                 this.loading = true
                 this.addForm = {}
                 listCompany().then(response => {
                   const { data } = response
                   this.tableData = regionConvert(data)
                   }).then(this.loading = false)
                })
    },
    handleSelectionChange(val) {
      this.companyMutipleSelection = val
    },
    subDel() {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delCompany(this.companyMutipleSelection)
          .then(() => {
            this.loading = true
            listCompany().then(response => {
              const { data } = response
              this.tableData = regionConvert(data)
            }).then(this.loading = false)
          })
      })
    }

  },
  mounted() {
      this.loading = true
      listCompany().then(response => {
        const { data } = response
        this.tableData = regionConvert(data)
      }).then(
        this.loading = false
      )
  }
}
</script>

<style scoped>

</style>
