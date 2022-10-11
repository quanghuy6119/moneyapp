$(document).ready(function () {
    if (window.location.hash == '' || window.location.hash == '#wallet') {
        delTransactionLayouts();
        delNoteLayouts();
        delChartLayouts();
        delBudgetLayouts();
        addWalletLayouts();
        getWallets('/wallet');
    } else if (window.location.hash == '#transaction') {
        delWalletLayouts();
        delNoteLayouts();
        delChartLayouts();
        delBudgetLayouts();
        addTransactionLayouts();
        if (isExistWalletDefault() == true) {
            let id_default = $('.default-wallet').val();
            getWalletDetails(id_default);
        }
    } else if (window.location.hash == '#note') {
        delWalletLayouts();
        delTransactionLayouts();
        delChartLayouts();
        delBudgetLayouts();
        addNoteLayouts();
        getNotes();
    } else if (window.location.hash == '#calendar') {
        delWalletLayouts();
        delNoteLayouts();
        delChartLayouts();
        delBudgetLayouts();
        delTransactionLayouts();
        addTransactionLayouts();
        dellPagination();
    } else if (window.location.hash == '#report') {
        delWalletLayouts();
        delTransactionLayouts();
        delNoteLayouts();
        delBudgetLayouts();
        addChartLayouts();
    } else if (window.location.hash == '#budget') {
        delWalletLayouts();
        delTransactionLayouts();
        delNoteLayouts();
        delChartLayouts();
        addBudgetLayouts();
    }
    else {
        delWalletLayouts();
        delTransactionLayouts();
        delNoteLayouts();
        delChartLayouts();
        delBudgetLayouts();
    };

    jQuery(window).on("hashchange", function () {
        var router = window.location.hash.trim();
        var url;
        if (router == '') {
            url = '/wallet';
        } else {
            url = '/' + router.slice(1, router.length);
        }

        if (url == '/wallet') {
            delTransactionLayouts();
            delNoteLayouts();
            delChartLayouts();
            delBudgetLayouts();
            addWalletLayouts();
            getWallets(url);
        } else if (url == '/transaction') {
            $('.container-transaction-layouts').remove();
            delWalletLayouts();
            delNoteLayouts();
            delChartLayouts();
            delBudgetLayouts();
            addTransactionLayouts();
            if (isExistWalletDefault() == true) {
                let id_default = $('.default-wallet').val();
                getWalletDetails(id_default);
            }
        } else if (url == '/note') {
            delWalletLayouts();
            delTransactionLayouts();
            delChartLayouts();
            delBudgetLayouts();
            addNoteLayouts();
            getNotes()
        } else if (url == '/calendar') {
            // thực hiện bên calendar js
            dellPagination();
            delNoteLayouts();
            delChartLayouts();
            delBudgetLayouts();
        } else if (url == '/report') {
            delWalletLayouts();
            delTransactionLayouts();
            delNoteLayouts();
            delBudgetLayouts();
            addChartLayouts();
        } else if (url == '/budget') {
            delWalletLayouts();
            delTransactionLayouts();
            delNoteLayouts();
            delChartLayouts();
            addBudgetLayouts();
        } else {
            delWalletLayouts();
            delTransactionLayouts();
            delNoteLayouts();
            delChartLayouts();
            delBudgetLayouts();
        };
    });

    ////// thẻ default wallet
    var checkWalletDefault = 0;
    $('.total-down').click(async function (e) {
        if (checkWalletDefault == 0) {
            checkWalletDefault = 1;
            $('.layout-modal').removeClass('inactive');
            $('#load').toggleClass("inactive");
            await getWalletDefault();
            checkWalletDefault = 0;
        }
    });

    /// tắt default wallet 
    $('.wallet-default-exit').click(function () {
        $('.badge-wallet').remove();
        $('.wallet-default-script').remove();
        $('.box-modal-wallet-default').addClass('inactive');
        $('.layout-modal').addClass('inactive');
    });

    /// mở
    $('.menu-toggle').click(function () {
        $('.list-dashboard').css('display', 'block');
    })

    $('.exit-list-sidebar').click(function () {
        $('.list-dashboard').css('display', 'none');
    })
});


//add row wallet
function addWalletLayouts() {
    $('.wallet-layouts').append(`    
    <div class="container h-100 container-wallet-layouts">
        <div class="row d-flex justify-content-center align-items-center">
            <div class="col-md-12 col-xl-12 row-layouts-wallet">   
            </div>
        </div>
    </div>`)
    $('.wallet-layouts').removeClass('inactive');
}

