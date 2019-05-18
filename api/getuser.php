<?php
    include_once "conn.php";
    $msg = '';

    $sql = 'SELECT * FROM users';
    $result = mysqli_query($conn,$sql);
    $msg = mysqli_fetch_all($result,MYSQLI_ASSOC);


    echo json_encode(
        array('users'=>$msg),JSON_UNESCAPED_UNICODE
    );