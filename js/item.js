//放大镜
function enlarge() {
    var original = $('.show-box')
    var shadowbox = $('.shadow')
    var hidebox = $('.hide-box')
    var bimg = $('.hide-box>img')

    // var hidew = $('.hide-box').offset().left
    // console.log(hidew);

    $('.show-box').mouseover(function (e) {
        var e = e || window.event
        shadowbox.css({ "z-index": "10", "display": "block" })
        hidebox.css({ "display": "block" })
    })
    $('.show-box').mousemove(function (e) {
        var e = e || window.event
        moveImg(e)
    })
    $('.show-box').mouseout(function (e) {
        var e = e || window.event
        shadowbox.css({ "z-index": "-10", "display": "none" })
        hidebox.css({ "display": "none" })
    })

    function moveImg(e) {
        //获取当前光标的移动距离
        var x1 = e.pageX - original.offset().left - parseInt(shadowbox.width() / 2)
        var y1 = e.pageY - original.offset().top - parseInt(shadowbox.height() / 2)

        //设置shadow的边界值
        var minX = 0
        var minY = 0
        var maxX = original.width() - shadowbox.width()     // 210
        var maxY = original.height() - shadowbox.height()   // 210

        //右边图片的移动距离
        var rightboxX = 0
        var rightboxY = 0

        //水平方向的判断，并移动shadow
        if (x1 < minX) {
            // 如果当前光标移动距离小于shadow最小边界
            shadowbox.css("left", `${minX}px`)
            rightboxX = minX
        } else if (x1 > maxX) {
            // 如果当前光标移动距离大于shadow最大边界
            shadowbox.css("left", `${maxX}px`)
            rightboxX = maxX
        } else {
            shadowbox.css("left", `${x1}px`)
            rightboxX = x1
        }

        // 垂直方向的判断
        if (y1 < minY) {
            shadowbox.css("top", `${minY}px`)
            rightboxY = minY
        } else if (y1 > maxY) {
            shadowbox.css("top", `${maxY}px`)
            rightboxY = maxY
        } else {
            shadowbox.css("top", `${y1}px`)
            rightboxY = y1
        }
        // console.log(rightboxX, rightboxY);

        bimg.offset({ left: -2 * rightboxX + 550, top: -2 * rightboxY + 265 })
    }

}

