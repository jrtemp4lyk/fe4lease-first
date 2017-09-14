<template>
  <div class="tableListHisRemind">
    <div class="title-header">
      <h2 class="name" >催收历史</h2>
    </div>
    <!-- 搜索框 -->
    <div id="search-container">
      <div class="fr">
        <el-button type="primary" @click="goBack">返回</el-button>
      </div>
    </div>
    <!-- 内容 -->
    <div id="staff-list">
      <el-row  justify="center">
        <el-col :span="24">
          <el-table :data="tableData" empty-text="暂无数据……" border stripe  style=" width:100%; text-align: center">


            <el-table-column v-for="item in items" :prop="item.flag" :label="item.name" :width="item.width"
            :fixed="item.fixed">
            </el-table-column>

            <el-table-column prop="operate" label="操作">
              <template scope="scope">
                <el-button-group>
                  <el-button @click="queryClick(scope)" type="primary" icon="search" size="small"></el-button>
                </el-button-group>
              </template>
            </el-table-column>

          </el-table>
        </el-col>
      </el-row>
        <!--分页begin-->
      <el-pagination id="staff-pagination"
                     :current-page="filter.pageIndex"
                     :page-sizes="[5, 10, 20, 50, 100]"
                     :page-size="filter.pageSize"
                     layout="total, sizes, prev, pager, next, jumper"
                     :total="total_rows"
                     @size-change="pageSizeChange"
                     @current-change="pageCurrentChange">
      </el-pagination>
       <!--分页end-->
    </div>
    <!-- 点击查看 详情页 -->
    <queryForm :formData="editFormData"  @onSubmit="onSubmit" :editRowIndex="editRowIndex" :editFormVisible="editFormVisible" @changeVisible="changeEditFormVisible"></queryForm>
  </div>
</template>

<script>
  import queryForm from './comprehensiveRent';
  import  urlRoot from  '../../../common/urlRoot';
  export default {
    data() {
      return {
        tableData: [{
        finCustormName:"张三",
        finCall:"18244444444",
        finProvice:"河北",
        finCity:"乌鲁木齐市",
        finPayCode:"130222222222222222",
        finOverdueAomunt:"300.000.00",
        finPenaltyAmout:"300.000.00",
        finOverdueTotalamout:"99.999.999",
        finOverdueDays:"1000",
        finOverdueMaxdays:"1000",
        finOverdueTotaldyas:"1000",
        finFincingAmount:"100000000",
        finRentDay:"18244444444",
        finAgreeRepayment:"河北",
        remark:"是"
        }],
        items2: [],
        items: [
          {
            flag: 'finCustormName',
            name: '客户名称',
          },
          // {
          //   flag: 'finCall',
          //   name: '联系方式',
          // },
          // {
          //   flag: 'finProvice',
          //   name: '省',
          // },
          // {
          //   flag: 'finCity',
          //   name: '市',
          // },
          // {
          //   flag: 'finPayCode',
          //   name: '支付表号',
          // },
          {
            flag: 'finOverdueAomunt',
            name: '本期逾期金额',
          },
          // {
          //   flag: 'finPenaltyAmout',
          //   name: '本次罚息金额',
          // },
          {
            flag: 'finOverdueTotalamout',
            name: '逾期金额合计',
          },
          {
            flag: 'finOverdueDays',
            name: '本次逾期天数',
          },
          {
            flag: 'finOverdueMaxdays',
            name: '最大逾期天数',
          },
          {
            flag: 'finOverdueTotaldyas',
            name: '累计逾期天数',
          },
          // {
          //   flag: 'finFincingAmount',
          //   name: '融资额',
          // },
          /*{
            flag: 'finMoreCapital',
            name: '剩余本金',
            width: 200,
          },*/
          // {
          //   flag: 'finRentDay',
          //   name: '起租日',
          // },
          {
            flag: 'finAgreeRepayment',
            name: '承诺还款时间',
          },
          // {
          //  flag: 'remark',
          //  name: '是否已收车',
          //  },
          //  {
          //  flag: 'remark',
          //  name: '是否已诉讼',
          //  },
        ],
        filter: {
          pageSize: 10, //页大小
          pageIndex: 1, // 当前页
          isAbsence: '',
          keywords: '',
        },
        editFormVisible: false,
        editFormData: [],
        editRowIndex: -1,
      };
    },
    components:{
      queryForm,
    },
    methods: {
      getData: function() {
        const vm = this;
        $.ajax({
          type: 'get',
          dataType: "json",
          url: urlRoot.urlWepper('fin/remind/list'),
          success: function(re){
            //alert(JSON.stringify(re));
            vm.tableData=re.content;
          },
        });
      },
      goBack() {
        history.go(-1);
      },
      //列表编辑界面操作，获取序列号，初始化时加载editFormVisible，然后获取列表的数据，并将值渲染到editFormData
      queryClick: function(scope) {
        this.editRowIndex = scope.$index;
        this.editFormVisible = true;
        const rowData = this.getDataItem(this.editRowIndex);
        //const rowData = this.getDataItemById(scope.row.uId);
        this.editFormData = $.extend(true, {}, rowData);
      },
      //修改数据后，获取this.editRowIndex的初始化值，并将值渲染到列表中
      onSubmit: function(formData) {
        if(this.editRowIndex > -1){
          this.tableData.splice(this.editRowIndex, 1, formData);
        } else {
          this.tableData.push(formData);
        }
      },
      getDataItem: function(index) {
        return this.tableData[index];
      },
      changeEditFormVisible: function(val) {
        this.editFormVisible = val;
      }
    },
    pageSizeChange: function(pageSize) {
      this.pageSize=pageSize;
      this.getData();
    },
    pageCurrentChange: function(pageIndex) {
      this.pageIndex=pageIndex;
      this.getData();
    },
    created(){
      this.getData();
    },
    computed:{
      total_rows:function(){
        return this.tableData.length;
      }
    }
  };
</script>
<style>
  .formTitle span { margin:20px 0; line-height:6px}
  .divBox { margin-bottom: 50px }
  .searchBox{ padding-top: 3px }
  .tableListHisRemind {
    padding:20px 30px;
  }
</style>
