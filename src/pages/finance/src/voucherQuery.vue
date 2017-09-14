<template>
<div class="voucherQuery">
  <div class="title-header">
    <h2 class="name" >凭证查询</h2>
  </div>
  <div id="search-container">
    <div >
        <el-button class="fl" type="primary"@click="approve">审核</el-button>
        <el-button class="fl" type="primary" @click="account">记账</el-button>
        <el-button class="fr" type="primary" @click="goBack">返回</el-button>
    </div>
  </div>
  <div id="staff-list">
      <el-row type="flex" justify="center" >
        <el-col :span="24">
            <el-table
              ref="multipleTable"
              :data="tableData"
              border
              style="width: 100%;text-align:center"
              @select="select"
              @select-all="selectall">
              <el-table-column
               type="selection"
               >
              </el-table-column>
               <el-table-column
               prop="pkVoucherquery"
               label="主键"
               show="false"
               </el-table-column>
              <el-table-column
                prop="makedate"
                label="日期"
                >
              </el-table-column>
              <el-table-column
               prop="vno"
               label="凭证号"
              >
              </el-table-column>
              <el-table-column
                prop="explanation"
                label="摘要"
                >
                <template scope="scope">
                <div class="content-rowspan">
                <div v-for="value in scope.row.explanation">{{ value }}</div>
                </div>
                </template>
              </el-table-column>

              <el-table-column
                prop="itemname"
                label="科目名称"
                >
                <template scope="scope">
                 <div class="content-rowspan">
                 <div v-for="value in scope.row.itemname">{{ value }}
                 </div>
                 </div>
                </template>
              </el-table-column>
              <el-table-column
                prop="balancedirect"
                label="借贷方向"
                >
                <template scope="scope">
                <div class="content-rowspan">
                <div v-for="value in scope.row.balancedirect">
                <span v-if=" value==='D'">借</span>
                <span v-if=" value==='C'">贷</span>
                </div>
                </div>
                </template>
              </el-table-column>
              <el-table-column
                prop="amount"
                label="金额"
                >
                <template scope="scope">
                <div class="content-rowspan">
                <div v-for="value in scope.row.amount">{{ value }}
                </div>
                </div>
                </template>
              </el-table-column>
              <el-table-column
               prop="voucherstatus"
               label="状态"
               >
               <template scope="scope" >
               <span v-if=" scope.row.voucherstatus===0 ||scope.row.voucherstatus==='0'">待审核</span>
               <span v-if=" scope.row.voucherstatus===1 ||scope.row.voucherstatus==='1'">待入账</span>
               <span v-if=" scope.row.voucherstatus===2 ||scope.row.voucherstatus==='2'">已入账</span>
               </template>
               </el-table-column>
              <el-table-column
                prop="systemid"
                label="来源系统"
                >
              </el-table-column>
            </el-table>
        </el-col>
      </el-row>
     <editForm :formData="tableData2" :editRowIndex="editRowIndex" :editFormVisible="editFormVisible" ></editForm>
    <el-pagination
          id="staff-pagination"
          :current-page="currentPage"
          :page-sizes="[10, 20]"
          :page-size="10"
          layout="total, sizes, prev, pager, next, jumper"
          :total="400">
    </el-pagination>
  </div>
</div>
</template>

<script>
import  urlRoot from  '../../../common/urlRoot';

  export default {
    data() {
      return {
        tableData: [],
        currentPage:1,
        tableData2: [],
        editFormVisible:false,
      };
    },
     methods: {
     account:function(){
               const vm = this;
               let msg='';
               vm.$http.post(urlRoot.urlWepper('fin/finance/account'),vm.tableData2)
                               .then((re) => {
                                 if (re.data.success){
                                  msg=re.data.successMessage;
                                   vm.$message({
                                     type: 'info',
                                     message: msg,
                                   });
                                 } else {
                                   msg = re.data.errorMessage;
                                   vm.$message({
                                     type: 'error',
                                     message: msg !=='' ? msg : '记账失败！'
                                   });
                                 }
                    });
          },
          approve:function(){
          const vm = this;
          let msg='';
          vm.$http.post(urlRoot.urlWepper('fin/finance/approve'),vm.tableData2)
                          .then((re) => {
                            console.log(re);
                            if (re.data.success){
                              vm.$message({
                                type: 'info',
                                message: '审核成功！',
                              });
                            } else {
                              msg = re.data.errorMessage;
                              vm.$message({
                                type: 'error',
                                message: msg !=='' ? msg : '审核失败！'
                              });
                            }
                          });
           this.getData();
          },
          select: function(selection) {
              const vm = this;
              vm.tableData2=selection;
          },
          selectall:function(selection) {
               const vm = this;
               vm.tableData2=selection;
          },
          goBack() {
            history.go(-1);
          },
          getData: function() {
                 const vm = this;
                 $.ajax({
                    type: 'get',
                     dataType: "json",
                     url: urlRoot.urlWepper('fin/finance/voucherlist'),
                     success: function(re){
                     vm.tableData=re;
                     },
                     });
              },
         },
        created(){
            this.getData();
        },
        components:{

        },
  };
</script>
<style>
  .voucherQuery{
    padding:20px 30px ;
  }

  .content-rowspan div {
          padding-left: 13px;
          line-height: 46px;
          border-bottom: 1px solid #ECEDEE;
  }
   .content-rowspan div:last-child {
      border-bottom: 0;
    }
 </style>
