<template>
 <div class="AssetScreen">
     <!-- 标题 -->
  <!-- <div class="formTitle font_default"><span style="width:100%;text-align:center;">资产管理</span> -->
    <div class="title-header">
      <h2 class="name" >资产管理</h2>
    </div>

    <!-- 表头 -->
    <div id="search-container">
    <el-row>
      <el-col :span="18">
        <div class="fl">
          <el-button type="primary" @click="createClick" size="primary" style="width:60px">预览</el-button>
        </div>
      </el-col>     
      <el-col :span="4">
        <div class="fr">
        <el-search-form class="searchBox" :keywords="filter.keywords" @searchClick="searchClick" @inputChange="inputChange"></el-search-form>
        </div>
      </el-col>
      <el-col :span="2">
        <div class="fr">
          <el-button type="primary" @click="goBack">返回</el-button>
        </div>
      </el-col> 

    </el-row>
    </div>

    <div  id="staff-list">
      <el-form :inline="true" :model="QueryTemplet" >
<!--         <el-form-item label="状态" >
          <el-select v-model="QueryTemplet.fin_status" placeholder="状态">
            <el-option label="全部" value=""></el-option>
            <el-option label="可选" value="0"></el-option>
            <el-option label="已被选" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="客户类型">
          <el-select v-model="QueryTemplet.customer_type" placeholder="客户类型">
            <el-option label="全部" value=""></el-option>
            <el-option label="个人" value="0"></el-option>
            <el-option label="企业" value="1"></el-option>
          </el-select>
        </el-form-item> -->
        <el-form-item label="融资基数">
          <el-select v-model="QueryTemplet.fin_base" placeholder="融资基数">
            <el-option label="全部" value=""></el-option>
            <el-option label="设备金额" value="0"></el-option>
            <el-option label="剩余本金" value="1"></el-option>
            <el-option label="剩余租金" value="2"></el-option>
            <el-option label="融资额" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="计划融资日期">
            <el-date-picker
              v-model="QueryTemplet.plan_fintime1"
              type="date"
              placeholder="选择日期"
              :picker-options="disabledDate">
            </el-date-picker>
        </el-form-item>
        <el-form-item label="--">
            <el-date-picker
              v-model="QueryTemplet.plan_fintime2"
              type="date"
              placeholder="选择日期"
              :picker-options="disabledDate">
            </el-date-picker>
        </el-form-item>
        <el-form-item label="是否有保险">
          <el-select v-model="QueryTemplet.isInsurance" placeholder="是否有保险">
            <el-option label="全部" value=""></el-option>
            <el-option label="否" value="0"></el-option>
            <el-option label="是" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="租赁期数 ">  
          <el-input v-model="QueryTemplet.leaseterm1" placeholder="租赁期数"></el-input>
        </el-form-item>
        <el-form-item label="-- ">  
          <el-input v-model="QueryTemplet.leaseterm2" placeholder="租赁期数"></el-input>
        </el-form-item>
        <el-form-item label="剩余租赁期数"> 
          <el-input v-model="QueryTemplet.Remaining_leaseterm1" placeholder="剩余租赁期数"></el-input>
        </el-form-item>
        <el-form-item label="--"> 
           <el-input v-model="QueryTemplet.Remaining_leaseterm2" placeholder="剩余租赁期数"></el-input>
        </el-form-item>
        <el-form-item label="起租日期"> 
          <el-input v-model="QueryTemplet.rent_date1" placeholder="起租日期"></el-input>
        </el-form-item>
        <el-form-item label="--"> 
          <el-input v-model="QueryTemplet.rent_date2" placeholder="起租日期"></el-input>
        </el-form-item>
        <el-form-item label="逾期天数"> 
          <el-input v-model="QueryTemplet.overdue_days1" placeholder="逾期天数"></el-input>
        </el-form-item>
        <el-form-item label="逾期天数"> 
          <el-input v-model="QueryTemplet.overdue_days2" placeholder="逾期天数"></el-input>
        </el-form-item>
        <el-form-item label="支付表编号"> 
          <el-input v-model="QueryTemplet. payment_table_code" placeholder="支付表编号"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onQuery(QueryTemplet)">查询</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div id="staff-list">
    <el-row class="AssetScreen_tips"  type="flex"  >
          <el-col :span="3">
           <span>支付表数量:{{tableData2.length}}</span> 
          </el-col>
          <el-col :span="3">
            <span>项目金额:{{project_amount}}</span>
          </el-col>
    </el-row>
   <!-- 列表 -->
    
    <el-row type="flex" justify="center" style="width:100%">
      <el-col :span="24">
       <div style="overflow:auto" >
        <el-table
          v-loading.body="loading"
          :data="tableData"
          empty-text="暂无数据……"
          border
          stripe
          style="text-align: center"
           @select="selectsss">
          <el-table-column
         type="selection"
          width="55">
          </el-table-column>
          <el-table-column
            v-for="item in columns"
            :prop="item.flag"
            :label="item.name"
            :width="item.width"
            >
            <template scope="scope" :item="item">
              <div v-if="item.flag==='fin_status'">
                <span v-if="scope.row.fin_status===1 || scope.row.fin_status==='1'">已被选</span>
                <span v-else>可选</span>
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
    <!-- 分页 -->
    <el-row class="pagination" type="flex" justify="center" style="float:right;">
      <el-col :span="25">
        <!--分页begin-->
        <el-pagination class="pg"
          :current-page="pages.cur_page"
          :page-sizes="[1, 10, 20, 50, 100]"
          :page-size=pages.size
          layout="total, sizes, prev, pager, next, jumper"
          :total="pages.total_rows"
          @size-change="getData"
          @current-change="pageCurrentChange">
        </el-pagination>
        <!--分页end-->
      </el-col>
    </el-row>
    </div>
    <pack  :tabledata="tableData2"  :editFormVisible="editFormVisible" @changeVisible="changeEditFormVisible"  :form="editForm" @onSubmit="onSaveTable"></pack>
  
