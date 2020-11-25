$(function () {
    // 点击注册  显示注册 隐藏登录
    $('#link_reg').on('click', function () {
        $('.login-box').hide()
        $('.reg-box').show()
    })
    //  点击登录   显示登录  隐藏注册
    $('#link_login').on('click', function () {
        $('.login-box').show()
        $('.reg-box').hide()
    })

    // 2.自定义校验规则
    var form = layui.form
    form.verify({
        pwd: [
            /^[\S]{6,12}$/,
            '密码必须6到12位，且不能出现空格'
        ],
        repwd: function (value) {
            var pwd = $('.reg-box input[name=password]').val()
            if (value !== pwd) {
                return '俩次输入不一样'
            }
        }
    })
    //  注册
    var layer = layui.layer
    $('#form_reg').on('submit', function (e) {
        e.preventDefault()
        // 发送ajax
        $.ajax({
            method: 'POST',
            url: '/api/reguser',
            data: {
                username: $('.reg-box [name=username]').val(),
                password: $('.reg-box [name=password]').val()
            },
            success: function (res) {
                if (res.status !== 0) {
                    // return alert(res.message)
                    return layer.msg(res.message, {
                        icon: 5
                    })
                }
                layer.msg('恭喜您，注册成功', {
                    icon: 6
                })
                $('#link_login').click()
                $('#form_reg')[0].reset()
            }
        })
    })
    //  登录
    $("#form_login").on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/api/login',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                // 提示信息  保存token  跳转页面
                layer.msg('恭喜您，登录成功')
                localStorage.setItem('token', res.token)
                location.href = '/index.html'
            }
        })
    })
})