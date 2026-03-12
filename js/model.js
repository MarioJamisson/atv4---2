class GalleryModel {
    /* ............................................................
       1. Construtor dos dados
       ............................................................ */
    constructor() {
        // Nosso "Banco de Dados" fictício. Um array de objetos com todas as informações das fotos.
        this.images = [
            { id: 1, src: 'img/natureza1.jpg', title: 'Floresta Tropical', description: 'Uma bela floresta verdejante com raios de sol', category: 'natureza' },
            { id: 2, src: 'img/cidade1.jpg', title: 'Skyline Urbano', description: 'Arranha-céus iluminados ao entardecer', category: 'cidade' },
            { id: 3, src: 'img/animais1.jpg', title: 'Leão Majestoso', description: 'Um leão descansando na savana africana', category: 'animais' },
            { id: 4, src: 'img/tecnologia1.jpg', title: 'Código Futurista', description: 'Interface de programação moderna e elegante', category: 'tecnologia' },
            { id: 5, src: 'img/pessoas1.jpg', title: 'Trabalho em Equipe', description: 'Pessoas colaborando em um projeto criativo', category: 'pessoas' },
            { id: 6, src: 'img/natureza2.jpg', title: 'Cachoeira Serena', description: 'Águas cristalinas caindo entre as rochas', category: 'natureza' },
            { id: 7, src: 'img/cidade2.jpg', title: 'Ruas Históricas', description: 'Arquitetura clássica em uma cidade europeia', category: 'cidade' },
            { id: 8, src: 'img/animais2.jpg', title: 'Pássaro Colorido', description: 'Um arara exibindo suas penas vibrantes', category: 'animais' },
            { id: 9, src: 'img/tecnologia2.jpg', title: 'Inteligência Artificial', description: 'Visualização de rede neural e machine learning', category: 'tecnologia' },
            { id: 10, src: 'img/pessoas2.jpg', title: 'Momento de Alegria', description: 'Amigos rindo e aproveitando o momento', category: 'pessoas' },
            { id: 11, src: 'img/natureza3.jpg', title: 'Montanhas Nevadas', description: 'Picos cobertos de neve sob um céu azul', category: 'natureza' },
            { id: 12, src: 'img/cidade3.jpg', title: 'Vida Noturna', description: 'Ruas movimentadas com luzes de neon', category: 'cidade' },
            { id: 13, src: 'img/animais3.jpg', title: 'Golfinho Brincalhão', description: 'Golfinho saltando sobre as ondas do mar', category: 'animais' },
            { id: 14, src: 'img/tecnologia3.jpg', title: 'Realidade Virtual', description: 'Experiência imersiva com óculos VR', category: 'tecnologia' },
            { id: 15, src: 'img/pessoas3.jpg', title: 'Estudante Focado', description: 'Jovem estudando em uma biblioteca tranquila', category: 'pessoas' },
            { id: 16, src: 'img/natureza4.jpg', title: 'Pôr do Sol', description: 'Cores vibrantes no horizonte ao final do dia', category: 'natureza' },
            { id: 17, src: 'img/cidade4.jpg', title: 'Ponte Iluminada', description: 'Estrutura arquitetônica sobre o rio à noite', category: 'cidade' },
            { id: 18, src: 'img/animais4.jpg', title: 'Família de Pandas', description: 'Pandas gigantes em seu habitat natural', category: 'animais' },
            { id: 19, src: 'img/tecnologia4.jpg', title: 'Servidor em Nuvem', description: 'Infraestrutura de data center moderna', category: 'tecnologia' },
            { id: 20, src: 'img/pessoas4.jpg', title: 'Artista Criativo', description: 'Pintor trabalhando em sua obra-prima', category: 'pessoas' }
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