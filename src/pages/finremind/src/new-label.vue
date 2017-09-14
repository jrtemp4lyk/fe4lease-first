<template>
  <div class="label_new">
    <h4 style="margin-top:15px; margin-bottom:20px">电催记录</h4>
    <el-form ref="formData" :model="formData"  v-model="s_editFormVisible" label-width="140px":inline="true" >
      <el-form-item label="电话拨打情况" >
        <el-select v-model="formData.finTelSituate"  clearable placeholder="请选择">
          <el-option
            v-for="item in finTelSituate"
            :label="item.ifbpFincName"
            :value="item.ifbpFincCode">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="电话状态" >
        <el-select v-model="formData.finTelStatue" :disabled="formData.finTelSituate=='1'" clearable placeholder="请选择">
          <el-option
            v-for="item in finTelStatue"
            :label="item.ifbpFincName"
            :value="item.ifbpFincCode">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="联系结果说明" >
        <el-input size="middle" v-model="formData.finContactResult" :disabled="formData.finTelSituate=='1'"></el-input>
      </el-form-item>
      <el-form-item label="逾期原因">
        <el-select v-model="formData.finOvderueReason" clearable placeholder="请选择">
          <el-option
            v-for="item in finOvderueReason"
            :label="item.ifbpFincName"
            :value="item.ifbpFincCode">
          </el-option>
        </el-select>
        <!-- <el-input v-model="formData.finOvderueReason" :disabled="editRowIndex > -1"></el-input>-->
      </el-form-item>
      <el-form-item label="逾期描述">
        <el-input v-model="formData.finOverDesribe" :disabled="formData.finOvderueReason=='1'"></el-input>
      </el-form-item>

      <el-form-item label="租赁物使用情况">
        <el-select v-model="formData.finThingsSituate" clearable placeholder="请选择">
          <el-option
            v-for="item in finThingsSituate"
            :label="item.ifbpFincName"
            :value="item.ifbpFincCode">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="还款承诺">
        <el-radio class="radio" v-model="formData.finTelJudge" label="是">是</el-radio>
        <el-radio class="radio" v-model="formData.finTelJudge" label="否" >否</el-radio>
      </el-form-item>
      <el-form-item label="判断是否会还款">
        <el-radio class="radio" v-model="formData.finJudgeRepayment" label="是">是</el-radio>
        <el-radio class="radio" v-model="formData.finJudgeRepayment" label="否" >否</el-radio>
        <!--<el-input v-model="formData.finJudgeRepayment" :disabled="editRowIndex > -1"></el-input>-->
      </el-form-item>
      <el-form-item label="是否重点关注">
        <el-radio class="radio" v-model="formData.finYesnoFollow" label="是">是</el-radio>
        <el-radio class="radio" v-model="formData.finYesnoFollow" label="否" >否</el-radio>
      </el-form-item>
      <el-form-item label="承诺还款时间">
        <el-input type="date" v-model="formData.operatortime"></el-input>
      </el-form-item>
      <!--<el-form-item label="支付表号">
        <el-input v-model="finPayCode" :disabled="editRowIndex > -1"></el-input>
      </el-form-item>-->
      <div>
        <el-form-item label="沟通备注">
          <el-input type="textarea" style="width:500px" v-model="formData.remark" :disabled="editRowIndex > -1"></el-input>
        </el-form-item>
      </div>
    </el-form>
    <div class="label_new_btn">
      <el-button size="primary" @click="onSubmit" type="success">保存</el-button>
      <el-button size="primary" type="success" :plain="true" @click="onCancel">取消</el-button>

    </div>
  </div>
</template>
<script>
  import  urlRoot from  '../../../common/urlRoot';
  export default {
    data() {
      return {
        finTelSituate: '',
        finOvderueReason:'',
        finThingsSituate:'',
        radio: '1'
        //s_editFormVisible: false,
        /*showfile: false,
        filelists: [],
        showul: false,
        autoheight: 130*/
      };
    },
    props: ['formData','editFormVisible', 'editRowIndex','finPayCode'],
    methods: {
      onSubmit() {
        //const finPayCode=this.finPayCode;
        this.$emit('changeVisible', false);
        this.editFormVisible = false;
        this.$emit('onSubmit', this.formData);
          $.ajax({
            type: 'post',
            dataType: "json",
            data:this.formData,
            url: urlRoot.urlWepper('fin/remind/add?finPayCode='+this.finPayCode),
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
        //alert(this.formData.finTelSituate);
        this.$emit('changeVisible', false);
        //this.s_editFormVisible = false;
      },
      querySelect(){
        const vm=this;
        $.ajax({
          type: 'get',
          dataType: "json",
          data:{finTelSituate:"finTelSituate",finTelStatue:"finTelStatue",finOvderueReason:"finOvderueReason",finThingsSituate:"finThingsSituate"},
          url: urlRoot.urlWepper('fin/dic/querySDic'),
          success: function(re){
            vm.finTelSituate=re.detailMsg.data.finTelSituate;
            vm.finOvderueReason=re.detailMsg.data.finOvderueReason;
            vm.finThingsSituate=re.detailMsg.data.finThingsSituate;
            vm.finTelStatue=re.detailMsg.data.finTelStatue;
          }
        });
      },
    },
//    watch: {
//      editFormVisible: function(value) {
//        console.log('change');
//        this.s_editFormVisible = value;
//      },
//      s_editFormVisible: function(value) {
//        this.$emit('changeVisible', value);
//      },
//    },
    created: function() {
       this.querySelect();
    },
  };
</script>
<style>
  .label_new{
    width: 1100px;

  }
  .label_new.label_new .el-form-item__content{
    width: 200px;
  }
  .el-tabs_content{
    margin-left: 20px;
  }
</style>
