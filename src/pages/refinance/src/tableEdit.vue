<template>
  <el-dialog v-model="editFormVisible" size="large" @close="onClose" :title="资产打包" @open="onOpen" >
        <h4>资产项目信息</h4>

        <el-row class="formItem" >
            <el-form-component :form="form" @onSubmit="onSubmit" @onCancel="onCancel" ></el-form-component>
        </el-row>

        <el-row class="filterBox" :gutter="20"  type="flex" justify="center" >
          <el-col :span="4">
           <span>资产融资基数:{{this.fin_base}}</span> 
          </el-col>
          <el-col :span="4">
           <span>支付表数量:{{this.payment_table_number}}</span> 
          </el-col :span="4">
          <el-col>
            <span>项目金额:{{this.assetproject_amount}}</span>
          </el-col>
        </el-row>
        <!-- 表单 -->
        <el-table
          :data="tabledata"
          empty-text="暂无数据……"
          border
          stripe
          style="text-align: center;"
          @select="selectsss"
          :summary-method="getSummaries"
           >
          <el-table-column
            v-for="item in columns"
            :prop="item.flag"
            :label="item.name"
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
              <el-button @click="deleteClick(scope)" type="primary" size="small">移除</el-button>
            </el-button-group>
            </template>
          </el-table-column>
        </el-table>
        <!-- 新增和保存 -->
        <div class="tableEdit_button">
            <el-button @click="onAddtable" type="primary"  size="small" v-if="showaddbutton">{{addbuttontitle}}</el-button>
            <el-button @click="onSave" type="primary"  size="small" v-if="showsavebutton">保存</el-button>
        </div>
          <el-table
          :data="alltabledata"
          empty-text="暂无数据……"
          border
          stripe
          style="text-align: center;"
          @select="selectsss"
          :summary-method="getSummaries"
           v-if="showaddtable==='true'">
          <el-table-column
            v-for="item in columns"
            :prop="item.flag"
            :label="item.name"
            >
             <template scope="scope" :item="item">
              <div v-if="item.flag==='fin_status'">
                <span v-if="scope.row.fin_status===1 || scope.row.fin_status==='1'">已被选</span>
                <span v-else>可选</span>
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
              <el-button @click="addClick(scope)" type="primary" size="small">添加</el-button>
            </el-button-group>
            </template>
          </el-table-column>
        </el-table>
  </el-dialog>
