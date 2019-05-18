<?php
  include 'conn.php';
  $valid = true;
  $message = '';

  if(isset($_POST['send']) && $_POST['send']==1){
         
    // if(isset($_POST['userAvatar']) && $_POST["userAvatar"]!=""){
    //      $userAvatar = $_POST['userAvatar'];
    //      if(preg_match('/^(data:\s*image\/(\w+);base64,)/',$userAvatar,$res)){
    //          //获取一个图片类型
    //          $type = $res[2];
    //         //  图片保存路径
    //         $new_Avatar = '../upload/'.date('Ymd',time()).'/';
    //         // 判断文件是否存在
    //         if(!file_exists($new_Avatar)){
    //             mkdir($new_Avatar,0777,true);
    //         }
    //         // 设置图片名称
    //         $new_Avatar = $new_Avatar.time().'.'.$type;
    //         // 写入
    //         if(file_put_contents($new_Avatar,base64_decode(str_replace($res[1],'',$userAvatar)))){
    //             $message = '头像移入成功';
    //         }else{
    //             $valid = false;
    //             $message = '头像移入失败';
    //         }
    //      }
    // }else{
    //     $valid = false;
    //     $message = '头像不能为空，必须输入';
    // }
    if(isset($_POST['username'])){
      $username = $_POST['username'];
  }else{
      $valid = false;
      $message = '用户名不能为空，必须输入';
  }
  if(isset($_POST['status'])){
    $status = $_POST['status'];
}else{
    $valid = false;
    $message = '身份有误，重新选择';
}

if(isset($_POST['userhead'])){
  $userhead = $_POST['userhead'];
}else{
  $valid = false;
  $message = '头像有误，重新上传';
}
  
    if(isset($_POST['email']) && $_POST['email']!=""){
        $email = $_POST['email'];

            $regexp = "/^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,})$/";

          if(!preg_match($regexp, $email)){
             $message = "邮箱格式不正确";
             $valid   = false;
            }
            
    }else{
        $valid = false;
        $message = '邮箱不能为空，必须输入';
    }
    
	if (isset($_POST['password']) && isset($_POST['password2']) && $_POST['password']!="" && $_POST['password2']!="") {

		$password = $_POST['password'];
		$password2 = $_POST['password2'];

    $regexp2 = "/^(\w){6,11}$/";
    if(!preg_match($regexp2, $password)){
        $message = "只能输入6-11个字母、数字、下划线";
        $valid   = false;
      }

		if ($password != $password2) {
			 $message = "初始密码和确认密码不符合";
			 $valid   = false;
		}else{
			$password = sha1($password);
		}

	}else{
		$message = '密码不能为空';
		$valid   = false;
    }

    if($valid){
         $result = mysqli_query($conn,"SELECT * FROM users WHERE email = '$email'");
         if(mysqli_num_rows($result) == 0){

             $sql = "INSERT INTO users(username,email,password,status,userhead)VALUES('$username','$email','$password','$status','$userhead')";

             if(mysqli_query($conn,$sql)){
                $message = '注册成功';
             }else{
                $valid = false;
                $message = '注册失败'.$sql;
             }

         }else{
            $valid = false;
            $message = '此邮箱已注册!';
         }
    }else{
        $valid = false;
        $message = $message;
    }


  }else{
    $valid=false;
    $message = '接口地址来源非法！';
  }



  echo json_encode(
    array('valid'=>$valid,'message'=>$message),JSON_UNESCAPED_UNICODE
);