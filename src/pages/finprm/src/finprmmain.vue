<template>
  <div class="finprmmain">
      <div class="title-header">
        <h2 class="name" >算法元素</h2>
      </div>

      <div id="search-container">
        <div >
          <el-button class="fl" type="primary" @click="createClick">新增</el-button>
          <el-button class="fr" type="primary" @click="goBack">返回</el-button>
        </div>
      </div>

<!--       <el-row  class="row" type="flex" justify="left"  >
  <el-col :span="7" type="flex" justify="right">
    <el-button type="primary" icon="plus" @click="createClick"></el-button>
  </el-col>
  <el-button type="primary" icon="plus"></el-button>
            <el-button type="primary" icon="delete"></el-button>
            <el-button type="primary" icon="search">搜索</el-button>
            <el-button type="primary">上传<i class="el-icon-upload el-icon--right"></i></el-button>
  <el-col :span="7" type="flex" justify="right">
    <el-search-form class="searchBox" ></el-search-form>
  </el-col>
</el-row> -->
    <div id="staff-list">
      <el-row type="flex" justify="center" >
        <el-col :span="24">
          <div  style="overflow:auto"  >
            <el-table :data="tableData" empty-text="暂无数据……" border stripe style="
        text-align:center; width:100% ">
           <!--    </el-table-column> -->
              <el-table-column v-for="item in items" :prop="item.flag" :label="item.name" >
              </el-table-column>
              <el-table-column prop="operate" label="操作">
                <template scope="scope">
                  <el-button-group>
                    <el-button @click="editClick(scope)" type="primary" icon="edit" size="small">
                    </el-button>
                   <!--  <el-button @click="deleteClick(scope)" type="primary" icon="delete" size="small" -->
                   <!-- </el-button> -->
                  </el-button-group>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-col>
      </el-row>


          <!--分页begin-->
     <el-pagination id="staff-pagination"
                    :current-page="pages.cur_page"
                    :page-sizes="[5, 10, 20, 50, 100]"
                    :page-size="pages.size"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="pages.total_rows"
                    @size-change="pageSizeChange"
                    @current-change="pageCurrentChange">
     </el-pagination>
          <!--分页end-->
    </div>
      <!--新增修改页面-->
      <quickStartEdit :form="editForm" :editRowIndex="editRowIndex" @onSubmit="save" :editFormVisible="editFormVisible" @changeVisible="changeEditFormVisible" ></quickStartEdit>
  </div>
