$(document).ready(function() {

    /////////////////// Chức năng của Category Transaction ////////////

    /// bật layout modal category

    $('.list-group-item-category').click(function() {
        $('#load').toggle("inactive");

        const getCategory = async() => {
            await $.ajax({
                type: "GET",
                url: "/api/moneyApp/category",
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
            await $('#load').toggle("inactive");
            await $('.layout-modal').removeClass('inactive');
            await $('.box-modal-category').removeClass('inactive');
        };
        getCategory();
    });


    /// xóa layout modal
    // $('.layout-modal').click(function () {
    //     $('.layout-modal').addClass('inactive');
    // });

    $('.category-exit').click(function() {
        $('.badge-category').remove();
        $('.layout-modal').addClass('inactive');
        $('.box-modal-category').addClass('inactive');
        $('input[name="file"]').val("");
        $('input[name="title"]').val("");
    });


    // thêm category
    $(".btn-category").click(function(e) {
        e.preventDefault();
        var formData = new FormData($('.form-icon-trans')[0]);
        //Post to server
        $.ajax({
            type: "POST",
            url: "/api/moneyApp/category",
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