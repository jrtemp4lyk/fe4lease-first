<template>
  <el-dialog v-model="editFormVisible" size="large" @close="onClose" :title="推送"  @open="onOpen">
<!--    <div class="formTitle font_default"><span style="width:100%;text-align:center;">推送设置</span></div> -->
     <h4>推送设置</h4>
     <el-form-component :form="form" @onSubmit="onSubmit" @onCancel="onCancel"></el-form-component>
     <el-row type="flex" justify="center">
     <el-col :span="24">
     <div style="overflow:auto" >
     <el-table
          :data="pushTableData"
          empty-text="暂无数据……"
          border
          stripe
          style="text-align: center;" >
          <el-table-column
            v-for="item in pushTableColumns"
            :prop="item.flag"
            :label="item.name"
            :width="item.width"
            >
              <template scope="scope" :item="item">
              <div v-if="item.flag==='pushstatus'">
                <span v-if="scope.row.pushstatus===1 || scope.row.pushstatus==='1'">已推送</span>
                <span v-else>未推送</span>
              </div>
              <div v-else>
                <span>{{scope.row[item.flag]}}</span>
              </div>
            </template>
          </el-table-column>
        </el-table>
        </div>
        </el-col>
        </el-row>
     <el-row style="margin-top:20px" type="flex" justify="center">
     <el-col :span="24">
        <el-button @click="PushFinish" type="primary" icon="upload2" size="small" v-if="this.pushTableData[0].pushstatus===0">推送</el-button>
        <el-button @click="TakeBack" type="primary" icon="upload2" size="small" v-if="this.pushTableData[0].pushstatus===1">收回</el-button>
     </el-col>
     </el-row>
  </el-dialog>
</template>
<script>
  // import  urlRoot from  '../urlRoot';
export default {
  data() {
    return {
    s_editFormVisible:false,
    showPushFinishButton:true,
    };
  },
  props: ['editFormVisible','form','pushTableColumns','pushTableData'],

  methods:{
    TakeBack(){
      const formdata = {};
      this.form.formData.forEach((item) => {
           formdata[item.key] = item.value;
       });
      this.$emit('TakeBack', formdata);
    },
   onOpen(){
      
    },
   onCancel() {
     this.s_editFormVisible = false;
   },
      // 从表单控件传递过来的
   PushFinish() {
    // this.s_editFormVisible = false;
    const formdata = {};
    this.form.formData.forEach((item) => {
      formdata[item.key] = item.value;
    });
   // alert("ss");
   // const formData2 = _.cloneDeep(this.form);
     // data.pk_ref=tabledata;
   // alert(JSON.stringify(data));
   // alert(this.pushTableData.pk_fin_assetproject);
   // formData2.pk_project=this.pushTableData.pk_fin_assetproject;
   this.$emit('PushFinish', formdata);
    },
  },

  watch: {
      editFormVisible: function(value) {
        this.s_editFormVisible = value;
      },
      s_editFormVisible: function(value) {
        this.$emit('changePushVisible', value);
      },
    },
};
</script>
<style>
    .formBox{ padding: 20px 10px; width: 100%; }
    .formItem{ margin-bottom: 10px; }
    .formItem__label{ width: 120px; height: 36px; line-height: 36px; text-align: right; display: inline-block; text-overflow: ellipsis; overflow: hidden; white-space: nowrap; }
    .formItem__prepend{ min-width: 15px; display: inline-block; text-align: center; }
</style>