//add Transaction wallet
function addTransactionLayouts() {
    $('.transaction-layouts').append(`    
    <div class="container h-100 container-transaction-layouts">
        <div class="row d-flex justify-content-center">
            <div class="col-md-12 col-xl-10 mt-5 row-transactions-layouts">
            </div>
        </div>
    </div>`)
    $('.transaction-layouts').removeClass('inactive');
}

//add row wallet
function addChartLayouts() {
    $('.chart-layouts').append(`
    <div class="container-chart" style="width=80%;margin-left:100px">
        <canvas id="myChart" width="400" height="400"></canvas>
    </div>    
    `);
    $('.chart-layouts').removeClass('inactive');
}

//add row wallet
function addBudgetLayouts() {
    $('.budget-layouts').append(`
    <div class="container-budget" style="width=80%; height: 50%; margin-left:100px">
    <canvas id="myBudget" width="1000" height="1000"></canvas>
    </div>    
    `);
    $('.budget-layouts').removeClass('inactive');
}

//add Note
function addNoteLayouts() {
    $('.note-background').append(`  
    <div class="page-content container container-note-layouts note-has-grid">
        <ul class="nav nav-pills p-3 bg-white mb-3 rounded-pill align-items-center">
            <li class="nav-item">
                <a href="javascript:void(0)"
                    class="nav-link rounded-pill note-link d-flex align-items-center px-2 px-md-3 me-0 me-md-2 active"
                    id="all-category">
                    <i class="icon-layers me-1"></i><span class="d-none d-md-block">All Notes</span>
                </a>
            </li>
            <li class="nav-item">
                <a href="javascript:void(0)"
                    class="nav-link rounded-pill note-link d-flex align-items-center px-2 px-md-3 me-0 me-md-2"
                    id="note-business"> <i class="icon-briefcase me-1"></i><span
                    class="d-none d-md-block">Business</span></a>
            </li>
            <li class="nav-item">
                <a href="javascript:void(0)"
                    class="nav-link rounded-pill note-link d-flex align-items-center px-2 px-md-3 me-0 me-md-2"
                    id="note-social"> <i class="icon-share-alt me-1"></i><span
                    class="d-none d-md-block">Social</span></a>
            </li>
            <li class="nav-item ms-auto">
                <a href="javascript:void(0)" class="nav-link btn-primary rounded-pill d-flex align-items-center px-3"
                id="add-notes"> <i class="icon-note m-1"></i><span class="d-none d-md-block font-14">Add
                    Notes</span></a>
            </li>
        </ul>
    <div class="tab-content bg-transparent">
        <div id="note-full-container" class="note-has-grid row">
        </div>
    </div>

    <!-- Modal Add notes -->
    <div class="modal fade" id="addnotesmodal" tabindex="-1" role="dialog" aria-labelledby="addnotesmodalTitle"
        style="display: none;" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content border-0">
                <div class="modal-header bg-info text-white">
                    <h5 class="modal-title text-white">Add Notes</h5>
                    <button type="button" class="close-modal-note"
                        style="background-color: red;border-radius: 20px;">
                        <span aria-hidden="true"> X </span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="notes-box">
                        <div class="notes-content">
                            <form action="javascript:void(0);" id="addnotesmodalTitle">
                                <div class="row">
                                    <div class="col-md-12 mb-3">
                                        <div class="note-title">
                                            <label>Note Title</label>
                                            <input type="text" id="note-has-title" class="form-control"
                                                minlength="25" placeholder="Title" name='title' />
                                        </div>
                                    </div>

                                    <div class="col-md-12">
                                        <div class="note-description">
                                            <label>Note Description</label>
                                            <textarea id="note-has-description" class="form-control" minlength="60" placeholder="Description" rows="3"
                                                name='description'></textarea>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button id="btn-n-add" class="btn btn-info" disabled="disabled">Add</button>
                </div>
            </div>
        </div>
    </div>
    </div>
    `)
    $('.note-layouts').removeClass('inactive');
}

//del wallet layouts
function delWalletLayouts() {
    $('.container-wallet-layouts').remove();
    $('.wallet-layouts').addClass('inactive');
}


//del Transaction wallet
function delTransactionLayouts() {
    $('.container-transaction-layouts').remove();
    $('.transaction-layouts').addClass('inactive');
}

