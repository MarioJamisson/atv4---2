class GalleryView {
    /* ............................................................
       1. CONSTRUTOR: Encontrando os elementos na tela
       ............................................................ */
    constructor() {
        // Pega as "caixinhas" do HTML onde vamos injetar conteúdo ou ouvir cliques
        this.gallery = document.getElementById('gallery'); // Onde as fotos vão ficar
        this.filterButtons = document.querySelectorAll('#filters button'); // Os botões de categoria
        this.searchInput = document.getElementById('searchInput'); // A barra de pesquisa
        this.pagination = document.getElementById('pagination'); // Os números das páginas
    }

    /* ............................................................
       2. BINDERS (Conectando a tela com o Controller)
       Esses métodos não tomam decisões. Eles apenas dizem:
       "Ei, Controller, o usuário clicou aqui! Toma esse dado e faz algo!"
       ............................................................ */

    // Ouve os cliques nos botões de categoria (Natureza, Cidade, etc.)
    bindChangeCategory(handler) {
        this.filterButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                // Passa para o Controller o "data-cat" do botão clicado
                handler(e.target.dataset.cat); 
            });
        });
    }

    // Ouve o que está sendo digitado na barra de pesquisa
    bindSearch(handler) {
        this.searchInput.addEventListener('input', (e) => {
            // Passa para o Controller o texto que acabou de ser digitado
            handler(e.target.value);
        });
    }

    // Ouve os cliques nos números da paginação lá no rodapé
    bindChangePage(handler) {
        this.pagination.addEventListener('click', (e) => {
            // Só faz algo se o que foi clicado foi realmente um botão
            if (e.target.tagName === 'BUTTON') {
                // Converte o número da página (string) para um inteiro e avisa o Controller
                handler(parseInt(e.target.dataset.page));
            }
        });
    }

    /* ............................................................
       3. RENDER (Desenhando a galeria na tela)
       Este é o método mais pesado. O Controller chama ele passando 
       as fotos prontas e ele reconstrói o HTML.
       ............................................................ */
    render(images, currentPage, totalPages) {
        // Passo 1: Inicia a animação de saída (esconde a galeria atual)
        this.gallery.classList.add('fade-out');

        // Passo 2: Espera 300ms (tempo do CSS fazer o fade-out) antes de trocar as fotos
        setTimeout(() => {
            this.gallery.innerHTML = ''; // Limpa as fotos antigas da tela

            // Se a busca ou filtro não retornou nenhuma foto...
            if (images.length === 0) {
                this.gallery.innerHTML = '<p class="blink" style="grid-column: 1 / -1;">ERRO 404: Nada encontrado, bestie! 😭</p>';
            } else {
                // Se tem fotos, vamos criar o HTML para cada uma delas
                images.forEach(img => {
                    // 1. Cria o CONTAINER (A div que vai segurar a foto e o texto juntos)
                    const cardContainer = document.createElement('div');
                    cardContainer.className = 'img-card'; // Classe CSS do container principal
                    
                    // 2. Cria a IMAGEM em si
                    const imgElement = document.createElement('img');
                    imgElement.src = img.src;
                    imgElement.alt = img.title;
                    
                    // Se a imagem falhar ao carregar, exibe um placeholder fofinho pra não quebrar o layout
                    imgElement.onerror = () => { imgElement.src = 'https://via.placeholder.com/250x200/ffb6c1/d10069?text=Sem+Foto'; };
                    
                    // 3. Cria a caixinha da DESCRIÇÃO (que vai subir no hover)
                    const descElement = document.createElement('div');
                    descElement.className = 'img-desc';
                    // Tenta usar a descrição, se não tiver usa o título, se não tiver usa um texto padrão
                    descElement.innerText = img.description || img.title || 'Mais uma fotinho pro diário! 🌸';

                    // 4. Monta o quebra-cabeça: coloca a foto e a descrição dentro do container
                    cardContainer.appendChild(imgElement);
                    cardContainer.appendChild(descElement);
                    
                    // 5. Por fim, joga o container completo dentro da área da galeria
                    this.gallery.appendChild(cardContainer);
                });
            }

            /* ............................................................
               4. PAGINAÇÃO (Desenhando os botões numéricos)
               ............................................................ */
            this.pagination.innerHTML = ''; // Limpa a paginação antiga
            
            // Cria um botão para cada página disponível
            for (let i = 1; i <= totalPages; i++) {
                const btn = document.createElement('button');
                btn.innerText = i;
                btn.dataset.page = i; // Salva o número da página no botão
                
                // Se este for o botão da página em que estamos, pinta ele de outra cor
                if (i === currentPage) btn.classList.add('active-page');
                
                this.pagination.appendChild(btn);
            }

            // Tudo pronto! Remove a classe fade-out para as novas fotos surgirem na tela
            this.gallery.classList.remove('fade-out');
        }, 300); // Fim do setTimeout
    }
}