<!--   <AssetScreenAddTemplet   :editFormVisible="QueryTempletVisible"  @changeVisible="QueryTempletchangeVisible"></AssetScreenAddTemplet> -->
 </div>
</template>

<script>
import 'lodash'; /*加在效果*/
// import tableEdit  from  './../refinance/tableEdit.vue';/*预览界面*/
// import AssetScreenAddTemplet  from  './AssetScreenAddTemplet.vue';/*预览界面*/
import  urlRoot from  '../../../common/urlRoot';
import  pack from './Pack';
export default {
  data() {
    return {
      radio: '1',
      tableData: [],//主页面中数据
      tableData2: [],//预览中数据
      formData:[],//预览表单数据
      copyTableData: [],
      assetproject:[],//资源包
           payment_table_number:'',//支付表数量
      project_amount:0,//项目金额
      //列表界面的表格列
      // 项目方案参数
      QueryTemplet: {
          // fin_status: '',
          // customer_type:'',
          fin_base:'',
          plan_fintime1:'',
          plan_fintime2:'',
          isInsurance:'',
          leaseterm1:'',
          leaseterm2:'',
          Remaining_leaseterm1:'',
          Remaining_leaseterm2:'',
          rent_date1:'',
          rent_date2:'',
          overdue_days1:'',
          overdue_days2:'',
          payment_table_code:'',        
      },
      columns: [
        {
          flag: 'fin_status',
          name: '状态',
          // width: 130,
        },
        {
          flag: 'customer_name',
          name: '客户名称',
          // width: 70,
          fixed:true,
        },
        {
          flag: 'customer_type',
          name: '客户类型 ',
          // width: 70,
        },
        // {
        //   flag: 'contract_number',
        //   name: '合同编号',
        //   // width: 140,
        // },
        {
          flag: 'payment_table_code',
          name: '支付表编号',
          // width: 140,
        },
        {
          flag: 'rent_date',
          name: '起租日期 ',
          // width: 140,
        },
        {
          flag: 'lease_term',
          name: '租赁期限',
          // width: 200,
        },
                {
          flag: 'fin_amount',
          name: '可融资金额',
          // width: 140,
        },
        {
          flag: 'paid_rent',
          name: '已还租金  ',
          // width: 140,
        },
        {
          flag: 'unpaid_rent',
          name: '未还租金',
          // width: 200,
        },
        {
          flag: 'principal_returned',
          name: '已还本金',
          // width: 200,
        },
        {
          flag: 'outstanding_principal',
          name: '未还本金',
          // width: 200,
        },
        {
          flag: 'overdue_days ',
          name: '逾期天数',
          // width: 200,
        },
        // {
        //   flag: 'is_mortgage ',
        //   name: '是否抵押',
        //   // width: 200,
        // },
        // {
        //   flag: 'is_insurance ',
        //   name: '是否保险',
        //   // width: 200,
        // },
      ],
      // 过滤预留
      filter: {
        sex: '',
        keywords: '',
      },
      // 分页设置
      pages: {
        total_rows: 0,
        size: 10, // 页大小
        curPage: 1, // 当前页
        totalPages: 0,
      },
      editFormVisible: false,//是否显示预览界面
      QueryTempletVisible: false,//是否显示项目方案界面
      //editFormData: [],
      editRowIndex: -1,  //当前选择的行
      loading: false,   //表格加在蒙版
      editForm: {    // edit表单
        formData: [
          { key: 'assetproject_name', value: '' },
          { key: 'assetproject_code', value: '' },
          { key: 'fin_base', value: '' },
          { key: 'plan_finamount', value: '' },
          { key: 'plan_finperiod', value: '' },
          { key: 'fin_manager', value: '' },
          { key: 'phone_number', value: '' },
        ],
        settingData: [
          {
            label: '资产项目名称',  // 左边字段名
            el: 'input',                // 右边元素
            type: 'string',             // input时的元素类型
            placeholder: '请输入',      // 默认显示提示信息
            required: true,             // 是否必填
          },
          {
            label: '资产项目编号',  // 左边字段名
            el: 'input',                // 右边元素
            type: 'string',             // input时的元素类型
            placeholder: '请输入',      // 默认显示提示信息
            required: true,             // 是否必填

          },
          {
            label: '资产融资基数',  // 左边字段名
            el: 'select',                // 右边元素
            type: 'string',             // input时的元素类型
            placeholder: '请选择',           // 默认显示提示信息
            options: [
              {
                value: '0',
                label: '设备金额',
              },
              {
                value: '1',
                label: '剩余本金',
              },
              {
                value: '2',
                label: '剩余租金',
              },
              {
                value: '3',
                label: '融资额',
              },
            ],
            required: false,                  // 是否必填

          },
          {
            label: '计划融资金额', // 左边字段名
            el: 'input', 
            type: 'number',               // 右边元素
            placeholder: '请选择',           // 默认显示提示信息
            required: false,                  // 是否必填
          },
          {
            label: '计划融资期数',  // 左边字段名
            el: 'input', 
            type: 'number',                 //   
            placeholder: '请输入',          // 默认显示提示信息
            required: false,                // 是否必填
          },
          {
            label: '融资经理',  // 左边字段名
            el: 'input',                    // 右边元素
            type: 'string',
            placeholder: '请输入',          // 默认显示提示信息
            required: false,                // 是否必填
          },
          {
            label: '联系电话',  // 左边字段名
            el: 'input',                    // 右边元素
            type: 'string',
            placeholder: '请输入',          // 默认显示提示信息
            required: false,                // 是否必填
          },
        ],
        // formStyle 可选
        formStyle: {
          simpleColumn: false,         // 是否按单列显示，false表示按两列显示
          showButtons: true, // 是否显示底部保存和取消按钮，false表示不显示保存取消按钮
          styleObject: {      // 自定义form表单的样式
            width: '500px',
            margin: '0 auto',
          },

        },
      },
      selecteds:"",

    };
  },
  methods: {
    transCoding: function(str) {
      let str2 = '';
      str2 = str.replace(/(\\u)(\w{1,4})/gi,(str3) => {
          return (String.fromCharCode(parseInt((escape(str3).replace(/(%5Cu)(\w{1,4})/g,"$2")),16)));
      });
      str2 = str.replace(/(&#x)(\w{1,4});/gi,(str3) => {
          return String.fromCharCode(parseInt(escape(str3).replace(/(%26%23x)(\w{1,4})(%3B)/g,"$2"),16));
      });
      str2 = str.replace(/(&#)(\d{1,6});/gi,(str3) => {
          return String.fromCharCode(parseInt(escape(str3).replace(/(%26%23)(\d{1,6})(%3B)/g,"$2"),10));
      });
      return str2;
    },
    getDataItem: function(index) {
      return this.tableData[index];
    },
    disabledDate(time) {
      return time.getTime() < Date.now() - 8.64e7;
    },
    goBack() {
      history.go(-1);
    },
    AddTemplet() {
      // alert("success");
      this.QueryTempletVisible=true;
    },
    getData: function() {
      const vm = this;
      vm.tableData = [];
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
      },3000);
      vm.$http.post(urlRoot.urlWepper('/fin/assetscreen/queryall'),vm.pages)
        .then((re) => {
          let msg = '';
          if (re.data.success === 'success'){
            let metaData = {};
            if (re.data.detailMsg && re.data.detailMsg.data){
              metaData = re.data.detailMsg.data;
            }
            vm.tableData = (metaData.content instanceof Array) ? metaData.content : [];
            vm.pages.total_rows = metaData.totalElements;
            vm.pages.totalPages = metaData.totalPages;
            vm.pages.size = metaData.size;
            vm.pages.curPage = metaData.number;
            vm.copyTableData = _.cloneDeep(vm.tableData);
            this.loading = false;
          } else {
            if (re.data.success === 'fail_global') {
              msg = this.transCoding(re.data.message);
            } else if (re.data.success === 'fail_field') {
              console.log('error detailMsg:', re.data.detailMsg);
            }

            vm.$message({
              type: 'error',
              message: msg !=='' ? msg : '获取数据出错，请重试！'
            });

            this.loading = false;
          }
        })
        .catch(() => {
          vm.$message({
            type: 'error',
            message: '获取数据出错!'
          });
          this.loading = false;
        });
    },
    // 查询
    onQuery(QueryTemplet){
      const vm = this;
      vm.tableData = [];
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
      },3000);
      vm.$http.post(urlRoot.urlWepper('/fin/assetscreen/querypayPlanRefinance'),QueryTemplet)
        .then((re) => {
          let msg = '';
          if (re.data.success === 'success'){
            let metaData = {};
            if (re.data.detailMsg && re.data.detailMsg.data){
              metaData = re.data.detailMsg.data;
            }
            // debugger;
            vm.tableData = (metaData.content instanceof Array) ? metaData.content : [];
            vm.pages.total_rows = metaData.totalElements;
            vm.pages.totalPages = metaData.totalPages;
            vm.pages.size = metaData.size;
            vm.pages.curPage = metaData.number;
            vm.copyTableData = _.cloneDeep(vm.tableData);
            this.loading = false;
          } else {
            if (re.data.success === 'fail_global') {
              msg = this.transCoding(re.data.message);
            } else if (re.data.success === 'fail_field') {
              console.log('error detailMsg:', re.data.detailMsg);
            }

            vm.$message({
              type: 'error',
              message: msg !=='' ? msg : '获取数据出错，请重试！'
            });

            this.loading = false;
          }
        })
        .catch(() => {
          vm.$message({
            type: 'error',
            message: '获取数据出错!'
          });
          this.loading = false;
        });
    },
    // getDataItemById: function(id) {
    //   for(let i=0; i<this.tableData.length; i++){
    //     if(this.tableData[i].uId === id) {
    //       return this.tableData[i];
    //     }
    //   }
    //   return {};
    // },
    filterData: function() {
      // 按条件过滤本地数据
       const vm = this;
      /*eslint arrow-body-style: ["warn", "always"]*/
      return this.copyTableData.filter((item) => {
        return (typeof item.sex === 'string' ? item.sex : '').indexOf(vm.filter.sex) > -1 ||
               (typeof item.name === 'string' ? item.name : '').indexOf(vm.filter.keywords) > -1;
      });
    },
