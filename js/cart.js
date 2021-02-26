//获取账号cookie
var user = getCookie('user')
//获取地址栏中的地址
var url = location.href
//获取localStorage中的cartList
var cartList = localStorage.getItem('cartList')
//把当前cartList字符串转为数组对象
cartList=JSON.parse(cartList)||[]
//判断当前cookie是否存在
if(user){
    show()
}else{
    alert('你还没登录，请登录进入')
    location="./login.html?pathUrl="+url
}

function show(){
    //判断当前localStorage中是否有内容
    if(cartList.length>0){
        //获取全选框是否被选中
        var aa=cartList.every(item=>{
            //判断当前商品是否被选中
            return item.is_select==1
        })
        //获取当前被选中商品的种类和价格
        var sum = total()

        var str2=""
        
        cartList.forEach(item=>{
            str2+=`
            <tr class="cart-row">
                <td>
                    <input type="checkbox" name="check-one" class="cart-checked-item" value="1" ${item.is_select==1?"checked":''} data-id="${item.goods_id}" data-em1="${item.em1}"  data-em2="${item.em2}" data-em3="${item.em3}">
                </td>
                <td>
                    <div class="table-goods-pic">
                        <img src="${item.goods_img1}" alt="">
                    </div>
                </td>
                <td>
                    <div>
                        <a href="http://localhost/ztemall/item.html?item_id=${item.goods_id}" class="cart-goods-name">${item.goods_title}</a>
                    </div>
                    <span style="color:#666666;">颜色：${item.em1}、版本：${item.em2}、网络制式：${item.em3}</span>
                </td>
                <td class="text-center">￥${item.goods_price}</td>
                <td class="text-center">
                    <div class="number"> 
                        <span class="number-increase-decrease">
                            <button type="button" class="btn btn-flat decrease" data-id="${item.goods_id}" data-em1="${item.em1}"  data-em2="${item.em2}" data-em3="${item.em3}" ${item.cart_number<=1?"disabled":''}>-</button>
                            <button type="button" class="cart-num">${item.cart_number}</button>
                            <button type="button" class="btn btn-flat increase" data-id="${item.goods_id}" data-em1="${item.em1}"  data-em2="${item.em2}" data-em3="${item.em3}" ${item.cart_number>=item.max_num?"disabled":''}>+</button>
                        </span>
                    </div>
                </td>
                <td class="text-center">
                    <span>￥${item.cart_number*parseInt(item.goods_price).toFixed(2)}</span>
                </td>
                <td class="col-operate">
                    <div>
                        <a href="javascript:void(0);" name="delete-item" class="delete-item" data-id="${item.goods_id}"  data-em1="${item.em1}"  data-em2="${item.em2}" data-em3="${item.em3}">删除</a>
                    </div>
                </td>
            </tr>
            
            `
        })

        var str3 = 
        `
        <div class="cart-hd cart-table">
                            <div class="cart-row cart-table-th">
                                <div class="cart-col col-checkbox">
                                    <input type="checkbox" class="check-all" name="check-all" ${aa?"checked":''}>全选
                                </div>
                                <div class="cart-col col-name text-center">商品</div>
                                <div class="cart-col col-other text-center">单价（元）</div>
                                <div class="cart-col col-other text-center">数量</div>
                                <div class="cart-col col-other text-center">金额</div>
                                <div class="cart-col">操作</div>
                            </div>
                        </div>
                        <div class="cart-table">
                            <table class="item-table">
                                <colgroup>
                                    <col class="table-col-1">
                                    <col class="table-col-2">
                                    <col class="table-col-3">
                                    <col class="table-col-4">
                                    <col class="table-col-5">
                                    <col class="table-col-6">
                                    <col class="table-col-7">
                                </colgroup>
                                <thead>
                                    <tr>
                                        <td colspan="7">
                                            <label for="">
                                                <input type="checkbox" class="check-all" name="check-all" ${aa?"checked":''}>
                                                <em>ZTE中兴官方商城</em>
                                            </label>
                                        </td>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${str2}
                                </tbody>
                            </table>
                        </div>
                        <div class="cart-table cart-table-ft">
                            <div class="cart-table-btm">
                                <div class="cart-row">
                                    <div class="cart-col cart-check-all">
                                        <input type="checkbox" class="check-all" name="check-all" ${aa?"checked":''}>
                                        <label for="">全选</label>
                                        <a href="#" class="delete-all" name="delete-all">删除</a>
                                    </div>
                                    <div class="cart-col cart-col-right">
                                        <span>已选商品<em>${sum[0]}</em>件</span>
                                        <span>总计原价（不含运费）：<em>￥${sum[1]}</em></span>
                                        <span>优惠金额：<em>0</em></span>
                                        <span class="total-price">合计（不含运费）：<em>￥${sum[1]}</em></span>&nbsp;&nbsp;&nbsp;
                                        <button type="submit" class="btn btn-import btn-lg submit-cart"><span><span>去结算</span></span></button>
                                    </div>
                                </div>
                            </div>
                        </div>
        `
        $('.cart').html(str3)
    }else{
        var str1 = `
            <div class="empty-cart">
                <div class="offset-lg-2">
                    <i class="icon icon-cart-a"></i>
                    <p class="empty-cart-text">
                    购物车内暂时没有商品，<a href="./index.html">去首页</a>挑选喜欢的商品
                    </p>
                </div>
            </div>
        `
        $('.cart').html(str1)
    }
}

