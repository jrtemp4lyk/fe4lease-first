<template>
  <div class="assetProjectManager" >

    <!-- 标题 -->
    <div class="title-header">
      <h2 class="name" >资产包管理</h2>
    </div>
    <div id="search-container">
      <el-row>
          <el-col :span="24">
            <div class="fr">
              <!-- <el-button type="primary"  @click="createClick">新增</el-button> -->
              <el-button type="primary" @click="goBack">返回</el-button>
            </div>
          </el-col>
      </el-row>
    </div>
    <!-- 列表展示信息 -->
    <div id="staff-list">
        <el-row type="flex" justify="center">
        <el-col :span="24">
          <el-table
            v-loading.body="loading"
            :data="tableData"
            empty-text="暂无数据……"
            border
            stripe
            style="text-align: center;"
             @select="selectsss">
            <el-table-column
              v-for="item in columns"
              :prop="item.flag"
              :label="item.name"
              :width="item.width"
              :fixed="item.fixed"
              >
              <template scope="scope" :item="item">
                <div v-if="item.flag==='pushstatus'">
                  <span v-if="scope.row.pushstatus===1 || scope.row.pushstatus==='1'">已推送</span>
                  <span v-else>未推送</span>
                </div>
                <div v-else>
                  <span>{{scope.row[item.flag]}}</span>
                </div>
              </template>
            </el-table-column>
            <el-table-column
              prop="operate"
              label="操作"
              >
              <template scope="scope">
              <el-button-group>
                <el-button @click="editClick(scope)" type="primary"  size="small">查看</el-button>
                <el-button @click="PushClick(scope)" type="primary"  size="small">推送</el-button>
                <el-button @click="deleteClick(scope)" type="primary" icon="delete"size="small"  ></el-button>
              </el-button-group>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
      <el-pagination id="staff-pagination"
                     :current-page="filter.cur_page"
                     :page-sizes="[5, 10, 20, 50, 100]"
                     :page-size="filter.per_page"
                     layout="total, sizes, prev, pager, next, jumper"
                     :total="total_rows"
                     @size-change="pageSizeChange"
                     @current-change="pageCurrentChange">
      </el-pagination>
  </div>
    <!-- 组件 编辑和推送 -->
    <tableEdit  :tabledata="tableAssetScreen"  :editFormVisible="editFormVisible" @changeVisible="changeEditFormVisible"   :form="editForm"  :showaddbutton="isShow" :showsavebutton="isShow"  :alltabledata="alltabledata" @getAllscreendata="getAllscreendata" @onSave="onSaveEdite" :formtitle="1"> 
    </tableEdit>
    <pushPage :editFormVisible="pushVisible" :form="pushForm" @changePushVisible="changePushFormVisible" :pushTableColumns="columns" :pushTableData="pushTable"  @PushFinish="PushFinish" @TakeBack="TakeBack">
      
    </pushPage>
  </div>
