$(function(){
    // 验证昵称
    var form=layui.form
    form.verify({
        nickname : function (value){
            if(value.length>6){
                return "昵称长度为1~6之间"
            }
        }
    })
    initUserInfo()
    // 声明layer
    var layer=layui.layer
    // 渲染页面
    function initUserInfo() {
        
        $.ajax({
            method:'GET',
            url:'/my/userinfo',
            success:function (res) {
                console.log(res);
                if(res.status!==0){
                    return layer.msg(res.message)
                }
                // 调用layui的方法  form.val
                form.val('formUserInfo',res.data)
            }
        })
    }
    // 表单重置
    $('#btnReset').on('click',function(e){
        // 阻止默认提交
        e.preventDefault()
        // 从新用户重新渲染
        initUserInfo()
    })
    // 修改用户信息
    $(".layui-form").on('submit',function(e){
        e.preventDefault()
        $.ajax({
            method:'POST',
            url:"/my/userinfo",
            data:$(this).serialize(),
            success:function(res){
                console.log(res);
                if(res.status!==0){
                    return layer.msg('用户信息修改失败')
                }
                 layer.msg('用户信息修改成功')
                // 调用父页面中更新页面和头像的方法
                window.parent.getUserInfo()
            }
        })
    })
})