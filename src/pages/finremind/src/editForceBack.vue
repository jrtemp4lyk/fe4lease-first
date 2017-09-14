<template>
  <div class="new-label">
    <h4>强制收回</h4>
    <el-form ref="formData" :model="formData" v-model="s_editFormVisible" label-width="140px":inline="true">
      <el-form-item label="收回方">
        <el-input v-model="formData.backPerson" :disabled="editRowIndex > -1"></el-input>
      </el-form-item>
      <el-form-item label="租赁物目前所在地">
        <el-input v-model="formData.leaseLocation" :disabled="editRowIndex > -1"></el-input>
      </el-form-item>
      <el-form-item label="收回开始时间">
        <el-input type="date" v-model="formData.backStarttime"></el-input>
      </el-form-item>
      <el-form-item label="收回结束时间">
        <el-input type="date" v-model="formData.backEndtime"></el-input>
      </el-form-item>
      <el-form-item label="其他费用">
        <el-input v-model="formData.otherCharges" :disabled="editRowIndex > -1"></el-input>
      </el-form-item>

      <el-form-item label="收回后停放地">
        <el-input v-model="formData.backPlace" :disabled="editRowIndex > -1"></el-input>
      </el-form-item>

      <el-form-item label="停放费用说明">
        <el-input v-model="formData.parkMoney" :disabled="editRowIndex > -1"></el-input>
      </el-form-item>
      <el-form-item label="物品清单">
        <el-input v-model="formData.thingList" :disabled="editRowIndex > -1"></el-input>
      </el-form-item>
      <!--<el-form-item label="照片上传">
        <el-input v-model="formData.photoUpload" :disabled="editRowIndex > -1"></el-input>
      </el-form-item>-->
      <el-form-item label="收回状态">
        <el-radio class="radio" v-model="formData.backState" label="1">已收回</el-radio>
        <el-radio class="radio" v-model="formData.backState" label="2">未收回</el-radio>
      </el-form-item>
     <!-- <el-form-item label="支付表号">
        <el-input v-model="finPayCode" :disabled="editRowIndex > -1"></el-input>
      </el-form-item>-->
      <div>
        <el-form-item label="收回原因">
          <el-input type="textarea" style="width:500px" v-model="formData.backReason" :disabled="editRowIndex > -1"></el-input>
        </el-form-item>
      </div>
      <div>
        <el-form-item label="收回备注">
          <el-input type="textarea" style="width:500px" v-model="formData.backRemark" :disabled="editRowIndex > -1"></el-input>
        </el-form-item>
      </div>
    </el-form>
    <div class="new_label_btn" style="text-align: center;">
      <el-button type="primary" @click="onForceSubmit">保存</el-button>
      <el-button @click="onCancel">取消</el-button>
    </div>
  </div>
</template>
<script>
  import  urlRoot from  '../../../common/urlRoot';
  export default {
    data() {
      return {
        radio: '1'
        //s_editFormVisible: false,
      };
    },
    props: ['formData','editFormVisible', 'editRowIndex','finPayCode'],
    methods: {
      onForceSubmit() {
        //const finPayCode=this.finPayCode;
        //alert(finPayCode);
        this.$emit('changeVisible', false);
        this.$emit('onSubmit', this.formData);
        $.ajax({
          type: 'post',
          dataType: "json",
          data:this.formData,
          url: urlRoot.urlWepper('fin/remind/addForce?finPayCode='+this.finPayCode),
          success: function(re){
            if(re.success==="success"){
              alert("保存成功");
            }else{
              alert("保存失败");
            }
          }
        });
      },
      onCancel() {
        this.$emit('changeVisible', false);
      },
    },

    created: function() {
      // alert("11");
    },
  };
</script>

<style>

</style>
