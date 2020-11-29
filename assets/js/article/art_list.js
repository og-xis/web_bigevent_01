$(function () {
    // 时间补零
    function padZero(n) {
        return n > 9 ? n : '0' + n
    }
    // 时间过滤器
    template.defaults.imports.dateFormat = function (dtStr) {
        var dt = new Date(dtStr)
        var y = dt.getFullYear()
        var m = padZero(dt.getMonth() + 1)
        var d = padZero(dt.getDate())
        var h = padZero(dt.getHours())
        var f = padZero(dt.getMinutes())
        var s = padZero(dt.getSeconds())
        return y + "-" + m + "-" + d + " " + h + ":" + f + ":" + s
    }
    var q = {
        pagenum: "1", //页码值
        pagesize: "2", //每页多少条
        cate_id: "", // 文章分类 的  id
        state: "" //    文章的状态
    }

    // 列表模板
    initTable()

    var layer = layui.layer

    function initTable() {
        $.ajax({
            method: 'GET',
            url: '/my/article/list',
            data: q,
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                var htmlStr = template('tpl-table', res)
                // 渲染页面
                $('tbody').html(htmlStr)
                // 调用分页
                renderPage(res.total)
            }
        })
    }


    // 初始化文章分类的方法
    initCate()
    var form = layui.form

    function initCate() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('获取分类数据失败！')
                }
                // 调用模板引擎渲染分类的可选项
                var htmlStr = template('tpl-cate', res)
                $('[name=cate_id]').html(htmlStr)
                // 通过 layui 重新渲染表单区域的UI结构
                form.render()
            }
        })
    }

    $('#form-search').on('submit', function (e) {
        e.preventDefault()
        var state = $('[name=state]').val()
        var cate_id = $('[name=cate_id]').val()
        q.cate_id = cate_id
        q.state = state
        initTable()
    })

    // 分页方法
    laypage=layui.laypage

    function renderPage(total){
        // alert(total)

        laypage.render({
            elem:"pageBox",
            count:total,// 数据总数  服务器的到
            limit:q.pagesize,
            curr:q.pagenum,
            layout:	['count','limit','prev', 'page', 'next','skip'],
            limits: [2,3,5,10],

            jump: function(obj, first){

                // obj 代表所有参数所在的对象
                // first  代表是否第一次初始化分页


                //obj包含了当前分页的所有参数，比如：
                console.log(obj.curr); //得到当前页，以便向服务端请求对应页的数据。
                console.log(obj.limit); //得到每页显示的条数
                q.pagenum=obj.curr    //  
                q.pagesize=obj.limit
                //首次不执行
                // 判断不是第一次初始化分页，才能重新调用初始化文章列表
                if(!first){
                  //do something
                  initTable()
                }
              }
        })
    }
     

    // 删除
    layer=layui.layer
    $('tbody').on('click','.btn-delete',function(){
        var Id=$(this).attr('data-id')
        layer.confirm('确认删除?', {icon: 3, title:'提示'}, function(index){
            $.ajax({
                method:'GET',
                url:'/my/article/delete/'+Id,
                success:function(res){
                    if(res.status!==0){
                        return layer.msg(res.message)
                    }
                    layer.msg('删除成功')
                    if($('.btn-delete').length==1 && q.pagenum>1) q.pagenum--;
                    initTable()
                }
            })
            
            layer.close(index);
          });
    })
})