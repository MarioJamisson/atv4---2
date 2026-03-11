/**
 * Model.js
 * Responsável por armazenar os dados e aplicar a lógica de filtragem
 * Padrão MVC - Model
 */

class GalleryModel {
    constructor() {
        // Dados originais mantidos conforme você pediu!
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

        // Estado atual
        this.currentCategory = 'all';
        this.searchQuery = '';
        this.currentPage = 1;
        this.itemsPerPage = 4;
    }

    setCategory(category) {
        this.currentCategory = category;
        this.currentPage = 1; 
    }

    setSearchQuery(query) {
        this.searchQuery = query.toLowerCase().trim();
        this.currentPage = 1; 
    }

    setPage(page) {
        this.currentPage = page;
    }

    nextPage() {
        const totalPages = this.getTotalPages();
        if (this.currentPage < totalPages) {
            this.currentPage++;
        }
    }

    prevPage() {
        if (this.currentPage > 1) {
            this.currentPage--;
        }
    }

    getFilteredImages() {
        return this.images.filter(image => {
            const categoryMatch = this.currentCategory === 'all' || 
                                  image.category === this.currentCategory;
            
            const searchMatch = this.searchQuery === '' || 
                               image.title.toLowerCase().includes(this.searchQuery) ||
                               image.description.toLowerCase().includes(this.searchQuery);
            
            return categoryMatch && searchMatch;
        });
    }

    getCurrentPageImages() {
        const filtered = this.getFilteredImages();
        const startIndex = (this.currentPage - 1) * this.itemsPerPage;
        const endIndex = startIndex + this.itemsPerPage;
        return filtered.slice(startIndex, endIndex);
    }

    getTotalPages() {
        const filtered = this.getFilteredImages();
        // Garantindo que nunca retorne 0 para não bugar a View
        return Math.ceil(filtered.length / this.itemsPerPage) || 1;
    }

    getTotalImages() {
        return this.getFilteredImages().length;
    }

    getCategories() {
        const categories = new Set(this.images.map(img => img.category));
        return ['all', ...Array.from(categories)];
    }

    getImageById(id) {
        return this.images.find(image => image.id === id) || null;
    }
}