<template>
  <div class="schemeCfgPage">

    <!-- title -->
    <div class="title-header">
      <h2 class="name" >产品方案</h2>
    </div>
    <!-- container -->

    <div id="search-container">
      <el-row>
          <el-col :span="18">
            <div class="fl">
              <el-button type="primary"  @click="createClick">新增</el-button>
              <!-- <el-button type="primary" @click="goBack">返回</el-button> -->
            </div>
          </el-col>
          <el-col :span="4">
            <div class="fr">
              <searchForm class="searchBox" :keywords="filter.keywords" @searchClick="searchClick" @inputChange="inputChange"></searchForm>
              <el-search-form class="searchBox" :keywords="filter.keywords" @searchClick="searchClick" @inputChange="inputChange">
              </el-search-form>
            </div>
          </el-col>
          <el-col :span="2">
            <div class="fr">
              <el-button type="primary" @click="goBack">返回</el-button>
            </div>
          </el-col>

      </el-row>
    </div>
    <!-- 列表页 -->
    <div id="staff-list">
      <el-row type="flex" justify="center">
        <el-col :span="24">
          <el-table
            :data="tableData"
            empty-text="暂无数据……"
            border
            stripe
            style="text-align: center">
            <el-table-column
              sortable
              v-for="item in items"
              :prop="item.flag"
              :label="item.name"
              :width="item.width">
            </el-table-column>
            <el-table-column
              prop="operate"
              label="操作"
              width="150">
              <template scope="scope">
                <el-button-group>
                  <el-button @click="editClick(scope)" type="primary" icon="edit" size="small"></el-button>
                  <el-button type="primary" icon="delete" size="small" style="margin-left:10px"></el-button>
                </el-button-group>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
      <!--分页begin-->
      <el-pagination id="staff-pagination"
                     :current-page="filter.cur_page"
                     :page-sizes="[5, 10, 20, 50, 100]"
                     :page-size="filter.per_page"
                     layout="total, sizes, prev, pager, next, jumper"
                     :total="total_rows"
                     @size-change="pageSizeChange"
                     @current-change="pageCurrentChange">
      </el-pagination>
      <!--分页end-->
    </div>





      <!--<editForm :formData="editFormData" :editRowIndex="editRowIndex" @onSubmit="onSubmit" :editFormVisible="editFormVisible" @changeVisible="changeEditFormVisible"></editForm>-->
      <el-edit-form :formData="editFormData" :editRowIndex="editRowIndex" @onSubmit="onSubmit" :editFormVisible="editFormVisible" @changeVisible="changeEditFormVisible"></el-edit-form>
  </div>

</template>
<script>
  import urlRoot from '../../../common/urlRoot';

  export default {
    data() {
      return {
        tableData: [],
        copyTableData: [],
        //total_rows: 0,
        items: [
          {
            flag: 'scheme_name',
            name: '名称',
            // width: 150,
          },
          {
            flag: 'start_date',
            name: '有效起始日',
            // width: 150,
          },
          {
            flag: 'end_date',
            name: '有效截止日',
            // width: 150,
          },
          {
            flag: 'scheme_desc',
            name: '产品描述',
            // width: 200,
          },
        ],
        filter: {
          per_page: 10, //页大小
          page: 1, // 当前页
          sex: '',
          isAbsence: '',
          keywords: '',
        },
        editFormVisible: false,
        editFormData: [],
        editRowIndex: -1,
      };
    },
    methods: {
      getData: function() {
        const vm = this;
        vm.tableData = [];
        $.ajax({
          type: 'get',
          dataType: "json",
          url: urlRoot.urlWepper('fin/schemeCfg/schemeCfgPage'),
          success: function(re){
            vm.tableData = re.detailMsg.data.content;
            vm.addIsAbsenced();
            vm.copyTableData = $.extend(true, [], vm.tableData);
          }
        });
      },
      getDataItem: function(index) {
        return this.tableData[index];
      },
      goBack() {
        history.go(-1);
      },
      /*eslint-disable*/
      filterData: function() {
        // 按条件过滤本地数据
        const vm = this;
        return this.copyTableData.filter(function(item, index) {
          return item.sex.indexOf(vm.filter.sex) > -1 && item.isAbsence.indexOf(vm.filter.isAbsence) > -1 && (item.name.indexOf(vm.filter.keywords) > -1 || item.uId.toString().indexOf(vm.filter.keywords) > -1);
        });
      },
      addIsAbsenced: function() {
        for(let i=0; i < this.tableData.length; i++){
          // 判断每个user是否缺勤
          if(this.tableData[i].startTime && this.tableData[i].endTime){
            this.tableData[i].isAbsence = '否';
          } else {
            this.tableData[i].isAbsence = '是';
          }
        }
      },
      selectAll: function(e) {
        console.log(e);
      },
      select: function(e) {
        console.log(e);
      },
      searchClick: function(keywords) {
        //调用api从后台获取查询数据
      },
      inputChange: function(keywords) {
        this.filter.keywords = keywords;
      },
      createClick: function () {
        location.hash = '/schemecfg/schemeCfgAdd';
      },
      editClick: function(scope) {
        this.editRowIndex = scope.$index;
//        this.editFormVisible = true;
        const rowData = this.getDataItem(this.editRowIndex);
        //const rowData = this.getDataItemById(scope.row.uId);
        this.editFormData = $.extend(true, {}, rowData);
        location.hash = '/schemecfg/schemeCfgUpdate?pk_scheme_cfg='+this.editFormData.pk_scheme_cfg;
      },
      onSubmit: function(formData) {
        if(this.editRowIndex > -1){
          this.tableData.splice(this.editRowIndex, 1, formData);
        } else {
          this.tableData.push(formData);
        }
      },
      deleteClick: function(scope) {
        this.$confirm('确定要删除吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.tableData.splice(scope.$index,1);
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      pageSizeChange: function() {

      },
      pageCurrentChange: function() {

      },
      changeEditFormVisible: function(val) {
        this.editFormVisible = val;
      }
    },
    computed: {
      total_rows: function() {
        return this.tableData.length;
      },
    },
    created: function(){
      this.getData();
    }
  }
</script>
<style>
  .filterBox, .pagination { margin:20px 0; }
  .divBox { margin-bottom: 50px }
  .searchBox{ padding-top: 3px }
  .schemeCfgPage{
    padding:20px 30px;
  }
  .schemeCfgPage .searchBox{
    padding-top:0px;
  }
   .schemeCfgPage .el-button-group .el-button+.el-button{
    margin-left: 10px;
  }
</style>
