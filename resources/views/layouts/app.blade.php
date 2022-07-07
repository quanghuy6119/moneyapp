<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <script defer src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"></script>
    <script src="https://kit.fontawesome.com/1bcd94c135.js" crossorigin="anonymous"></script>
    <script src="https://code.jquery.com/jquery-latest.js"></script>                                
    <link rel="stylesheet" href="{{ asset('css/dashboard.css') }}">
    <script src="{{ asset('js/main.js') }}"></script>
</head>

<body>
    <div class="container-fluid">
        <div class="row">
            <div class="col-1" style="padding: 0;">
                <div class="list-dashboard">
                    <div style="overflow: hidden;">
                        <img src="https://contra.com/contra-homepage-2022-static/images/money.png" height="85"
                            width="112">
                    </div>
                    <ul class="list-group">
                        <li class="list-group-item"><i class="fas fa-wallet"></i>
                            <div>Wallet</div>
                        </li>
                        <li class="list-group-item"><i class="fas fa-comments-dollar"></i>
                            <div>Transaction</div>
                        </li>
                        <li class="list-group-item"><i class="fas fa-coins"></i>
                            <div>Budget</div>
                        </li>
                        <li class="list-group-item"><i class="fas fa-chart-line"></i>
                            <div>Report</div>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="col-11" style="padding: 0;">
                <div class="navbar-dashboard">
                    <div class="d-flex justify-content-between">
                        <div class="total">
                            <div class="total-img"><img
                                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZn_zlFrzxpBK0G0TYS2ZiY-_LCwUwC8wvEuwgWMhGgEtgHZtUDDB9WRlYfo35Fv1LJv8&usqp=CAU"
                                    class="rounded-circle" height="50" width="50"></div>
                            <div class="total-wallet">
                                <div class="total-down">Wallet <i class="fas fa-caret-down"></i></div>
                                <div class="total-budget">+1.000.000</div>
                            </div>
                            <div style="display: none;">
                                <div class="form-check">
                                    <input type="checkbox" class="form-check-input" id="check1" name="option1"
                                        value="something" checked>
                                    <label class="form-check-label" for="check1">Option 1</label>
                                </div>
                                <div class="form-check">
                                    <input type="checkbox" class="form-check-input" id="check2" name="option2"
                                        value="something">
                                    <label class="form-check-label" for="check2">Option 2</label>
                                </div>
                                <div class="form-check">
                                    <input type="checkbox" class="form-check-input" disabled>
                                    <label class="form-check-label">Option 3</label>
                                </div>
                            </div>
                        </div>
                        <ul class="list-group list-group-horizontal">
                            <li class="list-group-item"><i class="fas fa-calendar"></i>
                                <div>Day</div>
                            </li>
                            <li class="list-group-item list-group-item-category"><i class="fas fa-cat"></i>
                                <div>Category</div>
                            </li>
                            <li class="list-group-item"><i class="fas fa-search-dollar"></i>
                                <div>Search</div>
                            </li>
                            <li class="list-group-item"><button type="button" class="btn btn-success">Add
                                    transation</button>
                            </li>
                        </ul>
                    </div>
                </div>
                @yield('content')
            </div>
        </div>
    </div>



    <div class="layout-modal unactive">
        <div class="box-modal">
            <div class="item-category container-fluid">
                <div class="category-header">
                    <div class="category-title">Category <img src="{{ asset('img/activity-svgrepo-com.svg') }}">
                    </div>
                </div>
                <div class="category-exit"><i class="fas fa-times-circle"></i></div>
            </div>
            <div class="row row-category" style="width:100%;margin-left:12px">
                <div class="badge bg-danger col-3 mx-3 my-3">Beverage <img
                        src="{{ asset('img/alcohol-beer-beverage-drink-mug-pub-svgrepo-com.svg') }}"
                        class="icon-transaction">
                </div>
            </div>
            <form method="POST" enctype="multipart/form-data" class="form-icon-trans">
                @csrf
                <div class="row">
                    <div class="form-outline control-group col-5 mb-3">
                        <input type="file" class="form-control form-control-sm" name="file"
                            style="background-color: rgb(54, 230, 243)">
                    </div>
                    <div class="form-outline control-group col-3 mb-4">
                        <input type="text" class="form-control form-control-sm" name="title"
                            style="width: 100px">
                    </div>
                    <div class="form-outline control-group col-2">
                        <input type="submit" class="btn btn-primary btn-category" style="height: 31px">
                    </div>
                </div>
            </form>
        </div>
    </div>
</body>

</html>
