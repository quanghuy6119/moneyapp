<section class="note-background note-layouts inactive">
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
                                    @csrf
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
</section>
