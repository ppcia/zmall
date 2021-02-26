//获取pagination对象
var pagination1 = $('.pagination')[0]
//获取传入的商品类别
var id = location.search.split('=')[1]
// 排序名称
var orderName = ''

getItemList(id, orderName)

function getItemList(id, orderName) {
    $(async function () {

        if (id) {
            var listItems = await $.get('./php/list.php', { "type": id, "orderName": orderName }, function (res) {
                return res
            }, "json")
            //创建分页器对象
            new Pagination(pagination1, {
                pageInfo: {
                    pagenum: 1,
                    pagesize: 10,
                    totalsize: listItems.length,
                    totalpage: Math.ceil(listItems.length / 10)
                },
                textInfo: {
                    prev: "<",
                    next: ">",
                }, cb(m) {
                    var newLists = listItems.slice((m - 1) * 10, m * 10)
                    var str = ''

                    newLists.forEach(item => {
                        var newimg = item.goods_img1.replace('resize,w_220,h_220', 'resize,w_640,h_640')
                        let hasDiscount = item.goods_discount == 1 ? 'inline-block' : 'none'
                        str += `
                        <li>
                            <div class="item">
                                <div class="pic">
                                    <a href="./item.html?item_id=${item.goods_id}">
                                        <img src="${newimg}" alt=""> 
                                    </a>
                                    <div class="cart-mask" data-id=${item.goods_id}>加入购物车</div>
                                </div>
                                <div class="caption">
                                    <a href="./item.html?item_id=${item.goods_id}" class="name">
                                                ${item.goods_title}
                                    </a>
                                    <div class="price">￥<em>${item.goods_price}</em></div>
                                    <div class="promotion">
                                        <span class="discount-tag"  style="display:${hasDiscount}">送赠品</span>
                                    </div>    
                                </div>
                            </div>
                        </li>
                    `
                    });
                    $('.itemslist').html(str)

                    // 所有商品总数
                    $('.num>em').html(listItems.length)


                }
            })

            // 加入购物车点击事件
            $('.cart-mask').click(function (e) {

                $('.dialog').css('display', 'block')
                $('.mask').css('display', 'block')

                var dataId = $(this).attr('data-id')

                $(async function () {
                    var item = await $.get('./php/item.php', { "id": dataId }, function (res) {
                        return res
                    }, "json")

                    // console.log(item);

                    // 商品参数选择
                    //颜色选择
                    var colorStr = ''
                    colorStr = selectOption(item.goods_color, '颜色', 'color')
                    //版本选择
                    var optionStr = ''
                    optionStr = selectOption(item.goods_option, '版本', 'option')
                    //network选择
                    var networkStr = ''
                    networkStr = selectOption(item.goods_network, '网络制式', 'network')
                    $('.choose-spec').html(colorStr + optionStr + networkStr)

                    //商品配置信息选择
                    //$('.choose-curr-num').before("<em>"+$(this).html()+"</em>")
                    var colorName
                    var optionName
                    var networkName
                    $('.choose-color').click(function () {
                        $(this).addClass('on').siblings().removeClass('on')
                        colorName = $(this).html()
                        $('#em-1').text(colorName).css("display", "inline")
                    });
                    $('.choose-option').click(function () {
                        $(this).addClass('on').siblings().removeClass('on')
                        optionName = $(this).html()
                        $('#em-2').text(optionName).css("display", "inline")
                    })
                    $('.choose-network').click(function () {
                        $(this).addClass('on').siblings().removeClass('on')
                        networkName = $(this).html()
                        $('#em-3').text(networkName).css("display", "inline")
                    })


                    $('.dialog').click(function (e) {
                        var target = e.target

                        var inputNum = parseInt($('.action-quantity-input').html())
                        if (target.innerHTML == '+') {
                            inputNum++
                            if (inputNum > item.max_num) {
                                inputNum = item.max_num
                            }
                            $('.action-quantity-input').html(inputNum)
                            $('.choose-curr-num').html(inputNum)
                        }
                        if (target.innerHTML == '-') {
                            inputNum--
                            if (inputNum < 1) {
                                inputNum = 1
                            }
                            $('.action-quantity-input').html(inputNum)
                            $('.choose-curr-num').html(inputNum)
                        }

                        if (target.innerHTML == "加入购物车") {
                            // 获取商品规格
                            var em1 = $('#em-1').text().trim()
                            var em2 = $('#em-2').text().trim()
                            var em3 = $('#em-3').text().trim()
                            console.log("em1", em1, em2, em3);

                            //商品中是否含有商品规格选择
                            var lock1 = $('.choose-spec').find('.choose-color')
                            var lock2 = $('.choose-spec').find('.choose-option')
                            var lock3 = $('.choose-spec').find('.choose-network')
                            console.log(lock1, lock2, lock3);

                            if (lock1.length > 0 && em1 == '') {
                                console.log('close1');
                                alert('请先选择完整规格')
                                return
                            }
                            if (lock2.length > 0 && em2 == '') {
                                console.log('close2');
                                alert('请先选择完整规格')
                                return
                            }
                            if (lock3.length > 0 && em3 == '') {
                                console.log('close3');
                                alert('请先选择完整规格')
                                return
                            }
                            

                            //商品规格是否选择完成
                            em1 = em1 == '' ? '默认' : em1
                            em2 = em2 == '' ? '默认' : em2
                            em3 = em3 == '' ? '默认' : em3
                            //获取localStorage中的cartList
                            var cartList = localStorage.getItem("cartList")
                            //判断当前获取的cartList是否存在
                            if (cartList) {
                                //把localStorage中获取的内容转为数组对象
                                cartList = JSON.parse(cartList)
                                //判断当前添加的商品是否在localStorage
                                var a = 0
                                //遍历数组中所有元素
                                cartList.forEach(el => {
                                    if (el.goods_id === item.goods_id && el.em1 === em1 && el.em2 === em2 && el.em3 === em3) {
                                        el.cart_number = el.cart_number + inputNum >= el.max_num ? el.max_num : el.cart_number + inputNum
                                        a++
                                    }
                                })
                                //判断a变量是否等于0
                                if (a === 0) {
                                    //修改商品数量
                                    item.cart_number = inputNum
                                    item.is_select = 0
                                    item.em1 = em1
                                    item.em2 = em2
                                    item.em3 = em3
                                    //把当前对象追加到数组中
                                    cartList.push(item)
                                }
                                //把当前商品添加到localStorage中
                                localStorage.setItem("cartList", JSON.stringify(cartList))

                                cartNumber()

                            } else {
                                item['em1'] = em1
                                item['em2'] = em2
                                item['em3'] = em3
                                item['cart_number'] = inputNum
                                item['is_select'] = 0
                                //把当前商品添加到localStorage中
                                localStorage.setItem('cartList', JSON.stringify([item]))

                                cartNumber()
                            }

                        }
                    })
                })

            })

            $('.good-type').html(decodeURI(id))


        }else{
            location.href="./index.html"
        }

        function cartNumber() {
            //购物车数量刷新
            var cartNum1 = localStorage.getItem('cartList')
            cartNum2 = JSON.parse(cartNum1) || []
            $('.cart-number').html(cartNum2.length)
        }
    });

}


// 商品列表过滤
$('.btn-compete').click(function () {
    $(this).addClass('on').siblings().removeClass('on')
    orderName = ''
    getItemList(id, orderName)
})
$('.btn-sales').click(function () {
    $(this).addClass('on').siblings().removeClass('on')
    orderName = ''
    getItemList(id, orderName)
})
$('.btn-price').click(function () {
    $(this).addClass('on').siblings().removeClass('on')
    orderName = 'goods_price'
    getItemList(id, orderName)
})
$('.btn-time').click(function () {
    $(this).addClass('on').siblings().removeClass('on')
    orderName = 'create_time'
    getItemList(id, orderName)
})

function selectOption(info, dtName, chooseName) {
    var infoStr = ''
    if (info) {
        let newInfo = info.split('/')
        infoStr = `<div class="dt">${dtName}</div><div class="choose-item-wrap">`

        newInfo.forEach(item => {
            infoStr += `<div class="choose-item choose-${chooseName}">${item}</div>`
        })
        infoStr += `</div>`
        return infoStr
    } else {
        return infoStr
    }
}




