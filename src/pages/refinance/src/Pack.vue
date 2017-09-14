<template>
  <el-dialog v-model="editFormVisible" size="large" @close="onClose" :title="title" >
        <formcomponent :form="form" @onSubmit="onSubmit" @onCancel="onCancel" ></formcomponent>
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
              <el-button @click="deleteClick(scope)" type="primary" icon="delete" size="small"></el-button>
            </el-button-group>
            </template>
          </el-table-column>
        </el-table>

  </el-dialog>
</template>
<script>
  import formcomponent from './components.vue';
  export default {
  data() {
    return {
      title:"资产项目新增",//弹出框标题
      s_editFormVisible:false,
      showaddtable:false,
      upList:[],
      deleteList:[],//删除的项目
      alldata:[],
      addbuttontitle:"新增",
      columns: [
        {
          flag: 'fin_status',
          name: '状态',
        },
        {
          flag: 'customer_name',
          name: '客户名称',
        },
        {
          flag: 'customer_type',
          name: '客户类型 ',
        },
        // {
        //   flag: 'contract_number',
        //   name: '合同编号',
        // },
        // {
        //   flag: 'payment_table_number',
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
        {
          flag: 'paid_rent',
          name: '已还租金  ',
        },
        {
          flag: 'unpaid_rent',
          name: '未还租金',
        },
      ],
   };
},
 props: ['tabledata', 'editFormVisible','form'],
 methods: {
  // tool 
  removeByValue:function (arr, val) {
  for(var i=0; i<arr.length; i++) {
    if(arr[i] === val) {
      arr.splice(i, 1);
      break;
     }
    }
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
      // this.alltabledata.splice(0,0,scope.row);//在表格最上边加入数据
      // removeByValue(this.upList,scope.row);
      // const  dList=scope.row;
      // dList.Pk_fin_assetproject="";
      // this.downList.push(scope.row);
      // console.log(vm.tabledata);
      vm.$message({
        type: 'info',
        message: '删除成功！',
      });
     });
   },
   // 从表单控件传递过来的，提交表单的数据
   onSubmit(data) {
     this.s_editFormVisible = false;
     const formData2 = _.cloneDeep(data);
     // data.pk_ref=tabledata;
   // alert(JSON.stringify(data));
   formData2.ref_pk__assetscreenentity=this.tabledata;
   this.$emit('onSubmit', formData2);
    },
  onCancel() {
    this.s_editFormVisible = false;
  },
},
  watch: {
      editFormVisible: function(value) {
        this.s_editFormVisible = value;
      },
      s_editFormVisible: function(value) {
        this.$emit('changeVisible', value);
      },
    },
components:{formcomponent},

};
</script>
<style>
    .formBox{ padding: 20px 10px; width: 100%; }
    .formItem{ margin-bottom: 10px; }
    .formItem__label{ width: 120px; height: 36px; line-height: 36px; text-align: right; display: inline-block; text-overflow: ellipsis; overflow: hidden; white-space: nowrap; }
    .formItem__prepend{ min-width: 15px; display: inline-block; text-align: center; }
</style>
