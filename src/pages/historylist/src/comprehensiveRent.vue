<template>
  <div class="container">
    <el-dialog :title="editRowIndex > -1 ? '综合信息' : '新增创建'" v-model="s_editFormVisible" size="large" >
      <el-tabs type="card"
               @tab-click="tabClick"
               v-model="tabActiveName">
        <!-- table -->
        <div style="position: relative; margin-top: 20px;">
          <el-tabs class="nav-business">
            <el-tab-pane label="客户信息">
              <!--加载电话催收的页面-->
              <queryCuConDetail :formData="formDataConDetail" :finPayCode="formData.finPayCode"></queryCuConDetail>
            </el-tab-pane>

            <!-- 合同信息 -->
            <el-tab-pane label="合同信息">
              <!--<editForceBack :formData="formDataForceBack" :finPayCode=formData.finPayCode></editForceBack>-->
            </el-tab-pane>
            <!-- 还款情况 -->
            <el-tab-pane  label="还款情况">
            <h4 style="margin-top:15px">还款情况</h4>
              <el-table
                :data="tableData"
                border
                tooltip-effect="dark"
                style="width: 100%; margin-top:15px;text-align: center"
                @selection-change="handleSelectionChange">
                <el-table-column v-for="item in items" :prop="item.flag" :label="item.name" :width="item.width">
                </el-table-column>
              </el-table>
              <!--<editLawSuit :formData="formDataLawSuit" :finPayCode=formData.finPayCode></editLawSuit>-->
            </el-tab-pane>
            <!-- 催收记录 -->
            <el-tab-pane label="催收记录">
              <h4 style="margin-top:15px">催收记录</h4>
              <queryRecord :formData="formDataRecord"></queryRecord>
            </el-tab-pane>
          </el-tabs>
          <div style="position: absolute; top: -5px; right: 5px">
            <el-button-group>
              <el-button type="default" icon="pt-shuaxin"></el-button>
              <el-button type="default" icon="pt-gengduo"></el-button>
            </el-button-group>
          </div>
        </div>
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
  import queryRecord from './tableListRecord.vue';
  import queryCuConDetail from './custContRepDetail.vue';
  export default {
    data(){
      return {
        tableData:[{period:"1",receipt_money:"10000",finCustormName:"12000",pay_date:"2017-7-3",finCall:"11000"}],
        formDataConDetail:"",
        formDataRecord:"",
        activeName: 'second',
        valueTrue: true,
        valueFalse: false,
        s_editFormVisible: false,
        multipleSelection: [],
        routeCards:[],
        tabActiveName:'',
        items:[
          {
            flag: 'period',
            name: '期次',
          },
          {
            flag: 'receipt_money',
            name: '租金',
          },
          {
            flag: 'finCustormName',
            name: '本金',
          },
          {
            flag: 'finCall',
            name: '利息',
          },
          {
            flag: 'pay_date',
            name: '还款时间',
          },
          {
            flag: 'finCall',
            name: '剩余本金',
          },
        ],
      };
    },
    props:['menuList','formData','editFormVisible', 'editRowIndex'],
    components:{
      queryRecord:queryRecord,
      queryCuConDetail:queryCuConDetail,
    },
    methods: {
      getData: function() {
       const vm = this;
       $.ajax({
       type: 'get',
       dataType: "json",
       url: 'fin/remind/queryRepaymentById',
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
      this.getData();
    }
  };
</script>