//del Note layouts
function delNoteLayouts() {
    $('.container-note-layouts').remove();
    $('.note-layouts').addClass('inactive');
    $(".note-script").remove();
}

//del Chart Layouts
function delChartLayouts() {
    $('.container-chart').remove();
    $('.chart-layouts').addClass('inactive');
}

//del Budget Layouts
function delBudgetLayouts() {
    $('.container-budget').remove();
    $('.budget-layouts').addClass('inactive');
}


// get wallet in database
async function getWallets(url) {
    $('#load').toggleClass("inactive");
    await $.ajax({
        type: "GET",
        url: "/api/moneyApp/wallet",
        processData: false,
        mimeType: "multipart/form-data",
        contentType: false,
        success: function (response) {
            let result = JSON.parse(response);
            //cần check xem có thay đổi nội dung hay không
            //khi thay đổi ở 1 máy khác thì máy hiện tại xử lí thế nào
            //làm sao để chèn vào đúng vị trí mà ko phải xóa tất cả
            if (result.length != $('.row-layouts-wallet figure').length) {

                for (let i = 0; i < result.length; i++) {
                    //wallet cha
                    if (result[i].parent_id == null) {
                        $('.row-layouts-wallet').append(`
                        <figure class="wallet-wallet">
                            <div class="img">
                                <h3>Ví ${result[i].name}</h3>
                                <img src="${window.location.origin}/${result[i].symbol}" alt="Portfolio Item">
                            </div>
                            <figcaption>
                                <h3>Loại: Ví gốc </h3>
                                <p>Số tiền ban đầu: <span>${formatCash(result[i].budget_init)}</span>  <span> VND </span> <br>
                                    Số tiền hiện tại: <span>${formatCash(result[i].budget_real)}</span> <span> VND </span></p>
                                <div class="btn btn-success btn-wallet-layouts btn-wallet-layouts${result[i].id}">
                                    <a href="#transaction" style="text-decoration:none;color:white;width:100%;height:100%;display:inline-block">Chọn ví</a>
                                </div>
                            </figcaption>
                    </figure>
                        `);
                    } else {
                        $('.row-layouts-wallet').append(`
                        <figure class="wallet-child">
                            <div class="img">
                                <h4>Ví ${result[i].name}</h4>
                                <img src="${window.location.origin}/${result[i].symbol}" alt="Portfolio Item">
                            </div>
                            <figcaption>
                                <h3>Loại: Ví con </h3>
                                <h3>Thuộc ví: Ví ${result[i].parent_name}</h3>
                                <p>Số tiền ban đầu: <span>${formatCash(result[i].budget_init)}</span> <span> VND </span> <br>
                                    Số tiền hiện tại: <span>${formatCash(result[i].budget_real)}</span> <span> VND </span></p>
                                <div class="btn btn-success btn-wallet-layouts btn-wallet-layouts${result[i].id}">
                                    <a href="#transaction" style="text-decoration:none;color:white;width:100%;height:100%;display:inline-block">Chọn ví</a>
                                </div>
                            </figcaption>
                        </figure>
                        `);
                    }
                    $('.row-layouts-wallet').append(`
                        <input type="hidden"  class="btn-wallet-name-layouts${result[i].id}" value="${result[i].name}">
                        <input type="hidden"  class="btn-wallet-budget-layouts${result[i].id}" value="${result[i].budget_real}">
                    `);
                }
                $('.row-layouts-wallet').append(`<script src="${window.location.origin}/js/walletLayouts/walletLayouts.js" class="wallet-layouts-script"></script>`);
            }
        },
        error: function (e) {
            console.log(e);
        }
    });
    await $('#load').toggleClass("inactive");
};


