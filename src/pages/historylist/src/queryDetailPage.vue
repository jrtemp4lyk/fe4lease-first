<template>
  <div class="container">
    <el-dialog :title="editRowIndex > -1 ? '催收动作' : '新增创建'" v-model="s_editFormVisible" size="large" :modal="false">
     <!-- <el-tabs type="card" class="index"
               @tab-click="tabClick"
               v-model="tabActiveName">
        &lt;!&ndash; table &ndash;&gt;
        <div style="position: relative; margin-top: 20px;">
          <el-tabs class="nav-business">
            <el-tab-pane label="电话催收">
              <el-table
                :data="tableData"
                border
                tooltip-effect="dark"
                style="width: 100%"
                @selection-change="handleSelectionChange">
                <el-table-column v-for="item in items" :prop="item.flag" :label="item.name" :width="item.width">
                </el-table-column>
              </el-table>-->
           <el-form ref="formData" :model="formData" label-width="100px" :inline="true" >
              <div v-if="this.formData.finRemindType =='电话催收'">
                <el-form-item label="电话拨打情况" >
                  <el-input v-model="formData.finTelSituate" :disabled="editRowIndex > -1"></el-input>
                </el-form-item>
                <el-form-item label="电话状态" >
                  <el-input v-model="formData.finTelStatue" :disabled="editRowIndex > -1"></el-input>
                </el-form-item>
                <el-form-item label="联系结果说明" >
                  <el-input v-model="formData.finContactResult" :disabled="editRowIndex > -1"></el-input>
                </el-form-item>
                <el-form-item label="逾期原因">
                   <el-input v-model="formData.finOvderueReason" :disabled="editRowIndex > -1"></el-input>
                </el-form-item>
                <el-form-item label="逾期描述">
                  <el-input v-model="formData.finOverDesribe"  :disabled="editRowIndex > -1"></el-input>
                </el-form-item>
                <el-form-item label="还款承诺">
                  <el-input v-model="formData.finTelJudge" :disabled="editRowIndex > -1"></el-input>
                </el-form-item>
                <el-form-item label="租赁物使用情况">
                  <el-input v-model="formData.finThingsSituate" :disabled="editRowIndex > -1"></el-input>
                </el-form-item>
                <el-form-item label="判断是否还款">
                  <el-input v-model="formData.finJudgeRepayment" :disabled="editRowIndex > -1"></el-input>
                </el-form-item>
                <el-form-item label="是否重点关注">
                  <el-radio class="radio" v-model="formData.finYesnoFollow" label="1" :disabled="editRowIndex > -1">是</el-radio>
                  <el-radio class="radio" v-model="formData.finYesnoFollow" label="1" :disabled="editRowIndex > -1">否</el-radio>
                </el-form-item>
            </div>
             <!--加载现场催收的详情界面-->
             <div v-if="this.formData.finRemindType =='现场催收'">
               <el-form-item label="现场任务人" >
                 <el-input v-model="formData.creator" :disabled="editRowIndex > -1"></el-input>
               </el-form-item>
               <el-form-item label="任务开始时间">
                 <el-input v-model="formData.creationtime" :disabled="editRowIndex > -1"></el-input>
               </el-form-item>
               <el-form-item label="入场时间">
                 <el-input v-model="formData.entryTime" :disabled="editRowIndex > -1"></el-input>
               </el-form-item>
               <el-form-item label="入场地址">
                 <el-input v-model="formData.entryAdress"  :disabled="editRowIndex > -1"></el-input>
               </el-form-item>
               <el-form-item label="离场时间">
                 <el-input v-model="formData.leaveTime" :disabled="editRowIndex > -1"></el-input>
               </el-form-item>
               <el-form-item label="离场地址">
                 <el-input v-model="formData.leaveAdress" :disabled="editRowIndex > -1"></el-input>
               </el-form-item>
               <el-form-item label="现场见到">
                 <el-input v-model="formData.seeOwner" :disabled="editRowIndex > -1"></el-input>
               </el-form-item>
               <el-form-item label="逾期原因">
                 <el-input v-model="formData.overdueReason" :disabled="editRowIndex > -1"></el-input>
               </el-form-item>
               <el-form-item label="租赁物情况">
                 <el-input v-model="formData.leaseProperty" :disabled="editRowIndex > -1"></el-input>
               </el-form-item>
               <el-form-item label="还款承诺">
                 <el-radio class="radio" v-model="formData.repaymentPromise" label="1" :disabled="editRowIndex > -1">是</el-radio>
                 <el-radio class="radio" v-model="formData.repaymentPromise" label="1" :disabled="editRowIndex > -1">否</el-radio>
               </el-form-item>
               <el-form-item label="现场还款">
                 <el-input v-model="formData.sceneRepayment" :disabled="editRowIndex > -1"></el-input>
               </el-form-item>
               <el-form-item label="现场人员描述">
                 <el-input v-model="formData.SceneRemark" :disabled="editRowIndex > -1"></el-input>
               </el-form-item>
             </div>
            <!--加载强制收回的详情界面-->
          <div class="forceBack" v-if="this.formData.finRemindType ==='强制收回'">
                  <el-form-item label="收回方">
                    <el-input v-model="formData.backPerson" :disabled="editRowIndex > -1"></el-input>
                  </el-form-item>
                  <el-form-item label="租赁物所在地">
                    <el-input v-model="formData.leaseLocation" :disabled="editRowIndex > -1"></el-input>
                  </el-form-item>
                  <el-form-item label="收回开始时间">
                    <el-input type="date" v-model="formData.backStarttime" :disabled="editRowIndex > -1"></el-input>
                  </el-form-item>
                  <el-form-item label="收回结束时间">
                    <el-input type="date" v-model="formData.backEndtime" :disabled="editRowIndex > -1"></el-input>
                  </el-form-item>
                  <el-form-item label="其他费用">
                    <el-input v-model="formData.otherCharges" :disabled="editRowIndex > -1"></el-input>
                  </el-form-item>
                  <el-form-item label="收回状态">
                    <el-radio class="radio" v-model="formData.backState" label="1" :disabled="editRowIndex > -1">已收回</el-radio>
                    <el-radio class="radio" v-model="formData.backState" label="2" :disabled="editRowIndex > -1">未收回</el-radio>
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
                  <div>
                    <el-form-item label="收回原因">
                      <textarea style="width:670%" cols="8" rows="4" v-model="formData.backReason" :disabled="editRowIndex > -1"></textarea>
                    </el-form-item>
                  </div>
                  <div>
                    <el-form-item label="收回备注">
                      <textarea style="width:670%" cols="8" rows="4" v-model="formData.backRemark" :disabled="editRowIndex > -1"></textarea>
                    </el-form-item>
                  </div>
            </div>
            <!--加载诉讼的想去界面-->
            <div class="lawsuit" v-if="this.formData.finRemindType ==='诉讼'" >
                <h4>诉讼</h4>
                <el-form-item label="跟进日期">
                  <el-input  v-model="formData.followDate" :disabled="editRowIndex > -1"></el-input>
                </el-form-item>
                <el-form-item label="阶段">
                  <el-input v-model="formData.lawsuitPeriod" :disabled="editRowIndex > -1"></el-input>
                </el-form-item>
                <el-form-item label="诉讼状态">
                  <el-input v-model="formData.lawsuitState" :disabled="editRowIndex > -1"></el-input>
                </el-form-item>
                <el-form-item label="执行状态">
                  <el-input v-model="formData.executeState" :disabled="editRowIndex > -1"></el-input>
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
                  <el-input  v-model="formData.planFollowDate" :disabled="editRowIndex > -1"></el-input>
                </el-form-item>
                <el-form-item label="缴纳诉讼费">
                  <el-input v-model="formData.lawsuitCost" :disabled="editRowIndex > -1"></el-input>
                </el-form-item>
                <el-form-item label="申请公告">
                  <el-input v-model="formData.applyNotice" :disabled="editRowIndex > -1"></el-input>
                </el-form-item>
                <el-form-item label="是否缴纳公告费">
                  <el-radio class="radio" v-model="formData.payYesnoNotice" label="1" :disabled="editRowIndex > -1">是</el-radio>
                  <el-radio class="radio" v-model="formData.payYesnoNotice" label="2" :disabled="editRowIndex > -1">否</el-radio>
                </el-form-item>
                <el-form-item label="是否付律师费">
                  <el-radio class="radio" v-model="formData.payYesnoLower" label="1" :disabled="editRowIndex > -1">是</el-radio>
                  <el-radio class="radio" v-model="formData.payYesnoLower" label="2" :disabled="editRowIndex > -1">否</el-radio>
                </el-form-item>
            </div>
       </el-form>
        <!--</div>
        <el-tab-pane v-for="(tab,index) in routeCards"
                     :name="tab.path"
                     :closable="valueTrue"
                     style="margin-left: 20px;"
                     :label="tab.label">
          <div :is="tab.component"></div>
        </el-tab-pane>
      </el-tabs>-->
    </el-dialog>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        activeName: 'second',
        valueTrue: true,
        valueFalse: false,
        tableData: [{creater:"张三",finPayCode:"13998577893",finCustormName:"河北省"}],
        items: [{
          flag: 'creater',
          name: '客户名称',
          width: 100,
        },
          {
            flag: 'finPayCode',
            name: '联系方式',
            width: 100,
          },
          {
            flag: 'finCustormName',
            name: '支付表号',
            width: 100,
          }],
        s_editFormVisible: false,
        multipleSelection: [],
        routeCards:[],
        tabActiveName:'',
      };
    },
    props:['menuList','formData','editFormVisible', 'editRowIndex'],
    components: {

    },
    methods: {
      getData: function() {
        const vm = this;
        $.ajax({
          type: 'get',
          dataType: "json",
          url: 'fin/dic/list',
          success: function(re){
            vm.tableData=re.content;
          },
        });
      },

      handleClick(tab, event) {
        console.log(tab, event);
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      tabClick(){
        console.log(this);
        this.$parent.$router.push(this.tabActiveName);
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
    created(){
        /*if(this.formData.finRemindType=='强制收回' || this.formData.finRemindType=='诉讼'){
            $(".forceBack").hide;
            $(".lawsuit").hide;
        }*/
      this.getData();
      console.log(this.list);
    }
  };
</script>

