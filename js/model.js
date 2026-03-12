class GalleryModel {
    /* ............................................................
       1. Construtor dos dados
       ............................................................ */
    constructor() {
        // Nosso "Banco de Dados" fictício. Um array de objetos com todas as informações das fotos.
    this.images = [
    { id: 1, src: 'img/cidade1.jpg', title: 'Skyline Urbano', description: 'Vista urbana em Madalena', category: 'cidade' },
    { id: 2, src: 'img/tecnologia1.jpg', title: 'Futurista', description: 'Esse perafone é mesmo um sucesso', category: 'tecnologia' },
    { id: 3, src: 'img/pessoas1.jpg', title: 'Niver', description: 'Aniversário do priminho', category: 'pessoas' },
    { id: 4, src: 'img/famosos1.jpg', title: 'Car Ride', description: 'Lindsay Lohan, Britney Spears e Paris Hilton', category: 'famosos' },
    { id: 5, src: 'img/pelucia1.jpg', title: 'Urso de Pelúcia', description: 'Meu urso favorito', category: 'pelucia' },

    { id: 6, src: 'img/cidade2.jpg', title: 'Ruas Históricas', description: 'Visitando o interior do meu pai', category: 'cidade' },
    { id: 7, src: 'img/tecnologia2.jpg', title: 'Netbook novo', description: 'Como usar esse mini computador, aka netbook?', category: 'tecnologia' },
    { id: 8, src: 'img/pessoas2.jpg', title: 'Momento de Alegria', description: 'Patati Patatá', category: 'pessoas' },
    { id: 9, src: 'img/famosos2.jpg', title: 'High School Musical', description: 'Premiere de HSM ❤️', category: 'famosos' },
    { id: 10, src: 'img/pelucia2.jpg', title: 'Coelho de Pelúcia', description: 'Presente de aniversário', category: 'pelucia' },

    { id: 11, src: 'img/cidade3.jpg', title: 'Vida Noturna', description: 'Terra da minha amiga da escola: Jéssica', category: 'cidade' },
    { id: 12, src: 'img/tecnologia3.jpg', title: 'Câmera Digital', description: 'Valeu pelo presente, pai! #cybershot', category: 'tecnologia' },
    { id: 13, src: 'img/pessoas3.jpg', title: 'São João', description: 'Festa Junina da EP', category: 'pessoas' },
    { id: 14, src: 'img/famosos3.jpg', title: 'Heróis da Terra', description: 'Absolute filme do ano!!! #XMen', category: 'famosos' },
    { id: 15, src: 'img/pelucia3.jpg', title: 'Panda Fofo', description: 'Muito macio e fofo', category: 'pelucia' },

    { id: 16, src: 'img/cidade4.jpg', title: 'Ponte Iluminada', description: 'Valha-me São Francisco #Canindé', category: 'cidade' },
    { id: 17, src: 'img/tecnologia4.jpg', title: 'PS2', description: 'No ponto de jogar Amor Doce nesse #PS2', category: 'tecnologia' },
    { id: 18, src: 'img/pessoas4.jpg', title: 'Amigas', description: 'BFFs', category: 'pessoas' },
    { id: 19, src: 'img/famosos4.jpg', title: 'Rebelde', description: 'Y soy rebelde #amoeles', category: 'famosos' },
    { id: 20, src: 'img/pelucia4.jpg', title: 'Tigre de Pelúcia', description: 'Companheiro de aventuras', category: 'pelucia' }
];

        // Estado inicial do aplicativo (como ele deve abrir pela primeira vez)
        this.currentCategory = 'all'; // Categoria atual selecionada
        this.searchQuery = '';        // O que está digitado na barra de pesquisa
        this.currentPage = 1;         // Em qual página estamos
        this.itemsPerPage = 4;        // Quantas fotos aparecem por página
    }

    /* ............................................................
       2. Setters que fazem as coisas mudarem conforme o controller
       ............................................................ */
    setCategory(category) {
        this.currentCategory = category;
        this.currentPage = 1; 
    }

    setSearchQuery(query) {
        this.searchQuery = query.toLowerCase().trim(); // Limpa espaços e deixa minúsculo pra facilitar a busca
        this.currentPage = 1; 
    }

    setPage(page) {
        this.currentPage = page;
    }

    // Avança uma página (se não estiver na última)
    nextPage() {
        const totalPages = this.getTotalPages();
        if (this.currentPage < totalPages) {
            this.currentPage++;
        }
    }

    // Volta uma página (se não estiver na primeira)
    prevPage() {
        if (this.currentPage > 1) {
            this.currentPage--;
        }
    }

    /* ............................................................
       3. Getters mais complicados
       ............................................................ */

    // O "funil" principal: pega todas as 20 fotos e filtra apenas as que combinam
    // com a categoria atual E com a palavra digitada na busca.
    getFilteredImages() {
        return this.images.filter(image => {
            // Verifica se a foto pertence à categoria selecionada (ou se é 'all')
            const categoryMatch = this.currentCategory === 'all' || 
                                  image.category === this.currentCategory;
            
            // Verifica se o título ou descrição da foto contêm o que o usuário digitou
            const searchMatch = this.searchQuery === '' || 
                               image.title.toLowerCase().includes(this.searchQuery) ||
                               image.description.toLowerCase().includes(this.searchQuery);
            
            // A foto só passa pelo filtro se combinar com a categoria E com a busca!
            return categoryMatch && searchMatch;
        });
    }

    // Calcula exatamente quais das fotos filtradas devem aparecer na página atual
    getCurrentPageImages() {
        const filtered = this.getFilteredImages();
        
        // Exemplo matemático: Se estamos na página 2 e são 4 por página:
        // startIndex = (2 - 1) * 4 = 4. 
        // endIndex = 4 + 4 = 8.
        // Ou seja, ele vai cortar (slice) o array e pegar as fotos da posição 4 até a 7.
        const startIndex = (this.currentPage - 1) * this.itemsPerPage;
        const endIndex = startIndex + this.itemsPerPage;
        
        return filtered.slice(startIndex, endIndex);
    }

    // Calcula quantas páginas no total vamos precisar para exibir as fotos filtradas
    getTotalPages() {
        const filtered = this.getFilteredImages();
        
        // Ex: 10 fotos / 4 por página = 2.5 páginas. O Math.ceil arredonda pra cima (3 páginas).
        // O "|| 1" garante que, mesmo se não achar nenhuma foto, ele retorne que existe 1 página vazia.
        return Math.ceil(filtered.length / this.itemsPerPage) || 1;
    }

    /* ............................................................
       4. Getters
       ............................................................ */

    // Retorna a quantidade total de fotos que passaram no filtro atual
    getTotalImages() {
        return this.getFilteredImages().length;
    }

    // Retorna um array com todas as categorias únicas que existem no banco de dados.
    // Usamos 'Set' porque ele remove itens duplicados magicamente!
    getCategories() {
        const categories = new Set(this.images.map(img => img.category));
        return ['all', ...Array.from(categories)];
    }

    // Busca uma foto específica pelo seu número de ID
    getImageById(id) {
        return this.images.find(image => image.id === id) || null;
    }
}