//  勾选行数据触发
    selectsss: function(selection,row) {
         // tableData2={};
        // console.log(selection);
      const vm = this;
      // alert(row);
      if(row.fin_status){
          selection.splice(row);
          vm.getAssetProjectByPk({pk_fin_assetproject:row.pk_fin_assetproject});
      }       
      // selecteds=selection;
      vm.tableData2=selection;
      // JSON.stringify(selection);
      // this.tableData2=selection;
      // alert(JSON.stringify(selection))
      var totleMoney=0;
      for(var i=0;i<selection.length;i++){
          totleMoney+=selection[i].fin_amount;
      }
      vm.project_amount=totleMoney;
    },
    // 查询资产包信息(用于选择校验)
    getAssetProjectByPk: function(pk) {
      const vm = this;
      vm.loading = true;
      setTimeout(() => {
        vm.loading = false;
      },3000);
      vm.$http.post(urlRoot.urlWepper('/fin/assetproject/getAssetProjectByPk'),pk)
        .then((re) => {
          let msg = '';
          if (re.data.success === 'success'){
            let metaData = {};
            if (re.data.detailMsg && re.data.detailMsg.data){
              metaData = re.data.detailMsg.data;
            }
            vm.loading = false;
            // alert(JSON.stringify(metaData.content));
            // this.assetproject[0]=metaData.content;
            vm.$message({
               showClose: true,
               message: '已经被加入资源包'+(metaData.content.assetproject_name)+'不允许再选择',
               type: 'error'
            });
          } else {
            if (re.data.success === 'fail_global') {
              msg = vm.transCoding(re.data.message);
            } else if (re.data.success === 'fail_field') {
              console.log('error detailMsg:', re.data.detailMsg);
            }

            vm.$message({
              type: 'error',
              message: msg !=='' ? msg : '获取数据出错，请重试！'
            });

            vm.loading = false;
          }
        })
        .catch(() => {
          vm.$message({
            type: 'error',
            message: '获取数据出错!'
          });
          vm.loading = false;
        });
    },


    // 查询触发
    searchClick: function(keywords) {
      console.log(keywords);
      this.getData();
      //调用api从后台获取查询数据
    },
    inputChange: function(keywords) {
      this.filter.keywords = keywords;
    },
    // 预览
    createClick: function () {
      this.editRowIndex = -1;
      console.log('createClick..');
      this.editFormVisible = true;
      const self = this;
      this.editForm.formData.forEach((item, index) => {   // 重置formData的value
        self.editForm.formData[index].value = '';
      });
      console.log("createclick..", this.editForm.formData);
    },
    // 编辑
    // editClick: function(scope) {
    //   console.log(scope);
    //   this.editRowIndex = scope.$index;
    //   this.editFormVisible = true;
    //   const rowData = this.getDataItem(this.editRowIndex);
    //   const self = this;
    //   //const rowData = this.getDataItemById(scope.row.uId);
    //   this.editForm.formData.forEach((item, index) => {   // 重置formData的value
    //     self.editForm.formData[index].value = rowData[item.key];
    //   });
    //   console.log("editclick..", this.editForm.formData);
    // },
    // setEditFormData() {

    // },
    onSaveTable: function(formData2) {
      const vm = this;
          vm.$http.post(urlRoot.urlWepper('fin/assetproject/save'),[formData2])
      .then((re) => {
        let msg = '';
        if (re.data.success === 'success'){
          // vm.tableData.unshift(formData2);
          vm.$message({
            type: 'info',
            message: '添加成功！'
          });
          vm.onQuery(vm.QueryTemplet);
        } else {
          if (re.data.success === 'fail_global') {
            msg = this.transCoding(re.data.message);
          } else if (re.data.success === 'fail_field') {
            console.log('error detailMsg:', re.data.detailMsg);
          }
          vm.$message({
            type: 'error',
            message: msg !=='' ? msg : '添加失败！'
          });
        }
      })
      .catch(() => {
        vm.$message({
          type: 'info',
          message: '添加失败！'
        });
      });
    },
    // deleteClick: function(scope) {
    //   const vm = this;
    //   this.$confirm('确定要删除吗?', '提示', {
    //       confirmButtonText: '确定',
    //       cancelButtonText: '取消',
    //       type: 'warning'
    //   }).then(() => {
    //       vm.$http.post('/ifbp-oa-user/user/del',[scope.row])
    //       .then((re) => {
    //         let msg = '';
    //         if (re.data.success === 'success'){
    //           vm.tableData.splice(scope.$index,1);
    //           vm.$message({
    //             type: 'success',
    //             message: '删除成功!'
    //           });
    //         } else {
    //           if (re.data.success === 'fail_global') {
    //             msg = this.transCoding(re.data.message);
    //           } else if (re.data.success === 'fail_field') {
    //             console.log('error detailMsg:', re.data.detailMsg);
    //           }
    //           vm.$message({
    //             type: 'error',
    //             message: msg !=='' ? msg : '删除失败！'
    //           });
    //         }
    //       }).catch(() => {
    //         vm.$message({
    //           type: 'error',
    //           message: '删除失败！'
    //         });
    //       });
    //   }).catch(() => {
    //       vm.$message({
    //         type: 'info',
    //         message: '已取消删除！'
    //       });
    //   });
    // },
    pageSizeChange: function() {
  
    },
    pageCurrentChange: function() {

    },
    changeEditFormVisible: function(val) {
      this.editFormVisible = val;
    },
    QueryTempletchangeVisible:function(val) {
      this.QueryTempletVisible = val;
    }
  },
  watch: {
    filter:{
      handler: function () {
        this.tableData = this.filterData();
      },
      deep: true,
    },
  },
  created: function(){
    // this.getData();
    this.onQuery({});
  },
  components: {
    // quickStartEdit,
    // tableEdit,
    pack,
    // AssetScreenAddTemplet,
  },
};
</script>
<style>
.filterBox, .pagination { margin:20px 0; }
.divBox { margin-bottom: 50px }
.searchBox{ padding-top: 3px }
.AssetScreen{
    padding:20px 30px; 
  }
 .AssetScreen_tips {
  font-size: 15px;
  margin-bottom: 25px;
 }
</style>
