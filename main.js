
const CONFIG = {
    password: 'ayomide',
    birthdayDate: new Date('2026-06-16T00:00:00'),
    particles: {
        count: 30,
        colors: ['#B76E79', '#FF69B4', '#D4AF37', '#C5A3FF', '#FFE4E1']
    },
    hearts: {
        floatingCount: 15,
        trailDelay: 100
    },
    confetti: {
        count: 150,
        duration: 3000
    }
};


function randomBetween(min, max) {
    return Math.random() * (max - min) + min;
}

function randomColor(colors) {
    return colors[Math.floor(Math.random() * colors.length)];
}


class ParticleSystem {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.particles = [];
        this.init();
    }

    init() {
        for (let i = 0; i < CONFIG.particles.count; i++) {
            this.createParticle();
        }
    }

    createParticle() {
        const particle = document.createElement('div');
        particle.className = 'particle';
        const size = randomBetween(3, 8);
        const color = randomColor(CONFIG.particles.colors);

        particle.style.cssText = `
            width: ${size}px;
            height: ${size}px;
            background: ${color};
            left: ${randomBetween(0, 100)}%;
            top: ${randomBetween(0, 100)}%;
            animation-duration: ${randomBetween(10, 20)}s;
            animation-delay: ${randomBetween(0, 10)}s;
            box-shadow: 0 0 ${size * 2}px ${color};
        `;

        this.container.appendChild(particle);
        this.particles.push(particle);
    }
}


class FloatingHeartsSystem {
    constructor() {
        this.container = document.getElementById('floating-hearts-container');
        this.init();
    }

    init() {
        for (let i = 0; i < CONFIG.hearts.floatingCount; i++) {
            setTimeout(() => this.createFloatingHeart(), i * 2000);
        }
        setInterval(() => this.createFloatingHeart(), 2000);
    }

    createFloatingHeart() {
        const heart = document.createElement('div');
        heart.className = 'floating-heart';
        heart.innerHTML = '&#10084;';

        const size = randomBetween(15, 30);
        const color = randomColor(['#B76E79', '#FF69B4', '#D4AF37', '#FFC0CB']);

        heart.style.cssText = `
            left: ${randomBetween(5, 95)}%;
            font-size: ${size}px;
            color: ${color};
            animation-duration: ${randomBetween(8, 15)}s;
            animation-delay: ${randomBetween(0, 2)}s;
            opacity: ${randomBetween(0.3, 0.7)};
        `;

        this.container.appendChild(heart);

        setTimeout(() => {
            heart.remove();
        }, 18000);
    }
}


class CursorTrail {
    constructor() {
        this.lastTime = 0;
        this.enabled = false;
        this.init();
    }

    init() {
        document.addEventListener('mousemove', (e) => {
            if (!this.enabled) return;

            const now = Date.now();
            if (now - this.lastTime > CONFIG.hearts.trailDelay) {
                this.createHeartTrail(e.clientX, e.clientY);
                this.lastTime = now;
            }
        });
    }

    enable() {
        this.enabled = true;
    }

    createHeartTrail(x, y) {
        const heart = document.createElement('div');
        heart.className = 'cursor-heart';
        heart.innerHTML = '&#10084;';
        heart.style.cssText = `
            left: ${x - 10}px;
            top: ${y - 10}px;
            color: ${randomColor(['#B76E79', '#FF69B4', '#D4AF37'])};
        `;

        document.body.appendChild(heart);

        setTimeout(() => heart.remove(), 1000);
    }
}


class ClickBurst {
    constructor() {
        this.enabled = false;
        this.init();
    }

    init() {
        document.addEventListener('click', (e) => {
            if (!this.enabled) return;
            if (e.target.closest('button, input, a, .gallery-item')) return;

            this.createBurst(e.clientX, e.clientY);
        });
    }

    enable() {
        this.enabled = true;
    }

    createBurst(x, y) {
        const count = randomBetween(5, 10);

        for (let i = 0; i < count; i++) {
            const heart = document.createElement('div');
            heart.className = 'click-heart';
            heart.innerHTML = '&#10084;';

            const angle = (i / count) * 360;
            const distance = randomBetween(50, 100);
            const endX = x + Math.cos(angle * Math.PI / 180) * distance;
            const endY = y + Math.sin(angle * Math.PI / 180) * distance;

            heart.style.cssText = `
                left: ${x}px;
                top: ${y}px;
                color: ${randomColor(['#B76E79', '#FF69B4', '#D4AF37', '#C5A3FF'])};
            `;

            document.body.appendChild(heart);

            setTimeout(() => {
                heart.style.transform = `translate(${endX - x}px, ${endY - y}px) scale(0)`;
                heart.style.opacity = '0';
            }, 10);

            setTimeout(() => heart.remove(), 800);
        }
    }
}


