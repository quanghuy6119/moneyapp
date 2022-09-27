$(document).ready(function () {
    axios.get("/api/moneyApp/idWallet").then(response => {
        let result = response.data;
        for (let i = 0; i < result.length; i++) {
            $(`.badge-wallet-default${result[i].id}`).click(function () {

                // gan id wallet vo the input
                let idWallet = $(`.badge-wallet-default-id${result[i].id}`).val();
                $('.default-wallet').val(idWallet);

                // gan name vo button
                let nameWallet = $(`.badge-wallet-default-name${result[i].id}`).text();
                $('.total-down-name').text(nameWallet);

                // gan so tien cua vi 
                let budgetReal = $(`.badge-wallet-default-budget${result[i].id}`).val();
                $('.total-budget').text(formatCash(budgetReal));

                if (window.location.hash == '#transaction') {
                    delTransactionLayouts();
                    addTransactionLayouts();
                    let id_default = $('.default-wallet').val();
                    getWalletDetails(id_default);
                }

                //chon wallet xong tat
                $('.badge-wallet').remove();
                $('.wallet-default-script').remove();
                $('.box-modal-wallet-default').addClass('inactive');
                $('.layout-modal').addClass('inactive');
            });
        }
    });
});


//format currency vnd
function formatCash(str) {
    if (typeof (str) !== 'string') {
        str = str.toString();
    }
    return str.split('').reverse().reduce((prev, next, index) => {
        return ((index % 3) ? next : (next + ',')) + prev
    })
}

function delTransactionLayouts() {
    $('.container-transaction-layouts').remove();
    $('.transaction-layouts').addClass('inactive');
}

//add Transaction wallet
function addTransactionLayouts() {
    $('.transaction-layouts').append(`    
    <div class="container h-100 container-transaction-layouts">
        <div class="row d-flex justify-content-center">
            <div class="col-md-12 col-xl-10 mt-5 row-transactions-layouts">
            </div>
        </div>
    </div>
    `)
    $('.transaction-layouts').removeClass('inactive');
}

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
                let capital = calculate(result[i].type_trans, budget, result[i].amount);
                budget = capital;

                $('.transactions-wallet-details').append(`
                <tr class="fw-normal${i}">
                    <td class="align-middle">
                         <h6 class="mb-0"><span class="badge bg-info">${result[i].day_spending}</span></h6>
                    </td>

                    <td class="align-middle">
                        <h6 class="mb-0">
                            <span class="badge" style="background-color: #005fff"> 
                                <i class="fas fa-dollar-sign"></i>${formatCash(capital)}<span style="margin-left: 5px">VND</span>
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
                    <a data-mdb-toggle="tooltip" title="Remove"><i
                        class="fas fa-trash-alt fa-lg text-warning delete-wallet delete-wallet-details-${result[i].id}"></i></a>
                        <a data-mdb-toggle="tooltip" title="Noted"><i
                        class="fas fa-sticky-note fa-lg text-danger note note-wallet note-wallet-details-${result[i].id}"></i></a>
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

function dellPagination() {
    $('.pagination').remove();
}