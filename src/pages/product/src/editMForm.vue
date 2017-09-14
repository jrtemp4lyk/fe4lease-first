<template>
  <div class="editForm">
    <el-dialog :title="editRowIndex > -1 ? '编辑型号' : '新增型号'" v-model="m_editFormVisible" size="tiny">
      <el-form class="editForm_form font_default"  ref="formData" :model="formData"  style="width:60%">
        <el-form-item label="品牌">
          <el-input v-model="formData.product_name" disabled="disabled"></el-input>
        </el-form-item>
        <el-form-item label="系列">
          <el-input v-model="formData.catena_name"  placeholder="请输入" disabled="disabled"></el-input>
        </el-form-item>
        <el-form-item label="型号">
          <el-input v-model="formData.productM.model_name"  placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="指导价">
          <el-input v-model="formData.productM.guide_price"  placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="生产日期">
          <el-date-picker
            v-model="formData.productM.product_date"
            type="date"
            placeholder="选择日期"
            >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="停产日期">
          <el-date-picker
            v-model="formData.productM.stop_date"
            type="date"
            placeholder="选择日期"
            >
          </el-date-picker>
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
    name: 'editMForm',
    data() {
      return {
        m_editFormVisible: false,
      };
    },
   props: ['formData','editFormVisible', 'editRowIndex'],
    methods: {
      onSubmit() {
        const vm = this;
        this.m_editFormVisible = false;
        // this.$emit('onSubmit', this.formData);
        if(this.editRowIndex > -1){
          $.ajax({
            type: 'post',
            dataType: "json",
            contentType:'application/json',
            data:JSON.stringify(this.formData.productM),
            url: urlRoot.urlWepper('fin/productMgt/doUpdateProductModel'),
            success: function(re){
              vm.$emit('onSubmit', vm.formData.productM);
              alert(JSON.stringify(re.success));
            }
          });
        }else{
          $.ajax({
            type: 'post',
            dataType: "json",
            contentType:'application/json',
            data:JSON.stringify(this.formData.productM),
            url: urlRoot.urlWepper('fin/productMgt/doAddProductModel'),
            success: function(re){
              vm.$emit('onSubmit', vm.formData.productM);
              alert(re.success);
            }
          });
        }
      },
      onCancel() {
        this.m_editFormVisible = false;
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
        this.m_editFormVisible = value;
      },
      m_editFormVisible: function(value) {
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
   .editForm .el-input {
    width: 250px;
  }
  .editForm .el-form-item{
    margin-bottom:10px;
  }
</style>
