<template>
  <div class="editForm">
    <el-dialog :title="editRowIndex > -1 ? '编辑修改' : '新增创建'" v-model="s_editFormVisible" size="tiny" :modal="false">
      <el-form class="editForm_form font_default"  ref="formData" :model="formData"  style="width:60%">
        <el-form-item label="标题">
          <el-input v-model="formData.title"  placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="类别">
          <el-select v-model="formData.template_type" :disabled="editRowIndex > -1" clearable placeholder="请选择">
            <el-option
              v-for="item in templateType"
              :label="item.ifbpFincName"
              :value="item.ifbpFincCode">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="模板">
        <textarea style="width:160%" cols="6" rows="2" v-model="formData.action_template" ></textarea>
      </el-form-item>
        <el-form-item label="备注">
          <textarea style="width:160%" cols="4" rows="2" v-model="formData.remark"></textarea>
        </el-form-item>
        <el-form-item label="主键" class="font_default" v-if="pk_template !=null">
          <el-input v-model="formData.pk_template"  placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">保存</el-button>
          <el-button @click="onCancel">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import urlRoot from '../../../common/urlRoot';
export default {
    name: 'editForm',
    data() {
      return {
        s_editFormVisible: false,
        templateType:"",
      };
    },
   props: ['formData','editFormVisible', 'editRowIndex'],
    methods: {
      onSubmit() {
        const vm = this;
        this.s_editFormVisible = false;
        this.$emit('onSubmit', this.formData);
        if(this.editRowIndex > -1){
          vm.$http.post(urlRoot.urlWepper('fin/config/updateTemplate'),[this.formData])
            .then((re) => {
              const msg = '';
              if (re.data.success === 'success'){
                vm.$message({
                  type: 'info',
                  message: '修改成功！'
                });
              } else {
                vm.$message({
                  type: 'error',
                  message: msg !=='' ? msg : '修改失败！'
                });
              }
            })
            .catch(() => {
              vm.$message({
                type: 'info',
                message: '修改失败！'
              });
            });
        }else{
          vm.$http.post(urlRoot.urlWepper('fin/config/insertTemplate'),[this.formData])
            .then((re) => {
              const msg = '';
              if (re.data.success === 'success'){
                vm.$message({
                  type: 'info',
                  message: '添加成功！'
                });
              } else {
                vm.$message({
                  type: 'error',
                  message: msg !=='' ? msg : '添加失败！'
                });
              }
            })
            .catch(() => {
              vm.$message({
                type: 'info',
                message: '添加失败！'
              });
            });
        }
      },
      querySelectDic:function(){
        const vm=this;
        $.ajax({
          type: 'post',
          dataType: "json",
          data:{template_type:"templateType"},
          url: urlRoot.urlWepper('fin/config/queryTemplateType'),
          success: function(re){
            vm.templateType=re.detailMsg.data.templateType;
          }
        });
      },
      onCancel() {
        this.s_editFormVisible = false;
      },
    },
    watch: {
      editFormVisible: function(value) {
        this.s_editFormVisible = value;
      },
      s_editFormVisible: function(value) {
        this.$emit('changeVisible', value);
      },
    },
    created: function() {
      this.querySelectDic();
    },

};
</script>
<style>
  .line{
    text-align: center;
  }
  .editForm .el-dialog--tiny{
    width: 60%;
  }
  .editForm_form {
    padding:5px 10px;
    margin:0 auto;
  }
  .editForm .el-form-item__label{
    font-size: 14px;
    color: #393C3E;
    font-family: 'ArialMT', 'Arial', 'PingFangSC-Regular';
    font-weight: 400;
    font-style: normal;
    line-height: normal;
    text-align: center;
    width: 25%;
    height: 36px;
    line-height: 36px;

    /*
    text-align: right;
    display: inline-block;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;*/
    padding:0px;
  }
  .editForm .el-input {
/*    width: %;*/

  }
  .editForm .el-form-item__content{
    width: 64%;
    float: right;
    margin-right: 30px;
  }
  .editForm .el-form-item{
    margin-bottom:10px;
  }
</style>
