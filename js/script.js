/* ===== SCRIPT PRINCIPAL DO MELODIA ===== */

// Aguarda o carregamento completo da página
document.addEventListener('DOMContentLoaded', function() {
    
    // ===== INICIALIZAÇÃO =====
    initializeApp();
    
    // ===== SCROLL-DRIVEN ANIMATIONS =====
    initScrollDrivenAnimations();
    
    // ===== FUNÇÕES PRINCIPAIS =====
    
    function initializeApp() {
        console.log('🎵 Melodia App inicializado!');
        
        // Inicializar todas as funcionalidades
        initScrollAnimations();
        initHoverAnimations();
        initFormHandling();
        initParticleEffects();
        initMusicPlayer();
        initTypingEffect();
        initCounters();
        optimizeAnimations();
        initButtons();
        
        // Adicionar loading suave
        document.body.classList.add('loaded');
    }
    
    // ===== ANIMAÇÕES DE SCROLL SUAVES =====
    
    function initScrollAnimations() {
        // Configurações do observer
        const observerOptions = {
            threshold: 0.15,
            rootMargin: '0px 0px -100px 0px'
        };
        
        // Observer principal para animações de scroll
        const scrollObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    
                    // Adicionar delay para elementos filhos
                    const children = entry.target.querySelectorAll('[class*="scroll-delay"]');
                    children.forEach((child, index) => {
                        setTimeout(() => {
                            child.classList.add('revealed');
                        }, index * 100);
                    });
                }
            });
        }, observerOptions);
        
        // Observer para efeitos parallax
        const parallaxObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.1 });
        
        // Observar todos os elementos com classes de animação
        const animatedElements = document.querySelectorAll([
            '.scroll-reveal',
            '.scroll-fade', 
            '.scroll-slide-left',
            '.scroll-slide-right',
            '.scroll-scale',
            '.scroll-rotate',
            '.scroll-bounce',
            '.scroll-flip'
        ].join(','));
        
        animatedElements.forEach(el => {
            scrollObserver.observe(el);
        });
        
        // Observar elementos parallax
        const parallaxElements = document.querySelectorAll('.parallax-slow, .parallax-medium, .parallax-fast');
        parallaxElements.forEach(el => {
            parallaxObserver.observe(el);
        });
        
        // Efeito parallax no scroll
        window.addEventListener('scroll', throttle(handleParallax, 16));
        
        // Smooth scroll para links internos
        initSmoothScrolling();
    }
    
    // Função para efeitos parallax
    function handleParallax() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.parallax-slow, .parallax-medium, .parallax-fast');
        
        parallaxElements.forEach(element => {
            const speed = element.classList.contains('parallax-slow') ? 0.5 :
                         element.classList.contains('parallax-medium') ? 0.3 : 0.1;
            
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    }
    
    // Função para scroll suave
    function initSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    const offsetTop = target.offsetTop - 80; // Offset para header fixo
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
    
    // Função para animações de hover suaves
    function initHoverAnimations() {
        // Adicionar efeitos de hover aos cards
        const cards = document.querySelectorAll('.hover-lift, .hover-scale, .hover-rotate');
        cards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = this.classList.contains('hover-lift') ? 'translateY(-8px)' :
                                     this.classList.contains('hover-scale') ? 'scale(1.05)' :
                                     this.classList.contains('hover-rotate') ? 'rotate(5deg) scale(1.05)' : '';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = '';
            });
        });
    }
    
    // ===== MANIPULAÇÃO DE FORMULÁRIO =====
    
    function initFormHandling() {
        const form = document.querySelector('form');
        
        if (form) {
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Coletar dados do formulário
                const formData = new FormData(form);
                const data = {
                    nome: form.querySelector('input[type="text"]').value,
                    email: form.querySelector('input[type="email"]').value,
                    genero: form.querySelector('select').value
                };
                
                // Validação básica
                if (!data.nome || !data.email) {
                    showNotification('Por favor, preencha todos os campos obrigatórios.', 'error');
                    return;
                }
                
                if (!isValidEmail(data.email)) {
                    showNotification('Por favor, insira um e-mail válido.', 'error');
                    return;
                }
                
                // Simular envio
                showLoadingState(form);
                
                setTimeout(() => {
                    hideLoadingState(form);
                    showNotification('Cadastro realizado com sucesso! 🎵', 'success');
                    form.reset();
                }, 2000);
            });
        }
    }
    
    // ===== EFEITOS DE PARTÍCULAS =====
    
    function initParticleEffects() {
        // Criar partículas musicais
        createMusicalParticles();
        
        // Efeito de cursor musical removido
    }
    
    function createMusicalParticles() {
        const heroSection = document.getElementById('hero');
        
        if (!heroSection) return;
        
        // Criar partículas periodicamente
        setInterval(() => {
            createParticle(heroSection);
        }, 3000);
    }
    
    function createParticle(container) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Posição aleatória
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 2 + 's';
        
        // Cores aleatórias
        const colors = ['#a855f7', '#ec4899', '#3b82f6', '#10b981', '#f59e0b'];
        particle.style.background = colors[Math.floor(Math.random() * colors.length)];
        
        container.appendChild(particle);
        
        // Remover após animação
        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        }, 6000);
    }
    
    // Função de cursor musical removida
    
    // ===== PLAYER DE MÚSICA COM ÁUDIO SEM COPYRIGHT =====
    
    function initMusicPlayer() {
        const playButton = document.getElementById('playButton');
        const audioPlayer = document.getElementById('audioPlayer');
        const playPauseBtn = document.getElementById('playPauseBtn');
        const muteBtn = document.getElementById('muteBtn');
        const progressBar = document.getElementById('progressBar');
        
        // URLs de áudio sem copyright (exemplos)
        const audioUrls = [
            'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav', // Exemplo
            'https://freepd.com/music/Ambient%20Music.mp3', // Exemplo
            // Adicione mais URLs das bibliotecas mencionadas
        ];
        
        let currentAudio = null;
        let isPlaying = false;
        let isMuted = false;
        
        if (playButton) {
            playButton.addEventListener('click', function() {
                showAudioPlayer();
                loadRandomAudio();
            });
        }
        
        if (playPauseBtn) {
            playPauseBtn.addEventListener('click', function() {
                togglePlayPause();
            });
        }
        
        if (muteBtn) {
            muteBtn.addEventListener('click', function() {
                toggleMute();
            });
        }
        
        function showAudioPlayer() {
            if (audioPlayer) {
                audioPlayer.classList.remove('hidden');
                playButton.style.display = 'none';
            }
        }
        
        function loadRandomAudio() {
            // Para demonstração, vamos usar um áudio gerado programaticamente
            // Em produção, use URLs reais das bibliotecas sem copyright
            createDemoAudio();
        }
        
        function createDemoAudio() {
            // Criar um áudio simples para demonstração
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.frequency.setValueAtTime(440, audioContext.currentTime);
            oscillator.type = 'sine';
            
            gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
            
            currentAudio = {
                context: audioContext,
                oscillator: oscillator,
                gainNode: gainNode,
                startTime: audioContext.currentTime,
                duration: 30 // 30 segundos
            };
            
            updateProgressBar();
        }
        
        function togglePlayPause() {
            if (!currentAudio) return;
            
            if (isPlaying) {
                pauseAudio();
            } else {
                playAudio();
            }
        }
        
        function playAudio() {
            if (!currentAudio) return;
            
            try {
                currentAudio.oscillator.start();
                isPlaying = true;
                playPauseBtn.innerHTML = '<i class="fas fa-pause text-xl"></i>';
                updateProgressBar();
            } catch (e) {
                console.log('Áudio já está tocando');
            }
        }
        
        function pauseAudio() {
            if (!currentAudio) return;
            
            currentAudio.oscillator.stop();
            isPlaying = false;
            playPauseBtn.innerHTML = '<i class="fas fa-play text-xl"></i>';
        }
        
        function toggleMute() {
            if (!currentAudio) return;
            
            isMuted = !isMuted;
            currentAudio.gainNode.gain.setValueAtTime(
                isMuted ? 0 : 0.1, 
                currentAudio.context.currentTime
            );
            
            muteBtn.innerHTML = isMuted ? 
                '<i class="fas fa-volume-mute"></i>' : 
                '<i class="fas fa-volume-up"></i>';
        }
        
        function updateProgressBar() {
            if (!currentAudio || !isPlaying) return;
            
            const elapsed = currentAudio.context.currentTime - currentAudio.startTime;
            const progress = (elapsed / currentAudio.duration) * 100;
            
            if (progressBar) {
                progressBar.style.width = Math.min(progress, 100) + '%';
            }
            
            if (progress < 100) {
                requestAnimationFrame(updateProgressBar);
            } else {
                // Áudio terminou
                isPlaying = false;
                playPauseBtn.innerHTML = '<i class="fas fa-play text-xl"></i>';
                progressBar.style.width = '0%';
            }
        }
    }
    
    function simulateMusicPlayback() {
        // Criar elemento de áudio visual
        const audioVisualizer = document.createElement('div');
        audioVisualizer.className = 'audio-visualizer';
        audioVisualizer.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: rgba(0, 0, 0, 0.8);
            padding: 15px;
            border-radius: 10px;
            color: white;
            z-index: 1000;
            display: flex;
            align-items: center;
            gap: 10px;
        `;
        
        audioVisualizer.innerHTML = `
            <div class="sound-bars">
                <div class="bar" style="animation-delay: 0s;"></div>
                <div class="bar" style="animation-delay: 0.1s;"></div>
                <div class="bar" style="animation-delay: 0.2s;"></div>
                <div class="bar" style="animation-delay: 0.3s;"></div>
            </div>
            <span>🎵 Tocando...</span>
        `;
        
        // Adicionar estilos para as barras de som
        const style = document.createElement('style');
        style.textContent = `
            .sound-bars {
                display: flex;
                align-items: end;
                gap: 2px;
                height: 20px;
            }
            .bar {
                width: 3px;
                background: linear-gradient(to top, #a855f7, #ec4899);
                border-radius: 2px;
                animation: sound-wave 1s ease-in-out infinite;
            }
        `;
        document.head.appendChild(style);
        
        document.body.appendChild(audioVisualizer);
        
        // Remover após 5 segundos
        setTimeout(() => {
            if (audioVisualizer.parentNode) {
                audioVisualizer.parentNode.removeChild(audioVisualizer);
            }
        }, 5000);
    }
    
    // ===== SCROLL SUAVE =====
    
    function initSmoothScrolling() {
        // Adicionar scroll suave para links internos
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }
    
    // ===== EFEITO DE DIGITAÇÃO =====
    
    function initTypingEffect() {
        const title = document.querySelector('h1');
        if (title) {
            const text = title.textContent;
            title.textContent = '';
            
            let i = 0;
            const typeWriter = () => {
                if (i < text.length) {
                    title.textContent += text.charAt(i);
                    i++;
                    setTimeout(typeWriter, 100);
                }
            };
            
            // Iniciar após um delay
            setTimeout(typeWriter, 1000);
        }
    }
    
    // ===== EFEITOS PARALLAX =====
    
    function initParallaxEffects() {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallaxElements = document.querySelectorAll('.parallax');
            
            parallaxElements.forEach(element => {
                const speed = element.dataset.speed || 0.5;
                element.style.transform = `translateY(${scrolled * speed}px)`;
            });
        });
    }
    
    // ===== CONTADORES ANIMADOS =====
    
    function initCounters() {
        const counters = document.querySelectorAll('.counter');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        });
        
        counters.forEach(counter => {
            observer.observe(counter);
        });
    }
    
    function animateCounter(element) {
        const target = parseInt(element.dataset.target);
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            element.textContent = Math.floor(current);
            
            if (current >= target) {
                element.textContent = target;
                clearInterval(timer);
            }
        }, 16);
    }
    
    // ===== FUNÇÕES UTILITÁRIAS =====
    
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 20px;
            border-radius: 8px;
            color: white;
            font-weight: 500;
            z-index: 10000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            max-width: 300px;
        `;
        
        // Cores baseadas no tipo
        const colors = {
            success: 'linear-gradient(135deg, #10b981, #059669)',
            error: 'linear-gradient(135deg, #ef4444, #dc2626)',
            info: 'linear-gradient(135deg, #3b82f6, #2563eb)'
        };
        
        notification.style.background = colors[type] || colors.info;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        // Animar entrada
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Remover após 4 segundos
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 4000);
    }
    
    function showLoadingState(form) {
        const submitButton = form.querySelector('button[type="submit"]');
        const originalText = submitButton.innerHTML;
        
        submitButton.innerHTML = '<div class="spinner"></div> Enviando...';
        submitButton.disabled = true;
        
        // Armazenar texto original para restaurar depois
        submitButton.dataset.originalText = originalText;
    }
    
    function hideLoadingState(form) {
        const submitButton = form.querySelector('button[type="submit"]');
        const originalText = submitButton.dataset.originalText;
        
        submitButton.innerHTML = originalText;
        submitButton.disabled = false;
    }
    
    // ===== EFEITOS INTERATIVOS =====
    
    // Efeito de hover nos cards
    document.querySelectorAll('.hover-lift').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Efeito de clique nos botões
    document.querySelectorAll('button').forEach(button => {
        button.addEventListener('click', function() {
            // Efeito de ripple
            const ripple = document.createElement('span');
            ripple.className = 'ripple';
            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.6);
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
            `;
            
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = (event.clientX - rect.left - size / 2) + 'px';
            ripple.style.top = (event.clientY - rect.top - size / 2) + 'px';
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => {
                if (ripple.parentNode) {
                    ripple.parentNode.removeChild(ripple);
                }
            }, 600);
        });
    });
    
    // Adicionar animação de ripple
    const rippleStyle = document.createElement('style');
    rippleStyle.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(rippleStyle);
    
    // ===== PERFORMANCE E OTIMIZAÇÃO =====
    
    // Throttle para eventos de scroll
    function throttle(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
    
    // Debounce para eventos de resize
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
    
    // Otimização de performance para animações
    function optimizeAnimations() {
        // Usar requestAnimationFrame para animações suaves
        let ticking = false;
        
        function updateAnimations() {
            // Lógica de animações aqui
            ticking = false;
        }
        
        function requestTick() {
            if (!ticking) {
                requestAnimationFrame(updateAnimations);
                ticking = true;
            }
        }
        
        // Aplicar otimizações
        window.addEventListener('scroll', requestTick);
        window.addEventListener('resize', debounce(requestTick, 250));
    }
    
    // ===== ACESSIBILIDADE =====
    
    // Suporte a navegação por teclado
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-navigation');
        }
    });
    
    document.addEventListener('mousedown', function() {
        document.body.classList.remove('keyboard-navigation');
    });
    
    // ===== DEBUGGING =====
    
    // Log de inicialização
    console.log('🎵 Melodia App carregado com sucesso!');
    console.log('📱 Funcionalidades ativas:', {
        scrollAnimations: true,
        formHandling: true,
        particleEffects: true,
        musicPlayer: true,
        smoothScrolling: true,
        typingEffect: true,
        parallaxEffects: true,
        counters: true
    });
    
});

// ===== FUNÇÕES GLOBAIS =====

// Função para alternar tema (futura implementação)
function toggleTheme() {
    document.body.classList.toggle('dark-theme');
    localStorage.setItem('theme', document.body.classList.contains('dark-theme') ? 'dark' : 'light');
}

// Função para compartilhar
function shareApp() {
    if (navigator.share) {
        navigator.share({
            title: 'Melodia - Sua Música, Sua Forma',
            text: 'Descubra uma nova forma de viver a música!',
            url: window.location.href
        });
    } else {
        // Fallback para copiar URL
        navigator.clipboard.writeText(window.location.href).then(() => {
            alert('Link copiado para a área de transferência!');
        });
    }
}

// Função para reproduzir som de clique
function playClickSound() {
    // Criar um som de clique simples
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(400, audioContext.currentTime + 0.1);
    
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.1);
}

// ===== SCROLL-DRIVEN ANIMATIONS =====

// Verificar suporte para Scroll-driven Animations
function checkScrollDrivenSupport() {
    return CSS.supports('animation-timeline', 'scroll(root)');
}

// Inicializar Scroll-driven Animations
function initScrollDrivenAnimations() {
    if (!checkScrollDrivenSupport()) {
        console.log('Scroll-driven Animations não suportadas, usando fallback');
        return;
    }
    
    console.log('🎬 Scroll-driven Animations suportadas!');
    
    // Configurar timeline de scroll
    const scrollTimeline = new CSSScrollTimeline({
        source: document.documentElement,
        orientation: 'block',
        scrollOffsets: [
            { target: document.documentElement, edge: 'start', threshold: 0 },
            { target: document.documentElement, edge: 'end', threshold: 1 }
        ]
    });
    
    // Aplicar timeline aos elementos
    const animatedElements = document.querySelectorAll([
        '.scroll-fade-in',
        '.scroll-slide-left',
        '.scroll-slide-right', 
        '.scroll-scale',
        '.scroll-rotate',
        '.scroll-bounce',
        '.scroll-flip',
        '.scroll-parallax',
        '.scroll-gradient'
    ].join(','));
    
    animatedElements.forEach(element => {
        element.style.animationTimeline = 'scroll(root)';
    });
    
    // Configurar barra de progresso
    const progressBar = document.querySelector('.scroll-progress');
    if (progressBar) {
        progressBar.style.animationTimeline = 'scroll(root)';
    }
    
    // Adicionar efeitos especiais baseados em scroll
    initScrollEffects();
}

// Efeitos especiais baseados em scroll
function initScrollEffects() {
    // Efeito de parallax avançado
    window.addEventListener('scroll', throttle(() => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.scroll-parallax');
        
        parallaxElements.forEach((element, index) => {
            const speed = 0.5 + (index * 0.1);
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    }, 16));
    
    // Efeito de gradiente dinâmico
    window.addEventListener('scroll', throttle(() => {
        const scrolled = window.pageYOffset;
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = scrolled / maxScroll;
        
        const gradientElements = document.querySelectorAll('.scroll-gradient');
        gradientElements.forEach(element => {
            const hue = 280 + (scrollPercent * 60); // Varia de roxo para azul
            element.style.background = `linear-gradient(45deg, hsl(${hue}, 70%, 60%), hsl(${hue + 30}, 70%, 60%))`;
        });
    }, 16));
    
    // Efeito de escala baseado em scroll
    window.addEventListener('scroll', throttle(() => {
        const scrolled = window.pageYOffset;
        const windowHeight = window.innerHeight;
        
        const scaleElements = document.querySelectorAll('.scroll-scale');
        scaleElements.forEach(element => {
            const rect = element.getBoundingClientRect();
            const elementTop = rect.top;
            const elementHeight = rect.height;
            
            if (elementTop < windowHeight && elementTop > -elementHeight) {
                const progress = (windowHeight - elementTop) / (windowHeight + elementHeight);
                const scale = 0.8 + (progress * 0.2);
                element.style.transform = `scale(${scale})`;
            }
        });
    }, 16));
}

// ===== FUNCIONALIDADES DOS BOTÕES =====

function initButtons() {
    console.log('🔘 Inicializando funcionalidades dos botões...');
    
    // Botão principal "Ouvir Agora" no header
    const headerPlayButton = document.getElementById('playButton');
    if (headerPlayButton) {
        headerPlayButton.addEventListener('click', function() {
            showWelcomeModal();
        });
    }
    
    // Botão "Começar a ouvir" no hero
    const heroPlayButton = document.querySelector('#hero button:first-of-type');
    if (heroPlayButton) {
        heroPlayButton.addEventListener('click', function() {
            showWelcomeModal();
        });
    }
    
    // Botão "Ver planos" no hero
    const heroPlansButton = document.querySelector('#hero button:last-of-type');
    if (heroPlansButton) {
        heroPlansButton.addEventListener('click', function() {
            scrollToSection('contato');
        });
    }
    
    // Botões dos planos
    const freePlanButton = document.querySelector('#contato .fundo-branco');
    if (freePlanButton) {
        freePlanButton.addEventListener('click', function() {
            showPlanModal('Gratuito');
        });
    }
    
    const premiumPlanButton = document.querySelector('#contato .fundo-branco.texto-roxo-600');
    if (premiumPlanButton) {
        premiumPlanButton.addEventListener('click', function() {
            showPlanModal('Premium');
        });
    }
    
    // Botão de newsletter
    const newsletterButton = document.querySelector('#contato button[type="submit"]');
    if (newsletterButton) {
        newsletterButton.addEventListener('click', function(e) {
            e.preventDefault();
            handleNewsletterSignup();
        });
    }
    
    // Botões de cards de música (simulação)
    initMusicCardButtons();
}

// Modal de boas-vindas
function showWelcomeModal() {
    const modal = document.createElement('div');
    modal.className = 'fixo inset-0 fundo-preto/50 desfoque-fundo flex itens-centro justificar-centro z-50';
    modal.innerHTML = `
        <div class="fundo-cinza-800 arredondado-lg p-8 max-w-md mx-auto m-4">
            <div class="texto-centro mb-6">
                <div class="w-20 h-20 gradiente-roxo-rosa arredondado-completo mx-auto mb-4 flex itens-centro justificar-centro">
                    <i class="fas fa-music texto-branco text-3xl"></i>
                </div>
                <h3 class="text-2xl font-bold texto-branco mb-2">Bem-vindo ao Melodia!</h3>
                <p class="texto-cinza-300">Sua jornada musical começa aqui</p>
            </div>
            
            <div class="space-y-4 mb-6">
                <div class="fundo-cinza-700 arredondado-lg p-4">
                    <h4 class="texto-branco font-semibold mb-2">🎵 O que você pode fazer:</h4>
                    <ul class="texto-cinza-300 text-sm space-y-1">
                        <li>• Descobrir milhões de músicas</li>
                        <li>• Criar playlists personalizadas</li>
                        <li>• Encontrar novos artistas</li>
                        <li>• Ouvir com qualidade superior</li>
                    </ul>
                </div>
            </div>
            
            <div class="flex gap-3">
                <button class="flex-1 fundo-roxo-600 hover:fundo-roxo-700 texto-branco font-semibold py-3 px-4 arredondado-lg transicao-cores" onclick="this.closest('.fixo').remove(); scrollToSection('contato')">
                    <i class="fas fa-rocket mr-2"></i>
                    Começar Agora
                </button>
                <button class="flex-1 fundo-cinza-600 hover:fundo-cinza-700 texto-branco font-semibold py-3 px-4 arredondado-lg transicao-cores" onclick="this.closest('.fixo').remove()">
                    Explorar
                </button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Fechar modal ao clicar fora
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });
}

