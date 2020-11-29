$(function () {
    initArtCateList()
    // 渲染页面
    function initArtCateList() {
        $.ajax({
            url: '/my/article/cates',
            success: function (res) {
                console.log(res);
                var htmlStr = template('tpl-list', res)
                $('tbody').html(htmlStr)
            }
        })
    }
    var layer = layui.layer

    // 弹出层
    $('#btnAdd').on('click', function () {
        indexAdd = layer.open({
            type: 1,
            title: '添加文章分类',
            area: ['500px', '250px'],
            content: $('#dialog-add').html()
        });
    })
    // 事件委托
    var indexAdd = null //  关闭弹出层的方法的参数
    $('body').on('submit', '#form-add', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/article/addcates',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                // 调用重新渲染页面的函数
                initArtCateList()
                layer.msg('添加成功')
                //    关闭弹出层的方法
                layer.close(indexAdd)
            }

        })
    })

    var indexEdit = null //  关闭弹出层的方法的参数
    var form = layui.form
    // 弹出层
    $('tbody').on('click', '.btn-edit', function () {
        indexEdit = layer.open({
            type: 1,
            title: '修改文章分类',
            area: ['500px', '250px'],
            content: $('#dialog-edit').html()
        });
        var Id = $(this).attr('data-id')
        $.ajax({
            method: 'get',
            url: '/my/article/cates/' + Id,
            success: function (res) {
                form.val('form-edit', res.data)
            }
        })
    })
    $('body').on('submit', '#form-edit', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/article/updatecate',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                // 调用重新渲染页面的函数
                initArtCateList()
                layer.msg('更新成功')
                //    关闭弹出层的方法
                layer.close(indexEdit)
            }

        })
    })
    $('tbody').on('click', '.btn-delete', function () {
        var Id = $(this).attr('data-id')
        // 利用layui提供的confirm提示方法
        layer.confirm('是否确定删除?', {
                icon: 3,
                title: '提示'
            },
            function (index) {
                $.ajax({
                    method: 'GET',
                    url: '/my/article/deletecate/' + Id,
                    success: function (res) {
                        if (res.status !== 0) {
                            return layer.msg(res.message)
                        }
                        // 渲染页面
                        initArtCateList()
                        // 提示消息
                        layer.msg('删除成功')
                        //    关闭弹出层的方法
                        layer.close(indexindex)
                    }
                })


            });
    })


})