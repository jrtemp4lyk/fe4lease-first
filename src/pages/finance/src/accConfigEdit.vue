<template>
 <div class="voucherTmpEdit">
  <el-dialog :title="editRowIndex > -1 ? '修改' : '新增'" v-model="s_editFormVisible" size="tiny">
    <el-form ref="formData" :inline="true" :model="formData" label-width="100px">
      <el-form-item label="主键" style="display:none">
          <el-input v-model="formData.pkConfig" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="入账系统" >
           <el-input v-model="formData.accSys" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="租户" show="false">
           <el-input v-model="formData.tenantid" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="来源系统" show="false">
          <el-input v-model="formData.systemid" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="模块" show="false">
                <el-input v-model="formData.moduleValue" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="ip地址" show="false">
        <el-input v-model="formData.ip" ></el-input>
      </el-form-item>
      <el-form-item label="端口">
        <el-input v-model="formData.port" ></el-input>
      </el-form-item>
      <el-form-item label="入账账簿">
          <el-input v-model="formData.pkAccbook" ></el-input>
      </el-form-item>
      <el-form-item label="年度">
        <el-input v-model="formData.year"></el-input>
      </el-form-item>
      <el-form-item label="月份">
            <el-input v-model="formData.month"></el-input>
      </el-form-item>
      <el-form-item label="组织">
           <el-input v-model="formData.pkOrg"></el-input>
      </el-form-item>
      <el-form-item label="集团">
       <el-input v-model="formData.pkGroup"></el-input>
      </el-form-item>
      <el-form-item label="制单人">
         <el-input v-model="formData.pkMaker"></el-input>
      </el-form-item>
      <el-form-item class="voucher_button">
        <el-button type="primary" @click="onSubmit">完成</el-button>
        <el-button @click="onCancel">取消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
 </div>
</template>
<script>
import  urlRoot from  '../../../common/urlRoot';
export default {
    name: 'editForm',
    data() {
      return {
        s_editFormVisible: false,
        radio: 'D',
      };
    },
    props: ['formData','editFormVisible', 'editRowIndex'],
    methods: {
      onSubmit() {
        const vm = this;
        this.s_editFormVisible = false;
        let msg = '';
        this.$emit('onSubmit', this.formData);
        if(this.editRowIndex > -1){
          $.ajax({
            type: 'post',
            dataType: "json",
            data:this.formData,
            url:urlRoot.urlWepper('fin/finance/updateAcconfig'),
            success: function(re){
             if (re.success){
                  vm.$message({
                   type: 'info',
                   message: re.successMessage,
                   });
             } else {
                     msg = re.data.errorMessage;
                     vm.$message({
                     type: 'error',
                      message: msg !=='' ? msg : '更新失败！'
                        });
               }

            }
          });
        }else{
          $.ajax({
            type: 'get',
            dataType: "json",
            data:this.formData,
            url: urlRoot.urlWepper('fin/finance/accConfigSave'),
            success: function(re){
                if (re.success){
                     vm.$message({
                        type: 'info',
                         message: re.data.successMessage,
                     });
                } else {

                       msg = re.data.errorMessage;
                       vm.$message({
                       type: 'error',
                       message: msg !=='' ? msg : '保存失败！'
                          });
                       }
                }
          });
        }
      },
      onCancel() {
        this.s_editFormVisible = false;
      },
    },

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
  .voucherTmpEdit .el-input{
    width:70%;
    margin-left: 40px;
  }
  .voucherTmpEdit .el-radio {
    margin-left: 40px;
  }
  .voucher_radio .el-form-item__label{
    margin-top: 10px;
  }
  .voucher_button {
    margin-left: 40px;
  }
</style>

