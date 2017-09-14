<template>
<div class="voucherTmp">
  <div class="title-header">
    <h2 class="name" >凭证模板</h2>
  </div>


  <div id="search-container">
    <div >
        <el-button class="fl" type="primary"  @click="add">新增</el-button>
        <!--
        <el-button class="fl" type="primary"  @click="update">修改</el-button>
        -->
        <el-button class="fl" type="primary" @click="query">查询</el-button>
        <el-button class="fr" type="primary" @click="goBack">返回</el-button>
    </div>
  </div>

<div id="staff-list">
  <el-row >
    <el-col :span="6">
      <div>
          <span class="voucherTmp_input_name">来源系统:</span>
          <el-select v-model="sysvalue" @change="sysselect" placeholder="请选择">
            <el-option
              v-for="item in sys"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
      </div>
    </el-col>
    <el-col :span="6">
          <div>
              <span class="voucherTmp_input_name">凭证类别:</span>
             <el-select v-model="vouchertype"   placeholder="请选择">
                  <el-option
                     v-for="item in vouchertypes"
                     :key="item.value"
                     :label="item.label"
                     :value="item.value">
                    </el-option>
             </el-select>
          </div>
        </el-col>

    <el-col :span="6">
      <div >
      </div>
    </el-col>

    <el-col :span="6">
    <div>
    </div>
    </el-col>
  </el-row>

  <el-row :gutter="20" style="margin-top:20px;">
    <el-col :span="5">
        <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick" ></el-tree>
    </el-col >
    <el-col :span="18">
      <div class="">
         <el-table
            :data="tableData"
            border
            >
            <el-table-column
              prop="explanation"
              label="摘要"
              >
            </el-table-column>
            <el-table-column
              prop="pkAcctitem"
              label="科目"
              >
            </el-table-column>
            <el-table-column
              prop="direction"
              label="方向"
              >
              <template scope="scope" >
              <span v-if=" scope.row.direction==='D'">借</span>
              <span v-if=" scope.row.direction==='C'">贷</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="currency"
              label="币种"
              >
            </el-table-column>
            <el-table-column
              prop="excrate"
              label="汇率"
              >
            </el-table-column>
            <el-table-column
              prop="oriAmount"
              label="原币金额"
              >
            </el-table-column>
            <el-table-column
             prop="localAmount"
             label="本币金额"
             >
             </el-table-column>
             <el-table-column
             prop="assval"
             label="辅助核算"
             >
             </el-table-column>
            <el-table-column
              label="操作"
              >
              <template scope="scope">
              <el-button-group>
              <el-button @click="editClick(scope)" type="primary" icon="edit" size="small"></el-button>
              <el-button @click="deleteClick(scope)" type="primary" icon="delete" size="small"></el-button>
              </el-button-group>
              </template>
            </el-table-column>
          </el-table>
      <editForm :formData="editFormData"  @onSubmit="onSubmit" :editRowIndex="editRowIndex" :editFormVisible="editFormVisible" @changeVisible="changeEditFormVisible"></editForm>
      </div>
    </el-col>
  </el-row>
</div>
</div>
</template>
<script>
import  urlRoot from  '../../../common/urlRoot';
import editForm from  './voucherTmpEdit.vue';
  export default {
    data() {
      return {
      data: [{
                label: '一级 1',
                children: [{
                  label: '二级 1-1',
                  children: [{
                    label: '三级 1-1-1'
                  }]
                }]
              }, {
                label: '一级 2',
                children: [{
                  label: '二级 2-1',
                  children: [{
                    label: '三级 2-1-1'
                  }]
                }, {
                  label: '二级 2-2',
                  children: [{
                    label: '三级 2-2-1'
                  }]
                }]
              }, {
                label: '一级 3',
                children: [{
                  label: '二级 3-1',
                  children: [{
                    label: '三级 3-1-1'
                  }]
                }, {
                  label: '二级 3-2',
                  children: [{
                    label: '三级 3-2-1'
                  }]
                }]
              }],
              defaultProps: {
                children: 'children',
                label: 'label'
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
           value: '1',
           label: '保险代理'
           },
           {value: '2',
           label: '在线财务'
           }],
      accbooks:[{
                value: '1',
                label: '帐薄1'
                },
                {value: '2',
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
      vouchertype:"",
      sysvalue:"",
      moduleValue:"",
      accbookvalue:"",
      tableData: [],
      editFormVisible: false,
      editFormData: [],
      editRowIndex: -1,
      treenode:false,
      };
    },
    methods: {
      handleNodeClick(data) {
         //当没有子节点的时候才加载数据
         if(JSON.stringify(data.children)==null){
             this.treenode=true;
             this.moduleValue=JSON.stringify(data.label);
             this.query();
         }else{
          this.treenode=false;
         }
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
                            systemid:this.sysvalue,
                            moduleValue:this.modulevalue,
                            vouchertype:this.vouchertype
                      },
                      url: urlRoot.urlWepper('fin/finance/queryVoucherTmp'),
                      success: function(re){
                        vm.tableData=re;
                      },
                });
        },
        getDataItem: function(index) {
                return this.tableData[index];
        },
        deleteClick: function(scope) {
                const vm = this;
                this.$confirm('确定要删除吗?', '提示', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'warning'
                }).then(() => {
                  vm.$http.post(urlRoot.urlWepper('/fin/finance/voucherTmpDelete'),scope.row)
                    .then((re) => {
                      if(re.data.success){
                        vm.tableData.splice(scope.$index,1);
                        vm.$message({
                          type: 'success',
                          message: re.data.successMessage,
                        });
                      } else {
                        let msg = '';
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
               this.editRowIndex = scope.$index;
               this.editFormVisible = true;
               const rowData = this.getDataItem(this.editRowIndex);
              this.editFormData = $.extend(true, {}, rowData);
      },
      add:function(){
        const vm = this;
        if(!this.treenode){
            vm.$message({
                type: 'error',
                message: '请选择末级节点新增'
            });
            return;
        }
        this.editRowIndex = -1;
        const crateFormData ={
            vouchertype:this.vouchertype,
            systemid:this.sysvalue,
            moduleValue:this.modulevalue,
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
       changeEditFormVisible: function(val) {
                          this.editFormVisible = val;
        },
       onSubmit: function(formData) {
                if(this.editRowIndex > -1){
                    this.tableData.splice(this.editRowIndex, 1, formData);
                 } else {
                    this.tableData.push(formData);
                }
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

