document.addEventListener('DOMContentLoaded', () => {

    // 1. Menu mobile
    const mobileToggle = document.getElementById('mobileToggle');
    const navLinks = document.getElementById('navLinks');

    if (mobileToggle && navLinks) {
        const fecharMenu = () => {
            navLinks.classList.remove('active');
            mobileToggle.setAttribute('aria-expanded', 'false');
        };

        mobileToggle.addEventListener('click', () => {
            const aberto = navLinks.classList.toggle('active');
            mobileToggle.setAttribute('aria-expanded', String(aberto));
        });

        // Fecha o menu ao clicar em um link
        navLinks.querySelectorAll('a').forEach((link) => {
            link.addEventListener('click', fecharMenu);
        });
    }

    // 2. Filtro dos projetos
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach((button) => {
        button.addEventListener('click', () => {
            filterButtons.forEach((btn) => {
                btn.classList.remove('active');
                btn.setAttribute('aria-pressed', 'false');
            });
            button.classList.add('active');
            button.setAttribute('aria-pressed', 'true');

            const filtro = button.getAttribute('data-filter');

            projectCards.forEach((card) => {
                const categoria = card.getAttribute('data-category');
                card.hidden = !(filtro === 'all' || categoria === filtro);
            });
        });
    });

    // 3. Ano atual no rodapé
    const ano = document.getElementById('year');
    if (ano) ano.textContent = new Date().getFullYear();

    // 4. Link ativo no menu conforme a rolagem
    const secoes = document.querySelectorAll('section[id]');
    const linksMenu = document.querySelectorAll('.nav-link');

    if ('IntersectionObserver' in window && secoes.length) {
        const observador = new IntersectionObserver((entradas) => {
            entradas.forEach((entrada) => {
                if (entrada.isIntersecting) {
                    linksMenu.forEach((link) => {
                        link.classList.toggle('active', link.getAttribute('href') === '#' + entrada.target.id);
                    });
                }
            });
        }, { rootMargin: '-45% 0px -50% 0px' });

        secoes.forEach((secao) => observador.observe(secao));
    }

    // 5. TESTE DE CORES (temporário - apague junto com o bloco do HTML e do CSS)
    const botoesTema = document.querySelectorAll('.theme-test button');
    const raiz = document.documentElement;

    botoesTema.forEach((botao) => {
        botao.classList.toggle('is-selected', botao.dataset.tema === raiz.dataset.tema);

        botao.addEventListener('click', () => {
            raiz.dataset.tema = botao.dataset.tema;
            botoesTema.forEach((b) => b.classList.toggle('is-selected', b === botao));
        });
    });

});