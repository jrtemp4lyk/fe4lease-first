<template>
  <div class="editForm">
    <el-dialog :title="editRowIndex > -1 ? '逾期配置' : '新增配置'" v-model="s_editFormVisible" size="tiny">
      <el-form class="editForm_form font_default"  ref="formData" :model="formData"  style="width:500px">
        <el-form-item label="逾期级别">
          <el-select v-model="formData.overdue_grade" :disabled="editRowIndex > -1" clearable placeholder="请选择">
            <el-option
              v-for="item in overdueGrade"
              :label="item.ifbpFincName"
              :value="item.ifbpFincCode">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="本次逾期天数">
          <el-select v-model="formData.overdue_totaldyas" :disabled="editRowIndex > -1" clearable placeholder="请选择">
            <el-option
              v-for="item in overdueTotaldyas"
              :label="item.ifbpFincName"
              :value="item.ifbpFincCode">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="本次逾期金额">
          <el-select v-model="formData.ovuedue_amount" :disabled="editRowIndex > -1" clearable placeholder="请选择">
            <el-option
              v-for="item in ovuedueAmount"
              :label="item.ifbpFincName"
              :value="item.ifbpFincCode">
            </el-option>
          </el-select>
        </el-form-item>
        <!--<el-form-item label="创建人">
          <el-input v-model="formData.creater" placeholder="请输入"></el-input>
        </el-form-item>-->
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
        overdueGrade:"",
        overdueTotaldyas:"",
        ovuedueAmount:"",
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
            url: urlRoot.urlWepper('fin/config/updateConfig'),
            success: function(re){
              if(re.success==="success"){
                alert("保存成功");
              }else{
                alert("保存失败");
              }
            }
          });
        }else{
          $.ajax({
            type: 'post',
            dataType: "json",
            data:this.formData,
            url: urlRoot.urlWepper('fin/config/addConfig'),
            success: function(re){
              if(re.success==="success"){
                alert("保存成功");
              }else{
                alert("保存失败");
              }
            }
          });
        }
      },
      selectDicConfig(){
        const vm=this;
        $.ajax({
          type: 'post',
          dataType: "json",
          data:{overdue_grade:"overdueGrade",overdue_totaldyas:"overdueTotaldyas",ovuedue_amount:"ovuedueAmount"},
          url: urlRoot.urlWepper('fin/config/queryDicConfig'),
          success: function(re){
            vm.overdueGrade=re.detailMsg.data.overdue_grade;
            vm.overdueTotaldyas=re.detailMsg.data.overdue_totaldyas;
            vm.ovuedueAmount=re.detailMsg.data.ovuedue_amount;
          }
        });
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
      this.selectDicConfig();
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
  }
  .editForm .el-form-item__label{
    font-size: 14px;
    color: #393C3E;
    font-family: 'ArialMT', 'Arial', 'PingFangSC-Regular';
    font-weight: 400;
    font-style: normal;
    line-height: normal;

    width: 25%;
    height: 36px;
    line-height: 36px;

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
  .editForm .el-form-item__content{
    width: 220px;
  }
</style>
