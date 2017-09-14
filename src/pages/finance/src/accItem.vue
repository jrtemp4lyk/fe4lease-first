<template>
<div class="accItem">
  <div class="title-header">
    <h2 class="name" >会计科目</h2>
  </div>
  <div id="search-container">
    <div >
      <el-button class="fl" type="primary"@click="createClick">增加</el-button>
      <!-- <el-button type="primary"@click="">删除</el-button> -->
      <el-button class="fr" type="primary" @click="goBack">返回</el-button>
<!--       <el-button type="primary">导入</el-button>
      <el-button type="primary">导出</el-button> -->

    </div>
  </div>


<div id="staff-list">
  <el-row >
    <el-col :span="8">
      <div>
          <span class="voucherTmp_input_name">会计科目体系:</span>
          <el-select v-model="value" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
          </el-select>
      </div>
    </el-col>
  </el-row>


<el-tabs v-model="activeName" @tab-click="handleClick">
<el-tab-pane label="资产" name="first">
  <el-table
        ref="multipleTable"
        :data="tableData"
        border
        style="width: 100%;text-align:center"
        @selection-change="handleSelectionChange">
    <el-table-column
      type="selection"
      >
    </el-table-column>
    <el-table-column v-for="item in items" :prop="item.flag" :label="item.name" >
    </el-table-column>
    <el-table-column prop="operate" label="操作">
      <template scope="scope">
        <el-button-group>
          <el-button @click="editClick(scope)" type="primary" icon="edit" size="small"></el-button>
          <el-button @click="deleteClick(scope)" type="primary" icon="delete" size="small"></el-button>
        </el-button-group>
      </template>
    </el-table-column>

  </el-table>
</el-tab-pane>


<el-tab-pane label="负债" name="twice">
<!--   <el-table
        ref="multipleTable"
        :data="tableData"
        height="250"
        border
        style="width: 100%"
        @selection-change="handleSelectionChange">
    <el-table-column
      type="selection"
      width="55">
    </el-table-column>
    <el-table-column v-for="item in items" :prop="item.flag" :label="item.name" :width="item.width" :fixed="item.fixed"  >
    </el-table-column>
    <el-table-column prop="operate" label="操作" width="100" fixed="right"  >
      <template scope="scope">
        <el-button-group>
          <el-button @click="editClick(scope)" type="primary" icon="edit" size="small"></el-button>
          <el-button @click="deleteClick(scope)" type="primary" icon="delete" size="small"></el-button>
        </el-button-group>
      </template>
    </el-table-column>

  </el-table> -->
</el-tab-pane>


<el-tab-pane label="权益" name="third">
<!--   <el-table
        ref="multipleTable"
        :data="tableData"
        height="250"
        border
        style="width: 100%"
        @selection-change="handleSelectionChange">
    <el-table-column
      type="selection"
      width="55">
    </el-table-column>
    <el-table-column v-for="item in items" :prop="item.flag" :label="item.name" :width="item.width" :fixed="item.fixed"  >
    </el-table-column>
    <el-table-column prop="operate" label="操作" width="100" fixed="right"  >
      <template scope="scope">
        <el-button-group>
          <el-button @click="editClick(scope)" type="primary" icon="edit" size="small"></el-button>
          <el-button @click="deleteClick(scope)" type="primary" icon="delete" size="small"></el-button>
        </el-button-group>
      </template>
    </el-table-column>

  </el-table> -->
</el-tab-pane>


<el-tab-pane label="成本" name="fourth">
<!--   <el-table
        ref="multipleTable"
        :data="tableData"
        height="250"
        border
        style="width: 100%"
        @selection-change="handleSelectionChange">
    <el-table-column
      type="selection"
      width="55">
    </el-table-column>
    <el-table-column v-for="item in items" :prop="item.flag" :label="item.name" :width="item.width" :fixed="item.fixed"  >
    </el-table-column>
    <el-table-column prop="operate" label="操作" width="100" fixed="right"  >
      <template scope="scope">
        <el-button-group>
          <el-button @click="editClick(scope)" type="primary" icon="edit" size="small"></el-button>
          <el-button @click="deleteClick(scope)" type="primary" icon="delete" size="small"></el-button>
        </el-button-group>
      </template>
    </el-table-column>

  </el-table> -->
</el-tab-pane>


<el-tab-pane label="损益" name="fith">
<!--   <el-table
        ref="multipleTable"
        :data="tableData"
        height="250"
        border
        style="width: 100%"
        @selection-change="handleSelectionChange">
    <el-table-column
      type="selection"
      width="55">
    </el-table-column>
    <el-table-column v-for="item in items" :prop="item.flag" :label="item.name" :width="item.width" :fixed="item.fixed"  >
    </el-table-column>
    <el-table-column prop="operate" label="操作" width="100" fixed="right"  >
      <template scope="scope">
        <el-button-group>
          <el-button @click="editClick(scope)" type="primary" icon="edit" size="small"></el-button>
          <el-button @click="deleteClick(scope)" type="primary" icon="delete" size="small"></el-button>
        </el-button-group>
      </template>
    </el-table-column>

  </el-table> -->
</el-tab-pane>

</el-tabs>
</div>
   <editForm :formData="editFormData"  @onSubmit="onSubmit" :editRowIndex="editRowIndex" :editFormVisible="editFormVisible" @changeVisible="changeEditFormVisible"></editForm>
</div>

</template>
<script>
import  urlRoot from  '../../../common/urlRoot';
import editForm from './accItemEdit.vue';
  export default {
    data() {
      return {
        tableData: [],
        activeName: 'first',
        options: '',
        value: '',
        items: [
          {
            flag: 'itemcode',
            name: '科目编码',
          },
          {
            flag: 'itemname',
            name: '科目名称',
          },
          {
            flag: 'itemtype',
            name: '科目类别',
          },
          {
            flag: 'balancedirect',
            name: '余额方向',
          },
          {
            flag: 'remark',
            name: '备注',
          },
          {
            flag: 'enablestate',
            name: '启用状态',
          },
        ],
        editFormVisible: false,
        editFormData: [],
        editRowIndex: -1,
      };
    },
    methods: {
        deleteClick: function(scope) {
                    const vm = this;
                    this.$confirm('确定要删除吗?', '提示', {
                      confirmButtonText: '确定',
                      cancelButtonText: '取消',
                      type: 'warning'
                    }).then(() => {
                      vm.$http.post(urlRoot.urlWepper('/fin/finance/accItemDelete'),scope.row)
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
      getDataItem: function(index) {
                    return this.tableData[index];
      },
      editClick: function(scope) {
                   this.editRowIndex = scope.$index;
                   this.editFormVisible = true;
                   const rowData = this.getDataItem(this.editRowIndex);
                  this.editFormData = $.extend(true, {}, rowData);
          },
      handleClick(tab, event) {
        console.log(tab, event);
      },
      getData: function() {
              const vm = this;
              $.ajax({
                type: 'get',
                dataType: "json",
                url: urlRoot.urlWepper('fin/finance/list'),
                success: function(re){
                  vm.tableData=re;
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
                itemcode:'',
                itemname:'',
                itemtype:'',
                balancedirect: '',
                remark:'',
                assval:[],
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

    },
    created(){
       this.getData();
    },
    components:{
       editForm,
    },
  };
</script>
<style>
  .accItem{
    padding:20px 30px;
  }
</style>

