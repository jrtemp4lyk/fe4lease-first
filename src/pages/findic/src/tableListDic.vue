<template>
  <div class="tableListDic" >
    <div class="title-header">
      <h2 class="name" >数据字典</h2>
    </div>
    <div id="search-container">
        <div >
          <el-button class="fl" type="primary"  @click="createClick">新增</el-button>
          <el-button class="fr" type="primary" @click="goBack">返回</el-button>
        </div>
    </div>
    <div id="staff-list">
      <el-row type="flex" justify="center" >
        <el-col :span="24">
          <el-table :data="tableData" empty-text="暂无数据……" border stripe style="text-align: center; width:100%">
            <el-table-column v-for="item in items" :prop="item.flag" :label="item.name" :width="item.width">
            </el-table-column>
            <el-table-column prop="operate" label="操作" >
              <template scope="scope">
                  <el-button @click="editClick(scope)" type="primary" icon="edit" size="small"></el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>

      <!--分页实现效果图形功能的-->
          <!--分页begin-->
      <el-pagination id="staff-pagination"
                     :current-page="currentPage"
                     :page-sizes="[5, 10, 20, 50, 100]"
                     :page-size="filter.per_page"
                     layout="total, sizes, prev, pager, next, jumper"
                     :total="total_rows"
                     @size-change="pageSizeChange"
                     @current-change="pageCurrentChange">
      </el-pagination>
          <!--分页end-->
      <editForm :formData="editFormData"  @onSubmit="onSubmit" :editRowIndex="editRowIndex" :editFormVisible="editFormVisible" @changeVisible="changeEditFormVisible"></editForm>
    </div>
  </div>
</template>

<script>
import editForm from './editForm.vue';
import  urlRoot from  '../../../common/urlRoot';
export default {
    data() {
      return {
        tableData: [{ifbpFinCode:"123",ifbpFinOpttype:"34",ifbpFinName:"33"}],
        items2: [],
        items: [
//          {
//            flag: 'pkFinId',
//            name: '主键',
//            width: 100,
//          },
          {
            flag: 'ifbpFinpCode',
            name: '类别编码',
            // width: 120,
          },
          {
            flag: 'ifbpFinpName',
            name: '类别名称',
            // width: 120,
          },
          {
            flag: 'ifbpFincCode',
            name: '细项编码',
            // width: 120,
          },
          {
            flag: 'ifbpFincName',
            name: '细项名称',
            // width: 150,
          },
          {
            flag: 'order_num',
            name: '顺序号',
            // width: 100,
          },
          {
            flag: 'creater',
            name: '创建人',
           // width: 150,
          },
          {
            flag: 'remark',
            name: '备注说明',
            // width: 200,
          },
        ],
        filter: {
          per_page: 50, //页大小
          page: 1, // 当前页
          isAbsence: '',
          keywords: '',
        },
        currentPage: 1,
        editFormVisible: false,
        editFormData: [],
        editRowIndex: -1,
      };
    },
    components:{
      editForm,
    },
    methods: {
      getData: function() {
        const vm = this;
        $.ajax({
          type: 'get',
          dataType: "json",
          url: urlRoot.urlWepper('fin/dic/list'),
          success: function(re){
            //alert(JSON.stringify(re));
            vm.tableData=re.content;
          },
        });
      },
      goBack() {
        history.go(-1);
      },
      //新增功能
      createClick:function(){
        this.editRowIndex = -1;
        const crateFormData ={
          ifbpFinpCode:'',
          ifbpFinpName:'',
          ifbpFincName:'',
          ifbpFincCode: '',
          order_num: '',
          creater:'',
          remark:'',
        };
        this.editFormVisible = true;
        this.editFormData = crateFormData;
      },

      //列表编辑界面操作，获取序列号，初始化时加载editFormVisible，然后获取列表的数据，并将值渲染到editFormData
      editClick: function(scope) {
          //获取索引
        this.editRowIndex = scope.$index;
        this.editFormVisible = true;
        //调用方法getDataItem获取列表的对象，并复制给rowData
        const rowData = this.getDataItem(this.editRowIndex);
        //const rowData = this.getDataItemById(scope.row.uId);
        this.editFormData = $.extend(true, {}, rowData);
      },
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
      pageSizeChange: function() {

      },
      pageCurrentChange: function() {

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
  .filterBox, .pagination { margin:20px 0; }
/*  .divBox { margin-bottom: 50px }*/
/*  .searchBox{ padding-top: 3px }
*/  .tableListDic{
    padding:20px 30px;
  }
  .el-table th {
    text-align:center;
  }
</style>
