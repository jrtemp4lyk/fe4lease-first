<template>
    <el-dialog title="车型选择" v-model="dialogVisible" size="tiny" id="quoting">
        <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick">
          <el-tab-pane label="A" name="first">
            <div >
              <!--  <span> {{item.name}}</span> -->
               <el-row>
                  <el-col :span="4" v-for="item in productH"><div>{{item.product_name}}</div></el-col>
               </el-row>
            </div>
          </el-tab-pane>
          <el-tab-pane label="B" name="second">配置管理</el-tab-pane>
          <el-tab-pane label="C" name="third">角色管理</el-tab-pane>
          <el-tab-pane label="D" name="fourth">定时任务补偿</el-tab-pane>
          <el-tab-pane label="E" name="fifth">用户管理</el-tab-pane>
          <el-tab-pane label="F" name="sixth">配置管理</el-tab-pane>
          <el-tab-pane label="G" name="seven">角色管理</el-tab-pane>
          <el-tab-pane label="H" name="eight">定时任务补偿</el-tab-pane>
          <el-tab-pane label="I" name="nine">配置管理</el-tab-pane>
          <el-tab-pane label="G" name="ten">角色管理</el-tab-pane>
          <el-tab-pane label="K" name="eleven">定时任务补偿</el-tab-pane>
          <el-tab-pane label="L" name="twelve ">用户管理</el-tab-pane>
          <el-tab-pane label="M" name="thirteen ">配置管理</el-tab-pane>
          <el-tab-pane label="N" name="fourteen ">角色管理</el-tab-pane>
          <el-tab-pane label="O" name="fifteen ">定时任务补偿</el-tab-pane>
          <el-tab-pane label="P" name="sixteen">配置管理</el-tab-pane>
          <el-tab-pane label="Q" name="seveteen ">角色管理</el-tab-pane>
          <el-tab-pane label="R" name="eighteen">定时任务补偿</el-tab-pane>
          <el-tab-pane label="S" name="nineteen">用户管理</el-tab-pane>
          <el-tab-pane label="T" name="twenty ">配置管理</el-tab-pane>
          <el-tab-pane label="U" name="twenty-one">角色管理</el-tab-pane>
          <el-tab-pane label="V" name="twenty-two">定时任务补偿</el-tab-pane>
          <el-tab-pane label="W" name="twenty-three">用户管理</el-tab-pane>
          <el-tab-pane label="X" name="twenty-four">配置管理</el-tab-pane>
          <el-tab-pane label="Y" name="twenty-five">角色管理</el-tab-pane>
          <el-tab-pane label="Z" name="twenty-six">定时任务补偿</el-tab-pane>
        </el-tabs>
        <!-- 车型 车系 -->
        <el-row class="quoto_main">
          <el-col :span="8">
            <div class="quoto_left">
            <p><span class="quoto_left_title">选择系列</span></p>

              <div class="quoto_left_select">
                <select v-model="selected" size="6">
                    <option name="chexing" v-for="cx in pDEntities" :value="cx.pk_product_d">
                        {{cx.catena_name}}
                    </option>
                </select>
              </div>
            </div>
          </el-col>
          <el-col :span="16">
            <div class="quoto_right">
                <select size="6" >
                  <option name="chexi" v-for="cy in pEntities" :value="cy.pk_model">
                    {{cy.model_name}}&nbsp;&nbsp;{{cy.guide_price}}
                  </option>
                </select>
            </div>
          </el-col>
        </el-row>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
</template>
<script>
import  urlRoot from  '../../../common/urlRoot.js';
export default {
  data() {
    return {
      productH: '',
      pDEntities: '',
      pEntities: '',
      s_dialogVisible: false,
      selected: '',
      items: [{
        name: 'a'
      },{
        name: 'b'
      },{
        name: 'c'
      },{
        name: 'd'
      },{
        name: 'e'
      },{
        name: 'f'
      },{
        name: 'g'
      }],
      CX: [{
        text: 'C系',
        value: 'A',
        CY:[
            {text:'11111111111111'},
            {text:'11111111111111'},
            {text:"11111111111111"},
        ]
      },{
        text: 'D系',
        value: 'B',
        CY:[
            {text:'22222222222222'},
            {text:'22222222222222'},
            {text:"22222222222222"},
        ]
      },{
        text: 'E系',
        value: 'E',
        CY:[
            {text:'33333333333333'},
            {text:'33333333333333'},
            {text:"33333333333333"},
        ]
      },{
        text: 'F系',
        value: 'F',
        CY:[
            {text:'44444444444444'},
            {text:'44444444444444'},
            {text:"44444444444444"},
        ]
      },{
        text: 'H系',
        value: 'C',
        CY:[
            {text:'55555555555555'},
            {text:'55555555555555'},
            {text:"55555555555555"},
        ]
      },{
        text: 'I系',
        value: 'D',
        CY:[
            {text:'66666666666666'},
            {text:'66666666666666'},
            {text:"66666666666666"},
        ]
      }],
      activeName: 'second'
    };
  },
  props: ['dialogVisible'],
  computed:{
    selection: function() {
      var tmp;
      for (var i = 0; i < this.CX.length; i++) {
          if (this.CX[i].value === this.selected[0]) {
            tmp = this.CX[i].CY;
            console.log(tmp);
          }
      }
      return tmp;
    }
  },
  methods:{
    handleClick() {
      const vm = this;
      $.ajax({
        type: 'get',
        dataType: "json",
        // data:""
        url: urlRoot.urlWepper('fin/quote/chooseProductH'),
        success: function(re){
          vm.productH = re.detailMsg.data.productH;
          vm.pEntities = re.detailMsg.data.pEntities;
          vm.pDEntities = re.detailMsg.data.pDEntities;
        }
      });
    }
  },
  created(){
  },
  watch: {
    dialogVisible: function(value) {
      this.s_dialogVisible = value;
    },
    s_dialogVisible: function(value) {
      this.$emit('changeDialog', value);
    },
  },
};
</script>
<style>
 #quoting .el-dialog--tiny{
   width: 72%;
 }
.quoto_main{
  width: 98%;
  margin-top: 15px;
}
.quoto_left{
  height: 200px;
  background: #f5f8fa;
  width: 95%;
  border:1px solid #ddd;

}
.quoto_left p{
  margin-top: 20px;
}
.quoto_left_title  {
  font-size: 15px;
  margin-left: 8%;
}
.quoto_right{
  height: 200px;
  background: #f5f8fa;
}

.quoto_left select{
  margin-left: 10%;
  margin-top: 10px;
}
.quoto_left_select {
  width: 80%;
/*  height: 100%;*/
}
.quoto_left_select select {
  width: 100%;
}
</style>
