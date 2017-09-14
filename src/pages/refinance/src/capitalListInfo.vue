<template>
  <div class="capitalListInfo">
    <div class="title-header">
      <h2 class="name" >资产项目展示</h2>
    </div>

    <div id="search-container">
      <div class="fr">
        <el-button type="primary" @click="goBack">返回</el-button>
      </div>
    </div>
  <el-tabs v-model="activeName"   >
      <el-tab-pane label="接收" name="first" >
<!-- 块信息开始 -->
        <div  v-for="item in tableDataReceive">
          <el-row id="staff-list" :gutter="40">
          <div class="capitalListInfo_container">
            <el-col class="capitalListInfo_container_col" :span="18">
              <div >
                <p>
                  <el-tag type="success" class="capitalListInfo_tag">转租赁</el-tag>
                  <span class="capitalListInfo_info">行业:乘用车</span>
                  <span class="capitalListInfo_info"> <span class="capitalListInfo_info_img"> <img src="../../../assets/images/people_fill.png" alt="">  </span> 融资方:北京租赁车有限公司</span>
                  <span class="capitalListInfo_info">资产数量:125</span>
                </p>
                <div class="capitalListInfo_main">
                  <el-col :span="8">
                    <div>
                      <p class="capitalListInfo_plan_amount">110.000.000<span style="font-size:10px; color:gray">元</span</p>
                      <p class="capitalListInfo_plan_word">计划融资金额</p>
                    </div>
                  </el-col>
                  <el-col :span="5">
                    <div>
                      <p class="capitalListInfo_plan_amount">36 <span style="font-size:10px; color:gray">(月)</span> </p>
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
                 <el-button type="text" @click="receive(item)" v-if="item.receivestate<2">接收</el-button>
                 <!-- <el-button type="text" @click="ignore(item)" >忽略</el-button>
                 <el-button type="text" @click="checkDetail" @click="detailedInfo(item)" >查看</el-button> -->
                 <el-button type="text" @click="checkDetail(item)">查看</el-button>
                 <el-button type="text" class="button" :icon="item.iconcollection" @click="Collection(item)" v-if="item.receivestate<2" ></el-button>
              </div>
            </el-col>
          </div>
          </el-row>
        </div>
      </el-tab-pane>

      <el-tab-pane label="收藏" name="second" >
        <div  v-for="item in tableDataCollenction">
          <el-row id="staff-list" :gutter="40">
          <div class="capitalListInfo_container">
            <el-col class="capitalListInfo_container_col" :span="18">
              <div >
                <p>
                  <el-tag type="success" class="capitalListInfo_tag">转租赁</el-tag>
                  <span class="capitalListInfo_info">行业:乘用车</span>
                  <span class="capitalListInfo_info"> <span class="capitalListInfo_info_img"> <img src="../../../assets/images/people_fill.png" alt="">  </span> 融资方:北京租赁车有限公司</span>
                  <span class="capitalListInfo_info">资产数量:125</span>
                </p>
                <div class="capitalListInfo_main">
                  <el-col :span="8">
                    <div>
                      <p class="capitalListInfo_plan_amount">110.000.000<span style="font-size:10px; color:gray">元</span</p>
                      <p class="capitalListInfo_plan_word">计划融资金额</p>
                    </div>
                  </el-col>
                  <el-col :span="5">
                    <div>
                      <p class="capitalListInfo_plan_amount">36 <span style="font-size:10px; color:gray">(月)</span> </p>
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
                 <el-button type="text" @click="receive(item)">接收</el-button>
