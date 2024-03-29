<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <meta http-equiv="Content-Security-Policy" content="block-all-mixed-content">
    <title>Money</title>

    {{-- boostrap --}}
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <script defer src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"></script>
    {{-- awesome/jquery/axios --}}
    <script src="https://kit.fontawesome.com/1bcd94c135.js" crossorigin="anonymous"></script>
    <script src="https://code.jquery.com/jquery-latest.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
    {{-- file css --}}
    <link rel="stylesheet" href="{{ asset('css/base.css') }}">
    <link rel="stylesheet" href="{{ asset('css/category.css') }}">
    <link rel="stylesheet" href="{{ asset('css/walletBoxModal.css') }}">
    <link rel="stylesheet" href="{{ asset('css/walletlayout.css') }}">
    <link rel="stylesheet" href="{{ asset('css/transactionModal.css') }}">
    <link rel="stylesheet" href="{{ asset('css/note.css') }}">
    <link rel="stylesheet" href="{{ asset('css/calendar.css') }}">
    {{-- file js --}}
    <script src="{{ asset('js/js.js') }}"></script>
    <link rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datepicker/1.9.0/css/bootstrap-datepicker.css">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datepicker/1.9.0/js/bootstrap-datepicker.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/3.9.1/chart.min.js"></script>

</head>

<body>
    <div class="container-fluid">
        <div class="row">
            <div class="col-0 col-md-1" style="padding: 0;">
                <x-Sidebar> </x-Sidebar>
            </div>
            <div class="col-12 col-md-11 app-content" style="padding: 0;">
                <x-Navbar> </x-Navbar>

                {{-- content --}}
                <x-Wallet> </x-Wallet>
                <x-Transaction> </x-Transaction>
                <x-Note></x-Note>
                <x-Chart></x-Chart>
                <x-Budget></x-Budget>
            </div>
        </div>
    </div>

    {{-- modal box --}}
    {{-- <div class="layout-modal"> --}}
    <div class="layout-modal inactive">
        <x-CategoryModal> </x-CategoryModal>
        <x-WalletModal> </x-WalletModal>
        <x-TransactionModal> </x-TransactionModal>
        <x-defaultWalletModal> </x-defaultWalletModal>
        <x-CalendarModal> </x-CalendarModal>
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
