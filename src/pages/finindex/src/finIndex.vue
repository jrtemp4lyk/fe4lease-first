<template>
  <div class="cards-container">
    <div class="background">
      <div class="finindex-title">常用功能</div>
      <div class="cards" id="cygn">
        <el-tile v-for="(tile, num) in sysRow" :noTitle="true" size="md" class="tile" @click.native="jumpHash(tile.url)" :cardStyle="tile.style">
          <div class="" slot="media">
            <div class="finindex-box">
              <div class="finindex-icon-container"><i :class="'finindex-icon '+tile.appIcon"></i></div>
              <div class="tile-title">{{tile.appName}}</div>
            </div>
          </div>
        </el-tile>
      </div>
      <div class="finindex-title">我的桌面</div>
      <div class="cards">
        <el-tile v-for="(tile, num) in row" :noTitle="true" size="md" class="tile" @click.native="queryRemind(row[num])" :cardStyle="tile.style">
          <div class="" slot="media">
            <div class="count">{{tile.count}}</div>
            <div class="tile-title">{{tile.label}}</div>
          </div>
        </el-tile>
      </div>
      <!--<div class="cards">-->
        <!--<el-tile :noTitle="true" class="tile" :cardStyle="tabList.style">-->
          <!--<div class="" slot="media">-->
            <!--<div class="title"><b>{{tabList.label}}</b></div>-->
            <!--<el-tabs v-model="tabList.default" class="card-tabs">-->
              <!--<el-tab-pane v-for="(tab, index) in tabList.tabs" :label="tab.label" :name="tab.path">-->
                <!--<ul :class="num===0?'first-list':'list'" v-for="(list, num) in tab.list">-->
                  <!--<li class="list-item" v-for="(row, id) in list">{{row.label}}</li>-->
                <!--</ul>-->
              <!--</el-tab-pane>-->
            <!--</el-tabs>-->
          <!--</div>-->
        <!--</el-tile>-->
        <!--<el-tile :noTitle="true" class="tile" :cardStyle="focusList.style">-->
          <!--<div class="slot-container" slot="media">-->
            <!--<div class="title"><b>{{focusList.label}}</b></div>-->
            <!--<ul :class="index===0?'first-list':'list'" v-for="(list,index) in focusList.list" style="padding-top:10px;">-->
              <!--<li class="list-item" v-for="(row, id) in list">{{row.label}}</li>-->
            <!--</ul>-->
          <!--</div>-->
        <!--</el-tile>-->
      <!--</div>-->
      <!--<div class="cards">-->
        <!--<el-tile :noTitle="true" class="tile" :cardStyle="echarts.style">-->
          <!--<div class="slot-container" slot="media">-->
            <!--<div class="title"><b>{{echarts.label}}</b></div>-->
            <!--<chart :style="echarts.chartStyle" :options="echarts.option"></chart>-->
          <!--</div>-->
        <!--</el-tile>-->
        <!--<el-tile :noTitle="true" class="tile" :cardStyle="manageList.style">-->
          <!--<div class="slot-container" slot="media">-->
            <!--<div class="title"><b>{{manageList.label}}</b></div>-->
            <!--<ul :class="index===0?'first-list':'list'" v-for="(list, index) in manageList.list">-->
              <!--<li class="list-item" v-for="(row, id) in list">{{row.label}}</li>-->
            <!--</ul>-->
          <!--</div>-->
        <!--</el-tile>-->
      <!--</div>-->
    </div>
  </div>
  <!-- 块信息结束 -->
  <!--</div>-->
</template>