<!--                  <el-button type="text">忽略</el-button> -->
                <!--  <el-button type="text" @click="checkDetail">查看</el-button> -->
                 <el-button type="text" class="button" :icon="item.iconcollection" @click="Collection(item)"></el-button>
              </div>
            </el-col>
          </div>
          </el-row>
        </div>
      </el-tab-pane>

      <el-tab-pane label="全部" name="third" >
        <div  v-for="item in tableData">
          <el-row id="staff-list" :gutter="40">
          <div class="capitalListInfo_container">
            <el-col class="capitalListInfo_container_col" :span="18">
              <div >
                <p>
                  <el-tag type="success" class="capitalListInfo_tag">转租赁</el-tag>
                  <span class="capitalListInfo_info">行业:乘用车</span>
                  <span class="capitalListInfo_info"> <span class="capitalListInfo_info_img"> <img src="../../../assets/images/people_fill.png" alt="">  </span> 融资方:{{item.name}}</span>
                  <span class="capitalListInfo_info">资产数量:{{item.totaltime}}</span>
                </p>
                <div class="capitalListInfo_main">
                  <el-col :span="8">
                    <div>
                    <!-- 110.000.000 -->
                      <p class="capitalListInfo_plan_amount">{{item.assetproject_amount}}<span style="font-size:10px; color:gray">元</span</p>
                      <p class="capitalListInfo_plan_word">计划融资金额</p>
                    </div>
                  </el-col>
                  <el-col :span="5">
                    <div>
                      <p class="capitalListInfo_plan_amount"> {{item.plan_finperiod}}<span style="font-size:10px; color:gray">(月)</span> </p>
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
                 <el-button type="text" @click="receive(item)" v-if="item.iconcollection!=='receive'">接收</el-button>
                 <el-tag type="success" v-if="item.iconcollection==='receive'">已接收</el-tag>
<!--                  <el-button type="text" v-if="item.iconcollection!=='receive'" >忽略</el-button> -->
<!--                  <el-button type="text" @click="checkDetail(item)" v-if="item.iconcollection==='receive'">查看</el-button> -->
                 <el-button type="text" @click="checkDetail(item)" >查看</el-button>
                 <el-button type="text" class="button" :icon="item.iconcollection" @click="Collection(item)" v-if="item.iconcollection!=='receive'"></el-button>
              </div>
            </el-col>
          </div>
          </el-row>
        </div>
      </el-tab-pane>
  </el-tabs>
<!-- 块信息结束 -->
<capitalreceiveDialog :editFormVisible="isEditFormVisible" @changeVisible="onchangeVisible" :pushInfo="editpushInfo"  :form2="editReceiveInfo" @onreceive="onreceive"></capitalreceiveDialog>
<capitalListCheck :editFormVisible="ischeckVisible" :pushinfo="selectpushinfo" @changeVisible="CheckchangeVisible" :checkDetailtableData="checkDetailtableData" ></capitalListCheck>
  </div>
</template>
<script>
  import  urlRoot from  '../../../common/urlRoot';
  import  capitalreceiveDialog from './capitalreceiveDialog.vue';
  import  capitalListCheck from './capitalListCheck.vue';
