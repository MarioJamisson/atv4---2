class GalleryController {
    constructor(model, view) {
        this.model = model;
        this.view = view;

        this.view.bindChangeCategory(this.handleChangeCategory);
        this.view.bindSearch(this.handleSearch);
        this.view.bindChangePage(this.handleChangePage);

        this.updateView();
    }

    handleChangeCategory = (category) => {
        this.model.setCategory(category);
        this.updateView();
    }

    handleSearch = (query) => {
        this.model.setSearchQuery(query);
        this.updateView();
    }

    handleChangePage = (page) => {
        this.model.setPage(page);
        this.updateView();
    }

    updateView() {
        const images = this.model.getCurrentPageImages();
        const currentPage = this.model.currentPage;
        const totalPages = this.model.getTotalPages();

        this.view.render(images, currentPage, totalPages);
    }
}