<template>
<div class="voucherTmp">
  <div class="title-header">
    <h2 class="name" >入账配置</h2>
  </div>


  <div id="search-container">
    <div >
        <el-button class="fl" type="primary"  @click="update">修改</el-button>
        <el-button class="fl" type="primary" @click="query">查询</el-button>
        <el-button class="fr" type="primary" @click="goBack">返回</el-button>
    </div>
  </div>

<div id="staff-list">
  <el-row >
    <el-col :span="6">
          <div>


          </div>
        </el-col>
    <el-col :span="6">
          <div>


          </div>
        </el-col>
  </el-row>

<el-form ref="form" :model="form"  :label-position="left" :inline="true"  label-width="80px">
  <el-form-item label="主键" style="display:none">
      <el-input v-model="form.pkConfig"  ></el-input>
  </el-form-item>
 <!--分页end
  <el-form-item label="来源系统">
   <el-select v-model="form.systemid"  placeholder="请选择">
                   <el-option
                     v-for="item in sysValues"
                     :key="item.value"
                     :label="item.label"
                     :value="item.value">
                   </el-option>
    </el-select>
  </el-form-item>
 -->
  <el-form-item label="入账系统">
     <el-select v-model="form.accSys"   placeholder="请选择">
                 <el-option
                   v-for="item in sys"
                   :key="item.value"
                   :label="item.label"
                   :value="item.value">
                 </el-option>
      </el-select>
    </el-form-item>
    <!--end
  <el-form-item label="模块">
   <el-select v-model="form.moduleValue"  placeholder="请选择">
               <el-option
                 v-for="item in modules"
                 :key="item.value"
                 :label="item.label"
                 :value="item.value">
               </el-option>
    </el-select>
  </el-form-item>
  -->
  <el-row :span="24">
  <el-col :span="6">
  <el-form-item label="地址" required>
    <el-input v-model="form.ip" :disabled="editRowIndex > -1" ></el-input>
  </el-form-item>
  </el-col>
  <el-col :span="6">
  <el-form-item label="入账帐簿" required>
    <el-input v-model="form.pkAccbook" :disabled="editRowIndex > -1" ></el-input>
  </el-form-item>
  </el-col>
  <el-col :span="6">
  <el-form-item label="年度" required>
    <el-input v-model="form.year" :disabled="editRowIndex > -1"></el-input>
  </el-form-item>
  </el-col>
  <el-col :span="6">
    <el-form-item label="月份" required v-if="(form.accSys === '1'||form.accSys===1)">
         <el-input v-model="form.month" :disabled="editRowIndex > -1" ></el-input>
       </el-form-item>
    </el-col>
  </el-row>

  <el-row :span="24">
    <el-col :span="6">
    <el-form-item label="组织" required v-if="(form.accSys === '1'||form.accSys===1)">
        <el-input v-model="form.pkOrg" :disabled="editRowIndex > -1" ></el-input>
      </el-form-item>
    </el-col>
    <el-col :span="6">
      <el-form-item label="集团" required >
         <el-input v-model="form.pkGroup" :disabled="editRowIndex > -1" ></el-input>
     </el-form-item>
    </el-col>
    <el-col :span="6">
      <el-form-item label="制单人" required >
          <el-input v-model="form.pkMaker" :disabled="editRowIndex > -1" ></el-input>
        </el-form-item>
    </el-col>
    <el-col :span="6">
      <el-form-item label="自定义">
            <el-input v-model="form.def1" :disabled="editRowIndex > -1" ></el-input>
      </el-form-item>
    </el-col>
  </el-row>
<el-row :span="25">
 <el-col :span="5">
 <el-form-item ></el-form-item>
 </el-col>
 <el-col :span="5">
 <el-form-item ></el-form-item>
 </el-col>
  <el-col :span="5">
  <el-form-item >
    <el-button type="primary" :disabled="editRowIndex > -1" @click="onSubmit">保存</el-button>
    <el-button :disabled="editRowIndex > -1" @click="resetForm('form')" >取消</el-button>
  </el-form-item>
  </el-col>
  </el-row>

</el-form>

