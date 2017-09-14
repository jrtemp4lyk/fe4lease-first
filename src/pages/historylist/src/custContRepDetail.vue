<template>
 <div class="custContRepDetail">
  <div class="container">
    <el-form ref="formData" :model="formData"  v-model="s_editFormVisible" label-width="140px":inline="true" >
      <h4>客户基本信息</h4>
      <el-form-item label="客户名称">
        <el-input v-model="formData.customer_name" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="性别">
        <el-input v-model="formData.sex" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="手机号码">
        <el-input v-model="formData.mobile" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="证件类型">
        <el-input v-model="formData.document_type" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="证件号码">
        <el-input v-model="formData.document_id" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="出生日期">
        <el-input v-model="formData.birthday" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="最高学历">
        <el-input v-model="formData.education" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="户口所在地">
        <el-input v-model="formData.birth_address" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="现住址">
        <el-input v-model="formData.address" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="婚姻状况">
        <el-input v-model="formData.marriage" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="联系QQ">
        <el-input v-model="formData.connect_qq" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="所在公司名称">
        <el-input v-model="formData.company_name" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="公司类型">
        <el-input v-model="formData.company_type" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="公司地址">
        <el-input v-model="formData.company_address" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="行业性质">
        <el-input v-model="formData.industry_type" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="公司电话">
        <el-input v-model="formData.company_phone" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="职位">
        <el-input v-model="formData.position" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="房产信息">
        <el-input v-model="formData.house_type" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="居住年限">
        <el-input v-model="formData.living_year" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="户口性质">
        <el-input v-model="formData.nature" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="工作年限">
        <el-input v-model="formData.work_total" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="主要收入来源">
        <el-input v-model="formData.income" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="年收入">
        <el-input v-model="formData.income_year" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="月收入">
        <el-input v-model="formData.income_month" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="月支出">
        <el-input v-model="formData.cost_month" :disabled="true"></el-input>
      </el-form-item>

      <el-form-item label="客户id">
        <el-input v-model="finPayCode" :disabled="true"></el-input>
      </el-form-item>
      <!--点击取消的时候刷新列表初始化客户信息-->
<!--       <div class="custContRepDetail_button">
        <el-button type="primary" @click="onCancel">返&nbsp;&nbsp;&nbsp;&nbsp;回</el-button>
      </div> -->
    </el-form>
  </div>
 </div>
</template>
<script>
  import  urlRoot from  '../../../common/urlRoot';
  export default {
    data() {
      return {
        activeName: 'second',
        valueTrue: true,
        valueFalse: false,
        tableData: [{creater:"张三",finCustormName:"河北省"}],
        items: [{
          flag: 'creater',
          name: '客户名称',
          width: 100,
        },
          {
            flag: 'finPayCode',
            name: '联系方式',
            width: 100,
          },
          {
            flag: 'finCustormName',
            name: '支付表号',
            width: 100,
          }],
        s_editFormVisible: false,
        multipleSelection: [],
        routeCards:[],

        tabActiveName:'',
      };
    },
    props:['menuList','formData','editFormVisible', 'editRowIndex','finPayCode'],
    components: {

    },
    methods: {
      getData: function() {
        const vm = this;
        $.ajax({
          type: 'get',
          dataType: "json",
          url: 'fin/dic/list',
          success: function(re){
            vm.tableData=re.content;
          },
        });
      },
      queryCustConDetail:function(){
        const vm = this;
        $.ajax({
          type: 'post',
          dataType: "json",
          data:{customer_id:this.finPayCode},
          url:urlRoot.urlWepper('fin/remind/custAndConDetail') ,
          success: function(re){
            vm.formData=re.detailMsg.data[0];
          },
        });
      },
      handleClick(tab, event) {
        console.log(tab, event);
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      tabClick(){
        console.log(this);
        this.$parent.$router.push(this.tabActiveName);
      },

      // onCancel() {
      //   this.s_editFormVisible = false;
      // },
    },
    watch: {
      editFormVisible: function(value) {
        this.s_editFormVisible = value;
      },
      s_editFormVisible: function(value) {
        this.$emit('changeVisible', value);
      },
    },
    created(){
      this.queryCustConDetail();
      this.getData();
    }
  };
</script>
<style>
  .custContRepDetail .container {
    margin-left: 0px;
    margin-top:15px;
  }
  .custContRepDetail_button {
    margin-left: 60px;
  }
  .custContRepDetail .index>.el-tabs__header{
    width: 96%;
  }
  .custContRepDetail .index>.el-tabs__content{
    margin-top: 0px;
  }
</style>
