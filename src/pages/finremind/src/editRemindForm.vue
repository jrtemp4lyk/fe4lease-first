<template>
  <div class="editRemindForm">
    <el-dialog :title="editRowIndex > -1 ? '催收动作' : '新增创建'" v-model="s_editFormVisible" size="large" :modal="true">
     <el-tabs type="card"
             @tab-click="tabClick"
             v-model="tabActiveName">
        <!-- table -->
        <div style="position: relative; margin-top: 20px;">
          <el-tabs class="nav-business">
            <el-tab-pane label="电话催收">
              <div v-if = "isTemplate">
                  <!--<el-button type="primary" @click="back">返回</el-button>-->
                  <TableTemplate></TableTemplate>
              </div>
              <div v-else>
                <el-table
                  :data="tableData"
                  border
                  tooltip-effect="dark"
                  style="width: 100%; margin-top:15px"
                  @selection-change="handleSelectionChange">
                  <el-table-column v-for="item in items" :prop="item.flag" :label="item.name">
                  </el-table-column>
                  <el-table-column label="操作">
                    <template scope="scope">
                      <el-button
                        size="small"
                        @click="handleEdit(scope.$index, scope.row)">发送短信</el-button>
                      <el-button
                        size="small"
                        type="danger"
                        @click="handleDelete(scope.$index, scope.row)">话术模板</el-button>
                    </template>
                  </el-table-column>
                </el-table>
                <div class="line"></div>
                <!--加载电话催收的页面-->
                <new-label :formData="formDataTel" :editFormVisible="editFormVisible" @changeVisible="changeVisible" :finPayCode="formData.finPayCode"></new-label>
              </div>

            </el-tab-pane>
            <el-tab-pane label="强制收回">
              <editForceBack :formData="formDataForceBack" @changeVisible="changeVisible" :finPayCode="formData.finPayCode"></editForceBack>
            </el-tab-pane>
            <el-tab-pane label="诉讼">
              <editLawSuit :formData="formDataLawSuit" @changeVisible="changeVisible" :finPayCode="formData.finPayCode"></editLawSuit>
            </el-tab-pane>
          </el-tabs>
<!--           <div style="position: absolute; top: -5px; right: 5px">
            <el-button-group>
              <el-button type="default" icon="pt-shuaxin"></el-button>
              <el-button type="default" icon="pt-gengduo"></el-button>
            </el-button-group>
          </div> -->

        </div>
        <!--customerRepay-->
        <!--<el-customer-repay></el-customer-repay>-->
      <el-tab-pane v-for="(tab,index) in routeCards"
                   :name="tab.path"
                   :closable="valueTrue"
                   style="margin-left: 20px;"
                   :label="tab.label">
        <div :is="tab.component"></div>
      </el-tab-pane>
     </el-tabs>
    </el-dialog>
  </div>
</template>
<script>
  import newLabel from './new-label.vue';
  import forceBack from './editForceBack.vue';
  import lawSuit from './editLawSuitForm.vue';
  // import  urlRoot from  '../urlRoot';
  import json from './remindList.json';
  import templateList from './tableListTemplate.vue';


  export default {
    data() {
      return {
        formDataTel:{finTelSituate:"",finTelStatue:"",finContactResult:"",finOverDesribe:"",finOvderueReason:"",finThingsSituate:"",finTelJudge:"",operatortime:"",finJudgeRepayment:"",finYesnoFollow:"",remark:""},
        formDataForceBack:
          {
              backPerson:"",
              leaseLocation:"",
              backStarttime:"",
              backEndtime:"",
              backState:"",
              otherCharges:"",
              backPlace:"",
              parkMoney:"",
              thingList:"",
              photoUpload:"",
              backReason:"",
              backRemark:""
          },
        formDataLawSuit:{
              followDate:"",
              lawsuitPeriod:"",
              lawsuitState:"",
              executeState:"",
              openInformation:"",
              courtName:"",
              contact:"",
              contactTel:"",
              courtAdress:"",
              firmName:"",
              firmContact:"",
              firmContactTel:"",
              firmcontactadress:"",
              followInstuction:"",
              planFollowDate:"",
              lawsuitCost:"",
              applyNotice:"",
              payYesnoNotice:"",
              payYesnoLower:"",
              planFollowSay:"",
              lawsuitReason:""
          },
        activeName: 'second',
        valueTrue: true,
        valueFalse: false,
        tableData: json.data,
        items: [{
            flag: 'remark',
            name: '联系人类型',
            width: 100,
          },
          {
            flag: 'creater',
            name: '联系人名称',
            width: 100,
          },
          {
            flag: 'pkFinId',
            name: '手机号',
            width: 100,
          }],
        s_editFormVisible: false,
        multipleSelection: [],
        routeCards:[],
        tabActiveName:'',
        isTemplate: false
       // map:[],
       // list: this.menuList?this.menuList:menu.data
      };
    },
    props:['menuList','formData','editFormVisible', 'editRowIndex'],
    components: {
      'new-label':newLabel,
      editForceBack:forceBack,
      editLawSuit:lawSuit,
      TableTemplate:templateList,
    },
    methods: {
      // getData: function() {
      //   const vm = this;
      //   $.ajax({
      //     type: 'get',
      //     dataType: "json",
      //     url: urlRoot.urlWepper('fin/dic/list'),
      //     success: function(re){
      //       //alert(JSON.stringify(re));
      //       vm.tableData=re.content;
      //     },
      //   });
      // },


      handleClick(tab, event) {
        console.log(tab, event);
      },
      changeVisible(value){
        this.$emit('changeVisible', value);
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      tabClick(){
        console.log(this);
        this.$parent.$router.push(this.tabActiveName);
      },
     /* getRouteMap(list){
        var tmp = {};
        var getChild = function(array){
          array.forEach((v) => {
            if(v.children){
              getChild(v.children);
            }else{
              tmp[v.value] = v;
            }
          });
        };
        getChild(list);
        return tmp;
      },*/
      onCancel() {
        this.s_editFormVisible = false;
      },
      handleDelete(){
        this.isTemplate = true;
      },
      back(){
        this.isTemplate = false;
      }
    },

    watch: {
      editFormVisible: function(value) {
          console.log('change');
        this.s_editFormVisible = value;
      },
      s_editFormVisible: function(value) {
        this.$emit('changeVisible', value);
      },
    },

    created(){
      //this.getData();
      this.map = this.getRouteMap(this.list);
    }
  };
</script>

<style scoped>
  .line {
    height: 1px;
    width: 100%;
    position: inherit;
    margin-bottom: 20px;
    margin-top: 20px;
    background: #eef3f6;
  }
</style>
