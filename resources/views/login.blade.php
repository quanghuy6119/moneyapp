<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Money</title>
    <link rel="stylesheet" href="{{ asset('css/login.css') }}">
</head>
<body>
    <div class="loginBox"> <img class="user" src="https://img.freepik.com/free-vector/cute-panda-with-bamboo_138676-3053.jpg?t=st=1657874937~exp=1657875537~hmac=22555d6de46d3e119f3c0c61b7325de470da36a687993fa77d0d03be9d065971&w=740" height="100px" width="100px">
        <h3>Sign in here</h3>
        <form action="login.php" method="post">
            <div class="inputBox"> <input id="uname" type="text" name="Username" placeholder="Username"> <input id="pass" type="password" name="Password" placeholder="Password"> </div> <input type="submit" name="" value="Login">
        </form> 
        <a href="#">Forget Password<br> </a>
        <div class="text-center">
            <p style="color: #59238F;">Sign-Up</p>
        </div>
        
    </div>
</body>
</html>
