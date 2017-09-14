<template>
  <div id="enterprise-info">
    <div class="title-header" style="padding: 20px 23px;">
      <h2 class="name">{{title}}</h2>
    </div>
    <div class="detail-container">
      <div class="cards-title">
        <el-button v-if="isCreate" type = "primary" @click="createForm" style="width: 80px;">保存</el-button>
        <el-button type = "primary" @click="backButton" style="float:right;width: 80px;">返回</el-button>
      </div>
      <div class="background">
        <div class="detail-item" id="enterprise-information" style="height:600px;">
          <div class="child-title"><b>基本档案</b><i v-if="!isEdit['enterprise-information'] && !isCreate" class="el-icon-edit" @click="toggle('enterprise-information')"></i></div>
          <div class="child-item-left">
            <el-upload
              class="avatar-uploader"
              action="/ifbp-app-bd/bd/customer/personal/file"
              v-if="isEdit['enterprise-information']"
              :show-file-list="false"
              :on-success="function(res,file){handleAvatarSuccess('enterprise-information',res,file)}"
              :before-upload="function(res,file){return beforeAvatarUpload('enterprise-information',res,file)}">
              <img v-if="imageUrl[imageCodes['enterprise-information']]" :src="realPath[imageCodes['enterprise-information']]" style="max-height:100%;max-width:100%">
              <div v-else style="height:100%;text-align:center;width:100%;"><i class="el-icon-plus avatar-uploader-icon"></i></div>
            </el-upload>
            <div v-else class="avatar-uploader" style="padding:1px;"><img :src="realPath[imageCodes['enterprise-information']]" style="max-height:100%;max-width:100%;"></div>

            <div style="text-align:center;">营业执照</div>
          </div>
          <div class="child-item-right">
              <el-template :pkTemp="pktemp['enterprise-information']"
                          ref="detail"
                          @change="changeHandle"
                          @setEmptyKeys="function(v){setEmpty(v,'enterprise-information')}"
                          :hide-title="true"
                          :isEdit="isEdit['enterprise-information']"
                          :templateValue="currentValue['enterprise-information']">
              </el-template>
              <el-button-group class="group" v-if="isEdit['enterprise-information'] && !isCreate">
                <el-button class="save" type="primary" @click="submit('enterprise-information')">保存</el-button>
                <el-button class="save" type="primary" @click="cancel('enterprise-information')">取消</el-button>
              </el-button-group>
              <el-button v-if="!isEdit['enterprise-information']" class="save" type="primary" @click="toggle('enterprise-information')">编辑</el-button>
          </div>
        </div>
      </div>
      <div id="cover" ref="cover"><div class="el-loading-spinner"><svg viewBox="25 25 50 50" class="circular"><circle cx="50" cy="50" r="20" fill="none" class="path"></circle></svg><!----></div></div>
    </div>
  </div>