export default {
  data() {
    return {
    s_editFormVisible:false,
    iconcollection:"star-off",
    activeName:'third',
    tableData:[],//全部展示推送数据
    tableDataCollenction:[],//收藏的推送数据
    tableDataReceive:[],//接收的推送数据
    receiveInfo:[],//收藏和接收的资金方信息数据
    onereceiveInfo:{},
    isEditFormVisible:false,//是否显示接收对话框
    ischeckVisible:false,//是否显示详细界面
    editpushInfo:{},//当前编辑的推送信息
    editReceiveInfo:{},//当前编辑的接收信息
    selectpushinfo:{},//当前查看的数据
    checkDetailtableData:[],//查看的详细数据
    pages: {
      total_rows: 0,
      size: 10, // 页大小
      curPage: 1, // 当前页
      totalPages: 0,
     },
    };
  },
  // props: ['editFormVisible','form','pushTableColumns','pushTableData'],

  methods:{
    //
   iscollection(tableData,receiveInfo){
      const vm = this;
      vm.tableDataCollenction=[];
      vm.tableDataReceive=[];
      const tableDatanew=tableData;
      for(var i=0;i<tableDatanew.length;i++){
        tableDatanew[i].iconcollection="star-off";
        for(var j=0;j<receiveInfo.length;j++){
          if(tableDatanew[i].pk_pushinfo===receiveInfo[j].pk_project&&receiveInfo[j].receivestate==="1"){
            tableDatanew[i].iconcollection="star-on";
            vm.tableDataCollenction.push(tableDatanew[i]);
          }else if(tableDatanew[i].pk_pushinfo===receiveInfo[j].pk_project&&receiveInfo[j].receivestate==="2"){
            tableDatanew[i].iconcollection="receive";
            vm.tableDataReceive.push(tableDatanew[i]);
          }
        }
      }
      vm.tableData=tableDatanew;
      // alert(JSON.stringify(tableData));
      // alert(JSON.stringify(vm.tableDataCollenction));
      // alert(JSON.stringify(receiveInfo));
      // alert(JSON.stringify(vm.tableDataReceive));
   },
   findReceiveInfo(item){
      for(var i=0;i<this.receiveInfo.length;i++){
        if(item.pk_pushinfo===this.receiveInfo[i].pk_project){
          this.editReceiveInfo=this.receiveInfo[i];
          break;//正常情况是1对1的关系，所以找的后直接退出就好
        }
      }
   },
   onchangeVisible(val){
     this.isEditFormVisible = val;
   },
   CheckchangeVisible(val){
     this.ischeckVisible = val;
   },
    goBack() {
      history.go(-1);
    },
   onCancel() {
     this.s_editFormVisible = false;
   },
      // 从表单控件传递过来的
   PushFinish() {
     this.s_editFormVisible = false;
     // alert("ss");
     // const formData2 = _.cloneDeep(this.form);
       // data.pk_ref=tabledata;
     // alert(JSON.stringify(data));
     // alert(this.pushTableData.pk_fin_assetproject);
     // formData2.pk_project=this.pushTableData.pk_fin_assetproject;
     this.$emit('PushFinish', this.form);
    },

    Collection(item){
      // this.iconcollection==="star-off"?"star-on":"star-off";
      // this.iconcollection="star-off";
      if(item.iconcollection==="star-off"){
        // item.iconcollection="star-on";
        // 收藏
        // alert("on");
        this.onCollection(item);
      }else{
        // 取消收藏
        // alert("un");
        this.onUnCollection(item);
        // item.iconcollection="star-off";
      }

    },

    onCollection(item){
      const vm = this;
      // alert("123");
      // alert(JSON.stringify(item));
      setTimeout(() => {
        // this.loading = false;
      },3000);
      var item1=item;
      delete item1.iconcollection;
      vm.$http.post(urlRoot.urlWepper('/fin/capitalReceive/collection'),item1)
        .then((re) => {
          let msg = '';
          if (re.data.success === 'success'){
              vm.$message({
                type: 'info',
                message: '收藏成功！',
              });
              this.getData();
          } else {
            if (re.data.success === 'fail_global') {
              msg = this.transCoding(re.data.message);
            } else if (re.data.success === 'fail_field') {
              console.log('error detailMsg:', re.data.detailMsg);
            }

            vm.$message({
              type: 'error',
              message: msg !=='' ? msg : '收藏出错，请重试！'
            });

            // this.loading = false;
          }
        })
        .catch(() => {
          vm.$message({
            type: 'error',
            message: '收藏出错!'
          });
          // this.loading = false;
        });
    },

    onUnCollection(item){
      const vm = this;
      // alert("123");
      // alert(JSON.stringify(item));
      setTimeout(() => {
        // this.loading = false;
      },3000);
      var item1=item;
      delete item1.iconcollection;
      vm.$http.post(urlRoot.urlWepper('/fin/capitalReceive/uncollection'),item1)
        .then((re) => {
          let msg = '';
          if (re.data.success === 'success'){
              vm.$message({
                type: 'info',
                message: '取消收藏成功！',
              });
              this.getData();
          } else {
            if (re.data.success === 'fail_global') {
              msg = this.transCoding(re.data.message);
            } else if (re.data.success === 'fail_field') {
              console.log('error detailMsg:', re.data.detailMsg);
            }

            vm.$message({
              type: 'error',
              message: msg !=='' ? msg : '取消收藏出错，请重试！'
            });

            // this.loading = false;
          }
        })
        .catch(() => {
          vm.$message({
            type: 'error',
            message: '取消收藏出错!'
          });
          // this.loading = false;
        });
    },

    receive(item){
      this.isEditFormVisible=true;
      this.editpushInfo=item;
      this.findReceiveInfo(item);
      // const vm = this;
      // // alert("123");
      // // alert(JSON.stringify(item));
      // setTimeout(() => {
      //   // this.loading = false;
      // },3000);
      // delete item.iconcollection;
      // vm.$http.post(urlRoot.urlWepper('/fin/capitalReceive/collection'),item)
      //   .then((re) => {
      //     let msg = '';
      //     if (re.data.success === 'success'){
      //         vm.$message({
      //           type: 'info',
      //           message: '收藏成功！',
      //         });
      //         this.getData();
      //     } else {
      //       if (re.data.success === 'fail_global') {
      //         msg = this.transCoding(re.data.message);
      //       } else if (re.data.success === 'fail_field') {
      //         console.log('error detailMsg:', re.data.detailMsg);
      //       }

      //       vm.$message({
      //         type: 'error',
      //         message: msg !=='' ? msg : '收藏出错，请重试！'
      //       });

      //       this.loading = false;
      //     }
      //   })
      //   .catch(() => {
      //     vm.$message({
      //       type: 'error',
      //       message: '收藏出错!'
      //     });
      //     this.loading = false;
      //   });
    },

    // checkDetail() {
    //      location.hash = '/capitalCardInfo/capitalListCheck';
    // },
    checkDetail(item) {
            // alert(JSON.stringify(item));
            this.selectpushinfo=item;
            this.onOpencheckDetail(item);
            this.ischeckVisible=true;
    },
    onClose(){
       this.s_editFormVisible = false;
    },

    onOpencheckDetail: function(item) {
      // debugger;
      // alert(pushinfo.pk_fin_assetproject);
      // alert(item.pk_fin_assetproject);
      const vm = this;
      vm.checkDetailtableData = [];
      // this.loading = true;
      setTimeout(() => {
        // this.loading = false;
      },3000);
      // const param=getParam();
      // "3eff4a523bc911e7b362002324e25665"
      vm.$http.post(urlRoot.urlWepper('/fin/capitalReceive/assetDetails'),{project:item.pk_fin_assetproject})
        .then((re) => {
          let msg = '';
          if (re.data.success === 'success'){
            let metaData = {};
            if (re.data.detailMsg && re.data.detailMsg.data){
              metaData = re.data.detailMsg.data;
            }
            vm.checkDetailtableData = (metaData.content instanceof Array) ? metaData.content : [];
             vm.checkDetailtableData=metaData.content;
            // alert(JSON.stringify(vm.checkDetailtableData));
            // this.loading = false;
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

            // this.loading = false;
          }
        })
        .catch(() => {
          vm.$message({
            type: 'error',
            message: '获取数据出错!'
          });
          // this.loading = false;
        });
    },

    onreceive(formdata){
        const vm = this;
        // alert("123");
        // alert(JSON.stringify(item));
        setTimeout(() => {
          // this.loading = false;
        },3000);
        // const foemdata=_.cloneDeep(formdata);
        // delete foemdata.receivestatus;
        // foemdata.pk_project=vm.pushInfo.pk_pushinfo;
        vm.$http.post(urlRoot.urlWepper('/fin/capitalReceive/receive'),formdata)
          .then((re) => {
            let msg = '';
            if (re.data.success === 'success'){
                vm.$message({
                  type: 'info',
                  message: '接收成功！',
                });
                this.getData();
            } else {
              if (re.data.success === 'fail_global') {
                msg = this.transCoding(re.data.message);
              } else if (re.data.success === 'fail_field') {
                console.log('error detailMsg:', re.data.detailMsg);
              }

              vm.$message({
                type: 'error',
                message: msg !=='' ? msg : '接收出错，请重试！'
              });

              // this.loading = false;
            }
          })
          .catch(() => {
            vm.$message({
              type: 'error',
              message: '接收出错!'
            });
            // this.loading = false;
          });
    },


    getData: function() {
      const vm = this;
      // vm.tableData = [];
      // vm.tableData2 = [];
      // this.loading = true;
      setTimeout(() => {
        // this.loading = false;
      },3000);
      vm.$http.post(urlRoot.urlWepper('/fin/capitalReceive/queryall'),vm.pages)
        .then((re) => {
          let msg = '';
          if (re.data.success === 'success'){
            let metaData = {};
            // alert(JSON.stringify(re));
            if (re.data.detailMsg && re.data.detailMsg.data){
              metaData = re.data.detailMsg.data;
            }
            vm.tableData = (metaData.content.pushentity instanceof Array) ?
                           metaData.content.pushentity : [];
            vm.receiveInfo = (metaData.content.capitalReceiveInfoEntityList
                 instanceof Array) ? metaData.content.capitalReceiveInfoEntityList : [];
                 this.iscollection(vm.tableData,vm.receiveInfo);
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

            // this.loading = false;
          }
        })
        .catch(() => {
          vm.$message({
            type: 'error',
            message: '获取数据出错!'
          });
          // this.loading = false;
        });
    },

  },

  watch: {
      editFormVisible: function(value) {
        this.s_editFormVisible = value;
      },
      s_editFormVisible: function(value) {
        this.$emit('changePushVisible', value);
      },
    },
  created: function(){
    // this.Collection();
     this.getData();
  },
  components:{
    capitalreceiveDialog,capitalListCheck,
  },
};
</script>
<style>
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