class ConfettiSystem {
    constructor() {
        this.container = document.getElementById('confetti-container');
    }

    burst() {
        const colors = ['#B76E79', '#FF69B4', '#D4AF37', '#C5A3FF', '#FFE4E1', '#87CEEB'];

        for (let i = 0; i < CONFIG.confetti.count; i++) {
            setTimeout(() => {
                const confetti = document.createElement('div');
                confetti.className = 'confetti';

                const size = randomBetween(8, 15);
                const color = randomColor(colors);

                confetti.style.cssText = `
                    left: ${randomBetween(0, 100)}%;
                    width: ${size}px;
                    height: ${size * 0.6}px;
                    background: ${color};
                    animation-duration: ${randomBetween(2, 4)}s;
                `;

                this.container.appendChild(confetti);

                setTimeout(() => confetti.remove(), 5000);
            }, i * 20);
        }
    }
}


class SparkleSystem {
    constructor() {
        this.container = document.getElementById('sparkle-overlay');
    }

    burst() {
        for (let i = 0; i < 50; i++) {
            setTimeout(() => {
                const sparkle = document.createElement('div');
                sparkle.className = 'sparkle';

                const x = randomBetween(0, window.innerWidth);
                const y = randomBetween(0, window.innerHeight);

                sparkle.style.cssText = `
                    left: ${x}px;
                    top: ${y}px;
                    animation-delay: ${randomBetween(0, 0.5)}s;
                `;

                this.container.appendChild(sparkle);

                setTimeout(() => sparkle.remove(), 1500);
            }, i * 30);
        }
    }
}

class HeartExplosion {
    constructor() {
        this.container = document.getElementById('heart-explosion');
    }

    burst() {
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;

        for (let i = 0; i < 30; i++) {
            const heart = document.createElement('span');
            heart.innerHTML = '&#10084;';

            const angle = (i / 30) * 360;
            const distance = randomBetween(100, 300);
            const duration = randomBetween(0.8, 1.5);

            heart.style.cssText = `
                position: absolute;
                font-size: ${randomBetween(20, 40)}px;
                color: ${randomColor(['#B76E79', '#FF69B4', '#D4AF37', '#C5A3FF'])};
                left: 50%;
                top: 50%;
                transform: translate(-50%, -50%);
                animation: heartExplode ${duration}s ease-out forwards;
                --tx: ${Math.cos(angle * Math.PI / 180) * distance}px;
                --ty: ${Math.sin(angle * Math.PI / 180) * distance}px;
            `;

            this.container.appendChild(heart);

            setTimeout(() => heart.remove(), duration * 1000);
        }
    }
}

// Add heart explosion keyframes via style tag
const styleSheet = document.createElement('style');
styleSheet.textContent = `
    @keyframes heartExplode {
        0% {
            transform: translate(-50%, -50%) scale(0);
            opacity: 1;
        }
        100% {
            transform: translate(calc(-50% + var(--tx)), calc(-50% + var(--ty))) scale(1);
            opacity: 0;
        }
    }
`;
document.head.appendChild(styleSheet);


class LockScreen {
    constructor() {
        this.lockScreen = document.getElementById('lock-screen');
        this.passwordInput = document.getElementById('password-input');
        this.unlockBtn = document.getElementById('unlock-btn');
        this.errorMessage = document.getElementById('error-message');
        this.unlockAnimation = document.getElementById('unlock-animation');
        this.mainContent = document.getElementById('main-content');

        this.init();
    }

