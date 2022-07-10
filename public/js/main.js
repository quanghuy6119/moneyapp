$(document).ready(function () {


    /////////////////// Chức năng của Category Transaction ////////////

    /// bật layout modal category
    $('.list-group-item-category').click(function () {
        $('.layout-modal').removeClass('unactive');
    });

    // $('.layout-modal').click(function () {
    //     $('.layout-modal').addClass('unactive');
    // });

    $('.category-exit').click(function () {
        $('.layout-modal').addClass('unactive');
    });


    $(".btn-category").click(function (e) {
        e.preventDefault();
        var formData = new FormData($('.form-icon-trans')[0]);
        //Post to server
        $.ajax({
            type: "POST",
            url: "/api/moneyapp/category",
            processData: false,
            mimeType: "multipart/form-data",
            contentType: false,
            data: formData,
            success: function (response) {
                let result = JSON.parse(response);
                // console.log(result.file);
                $('.row-category').append(
                    `
                    <div class="badge bg-danger col-3 mx-3 my-3">Beverage 
                        <img src="{{ asset('img/alcohol-beer-beverage-drink-mug-pub-svgrepo-com.svg') }}" class="icon-transaction">
                    </div>
                `)
            },
            error: function (e) {
                console.log(e);
            }
        });
    });



});