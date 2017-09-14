<template>
  <div class="tableListRecord">
    <div style="margin-top:15px">
      <div id="search-container">
        <div class="fl">
          <el-button type="primary"  @click="goBack()">返回</el-button>
        </div>
      </div>
      <el-row type="flex" justify="center">
        <el-col :span="24">
          <el-table :data="tableData" empty-text="暂无数据……" border stripe    style="text-align: center">

            <el-table-column v-for="item in items" :prop="item.flag" :label="item.name">
            </el-table-column>
            <!--<el-table-column prop="operate" label="操作">
              <template scope="scope">
                <el-button-group>
                  <el-button @click="editClick(scope)" type="primary" icon="search" size="small"></el-button>
                </el-button-group>
              </template>
            </el-table-column>-->
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
  import urlRoot from '../../../common/urlRoot';
  export default {
    data() {
      return {
        tableData: [{ template_type: '承租人自然人', title: '开场白', action_template: '您好，请问您是张三吗', remark: '开场白' }],
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
    props: ['formData'],
    components: {

    },
    methods: {
      getData() {
      const vm = this;
      $.ajax({
        type: 'post',
        dataType: 'json',
        url: urlRoot.urlWepper('fin/config/queryTemplate'),
        success(re){
        vm.tableData = re.detailMsg.data;
      }
      });
    },
      goBack() {
        //this.isTemplate = false;
      },
      getDataItem(index) {
      return this.tableData[index];
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
  .divBox { margin-bottom: 50px }
  .searchBox{ padding-top: 3px }
</style>
