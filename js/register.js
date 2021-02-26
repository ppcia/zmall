$(function(){
    $('#for_license').click(function(){
        if($('#for_license').is(":checked")){
            $('#register-btn').attr("disabled",false)
            $('#register-btn').find('span').eq(0).css('background','#ca151d')
            // css({'background':'#ca151d'})
        }else{
            // console.log(222);
            $('#register-btn').attr("disabled",true)
            $('#register-btn').find('span').eq(0).css({'background':'#ccc'})
        }
    });
    var account = false
    
    //验证账号
    $('.action-account-check').blur(function(){
        let accountVal = $(this).val()
        let reg=/^[0-9A-Za-z]\w{5,11}$/
        if(reg.test(accountVal)){
            $('.error1').css({"display":"none"})
            account=true
        }else{
            $('.error1').css({"display":"block"})
            $(this).focus()
            account=false
        }
    });
    var pwd1 = false
    //验证密码
    $('.action-password-check').blur(function(){
        let passwordVal = $(this).val()
        let reg=/^\w{6,16}$/
        if(reg.test(passwordVal)){
            $('.error2').css({"display":"none"})
            pwd1=true
        }else{
            $('.error2').css({"display":"block"})
            $(this).focus()
            pwd1=false
        }
    })
    var pwd2 = false
    //验证密码
    $('.confirm-password-check').blur(function(){
        let comfirmpass = $(this).val()
        let pass = $('.action-password-check').val()
        if(comfirmpass==pass){
            $('.error3').css({"display":"none"})
            pwd2=true
        }else{
            $('.error3').css({"display":"block"})
            $(this).focus()
            pwd2=false
        }
    })
    //注册
    $('#register-btn').click(function(){
        if(account && pwd1 && pwd2){
            var username = $('.action-account-check').val()
            var password = $('.action-password-check').val()
            // console.log(username,password);
            $.ajax({
                url: './php/register.php',
                type: 'POST',
                data: `username=${username}&password=${password}`,
                success:function(res){
                    if(res=='成功'){
                        alert('注册成功')
                        location='./login.html'
                        return true
                    }else{
                        return false
                    }
                }
            })
            $('.action-account-check').val('')
            $('.action-password-check').val('')
            $('.confirm-password-check').val('')
        }else{
            $('.action-account-check').blur()
            $('.action-password-check').blur()
            $('.confirm-password-check').blur()
            return false
        }
        
    });
})