<?php
header("content-type:text/html;charset=utf-8"); //声明文件的编码格式，采用utf8
header("Access-Control-Allow-Origin:*");    //指定允许其他域名访问
header("Access-Control-Allow-Methods:GET"); //响应类型
header("Access-Control0-Allow-Headers:x-requested-width,content-type");
header("Access-Control-Allow-Credentials:true");
//该字段可选。它的值是一个布尔值，表示是否允许发送Cookie。默认情况下，
//Cookie不包括在CORS请求之中。设为true，即表示服务器明确许可，Cookie可以包含在请求中，
//一起发送给服务器。这个值也只能设为true，如果服务器不要浏览器发送Cookie，删除字段即可。
date_default_timezone_set('Asia/Shanghai');
//设置当前时区为中国上海时区

ini_set('display_errors','On');
error_reporting(E_ALL);
//error_reporting = E_ALL & ~E_NOTICE
    //报错机制

/**
 * 0107基础配置文件。
 * MySQL设置
 * 密钥
 * 数据库表名前缀
 * ABSPATH
 * DATETIME
 * DATE
 */

 // ** MySQL设置-具体信息来自您正在使用的主机 **//
 /**0107数据库名称 */
 define('DB_NAME','myblog');

 /**MySQL数据库用户名 */
 define('DB_USER','root');

 /**MySQL数据库密码 */
 define('DB_PASSWORD','Sd5l9PSeWkmO');

 /**MySQL主机 */
 define('DB_HOST','localhost');

 /**创建数据表时默认的文字编码 */
 define('DB_CHARSET','utf8mb4');

 /**0107目录的绝对路径。 */
 if(!defined('ABSPATH')){
     define('ABSPATH',dirname(__FILE__) . '/');
 }

 define('DATETIME',date("Y-m-d H:i:s"));
 define('DATE',date("Y-m-d"));
 
global $conn;
$conn = new mysqli(DB_HOST,DB_USER,DB_PASSWORD,DB_NAME);
mysqli_query($conn,"set character set utf8");
mysqli_query($conn,"set names utf8");
if($conn->connect_error){
    die('数据库连接失败' . $conn->connect_error);
}else{
    if(isset($_GET['ok'])){
        echo json_encode(
            array('vaild'=>true,'success'=>'数据库连接成功'),JSON_UNESCAPED_UNICODE
        );
    }
}