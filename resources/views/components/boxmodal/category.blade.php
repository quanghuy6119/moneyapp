<div class="box-modal-category inactive">
    <div class="item-category container-fluid">
        <div class="category-header">
            <div class="category-title">Category <img src="{{ asset('img/activity-svgrepo-com.svg') }}">
            </div>
        </div>
        <div class="category-exit"><i class="fas fa-times-circle"></i></div>
    </div>
    <div class="row row-category" style="width:100%;margin-left:12px">
    </div>
    <form enctype="multipart/form-data" class="form-icon-trans">
        @csrf
        <div class="row">
            <div class="form-outline control-group col-5 mb-3">
                <input type="file" class="form-control form-control-sm" name="file"
                    style="background-color: rgb(54, 230, 243)">
            </div>
            <div class="form-outline control-group col-3 mb-4">
                <input type="text" class="form-control form-control-sm" name="title" style="width: 80px">
            </div>
            <div class="form-outline control-group col-2">
                <input type="submit" class="btn btn-primary btn-category" style="height: 31px">
            </div>
        </div>
    </form>
</div>
