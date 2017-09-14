<template>
 <div class="quoto_list">
    <!-- 温馨提示 -->
  <div class="title-header">
    <h2 class="name" >报&nbsp;价&nbsp;器</h2>
  </div>
  <el-alert
  title="温馨提示:   先填写车辆信息在选择产品"
  class="quoto_list_tips">
  </el-alert>
   <!-- 基础信息 -->
  <!-- <el-collapse v-model="activeNames" @change="handleChange"> -->
  <el-collapse v-model="activeNames">
    <el-collapse-item  name="1">
    <template slot="title">
      <span>基础信息</span><i class="header-ico el-icon-menu"></i>
    </template>
    <div>
      <el-row>
       <el-col :span="17">
          <div class="  list_title">
          <!-- 整体左侧 -->
          <div class="list_title_left">
           <!-- 左侧的左部分 -->
          <div class="list_title_left_left">
            <div class="list_title_img" >
              <img src="../../../assets/images/chebiao.jpg" alt="汽车图片">
              <div class="list_title_btn">
                <el-button type="info" @click="clickMe">重选车型</el-button>
              </div>
            </div>
<!--               <el-tag class="list_title_tag" >奔驰</el-tag>
              <el-tag class="list_title_tag"  type="gray" >C级</el-tag>
              <el-tag class="list_title_tag" type="primary" >2017 款C 300 运动款</el-tag> -->
          </div>
            <!-- 左侧的右部分 -->
            <div class="list_title_info">
              <div class="list_title_info_left">
                <div class="list_title_label">车辆型号:</div>
                <div class="list_title_label">市场指导价:</div>
                <div class="list_title_label">经&nbsp;&nbsp;销&nbsp;&nbsp;商:</div>
                <div class="list_title_label">是否二手:</div>
                <div class="list_title_label">租赁方式:</div>
                <div class="list_title_label">实际成交价:</div>
              </div>
              <div class="list_title_info_right">
                <div class="list_title_content">
                  <el-tag class="list_title_tag" >奔驰</el-tag>
                  <el-tag class="list_title_tag"  type="gray" >C级</el-tag>
                  <el-tag class="list_title_tag" type="primary" >2017 款C 300 运动款</el-tag>
                </div>
                <div class="list_title_content list_title_false_pay">
                  <span >150.000.00</span>
                </div>
                <div class="list_title_content list_title_seller">
                  <el-input v-model="input" icon="search" size="small"></el-input>
                </div>
                <div class="list_title_content list_title_second_hand">
                  <el-switch v-model="value2" on-color="#13ce66" off-color="#ff4949"></el-switch>
                </div>
                <div class="list_title_content list_title_rent_way">
                <!-- <el-select v-model="hEntity.pk_scheme_cfg"> -->
                  <el-select v-model="hEntity.lease_type" size="small">
                    <el-option
                      v-for="item in leaseTypeList"
                      :label="item.ifbpFincName"
                      :value="item.ifbpFincCode">
                    </el-option>
                  </el-select>
                </div>
                <div class="list_title_content list_title_true_pay">
                  <el-input v-model="hEntity.lease_money" id="lease_money" @change = "basicCalculation" placeholder="输入实际成交价" size="small"></el-input>
                </div>
              </div>

            </div>
          </div>
          </div>
       </el-col>
       <!-- 基础信息右侧 -->
        <el-col :span="7">
          <div class="list_title1">
            <div class="list_title_right">
              <p class="list_title_right_title">金融方案计算方案</p>
              <p class="list_title_right_info">融资金额:&nbsp; &nbsp; &nbsp; <span id="rzehj">{{hEntity.finance_money}}</span><span v-show="pay">元</span></p>
              <p class="list_title_right_info">首付合计:&nbsp; &nbsp; &nbsp; <span id="sfkhj"></span><span v-show="pay">元</span></p>
              <p class="list_title_right_info">月&nbsp; &nbsp; &nbsp;&nbsp;供:&nbsp; &nbsp; &nbsp;&nbsp; <span id="monthRent">{{monthRent}}</span><span v-show="pay">元</span></p>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    </el-collapse-item>

    <el-collapse-item title="反馈 Feedback" name="2">
    <template slot="title">
      <span>方案选择</span><i class="header-ico el-icon-edit"></i>
    </template>
    <div>
      <el-row>
        <el-col :span="24">
          <div class="list_main">
            <p class="list_main_title">金融方案</p>
             <el-row >


                <div class="list_main_left_container">
