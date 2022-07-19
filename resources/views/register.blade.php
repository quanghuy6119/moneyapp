<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Money</title>
    {{-- boostrap --}}
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <script defer src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"></script>
    <script src="https://kit.fontawesome.com/1bcd94c135.js" crossorigin="anonymous"></script>

</head>

<body>
    <section class="pt-5 pb-5 mt-0 align-items-center d-flex bg-dark"
        style="min-height: 100vh; background-size: cover; background-image: url(https://images.unsplash.com/photo-1477346611705-65d1883cee1e?ixlib=rb-0.3.5&amp;q=80&amp;fm=jpg&amp;crop=entropy&amp;cs=tinysrgb&amp;w=1920&amp;fit=max&amp;ixid=eyJhcHBfaWQiOjMyMDc0fQ&amp;s=c0d43804e2c7c93143fe8ff65398c8e9);">
        <div class="container-fluid">
            <div class="row  justify-content-center align-items-center d-flex-row text-center h-100">
                <div class="col-12 col-md-4 col-lg-3   h-50 ">
                    <div class="card shadow">
                        <div class="card-body mx-auto">
                            <h4 class="card-title mt-3 text-center">Create Account</h4>
                            <p class="text-center">Get started with your free account</p>
                            <p>
                                <div class="btn btn-block btn-info">
                                    <img src="{{ asset('img/panda-bear-panda-svgrepo-com.svg') }}" height="30px"> Register Money App
                                </div>
                            </p>
                            <form action="/moneyApp/register" method="POST"> 
                                @csrf
                                <div class="form-group input-group my-3">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text"> <i class="fa fa-user"></i> </span>
                                    </div>
                                    <input name="name" class="form-control" placeholder="Full name" type="text" required>
                                </div>
                                <div class="form-group input-group my-3">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text"> <i class="fa fa-envelope"></i> </span>
                                    </div>
                                    <input name="email" class="form-control" placeholder="Email address" type="email" required>
                                </div>
                                <div class="form-group input-group my-3">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text"> <i class="fa fa-lock"></i> </span>
                                    </div>
                                    <input class="form-control" placeholder="Create password" type="password" name="password" required>
                                </div>
                                <div class="form-group input-group my-3">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text"> <i class="fa fa-lock"></i> </span>
                                    </div>
                                    <input class="form-control" placeholder="Repeat password" type="password" name="password_confirmation" required>
                                </div>

                                @error('email')
                                <div class="form-group">
                                    <p style="color: red;font-weight: bold">{{$message}}</p>
                                 </div> 
                                @enderror
                                @error('password')
                                <div class="form-group">
                                    <p style="color: red;font-weight: bold">{{$message}}</p>
                                 </div> 
                                @enderror

                                <div class="form-group">
                                    <button type="submit" class="btn btn-primary btn-block"> Create Account </button>
                                </div>
                                <p class="text-center">Have an account?
                                    <a href="/moneyApp/login">Log In</a>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</body>

</html>
