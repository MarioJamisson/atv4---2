class GalleryView {
    constructor() {
        this.gallery = document.getElementById('gallery');
        this.filterButtons = document.querySelectorAll('#filters button');
        this.searchInput = document.getElementById('searchInput');
        this.pagination = document.getElementById('pagination');
    }

    bindChangeCategory(handler) {
        this.filterButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                handler(e.target.dataset.cat);
            });
        });
    }

    bindSearch(handler) {
        this.searchInput.addEventListener('input', (e) => {
            handler(e.target.value);
        });
    }

    bindChangePage(handler) {
        this.pagination.addEventListener('click', (e) => {
            if (e.target.tagName === 'BUTTON') {
                handler(parseInt(e.target.dataset.page));
            }
        });
    }

    render(images, currentPage, totalPages) {
        this.gallery.classList.add('fade-out');

        setTimeout(() => {
            this.gallery.innerHTML = '';

            if (images.length === 0) {
                this.gallery.innerHTML = '<p class="blink" style="grid-column: 1 / -1;">ERRO 404: Nada encontrado, bestie! 😭</p>';
            } else {
                images.forEach(img => {
                    const imgElement = document.createElement('img');
                    imgElement.src = img.src;
                    imgElement.className = 'img-card';
                    imgElement.alt = img.title;
                    imgElement.title = img.description; 
                    
                    // Se não achar a imagem local na sua pasta img/, coloca o placeholder fofo!
                    imgElement.onerror = () => { imgElement.src = 'https://via.placeholder.com/250x200/ffb6c1/d10069?text=Sem+Foto'; };
                    
                    this.gallery.appendChild(imgElement);
                });
            }

            this.pagination.innerHTML = '';
            for (let i = 1; i <= totalPages; i++) {
                const btn = document.createElement('button');
                btn.innerText = i;
                btn.dataset.page = i;
                if (i === currentPage) btn.classList.add('active-page');
                this.pagination.appendChild(btn);
            }

            this.gallery.classList.remove('fade-out');
        }, 300);
    }
}