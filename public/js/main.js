$(document).ready(function() {


    /////////////////// Chức năng của Category Transaction ////////////

    /// bật layout modal category
    $('.list-group-item-category').click(function() {
        $.ajax({
            type: "GET",
            url: "/api/moneyapp/category",
            processData: false,
            mimeType: "multipart/form-data",
            contentType: false,
            success: function(response) {
                let result = JSON.parse(response);
                for (let i = 0; i < result.length; i++) {
                    $('.row-category').append(
                        `
                        <div class="badge badge-category bg-danger col-3 mx-3 my-3">${result[i].name}
                            <img src="${window.location.origin}/${result[i].symbol}" class="icon-transaction">
                        </div>
                    `)
                }
            },
            error: function(e) {
                console.log(e);
            }
        });
        // hiển thị layout modal
        $('.layout-modal').removeClass('unactive');
    });


    /// xóa layout modal
    // $('.layout-modal').click(function () {
    //     $('.layout-modal').addClass('unactive');
    // });

    $('.category-exit').click(function() {
        $('.badge-category').remove();
        $('.layout-modal').addClass('unactive');
    });


    // thêm category
    $(".btn-category").click(function(e) {
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
            success: function(response) {
                let result = JSON.parse(response);
                // console.log(result);
                $('.row-category').append(
                    `
                    <div class="badge badge-category bg-danger col-3 mx-3 my-3">${result.title}
                        <img src="${window.location.origin}/${result.path}" class="icon-transaction">
                    </div>
                `);
                //reset
                $('input[name="file"]').val("");
                $('input[name="title"]').val("");
            },
            error: function(e) {
                console.log(e);
            }
        });
    });



});