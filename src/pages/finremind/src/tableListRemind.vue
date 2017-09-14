<template>
  <div class="tableListRemind">
    <!-- title -->
    <div class="title-header">
      <h2 class="name" >催收客户人员列表</h2>
    </div>
    <!-- 搜索框 -->
    <div id="search-container">
    <el-row>
      <el-col :span="18">
        <div class="fl">
        <el-form :inline="true">
          <el-form-item label="逾期等级">
            <el-select v-model="filter.sex" size="small" style="width:100px" placeholder="请选择">
              <el-option label="严重" value="严重"></el-option>
              <el-option label="一般" value="一般"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="是否还款">
            <el-select v-model="filter.isAbsence" size="small" style="width:100px" placeholder="请选择">
              <el-option label="是" value="是"></el-option>
              <el-option label="否" value="否"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="">
            <el-button type="primary" @click="createClick" size="primary" style="width:60px">查询</el-button>
          </el-form-item>

        </el-form>
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

    <div id="staff-list">
    <el-row type="flex" justify="center">
      <el-col :span="24">
        <el-table :data="tableData" empty-text="暂无数据……" border stripe   style="text-align: center">
          <el-table-column v-for="item in items" :prop="item.flag" :label="item.name">
          </el-table-column>
          <el-table-column prop="operate" label="操作">
            <template scope="scope">
              <el-button-group>
                <el-button @click="queryClick(scope)" type="primary" icon="search" size="small"></el-button>
                <el-button @click="editClick(scope)" type="primary" icon="edit" size="small"></el-button>
              </el-button-group>
            </template>
          </el-table-column>
         <!-- <el-table-column prop="operate" label="操作" width="100">
            <template scope="scope">
              <el-button-group>
                <el-button @click="editClick(scope)" type="primary" icon="edit" size="small"></el-button>
                <el-button @click="deleteClick(scope)" type="primary" icon="delete" size="small"></el-button>
  </el-button-group>
  </template>
  </el-table-column>-->
  </el-table>
  </el-col>
  </el-row>

  <!--分页实现效果图形功能的-->
  <el-row class="pagination" type="flex" justify="center" style="float: right;">
  <el-col :span="25">
  <!--分页begin-->
  <el-pagination class="pg"
:current-page="filter.pageIndex"
:page-sizes="[5, 10, 20, 50, 100]"
:page-size="filter.pageSize"
layout="total, sizes, prev, pager, next, jumper"
:total="total_rows"
@size-change="pageSizeChange"
@current-change="pageCurrentChange">
  </el-pagination>
  <!--分页end-->
  </el-col>
  </el-row>
  </div>
  <editForm :formData="editFormData" :finPayCode="finPayCodeDate" @onSubmit="onSubmit" :editRowIndex="editRowIndex" :editFormVisible="editFormVisible" @changeVisible="changeEditFormVisible"></editForm>

  <queryDetailRecord :formData="editFormDataDetail" :editRowIndex="editRowIndex" :editFormVisible="editFormVisibleDetail" @changeVisible="changeEditFormVisibleDetail"></queryDetailRecord>
  </div>
  </template>

  <script>
