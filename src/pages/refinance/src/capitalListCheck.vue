<template>
  <el-dialog v-model="editFormVisible" size="large"    @close="onClose">
    <div class="capitalListCheck">
      <div class="title-header">
        <h2 class="name" >详情查看</h2>
      </div>

      <div id="search-container">
          <div class="fl">
           <!--  <el-button type="primary" >返回</el-button> -->
          </div>
      </div>

      <div id="staff-list">
    <!--      <div id="capitalListCheck_title"> -->

              <el-row id="staff-list" :gutter="40">
              <div class="capitalListInfo_container">
                            <el-col class="capitalListInfo_container_col" :span="18">
              <div >
                <p>
                  <el-tag type="success" class="capitalListInfo_tag">转租赁</el-tag>
                  <span class="capitalListInfo_info">行业:乘用车</span>
                  <span class="capitalListInfo_info"> <span class="capitalListInfo_info_img"> <img src="../../../assets/images/people_fill.png" alt="">  </span> 融资方:{{this.pushinfo.name}}</span> 
                  <span class="capitalListInfo_info">资产数量:{{this.pushinfo.totaltime}}</span>
                </p>
                <div class="capitalListInfo_main">
                  <el-col :span="8">
                    <div>
                    <!-- 110.000.000 -->
                      <p class="capitalListInfo_plan_amount">{{this.pushinfo.assetproject_amount}}<span style="font-size:10px; color:gray">元</span</p>
                      <p class="capitalListInfo_plan_word">计划融资金额</p>
                    </div>
                  </el-col>
                  <el-col :span="5">
                    <div>
                      <p class="capitalListInfo_plan_amount"> {{this.pushinfo.plan_finperiod}}<span style="font-size:10px; color:gray">(月)</span> </p>
                      <p class="capitalListInfo_plan_word">计划融资时间</p>
                    </div>
                  </el-col>
                  <el-col :span="5">
                    <div>
                      <p class="capitalListInfo_plan_amount">8<span style="font-size:10px; color:gray">%</span</p>
                      <p class="capitalListInfo_plan_word">预期利率</p>
                    </div>
                  </el-col>
                  <el-col :span="6">
                    <div>
                      <p class="capitalListInfo_plan_amount">是</p>
                      <p class="capitalListInfo_plan_word">是否提供担保</p>
                    </div>
                  </el-col>
                </div>
              </div>
            </el-col>

                <el-col :span="5" class="capitalListInfo_container_col">
                  <div class="capitalListInfo_right" >
                     <p class="capitalListInfo_countdown">接受倒计时:&nbsp;&nbsp;<span style="font-size:40px; color:red; font-weight:bold">5</span>&nbsp;&nbsp;天</p>
    <!--                  <el-button type="text" @click="receive(item)">接收</el-button> -->
    <!--                  <el-button type="text">忽略</el-button> -->
    <!--                  <el-button type="text" @click="checkDetail">查看</el-button> -->
                     <!-- <el-button type="text" class="button"  @click="Collection(item)"></el-button> -->
                  </div>
                </el-col>
              </div>
              </el-row>

      <!-- 资产包描述信息 -->
      <div id="staff-list">
           <span>融资经理:</span>
           <span>联系电话:</span>
           <span>资产项目名称:</span>
           <span>资产包描述信息:</span>
      </div>

         <!-- </div -->
<!-- @tab-click="handleClick" -->
<!--       <el-tabs v-model="activeName2" type="card" >
        <el-tab-pane label="资产信息" name="first"> -->

          <div id="staff-list">
              <el-row type="flex" justify="center">
              <el-col :span="24">
                <el-table
                  v-loading.body="loading"
                  :data="checkDetailtableData"
                  empty-text="暂无数据……"
                  border
                  stripe
                  style="text-align: center;">
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
<!--                   <el-table-column
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
                  </el-table-column> -->
                </el-table>
              </el-col>
            </el-row>
            <el-pagination id="staff-pagination"
                           :current-page="filter.cur_page"
                           :page-sizes="[5, 10, 20, 50, 100]"
                           :page-size="filter.per_page"
                           layout="total, sizes, prev, pager, next, jumper">
            </el-pagination>
        </div>

<!--         </el-tab-pane>
        <el-tab-pane label="配置管理" name="second">配置管理</el-tab-pane>
        <el-tab-pane label="角色管理" name="third">角色管理</el-tab-pane>
        <el-tab-pane label="定时任务补偿" name="fourth">定时任务补偿</el-tab-pane>
      </el-tabs> -->

      </div>

    </div>
   </el-dialog>
