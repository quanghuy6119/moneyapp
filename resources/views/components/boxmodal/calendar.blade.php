<div class="box-modal-calendar inactive">
    <div class="container px-1 px-sm-5 mx-auto">
        <div class="calendar-exit"><i class="fas fa-times-circle"></i></div>
        <form autocomplete="off" class="calendarForm">
            @csrf
            <div class="flex-sm-row flex-column d-flex">
                <div class="col-sm-9 col-12 px-0 mb-2">
                    <div class="input-group input-daterange">
                        <input type="text" class="form-control input-date input-calendar" placeholder="Start Date"
                            readonly name="startDate">
                        <input type="text" class="form-control input-date input-calendar" placeholder="End Date"
                            readonly name="endDate">
                    </div>
                </div>
                <div class="col-sm-3 col-12 px-0">
                    <a href="#calendar" style="text-decoration: none;color:white;width:100%;height:100%">
                        <button type="button" class="btn btn-black btn-date">
                            Search
                        </button>
                    </a>
                </div>
            </div>
        </form>
    </div>
</div>