<!-- 方案选择 -->
                <div class="list_main_choice">
                  <el-col :span="8">
                    <el-select v-model="hEntity.pk_scheme_cfg" @change="changeScheme" placeholder="方案选择">
                      <el-option
                      v-for="item in sCfgHPrmList"
                      :label="item.scheme_name"
                      :value="item.pk_scheme_cfg">
                      </el-option>
                    </el-select>
                  </el-col>
                </div>


                  <div  class="list_main_left"  v-for="item in scfgDList" >
                    <el-col :span="8">
                      <p><span v-if="(item.ele_status != '3')">{{item.prm_name}}</span></p>
                        <!-- input输入框 -->
                        <el-input v-model="item.val_str"
                                  v-if="(item.prm_type == '0') || (item.prm_type == '1')||(item.prm_type == '3')" :disabled="item.ele_status == '2'"  :hidden="item.ele_status == '3'"
                                  :fee_include="item.fee_include"
                                  :id="item.prm_code" class="eleClass"  @change = "basicCalculation"
                        ></el-input>
                        <!-- 日期控件 -->
                        <el-date-picker v-model="item.val_str"  v-else-if="(item.prm_type == '2')" :disabled="item.ele_status == '2'"  :hidden="item.ele_status == '3'"
                                        :fee_include="item.fee_include"
                                        :id="item.prm_code"  class="eleClass"
                        ></el-date-picker>
                        <!-- select下拉框 -->
                        <el-select v-model="item.val_str" v-else-if="(item.prm_type == '4')"  :disabled="item.ele_status == '2'" class="eleClass">
                          <el-option
                            v-for="ditem in item.dList"
                            :label="ditem.ifbpFincName"
                            :value="ditem.ifbpFincCode">
                          </el-option>
                        </el-select>
                        <!-- 进度条 -->
  <!--                       <div class="block">
                          <el-slider
                            v-model="value8"
                            show-input>
                          </el-slider>
                        </div> -->
                        <span v-if="(item.prm_type == '0')">%</span>
                        <span v-if="(item.is_required == '1')"  style="color: red">*</span>
                    </el-col>
                  </div>
                </div>
            </el-row>

            <el-row class="list_main_left_button">
              <el-col :span="24">
               <div class="list_main_button">
                <el-button :plain="true" type="info"  @click="calculate">方案测算</el-button>
                <el-button :plain="true" type="info"  @click="doApplySave">方案保存</el-button>
                <el-button :plain="true" type="info">&nbsp;&nbsp;&nbsp;分&nbsp;&nbsp;享&nbsp;&nbsp;&nbsp;</el-button>
               </div>
              </el-col>
            </el-row>


          </div>
        </el-col>
      </el-row>
    </div>
    </el-collapse-item>
    <!-- 报价详情 -->
    <el-collapse-item  name="3">
    <template slot="title">
      <span>报价详情</span><i class="header-ico el-icon-view"></i>
    </template>
    <div>
      <el-row v-show="isShow1">
        <el-col :span="24">
          <div class="list_bottom">
            <el-table
              :data="payList"
              border
              show-summary
              style="width: 100%">
              <el-table-column
                prop="qc"
                label="期次"
                width="80">
              </el-table-column>
              <el-table-column
                prop="zj"
                label="租金"
                width="180">
              </el-table-column>
              <el-table-column
                prop="bj"
                label="本金">
              </el-table-column>
              <el-table-column
                prop="lx"
                label="利息">
              </el-table-column>
              <!--<el-table-column-->
                <!--prop="glf"-->
                <!--label="管理费">-->
              <!--</el-table-column>-->
              <el-table-column
                prop="sybj"
                label="剩余本金">
              </el-table-column>
            </el-table>
          </div>
        </el-col>
      </el-row>
    </div>
    </el-collapse-item>
  </el-collapse>
  <!-- 弹出框 -->
  <quotoDialog :dialogVisible="pushVisible" @changeDialog="changeDialog">
  </quotoDialog>
</div>
</template>

