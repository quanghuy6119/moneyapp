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
    {{-- awesome/jquery/axios --}}
    <script src="https://kit.fontawesome.com/1bcd94c135.js" crossorigin="anonymous"></script>
    <script src="https://code.jquery.com/jquery-latest.js"></script>
    <script src="https://cdn.baotrongit.com/Money-Format-Plugin/money_format.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
    {{-- file css --}}
    <link rel="stylesheet" href="{{ asset('css/base.css') }}">
    <link rel="stylesheet" href="{{ asset('css/category.css') }}">
    <link rel="stylesheet" href="{{ asset('css/walletBoxModal.css') }}">
    <link rel="stylesheet" href="{{ asset('css/walletlayout.css') }}">
    <link rel="stylesheet" href="{{ asset('css/transactionModal.css') }}">
    {{-- file js --}}
    <script src="{{ asset('js/js.js') }}"></script>

</head>

<body>
    <div class="container-fluid">
        <div class="row">
            <div class="col-1" style="padding: 0;">
                <x-Sidebar> </x-Sidebar>
            </div>
            <div class="col-11 app-content" style="padding: 0;">
                <x-Navbar> </x-Navbar>

                {{-- content --}}
                <x-Wallet> </x-Wallet>
                <x-Transaction> </x-Transaction>
            </div>
        </div>
    </div>

    {{-- modal box --}}
    {{-- <div class="layout-modal inactive"> --}}
    <div class="layout-modal inactive">
        <x-CategoryModal> </x-CategoryModal>
        <x-WalletModal> </x-WalletModal>
        <x-TransactionModal> </x-TransactionModal>
    </div>

    {{-- loader --}}
    <div class="modal1 inactive" id="load">
        <div class="modal-overlay"></div>

        <div class="load-2">
            <div class="line"></div>
            <div class="line"></div>
            <div class="line"></div>
        </div>
    </div>
</body>

</html>
