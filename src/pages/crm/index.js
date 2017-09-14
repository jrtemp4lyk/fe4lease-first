module.exports = {
  routes: [
    {
      name: 'personalDetail',
      path: '/crm/personalDetail/:id',
      component: './src/personalDetail.vue',
    },
    {
      name:'personalInfo',
      path:'/crm/personalInfo/:id',
      component: './src/personalInfo.vue'
    },
    {
      name:'enterpriseInfo',
      path:'/crm/enterpriseInfo/:id',
      component: './src/enterpriseInfo.vue'
    },
    {
      name:'crmList',
      path:'/crm/crmList',
      component: './src/crmList.vue'
    }
  ]
};
