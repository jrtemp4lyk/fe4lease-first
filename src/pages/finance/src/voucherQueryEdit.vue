      <template>
      <div>
        <el-table
          :data="tabledata"
          empty-text="暂无数据……"
          border
          stripe
          style="text-align: center; max-height:400px"
          >
          <el-table-column
            v-for="item in columns"
            :prop="item.flag"
            :label="item.name"
            :width="item.width"
            >
          </el-table-column>
        </el-table>
        </div>
        </template>

<script>
  export default {
  data() {
    return {
      columns: [
          {
            flag: 'pkVoucherquery',
            name: '主键',
            width: 55,
            show:false,
               },
        {
          flag: 'makedate',
          name: '日期',
          width: 130,
        },
        {
          flag: 'explanation',
          name: '摘要',
          width: 70,
          fixed:true,
        },
        {
          flag: 'itemname',
          name: '科目名称 ',
          width: 70,
        },
        {
          flag: 'balancedirect',
          name: '借贷方向',
          width: 140,
        },
        {
          flag: 'amount',
          name: '金额',
          width: 140,
        },
        {
          flag: 'voucherstatus',
          name: '状态 ',
          width: 140,
        },
        {
          flag: 'systemid',
          name: '来源系统',
          width: 200,
        }
      ],
   };
}
};
</script>

