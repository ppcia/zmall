var cartNum1 = localStorage.getItem('cartList')
cartNum2=JSON.parse(cartNum1)||[]
$('.cart-number').html(cartNum2.length)
