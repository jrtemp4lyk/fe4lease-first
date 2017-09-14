<template>
 <div class="accItemEdit">
  <el-dialog :title="editRowIndex > -1 ? '修改科目' : '新增科目'" v-model="s_editFormVisible" size="tiny">
    <el-form ref="formData" :model="formData" label-width="100px">

      <el-form-item label="科目编码">
        <el-input v-model="formData.itemcode" :disabled="editRowIndex > -1"></el-input>
      </el-form-item>
      <el-form-item label="科目名称">
        <el-input v-model="formData.itemname" :disabled="editRowIndex > -1"></el-input>
      </el-form-item>
      <el-form-item label="科目类别">
        <el-input v-model="formData.itemtype"></el-input>
      </el-form-item>
      <el-form-item label="余额方向">
         <el-radio class="radio" v-model="formData.balancedirect" label="D">借方</el-radio>
         <el-radio class="radio" v-model="formData.balancedirect" label="C">贷方</el-radio>
      </el-form-item>
      <el-form-item label="备注">
        <el-input v-model="formData.remark"></el-input>
      </el-form-item>
      <!--
      <el-form-item label="辅助核算" >
      <el-checkbox-group v-model="formData.assval">
          <div v-for='item in assvals'>
              <el-checkbox :label="item.lable">{{item.value}}</el-checkbox>
          </div>
      </el-checkbox-group>
      </el-form-item>
      -->
      <el-form-item>
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
        assvals:[{
            lable: '部门',
            value: '001',
        },
        {
        lable: '客户',
        value: '002',
        }],
        checkList:[],
      };
    },
    props: ['formData','editFormVisible', 'editRowIndex'],
    methods: {
      onSubmit() {
        const vm=this;
        let msg='';
        this.s_editFormVisible = false;
        this.$emit('onSubmit', this.formData);
        if(this.editRowIndex > -1){
          $.ajax({
            type: 'post',
            dataType: "json",
            data:this.formData,
            url:urlRoot.urlWepper('fin/finance/insertOrUpdate'),
            success: function(re){
                if (re.success){
                        vm.$message({
                             type: 'info',
                               message: re.successMessage,
                              });
                  } else {
                       msg = re.errorMessage;
                       vm.$message({
                       type: 'error',
                       message: msg !=='' ? msg : '保存失败！'
                        });
                    }
            }
          });
        }else{
          $.ajax({
            type: 'get',
            dataType: "json",
            data:this.formData,
            url: urlRoot.urlWepper('fin/finance/insertOrUpdate'),
            success: function(re){
                if (re.success){
                                        vm.$message({
                                             type: 'info',
                                               message: re.successMessage,
                                              });
                                  } else {
                                       msg = re.errorMessage;
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
  .accItemEdit .el-input{
    width: 70%;
  }
  .accItemEdit .el-form-item_label{
    margin-right: 40px;
  }
</style>

