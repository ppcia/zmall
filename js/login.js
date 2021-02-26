//获取地址栏中的参数
var search=location.search

$('.btn-login').click(function(){
    var username = $('.input-account').val()
    var password = $('.input-pass').val()
    console.log(username,password);

    $.ajax({
        url: './php/login.php',
        type: 'GET',
        data: `username=${username}&password=${password}`,
        success:function(res){
            //判断当前返回值是否等于1
            console.log(res);
            if(res==1){
                //判断当前地址栏是否有参数
                if(search){
                    //获取参数中传入的地址
                    var new_url=search.split('=')[1]
                    location.href=new_url
                }else{
                    location.href="./list.html"
                }
                setCookie("user",username)
                return true
            }else{
                alert('登录失败')
            }
        }
    })
    return false
})