</template>
<script>
import  urlRoot from  '../../../common/urlRoot';
  export default {
    data() {
      return {
        loading: false,
        tabledata:[],//资产信息
        s_editFormVisible : false,
        columns: [
          // {
          //   flag: 'fin_status',
          //   name: '状态',
          //   // width: 130,
          // },
          {
            flag: 'customer_name',
            name: '客户名称',
            // width: 70,
            // fixed:true,
          },
          {
            flag: 'customer_type',
            name: '客户类型 ',
            // width: 70,
          },
          // {
          //   flag: 'contract_number',
          //   name: '合同编号',
          //   // width: 140,
          // },
          /*{
            flag: 'payment_table_number',
            name: '支付表编号',
            // width: 140,
          },*/
          {
            flag: 'rent_date',
            name: '起租日期 ',
            // width: 140,
          },
          {
            flag: 'lease_term',
            name: '租赁期限',
            // width: 200,
          },
                  {
            flag: 'fin_amount',
            name: '可融资金额',
            // width: 140,
          },
          {
            flag: 'paid_rent',
            name: '已还租金  ',
            // width: 140,
          },
          {
            flag: 'unpaid_rent',
            name: '未还租金',
            // width: 200,
          },
          {
            flag: 'principal_returned',
            name: '已还本金',
            // width: 200,
          },
          {
            flag: 'outstanding_principal ',
            name: '未还本金',
            // width: 200,
          },
          {
            flag: 'overdue_days ',
            name: '逾期天数',
            // width: 200,
          },
          {
            flag: 'is_mortgage ',
            name: '是否抵押',
            // width: 200,
          },
          {
            flag: 'is_insurance ',
            name: '是否保险',
            // width: 200,
          },
        ],
        filter: {
          per_page: 10, //页大小
          page: 1, // 当前页
          sex: '',
          isAbsence: '',
          keywords: '',
        },
      };
    },
    props: ['pushinfo','editFormVisible','checkDetailtableData'],
    methods: {
        onOpen: function() {
          // debugger;
          // alert(pushinfo.pk_fin_assetproject);
          // alert(this.pushinfo.pk_fin_assetproject);
          const vm = this;
          vm.tableData = [];
          this.loading = true;
          setTimeout(() => {
            this.loading = false;
          },3000);
          // const param=getParam();
          // "3eff4a523bc911e7b362002324e25665"
          vm.$http.post(urlRoot.urlWepper('/fin/capitalReceive/assetDetails'),{project:this.pushinfo.pk_fin_assetproject})
            .then((re) => {
              let msg = '';
              if (re.data.success === 'success'){
                let metaData = {};
                if (re.data.detailMsg && re.data.detailMsg.data){
                  metaData = re.data.detailMsg.data;
                }
                vm.tableData = (metaData.content instanceof Array) ? metaData.content : [];
                 vm.tableData=metaData.content;
                // alert(JSON.stringify(vm.tableData));
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
        //tool
        getParam(){
          // debugger;
          const str=location.hash;//获得当前的路径
          const param=str.split('?')[1];//按照？进行分割
          var  jsonarray=[];
          var jsonobject={};
          var  pk="";
          for(var i=0;i<param.length;i++){
            if(i%2){
              var value=param[i];
              jsonobject={pk,value};
              jsonarray.push(jsonobject);
            }else{
              pk=param[i];
            }
          }
          return jsonarray;
        },
        onClose(){
         this.s_editFormVisible = false;
        },
    },
    created(){
      // this.getData();
    },
    // components: {
    // },
    watch: {
      editFormVisible: function(value) {
         this.s_editFormVisible = value;
      },
      s_editFormVisible: function(value) {
         this.$emit('changeVisible', value);
      },
    },
  };
</script>
<style>
 .capitalListCheck{
    padding:20px 30px;
  }
  #capitalListCheck_title {
    width: 1100px;
    margin:0 auto;
    height: 300px;
    background: gray;
  }
  /**/
  /**/
   .capitalListInfo{
      padding:20px 30px;
    }
    .capitalListInfo_tag{
      font-size: 20px;
      margin-left:4%;
      margin-right:7%;
    }
    .capitalListInfo_info {
      font-size: 18px;
      margin-right: 10%;
    }
    .capitalListInfo_plan_amount {
      font-size: 20px;
      margin-bottom: 15px;
      margin-top: 5px;
      font-weight: bold;
    }
    .capitalListInfo_main {
      margin-top: 15px;
      margin-left:4%;
      overflow: hidden;
    }
    .capitalListInfo_plan_word{
      font-size: 13px;
      color: gray;
    }
    .capitalListInfo_countdown {
      font-size: 18px;
      margin-top: 10px;
      margin-bottom: 20px;
    }
    .capitalListInfo_right .el-button{
      font-size: 18px;
    }
    .capitalListInfo_container{
      overflow: hidden;
      border: 1px solid #ddd;
    }
    .capitalListInfo_container_col{
      margin-top: 20px;
      margin-bottom: 20px;
    }
    .capitalListInfo_container_right{
      margin-left:3%;
    }
    .capitalListInfo_info_img >img{
      width: 10px;
      height: 10px;
    }
</style>
