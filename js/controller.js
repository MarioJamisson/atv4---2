class GalleryController {
    /* ............................................................
       1. Contrutor
       ............................................................ */
    constructor(model, view) {
        // Recebe os dados (model) e a interface (view) como parceiros
        this.model = model;
        this.view = view;

        // Faz aparecer as coisas quando clica em algo
        this.view.bindChangeCategory(this.handleChangeCategory);
        this.view.bindSearch(this.handleSearch);
        this.view.bindChangePage(this.handleChangePage);

        // Ele atualiza a tela inteira
        this.updateView();
    }

    /* ............................................................
       2. Handler (gere as ações)
       ............................................................ */
    
    // Executa quando o usuário clicar em alguma coisa
    handleChangeCategory = (category) => {
        this.model.setCategory(category); // Muda a categoria
        this.updateView();                // Atualiza as novas fotos
    }

    // Dispara a cada caractere digitado na barra de pesquisa
    handleSearch = (query) => {
        this.model.setSearchQuery(query); // Manda a palavra digitada pro Model filtrar
        this.updateView();                // Manda a View atualizar as fotos na hora
    }

    // Dispara quando o usuário muda a página
    handleChangePage = (page) => {
        this.model.setPage(page);         // Avisa ao model qual a pagina que o usuario clicou
        this.updateView();                // Pede pra View mostrar as fotos daquela página
    }

    /* ............................................................
       3. Sincronização
       ............................................................ */
    updateView() {
        // Vai lá no Model e busca tudo o que importa no momento:
        const images = this.model.getCurrentPageImages(); // As fotos já filtradas
        const currentPage = this.model.currentPage;       // A página atual (pra marcar o botão certinho)
        const totalPages = this.model.getTotalPages();    // O total de páginas (pra criar os botões)

        // Entrega as infos pra que a view exiba corretamente
        this.view.render(images, currentPage, totalPages);
    }
}