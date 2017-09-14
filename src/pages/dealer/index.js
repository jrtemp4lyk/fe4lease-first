module.exports = {
  routes: [
    {
      name: 'agencyList',
      path: '/dealer/agencylist',
      component: './src/agencyList.vue',
    },
    {
      name:'agency',
      path:'/dealer/agency/:id',
      component: './src/agency.vue'
    }
  ]
};
