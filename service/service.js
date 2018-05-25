 /**
     * @description 数据请求方法
     * @param {string} url  请求地址
     * @param {data} reqParamter 参数对象
     * @param {sucFunc} funcS  成功回调
     * @memberOf service 
     */
function Post(url, data, sucFunc, failFunc) {
  let urlHeader ='https://www.levionline.cn'; // 生产环境
  //let urlHeader='http://localhost:3000'; // 测试环境
  let token= wx.getStorageSync('token')||''; // 获取token
  data.token=token;
  wx.request({
    url: urlHeader+url,
    data: data,
    method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT  
    header: { 'Content-Type': 'application/json' }, 


    /*请求成功回调处理方法*/
    success: function (res) {
  //  if(res.data.){
  //  }
       console.log(res);
     
      return typeof sucFunc == "function" && sucFunc(res.data);

    },
    /*请求失败回调处理方法*/
    fail: function (res) {
      return typeof failFunc == "function" && failFunc(res.data);
    },
    complete: function () {
      // complete  
    }
  })

}


module.exports = {
  Post: Post
}  