<script>
  import quote from "../js/quote.js";
  import quotoDialog   from  './quoting.vue';
  // import selectedRows   from  '../components/selected_rows.vue';
  import  urlRoot from  '../../../common/urlRoot';
  export default {
    data() {
      return {
        activeNames: ['1', '2'],
        monthRent: '',
        dataMsg: '',
        scfgDList: [],
        hEntity: {},
        payList: [],
        sCfgHPrmList: [],
        calculateFlag: '0',
        leaseTypeList: [],
        isShow1: false,
        pay: true,
        pushVisible: false,
        input: '',
        value2: true,
        value8: 0,
        value6: '',
        value: ''
      };
    },
    methods: {
      getData: function() {
        const vm = this;
        $.ajax({
          type: 'get',
          dataType: "json",
          contentType:'application/json',
          data: 'pk_scheme_cfg=',
          url:  urlRoot.urlWepper('fin/quote/toApply'),
          success: function(re){
              vm.scfgDList = re.detailMsg.data.schemeDList;
              vm.hEntity = re.detailMsg.data.hEntity;
              // 租赁方式数组
              vm.leaseTypeList = re.detailMsg.data.leaseTypeList;
              // 金融产品列表
              vm.sCfgHPrmList = re.detailMsg.data.sCfgHPrmList;
          }
        });
      },

      changeScheme() {
        const vm = this;
         $.ajax({
          type: 'get',
          dataType: "json",
          contentType:'application/json',
          data: 'pk_scheme_cfg='+vm.hEntity.pk_scheme_cfg,
          url:  urlRoot.urlWepper('fin/quote/toApply'),
          success: function(re){
              vm.scfgDList = re.detailMsg.data.schemeDList;
              vm.hEntity = re.detailMsg.data.hEntity;
              // 租赁方式数组
              vm.leaseTypeList = re.detailMsg.data.leaseTypeList;
              // 金融产品列表
              vm.sCfgHPrmList = re.detailMsg.data.sCfgHPrmList;
          }
        });
      },

      basicCalculation() {
        const vm = this;
        var quotoRst = quote.basicCalculation(vm.hEntity,vm.scfgDList);
        vm.hEntity = quotoRst.hEntity;
        vm.scfgDList = quotoRst.scfgDList;
      },

      clickMe:function(){
        this.pushVisible = true;
      },
      changeDialog: function(val) {
          this.pushVisible = val;
      },
      // 方案测算
      calculate() {
        // 表单验证非空
        var checkFlag = quote.calFormCheck(this.scfgDList);
        if(checkFlag === true){
          const vm = this;
          vm.hEntity.id_quotoschemedentity = vm.scfgDList;
          $.ajax({
            type:'post',
            dataType: 'json',
            contentType:'application/json',
            data: JSON.stringify(vm.hEntity),
            url: urlRoot.urlWepper('/fin/quote/doApplyCalculate'),
            success:function(re){
              vm.payList = re.detailMsg.data;
              vm.monthRent = re.detailMsg.data[0].zj;
              vm.calculateFlag = '1';
              vm.isShow1 = true;
            }
          });
        }
      },
      //报价保存
      doApplySave() {
        // 测算标识判断   需要做过测算 方可做保存
        if(this.calculateFlag === '0') {
          alert("请进行测算");
        } else if(this.calculateFlag === '2') {
          alert("不能重复保存");
        } else{
          const vm = this;
          vm.hEntity.id_quotoschemedentity = vm.scfgDList;
          $.ajax({
            type:'post',
            dataType: 'json',
            contentType:'application/json',
            data: JSON.stringify(vm.hEntity),
            url: urlRoot.urlWepper('/fin/quote/doApplySave'),
            success:function(re){
              vm.calculateFlag = '2';
              alert("保存成功!");
              console.log(re);
              location.hash = '/quoto/quotoMg';
            }
          });
        }
      }
    },

    components: {
      quotoDialog: quotoDialog,
    },

    watch: {
      changeDialog: function(val) {
        this.pushVisible = val;
      }
    },
    created(){
      this.getData();
    }
  };
</script>

