<template>
  <div class="tableListDic" >
    <div class="title-header">
      <h2 class="name" >逾期级别</h2>
    </div>
    <div id="search-container">
      <div >
        <el-button class="fl" type="primary"  @click="createClick">新增</el-button>
        <el-button class="fr" type="primary" @click="goBack">返回</el-button>
      </div>
    </div>
    <div id="staff-list">
    <el-row type="flex" justify="center">
      <el-col :span="24">
        <el-table :data="tableData"  empty-text="暂无数据……"border stripe  style="width:100%; text-align: center">

          <el-table-column v-for="item in items" :prop="item.flag" :label="item.name">
          </el-table-column>
          <el-table-column prop="operate" label="操作">
            <template scope="scope">
              <el-button-group>
                <el-button @click="editClick(scope)" type="primary" icon="search" size="small"></el-button>
                <!--<el-button @click="editClick(scope)" type="primary" icon="edit" size="small"></el-button>-->
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
    <configForm :formData="editFormData" :editRowIndex="editRowIndex" @onSubmit="onSubmit" :editFormVisible="editFormVisible" @changeVisible="changeEditFormVisible"></configForm>
  </div>
</template>
<script>
  //导入条件搜索框和编辑界面的操作
  /*import searchForm from 'components/searchForm.vue';*/
  import configForm from './editConfigForm.vue';
  import urlRoot from '../../../common/urlRoot';
  export default {
    data() {
      return {
        tableData: [{ overdue_gradename: '电话催收', overdue_totaldyasname: '张三', ovuedue_amountname: '同意还钱', remark: '没有钱' }],
        //total_rows: 0,
        items: [
          {
            flag: 'overdue_gradename',
            name: '逾期级别',
          },
          {
            flag: 'overdue_totaldyasname',
            name: '本次逾期天数',
          },
          {
            flag: 'ovuedue_amountname',
            name: '本次逾期金额',
          },
          {
            flag: 'remark',
            name: '逾期备注',
          },
        ],
        filter: {
          pageSize: 10, //页大小
          pageIndex: 1, // 当前页
          sex: '',
          isAbsence: '',
          keywords: '',
        },
        editFormVisible: false,
        editFormData: [],
        editRowIndex: -1,
      };
    },
    props: ['formData'],
    components: {
      configForm
    },
    methods: {
      getData() {
      const vm = this;
      $.ajax({
        type: 'get',
        dataType: 'json',
        url: urlRoot.urlWepper('fin/config/list'),
        success(re){
        vm.tableData = re.content;
      }
      });
    },
      getDataItem(index) {
      return this.tableData[index];
    },
      goBack() {
        history.go(-1);
      },
      createClick(){
      this.editRowIndex = -1;
      const crateFormData = {
        overdue_grade: '',
        overdue_totaldyas: '',
        ovuedue_amount: '',
        remark: '',
      };
      this.editFormVisible = true;
      this.editFormData = crateFormData;
    },
      editClick(scope) {
      this.editRowIndex = scope.$index;
      this.editFormVisible = true;
      const rowData = this.getDataItem(this.editRowIndex);
      //const rowData = this.getDataItemById(scope.row.uId);
      this.editFormData = $.extend(true, {}, rowData);
    },
      onSubmit() {
      /* if(this.editRowIndex > -1){
       this.tableData.splice(this.editRowIndex, 1, formData);
       } else {
       this.tableData.push(formData);
       }*/
      this.getData();
    },
      pageSizeChange(pageSize) {
      this.pageSize = pageSize;
      this.getData();
    },
      pageCurrentChange(pageIndex) {
      this.pageIndex = pageIndex;
      this.getData();
    },
      changeEditFormVisible(val) {
      this.editFormVisible = val;
    },
    },
    watch: {
      filter: {
        deep: true,
      },
      tableData: {
        handler() {

      },
        deep: true,
      },
    },
    created(){
    this.getData();
  },
    computed: {
      total_rows() {
      return this.tableData.length;
    },
    },
  };
</script>
<style>
  .filterBox, .pagination { margin:20px 0; }
  .tableListDic{
    padding:20px 30px;
  }
  .el-table th {
    text-align:center;
  }
</style>
