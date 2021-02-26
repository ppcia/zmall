$(function () {
    //楼层导航

    //获取不需要导航的头部高度
    var headerH = $('.topbar').outerHeight(true) + $('.nav').outerHeight(true) + $('.header').outerHeight(true);

    var gridHeightArr = [0];
    //设置导航栏高度数组
    function setGridHeightArr() {
        var sum = 0;
        gridHeightArr = [0];

        $("div[data-grid]").each(function () {
            gridHeightArr.push($(this).offset().top);
        });
    };
    setGridHeightArr()

    $(window).scroll(function () {
        var viewh = $(window).scrollTop() - headerH - 400
        if (viewh <= 0) {
            $('.anchor li').removeClass('anchor-cur')
            // $('.anchor').css('display', 'none')
            $('.anchor').fadeOut()
        } else {
            // $('.anchor').css('display', 'block')
            $('.anchor').fadeIn()
        }
        for (var i = 1; i < gridHeightArr.length; i++) {
            if (viewh > gridHeightArr[i - 1] && viewh < gridHeightArr[i]) {
                break;
            }
        }
        $('.anchor li').eq(i - 1).addClass('anchor-cur').siblings().removeClass('anchor-cur')
    })

    $(".anchor li a").click(function () {
        var floor = $(this).data("navli");
        console.log(floor);
        var h = $("div[data-grid=" + floor + "]").offset().top;
        console.log(h);
        $("html,body").animate({
            "scrollTop": h
        }, 300);
    })
})