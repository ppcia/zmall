$(window).scroll(function () {
    // console.log($(window).scrollTop(), $(window).height());
    if ($(window).scrollTop() > $(window).height()) {
        $(".back-to-top").show();
    }
    else {
        $(".back-to-top").hide();
    }
});
$(".back-to-top").click(function () {
    $("body,html").animate({ scrollTop: 0 }, 300);
    return false;
});