<template>
  <div class="schemeCfgAdd">
    <div class="title-header">
      <h2 class="name" >新增方案</h2>
    </div>
    <div id="search-container">
      <div>
        <el-button class="fl" type="primary" @click="onSubmit">保存</el-button>
        <el-button class="fr" type="primary" @click="onCancel">返回</el-button>
      </div>
    </div>

    <el-form :inline="true"  label-width="100px" id="staff-list">
      <!-- title -->
      <el-row :span="24">
        <el-col :span="8">
          <div>
            <el-form-item label="产品名称">
              <el-input v-model="scfgH.scheme_name"></el-input>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="8">
          <div>
            <el-form-item label="有效起始日">
              <el-date-picker type="date" v-model="scfgH.start_date"></el-date-picker>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="8">
          <div>
            <el-form-item label="有效截至日">
              <el-date-picker type="date" v-model="scfgH.end_date"></el-date-picker>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="8">
          <div>
            <el-form-item label="产品描述">
              <el-input v-model="scfgH.scheme_desc"></el-input>
            </el-form-item>
          </div>
        </el-col>
      </el-row>
      <hr>

      <div v-for="(item,index) in scfgD">
      <!--<el-form-item label="元素编码">-->
        <!--<el-input v-model="item.prm_code" :disabled="true"></el-input>-->
      <!--</el-form-item>-->
      <el-row>
        <el-col :span="8">
          <div>
            <el-form-item label="元素名称">
              <el-input v-model="item.prm_name" :disabled="true"></el-input>
            </el-form-item>
          </div>
        </el-col>

        <el-col :span="8">
          <div>
            <el-form-item label="元素状态">
              <el-select v-model="item.ele_status">
                <el-option
                  v-for="ditem in eleSList"
                  :label="ditem.flag"
                  :value="ditem.code">
                </el-option>
              </el-select>
            </el-form-item>
          </div>
        </el-col>

        <el-col :span="8">
          <div>
            <el-form-item label="初始值下限" v-if="(item.prm_type == '0') || (item.prm_type == '3')">
                <el-input v-model="item.val_down" ></el-input>
            </el-form-item>
          </div>
        </el-col>

        <el-col :span="8">
          <div>
            <el-form-item label="初始值"  v-if="(item.prm_type == '4')">
              <el-select v-model="item.val_str" >
                  <el-option v-for="ditem in item.dList"
                             :label="ditem.ifbpFincName"
                             :value="ditem.ifbpFincCode"></el-option>
              </el-select>
            </el-form-item>
          </div>
        </el-col>

        <el-col :span="8">
          <div>
            <el-form-item label="初始值"  v-if="(item.prm_type == '0') || (item.prm_type == '1')||(item.prm_type == '3')">
              <el-input v-model="item.val_str" >
              </el-input>
            </el-form-item>
          </div>
        </el-col>

        <el-col :span="8">
          <div>
            <el-form-item label="初始值"  v-if="(item.prm_type == '2') ">
              <el-date-picker v-model="item.val_str" >
              </el-date-picker>
            </el-form-item>
          </div>
        </el-col>

        <el-col :span="8">
          <div>
            <el-form-item label="初始值上线"  v-if="(item.prm_type == '0') || (item.prm_type == '3')">
              <el-input v-model="item.val_up" ></el-input>
            </el-form-item>
          </div>
        </el-col>

        <el-col :span="8">
          <div>
            <el-form-item label="计算基数"  v-if="(item.prm_type == '0')">
              <el-select v-model="item.fee_ref" >
                <el-option
                  v-for="ditem in feeRefList"
                  :label="ditem.flag"
                  :value="ditem.code"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </div>
        </el-col>

        <el-col :span="8">
          <div>
            <el-form-item label="费用归属"  v-if="(item.prm_type == '3')">
              <el-select v-model="item.fee_include" >
                <el-option
                  v-for="ditem in feeInList"
                  :label="ditem.flag"
                  :value="ditem.code">
                </el-option>
              </el-select>
            </el-form-item>
          </div>
        </el-col>

        <el-col :span="8">
          <div>
            <el-form-item label="是否必填">
              <el-select v-model="item.is_required" >
                <el-option
                  v-for="ditem in isReqList"
                  :label="ditem.flag"
                  :value="ditem.code">
                </el-option>
              </el-select>
            </el-form-item>
          </div>
        </el-col>

      </el-row>
        <hr>
      </div>
<!--       <el-form-item>
        <el-button type="primary" @click="onSubmit">完成</el-button>
        <el-button @click="onCancel">取消</el-button>
      </el-form-item> -->
    </el-form>
  </div>
</template>
<script>
  import urlRoot from '../../../common/urlRoot';
  export default {
    data() {
      return {
          rstFlag: '',
          msg: '',
          scfgH:'',
          scfgD:[],
          eleSList: [],
          feeRefList: [],
          feeInList: [],
          isReqList: [],
         pickerOptions0: {
          disabledDate(time) {
            return time.getTime() < Date.now() - 8.64e7;
          }
        },
      };
    },
    methods: {
      getData: function() {
        const vm = this;
        $.ajax({
          type: 'get',
          dataType: "json",
          url: urlRoot.urlWepper('/fin/schemeCfg/toAdd'),
          success: function(re){
            vm.scfgH = re.detailMsg.data.scfgH;
            vm.scfgD = re.detailMsg.data.scfgD;
            vm.eleSList = re.detailMsg.data.eleSList;
            vm.feeRefList = re.detailMsg.data.feeRefList;
            vm.feeInList = re.detailMsg.data.feeInList;
            vm.isReqList = re.detailMsg.data.isReqList;
          }
        });
      },
      onSubmit() {
        this.scfgH.id_schemecfgdentity = this.scfgD;
        this.$emit('onSubmit', this.scfgH);
        $.ajax({
          type: 'post',
          dataType: "json",
          contentType:'application/json',
          data:JSON.stringify(this.scfgH),
          url: urlRoot.urlWepper('/fin/schemeCfg/doAdd'),
          success: function(re){
//              this.rstFlag = re.success;
//              this.msg = '成功';
//            if(this.rstFlag == 'success'){
              alert(re);
//            }
          }
        });
      },
      onCancel() {
        location.hash = '/schemeCfgPage';
      },
    },
    created: function(){
      this.getData();
    }
  };
</script>
<style>
  .line{
    text-align: center;
  }
  .schemeCfgAdd{
    padding:20px 30px; 
  }
  .schemeCfgAdd .el-select .el-input{
    width: 87.5%;
  }
  .schemeCfgAdd .el-row{
    margin-top: 30px;
  }
</style>
