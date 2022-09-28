$(document).ready(function() {
    $('.input-daterange').datepicker({
        format: 'dd-mm-yyyy',
        todayHighlight: true,
    });

    // mở calender box
    $('.search-calendar').click(function() {
        $('#load').toggle("inactive");
        $('.layout-modal').removeClass('inactive');
        $('.box-modal-calendar').removeClass('inactive');
        $('#load').toggle("inactive");
    });

    //tắt calender box
    $('.calendar-exit').click(function() {
        // TẮT LAYOUT
        $('.layout-modal').addClass('inactive');
        $('.box-modal-calendar').addClass('inactive');
        $('.input-calendar').val("");
    });

    // search thẻ calendar box
    var count = 0;
    $('.btn-date').click(function(e) {
        $('.transactions-wallet-details').remove();
        if ($('.default-wallet').val() == "") {
            alert("Please choose your wallet");
        } else {
            if (count == 0) {
                count = 1;
                delWalletLayouts();
                delTransactionLayouts();
                addTransactionLayouts();
                if ($('.default-wallet').val() == "") {
                    alert("Please choose your wallet");
                }
                searchByCalendar();
                count = 0;
            }
        }
    });
});

// add table display detail wallet
function addCardDateDetailWalletLayouts() {
    $('.row-transactions-layouts').append(`    
    <div class="card mask-custom">
        <div class="card-body p-4 text-white">
            <div class="text-center pt-3 pb-2">
                <h2 class="my-4">Wallet Transaction Details</h2>
                <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-todo-list/check1.webp"  width="60">
            </div>

            <table class="table text-white mb-0">
                <thead>
                    <tr>
                        <th scope="col">Day</th>
                        <th scope="col">Money Cash</th>
                        <th scope="col">Transaction</th>
                        <th scope="col">Description</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody class="transactions-wallet-details">
                </tbody>
            </table>
        </div>
    </div>
    `)
}


function searchByCalendar() {
    addCardDateDetailWalletLayouts();
    var formData = new FormData($('.calendarForm')[0]);
    id = $('.default-wallet').val();
    //Post to server
    $.ajax({
        type: "POST",
        url: `/api/moneyApp/searchByCalendar/${id}`,
        processData: false,
        mimeType: "multipart/form-data",
        contentType: false,
        data: formData,
        success: function(response) {
            let result = JSON.parse(response);
            console.log(result);
            result = result[0];
            for (let i = 0; i < result.length; i++) {

                $('.transactions-wallet-details').append(`
                <tr class="fw-normal${i}">
                    <td class="align-middle">
                         <h6 class="mb-0"><span class="badge bg-info">${result[i].day_spending}</span></h6>
                    </td>
                </tr>    
                `);

                if (result[i].type_trans == 1 || result[i].type_trans == 3) {
                    $(`.fw-normal${i}`).append(`
                    <td class="align-middle">
                        <h6 class="mb-0">
                            <span class="badge" style="background-color:#fb2e2e"> 
                                -  <i class="fas fa-dollar-sign"></i>${formatCash(result[i].amount)}<span style="margin-left: 5px">VND</span>
                            </span>
                        </h6>
                    </td>
                    `);
                } else {
                    $(`.fw-normal${i}`).append(`
                    <td class="align-middle">
                        <h6 class="mb-0">
                            <span class="badge" style="background-color:#3da13d"> 
                                + <i class="fas fa-dollar-sign"></i>${formatCash(result[i].amount)}<span style="margin-left: 5px">VND</span>
                            </span>
                        </h6>
                    </td>
                    `);
                };

                $(`.fw-normal${i}`).append(`
                <td class="align-middle">
                    <h6 class="mb-0"><span class="badge">
                        <img src="${window.location.origin}/${result[i].symbol}" class="icon-transaction"></span>
                        ${result[i].name}
                    </h6>
                </td>

                 <td class="align-middle">
                    <div class="details-description">${result[i].description}</div>
                </td>
    
                <td class="align-middle">
                    <a data-mdb-toggle="tooltip" title="Remove"><i
                        class="fas fa-trash-alt fa-lg text-warning delete-wallet delete-wallet-details-${result[i].id}"></i></a>
                </td>
            `);
            }
            deleteWalletDetails(id);
        },
        error: function(e) {
            console.log(e);
        }
    })
}

function deleteWalletDetails(id) {
    axios.get(`/api/moneyApp/idWalletDetails/${id}`).then(response => {
        let result = response.data;
        // console.log(result);
        for (let i = 0; i < result.length; i++) {
            $(`.delete-wallet-details-${result[i].id}`).click(function() {
                if (confirm("Do you want delete") == true) {
                    axios.delete(`/api/moneyApp/walletDetails/${result[i].id}`)
                        .then(response => {
                            let result = response.data;
                            // gắn money update
                            $('.total-budget').text(formatCash(result[0]));
                            //reset transaction layouts
                            delTransactionLayouts();
                            addTransactionLayouts();
                            getWalletDetails(id);
                        })
                        .catch(function(error) {
                            console.log(error);
                        });
                }
            });
        }
    });
};