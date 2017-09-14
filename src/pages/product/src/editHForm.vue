<template>
  <div class="editForm">
    <el-dialog :title="editRowIndex > -1 ? '编辑品牌' : '新增品牌'" v-model="s_editFormVisible" size="tiny">
      <el-form class="editForm_form font_default"  ref="formData" :model="formData"  style="width:60%">
        <el-form-item label="厂商">
          <el-select v-model="formData.supplier_id" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="品牌">
          <el-input v-model="formData.product_name"  placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="品牌编码">
          <el-input v-model="formData.product_code"  placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="品牌图片">
          <el-upload
            action="https://jsonplaceholder.typicode.com/posts/"
            list-type="picture-card"
            :auto-upload="false"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove">
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog v-model="dialogVisible" size="tiny">
            <img width="100%" :src="dialogImageUrl" alt="">
          </el-dialog>
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
        dialogImageUrl: '',
        dialogVisible: false,
        options: [{
          value: '2c57cf25-833a-4c92-8e53-41cd8c6067bg',
          label: '东风汽车'
        }, {
          value: '2c57cf25-833a-4c92-8e53-41cd8c6067jg',
          label: '西风汽车'
        }, {
          value: '2c57cf25-833a-4c92-8e53-41cf8c6067ja',
          label: '南丰汽车'
        }],
        s_editFormVisible: false,
      };
    },
   props: ['formData','editFormVisible', 'editRowIndex'],
    methods: {
      onSubmit() {
        const vm = this;
        this.s_editFormVisible = false;
        if(this.editRowIndex > -1){
          $.ajax({
            type: 'post',
            dataType: "json",
            contentType:'application/json',
            data:JSON.stringify(this.formData),
            url: urlRoot.urlWepper('fin/productMgt/doUpdateProductH'),
            success: function(re){
              // this.$emit('getProductD');
              vm.$emit('onSubmit', vm.formData);
              alert(JSON.stringify(re.success));
            }
          });
        }else{
          $.ajax({
            type: 'post',
            dataType: "json",
            contentType:'application/json',
            data:JSON.stringify(this.formData),
            url: urlRoot.urlWepper('fin/productMgt/doAddProductH'),
            success: function(re){
              vm.$emit('onSubmit', vm.formData);
              alert(re.success);
            }
          });
        }
      },
      onCancel() {
        this.s_editFormVisible = false;
      },
      // 图片上传
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      }
    },
    /*computed: {
      form: function() {
        console.log('computed', this.formData);
        const a = this.formData;
        return {
          ifbpFinCode: a.ifbpFinCode,
          ifbpFinOpttype: a.ifbpFinOpttype,
          ifbpFinName: a.ifbpFinName,
          creater:a.creater,
          remark: a.remark,
        };
      },
    },*/
    watch: {
      editFormVisible: function(value) {
        this.s_editFormVisible = value;
      },
      s_editFormVisible: function(value) {
        this.$emit('changeVisible', value);
      },

    },
    created: function() {

    },

};
</script>
<style>
  .line{
    text-align: center;
  }
  .editForm_form {
    padding:20px 10px;
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
    width: 250px;
}
  .editForm .el-form-item{
    margin-bottom:10px;
  }

</style>