// Modal de planos
function showPlanModal(planType) {
    const modal = document.createElement('div');
    modal.className = 'fixo inset-0 fundo-preto/50 desfoque-fundo flex itens-centro justificar-centro z-50';
    
    const planDetails = planType === 'Premium' ? {
        price: 'R$ 19,90',
        features: [
            'Sem anúncios',
            'Qualidade superior',
            'Download offline',
            'IA musical avançada',
            'Suporte prioritário'
        ],
        color: 'from-purple-600 to-pink-600'
    } : {
        price: 'R$ 0',
        features: [
            'Músicas com anúncios',
            'Playlists personalizadas',
            'Qualidade padrão',
            'Suporte básico'
        ],
        color: 'from-gray-600 to-gray-700'
    };
    
    modal.innerHTML = `
        <div class="fundo-cinza-800 arredondado-lg p-8 max-w-md mx-auto m-4">
            <div class="texto-centro mb-6">
                <div class="w-20 h-20 gradiente-roxo-rosa arredondado-completo mx-auto mb-4 flex itens-centro justificar-centro">
                    <i class="fas fa-${planType === 'Premium' ? 'crown' : 'gift'} texto-branco text-3xl"></i>
                </div>
                <h3 class="text-2xl font-bold texto-branco mb-2">Plano ${planType}</h3>
                <div class="text-4xl font-bold texto-branco mb-2">${planDetails.price}<span class="text-lg texto-cinza-400">/mês</span></div>
            </div>
            
            <div class="space-y-3 mb-6">
                ${planDetails.features.map(feature => `
                    <div class="flex itens-centro texto-cinza-300">
                        <i class="fas fa-check texto-verde-500 mr-3"></i>
                        <span>${feature}</span>
                    </div>
                `).join('')}
            </div>
            
            <div class="flex gap-3">
                <button class="flex-1 fundo-roxo-600 hover:fundo-roxo-700 texto-branco font-semibold py-3 px-4 arredondado-lg transicao-cores" onclick="this.closest('.fixo').remove(); showSuccessMessage('${planType}')">
                    <i class="fas fa-credit-card mr-2"></i>
                    Assinar ${planType}
                </button>
                <button class="flex-1 fundo-cinza-600 hover:fundo-cinza-700 texto-branco font-semibold py-3 px-4 arredondado-lg transicao-cores" onclick="this.closest('.fixo').remove()">
                    Cancelar
                </button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Fechar modal ao clicar fora
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });
}

// Newsletter signup
function handleNewsletterSignup() {
    const emailInput = document.querySelector('#contato input[type="email"]');
    const email = emailInput.value.trim();
    
    if (!email) {
        showNotification('Por favor, digite seu e-mail.', 'error');
        return;
    }
    
    if (!isValidEmail(email)) {
        showNotification('Por favor, digite um e-mail válido.', 'error');
        return;
    }
    
    // Simular envio
    showNotification('Inscrição realizada com sucesso!', 'success');
    emailInput.value = '';
}

// Validar email
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notificação
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg transition-all duration-300 ${
        type === 'success' ? 'bg-green-600 text-white' :
        type === 'error' ? 'bg-red-600 text-white' :
        'bg-blue-600 text-white'
    }`;
    
    notification.innerHTML = `
        <div class="flex items-center">
            <i class="fas fa-${type === 'success' ? 'check' : type === 'error' ? 'exclamation-triangle' : 'info'} mr-2"></i>
            <span>${message}</span>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Remover após 3 segundos
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Mensagem de sucesso
function showSuccessMessage(planType) {
    showNotification(`Plano ${planType} ativado com sucesso! 🎉`, 'success');
}

// Scroll suave para seção
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

// Botões dos cards de música
function initMusicCardButtons() {
    // Adicionar eventos aos cards de música
    const musicCards = document.querySelectorAll('.bg-gray-800, .bg-gray-900');
    
    musicCards.forEach(card => {
        card.addEventListener('click', function() {
            const title = this.querySelector('h3, h4')?.textContent || 'Música';
            showMusicCardModal(title);
        });
    });
}

// Modal para cards de música
function showMusicCardModal(title) {
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50';
    modal.innerHTML = `
        <div class="bg-gray-800 rounded-lg p-8 max-w-md mx-auto m-4">
            <div class="text-center mb-6">
                <div class="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <i class="fas fa-music text-white text-3xl"></i>
                </div>
                <h3 class="text-2xl font-bold text-white mb-2">${title}</h3>
                <p class="text-gray-300">Recurso em desenvolvimento</p>
            </div>
            
            <div class="space-y-4 mb-6">
                <div class="bg-gray-700 rounded-lg p-4">
                    <h4 class="text-white font-semibold mb-2">🎵 Em breve:</h4>
                    <ul class="text-gray-300 text-sm space-y-1">
                        <li>• Player de música integrado</li>
                        <li>• Controles de reprodução</li>
                        <li>• Lista de reprodução</li>
                        <li>• Controle de volume</li>
                    </ul>
                </div>
            </div>
            
            <div class="flex gap-3">
                <button class="flex-1 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors" onclick="this.closest('.fixed').remove(); showNotification('Funcionalidade em desenvolvimento!', 'info')">
                    <i class="fas fa-play mr-2"></i>
                    Reproduzir
                </button>
                <button class="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors" onclick="this.closest('.fixed').remove()">
                    Fechar
                </button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Fechar modal ao clicar fora
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });
}