    init() {
        this.unlockBtn.addEventListener('click', () => this.attemptUnlock());
        this.passwordInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.attemptUnlock();
        });

        // Shake on error animation
        this.passwordInput.addEventListener('input', () => {
            this.errorMessage.classList.remove('show');
        });
    }

    attemptUnlock() {
        const password = this.passwordInput.value.toLowerCase().trim();

        if (password === CONFIG.password) {
            this.unlock();
        } else {
            this.showError();
        }
    }

    showError() {
        this.errorMessage.classList.add('show');
        this.lockScreen.style.animation = 'shake 0.5s ease';
        setTimeout(() => {
            this.lockScreen.style.animation = '';
        }, 500);
    }

    async unlock() {
        this.lockScreen.classList.add('unlocked');
        this.unlockAnimation.classList.add('active');

        const heartExplosion = new HeartExplosion();
        const sparkles = new SparkleSystem();
        const confetti = new ConfettiSystem();

        heartExplosion.burst();
        setTimeout(() => sparkles.burst(), 300);
        setTimeout(() => confetti.burst(), 500);

        setTimeout(() => {
            const music = document.getElementById('bg-music');
            music.play().catch(() => {});
            document.getElementById('music-btn').classList.add('playing');
        }, 1000);

        setTimeout(() => {
            this.unlockAnimation.classList.remove('active');
            this.mainContent.classList.remove('hidden');
            this.mainContent.classList.add('visible');
        }, 2000);

        cursorTrail.enable();
        clickBurst.enable();
    }
}

const shakeSheet = document.createElement('style');
shakeSheet.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
        20%, 40%, 60%, 80% { transform: translateX(5px); }
    }
