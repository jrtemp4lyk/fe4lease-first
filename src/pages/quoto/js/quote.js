/**
 * 算法表单校验
 */
export default {
  /**
   * 表单非空校验
   * @param scfgDList
   * @returns {boolean}
   */
  calFormCheck: function (scfgDList) {
    const vm = this;
    var flag = true;
    for(var i = 0; i<scfgDList.length; i++) {
      var isRequired = scfgDList[i].is_required;
      var valStr = scfgDList[i].val_str;
      if (isRequired === '1' &&  vm.isNotBlank(valStr) === false) {
        alert(scfgDList[i].prm_name + "不能为空");
        flag = false;
        return flag;
      }
    }
    return flag;
  },

  /**
   * 元素值非空校验  非空返回true 空 false
   * @param obj
   */
  isNotBlank: function(obj){
    var flag = false;
    if(obj !== '' && obj !== ' ' && obj !== null && obj !== 'null' && obj !== undefined && obj !== 'undefined') {
        flag = true;
    }
    return flag;
  },

  /**
   * 方案有效范围值校验
   * @param scfgD
   */
  validScopeVal: function(scfgD){
    var temp = {};
    temp.scfgD = scfgD;
    const vm = this;
    var flag = true;
    var valStr = scfgD.val_str;
    var valUp = scfgD.val_up;
    var valDown = scfgD.val_down;
    if(vm.isNotBlank(valStr) && vm.isNotBlank(valDown) && valStr - valDown < 0) {
      alert(scfgD.prm_name +'的有效区间为:[' + valDown + '至' + valUp +']');
      temp.scfgD.val_str = '';
      flag = false;
    }else if(vm.isNotBlank(valStr) && vm.isNotBlank(valUp) && valStr - valUp > 0) {
      alert(scfgD.prm_name +'的有效区间为:[' + valDown + '至' + valUp +']');
      temp.scfgD.val_str = '';
      flag = false;
    }
    temp.flag = flag;
    return temp;
  },

  /**
   * 循环调用页面计算
   * @param leaseMoney  设备款(实际合同额)
   * @param scfgDList 方案明细
   */
  basicCalculation: function (hEntity, scfgDList) {
      var temp = {};
      temp.hEntity = hEntity;
      temp.scfgDList = scfgDList;
      var leaseMoney = hEntity.lease_money;
      const vm = this;
      var financeMoney = 0;
      var f = 0;
      for(var i = 0; i<temp.scfgDList.length; i++) {
        var scf = vm.validScopeVal(temp.scfgDList[i]);
        if(scf.flag === false){
          temp.scfgDList[i].val_str = scf.scfgD.val_str;
          break;
        }

        //获取融资额
        if(financeMoney === 0){
          var startPercent = 0;

          for (var a = 0; a<scfgDList.length; a++) {
            if (scfgDList[a].prm_code === 'finance_money') {
              f = a;
            } else if (scfgDList[a].prm_code === 'start_percent') {
              startPercent = scfgDList[a].val_str;
              financeMoney = leaseMoney * (100 - startPercent);
              financeMoney = Math.round(financeMoney)/100;
              // alert(startPercent +'=startPercent='+financeMoney);
            // } else if(scfgDList[j].prm_code === 'start_money' && ) {
            //   financeMoney = leaseMoney - scfgDList[j].val_str;
            }
          }
        }

        temp.scfgDList[f].val_str = financeMoney;
        temp.hEntity.finance_money = financeMoney;
            // alert(leaseMoney+"jjfinanceMoney="+financeMoney);

        //关联元素编码
        var relactionCode = scfgDList[i].relaction_code;
        if (vm.isNotBlank(relactionCode)) {
            //获取关联编码对应的值  百分比*100
          var percent = 0;
          var feeRef = '';
          for (var j = 0; j<scfgDList.length; j++) {
            if(scfgDList[j].prm_code === relactionCode) {
              percent = scfgDList[j].val_str;
              feeRef = scfgDList[j].fee_ref;
              break;
            }
          }
          //计算基数
          var baseMoney = 0;
          //判断计算基数是融资额还是设备款
          if(feeRef === '1') {
            //设备款
            baseMoney = leaseMoney;
          }else if(feeRef === '2') {
            //融资额
            baseMoney = financeMoney;
          }
          //计算结果值
          var valStr = percent * baseMoney;
          valStr = Math.round(valStr) / 100;
          temp.scfgDList[i].val_str = valStr;
        }
      }
    vm.feeInclude(temp.scfgDList);
    return temp;
  },

  /**
   * 费用归属计算
   * @param ele
   */
  feeInclude: function (scfgDList) {
    const vm = this;
    var sfkhj = 0;
    var tmp;
    // var rzehj = $("#finance_money").children(":first").val();
    // var self1  = this;
    for (var j = 0; j<scfgDList.length; j++) {
      //费用归属标识
      var feeInFlag = scfgDList[j].fee_include;
      if (vm.isNotBlank(feeInFlag)) {
        if (feeInFlag === '1') {
          //计入首期款
          sfkhj += parseFloat(scfgDList[j].val_str);
        } else if (feeInFlag === '2') {
          //计入融资额
          tmp += parseFloat(scfgDList[j].val_str);
          // } else if (feeInFlag === '3') {
          //   //计入设备款
          // } else if (feeInFlag === '4') {
          //   //计入尾款
        }
      }
    }
    $("#sfkhj").html(sfkhj);
    $("#rzehj").html(tmp);
  },
};
