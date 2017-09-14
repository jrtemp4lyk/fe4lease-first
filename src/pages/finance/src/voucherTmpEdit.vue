<template>
 <div class="voucherTmpEdit">
  <el-dialog :title="editRowIndex > -1 ? '修改' : '新增'" v-model="s_editFormVisible" size="tiny">
    <el-form ref="formData" :model="formData"  label-width="100px">
      <!--
      <el-form-item label="凭证类别" show="false" >
          <el-select v-model="formData.vouchertype"   placeholder="请选择">
                  <el-option
                    v-for="item in vouchertypes"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
          </el-select>
      </el-form-item>
      -->
       <el-form-item label="凭证类别" style="display:none">
            <el-input v-model="formData.vouchertype" ></el-input>
       </el-form-item>
      <!--
      <el-form-item label="核算帐薄" show="false">
           <el-select v-model="formData.pkAccbook"  placeholder="请选择" size="20">
                     <el-option
                       v-for="item in accbooks"
                       :key="item.value"
                       :label="item.label"
                       :value="item.value">
                     </el-option>
           </el-select>
      </el-form-item>
      -->
      <el-form-item label="来源系统" style="display:none">
            <el-input v-model="formData.systemid" ></el-input>
      </el-form-item>
      <el-form-item label="模块" style="display:none">
            <el-input v-model="formData.moduleValue" ></el-input>
      </el-form-item>
      <el-form-item label="摘要">
        <el-input v-model="formData.explanation" ></el-input>
      </el-form-item>
      <el-form-item label="科目">
        <el-input v-model="formData.pkAcctitem" ></el-input>
      </el-form-item>

      <el-form-item class="voucher_radio" label="方向">
         <el-radio class="radio" v-model="formData.direction" label="D">借方</el-radio>
         <el-radio class="radio" v-model="formData.direction" label="C">贷方</el-radio>
      </el-form-item>
      <el-form-item label="币种">
        <el-input v-model="formData.currency"></el-input>
      </el-form-item>
      <el-form-item label="汇率">
            <el-input v-model="formData.excrate"></el-input>
      </el-form-item>
      <el-form-item label="原币金额">
           <el-input v-model="formData.oriAmount"></el-input>
      </el-form-item>
      <el-form-item label="本币金额">
       <el-input v-model="formData.localAmount"></el-input>
      </el-form-item>
      <el-form-item label="辅助核算">
             <el-input v-model="formData.assval" type="textarea"></el-input>
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
      form:{
         vouchertype:'',
         pkAccbook:'',
            },
        s_editFormVisible: false,
        radio: 'D',
        accbooks:[{
                  value: '1',
                  label: '帐薄1'
                  },
                  {value: '2',
                  label: '帐薄2'
        }],
        vouchertypes:[{
                 value: '1',
                 label: '记账凭证'
             }, {
                value: '2',
                label: '单边凭证'
                }, {
                value: '3',
                label: '双边凭证'
        }],
         vouchervalue:"",
         accbookvalue:"",
      };
    },
    props: ['formData','editFormVisible', 'editRowIndex'],
    methods: {
      onSubmit() {
        const vm = this;
        this.s_editFormVisible = false;
        vm.$emit('onSubmit', this.formData);
        if(this.editRowIndex > -1){
          $.ajax({
            type: 'post',
            dataType: "json",
            data:this.formData,
            url:urlRoot.urlWepper('fin/finance/voucherTmpUpdate'),
            success: function(re){
             if (re.success){
                 vm.$message({
                 type: 'info',
                 message: re.successMessage,
                 });
             } else {
                     let msg = '';
                     msg = re.errorMessage;
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
            url: urlRoot.urlWepper('fin/finance/voucherTmpSave'),
            success: function(re){
                if (re.success){
                     vm.$message({
                        type: 'info',
                        message: re.successMessage,
                     });
                } else {
                       let msg = '';
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