`;
document.head.appendChild(shakeSheet);


class MusicController {
    constructor() {
        this.music = document.getElementById('bg-music');
        this.btn = document.getElementById('music-btn');
        this.isPlaying = false;

        this.init();
    }

    init() {
        this.btn.addEventListener('click', () => this.toggle());

        // Auto-play attempt (will be blocked by browser until user interaction)
        this.music.addEventListener('canplaythrough', () => {
            // Music will be played after unlock
        });
    }

    toggle() {
        if (this.isPlaying) {
            this.pause();
        } else {
            this.play();
        }
    }

    play() {
        this.music.play().then(() => {
            this.isPlaying = true;
            this.btn.classList.add('playing');
        }).catch(() => {});
    }

    pause() {
        this.music.pause();
        this.isPlaying = false;
        this.btn.classList.remove('playing');
    }
}


class CountdownTimer {
    constructor() {
        this.daysEl = document.getElementById('days');
        this.hoursEl = document.getElementById('hours');
        this.minutesEl = document.getElementById('minutes');
        this.secondsEl = document.getElementById('seconds');

        this.update();
        setInterval(() => this.update(), 1000);
    }

    update() {
        const now = new Date();
        const diff = CONFIG.birthdayDate - now;

        if (diff <= 0) {
            this.daysEl.textContent = '00';
            this.hoursEl.textContent = '00';
            this.minutesEl.textContent = '00';
            this.secondsEl.textContent = '00';
            return;
        }

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        this.daysEl.textContent = String(days).padStart(2, '0');
        this.hoursEl.textContent = String(hours).padStart(2, '0');
        this.minutesEl.textContent = String(minutes).padStart(2, '0');
        this.secondsEl.textContent = String(seconds).padStart(2, '0');
    }
}


class Lightbox {
    constructor() {
        this.lightbox = document.getElementById('lightbox');
        this.img = document.getElementById('lightbox-img');
        this.video = document.getElementById('lightbox-video');
        this.caption = document.getElementById('lightbox-caption');
        this.closeBtn = document.getElementById('lightbox-close');
        this.prevBtn = document.getElementById('lightbox-prev');
        this.nextBtn = document.getElementById('lightbox-next');

        this.items = [];
        this.currentIndex = 0;

        this.init();
    }

    init() {
        const galleryItems = document.querySelectorAll('.gallery-item');

        galleryItems.forEach((item, index) => {
            this.items.push(item);

            item.addEventListener('click', () => {
                this.open(index);
            });
        });

        this.closeBtn.addEventListener('click', () => this.close());
        this.prevBtn.addEventListener('click', () => this.prev());
        this.nextBtn.addEventListener('click', () => this.next());

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (this.lightbox.classList.contains('hidden')) return;

            if (e.key === 'Escape') this.close();
            if (e.key === 'ArrowLeft') this.prev();
            if (e.key === 'ArrowRight') this.next();
        });

        // Close on background click
        this.lightbox.addEventListener('click', (e) => {
            if (e.target === this.lightbox) this.close();
        });
    }

    open(index) {
        this.currentIndex = index;
        this.showItem();
        this.lightbox.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }

    close() {
        this.lightbox.classList.add('hidden');
        this.video.pause();
        this.video.style.display = 'none';
        this.img.style.display = 'none';
        document.body.style.overflow = '';
    }

    prev() {
        this.video.pause();
        this.currentIndex = (this.currentIndex - 1 + this.items.length) % this.items.length;
        this.showItem();
    }

    next() {
        this.video.pause();
        this.currentIndex = (this.currentIndex + 1) % this.items.length;
        this.showItem();
    }

    showItem() {
        const item = this.items[this.currentIndex];
        const caption = item.querySelector('.gallery-caption')?.textContent || '';
        const isVideo = item.dataset.type === 'videos';

        if (isVideo) {
            const video = item.querySelector('video');
            this.img.style.display = 'none';
            this.video.style.display = 'block';
            this.video.src = video.src;
            this.video.play();
        } else {
            const img = item.querySelector('img');
            this.video.style.display = 'none';
            this.img.style.display = 'block';
            this.img.src = img.src;
        }

        this.caption.textContent = caption;
    }
}


class GalleryFilter {
    constructor() {
        this.filterBtns = document.querySelectorAll('.filter-btn');
        this.items = document.querySelectorAll('.gallery-item');

        this.init();
    }

    init() {
        this.filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const filter = btn.dataset.filter;

                // Update active button
                this.filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                // Filter items
                this.items.forEach(item => {
                    if (filter === 'all' || item.dataset.type === filter) {
                        item.style.display = '';
                        item.style.animation = 'fadeIn 0.5s ease forwards';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
    }
}


class TimelineAnimation {
    constructor() {
        this.items = document.querySelectorAll('.timeline-item[data-animate]');
        this.init();
    }

    init() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, {
            threshold: 0.2,
            rootMargin: '0px 0px -50px 0px'
        });

        this.items.forEach(item => observer.observe(item));
    }
}


class LetterAnimation {
    constructor() {
        this.envelope = document.querySelector('.letter-envelope');
        this.card = document.querySelector('.letter-card');
        this.init();
    }

    init() {
        this.envelope.addEventListener('click', () => {
            this.envelope.classList.add('opened');
            setTimeout(() => {
                this.card.classList.add('visible');
            }, 600);
        });
    }
}


class FinalSection {
    constructor() {
        this.title = document.getElementById('final-title');
        this.message = document.getElementById('final-message');
        this.btn = document.getElementById('reveal-btn');
        this.revealed = false;

        this.init();
    }

    init() {
        this.btn.addEventListener('click', () => this.reveal());
        this.title.style.cursor = 'pointer';
        this.title.addEventListener('click', () => this.reveal());
    }

    reveal() {
        if (this.revealed) return;
        this.revealed = true;

        this.btn.style.display = 'none';
        this.message.classList.remove('hidden');

        // Add celebration
        const confetti = new ConfettiSystem();
        confetti.burst();
    }
}


class HeroHearts {
    constructor() {
        this.container = document.getElementById('hero-hearts');
        this.init();
    }

    init() {
        for (let i = 0; i < 20; i++) {
            const heart = document.createElement('div');
            heart.className = 'hero-heart';
            heart.innerHTML = '&#10084;';

            heart.style.cssText = `
                left: ${randomBetween(5, 95)}%;
                top: ${randomBetween(5, 80)}%;
                font-size: ${randomBetween(20, 40)}px;
                color: ${randomColor(['#B76E7933', '#FF69B433', '#D4AF3733'])};
                animation-delay: ${randomBetween(0, 2)}s;
            `;

            this.container.appendChild(heart);
        }
    }
}


class ParallaxEffect {
    constructor() {
        this.elements = document.querySelectorAll('.hero-content, .hero-hearts');
        this.init();
    }

    init() {
        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY;

            this.elements.forEach(el => {
                const speed = el.dataset.speed || 0.5;
                el.style.transform = `translateY(${scrollY * speed}px)`;
            });
        });
    }
}


class SmoothScroll {
    constructor() {
        this.init();
    }

    init() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }
}


class SectionReveal {
    constructor() {
        this.sections = document.querySelectorAll('section');
        this.init();
    }

    init() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, {
            threshold: 0.1
        });

        this.sections.forEach(section => observer.observe(section));
    }
}


class TypewriterEffect {
    constructor(element, text, speed = 100) {
        this.element = element;
        this.text = text;
        this.speed = speed;
        this.index = 0;
    }

    start() {
        this.element.textContent = '';
        this.type();
    }

    type() {
        if (this.index < this.text.length) {
            this.element.textContent += this.text.charAt(this.index);
            this.index++;
            setTimeout(() => this.type(), this.speed);
        }
    }
}


function setupPlaceholderImages() {
    const images = document.querySelectorAll('.gallery-item img');
    const videos = document.querySelectorAll('.gallery-item video');

    images.forEach((img, index) => {
        const colors = ['#B76E79', '#FF69B4', '#D4AF37', '#C5A3FF', '#FFE4E1'];
        const color1 = colors[index % colors.length];
        const color2 = colors[(index + 1) % colors.length];

        img.onerror = function() {
            // Create SVG placeholder on error
            const canvas = document.createElement('canvas');
            canvas.width = 400;
            canvas.height = 400;
            const ctx = canvas.getContext('2d');

            const gradient = ctx.createLinearGradient(0, 0, 400, 400);
            gradient.addColorStop(0, color1);
            gradient.addColorStop(1, color2);
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, 400, 400);

            // Add heart
            ctx.font = '80px Arial';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillStyle = 'rgba(255,255,255,0.3)';
            ctx.fillText('\u2764', 200, 180);

            // Add text
            ctx.font = '18px Arial';
            ctx.fillStyle = 'rgba(255,255,255,0.7)';
            ctx.fillText('Photo ' + (index + 1), 200, 240);

            img.src = canvas.toDataURL();
        };

        if (!img.complete) {
            img.src = img.src;
        }
    });

    videos.forEach((video, index) => {
        video.onerror = function() {
            const poster = document.createElement('canvas');
            poster.width = 400;
            poster.height = 400;
            const ctx = poster.getContext('2d');

            const colors = ['#B76E79', '#FF69B4', '#D4AF37', '#C5A3FF', '#FFE4E1'];
            const color1 = colors[index % colors.length];
            const color2 = colors[(index + 1) % colors.length];

            const gradient = ctx.createLinearGradient(0, 0, 400, 400);
            gradient.addColorStop(0, color1);
            gradient.addColorStop(1, color2);
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, 400, 400);

            ctx.font = '60px Arial';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillStyle = 'rgba(255,255,255,0.5)';
            ctx.fillText('\u25B6', 200, 200);

            ctx.font = '18px Arial';
            ctx.fillStyle = 'rgba(255,255,255,0.7)';
            ctx.fillText('Video ' + (index + 1), 200, 280);

            // Replace video with image
            const img = document.createElement('img');
            img.src = poster.toDataURL();
            img.alt = 'Video Placeholder';
            video.parentNode.replaceChild(img, video);
        };
    });
}


// Global instances
let cursorTrail;
let clickBurst;

document.addEventListener('DOMContentLoaded', () => {
    cursorTrail = new CursorTrail();
    clickBurst = new ClickBurst();

    // Initialize lock screen
    const lockScreen = new LockScreen();

    // Initialize floating elements
    const particles = new ParticleSystem('particles-container');
    const floatingHearts = new FloatingHeartsSystem();

    const musicController = new MusicController();

    // Initialize countdown
    const countdown = new CountdownTimer();

    // Initialize gallery
    const lightbox = new Lightbox();
    const galleryFilter = new GalleryFilter();

    // Initialize timeline
    const timelineAnimation = new TimelineAnimation();

    // Initialize letter
    const letterAnimation = new LetterAnimation();

    // Initialize final section
    const finalSection = new FinalSection();

    // Initialize hero hearts
    const heroHearts = new HeroHearts();

    // Initialize smooth scroll
    const smoothScroll = new SmoothScroll();

    // Initialize section reveal
    const sectionReveal = new SectionReveal();

    // Setup placeholder images
    setupPlaceholderImages();
});

document.addEventListener('DOMContentLoaded', () => {
    const videoItems = document.querySelectorAll('.gallery-item[data-type="videos"]');

    videoItems.forEach(item => {
        const video = item.querySelector('video');

        item.addEventListener('mouseenter', () => {
            video.play().catch(() => {});
        });

        item.addEventListener('mouseleave', () => {
            video.pause();
            video.currentTime = 0;
        });
    });
});
