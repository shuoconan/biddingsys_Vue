<template>
  <div>
    <sticky :class-name="'sub-navbar'">
      <div style="display: inline;">
        <el-cascader
          size="small"
          v-model="cascaderValue"
          placeholder="筛选批次范围"
          :options="projectOptions"
          @change="handleChange"
          style="margin-right: 10px"
        ></el-cascader>
      </div>
      <div style="display: inline;">
        <el-button type="info" size="small" @click="addNewRoot">新增批次</el-button>
        <el-button type="danger" size="small">删除批次或文件</el-button>
      </div>
    </sticky>
    <div style="padding-left: 20px;padding-right: 50px;padding-top: 10px">
      <el-tree
        :data="data5"
        node-key="id"
        show-checkbox
        accordion
        @check-change="handleCheckChange"
        :expand-on-click-node="false">
        <span class="custom-tree-node" slot-scope="{ node, data }">
          <span>
            <i :class="data.icon"></i>{{ node.label }}
              <span v-if="data.level === 1">
                  <el-button
                  type="text"
                  size="mini"
                  @click="handlepreuploads(node, data)">
                  上传文件
                 </el-button>
              </span>
          </span>
        </span>
      </el-tree>
    </div>
    <el-dialog
      v-loading="addRootFormLoading"
      title="新增批次"
      :visible.sync="addRootdialogFormVisible">
      <el-form  :model="addRootForm">
        <el-form-item label="批次名称" :label-width="addRootFormLabelWidth">
          <el-input v-model="addRootForm.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="批次类型" :label-width="addRootFormLabelWidth">
          <el-select v-model="addRootForm.region" placeholder="请选择批次类型">
            <el-option label="国网项目" value="sgpro"></el-option>
            <el-option label="兴力项目" value="xlpro"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item  label="批次年份" :label-width="addRootFormLabelWidth">
          <el-select v-model="addRootForm.year" placeholder="请选择项目年份">
            <el-option label="2019" value="2019"></el-option>
            <el-option label="2020" value="2020"></el-option>
            <el-option label="2021" value="2021"></el-option>
            <el-option label="2022" value="2022"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="delRootData">取 消</el-button>
        <el-button type="primary" @click="addRootData">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog
      title="选取上传的文件类型"
      :visible.sync="addFileDialogFormVisible">
      <el-form :model="uploadData">
        <el-form-item label="所属批次：" label-width="100px">
          <el-input
            v-model="uploadData.label"
            placeholder="请输入内容"
            :disabled="true">
          </el-input>
        </el-form-item>
        <el-form-item>
          <div class="upload-style">
            <el-upload
              class="upload-demo"
              :action="fileActions"
              :headers="headers"
              :on-success="successUploadFile"
              :before-upload="fileBeforeUpload"
              :data="uploadData"
              :on-exceed="handleExceed"
              show-file-list="false"
              >
              <el-button type="primary" icon="el-icon-notebook-1" :loading = "dialogLoading" plain>上传招标文件</el-button>
            </el-upload>
            <el-upload
              class="upload-demo"
              :action="recordActions"
              :headers="headers"
              multiple
              :on-success="successUploadFile"
              :limit="50"
              :data="uploadData"
              :on-exceed="handleExceed"
              show-file-list="false"
            >
              <el-button type="primary" icon="el-icon-files" plain>上传开标记录</el-button>
            </el-upload>

          </div>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="delRootData">取 消</el-button>
        <el-button type="primary" @click="addRootData">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import Sticky from '../../components/Sticky'
import { addRootData, getFileList } from '../../api/file'
import { getToken } from '../../utils/auth'

export default {
  components: {
    Sticky
  },
  computed: {
    headers() {
      return {
        // eslint-disable-next-line no-undef
        Authorization: `Bearer ${getToken()}`
      }
    }
  },
  data() {
    const data = []
    return {
      radio1: '',
      radio2: '',
      radio3: '',
      data5: JSON.parse(JSON.stringify(data)),
      projectOptions: [
        {
          value: 'wholeItem',
          label: '全部项目'
        }, {
          value: 'sgpro',
          label: '国网项目'
        }, {
          value: 'xlpro',
          label: '兴力项目'
        }
      ],
      cascaderValue: '',
      addRootdialogFormVisible: false,
      addRootForm: {},
      addRootFormLabelWidth: 80,
      addRootFormLoading: false,
      addFileDialogFormVisible: false,
      uploadData: {},
      recordActions: `${process.env.VUE_APP_BASE_API}/file/recordupload/`,
      fileActions: `${process.env.VUE_APP_BASE_API}/file/fileupload/`,
      fileRecord: {},
      fileList1: [],
      temp: {
        type: 'wholeItem'
      },
      dialogLoading: false
    }
  },
  methods: {
    addNewRoot() {
      this.addRootdialogFormVisible = true
    },
    addRootData() {
      this.addRootFormLoading = true
      const promise = addRootData(this.addRootForm)
      promise.then(() => {
        this.addRootFormLoading = false
        this.addRootdialogFormVisible = false
      })
      getFileList(this.temp).then(response => {
        const { data } = response
        this.data5 = JSON.parse(JSON.stringify(data))
      })
    },
    delRootData() {
      this.addRootdialogFormVisible = false
      this.addRootForm = {}
    },
    handlepreuploads(node, data) {
      this.uploadData.label = node.label
      this.uploadData.id = data.id
      this.addFileDialogFormVisible = true
    },
    successUploadFile(val) {
      const { code, msg } = val
      if (code === 0) {
        this.$message.success('文件上传成功')
      } else {
        this.$message.error(msg)
      }
      this.addFileDialogFormVisible = false
      this.dialogLoading = false
      getFileList(this.temp).then(response => {
        const { data } = response
        this.data5 = JSON.parse(JSON.stringify(data))
      })
    },
    handleChange(val) {
      this.temp.type = val
      getFileList(this.temp).then(response => {
        const { data } = response
        this.data5 = JSON.parse(JSON.stringify(data))
      })
    },
    fileBeforeUpload() {
      this.dialogLoading = true
    }
  },
  mounted() {
    this.cascaderValue = ['wholeItem']
    getFileList(this.temp).then(response => {
      const { data } = response
      this.data5 = JSON.parse(JSON.stringify(data))
    })
  },
  watch: {
    cascaderValue: () => {
      this.temp.type = this.cascaderValue
    }
  }
}
</script>

<style scoped>
  .upload-style {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-top: 20px;
    padding-left: 20%;
    padding-right: 20%;
  }
</style>
