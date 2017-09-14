<template>
  <div class="product-mgt">

    <!-- title -->
    <div class="title-header">
      <h2 class="name" >产品型号管理</h2>
    </div>
    <div id="search-container">
        <div >
          <el-button class="fr" type="primary" @click="goBack">返回</el-button>
        </div>
    </div>
    <!-- container -->
    <div id="staff-list">
      <el-row type="flex" justify="center" >
        <el-col :span="8">
          <el-button-group style="float: right;">
            <el-button type="primary" icon="plus"  @click="createHClick">新增</el-button>
          </el-button-group>
          <el-table :data="productH" empty-text="暂无数据……"  highlight-current-row fit tripe style="text-align: center; width:100%; height:600px" @row-click="getProductD">
              <el-table-column
                prop="product_name"
                label="品牌"
                >
              </el-table-column>
              <el-table-column
                prop="product_code"
                label="编码"
                sortable
               >
              </el-table-column>
              <el-table-column prop="operate" label="操作" >
                <template scope="scope">
                  <el-button type="primary" icon="edit"  @click="editHClick(scope)" size="small"></el-button>
                  <el-button type="primary" icon="delete" @click="deleteClick('productH',scope)" size="small"></el-button>
                </template>
              </el-table-column>
            </el-table>
        </el-col>
        <el-col :span="8" style="margin-left:20px">
          <el-button-group style="float: right;">
            <el-button type="primary" icon="plus"  @click="createDClick">新增</el-button>
          </el-button-group>
          <el-table :data="productD" empty-text="暂无数据……"  highlight-current-row fit stripe style="text-align: center; width:100%; height:600px" @row-click="getProductModel" :row-class-name="tableRowClassName">
              <el-table-column
                prop="catena_name"
                label="系列"
                sortable
                >
              </el-table-column>
              <el-table-column prop="operate" label="操作" width="150">
                <template scope="scope">
                  <el-button type="primary" icon="edit"  @click="editDClick(scope)" size="small"></el-button>
                  <el-button type="primary" icon="delete" @click="deleteClick('productD',scope)" size="small"></el-button>
                </template>
              </el-table-column>
            </el-table>
        </el-col>
        <el-col :span="8" style="margin-left:20px">
          <el-button-group style="float: right;">
            <el-button type="primary" icon="plus"  @click="createMClick">新增</el-button>
          </el-button-group>
          <el-table :data="productModel" empty-text="暂无数据……" fit stripe style="text-align: center; width:100%; height:600px">
               <el-table-column
                prop="model_name"
                label="型号"
                sortable
                >
              </el-table-column>
              <el-table-column
                prop="guide_price"
                label="指导价"
                sortable
                >
              </el-table-column>
              <el-table-column prop="operate" label="操作">
                <template scope="scope">
                  <el-button type="primary" icon="edit"  @click="editMClick(scope)" size="small"></el-button>
                  <el-button type="primary" icon="delete" @click="deleteClick('productM',scope)" size="small"></el-button>
                </template>
              </el-table-column>
            </el-table>
        </el-col>
      </el-row>
    </div>


    <div>
      <!--系列编辑组件 -->
      <editDForm :formData="editDFormData"  @onSubmit="onDSubmit" :editRowIndex="editDRowIndex" :editFormVisible="editDFormVisible" @changeVisible="changeEditDFormVisible"></editDForm>
      <!--型号编辑组件 -->
      <editMForm :formData="editMFormData"  @onSubmit="onMSubmit" :editRowIndex="editMRowIndex" :editFormVisible="editMFormVisible" @changeVisible="changeEditMFormVisible"></editMForm>
      <!--品牌编辑组件 -->
      <editHForm :formData="editHFormData"  @onSubmit="onHSubmit" :editRowIndex="editHRowIndex" :editFormVisible="editHFormVisible" @changeVisible="changeEditHFormVisible"></editHForm>
    </div>
