$(function () {
    var num = 0;
    var q
    function swiper() {
        $('.desc-list li').eq(num).css({ "opacity": "1" }).siblings().css({ "opacity": "0" })
        $('.switchable-nav a').eq(num).addClass('active').siblings().removeClass('active')
        num++
        if (num > 9) {
            num = 0
        }
        console.log(num);
    }
    q = setInterval(swiper, 3000)
    $('#slideFocus').hover(function () {
        clearInterval(q)
    }, function () {
        q = setInterval(swiper, 3000)
    })
    $('.switchable-nav a').click(function () {
        $(this).addClass('active').siblings().removeClass('active')
        var index = $(this).index();
        $('.desc-list li').eq(index).css({ "opacity": "1" }).siblings().css({ "opacity": "0" })
        num = index
    })
})