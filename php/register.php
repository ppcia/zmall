<?php
header("content-type:text/html;charset=utf-8");
//获取传入的参数
$username=$_POST['username'];
$password=$_POST['password'];
//连接数据库
$link=mysqli_connect("localhost",'root','','zet');
//设置编码
mysqli_set_charset($link,"utf8");
//SQL语句
// $sql="insert into user (username, password) values('$username', $password')";
$sql= "INSERT INTO user ".
        "(username, password)".
        "VALUES ".
        "('$username','$password')";
//执行SQL语句，并返回结果集
$result=mysqli_query($link,$sql);
//判断是否添加成功
if($result){
    echo "成功";
}else{
    echo "失败";
}
//关闭连接
mysqli_close($link);
?>