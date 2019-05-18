<?php
include_once dirname(__FILE__).'/conn.php';

$valid = true;
$msg = '';
/**从前端接收一个json字符加串
 * 比如：{'email':"1721152358",'password',"123456",'send':"true"}
*/
if(isset($_POST['Login'])){
    $login = json_decode($_POST['Login'],true);
    if($login['send']===true){
        if(isset($login['email']) && $login['email']!=""){
            $email = $login['email'];
        }else{
            $valid = false;
            $msg = '必须输入用户名或邮箱';
        }

        if(isset($login['password']) && $login['password']!=""){
            $password = sha1($login['password']);
        }else{
            $valid = false;
            $msg = '您没有输入密码';
        }

        if($valid){
                $sql = "SELECT * FROM users WHERE email = '$email' && `password` = '$password'";
                $result = mysqli_query($conn,$sql);
                $row = $result->fetch_assoc();
                if(mysqli_num_rows($result)===1){
                    $expire = time()+60*60*24*7;
                    setcookie('email',$row['email'],$expire,'/');
                    setcookie('status',$row['status'],$expire,'/');
                    $msg = '登陆成功';
                }else{
                    $valid = false;
                    $msg = '没有您的用户信息';
                } 
        }else{
            $valid = false;
            $msg = '帐号或密码不正确';
        }
    }else{
        $valid = false;
        $msg = '接口来源非法，请不要直接打开本地址';
    }
}else{
    $valid = false;
    $msg = 'json字段不能为空';
}

echo json_encode(array('valid'=>$valid,'msg'=>$msg),JSON_UNESCAPED_UNICODE);
?>