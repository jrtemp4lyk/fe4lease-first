<template>
    <!-- 一列显示form -->
    <form class="form_component" v-if="!(formStyle && formStyle.simpleColumn === false)" :style="formStyle !== undefined ? formStyle.styleObject : {}">
        <!-- 按 settingData 循环显示行 -->
        <el-row class="formItem" v-for="(item, index) in settingData">
            <!-- 左边列开始 -->
            <el-col :span="8" >
                <label class="formItem__label font_default">
                     <span class="formItem__label_span1" v-if="item.required">*</span>
                     {{item.label}}
                </label>
            </el-col>
            <el-col :span="16" >
                <el-input class="formItem__content" v-model="formData[index].value" :placeholder="item.placeholder" :type="item.type ? item.type : 'text'" v-if="item.el==='input'">
                    <template slot="prepend" v-if="item.prepend">
                        <span class="formItem__prepend">{{item.prepend}}</span>
                    </template>
                </el-input>
                <el-select v-model="formData[index].value" :placeholder="item.placeholder" style="width: 100%"  
                    :filterable="item.filterable?item.filterable:false " 
                    :remote="item.remote?item.remote:false "
                    :remote-method="remoteMethod"
                    :loading="loading"  
                    v-else-if="item.selectremote?item.selectremote:false ">
                    <el-option v-for="option in options1" :label="option.label" :value="option.value" :disabled="option.disabled">
                    </el-option>
                </el-select>
                <el-select v-model="formData[index].value" :placeholder="item.placeholder" style="width: 100%" v-else>
                    <el-option v-for="option in item.options" :label="option.label" :value="option.value" :disabled="option.disabled">
                    </el-option>
                </el-select>
            </el-col>
        </el-row>
        <!-- 底部操作按钮 -->
        <el-row v-if="formStyle && formStyle.showButtons">
            <el-col :span="24" style="margin-left:33%;">
                <el-button size="primary" @click="onSubmit" type="primary">保存</el-button>
                <el-button size="primary" @click="onCancel" type="success" :plain="true">取消</el-button>
            </el-col>
        </el-row>
    </form>

    <!-- 两列显示form -->
    <form class="formBox" v-else>
        <!-- 按 settingData 循环显示行 -->
        <el-row class="formItem" v-for="index in rowCount">
            <!-- 第一列开始 -->
            <el-col :span="4" style="text-align:right; width:130px; margin-left:40px;">
                <label class="formItem__label font_default">
                    <span style="color:red;" v-if="settingData[index*2-2].required">*</span>
                    {{settingData[index*2-2].label}}
                </label>
            </el-col>
            <el-col :span="8" style="margin-left: 10px; width:300px;">
                <el-input class="formItem__content" v-model="formData[index*2-2].value" :placeholder="settingData[index*2-2].placeholder" :type="settingData[index*2-2].type ? settingData[index*2-2].type : 'text'" v-if="settingData[index*2-2].el==='input'">
                    <template slot="prepend" v-if="settingData[index*2-2].prepend">
                        <span class="formItem__prepend">{{settingData[index*2-2].prepend}}</span>
                    </template>
                </el-input>
                <el-select v-model="formData[index*2-2].value" :placeholder="settingData[index*2-2].placeholder" style="width: 100%" v-else>
                    <el-option v-for="option in settingData[index*2-2].options" :label="option.label" :value="option.value" :disabled="option.disabled">
                    </el-option>
                </el-select>
            </el-col>
            <!-- 第一列结束 -->
            <!-- 第二列开始 -->
            <el-col :span="4" style="text-align:right; width:130px; margin-left:40px;" v-if="settingData[index*2-1] !== undefined">
                <label class="formItem__label font_default">
                    <span style="color:red;" v-if="settingData[index*2-1].required">*</span>
                    {{settingData[index*2-1].label}}
                </label>
            </el-col>
            <el-col :span="8" style="margin-left: 10px; width:300px;" v-if="settingData[index*2-1] !== undefined">
                <el-input class="formItem__content" v-model="formData[index*2-1].value" :placeholder="settingData[index*2-1].placeholder" :type="settingData[index*2-1].type ? settingData[index*2-1].type : 'text'" v-if="settingData[index*2-1].el==='input'">
                    <template slot="prepend" v-if="settingData[index*2-1].prepend">
                        <span class="formItem__prepend">{{settingData[index*2-1].prepend}}</span>
                    </template>
                </el-input>
                <el-select v-model="formData[index*2-1].value" :placeholder="settingData[index*2-1].placeholder" style="width: 100%" v-else>
                    <el-option v-for="option in settingData[index*2-1].options" :label="option.label" :value="option.value" :disabled="option.disabled">
                    </el-option>
                </el-select>
            </el-col>
            <!-- 第二列结束 -->
        </el-row>
        <!-- 底部操作按钮 -->
        <el-row v-if="formStyle && formStyle.showButtons">
            <el-col style="text-align:center">
                <el-button size="large" @click="onSubmit" type="success">保存</el-button>
                <el-button size="large" @click="onCancel" type="success" :plain="true">取消</el-button>
            </el-col>
        </el-row>
    </form>
</template>
<script>
  import urlRoot from '../../../common/urlRoot';
  export default {
    name: 'ElFormComponent',
    props: ['form'],
    data() {
      return {
        loading:false,
        options1:[
              {
                value: '0',
                label: '数值型',
              },
              {
                value: '1',
                label: '字符型',
              },
              {
                value: '2',
                label: '日期型',
              },
            ],
      };
    },
    methods: {
      onSubmit() {
        const data = {};
        this.formData.forEach((item) => {
          data[item.key] = item.value;
        });
        this.$emit('onSubmit', data);
      },
      onCancel() {
        this.$emit('onCancel');
      },
      //xiejie3 目前只支持单列
      remoteMethod(query){
        const vm = this;
        if (query !== '') {
          this.loading = true;
          setTimeout(() => {
            vm.$http.post(urlRoot.urlWepper('fin/finprm/querycodename'),query)
                .then((re) => {
                    this.options1=re.data;
                }
                );
          }, 200);
          this.loading = false;
        } else {
          this.options1 = [];
        }
      },
    },
    created() {
      if (this.form.settingData.length !== this.form.formData.length) {
        throw new Error('请确保settingData和formData均为数组且长度一致！');
      }
      console.log(this.settingData);
    },
    computed: {
      formData() {
        return this.form.formData;
      },
      settingData() {
        return this.form.settingData;
      },
      formStyle() {
        return this.form.formStyle;
      },
      // 按两列显示的行数
      rowCount() {
        console.log(Math.ceil(this.settingData.length / 2));
        return Math.ceil(this.settingData.length / 2);
      }
    }
  };
</script>
<style>
    .formBox{ padding: 20px 10px; width: 100%; }
    .formItem{ margin-bottom: 10px; }
    .formItem__label{ width: 120px; height: 36px; line-height: 36px; text-align: center; display: inline-block; text-overflow: ellipsis; overflow: hidden; white-space: nowrap; }
    .formItem__prepend{ min-width: 15px; display: inline-block; text-align: center; }
    .formItem__label_span1 {
      color: red;
    }
    .form_component{
      width: 60%;
      margin: 0 auto;
    }
</style>

