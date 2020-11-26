var bestURL='http://ajax.frontend.itheima.net'
$.ajaxPrefilter(function(params){
    // 拼接对应地址的服务器接口
    params.url=bestURL+params.url
    // 对有权限的接口配置头信息
    if(params.url.indexOf('/my/')!==-1){
        params.headers= {
            Authorization:localStorage.getItem("token") || ""
        }
    }
    // 登录拦截
    params.complete=function(res){
        console.log(res.responseJSON);
        var obj=res.responseJSON
        if(obj.status==1&&obj.message==='身份认证失败！'){
            localStorage.removeItem('token')
            location.href='/login.html'
        }
    }
})