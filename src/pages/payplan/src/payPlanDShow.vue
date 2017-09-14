<template>
  <div style="position: relative;" >
    <el-template :pkTemp="pk_temp" :templateValue="value" @edit-table-row="editTableRow" :show-button="true" show-type="index" :sortable="true"></el-template>
    <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page.index"
        :page-sizes="[5, 10, 20, 50]"
        :page-size="page.size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="page.total"
        style="text-align: right;margin:0 20px;"
        v-if="page.total>0">
  </el-pagination>
  </div>
</template>
<script>
import urlRoot from '../../../common/urlRoot';
  export default{
    data(){
      return {
        scope: '',
        value: '',
        pk_temp:'de9bd186-26f8-4a0a-b599-b47bed83dff2',
        page: {
          total: 0,
          index: 1,
          size: 10,
        }
      };
    },
    created(){
      this.getData();
    },
    methods:{
        getData: function() {
            const vm = this;
            $.ajax({
              type: 'get',
              dataType: "json",
              data: {
                pageSize: vm.page.size,
                pageIndex: vm.page.index -1
              },
              url:  urlRoot.urlWepper('fin/payPlan/payPlanHPage'),
              success: function(re){
                  const data = re.detailMsg && re.detailMsg.data;
                  vm.value = data && data.content;
                  vm.setPage.call(vm, data);
              }
            });
        },
        setPage(data) {
          this.page.total = data.totalElements;
          this.page.size = data.size;
        },
        handleSizeChange(val) {
          this.page.size = val;
          this.getData();
        },
        handleCurrentChange(val) {
          this.page.index = val;
          this.getData();
        },
        editTableRow(rowData) {
          location.hash = '/payPlanDShow?fk_pay_plan_h='+rowData.fk_pay_plan_h;
        }
    }
  };
</script>
<style>
.el-table__body tr.hover-row>td .buttonGroup{
  display: inline-block;
}


.el-table__body tr>td .buttonGroup{
  display: none;
}

input.el-pagination__editor{
  height: 28px;
}
.el-pager li.active{
  background-color: #1BAEDE;
  border-color: #1BAEDE;
}
.el-select-dropdown__item.selected{
  background-color: #1BAEDE;
}
.el-select-dropdown__item.selected.hover{
  background-color: #00A5E3;
}
.el-pagination .btn-prev{
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
}
.el-pagination .btn-next{
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
}
.el-pagination span.el-pagination__total,
.el-pagination__sizes .el-input .el-input__inner,
.el-pagination span.el-pagination__jump{
  font-size: 12px;
}
.el-pagination .el-select .el-input{
  width: 100px;
}

</style>