</template>
<script>
  import tableEdit  from  './tableEdit.vue';
  import pushPage  from  './push.vue';
  import  urlRoot from  '../../../common/urlRoot';
  export default {
    data() {
      return {
        tableData: [],//主页面中数据
        tableData2: [],//主页面中推送信息数据
        tableAssetScreen:[],//资产数据
        alltabledata:[],//查看界面，新增资产信息
        isShow:true,
        editFormVisible:false,
        pushVisible:false,
        editRowIndex: -1,
        loading: false,
        pushTable:[],
        columns:[
        {
          flag: 'pushstatus',
          name: '是否推送',
        },
        //   {
        //   flag: 'assetproject_code',
        //   name: '资产项目编码',
        // },
          {
          flag: 'assetproject_name',
          name: '资产项目名称',
        },
         {
          flag: 'fin_base',
          name: '资产融资基数',
        },
        // {
        //   flag: 'payment_table_number',
        //   name: '支付表数量',
        // },
        {
          flag: 'assetproject_amount',
          name: '项目金额',
        },
        {
          flag: 'plan_finamount',
          name: '计划融资金额',
        },
        {
          flag: 'plan_finperiod',
          name: '计划融资期数',
        },
        // {
        //   flag: 'fin_manager',
        //   name: '融资经理',
        // },
        // {
        //   flag: 'phone_number',
        //   name: '联系电话',
        // },
        ],

    editForm: {
        formData:[
        { key: 'assetproject_code', value: '' },
        { key: 'assetproject_name', value: '' },
        // { key: 'fin_base', value: '' },
        { key: 'plan_finamount', value: '' },
        { key: 'plan_finperiod', value: '' },
        { key: 'fin_manager', value: '' },
        { key: 'phone_number', value: '' },
        { key: 'payment_table_number', value: '' },
        { key: 'assetproject_amount', value: '' },
        { key: 'Pk_fin_assetproject', value: '' },
        { key: 'fin_base', value: '' },
        ],
        settingData: [
          {
            label: '资产项目编码',  // 左边字段名
            el: 'input',                // 右边元素
            type: 'String',             // input时的元素类型
            placeholder: '请输入',      // 默认显示提示信息
            required: false,             // 是否必填
          },
          {
            label: '资产项目名称',  // 左边字段名
            el: 'input',                // 右边元素
            type: 'String',             // input时的元素类型
            placeholder: '请输入',      // 默认显示提示信息
            required: false,             // 是否必填
          },
          // {
          //   label: '资产融资基数',  // 左边字段名
          //   el: 'select',                // 右边元素
          //   type: 'String',             // input时的元素类型
          //   placeholder: '请输入',      // 默认显示提示信息
          //               options: [
          //     {
          //       value: '0',
          //       label: '设备金额',
          //     },
          //     {
          //       value: '1',
          //       label: '剩余本金',
          //     },
          //     {
          //       value: '2',
          //       label: '剩余租金',
          //     },
          //     {
          //       value: '3',
          //       label: '融资额',
          //     },
          //   ],
          //   required: false,                  // 是否必填
          // },
          // {
          //   label: '支付表数量',  // 左边字段名
          //   el: 'input',                // 右边元素
          //   type: 'String',             // input时的元素类型
          //   placeholder: '请输入',      // 默认显示提示信息
          //   required: false,             // 是否必填
          // },
          // {
          //   label: '项目金额',  // 左边字段名
          //   el: 'input',                // 右边元素
          //   type: 'String',             // input时的元素类型
          //   placeholder: '请输入',      // 默认显示提示信息
          //   required: false,             // 是否必填
          // },
          {
            label: '计划融资金额',  // 左边字段名
            el: 'input',                // 右边元素
            type: 'String',             // input时的元素类型
            placeholder: '请输入',      // 默认显示提示信息
            required: false,             // 是否必填
          },
          {
            label: '计划融资期数',  // 左边字段名
            el: 'input',                // 右边元素
            type: 'String',             // input时的元素类型
            placeholder: '请输入',      // 默认显示提示信息
            required: false,             // 是否必填
          },
          {
            label: '融资经理',  // 左边字段名
            el: 'input',                // 右边元素
            type: 'String',             // input时的元素类型
            placeholder: '请输入',      // 默认显示提示信息
            required: false,             // 是否必填
          },
          {
            label: '联系电话',  // 左边字段名
            el: 'input',                // 右边元素
            type: 'String',             // input时的元素类型
            placeholder: '请输入',      // 默认显示提示信息
            required: false,             // 是否必填
          },
        ],
                // formStyle 可选
        formStyle: {
          simpleColumn: false,         // 是否按单列显示，false表示按两列显示
          showButtons: false, // 是否显示底部保存和取消按钮，false表示不显示保存取消按钮
          styleObject: {      // 自定义form表单的样式
            width: '500px',
            margin: '0 auto',
          },
        },

    },
    pushForm: {    // 推送表单
        formData: [
          // { key: 'pk_fin_assetproject ', value: '' },
          { key: 'name', value: '' },
          { key: 'code', value: '' },
          { key: 'category', value: '' },
          { key: 'starttime', value: '' },
          { key: 'endtime', value: '' },
          { key: 'descriptive', value: '' },
          { key: 'totaltime', value: '' },
          { key: 'pk_project', value: '' },
          { key: 'pk_pushinfo', value: '' },
        ],
        settingData: [
          {
            label: '推送名称',  // 左边字段名
            el: 'input',                // 右边元素
            type: 'String',             // input时的元素类型
            placeholder: '请输入',      // 默认显示提示信息
            required: false,             // 是否必填
          },
          {
            label: '推送信息编码 ',  // 左边字段名
            el: 'input',                // 右边元素
            type: 'String',             // input时的元素类型
            placeholder: '请输入',      // 默认显示提示信息
            required: false,             // 是否必填
          },

          {
            label: '推送类别', // 左边字段名
            el: 'select',                // 右边元素
            placeholder: '请选择',           // 默认显示提示信息
            options: [
              {
                value: '0',
                label: 'p2p',
              },
              {
                value: '1',
                label: '银行',
              },
              {
                value: '2',
                label: '债券',
              },
            ],
            required: false,                  // 是否必填
          },
          {
            label: '推送开始时间',  // 左边字段名
            el: 'input',  
            type: 'date',                  // 右边元素
            placeholder: '请输入',          // 默认显示提示信息
            required: false,                // 是否必填
          },
          {
            label: '推送终止时间',  // 左边字段名
            el: 'input',                    // 右边元素
            type: 'date',
            placeholder: '请输入',          // 默认显示提示信息
            required: false,                // 是否必填
          },
          {
            label: '资产包描述信息',  // 左边字段名
            el: 'input',                // 右边元素
            type: 'textarea',             // input时的元素类型
            placeholder: '请输入',      // 默认显示提示信息
            required: false,             // 是否必填

          },
          {
            label: '推送计时 ',  // 左边字段名
            el: 'input',                    // 右边元素
            type: 'String',
            placeholder: '请输入',          // 默认显示提示信息
            required: false,                // 是否必填
          },
        ],
        // formStyle 可选
        formStyle: {
          simpleColumn: false,         // 是否按单列显示，false表示按两列显示
          showButtons: false, // 是否显示底部保存和取消按钮，false表示不显示保存取消按钮
          styleObject: {      // 自定义form表单的样式
            width: '500px',
            margin: '0 auto',
          },

        },
      },

     // pages: {
     //    total_rows: 0,
     //    size: 10, // 页大小
     //    curPage: 1, // 当前页
     //    totalPages: 0,
     //  },
     //          
        filter: {
          per_page: 10, //页大小
          page: 1, // 当前页
          sex: '',
          isAbsence: '',
          keywords: '',
        },
      };

    },
    methods: {
    getData: function() {
      const vm = this;
      vm.tableData = [];
      vm.tableData2 = [];
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
      },3000);
      vm.$http.post(urlRoot.urlWepper('/fin/assetproject/queryall'),vm.filter)
        .then((re) => {
          let msg = '';
          if (re.data.success === 'success'){
            let metaData = {};
            // alert(JSON.stringify(re));
            if (re.data.detailMsg && re.data.detailMsg.data){
              metaData = re.data.detailMsg.data;
            }
            if(metaData.content instanceof Array){
              for(var i=0;i<metaData.content.length;i++){
                vm.tableData2[i]= (metaData.content instanceof Array) ? metaData.content[i].push : {};
                const data1= (metaData.content instanceof Array) ? metaData.content[i].project : {};
              if(typeof (vm.tableData2[i])==="undefined"||vm.tableData2[i].pushstatus===0){ 
                  data1.pushstatus=0;
              }else{
                  data1.pushstatus=1;
              }
              vm.tableData[i]=data1;
            }
            // alert(JSON.stringify(vm.tableData));
            // alert(JSON.stringify(vm.tableData2));
            }
            // alert(JSON.stringify(metaData));
            // alert(JSON.stringify(metaData.totalElements));
            // vm.pages.total_rows = metaData.totalElements;
            // vm.pages.totalPages = metaData.totalPages;
            // vm.pages.size = metaData.size;
            // vm.pages.curPage = metaData.number;
            // vm.copyTableData = _.cloneDeep(vm.tableData);
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
    goBack() {
      history.go(-1);
    },
    getAllscreendata:function(){
      const vm = this;
      vm.alltabledata = [];
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
      },3000);

      vm.$http.post(urlRoot.urlWepper('/fin/assetscreen/queryFromPlan'))
        .then((re) => {
          let msg = '';
          if (re.data.success === 'success'){
            let metaData = {};
            if (re.data.detailMsg && re.data.detailMsg.data){
              metaData = re.data.detailMsg.data;
            }
            vm.alltabledata = (metaData.content instanceof Array) ? metaData.content : [];
            // vm.pages.total_rows = metaData.totalElements;
            // vm.pages.totalPages = metaData.totalPages;
            // vm.pages.size = metaData.size;
            // vm.pages.curPage = metaData.number;
            // vm.copyTableData = _.cloneDeep(vm.tableData);
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
    createClick: function () {
        this.editRowIndex = -1;
        console.log('createClick..');
        this.editFormVisible = true;
        const self = this;
        this.pushForm.formData.forEach((item, index) => {   // 重置formData的value
          self.pushForm.formData[index].value = '';
        });
        console.log("createclick..", this.pushForm.formData);
    },
    getDataItem: function(index) {
        return this.tableData[index];
    },

    PushClick:function(scope){
        const vm = this;
        vm.pushVisible=true;
        console.log(scope);
        vm.editRowIndex = scope.$index;
        const rowData = vm.getDataItem(vm.editRowIndex);
        vm.pushTable=[];
        vm.pushTable.push(rowData);
        var pushformData = [];
        pushformData = this.tableData2[vm.editRowIndex];
        // 如果获取的推送信息为空，则设置为""
        if(typeof (pushformData)==="undefined"){ 
            this.pushForm.formData.forEach((item, index) => {   // 重置formData的value
              vm.pushForm.formData[index].value = "";
            });
         }else{
            this.pushForm.formData.forEach((item, index) => {   // 重置formData的value
              vm.pushForm.formData[index].value = pushformData[item.key];
            });
        }
        console.log("editclick..", this.pushForm.formData);
    },

    TakeBack(formdata){
        const vm=this;    
        setTimeout(() => {
        this.loading = false;
        },3000);
        vm.$http.post(urlRoot.urlWepper('/fin/assetproject/TakeBack'),formdata)
        .then((re) => {
        let msg = '';
        if (re.data.success === 'success'){
          // vm.tableData.unshift(formData2);
          vm.$message({
            type: 'info',
            message: '取消推送成功！'
          });
          vm.getData();
          // this.pushTableData[0].pushstatus=0;
          vm.pushTable[0].pushstatus=0;//当前选中行的数据状态数据改变
        } else {
          if (re.data.success === 'fail_global') {
            msg = this.transCoding(re.data.message);
          } else if (re.data.success === 'fail_field') {
            console.log('error detailMsg:', re.data.detailMsg);
          }
          vm.$message({
            type: 'error',
            message: msg !=='' ? msg : '取消推送失败！'
          });
        }
      })
      .catch(() => {
        vm.$message({
          type: 'info',
          message: '取消推送失败！'
        });
      });
    },
    /*把表单转成json,并且name为key,value为值*/
   // serializeObject : function(array){
   //   var o = {};
   //   for(var i=0;i<array.length;i++){
   //      o[array[i].name]=o[array[i].value];
   //   }
   //   return o;
   //  },
    PushFinish:function(datas){
        const vm = this;
        // vm.tableData = [];
        this.loading = true;
        setTimeout(() => {
        this.loading = false;
        },3000);
        const data = _.cloneDeep(datas);
        data.pk_project=this.getDataItem(this.editRowIndex).pk_fin_assetproject;
        vm.$http.post(urlRoot.urlWepper('/fin/assetproject/push'),data)
        .then((re) => {
        let msg = '';
        if (re.data.success === 'success'){
          // vm.tableData.unshift(formData2);
          vm.pushTable[0].pushstatus=1;//当前选中行的数据状态数据改变
          vm.$message({
            type: 'info',
            message: '推送成功！'
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
            message: msg !=='' ? msg : '推送失败！'
          });
        }
      })
      .catch(() => {
        vm.$message({
          type: 'info',
          message: '推送失败！'
        });
      });
    },
    changePushFormVisible: function(val) {
        this.pushVisible = val;
    },

    changeEditFormVisible: function(val) {
      this.editFormVisible = val;
    },


    // 保存修改弹窗数据
    onSaveEdite:function(deleteList,tabledata,formData){
      const vm = this;
      if (this.editRowIndex > -1) {

        const formData2 = _.cloneDeep(formData);
        formData2.pk_fin_assetproject = this.getDataItem(this.editRowIndex).pk_fin_assetproject;

        vm.$http.post(urlRoot.urlWepper('/fin/assetproject/editSave'),{deleteList:deleteList,tabledata:tabledata,formData:formData2})
          .then((re) => {
            let msg = '';
            console.log(re);
            if (re.data.success === 'success'){
              vm.tableData.splice(vm.editRowIndex, 1, formData2);
              vm.$message({
                type: 'info',
                message: '修改成功！',
              });
              vm.getData();
              // 刷新编辑界面的值，
              // debugger;
              // const rowData = vm.getDataItem(vm.editRowIndex);
              // //const rowData = this.getDataItemById(scope.row.uId);
              // vm.editForm.formData.forEach((item, index) => {   // 重置formData的value
              //   vm.editForm.formData[index].value = rowData[item.key];
              // });
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

      deleteClick: function(scope) {
      const vm = this;
      this.$confirm('确定要删除吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
      }).then(() => {
          const rowcopy=scope.row;
          rowcopy.Pk_fin_assetproject=vm.tableData[scope.$index].Pk_fin_assetproject;
          delete rowcopy.pushstatus;
          vm.$http.post(urlRoot.urlWepper('/fin/assetproject/delete'),[rowcopy])
          .then((re) => {
            let msg = '';
            if (re.data.success === 'success'){
              vm.tableData.splice(scope.$index,1);
              vm.$message({
                type: 'success',
                message: '删除成功!'
              });
            } else {
              if (re.data.success === 'fail_global') {
                msg = this.transCoding(re.data.message);
              } else if (re.data.success === 'fail_field') {
                console.log('error detailMsg:', re.data.detailMsg);
              }
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

  editClick: function(scope) {
      this.editFormVisible = true;
      const vm = this;
      vm.tableAssetScreen = [];
      this.loading = true;
      const rowcopy=scope.row;
      
      this.editRowIndex = scope.$index;
      const rowData = this.getDataItem(this.editRowIndex);
      //const rowData = this.getDataItemById(scope.row.uId);
      this.editForm.formData.forEach((item, index) => {   // 重置formData的value
        vm.editForm.formData[index].value = rowData[item.key];
      });

      setTimeout(() => {
        this.loading = false;
      },3000);
      vm.$http.post(urlRoot.urlWepper('/fin/assetscreen/selectByPk_fin_assetproject'),rowcopy.pk_fin_assetproject)
        .then((re) => {
          let msg = '';
          if (re.data.success === 'success'){
            let metaData = {};
            if (re.data.detailMsg && re.data.detailMsg.data){
              metaData = re.data.detailMsg.data;
            }
            // alert(JSON.stringify(vm.tableData2));
            vm.tableAssetScreen = (metaData.content instanceof Array) ? metaData.content : [];
            // alert(JSON.stringify(vm.tableAssetScreen));
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
      /* eslint-disable */
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

  },
  /* eslint-disable */
    created(){
      this.getData();
      // this.pushVisible=true;
      // this.editFormVisible=true;
    },
    computed: {
      total_rows: function() {
        return this.tableData.length;
      },
    },
    components: {
        tableEdit,
        pushPage
  },

  };
</script>
<style>
  /*.basicParamConfigForm{ position: relative; margin: 20px auto; width: 1000px; }*/
  /*.formTitle{ width: 100%; height: 40px; background-color: #EFF3F6;!* font-size: 14px;*! }*/
  .formTitle span{ display: block; height: 20px; line-height: 20px; padding: 10px; }
  /*.formBody{ background-color: #F5F8FA; padding-bottom: 15px; margin-bottom: 15px; }*/
  /*.rule_table{ font-size: 12px; }*/
  /*.row{ margin: 10px;  }*/
  /*.formBody .row label{ padding: 0 10px; line-height: 36px }*/
  /*.formFooter{ margin-top: 15px; display: flex;  justify-content: center; }*/
  /*.tdValue{ width: 100%; height: 20px; line-height: 20px; }*/
  .filterBox, .pagination { margin:20px 0; }
  .divBox { margin-bottom: 50px }
  .searchBox{ padding-top: 3px }
  .assetProjectManager{
    padding:20px 30px; 
  }
</style>