</template>
<script>
  export default {
  data() {
    return {
      s_editFormVisible:false,
      showaddtable:false,
      upList:[],//增加的项目
      deleteList:[],//删除的项目
      alldata:[],
      addbuttontitle:"新增",
      payment_table_number:0,
      assetproject_amount:0,
      fin_base:"",
      columns: [
        {
          flag: 'fin_status',
          name: '状态',
        },
        {
          flag: 'customer_name',
          name: '客户名称',
        },
        // {
        //   flag: 'customer_type',
        //   name: '客户类型 ',
        // },
        // {
        //   flag: 'contract_number',
        //   name: '合同编号',
        // },
        // {
        //   flag: 'payment_table_code',
        //   name: '支付表编号',
        // },
        // {
        //   flag: 'rent_date',
        //   name: '起租日期 ',
        // },
        {
          flag: 'lease_term',
          name: '租赁期限',
        },
        {
          flag: 'fin_amount',
          name: '可融资金额',
        },
        // {
        //   flag: 'paid_rent',
        //   name: '已还租金  ',
        // },
        {
          flag: 'unpaid_rent',
          name: '未还租金',
        },
        // {
        //   flag: 'principal_returned',
        //   name: '已还本金',
        // },
        {
          flag: 'outstanding_principal ',
          name: '未还本金',
        },
        {
          flag: 'overdue_days ',
          name: '逾期天数',
        },
        // {
        //   flag: 'is_mortgage ',
        //   name: '是否抵押',
        // },
        // {
        //   flag: 'is_insurance ',
        //   name: '是否保险',
        // },
      ],
   };
},
 props: ['tabledata', 'editFormVisible','form','alltabledata','showaddbutton','showsavebutton','formtitle'],
 methods: {
  // tool 
  // removeByValue:function (arr, val) {
  // for(var i=0; i<arr.length; i++) {
  //   if(arr[i] === val) {
  //     arr.splice(i, 1);
  //     break;
  //    }
  //   }
  // },
  onClose() {
    this.s_editFormVisible = false;
  },
  deleteClick: function(scope) {
  const vm = this;
  this.$confirm('确定要删除吗?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
  }).then(() => {
      this.deleteList.push(scope.row);
      vm.tabledata.splice(scope.$index,1);
      this.alltabledata.splice(0,0,scope.row);//在表格最上边加入数据
      // removeByValue(this.upList,scope.row);
      const  dList=scope.row;
      dList.Pk_fin_assetproject="";
      // this.downList.push(scope.row);
      this.payment_table_number=this.payment_table_number-1;
      this.assetproject_amount=this.assetproject_amount-scope.row.fin_amount;
      console.log(vm.tabledata);
      vm.$message({
        type: 'info',
        message: '删除成功！',
      });
     });
   },
   // 修改保存所有的数据
   onSave() {
      const formdata = {};
      this.form.formData.forEach((item) => {
        formdata[item.key] = item.value;
      });
      this.$emit('onSave',this.deleteList,this.tabledata,formdata);
      // 访问后台
   },
   // 从表单控件传递过来的，提交表单的数据
   onSubmit(data) {
     this.s_editFormVisible = false;
     const formData2 = _.cloneDeep(data);
     // data.pk_ref=tabledata;
   formData2.ref_pk__assetscreenentity=this.tabledata;
   this.$emit('onSubmit', formData2);
    },
  onCancel() {
    this.s_editFormVisible = false;
    // this.showaddtable="false";//关闭时，将参数设置为初始值
    // this.addbuttontitle="新增";
  },
  onAddtable(){
    // 切换新增表单是否显示
    this.showaddtable=this.showaddtable==="true"?"false":"true";
    // alert(this.showaddtable);

    if(this.addbuttontitle==="新增"){
      this.$emit('getAllscreendata',this.addbuttontitle);
    }
    this.addbuttontitle=this.addbuttontitle==="新增"?"关闭":"新增";
  },
  addClick(scope){
    this.alltabledata.splice(scope.$index,1);
    this.tabledata.splice(0,0,scope.row);//在表格最上边加入数据
    // this.removeByValue(this.downList,scope.row);
    // const  uList=scope.row;
    // uList.Pk_fin_assetproject="";
    this.upList.push(scope.row);
    this.payment_table_number=this.payment_table_number+1;
    this.assetproject_amount=this.assetproject_amount+scope.row.fin_amount;
  },
  onOpen(){
    // this.payment_table_number=this.form.formData[2].value;//支付表数量
    // this.assetproject_amount=this.form.formData[3].value;//项目金额
    for(var i=0;i< this.form.formData.length;i++){
        var data=this.form.formData[i];
        //获取支付表数量
        if(data.key==="payment_table_number"){
          this.payment_table_number=data.value;
        }else if(data.key==="assetproject_amount"){
          this.assetproject_amount=data.assetproject_amount;
        }
    }
    this.fin_base=this.form.formData[9].value;//资产融资基数
    this.showaddtable="false";//重新打开时，将参数设置为初始值
    this.addbuttontitle="新增";//重新打开时，将参数设置为初始值
  }
},
  watch: {
      editFormVisible: function(value) {
        this.s_editFormVisible = value;
      },
      s_editFormVisible: function(value) {
        this.$emit('changeVisible', value);
      },
    },
components:{},

};
</script>
<style>
    .formBox{ padding: 20px 10px; width: 100%; }
    .formItem {margin-top:15px;}
    .formItem__label{ width: 120px; height: 36px; line-height: 36px; text-align: right; display: inline-block; text-overflow: ellipsis; overflow: hidden; white-space: nowrap; }
    .formItem__prepend{ min-width: 15px; display: inline-block; text-align: center; }
    .filterBox, .pagination { margin:20px 0; }
    .tableEdit_button{
      margin: 15px 0px;
    }
</style>