// 获取当前地址栏中的参数信息
var search = location.search
var item
//判断当前search对象是否有值
if (search) {
    var id = search.split('=')[1]

    $(async function () {

        item = await $.get('./php/item.php', { "id": id }, function (res) {
            return res
        }, "json")

        if (item) {
            newBigImg1 = item.goods_img1 == null ? item.goods_img1 = '' : item.goods_img1.replace('resize,w_220,h_220', 'resize,w_640,h_640')
            newBigImg2 = item.goods_img2 == null ? item.goods_img2 = '' : item.goods_img2.replace('resize,w_220,h_220', 'resize,w_640,h_640')
            newBigImg3 = item.goods_img3 == null ? item.goods_img3 = '' : item.goods_img3.replace('resize,w_220,h_220', 'resize,w_640,h_640')
            newBigImg4 = item.goods_img4 == null ? item.goods_img4 = '' : item.goods_img4.replace('resize,w_220,h_220', 'resize,w_640,h_640')
            newBigImg5 = item.goods_img5 == null ? item.goods_img5 = '' : item.goods_img5.replace('resize,w_220,h_220', 'resize,w_640,h_640')

            var bigList = [newBigImg1, newBigImg2, newBigImg3, newBigImg4, newBigImg5]

            //如果短标题为空
            if (!item.goods_short) {
                item.goods_short = ''
            }


            var str =
                `
            <div class="wrap-lg">
                <div class="bread-nav">
                    <a href="./list.html?cart_name=${item.goods_type_one}">${item.goods_type_one}</a>
                    <span>></span>
                    <a href="./list.html?cart_name=${item.goods_type_two}">${item.goods_type_two}</a>
                    <span>></span>
                    <a href="./list.html?cart_name=${item.goods_type_three}">${item.goods_type_three}</a>
                    <span>></span>
                    <a href="./list.html?cart_name=${item.goods_type_four}">${item.goods_type_four}</a>
                    <span>></span>
                    <span>${item.goods_title}</span>
                </div>
            <div class="mod-bottom">
                <div class="row clearfix">
                    <div class="zoom-slider">
                        <div class="pic-show">
                            <div class="show-box">
                                <img src="${newBigImg1}" alt="">
                                <div class="shadow"></div>
                            </div>
                            <div class="hide-box">
                                <img src="${newBigImg1}" alt="">
                            </div>
                        </div>
                        <div class="pic-thumb">
                            <div class="next-group" style="display: block;">
                                <div class="icon-chevron-right"></div>
                            </div>
                            <div class="pre-group" style="display: none;">
                                <i class="icon-chevron-left"></i>
                            </div>
                            <div class="slider-thumb-wrap">
                                <ul class="slider-thumb">
                                    <li class="active">
                                        <img src="${item.goods_img1}" alt="">
                                    </li>
                                    <li>
                                        <img src="${item.goods_img2}" alt="">
                                    </li>
                                    <li>
                                        <img src="${item.goods_img3}" alt="">
                                    </li>
                                    <li>
                                        <img src="${item.goods_img4}" alt="">
                                    </li>
                                    <li>
                                        <img src="${item.goods_img5}" alt="">
                                    </li>
                                    <li>
                                        <img src="${item.goods_img5}" alt="">
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div class="zoom-right">
                        <div class="description-panel">
                            <div class="detail-panel-bd">
                                <form action="" method="POST">
                                    <div class="detail-panel-info">
                                        <div class="detail-panel-hd">
                                            <h1>${item.goods_title}</h1>
                                            <div class="item-sub-title">${item.goods_short}</div>
                                        </div>
                                        <div class="summary-outbox clearfix">
                                            <ul class="summary">
                                                <li class="price-normal">
                                                    <div class="action-price">￥<em>${item.goods_price}</em></div>
                                                </li>
                                                <li class="activity" style="display:${item.goods_discount == 1 ? 'block' : 'none'}">
                                                    <div class="activity-wrap promotions-all-show">
                                                        <div class="dt">优惠信息：</div>
                                                        <div class="dd activity-content">
                                                            <div class="promotion-list ">
                                                                <div class="activity-txt">
                                                                    <span class="label-danger">赠品</span>
                                                                        <a href="./item.html?item_id=46">
                                                                        <img src="https://image.ztemall.com/7c1713ac9e9a2f02d83427ef6241ae10.jpg?x-oss-process=image/resize,w_440,h_440" alt="" title="Nubia红魔战鼓蓝牙音箱[]">
                                                                    </a>
                                                                    
                                                                    x 1&nbsp;&nbsp;（购满1件即赠，赠完为止）                        
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                            </ul>
                                            <div class="goods-qrcode">
                                                <span>手机购买<i class="icon icon-arrow-down-b"></i><i class="icon icon-arrow-up-b"></i></span>
                                                <div class="qrcode"><img src="./images/qrcode.png"></div>
                                            </div>
                                        </div>
                                        <div class="goods-other-info">
                                        </div>
                                        <div class="choose">
                                            <div class="choose-spec clearfix" id="spec_select">
                                                
                                            </div>
                                            <div class="choose-mb choose-remind">
                                                <div class="dt">已选择商品：</div>
                                                <div class="dd r" id="choosed">
                                                    <em id="em-1" style="display:none;"></em>
                                                    <em id="em-2" style="display:none;"></em>
                                                    <em id="em-3" style="display:none;"></em>
                                                    <span class="choose-curr-num">1</span>台
                                                </div>
                                            </div>
                                            <div class="choose-md choose-quantity clearfix">
                                                <div class="dt">数　　量</div>
                                                <div class="dd">
                                                    <div class="buy-number">
                                                        <a href="javascript:void(0);" class="btn btn-reduct">-</a>
                                                        <button type="button" class="action-quantity-input">1</button>
                                                        <a href="javascript:void(0);" class="btn btn-add">+</a>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="btn-wrap">
                                                <a href="./cart.html" class="btn-fastbuy">立即购买</a>
                                                <a href="javascript:;" class="btn-addcart">加入购物车</a>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="mod-bottom">
                <div class="row">
                    <div class="goods-detail-tab">
                        <ul class="switchable-nav">
                            <li class="switch-active">产品介绍</li>
                            <li>规格参数</li>
                            <li id="consult_tab">商品咨询</li>
                            <li id="eval_tab">用户评论(<span>4</span>)</li>
                        </ul>
                        <div class="switchable-content">
                            <div class="switchable-panel" style="display: block;">
                                ${item.goods_detail}
                                <div class="goods-info">
                                    <div class="hd">产品信息</div>
                                    <div class="bd">${item.goods_detail_imgbox}</div>
                                </div>

                            </div>
                            <div class="switchable-panel" style="display: none;">${item.goods_table}</div>
                            <div class="switchable-panel" style="display: none;"></div>
                            <div class="switchable-panel" style="display: none;"></div>                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
            `
            $('.main-item').html(str)

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

            // 选项卡切换
            $('.switchable-nav li').click(function () {
                $(this).addClass('switch-active').siblings().removeClass('switch-active')
                var index = $(this).index();
                $('.switchable-panel').eq(index).css('display', 'block').siblings().css('display', 'none')
            })

            enlarge()

            //图片切换
            $('.slider-thumb li').click(function () {
                $(this).addClass('active').siblings().removeClass('active')
                var index = $(this).index();
                $('.show-box img').attr('src', bigList[index])
                $('.hide-box img').attr('src', bigList[index])
            })

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

            $('.main-item').click(function (e) {
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
                        alert('请先选择完整规格')
                        return
                    }
                    if (lock2.length > 0 && em2 == '') {
                        alert('请先选择完整规格')
                        return
                    }
                    if (lock3.length > 0 && em3 == '') {
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
                                el.cart_number = el.cart_number + inputNum >= item.max_num ? item.max_num : el.cart_number + inputNum
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
            });

        } else {
            var str3 = `
            <div class="empty-cart">
                <div class="offset-lg-2">
                    <p class="empty-cart-text" style="color:red;">
                    很抱歉，您查看的宝贝不存在，可能已下架或者被转移，，<a href="./index.html">去首页</a>挑选喜欢的商品
                    </p>
                </div>
            </div>
            `
            $('.main-item').html(str3)
        }

    })
} else {
    location = './list.html'
}


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
function cartNumber() {
    //购物车数量刷新
    var cartNum1 = localStorage.getItem('cartList')
    cartNum2 = JSON.parse(cartNum1) || []
    $('.cart-number').html(cartNum2.length)
}