</template>
<script>
 //import template from '../../../userInfo/ui-template/src/template.vue';
  export default {
    components:{
     // uitemplate:template
    },
    data(){
      var isCreate = this.$route.params.id === 'add';
      return {
        loading: '',
        title: '企业客户',
        templateValue: {},//整个元数据值集合
        currentValue: {},
        originalValue: {},
        loadDefer: [],
        imageUrl: {},
        realPath: {},
        validity_time_tpl: {},
        imageCodes: {
          'enterprise-information': 'certificate_img',
        },
        id: this.$route.params.id,//'uapcloud100000006r22'
        isCreate: isCreate,
        formForCreate: ['enterprise-information'],
        isEdit: {
          'enterprise-information': isCreate,
        },
        pktemp: {
          'enterprise-information': '02b1edce-ad8e-4580-971d-72a9ee941598',
        },
        promises: {},
      };
    },
    beforeCreate(){
    },
    created() {
      console.log(this);
      var requestDefer = this.request();
      this.initPromise(requestDefer);
    },
    watch: {
      imageUrl:{
        handler: function(){
          Object.keys(this.imageUrl).forEach((v) => {
            this.$set(this.realPath, v, this.getRealImg(this.imageUrl[v]));
          });
        },
        deep: true
      }
    },
    methods: {
      initPromise(request){
        Object.keys(this.pktemp).forEach((id) => {
          var promise = new Promise((res, rej) => {
            this.promises[id] = {
              resolve: res,
              reject: rej
            };
          });
          this.loadDefer.push(promise);
          if (!this.isCreate) {
            Promise.all([promise, request]).then(() => {
              this.assignValues(id);
            });
          }
        });
        Promise.all(this.loadDefer.concat(request)).then(() => {
          this.$nextTick(() => {
            setTimeout(() => {
              this.$refs.cover.remove();
            },100);
          });
          this.validity_time_tpl = this.getTemplateByCode('validity_time');
          this.specialLogic();
        });
      },
      specialLogic() { // if checkbox is checked, disabled validity_time component
        var watchValue = this.currentValue['enterprise-information'].islongterm;
        if (Object.prototype.toString.call(watchValue) === '[object String]' && watchValue !== '') {
          this.validity_time_tpl.isReadonly = true;
          this.currentValue['enterprise-information'].validity_time = null;
        } else {
          this.validity_time_tpl.isReadonly = false;
        }
      },
      // get template data of special itemCode, to edit more than data of component
      getTemplateByCode(code) {
        var formlayout = this.$refs.detail.formLayout;// refname here
        var tpl;
        var components = [];
        formlayout.forEach((form) => {
          components = components.concat(form.layoutDetail);
        });
        for (var i=0;i<components.length;i++) {
          if (components[i].itemCode.split('.').pop() === code) {
            tpl = components[i];
            break;
          }
        }
        return tpl;
      },
      initImgUrl(data) {
        var img = 'group1/M00/00/11/CgRmOVlwCDiAOAi-AAC0BlVVYIk045.jpg';
        var tmp;
        Object.keys(this.imageCodes).forEach((v) => {
          tmp = [null,''].indexOf(data[this.imageCodes[v]]) > -1 ? img : data[this.imageCodes[v]];
          this.$set(this.imageUrl, this.imageCodes[v], tmp);
        });
      },
      request(){
        var promise;
        if (!this.isCreate) {
          promise = this.$http({
            url: '/ifbp-app-bd/bd/customer/enterprise/'+ this.id,
            method: 'get',
            dataType: 'json'
          }).then((res) => {
            this.templateValue = res.data.data;
            this.initImgUrl(res.data.data);
            // this.assignValues(this.currentValue, this.templateValue);
            // this.currentValue = JSON.parse(JSON.stringify(this.templateValue));
          });
        }
        return promise;
      },
      assignValues(id){
        var map = Object.keys(this.currentValue[id]);
        for(var i=0;i<map.length;i++){
          this.currentValue[id][map[i]] = this.templateValue[map[i]];
        }
        this.originalValue[id] = JSON.parse(JSON.stringify(this.currentValue[id]));
      },
      toggle(id) {
        this.isEdit[id] = !this.isEdit[id];
      },
      cancel(id) {
        this.toggle(id);
        this.currentValue[id] = JSON.parse(JSON.stringify(this.originalValue[id]));
        if(id === 'enterprise-information') { // special logic for enterprise-information page
          this.specialLogic();
        }
      },
      createForm(){
        var submitData = {id: ''};
        this.formForCreate.forEach((formID) => {
          Object.keys(this.currentValue[formID]).forEach((v) => {
            submitData[v] = this.currentValue[formID][v];
          });
        });
        this.$http({
          url: '/ifbp-app-bd/bd/customer/enterprise/',
          method: 'post',
          dataType: 'json',
          data: submitData
        }).then((res) => {
          if(res.data.success === true) {
            if (window.env === 'dev') {
              this.$message('添加成功');
            }
            this.id = res.data.data.id;
            this.$router.push('/dealer/agency/' + this.id);
            this.originalValue = JSON.parse(JSON.stringify(this.currentValue));
            this.isCreate = false;
            Object.keys(this.isEdit).forEach((v) => {
              this.isEdit[v] = false;
            });
          } else {
            this.$message.error('保存失败');
          }
        }).catch(() => {
          this.$message.error('保存失败');
        });
      },
      submit(id){
        var changedPropertyNames;
        var submitData;
        changedPropertyNames = Object.keys(this.currentValue[id]);
        changedPropertyNames.push(this.imageCodes[id]); // 带上图片key
        submitData = JSON.parse(JSON.stringify(this.currentValue[id]));
        submitData.id = this.id;
        submitData[this.imageCodes[id]] = this.imageUrl[this.imageCodes[id]];
        submitData.changedPropertyNames = changedPropertyNames;

        this.$http({
          url: '/ifbp-app-bd/bd/customer/enterprise/',
          method: 'post',
          dataType: 'json',
          data: submitData
        }).then((res) => {
          console.log(res);
          if(res.data.success === true) {
            this.isEdit[id] = false;
            if (window.env === 'dev') {
              this.$message('保存成功');
            }
            this.originalValue[id] = JSON.parse(JSON.stringify(this.currentValue[id]));
          }else {
            this.$message.error('保存失败');
          }

        }).catch(() => {
          this.$message.error('保存失败');
        });
      },
      setEmpty(value, id){
        this.$set(this.currentValue, id, value);
        this.promises[id].resolve(id);
      },
      changeHandle(data) {
        if (data.key === 'islongterm') {
          this.specialLogic();
        }
      },
      backButton() {
        window.history.back(-1);
      },
      beforeAvatarUpload(id){
        var pass;
        if(this.isCreate && ['enterprise-information'].indexOf(id) < 0) {
          this.$message('请先新增并保存主表数据');
          pass = false;
        } else {
          pass = true;
        }
        return pass;
      },
      getRealImg(url) {
        var realPath = '';
        if(url && url.length > 0) {
          if (url.indexOf(',') > -1) { // grid中的多个图片暂时显示最新一张
            realPath = '/ifbp-app-bd/bd/customer/personal/file?filepath=' + url.split(',').pop();
          } else { // form 中图片都是一张
            realPath = '/ifbp-app-bd/bd/customer/personal/file?filepath=' + url;
          }
        }
        return realPath;
      },
      handleAvatarSuccess(id, res){
        this.$set(this.imageUrl, this.imageCodes[id], res.data);
      },
    }
  };