</div>
</template>
<script>
  import urlRoot from  '../../../common/urlRoot';
  import editDForm from './editDForm.vue';
  import editMForm from './editMForm.vue';
  import editHForm from './editHForm.vue';
  export default {
    //data
    data() {
      return {
        productH: [],
        productD: [],
        productModel: [],
        productHRow: [],
        productDRow: [],
        editDFormVisible: false,
        editDFormData: [],
        editDRowIndex: -1,
        editMFormVisible: false,
        editMFormData: [],
        editMRowIndex: -1,
        editHFormVisible: false,
        editHFormData: [],
        editHRowIndex: -1,
      };
    },
    components:{
      editDForm,
      editMForm,
      editHForm
    },
    //方法
    methods: {
      // 获取数据方法
      // 获取品牌信息
      getProductH: function() {
        const vm = this;
        vm.productH=[];
        $.ajax({
          type: 'get',
          dataType: "json",
          url: urlRoot.urlWepper('fin/productMgt/productHList'),
          success: function(re){
            vm.productH=re.detailMsg.data;
          },
        });
      },
      //获取系列信息
      getProductD: function(row) {
        const vm = this;
        // let paramsMap=new Map();
        // paramsMap.put('fk_id_productdentity',row.pk_product_h);
        // let paramsMap='{fk_id_productdentity='+row.pk_product_h+'}';
        // console.log(paramsMap);
        vm.productD=[];
        vm.productModel=[];
        vm.productHRow=row;
        $.ajax({
          type: 'get',
          dataType: "json",
          contentType:'application/json',
          data:{fk_id_productdentity:row.pk_product_h},
          url: urlRoot.urlWepper('fin/productMgt/productDList'),
          success: function(re){
            vm.productD=re.detailMsg.data;
          },
        });
      },
      //获取型号信息
      getProductModel: function(row) {
        const vm = this;
        vm.productModel=[];
        vm.productDRow=row;
        $.ajax({
          type: 'get',
          dataType: "json",
          contentType:'application/json',
          data:{fk_product_d:row.pk_product_d},
          url: urlRoot.urlWepper('fin/productMgt/productModelList'),
          success: function(re){
            vm.productModel=re.detailMsg.data;
          },
        });
      },
      // 新增方法
      // 系列新增方法
      createDClick:function(){
        this.editDRowIndex = -1;
        const crateFormData ={
          productD:{
            fk_id_productdentity:this.productHRow.pk_product_h,
            catena_name:''
          },
          product_name:this.productHRow.product_name,
        };
        this.editDFormVisible = true;
        this.editDFormData = crateFormData;
      },
      // 型号新增方法
      createMClick:function(){
        this.editMRowIndex = -1;
        const crateFormData ={
          productM:{
            fk_product_h:this.productHRow.pk_product_h,
            fk_product_d:this.productDRow.pk_product_d,
            model_name:'',
            guide_price:'',
            product_date:'',
            stop_date:'',
          },
          catena_name:this.productDRow.catena_name,
          product_name:this.productHRow.product_name,
        };
        this.editMFormVisible = true;
        this.editMFormData = crateFormData;
      },
      // 品牌新增方法
      createHClick:function(){
        this.editHRowIndex = -1;
        const crateFormData ={
          supplier_id:'',
          product_name:'',
          product_code:'',

        };
        this.editHFormVisible = true;
        this.editHFormData = crateFormData;
      },
      //系列编辑方法
      editDClick: function(scope) {
          //获取索引
        this.editDRowIndex = scope.$index;
        this.editDFormVisible = true;
        const editFormData ={
          product_name:this.productHRow.product_name,
          productD:this.productD[this.editDRowIndex],
        };
        this.editDFormData = $.extend(true, {},editFormData);
      },
      //型号编辑方法
      editMClick: function(scope) {
          //获取索引
        this.editMRowIndex =  scope.$index;
        this.editMFormVisible = true;
        const editFormData ={
          productM:this.productModel[this.editMRowIndex],
          product_name:this.productHRow.product_name,
          catena_name:this.productDRow.catena_name,
        };
        this.editMFormData = $.extend(true, {},editFormData);
      },
       //品牌编辑方法
      editHClick: function(scope) {
          //获取索引
        this.editHRowIndex = scope.$index;
        this.editHFormVisible = true;
        this.editHFormData = $.extend(true, {},this.productH[this.editHRowIndex]);
      },

      onHSubmit: function(formData) {
        if(this.editHRowIndex > -1){
         this.productH.splice(this.editHRowIndex, 1, formData);
        }else {
          this.getProductH();
        }
      },
      onDSubmit: function(formData) {
        if(this.editDRowIndex > -1){
         this.productD.splice(this.editDRowIndex, 1, formData);
        }else {
           this.getProductD(this.productHRow);
        }
      },

      onMSubmit: function(formData) {
        if(this.editMRowIndex > -1){
         this.productModel.splice(this.editMRowIndex, 1, formData);
        }else {
           this.getProductModel(this.productDRow);
        }
      },
      changeEditDFormVisible: function(val) {
        this.editDFormVisible = val;
      },

      changeEditMFormVisible: function(val) {
        this.editMFormVisible = val;
      },

      changeEditHFormVisible: function(val) {
        this.editHFormVisible = val;
      },
      deleteClick: function(type,scope) {
        console.log(scope.row);
        let deleteUrl='fin/productMgt/doDeleteProductD';
        if(type==='productM'){
            deleteUrl='fin/productMgt/doDeleteProductModel';
        }else if(type==='productH'){
            deleteUrl='fin/productMgt/doDeleteProductH';
        }
        const vm = this;
        this.$confirm('确定要删除吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
           vm.$http.post(urlRoot.urlWepper(deleteUrl),scope.row)
            .then((re) => {
              let msg = '';
              if (re.data.success === 'success'){
                // vm.tableData.splice(scope.$index,1);
                if(type==='productM'){
                    vm.productModel.splice(scope.$index,1);
                }else if(type==='productH'){
                   vm.productH.splice(scope.$index,1);
                }else if(type==='productD'){
                    vm.productD.splice(scope.$index,1);
                }
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
      tableRowClassName:function(row, index) {
        if (index === 1) {
          return 'info-row';
        } else if (index === 3) {
          return 'positive-row';
        }
        return '';
      },

      //返回方法
      goBack() {
        history.go(-1);
      },
    },

    created: function(){
      this.getProductH();
    }
  };
</script>
<style>
   .el-table .info-row {
    background: #c9e5f5;
  }

  .el-table .positive-row {
    background: #e2f0e4;
  }
  .product-mgt{
    padding:20px 30px;
  }

  .text {
    font-size: 14px;
  }

  .item {
    padding: 18px 0;
  }

  .clearfix:before,
  .clearfix:after {
      display: table;
      content: "";
  }
  .clearfix:after {
      clear: both
  }

  .box-card {
    width: 350px;
    height:450px;
  }
</style>
