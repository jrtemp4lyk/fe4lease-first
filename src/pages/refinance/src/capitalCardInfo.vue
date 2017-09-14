<template>
  <div class="topCardLeft">
	  <div   class="topCardBox clearfix" style="background-color:#f1f9ff">
		<p class="bidName">
			{{maintitle}}
			&nbsp;
			<span class="common-mark transfer-mark">{{mark}}</span>
		</p>
	  	<el-button type="text" class="button" :icon="iconcollection" @click="Collection"></el-button>
	  	<el-button type="text" class="button"  @click="receive">接收</el-button>
	  </div>
	  <table></table>
  </div>
</template>
<script>
export default {
  data() {
    return {
    s_editFormVisible:false,
    iconcollection:"star-on",
    maintitle:"资产包名称",
    mark:"精品",
    };
  },
  props: ['editFormVisible','form','pushTableColumns','pushTableData'],

  methods:{
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

    Collection(){
      // this.iconcollection==="star-off"?"star-on":"star-off";
      // this.iconcollection="star-off";
      if(this.iconcollection==="star-off"){
        this.iconcollection="star-on";
      }else{
        this.iconcollection="star-off";
      }
    },
    receive(){
    alert("receive");
    }
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
  },
};
</script>
<style>
    .formBox{ padding: 0px ;width: 1000px; align:center;}
    .formItem{ margin-bottom: 10px; }
    .formItem__label{ width: 120px; height: 36px; line-height: 36px; text-align: right; display: inline-block; text-overflow: ellipsis; overflow: hidden; white-space: nowrap; }
    .formItem__prepend{ min-width: 15px; display: inline-block; text-align: center; }
      .row{ margin: 10px;  }
      .topCardLeft {
    width: 850px;
    height: 100%;
    background-color: #ffffff;
    float: left;
    position: relative;
}
.bidName {
    font-size: 16px;
    color: #4c4c4c;
    font-weight: bold;
    line-height: 30px;
    margin: 15px 80px;
}
.common-mark {
    display: inline-block;
    width: 60px;
    background: #fc9f42;
    height: 18px;
    border: solid 1px #fc9f42;
    -webkit-border-radius: 2px;
    border-radius: 2px;
    text-align: center;
    color: #FFF;
    font: 14px/18px Microsoft YaHei, 微软雅黑;
}
.transfer-mark {
    background: #FFF;
    color: #fc9f42;
}
.topCardBox {
    height: 250px;
}
div {
    display: block;
}
.dataBoxRight {
    margin-left: 25px;
    height: 166px;
    width: 546px;
    float: left;
}
</style>
