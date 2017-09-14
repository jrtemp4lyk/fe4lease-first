<template>
  <el-dialog v-model="editFormVisible" size="large"  @open="onOpen">
	     <div class="title-header" style="margin-bottom:20px;">
	        <h2 class="name">接收</h2>
	     </div>
	  	<el-form ref="formdata" :model="form" label-width="80px">
      <el-row>
        <el-col :span="12">
        <div>
          <el-form-item label="接收名字" class="formitem">
            <el-input v-model="form.name"   class="forminput"></el-input>
          </el-form-item>
        </div>
        </el-col>
        <el-col :span="12">
        <div>
          <el-form-item label="接收编码" class="formitem">
            <el-input v-model="form.code" class="forminput"></el-input>
          </el-form-item>
        </div>
        </el-col>

        <el-col :span="12">
        <div>
          <el-form-item label="开始时间" class="formitem">
<!--              <el-date-picker
          v-model="form.starttime"
          type="datetime"
          placeholder="选择日期时间"
          align="right"
          class="forminput" >
        </el-date-picker> -->
            <el-date-picker
            v-model="starttime"
            type="date"
            placeholder="选择日期"
            @change="onchange"
            >
          </el-date-picker>
          </el-form-item>
        </div>
        </el-col>
        <el-col :span="12">
        <div>
          <el-form-item label="备注" class="formitem">
            <el-input v-model="form. remarks" class="forminput"></el-input>
          </el-form-item>
        </div>
        </el-col>
        <el-col :span="12">
        <div>
          <el-form-item label="结束时间" class="formitem">
            <el-input v-model="form.endtime" class="forminput"  :disabled="true" ></el-input>
          </el-form-item>
        </div>
        </el-col>
        <el-col :span="12">
        <div>
          <el-form-item label="接收状态" class="formitem">
            <el-input v-model="form.receivestatus" class="forminput"  :disabled="true"></el-input>
          </el-form-item>
        </div>
        </el-col>
      </el-row>


		 <div style="margin-left:20px;">
		    <el-button type="primary" @click="receive">接收</el-button>
		    <el-button  type="primary" @click="onCancel" >取消</el-button>
		 </div>
		</el-form>


      <el-row id="staff-list" :gutter="40">
      <div class="capitalListInfo_container">
        <el-col class="capitalListInfo_container_col" :span="18">
          <div >
            <p>
              <el-tag type="success" class="capitalListInfo_tag">转租赁</el-tag>
              <span class="capitalListInfo_info">行业:乘用车</span>
              <span class="capitalListInfo_info"> <span class="capitalListInfo_info_img"> <img src="../../../assets/images/people_fill.png" alt="">  </span> 融资方:北京租赁车有限公司</span> 
              <span class="capitalListInfo_info">资产数量:125</span>
            </p>
            <div class="capitalListInfo_main">
              <el-col :span="8">
                <div>
                  <p class="capitalListInfo_plan_amount">110.000.000<span style="font-size:10px; color:gray">元</span</p>
                  <p class="capitalListInfo_plan_word">计划融资金额</p>
                </div>
              </el-col>
              <el-col :span="5">
                <div>
                  <p class="capitalListInfo_plan_amount">36 <span style="font-size:10px; color:gray">(月)</span> </p>
                  <p class="capitalListInfo_plan_word">计划融资时间</p>
                </div>
              </el-col>
              <el-col :span="5">
                <div>
                  <p class="capitalListInfo_plan_amount">8<span style="font-size:10px; color:gray">%</span</p>
                  <p class="capitalListInfo_plan_word">预期利率</p>
                </div>
              </el-col>
              <el-col :span="6">
                <div>
                  <p class="capitalListInfo_plan_amount">是</p>
                  <p class="capitalListInfo_plan_word">是否提供担保</p>
                </div>
              </el-col>
            </div>
          </div>
        </el-col>

        <el-col :span="5" class="capitalListInfo_container_col">
          <div class="capitalListInfo_right" >
             <p class="capitalListInfo_countdown">接受倒计时:&nbsp;&nbsp;<span style="font-size:40px; color:red; font-weight:bold">5</span>&nbsp;&nbsp;天</p>
          </div>
        </el-col>
      </div>
      </el-row>

  </el-dialog>
</template>

<script>
  // import  urlRoot from  '../urlRoot';
  export default {
  data() {
    return {
    s_editFormVisible:false,
    starttime:'',
      form: {
        name: '',
        code: '',
        starttime:'',
        endtime: '',
        receivestatus: '',
        remarks: '',
      },
    };
  },
  props: ['editFormVisible','pushInfo','form2'],

  methods:{
    onCancel() {
      this.s_editFormVisible = false;
      // this.showaddtable="false";//关闭时，将参数设置为初始值
      // this.addbuttontitle="新增";
    },
    receive(){
        const vm = this;
        const foemdata=_.cloneDeep(this.form);
        delete foemdata.receivestatus;
        foemdata.pk_project=vm.pushInfo.pk_pushinfo;
          this.$emit('onreceive', foemdata);
    },
    onOpen(){
      this.form=this.form2;
    },
    onchange(value){
      // debugger;
      this.form.starttime=value;
    }
  },

  watch: {
    editFormVisible: function(value) {
      this.s_editFormVisible = value;
    },
    s_editFormVisible: function(value) {
      this.$emit('changeVisible', value);
    },
  },
};

</script>

<style>
	.formitem {text-align:right; width:130px; margin-left:40px;}
	.forminput{margin-left: 10px; width:300px;}
	.formItem{ margin-bottom: 10px; }
</style>
