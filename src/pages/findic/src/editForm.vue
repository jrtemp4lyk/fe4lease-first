<template>
  <div class="editForm">
    <el-dialog :title="editRowIndex > -1 ? '编辑修改' : '新增创建'" v-model="s_editFormVisible" size="tiny">
      <el-form class="editForm_form font_default"  ref="formData" :model="formData"  style="width:60%">

        <el-form-item label="类型编码" class="font_default">
          <el-input v-model="formData.ifbpFinpCode" :disabled="editRowIndex > -1" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="类别名称">
          <el-input v-model="formData.ifbpFinpName" :disabled="editRowIndex > -1" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="细项编码">
          <el-input v-model="formData.ifbpFincCode" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="细项名称">
          <el-input v-model="formData.ifbpFincName" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="细项顺序号">
          <el-input v-model="formData.order_num" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="创建人">
          <el-input v-model="formData.creater" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="备注说明">
          <el-input v-model="formData.remark" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">保存</el-button>
          <el-button @click="onCancel">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import urlRoot from '../../../common/urlRoot';
export default {
    name: 'editForm',
    data() {
      return {
        s_editFormVisible: false,
      };
    },
   props: ['formData','editFormVisible', 'editRowIndex'],
    methods: {
      onSubmit() {
        this.s_editFormVisible = false;
        this.$emit('onSubmit', this.formData);
        if(this.editRowIndex > -1){
          $.ajax({
            type: 'post',
            dataType: "json",
            data:this.formData,
            url: urlRoot.urlWepper('fin/dic/update'),
            success: function(re){
              alert(JSON.stringify(re));
            }
          });
        }else{
          $.ajax({
            type: 'get',
            dataType: "json",
            data:this.formData,
            url: urlRoot.urlWepper('fin/dic/addDic'),
            success: function(re){
              //alert(JSON.stringify(re));
              alert(re);
            }
          });
        }
      },
      onCancel() {
        this.s_editFormVisible = false;
      },
    },
    /*computed: {
      form: function() {
        console.log('computed', this.formData);
        const a = this.formData;
        return {
          ifbpFinCode: a.ifbpFinCode,
          ifbpFinOpttype: a.ifbpFinOpttype,
          ifbpFinName: a.ifbpFinName,
          creater:a.creater,
          remark: a.remark,
        };
      },
    },*/
    watch: {
      editFormVisible: function(value) {
        this.s_editFormVisible = value;
      },
      s_editFormVisible: function(value) {
        this.$emit('changeVisible', value);
      },
    },
    created: function() {

    },

};
</script>
<style>
  .line{
    text-align: center;
  }
  .editForm .el-dialog--tiny{
    width: 50%;
  }
  .editForm_form {
    padding:20px 10px;
    margin:0 auto;
  }
  .editForm .el-form-item__label{
    font-size: 14px;
    color: #393C3E;
    font-family: 'ArialMT', 'Arial', 'PingFangSC-Regular';
    font-weight: 400;
    font-style: normal;
    line-height: normal;
    text-align: center;
    width: 25%;
    height: 36px;
    line-height: 36px;

    /*
    text-align: right;
    display: inline-block;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;*/
    padding:0px;
  }
  .editForm .el-input {
/*    width: %;*/

  }
  .editForm .el-form-item__content{
    width: 64%;
    float: right;
    margin-right: 12px;
  }
  .editForm .el-form-item{
    margin-bottom:10px;
  }
</style>