// add table display detail wallet
function addCardDetailWalletLayouts() {
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
                        <th scope="col">Capital</th>
                        <th scope="col">Money Cash</th>
                        <th scope="col">Surplus</th>
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

function calculate(type, budget, amount) {
    if (type == 1 || type == 3) {
        return budget + amount;
    } else if (type == 2 || type == 4) {
        return budget - amount;
    }
}

// get wallet detail 
function getWalletDetails(id, page) {
    addCardDetailWalletLayouts();
    dellPagination();
    let url;
    if (page == null || page <= 0) {
        page = 1;
        url = `/api/moneyApp/walletDetails/${id}/1`;
    } else {
        url = `/api/moneyApp/walletDetails/${id}/${page}`;
    }
    axios.get(url).then(response => {
        let result = response.data;
        // console.log(result);
        if (result[0].length != 0) {
            let total = result[1];
            result = result[0];
            let budget = result[0].budget_real;
            for (let i = 0; i < result.length; i++) {
                let surplus = budget;
                let Capital = calculate(result[i].type_trans, budget, result[i].amount);
                budget = Capital;

                $('.transactions-wallet-details').append(`
                <tr class="fw-normal${i}">
                    <td class="align-middle">
                         <h6 class="mb-0"><span class="badge bg-info">${result[i].day_spending}</span></h6>
                    </td>

                    <td class="align-middle">
                        <h6 class="mb-0">
                            <span class="badge" style="background-color: #005fff"> 
                                <i class="fas fa-dollar-sign"></i>${formatCash(Capital)}<span style="margin-left: 5px">VND</span>
                            </span>
                        </h6>
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
    
                    <td class="align-middle">
                        <h6 class="mb-0">
                            <span class="badge bg-danger"> 
                                <i class="fas fa-dollar-sign"></i>${formatCash(surplus)}<span style="margin-left: 5px">VND</span>
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
    
                    <td class="align-middle">
                        <h6 class="mb-0">
                            <span class="badge bg-success"> 
                                <i class="fas fa-dollar-sign"></i>${formatCash(surplus)}<span style="margin-left: 5px">VND</span>
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
                    <a data-mdb-toggle="tooltip" title="Noted"><i
                        class="fas fa-sticky-note fa-lg text-warning note note-wallet note-wallet-details-${result[i].id}"></i></a>
                    <a data-mdb-toggle="tooltip" title="Remove"><i
                        class="fas fa-trash-alt fa-lg text-danger delete-wallet delete-wallet-details-${result[i].id}"></i></a>
                </td>
            `);
            }
            //add pagination
            addPagination(total, page);
            deleteWalletDetails(id);
            noteWalletDetails(id);
        }
    });
}

function deleteWalletDetails(id) {
    axios.get(`/api/moneyApp/idWalletDetails/${id}`).then(response => {
        let result = response.data;
        // console.log(result);
        for (let i = 0; i < result.length; i++) {
            $(`.delete-wallet-details-${result[i].id}`).click(function () {
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
                        .catch(function (error) {
                            console.log(error);
                        });
                }
            });
        }
    });
};

function noteWalletDetails(id) {
    axios.get(`/api/moneyApp/idWalletDetails/${id}`).then(response => {
        let result = response.data;
        // console.log(result);
        for (let i = 0; i < result.length; i++) {
            $(`.note-wallet-details-${result[i].id}`).click(function () {
                if (confirm("Do you want noted") == true) {
                    axios.get(`/api/moneyApp/walletDetails/note/${result[i].id}`)
                        .then(response => {
                            let result = response.data;
                            console.log(result);
                        })
                        .catch(function (error) {
                            console.log(error);
                        });
                }
            });
        }
    });
};

//add pagination
function addPagination(total, page) {
    $('.transaction-layouts').append(`<ul class="pagination"></ul>`);
    let totalPage = total < 10 == true ? 1 : total % 10 == 0 ? total / 10 : total / 10 + 1;
    for (let i = 1; i <= totalPage; i++) {
        if (page == i) {
            $('.pagination').append(`<li><a class="paginator${i} pagination-active">${i}</a></li>`)
        } else {
            $('.pagination').append(`<li><a class="paginator${i}">${i}</a></li>`)
        }
    }
    $('.pagination').prepend(`<li><a class="first-child">&lt;</a></li>`)
    $('.pagination').append(`<li><a class="last-child">&gt;</a></li>`);
    $('.pagination').append(`<input type="hidden" class="pagination-total" value="${totalPage}"></input>`);
    $('.pagination').append(`<script src="${window.location.origin}/js/paginator.js" class="pagination-script"></script>`);
}
//del pagination
function dellPagination() {
    $('.pagination').remove();
}