<script>
  import testJson from '../../../../static/finIndex.json';
  import echarts from 'vue-echarts';
  import urlRoot from '../../../common/urlRoot.js';
  //import  urlRoot from  '/urlRoot';
  export default {
    data() {
      return {
        title: '催收门户',
        sysRow: '',
        row: '',
        tabList: '',
        focusList: '',
        manageList: '',
        echarts: ''
      };
    },
    components: {
      chart: echarts
    },
    methods: {
      getCookie(cName) {
        let cStart;
        let cEnd;
        if (document.cookie.length > 0) {
          cStart = document.cookie.indexOf(cName + "=");
          if (cStart !== -1) {
            cStart = cStart + cName.length+1;
            cEnd = document.cookie.indexOf(";",cStart);
            if (cEnd === -1) {
              cEnd = document.cookie.length;
            }
            return decodeURIComponent(document.cookie.substring(cStart,cEnd));
          }
        }
        return "";
      },
      request() {
        this.row = testJson.row;
        this.tabList = testJson.tabList;
        this.focusList = testJson.focusList;
        this.manageList = testJson.manageList;
        this.echarts = testJson.echarts;
        this.$http({
          url: window.ctxs.ap + '/appMGT/getSysareaApp',
          method: 'get'
        }).then((res) => {
          if (res.data.msg === 'success') {
            this.sysRow = res.data.data;
            this.addParams(this.sysRow);
          }
        });
        this.$http({
          url: '/ifbp-bop-web/user/postMyDesKtop',
          method: 'post',
//          data: { tenantId: "ddwidm4i" }
          data: { tenantId: this.getCookie('tenantid'), }
        }).then((res) => {
          if (res.data.success === true) {
            this.row.forEach((v, i) => {
              if (this.row[i].label === '全部应用') {
                this.row[i].count = res.data.data.appCount;
              } else if (this.row[i].label === "待支付订单") {
                this.row[i].count = res.data.data.unpaid;
              } else if (this.row[i].label === "逾期应用") {
                this.row[i].count = res.data.data.expiredDateApps;
              }
            });
          } else {
            this.$message({
              message: res.data.error.errorMessage,
              type: 'error'
            });
          }
        });
        //获取在线人数的接口
        this.$http({
          url: window.ctxs.ap + '/auth/countOnlineUsers',
          method: 'get'
        }).then((res) => {
          if (res.data.success === true) {
            this.row.forEach((v,i) => {
              if (this.row[i].label === '用户总数') {
                this.row[i].count = res.data.data;
              }
            });
          } else {
            this.$message({
              message: res.data.error.errorMessage,
              type: 'error'
            });
          }
        });
      },
      addParams(data){
        data.forEach((tile) => {
          this.$set(tile, 'style', {width: '21%'});
        });
      },
      queryOverdueGrade: function() {
        const vm = this;
        $.ajax({
          type: 'post',
          dataType: "json",
          url: urlRoot.urlWepper('fin/config/queryOverGradeList'),
          success: function(re) {
            //非常严重逾期
            var data = re.detailMsg.data;
            if (data.TotalOne != null) {
              vm.TotalOne = data.TotalOne[0].total;
              vm.row[1].count = vm.TotalOne;
            }
            if (data.TotalTwo != null) {
              vm.TotalTwo = data.TotalTwo[0].total;
              vm.row[2].count = vm.TotalTwo;
            }
            if (data.TotalThree != null) {
              vm.TotalThree = data.TotalThree[0].total;
              vm.row[3].count = vm.TotalThree;
            }
            vm.Total = data.TotalOne[0].total + data.TotalTwo[0].total + data.TotalThree[0].total;
            vm.row[0].count = vm.Total;
          }
        });
      },
      jumpHash(hash) {
        this.$router.push(hash);
      },
      queryRemind(row) {
        //跳转到逾期数据列表界面
        location.hash = '/myapp?state=' + row.state;
      },
    },
    mounted() {
    },
    created() {
      this.request();
      this.queryOverdueGrade();
    }
  };
</script>

<style scoped>
  .cards {
    display: block;
    overflow: hidden;
  }

  .finindex-title {
    width: 100%;
    margin-left: 20px;
    font-size: 20px;
    height: 36px;
    padding: 2px;
    line-height: 30px;
  }

  .finindex-box {
    margin-top: 30px;
    margin-bottom: 10px;
  }

  .finindex-box .finindex-icon-container {
    height: auto;
    line-height: 50px;
    display: inline-block;
    vertical-align: top;
    margin-right: 5px;
  }

  .finindex-box .finindex-icon {
    font-size: 50px;
    color: #9adfef;
  }

  .finindex-box .tile-title {
    display: inline-block;
    vertical-align: top;
    line-height: 50px;
    font-size: 16px;
  }
  .count {
    margin-top: 10px;
    margin-bottom: 10px;
    font-size: 30px;
    height: auto;
    line-height: 31px;
    color: red;
  }

  .finindex-icon {
    font-size: 30px;
  }

  .cards-title {
    width: 100%;
    font-size: 20px;
    background-color: white;
    border: 1px solid #cecece;
    padding: 14px;
  }

  .background {
    background-color: #eeeff1;
    min-width: 920px;
  }

  .cards-container {
    background-color: white;
  }

  .tile {
    border: 1px solid #ccc;
  }

  .first-list,
  .list {
    padding-left: 40px;
    font-size: 13px;
    float: left;
    line-height: 28px;
  }

  .first-list .list-item {
    list-style: disc;
    text-align: left;
  }

  .title {
    line-height: 30px;
    border-bottom: 2px solid #ccc;
    font-size: 20px;
    text-align: left;
    padding: 10px 10px 0px 10px;
  }

  .card-tabs {
    padding-left: 10px;
    padding-right: 10px
  }


  /*  .list-item:hover{
      background-color: #6bcaea;
      cursor: pointer;
    }*/

/* *
* 隐藏没有做的功能
* */
  /*#cygn .card:last-child{*/
    /*display: none;*/
  /*}*/
</style>