<style>
  .quoto_list{
    padding:20px 30px;
    margin-bottom: 30px;
  }
  .quoto_list_tips{
    margin-bottom:10px;
    background: #d9edf7;
    color: #3a87ad;
  }
  .el-collapse-item__header span{
   font-weight: bold;
   margin-right:5px;

  }
  .list_title {
    background: #f5f8fa;
    font-size: 15px;
    border:1px solid #ddd;
    margin-top:20px;
    margin-left: 15px;
    height: 300px;
  }
  .quoto_list .list_title_img{
    /*width: 30%;*/
    margin: 20px 0;
    position: relative;
    height: 235px;
    width: 235px;
  }
  .list_title_left {
    height: 280px;
    margin-right: 0px;
  }
  .list_title_img img{
    width: 100%;
    height: 100%;
    max-height: 260px;
    max-width: 260px;
    position: absolute;
    border: 1px solid #ddd;
    /*margin-left: 11%;*/
    border-radius: 5px;
  }
  .list_title_info_right .list_title_tag{
    margin: 0 5px 0 0;
    font-size: 12px;
  }
  .list_title_info{
    width: 42%;
    height: 0px;
    padding-bottom:30%;
    float: right;
    position: absolute;
    top: 30px;
    right: 32%;

  }
  .list_title_left_left{
    margin-left: 20px;
    max-height: 300px;
  }
  .list_title_info_left{
    width: 20%;
  }
  .list_title_info_left div.list_title_label,
  .list_title_info_right div.list_title_content{
    heigth: 36px;
    line-height: 36px;
    margin: 3px 0 7px 0;
  }
  .list_title_info_right .el-input{
    width: 80%;
  }
  .list_title_info_right{
    width: 75%;
    height: 300px;
    position: absolute;
    top: 0px;
    right: 0px;
  }
  .list_title_info_right .el-select,
  .list_title_info_right .el-input{
    width: 100%;
    max-width: 300px;
  }
  .list_title_btn{
    position: absolute;
    bottom: 10px;
    right: 10px;
  }
  .list_title_btn .el-button{
    font-size:12px;
    border-radius: 5px;
  }
  .list_title_right{
    width: 90%;
    margin:20px;
    height: 280px;
    background: #f5f8fa;
    font-size: 15px;
    border:1px solid #ddd;
  }
  .list_title_right_info{
    margin-left: 35px;
    margin-top: 20px;
  }
  .list_title_right_title{
    padding-top: 25px;
    font-size: 17px;
    font-weight: bold;
    margin-left:35px;
  }
  .list_title_right .el-input{
    width: 60%;
  }
  /* 金融方案 */
  .list_main{
    margin:20px 10px 20px 15px;
/*    height: 500px;*/
    background: #f5f8fa;
    border:1px solid #ddd;
    position: relative;
  }
  .list_main_title{
    font-size: 17px;
    font-weight: bold;
    margin:20px 0px 20px 25px;
  }
  .list_main_left{
    margin-left: 5%;
  }
  .list_main_left .el-col {
   /* margin-right: 2%;*/
/*    margin-left: 5%;*/
  }
  .list_main_left .el-col span{
    font-size: 15px;
    margin-bottom: 3px;
  }
  .list_main_left .el-col p{
    margin: 8px 0px;
  }
  .list_bottom{
    width: 99%;
    height: 500px;
    background: #f5f8fa;
    border:1px solid #ddd;
  }
  .list_main_button{
    position: absolute;
    bottom: 20px;
    right: 20px;
/*    margin-top:50px;*/
  }
  .list_main_button .el-button{
    border-radius: 5px;
  }
  .list_main_choice .el-select {
    margin-left: 14%;

    margin-top: 42px;
  }
  .list_main_choice .el-input{
    width: 85%;

  }
/*  .el-select-dropdown__item {
    overflow: none;
    height: 70px;
    width: 250px;
    white-space: normal;
  }*/
  .list_main_left .el-input{
    width: 80%;
  }
  .list_main_choice{
    margin-right: -10%;
  }
  .quoto_list .el-row{
    margin-bottom: 0px;
  }
  .list_main .el-select{
    width: 80%;
  }
  .list_main_left_container{
    margin-bottom: 10px;
  }
  .list_main_left_button{
    height: 100px;
  }
  .list_title_info_right .el-select>.el-input,
  .el-select.eleClass .el-input{
    width: 100%;
  }
</style>
 No newline at end of file
