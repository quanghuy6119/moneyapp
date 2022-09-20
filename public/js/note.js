$(function () {
    function removeNote() {
        $(".remove-note-social").off('click').on('click', function (event) {
            if (confirm("Do you want delete") == true) {
                event.stopPropagation();
                let $id = $(this).parents('.single-note-item').attr('value');
                axios.delete(`/api/moneyApp/note/${$id}`)
                .then(response => {
                    let result = response.data;
                    console.log(result);
                })
                .catch(function (error) {
                    console.log(error);
                });
                $(this).parents('.single-note-item').remove();
            }
        })

        $(".remove-note-business").off('click').on('click', function (event) {
            if (confirm("Do you want delete") == true) {
                event.stopPropagation();
                let $id = $(this).parents('.single-note-item').attr('value');
                axios.delete(`/api/moneyApp//walletDetails/note/${$id}`)
                .then(response => {
                    let result = response.data;
                    console.log(result);
                })
                .catch(function (error) {
                    console.log(error);
                });
                $(this).parents('.single-note-item').remove();
            }
        })
    }

    function favouriteNote() {
        $(".favourite-note").off('click').on('click', function (event) {
            event.stopPropagation();
            $(this).parents('.single-note-item').toggleClass('note-favourite');
        })
    }

    function addLabelGroups() {
        $('.category-selector .badge-group-item').off('click').on('click', function (event) {
            event.preventDefault();
            /* Act on the event */
            var getclass = this.className;
            var getSplitclass = getclass.split(' ')[0];
            if ($(this).hasClass('badge-business')) {
                $(this).parents('.single-note-item').removeClass('note-social');
                $(this).parents('.single-note-item').removeClass('note-important');
                $(this).parents('.single-note-item').toggleClass(getSplitclass);
            } else if ($(this).hasClass('badge-social')) {
                $(this).parents('.single-note-item').removeClass('note-business');
                $(this).parents('.single-note-item').removeClass('note-important');
                $(this).parents('.single-note-item').toggleClass(getSplitclass);
            }
        });
    }

    var $btns = $('.note-link').click(function () {
        if (this.id == 'all-category') {
            var $el = $('.' + this.id).fadeIn();
            $('#note-full-container > div').not($el).hide();
        } if (this.id == 'important') {
            var $el = $('.' + this.id).fadeIn();
            $('#note-full-container > div').not($el).hide();
        } else {
            var $el = $('.' + this.id).fadeIn();
            $('#note-full-container > div').not($el).hide();
        }
        $btns.removeClass('active');
        $(this).addClass('active');
    })

    $('#add-notes').on('click', function (event) {
        $('#addnotesmodal').modal('show');
        $('#btn-n-save').hide();
        $('#btn-n-add').show();
    })

    $('.close-modal-note').on('click', function () {
        $('#addnotesmodal').modal('hide');
    })

    // Button add
    $("#btn-n-add").on('click', function (event) {
        event.preventDefault();
        /* Act on the event */
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth()); //January is 0!
        var yyyy = today.getFullYear();
        var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        today = dd + ' ' + monthNames[mm] + ' ' + yyyy;

        var $_noteTitle = document.getElementById('note-has-title').value;
        var $_noteDescription = document.getElementById('note-has-description').value;

        $html = '<div class="col-md-4 single-note-item all-category"><div class="card card-note card-body">' +
            '<span class="side-stick"></span>' +
            '<h5 class="note-title text-truncate w-75 mb-0" data-noteHeading="' + $_noteTitle + '">' + $_noteTitle + '<i class="point fa fa-circle ml-1 font-10 mx-1"></i></h5>' +
            '<p class="note-date font-12 text-muted">' + today + '</p>' +
            '<div class="note-content">' +
            '<p class="note-inner-content text-muted" data-noteContent="' + $_noteDescription + '">' + $_noteDescription + '</p>' +
            '</div>' +
            '<div class="d-flex align-items-center">' +
            '<span class="me-1"><i class="fa fa-star favourite-note"></i></span>' +
            '<span class="me-1"><i class="fa fa-trash remove-note"></i></span>' +
            '</div>' +
            '</div></div> ';

        $("#note-full-container").prepend($html);
        $('#addnotesmodal').modal('hide');
        removeNote();
        favouriteNote();
        addLabelGroups();
        createNote();
    });

    $('#addnotesmodal').on('hidden.bs.modal', function (event) {
        event.preventDefault();
        document.getElementById('note-has-title').value = '';
        document.getElementById('note-has-description').value = '';
    })

    removeNote();
    favouriteNote();
    addLabelGroups();

    $('#btn-n-add').attr('disabled', 'disabled');

    $('#note-has-title').keyup(function () {
        var empty = false;
        $('#note-has-title').each(function () {
            if ($(this).val() == '') {
                empty = true;
            }
        });

        if (empty) {
            $('#btn-n-add').attr('disabled', 'disabled');
        } else {
            $('#btn-n-add').removeAttr('disabled');
        }
    });
});

function createNote() {
    var formData = new FormData($('#addnotesmodalTitle')[0]);
    //Post to server
    $.ajax({
        type: "POST",
        url: "/api/moneyApp/note",
        processData: false,
        mimeType: "multipart/form-data",
        contentType: false,
        data: formData,
        success: function (response) {
            let result = JSON.parse(response);
            console.log(result);
        },
        error: function (e) {
            console.log(e);
        }
    });
}