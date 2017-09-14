<template>
  <el-dialog :title="editRowIndex > -1 ? '编辑修改' : '新增创建'" v-model="s_editFormVisible" size="small">
    <formcomponent :form="form" @onSubmit="onSubmit" @onCancel="onCancel" @remoteMethod="remoteMethod" ></formcomponent>
  </el-dialog>
</template>
<script>
  import formcomponent from './form-component.vue';
  export default {
    data() {
      return {
        s_editFormVisible: false
      };
    },
    props: ['form', 'editFormVisible', 'editRowIndex'],
    methods: {
      onSubmit(data) {
        this.s_editFormVisible = false;
        this.$emit('onSubmit', data);
      },
      onCancel() {
        this.s_editFormVisible = false;
      },
      remoteMethod(){
        this.$emit("remoteMethod");
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
    components: {
      formcomponent,
    },
  };
</script>
<style>
  .line{
    text-align: center;
  }
</style>
