<style>

</style>
<template>
  <div class="new-label">
    <h4>诉讼</h4>
    <el-form ref="formData" :model="formData" v-model="s_editFormVisible" label-width="140px":inline="true">
      <el-form-item label="跟进日期">
        <el-input type="date" v-model="formData.followDate"></el-input>
      </el-form-item>
      <el-form-item label="阶段">
        <el-select v-model="formData.lawsuitPeriod" clearable placeholder="请选择">
          <el-option
            v-for="item in lawsuitPeriod"
            :label="item.ifbpFincName"
            :value="item.ifbpFincCode">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="诉讼状态">
        <el-select v-model="formData.lawsuitState" clearable placeholder="请选择">
          <el-option
            v-for="item in lawsuitState"
            :label="item.ifbpFincName"
            :value="item.ifbpFincCode">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="执行状态">
        <el-select v-model="formData.executeState" clearable placeholder="请选择">
          <el-option
            v-for="item in executeState"
            :label="item.ifbpFincName"
            :value="item.ifbpFincCode">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="开庭信息">
        <el-input v-model="formData.openInformation" :disabled="editRowIndex > -1"></el-input>
      </el-form-item>
      <el-form-item label="法院名称">
        <el-input v-model="formData.courtName" :disabled="editRowIndex > -1"></el-input>
      </el-form-item>
      <el-form-item label="联系人">
        <el-input v-model="formData.contact" :disabled="editRowIndex > -1"></el-input>
      </el-form-item>
      <el-form-item label="联系人电话">
        <el-input v-model="formData.contactTel" :disabled="editRowIndex > -1"></el-input>
      </el-form-item>
      <el-form-item label="法院地址">
        <el-input v-model="formData.courtAdress" :disabled="editRowIndex > -1"></el-input>
      </el-form-item>
      <el-form-item label="事务所名称">
        <el-input v-model="formData.firmName" :disabled="editRowIndex > -1"></el-input>
      </el-form-item>
      <el-form-item label="联系人">
        <el-input v-model="formData.firmContact" :disabled="editRowIndex > -1"></el-input>
      </el-form-item>
      <el-form-item label="联系人电话">
        <el-input v-model="formData.firmContactTel" :disabled="editRowIndex > -1"></el-input>
      </el-form-item>
      <el-form-item label="联系地址">
        <el-input v-model="formData.firmcontactadress" :disabled="editRowIndex > -1"></el-input>
      </el-form-item>
      <el-form-item label="跟进说明">
        <el-input v-model="formData.followInstuction" :disabled="editRowIndex > -1"></el-input>
      </el-form-item>
      <el-form-item label="计划跟进时间">
        <el-input type="date" v-model="formData.planFollowDate"></el-input>
      </el-form-item>
      <el-form-item label="缴纳诉讼费">
        <el-input v-model="formData.lawsuitCost" :disabled="editRowIndex > -1"></el-input>
      </el-form-item>
      <el-form-item label="申请公告">
        <el-input v-model="formData.applyNotice" :disabled="editRowIndex > -1"></el-input>
      </el-form-item>
      <el-form-item label="是否缴纳公告费" style="width:28%">
        <el-radio class="radio" v-model="formData.payYesnoNotice" label="1">是</el-radio>
        <el-radio class="radio" v-model="formData.payYesnoNotice" label="2">否</el-radio>
      </el-form-item>
      <el-form-item label="是否已支付律师费" style="width:28%">
        <el-radio class="radio" v-model="formData.payYesnoLower" label="1">是</el-radio>
        <el-radio class="radio" v-model="formData.payYesnoLower" label="2">否</el-radio>
      </el-form-item>
      <div>
        <el-form-item label="计划跟进说明">
          <el-input type="textarea" style="width:500px" v-model="formData.planFollowSay" :disabled="editRowIndex > -1"></el-input>
        </el-form-item>
      </div>
      <div>
        <el-form-item label="诉讼原因">
          <el-input type="textarea" style="width:500px" v-model="formData.lawsuitReason" :disabled="editRowIndex > -1"></el-input>
        </el-form-item>
      </div>
    </el-form>
    <div class="new_label_btn" style="text-align: center;">
      <el-button type="primary" @click="onLawSuitSubmit">保存</el-button>
      <el-button @click="onCancel">取消</el-button>
    </div>
  </div>
</template>
<script>
  import  urlRoot from  '../../../common/urlRoot';
  export default {
    data() {
      return {
        lawsuitPeriod:'',
        lawsuitState:'',
        executeState:'',
        radio: '1'
        /*showfile: false,
         filelists: [],
         showul: false,
         autoheight: 130*/
      };
    },
    props: ['formData','editFormVisible', 'editRowIndex','finPayCode'],
    methods: {
      onLawSuitSubmit() {
        //const finPayCode=this.finPayCode;
        //alert(finPayCode);
        this.$emit('changeVisible', false);
        this.$emit('onLawSuitSubmit', this.formData);
        $.ajax({
          type: 'post',
          dataType: "json",
          data:this.formData,
          url:urlRoot.urlWepper('fin/remind/addLawSuit?finPayCode='+this.finPayCode) ,
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
      querySelect(){
        const vm=this;
        $.ajax({
          type: 'post',
          dataType: "json",
          data:{lawsuitPeriod:"lawsuitPeriod",lawsuitState:"lawsuitState",executeState:"executeState"},
          url: urlRoot.urlWepper('fin/remind/querySuitSDic'),
          success: function(re){
            vm.lawsuitPeriod=re.detailMsg.data.lawsuitPeriod;
            vm.lawsuitState=re.detailMsg.data.lawsuitState;
            vm.executeState=re.detailMsg.data.executeState;
          }
        });
      },
    },
    created: function() {
      this.querySelect();
    },
  };
</script>
