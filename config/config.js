module.exports = {
  port: 7020,
  browserPort: 7021,
  static_path: '/dist',
  proxyList:[{  // 对应平台服务地址
    host:'http://127.0.0.1:8082',
    options:{
      filter: function(ctx){
        var url = ctx.url;
        return url.indexOf('/ifbp-fe') !== 0;
      }
    }
  },{ // 对应后台服务地址
    host:'http://10.3.1.141',
    options:{
      filter: function(ctx){
        var url = ctx.url;
        return url.indexOf('/fin-ifbp-base') === 0;
      }
    }
  }]
};