import editForm from './editRemindForm.vue';
import queryDetailRecord from '../../historylist//src/comprehensiveRent.vue';
import urlRoot from '../../../common/urlRoot';
export default {
    data() {
      return {
        finPayCodeDate: '',
        tableData: [{ pkFinRemindid: '张三', finCall: '13998577893', finCustormName: '河北省', finPayCode: 'z2017080800888-1' }],
        items2: [],
        items: [
          {
            flag: 'finCustormName',
            name: '客户名称',
          },
          {
            flag: 'finCall',
            name: '联系方式',
          },
          /*{
            flag: 'remark',
            name: '逾期等级',
            width: 200,
          },*/
          // {
          //   flag: 'finCustormName',
          //   name: '省',
          // },
          // {
          //   flag: 'finCity',
          //   name: '市',
          // },
           {
             flag: 'pay_code',
             name: '支付表号',
           },
          // {
          //   flag: 'finOverdueAomunt',
          //   name: '本次逾期金额',
          // },
          // {
          //   flag: 'finPenaltyAmout',
          //   name: '本次罚息金额',
          // },
          {
            flag: 'pay_money',
            name: '逾期金额合计',
          },
          {
            flag: 'overdue_days',
            name: '本次逾期天数',
          },
          {
            flag: 'finOverdueMaxdays',
            name: '最大逾期天数',
          },
          /*{
            flag: 'overdue_days',
            name: '累计逾期天数',
          },*/
          // {
          //   flag: 'finFincingAmount',
          //   name: '融资额',
          // },
          // {
          //   flag: 'finRentDay',
          //   name: '起租日',
          // },
          // {
          //   flag: 'finAgreeRepayment',
          //   name: '承诺还款时间',
          // },
          // {
          //   flag: 'finYesCar',
          //   name: '是否已收车',
          // },
          // {
          //   flag: 'finYesLaw',
          //   name: '是否已诉讼',
          // },
        ],
        filter: {
          pageSize: 10, //页大小
          pageIndex: 1, // 当前页
          isAbsence: '',
          keywords: '',
        },
        editFormVisible: false,
        editFormVisibleDetail: false,
        editFormData: [],
        editFormDataDetail: [],
        editRowIndex: -1,
      };
    },
    components: {
      editForm, queryDetailRecord,
    },
    methods: {
      getData() {
        const str = window.location.href.split('?');
        const ovd = str[1].split('=');
        this.OverdueState = ovd[1];
        const vm = this;
        $.ajax({
          type: 'get',
          dataType: 'json',
          data: `OverdueState=${this.OverdueState}`,
          url: urlRoot.urlWepper('fin/remind/list'),
          success(re){
            vm.tableData = re.detailMsg.data;
          },
        });
      },
    goBack() {
      history.go(-1);
    },
     /* createClick:function(){
        this.editRowIndex = -1;
        const crateFormData ={
          ifbpFinCode:'',
          ifbpFinOpttype:'',
          ifbpFinName:'',
          creater:'',
          remark:'',
        };
        this.editFormVisible = true;
        this.editFormData = crateFormData;
      },*/
      //列表编辑界面操作，获取序列号，初始化时加载editFormVisible，然后获取列表的数据，并将值渲染到editFormData
      editClick(scope) {
        this.editRowIndex = scope.$index;
        this.editFormVisible = true;
        const rowData = this.getDataItem(this.editRowIndex);
        //const rowData = this.getDataItemById(scope.row.uId);
        this.editFormData = $.extend(true, {}, rowData);
        //alert(JSON.stringify(this.editFormData.finCall));
        //获取支付表号
        //this.finPayCodeDate=this.editFormData.finPayCodeDate;
      },
      queryClick(scope){
        this.editRowIndex = scope.$index;
        this.editFormVisibleDetail = true;
        const rowData = this.getDataItem(this.editRowIndex);
        this.editFormDataDetail = $.extend(true, {}, rowData);
      },
      //修改数据后，获取this.editRowIndex的初始化值，并将值渲染到列表中
      onSubmit(formData) {
        if(this.editRowIndex > -1){
          this.tableData.splice(this.editRowIndex, 1, formData);
        } else {
          this.tableData.push(formData);
        }
      },
      getDataItem(index) {
        return this.tableData[index];
      },
      changeEditFormVisible(val) {
        this.editFormVisible = val;
      },
      changeEditFormVisibleDetail(val){
        this.editFormVisibleDetail = val;
      }
    },
    pageSizeChange(pageSize) {
          this.pageSize = pageSize;
          this.getData();
    },
    pageCurrentChange(pageIndex) {
          this.pageIndex = pageIndex;
          this.getData();
    },
    created(){
      this.getData();
    },
    computed: {
      total_rows(){
        return this.tableData.length;
      }
    }
  };
</script>
<style>
  .filterBox, .pagination { margin:20px 0; }
  .divBox { margin-bottom: 50px }
  .searchBox{ padding-top: 3px }
  .tableListRemind{
    padding:20px 30px;
  }
</style>
