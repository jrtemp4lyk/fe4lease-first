<template>
  <div class="tableListRemind">
    <!-- title -->
    <div class="title-header">
      <h2 class="name" >话诉模板配置列表</h2>
    </div>
    <!-- 搜索框 -->
    <div id="search-container">
      <el-row>
        <el-col :span="18">
          <el-col :span="4">
            <el-button class="fl" type="primary" @click="createClick">新增</el-button>
          </el-col>
          <div class="fl">
            <el-form :inline="true">
              <el-form-item label="类别">
                <el-select v-model="filter.isAbsence" size="small" style="width:160px" placeholder="请选择">
                  <el-option label="承租自然人" value="承租自然人"></el-option>
                  <el-option label="承租法人" value="承租法人"></el-option>
                </el-select>
              </el-form-item>
              <!--<el-form-item label="标题">
                <el-input v-model="filter.template_type" ></el-input>
              </el-form-item>-->
              <el-form-item label="">
                <el-button type="primary" @click="queryClick" size="primary" style="width:60px">查询</el-button>
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
                  <el-button @click="deleteTemplate(scope)" type="primary" icon="delete" size="small"></el-button>
                  <el-button @click="editClick(scope)" type="primary" icon="edit" size="small"></el-button>
                </el-button-group>
              </template>
            </el-table-column>
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
  </div>
</template>
<script>
  //导入条件搜索框和编辑界面的操作
  /*import searchForm from 'components/searchForm.vue';*/
  import editForm from './editTemplateForm.vue';
  import  urlRoot from  '../../../common/urlRoot';
  import ElRow from "ifbp-element/packages/row/src/row";
  export default {
    data() {
      return {
        tableData: [{template_type:"承租人自然人",title:"开场白",action_template:"您好，请问您是张三吗",remark:"开场白"}],
        //total_rows: 0,
        items: [
          {
            flag: 'template_type',
            name: '类别',
          },
          {
            flag: 'title',
            name: '标题',
          },
          {
            flag: 'action_template',
            name: '模板',
            width: 260,
          },
          {
            flag: 'remark',
            name: '备注',
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
    props:['formData'],
    components:{
      ElRow,
      editForm
    },
    methods: {
      getData: function() {
        const vm = this;
        $.ajax({
          type: 'post',
          dataType: "json",
          url: urlRoot.urlWepper('fin/config/queryTemplate'),
          success: function(re){
            vm.tableData=re.detailMsg.data;
          }
        });
      },
      goBack() {
        location.hash = '/appCenter';
      },
      getDataItem: function(index) {
        return this.tableData[index];
      },
      createClick: function () {
        // body...
        this.editRowIndex = -1;
        const createFormData = {
          title: '',
          template_type: '',
          action_template: '',
          remark: '',
        };
        this.editFormVisible = true;
        this.editFormData = createFormData;
      },
      editClick: function(scope) {
        this.editRowIndex = scope.$index;
        this.editFormVisible = true;
        const rowData = this.getDataItem(this.editRowIndex);
        //const rowData = this.getDataItemById(scope.row.uId);
        this.editFormData = $.extend(true, {}, rowData);
      },
      deleteTemplate:function(scope) {
        const vm=this;
        this.$confirm('确定要删除吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
           vm.$http.post(urlRoot.urlWepper('/fin/config/deleteTemplate'),[scope.row])
          .then((re) => {
            const msg = '';
            if (re.data.success === 'success'){
              vm.tableData.splice(scope.$index,1);
              vm.$message({
                type: 'success',
                message: '删除成功!'
              });
            } else {
              vm.$message({
                type: 'error',
                message: msg !=='' ? msg : '删除失败！'
              });
            }
          }).catch(() => {
            vm.$message({
              type: 'error',
              message: '删除失败！'
            });
          });
        }).catch(() => {
          vm.$message({
            type: 'info',
            message: '已取消删除！'
          });
        });
      },
      onSubmit: function(formData) {
        if(this.editRowIndex > -1){
          this.tableData.splice(this.editRowIndex, 1, formData);
        } else {
          this.tableData.push(formData);
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
      changeEditFormVisible: function(val) {
        this.editFormVisible = val;
      },
    },
    watch: {
      filter:{
        deep: true,
      },
      tableData: {
        handler: function() {

        },
        deep: true,
      },
    },
    created: function(){
      this.getData();
    },
    computed: {
      total_rows: function() {
        return this.tableData.length;
      },
    },
  };
</script>
<style>
  .filterBox, .pagination { margin:20px 0; }
  .divBox { margin-bottom: 50px }
  .searchBox{ padding-top: 3px }
  .tableListTemplate{
    padding:20px 30px;
  }
</style>