//给cart盒子对象绑定点击事件
$('.cart').click(function(e){
    var target = e.target
    if(target.innerHTML=="+"){
        //获取当前对象中的id属性，规格属性
        var id=target.getAttribute("data-id")
        var dem1 = target.getAttribute('data-em1')
        var dem2 = target.getAttribute('data-em2')
        var dem3 = target.getAttribute('data-em3')
        //遍历cartList数组对象
        cartList.forEach(item=>{
            //判断遍历出来的商品是否为当前操作商品
            if(item.goods_id==id&&item.em1==dem1&&item.em2==dem2&&item.em3==dem3){
                item.cart_number++
            }
        })
        //重新把当前操作完毕的数组添加到localStorage中
        localStorage.setItem("cartList",JSON.stringify(cartList))
        //调用show方法，重新把页面再次渲染
        show()
    }
    //判断当前点击的是否为减法按钮
    if(target.innerHTML=='-'){
        //获取当前对象中的id属性
        var id=target.getAttribute("data-id")
        var dem1 = target.getAttribute('data-em1')
        var dem2 = target.getAttribute('data-em2')
        var dem3 = target.getAttribute('data-em3')
        //遍历cartList数组对象
        cartList.forEach(item=>{
            //判断遍历出来的商品是否为当前操作商品
            if(item.goods_id==id&&item.em1==dem1&&item.em2==dem2&&item.em3==dem3){
                item.cart_number--
            }
        })
        //重新把当前操作完毕的数组添加到localStorage中
        localStorage.setItem("cartList",JSON.stringify(cartList))
        //调用show方法，重新把页面再次渲染
        show()
    }
    //删除
    if(target.name=="delete-item"){
        //获取当前点击对象的id
        var id=target.getAttribute("data-id")
        var dem1 = target.getAttribute('data-em1')
        var dem2 = target.getAttribute('data-em2')
        var dem3 = target.getAttribute('data-em3')

        cartList=cartList.filter(item=>item.goods_id!=id||item.em1!=dem1||item.em2!=dem2||item.em3!=dem3)
        // cartList=cartList.filter(i=>i.em1!=dem1).filter(j=>j.em2!=dem2).filter(item=>item.goods_id!=id)

        console.log(cartList);

        //重新把当前操作完毕的数组添加到localStorage中
        localStorage.setItem("cartList",JSON.stringify(cartList))
        //调用show方法，重新把页面再次渲染
        show()
        cartNumber()
    }
    //全删
    if(target.name=="delete-all"){
        console.log('delete-all');
        cartList=cartList.filter(item=>{
            //过滤被删除的商品
            return item.is_select==0
        })
        //重新把当前操作完毕的数组添加到localStorage中
        localStorage.setItem("cartList",JSON.stringify(cartList))
        //调用show方法，重新把页面再次渲染
        show()
        cartNumber()
    }
    //全选
    if(target.name=="check-all"){
        //遍历所有商品
        cartList.forEach(item=>{
            //判断当前全选框是否被选中
            if(target.checked){
                item.is_select=1
            }else{
                item.is_select=0
            }
        })
        //重新把当前操作完毕的数组添加到localStorage中
        localStorage.setItem("cartList",JSON.stringify(cartList))
        //调用show方法，重新把页面再次渲染
        show()
    }
    // 选中
    if(target.name=="check-one"){
        //获取当前商品对应的id 
        var id=target.getAttribute("data-id")
        var dem1 = target.getAttribute('data-em1')
        var dem2 = target.getAttribute('data-em2')
        var dem3 = target.getAttribute('data-em3')
        //遍历数组中所有的商品对象
        cartList.forEach(item=>{
           if(item.goods_id==id&&item.em1==dem1&&item.em2==dem2&&item.em3==dem3){
            item.is_select=item.is_select==1?"0":"1"
           }
       })
        //重新把当前操作完毕的数组添加到localStorage中
        localStorage.setItem("cartList",JSON.stringify(cartList))
        //调用show方法，重新把页面再次渲染
        show()
    }
    //去结算
    if(target.innerHTML=="去结算"){
        console.log('去结算');
        //添加确认框
        if(confirm("你确定要购买吗？")){
            alert("你需要支付：￥"+total()[1])
            cartList=cartList.filter(item=>{
                return item.is_select!=1
            })
            //重新把当前操作完毕的数组添加到localStorage中
            localStorage.setItem("cartList",JSON.stringify(cartList))
            //调用show方法，重新把页面再次渲染
            show()
            cartNumber()
        }
    }
})

//统计所选商品种类和价格
function total(){
    var num=0 //所选商品种类
    var price=0 //所选商品总价格
    //遍历cartList数组对象
    cartList.forEach(item=>{
        //判断当前商品是否被选中
        if(item.is_select==1){
            num++
            price+=item.cart_number*parseInt(item.goods_price)
        }
    })
    return [num,price]
}
function cartNumber() {
    //购物车数量刷新
    var cartNum1 = localStorage.getItem('cartList')
    cartNum2 = JSON.parse(cartNum1) || []
    $('.cart-number').html(cartNum2.length)
}