</div>
</div>
</template>
<script>
import  urlRoot from  '../../../common/urlRoot';
import editForm from './accConfigEdit.vue';
  export default {
    data() {
      return {
      form: {
              pkConfig:'',
              systemid:"",
              moduleValue:"",
              accSys:"",
              ip: '',
              pkAccbook: '',
              year: '',
              month: '',
              pkOrg: '',
              pkGroup:'',
              pkMaker:''
              },
      modules:[{
             value: '1',
             label: '模块1'
             },
             {
             value: '2',
             label: '模块2'
          }],
      sys:[{
           value: 1,
           label: 'NC63'
           },
           {
           value: 2,
           label: 'U8'
           },
          ],
      sysValues:[
      {
      value: '1',
      label: '保险代理'
      },
      ],
      accbooks:[{
                value: 'accbook1',
                label: '帐薄1'
                },
                {value: 'accbook2',
                 label: '帐薄2'
       }],
      vouchertypes:[{
              value: '1',
              label: '记账凭证'
              }, {
              value: '2',
              label: '单边凭证'
              }, {
              value: '3',
              label: '双边凭证'
      }],
      vouchervalue:"",
      systemid:"",
      moduleValue:"",
      accSys:"",
      accbookvalue:"",
      tableData: [],
      editFormVisible: false,
      editFormData: [],
      editRowIndex: 1,
      U8Flag:1,
      };
    },
    methods: {
      update:function(){
        this.editRowIndex=-1;
      },
    deleteClick: function(scope) {
             const vm = this;
             let msg='';
             this.$confirm('确定要删除吗?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning',
            }).then(() => {
              vm.$http.post(urlRoot.urlWepper('/fin/finance/deleteAcconfig'),scope.row)
                .then((re) => {
                  if (re.data.success){
                          vm.$message({
                            type: 'info',
                            message: '删除成功！',
                            });
                  } else {
                       msg = re.data.errorMessage;
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
                //获取索引
              this.editRowIndex = scope.$index;
              this.editFormVisible = true;
              //调用方法getDataItem获取列表的对象，并复制给rowData
              const rowData = this.getDataItem(this.editRowIndex);
              //const rowData = this.getDataItemById(scope.row.uId);
              this.editFormData = $.extend(true, {}, rowData);
      },
      getDataItem: function(index) {
          return this.tableData[index];
      },
      goBack() {
        history.go(-1);
      },
      query: function() {
               const vm = this;
                $.ajax({
                      type: 'get',
                      dataType: "json",
                      data:{
                           accSys:this.form.accSys,
                      },
                      url: urlRoot.urlWepper('fin/finance/queryAcconfig'),
                      success: function(re){
                           if(re.success){
                               vm.form=re.map.value;
                           }else{
                              vm.form.ip='';
                              vm.form.year='';
                              vm.form.month='';
                              vm.form.pkOrg='';
                              vm.form.pkAccbook='';
                              vm.form.pkGroup='';
                              vm.form.pkMaker='';
                           }

                      },
                });
        },
      add:function(){
        this.editRowIndex = -1;
        const crateFormData ={
            accSys:this.sysvalue,
            moduleValue:this.modulevalue,
            systemid:this.systemValue,
            tenantid:'0001',
            explanation:'',
            itemname:'',
            direction:'',
            balancedirect:'',
            pk_currency:'',
            excrate:'',
            amount:'',
            localamount:'',
         };
        this.editFormVisible = true;
        this.editFormData = crateFormData;
      },
      onSubmit() {
              const vm = this;
              if(this.editRowIndex > -1){
                $.ajax({
                  type: 'post',
                  dataType: "json",
                  data:this.form,
                  url:urlRoot.urlWepper('fin/finance/updateAcconfig'),
                  success: function(re){
                   if (re.success){
                        vm.$message({
                         type: 'info',
                         message: re.successMessage,
                         });
                   } else {
                           let msg = '';
                           msg = re.errorMessage;
                           vm.$message({
                           type: 'error',
                            message: msg !=='' ? msg : '更新失败！'
                              });
                     }
                  }
                });
              }else{
                $.ajax({
                  type: 'get',
                  dataType: "json",
                  data:this.form,
                  url: urlRoot.urlWepper('fin/finance/accConfigSave'),
                  success: function(re){
                      if (re.success){
                           vm.editRowIndex=1;
                           vm.$message({
                              type: 'info',
                              message: re.successMessage,
                           });
                      } else {
                             let msg = '';
                             msg = re.errorMessage;
                             vm.$message({
                             type: 'error',
                             message: msg !=='' ? msg : '保存失败！'
                                });
                             }
                      }
                });
              }
         },
       resetForm(form){
          this.$refs[form].resetFields();
          this.editRowIndex=1;
       },
       changeEditFormVisible: function(val) {
           this.editFormVisible = val;
        },
      handleNodeClick(data) {
        console.log(data);
      },
      handleEdit(index, row) {
        console.log(index, row);
      },
     handleDelete(index, row) {
        console.log(index, row);
      }
    },
    components:{
        editForm,
    },
  };
</script>
<style>
  .voucherTmp{
    padding:20px 30px;
  }
  .voucherTmp_input_name{
    font-size: 14px;
    margin-right: 15px;
  }
</style>

