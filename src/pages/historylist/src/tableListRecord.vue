<template>
  <div class="tableListRecord">
    <div style="margin-top:15px">
      <el-row type="flex" justify="center">
        <el-col :span="24">
          <el-table :data="tableData" empty-text="暂无数据……" border stripe    style="text-align: center">

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
      <editForm :formData="editFormData" :editRowIndex="editRowIndex" @onSubmit="onSubmit" :editFormVisible="editFormVisible" @changeVisible="changeEditFormVisible"></editForm>
    </div>

  </div>

</template>
<script>
  //导入条件搜索框和编辑界面的操作
  /*import searchForm from 'components/searchForm.vue';
  import editForm from 'components/editForm.vue';*/
  import editForm from './queryDetailPage.vue';
  import  urlRoot from  '../../../common/urlRoot';
  export default {
    data() {
      return {
        tableData: [{}],
        //total_rows: 0,
        items: [
          {
            flag: 'finRemindType',
            name: '催收类别',
          },
          {
            flag: 'creationtime',
            name: '催收时间',
          },
          {
            flag: 'creator',
            name: '催收人',
          },
          // {
          //   flag: 'finYesnoFollow',
          //   name: '重点关注',
          // },
          // {
          //   flag: 'finCall',
          //   name: '联系人电话',
          // },
          // {
          //   flag: 'finTelSituate',
          //   name: '电话拨打情况',
          // },
          // {
          //   flag: 'finTelStatue',
          //   name: '电话状态',
          // },
          {
            flag: 'finContactResult',
            name: '联系结果说明',
          },
          {
            flag: 'finOvderueReason',
            name: '逾期原因',
          },
          // {
          //   flag: 'finOverDesribe',
          //   name: '逾期描述',
          // },
          {
            flag: 'finThingsSituate',
            name: '租赁物情况',
          },
          // {
          //   flag: 'finTelJudge',
          //   name: '承诺还款',
          // },
          // {
          //   flag: 'finAgreeRepayment',
          //   name: '承诺还款时间',
          // },
          // {
          //   flag: 'finFincingAmount',
          //   name: '现场人员接触情况',
          // },
          // {
          //  flag: 'finMoreCapital',
          //  name: '催收地点',
          //  },
          // {
          //   flag: 'backState',
          //   name: '是否已收回',
          // },
          // {
          //   flag: 'lawsuitState',
          //   name: '是否已诉讼',
          // },
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
      editForm
    },
    methods: {
      getData: function() {
        const vm = this;
        $.ajax({
          type: 'get',
          dataType: "json",
          url: urlRoot.urlWepper('fin/remind/historyList'),
          success: function(re){
            vm.tableData=re.detailMsg.data;
          }
        });
      },
      getDataItem: function(index) {
        return this.tableData[index];
      },
      createClick: function () {
        // body...
        this.editRowIndex = -1;
        const createFormData = {
          uId: '',
          sex: '',
          name: '',
          startTime: '',
          endTime: '',
        };
        console.log('createClick..');
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
</style>