</template>
<script>
  import quickStartEdit from './quickStartEdit.vue';
  import urlRoot from '../../../common/urlRoot';
  export default {
    data() {
      return {
        options: "",
        tableData: [{prm_code:123,prm_name:34,ss:33},{prm_code:123,prm_name:34,ss:33}],
        items2: [],
        items: [
//          {
//            flag: 'pk_prm_id',
//            name: '参数主键',
//            width: 100,
//            show:false,
//          },
          {
            flag: 'prm_code',
            name: '参数编码',
            // width: 100,
          },
          {
            flag: 'prm_name',
            name: '参数姓名',
            // width: 100,
          },
          {
            flag: 'prm_type',
            name: '参数类别',
            // width: 100,
          },
//          {
//            flag: 'integer_size',
//            name: '整数位数',
//            width: 200,
//          },
//          {
//            flag: 'decimal_size',
//            name: '小数位数',
//            width: 200,
//          },
          {
            flag: 'remark',
            name: '备注',
            // width: 200,
          },
          {
            flag: 'sequence',
            name: '排序',
            // width: 200,
          },
//          {
//            flag: 'systemflg',
//            name: '是否为系统预置参数',
//            width: 200,
//          },
          {
            flag: 'creator',
            name: '创建人',
            // width: 100,
          },
          {
            flag: 'creationTime',
            name: '创建时间',
            // width: 200,
          },
          {
            flag: 'modifier',
            name: '修改人',
            // width: 100,
          },
          {
            flag: 'modifiedTime',
            name: '修改时间',
            // width: 200,
          },

        ],

        pages: {
          total_rows: 0,
          size: 10, // 页大小
          curPage: 1, // 当前页
          totalPages: 0,
        },

        editFormVisible: false,
        //editFormData: [],
        editRowIndex: -1,
        loading: false,
        editForm: {    // edit表单
          formData: [
            { key: 'prm_code', value: '' },
            { key: 'prm_name', value: '' },
            { key: 'prm_type', value: '' },
            { key: 'integer_size', value: '' },
            { key: 'decimal_size', value: '' },
            { key: 'remark', value: '' },
            { key: 'sequence', value: '' },

            // { key: 'systemflg', value: '' },
            // { key: 'dr', value: '' },
            // { key: 'creator', value: '' },
            // { key: 'creationTime', value: '' },
            // { key: 'modifier', value: '' },
            // { key: 'modifiedTime', value: '' },
            { key: 'relaction_code', value: '' },
          ],
          settingData: [
            {
              label: '参数编码', // 左边字段名
              el: 'input',                // 右边元素
              placeholder: '请输入',       // 默认显示提示信息
              required: false,              // 是否必填
            },
            {
              label: '参数姓名', // 左边字段名
              el: 'input',                // 右边元素
              placeholder: '请输入',       // 默认显示提示信息
              required: false,              // 是否必填
            },
            {
              label: '参数类型',  // 左边字段名
              placeholder: '请输入',      // 默认显示提示信息
              el: 'select',                // 右边元素
              options: [
                {
                  value: '0',
                  label: '比率型',
                },
                {
                  value: '3',
                  label: '金额型',
                },
                {
                  value: '4',
                  label: '选择器',
                },
                {
                  value: '1',
                  label: '字符型',
                },
                {
                  value: '2',
                  label: '日期型',
                },
              ],
              required: true,             // 是否必填
            },
            {
              label: '整数位数',  // 左边字段名
              el: 'input',                // 右边元素
              type: 'number',             // input时的元素类型
              placeholder: '请输入',      // 默认显示提示信息
              required: false,             // 是否必填
            },
            {
              label: '小数位数',  // 左边字段名
              el: 'input',                // 右边元素
              type: 'number',             // input时的元素类型
              placeholder: '请输入',      // 默认显示提示信息
              required: false,             // 是否必填
            },
            {
              label: '备注', // 左边字段名
              el: 'input',                // 右边元素
              placeholder: '请选择',           // 默认显示提示信息
              required: true,                  // 是否必填
            },
            {
              label: '顺序',  // 左边字段名
              el: 'input',                    // 右边元素
              placeholder: '请输入',          // 默认显示提示信息
              required: false,                // 是否必填
            },
            {
              label: '关联字段',  // 左边字段名
              el: 'select',                    // 右边元素
              placeholder: '请输入11',          // 默认显示提示信息
              multiple:true,
              filterable:true,
              remote:true,
              selectremote:true,
              options: [],
            }
          ],
          // formStyle 可选
          formStyle: {
            simpleColumn: true,         // 是否按单列显示，false表示按两列显示
            showButtons: true, // 是否显示底部保存和取消按钮，false表示不显示保存取消按钮
            styleObject: {      // 自定义form表单的样式
              // width: '500px',
              // margin: '0 65 0 0 auto',
            },
          },
        }
      };
    },
    methods: {
      getData: function() {
        const vm = this;
        $.ajax({
          type: 'get',
          dataType: "json",
//          url: 'fin/finprm/querybypk?id=1212',
          url: urlRoot.urlWepper('fin/finprm/queryall'),
//          url: 'fin/finprm/insert',
          success: function(re){
//            vm.tableData="["+JSON.stringify(re).replace(/"(\w+)":/g, "$1:")+"]";
            vm.tableData=re;
          }
        });
      },
      goBack() {
        history.go(-1);
      },
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

      changeEditFormVisible: function(val) {
        this.editFormVisible = val;
      },

// formdata 从新增或者修改页面获得的数据
      save: function(formData) {
        const vm = this;
        if (this.editRowIndex > -1) {
          const formData2 = _.cloneDeep(formData);
          formData2.pk_prm_id = this.tableData[this.editRowIndex].pk_prm_id;
          vm.$http.post(urlRoot.urlWepper('fin/finprm/update'),[formData2])
            .then((re) => {
              let msg = '';
              console.log(re);
              if (re.data.success === 'success'){
                vm.tableData.splice(vm.editRowIndex, 1, formData2);
                vm.$message({
                  type: 'info',
                  message: '修改成功！',
                });
              } else {
                if (re.data.success === 'fail_global') {
                  msg = this.transCoding(re.data.message);
                } else if (re.data.success === 'fail_field') {
                  console.log('error detailMsg:', re.data.detailMsg);
                }
                vm.$message({
                  type: 'error',
                  message: msg !=='' ? msg : '修改失败！'
                });
              }
            })
            .catch(() => {
              vm.$message({
                type: 'info',
                message: '修改失败！',
              });
            });
        } else {
          vm.$http.post(urlRoot.urlWepper('fin/finprm/save'),[formData])
            .then((re) => {
              let msg = '';
              if (re.data.success === 'success'){
                vm.tableData.unshift(formData);
                vm.$message({
                  type: 'info',
                  message: '添加成功！'
                });
                vm.getData();
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
        }
      },

      // deleteClick: function(scope) {
      //   const vm = this;
      //   this.$confirm('确定要删除吗?', '提示', {
      //     confirmButtonText: '确定',
      //     cancelButtonText: '取消',
      //     type: 'warning'
      //   }).then(() => {
      //     vm.$http.post(urlRoot.urlWepper('/fin/finprm/delete'),[scope.row])
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
      //       vm.$message({
      //         type: 'error',
      //         message: '删除失败！'
      //       });
      //     });
      //   }).catch(() => {
      //     vm.$message({
      //       type: 'info',
      //       message: '已取消删除！'
      //     });
      //   });
      // },


//    从表单拿值
      getDataItem: function(index) {
        return this.tableData[index];
      },
//
      editClick: function(scope) {
        console.log(scope);
        this.editRowIndex = scope.$index;
        this.editFormVisible = true;
        const rowData = this.getDataItem(this.editRowIndex);
        const self = this;
        //const rowData = this.getDataItemById(scope.row.uId);
        this.editForm.formData.forEach((item, index) => {   // 重置formData的value
          self.editForm.formData[index].value = rowData[item.key];
        });
        console.log("editclick..", this.editForm.formData);
      },
      remoteMethod:function(){
        this.editForm.settingData[7].options=[
          {
            value: '0',
            label: '数值型1',
          },
          {
            value: '1',
            label: '字符型1',
          },
          {
            value: '2',
            label: '日期型1',
          },
        ];
      },
    },
    created(){
      this.getData();
    },
    components: {
      quickStartEdit,
    },

  };
</script>
<style>
  /*.basicParamConfigForm{ position: relative; margin: 20px auto; width: 1000px; }*/
  /*.formTitle{ width: 100%; height: 40px; background-color: #EFF3F6;!* font-size: 14px;*! }*/
  /*.formTitle span{ display: block; height: 20px; line-height: 20px; padding: 10px; }*/
  /*.formBody{ background-color: #F5F8FA; padding-bottom: 15px; margin-bottom: 15px; }*/
  /*.rule_table{ font-size: 12px; }*/
  /*.row{ margin: 10px;  }*/
  /*.formBody .row label{ padding: 0 10px; line-height: 36px }*/
  /*.formFooter{ margin-top: 15px; display: flex;  justify-content: center; }*/
  /*.tdValue{ width: 100%; height: 20px; line-height: 20px; }*/
  .filterBox, .pagination { margin:20px 0; }
/*  .divBox { margin-bottom: 50px }*/
  .searchBox{ padding-top: 3px }
  .finprmmain{
    padding:20px 30px;
  }
</style>