</script>
<style>
  .detail-container .el-form-item {
    margin-bottom: 20px;
  }
  .detail-container input.el-input__inner {
    height: 36px;
  }
  .detail-container .el-upload__input {
  display: none;
  }
  .detail-container .el-form-item__label {
    font-size: 13px;
  }
  .detail-container .save {
    width: 100px;
    margin-left: calc(50% - 50px);
  }
  .detail-container .group .save {
    width: 100px;
    margin-left: 10px;
  }
  .detail-container .group {
    width: 220px;
    margin-left: calc( 50% - 110px);
  }
  .detail-container .el-upload.el-upload--text {
    height: 100%;
    width: 100%;
  }
  .detail-container .avatar-uploader .el-upload:hover {
    border-color: #20a0ff;
  }
  .detail-container .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
</style>
<style scoped>
  #cover {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: hsla(0,0%,100%,.9);
    z-index: 200000;
    transition: opacity .3s;
  }
  .avatar-uploader {
    width: 300px;
    height: 300px;
    margin-left: calc(50% - 150px);
    text-align: center;
    margin-top: calc(290px - 150px);
  }
  .avatar-uploader-icon {
    width: 300px;
    height: 300px;
    line-height: 300px;
  }
  .el-icon-loading {
    top: 50%;
    position: absolute;
    left: 50%;
    margin-left: -25px;
    margin-top: -25px;
    font-size: 50px;
  }
  .el-icon-edit, .el-icon-plus {
    font-size: 15px;
    color: #00a5e3;
    cursor: pointer;
    margin-left: 5px;
  }
  .detail-item {
    min-height: 250px;
    background-color: white;
    margin-bottom: 20px;
    padding: 10px;
  }
  .child-item {
    /*height: 250px;*/
    border-bottom: 1px solid #CECECE;;
    margin: 10px;
    padding-bottom: 15px;
  }
  .child-item:last-child{
    border:none;
  }
  .child-item-left {
    margin-right: 10px;
    /*border: 1px solid black;*/
    width: calc(40% - 12px);
    vertical-align: top;
    display: inline-block;
  }
  .child-item-right {
    margin-left: 10px;
    /*border: 1px solid black;*/
    width: calc(60% - 12px);
    vertical-align: top;
    display: inline-block;
  }
  .cards-title {
    /* width: 100%; */
    font-size: 20px;
    background-color: white;
    /*border: 1px solid #cecece;*/
    height: 64px;
    padding: 14px;
    margin: 20px 20px 0 20px;
  }
  .background {
    background-color: #eeeff1;
    margin: 20px 20px 0 20px;
  }
  .child-title {
    line-height: 20px;
    font-size: 14px;
    text-align: left;
    padding: 10px 10px 0px 10px;
  }
</style>