//get wallet default box
const getWalletDefault = async () => {
    await $.ajax({
        type: "GET",
        url: "/api/moneyApp/wallet",
        processData: false,
        mimeType: "multipart/form-data",
        contentType: false,
        success: function (response) {
            let result = JSON.parse(response);

            if (result.length != 0) {
                for (let i = 0; i < result.length; i++) {
                    $('.row-wallet-default').append(
                        `
                            <div class="badge badge-wallet badge-wallet-default${result[i].id} bg-danger col-3 mx-3 my-3">
                                <img src="${window.location.origin}/${result[i].symbol}" class="icon-transaction badge-wallet-default-img${result[i].id}"> 
                                <span class="badge-wallet-default-name${result[i].id}">${result[i].name}</span>
                                <input type="hidden" class="badge-wallet-default-id${result[i].id}" value="${result[i].id}">
                                <input type="hidden" class="badge-wallet-default-budget${result[i].id}" value="${result[i].budget_real}">
                             </div>
                        `);
                };
                $('.row-wallet-default').append(`<script src="${window.location.origin}/js/walletBox/defaultBox.js" class="wallet-default-script"></script>`);
            };
        },
        error: function (e) {
            console.log(e);
        }
    });
    // hiển thị layout modal
    await $('#load').toggleClass("inactive");
    await $('.box-modal-wallet-default').removeClass('inactive');
};


//format currency vnd
function formatCash(str) {
    if (typeof (str) !== 'string') {
        str = str.toString();
    }
    return str.split('').reverse().reduce((prev, next, index) => {
        return ((index % 3) ? next : (next + ',')) + prev
    })
}


function isExistWalletDefault() {
    let walletDefault = $('.default-wallet').val();
    if (walletDefault == "") {
        return false;
    }
    return true;
}

// get notes in database
async function getNotes() {
    $(".note-script").remove();
    $('#load').toggleClass("inactive");
    await $.ajax({
        type: "GET",
        url: "/api/moneyApp/note",
        processData: false,
        mimeType: "multipart/form-data",
        contentType: false,
        success: function (response) {
            let result = JSON.parse(response);
            // console.log(result);
            // api trả về 2 array 1 array cho wallet và 1 array cho note social
            for (let i = 0; i < result.length; i++) {
                for (let x = 0; x < result[i].length; x++) {
                    if (i == 0) {
                        $('#note-full-container').append(`
                    <div class="col-md-4 single-note-item all-category note-business" value="${result[i][x].id}">
                        <div class="card card-note card-body">
                            <span class="side-stick"></span>
                            <h5 class="note-title text-truncate w-75 mb-0" 
                                data-noteheading="Ví ${result[i][x].name}">Ví ${result[i][x].name}
                                <i class="point fa fa-circle ms-1 font-10"></i>
                            </h5>
                            <p class="note-date font-12 text-muted">${result[i][x].created_at}</p>
                            <div class="note-content">
                                <p class="note-inner-content text-muted"
                                    data-notecontent="
                                        ${result[i][x].amount}. </br>
                                        ${result[i][x].description}. </br>
                                    ">
                                    Day : ${result[i][x].day_spending} - Cost : ${result[i][x].amount} VND. </br>
                                    Action: ${result[i][x].action} - Description: ${result[i][x].description}. </br>
                                </p>
                            </div>
                            <div class="d-flex align-items-center">
                                <span class="me-1 mx-1"><i class="fa fa-star favourite-note"></i></span>
                                <span class="me-1 mx-1"><i class="fa fa-trash remove-note remove-note-business"></i></span>
                            </div>
                        </div>
                    </div>
                    `);
                    } else {
                        $('#note-full-container').append(`
                        <div class="col-md-4 single-note-item all-category note-social" value="${result[i][x].id}">
                            <div class="card card-note card-body">
                                <span class="side-stick"></span>
                                <h5 class="note-title text-truncate w-75 mb-0" 
                                    data-noteheading="${result[i][x].title}">${result[i][x].title}
                                    <i class="point fa fa-circle ms-1 font-10"></i>
                                </h5>
                                <p class="note-date font-12 text-muted">${result[i][x].created_at}</p>
                                <div class="note-content">
                                    <p class="note-inner-content text-muted"
                                        data-notecontent="${result[i][x].description}.">
                                        ${result[i][x].description}.
                                    </p>
                                </div>
                                <div class="d-flex align-items-center">
                                    <span class="me-1 mx-1"><i class="fa fa-star favourite-note"></i></span>
                                    <span class="me-1 mx-1"><i class="fa fa-trash remove-note remove-note-social"></i></span>
                                </div>
                            </div>
                        </div>
                `);
                    }
                }
            }
        },
        error: function (e) {
            console.log(e);
        }
    });
    await $('#load').toggleClass("inactive");
    $('#note-full-container').append(`<script src="${window.location.origin}/js/note.js" class="note-script"></script>`);
};