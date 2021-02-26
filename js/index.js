indexType = ["智能手机", "智能终端"]
indexType.forEach((itype, index) => {
    $(async function () {
        var listItems1 = await $.get('./php/index.php', { "type": itype }, function (res) {
            return res
        }, "json")
        var indexStr1 = ''
        listItems1.forEach(item1 => {
            if(!item1.goods_short){
                item1.goods_short = ''
            }
            let newimg1 = item1.goods_img1.replace('resize,w_220,h_220', 'resize,w_640,h_640')
            let goods_new = item1.is_new == 1?'flex':'none'
            indexStr1 +=
                `
            <li>
                <a href="./item.html?item_id=${item1.goods_id}">
                    <div class="goods-item">
                        <div class="floor-item-pic">
                            <img src="${newimg1}" alt="">
                            <span class="floor-item-tag" style="display:${goods_new}">新品</span>
                        </div>
                    <div class="pro-info">
                        <div class="info-n">
                            ${item1.goods_title}
                        </div>
                        <div class="info-sub">${item1.goods_short}</div>
                        <div class="info-p">￥${item1.goods_price}</div>
                    </div>
                    </div>
                </a>
            </li>
            `
        });

        $('.feature-goods-list').eq(index).html(indexStr1)
    });
})

$(async function(){
    var listItems2 = await $.get('./php/index1.php', function (res) {
        return res
    }, "json")

    var indexStr2=""

    listItems2.forEach(item2=>{
        let newimg2 = item2.goods_img1.replace('resize,w_220,h_220', 'resize,w_640,h_640')
        indexStr2+=
        `
        <div class="goods-content">
            <a href="./item.html?item_id=${item2.goods_id}">
                <div class="goods-pic">
                    <img src="${newimg2}" alt="">
                </div>
                <div class="goods-name">${item2.goods_title}</div>
                <div class="goods-price">￥${item2.goods_price}</div>
            </a>
        </div>
        `
    })
    $('.switchable-content').html(indexStr2)
})

