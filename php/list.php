<?php
header("content-type:text/html;charset=utf-8");
//连接数据库
$link=mysqli_connect("localhost",'root','','zet');
//设置编码
mysqli_set_charset($link,"utf8");

$type=$_GET['type'];
$orderName=$_GET['orderName'];
$newType = urldecode($type);
$newOrderName = urldecode($orderName);
//SQL语句
if(empty($newOrderName)){
    $sql="select * from goods where ".
    "goods_type_one='$newType' ".
    "OR ".
    "goods_type_two='$newType' ".
    "OR ".
    "goods_type_three='$newType' ".
    "OR ".
    "goods_type_four='$newType' ".
    "OR ".
    "goods_title LIKE '%$newType%'";
}else{
    $sql="select * from goods where ".
    "goods_type_one='$newType' ".
    "OR ".
    "goods_type_two='$newType' ".
    "OR ".
    "goods_type_three='$newType' ".
    "OR ".
    "goods_type_four='$newType' ".
    "OR ".
    "goods_title LIKE '%$newType%' ".
    "ORDER BY $newOrderName DESC";
}

//执行SQL语句，并返回结果集
$result=mysqli_query($link,$sql);
//创建存储所有数据的数组
$arr=[];
//遍历结果集
while($row=mysqli_fetch_assoc($result)){
    //把遍历出来的数据追加到数组中
    array_push($arr,$row);
}
//把当前数组转为字符串，并响应给浏览器
echo json_encode($arr);
//关闭连接
mysqli_close($link);
?>