var bestURL='http://ajax.frontend.itheima.net'
$.ajaxPrefilter(function(params){
    params.url=bestURL+params.url
})