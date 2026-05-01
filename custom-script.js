document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize Swiper
    const swiper = new Swiper('.mySwiper', {
        direction: 'horizontal',
        slidesPerView: 1,
        spaceBetween: 0,
        mousewheel: true,
        keyboard: {
            enabled: true,
        },
        parallax: true,
        speed: 1500, // Kecepatan lebih lambat agar halus
        allowTouchMove: true,
        effect: 'creative',
        creativeEffect: {
            limitProgress: 2,
            prev: {
                shadow: false,
                translate: ['-100%', 0, -100],
                rotate: [0, 0, -20], // Efek mengelupas halus
                opacity: 0,
            },
            next: {
                translate: ['100%', 0, 0],
            },
        },
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        touchStartPreventDefault: false,
    });

    // 2. Audio & Playlist logic
    const btnBuka = document.getElementById('btn-buka');
    const coverPage = document.getElementById('cover-page');
    const bgMusic = document.getElementById('bg-music');
    const musicBtn = document.getElementById('music-btn');
    const autoplayBtn = document.getElementById('autoplay-btn');

    // Playlist lagu
    const playlist = ['lagu.mp3', 'lagu2.mp3', 'lagu3.mp3']; // Tambahkan nama file lagu di sini
    let currentTrack = 0;
    let isPlaying = false;
    let isAutoPlaying = true;

    const loadTrack = (index) => {
        if (bgMusic) {
            bgMusic.src = playlist[index];
            bgMusic.load();
        }
    };

    // Load lagu pertama
    loadTrack(currentTrack);

    const playNextTrack = () => {
        currentTrack = (currentTrack + 1) % playlist.length;
        loadTrack(currentTrack);
        bgMusic.play().catch(e => console.log("Playback failed:", e));
    };

    if (bgMusic) {
        bgMusic.addEventListener('ended', playNextTrack);
    }

    if (btnBuka) {
        btnBuka.addEventListener('click', () => {
            coverPage.classList.add('opened');
            if (bgMusic) {
                bgMusic.play().then(() => {
                    isPlaying = true;
                    if (musicBtn) {
                        musicBtn.classList.add('active');
                        musicBtn.innerHTML = '<i class="fas fa-music"></i>';
                    }
                }).catch(err => {
                    console.log("Autoplay prevented", err);
                });
            }
            setTimeout(() => { coverPage.style.display = 'none'; }, 1000);
        });
    }

    if (musicBtn && bgMusic) {
        musicBtn.addEventListener('click', () => {
            if (isPlaying) {
                bgMusic.pause();
                musicBtn.classList.remove('active');
                musicBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
            } else {
                bgMusic.play();
                musicBtn.classList.add('active');
                musicBtn.innerHTML = '<i class="fas fa-music"></i>';
            }
            isPlaying = !isPlaying;
        });
    }

    // Toggle Autoplay
    if (autoplayBtn) {
        autoplayBtn.addEventListener('click', () => {
            if (isAutoPlaying) {
                swiper.autoplay.stop();
                autoplayBtn.classList.remove('active');
            } else {
                swiper.autoplay.start();
                autoplayBtn.classList.add('active');
            }
            isAutoPlaying = !isAutoPlaying;
        });
    }

    // 3. Countdown Timer (7 Juni 2026 16:00:00)
    const countDownDate = new Date("Jun 7, 2026 16:00:00").getTime();

    const updateCountdown = () => {
        const now = new Date().getTime();
        const distance = countDownDate - now;

        if (distance < 0) {
            document.getElementById("cd-days").innerText = "00";
            document.getElementById("cd-hours").innerText = "00";
            document.getElementById("cd-minutes").innerText = "00";
            document.getElementById("cd-seconds").innerText = "00";
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        const elDays = document.getElementById("cd-days");
        if (elDays) {
            elDays.innerText = days < 10 ? "0" + days : days;
            document.getElementById("cd-hours").innerText = hours < 10 ? "0" + hours : hours;
            document.getElementById("cd-minutes").innerText = minutes < 10 ? "0" + minutes : minutes;
            document.getElementById("cd-seconds").innerText = seconds < 10 ? "0" + seconds : seconds;
        }
    };

    setInterval(updateCountdown, 1000);
    updateCountdown();

    // 4. Falling Petals Effect (Canvas)
    const canvas = document.getElementById("bg-canvas");
    if (canvas) {
        const ctx = canvas.getContext("2d");
        const container = document.getElementById("app-container") || document.body;
        let width = canvas.width = container.clientWidth;
        let height = canvas.height = container.clientHeight;

        window.addEventListener('resize', () => {
            width = canvas.width = container.clientWidth;
            height = canvas.height = container.clientHeight;
        });

        const petals = [];
        const petalCount = 40; // Number of petals

        for (let i = 0; i < petalCount; i++) {
            petals.push({
                x: Math.random() * width,
                y: Math.random() * height - height,
                size: Math.random() * 10 + 10,
                speedX: Math.random() * 2 - 1,
                speedY: Math.random() * 1 + 1,
                rotation: Math.random() * 360,
                rotationSpeed: Math.random() * 2 - 1
            });
        }

        function drawPetal(p) {
            ctx.save();
            ctx.translate(p.x, p.y);
            ctx.rotate((p.rotation * Math.PI) / 180);
            ctx.beginPath();
            // Draw an elegant soft petal shape
            ctx.ellipse(0, 0, p.size, p.size / 1.8, 0, 0, Math.PI * 2);
            // Soft brown / goldish color for the light theme
            ctx.fillStyle = "rgba(163, 140, 118, 0.4)";
            ctx.fill();
            ctx.restore();
        }

        function updatePetals() {
            ctx.clearRect(0, 0, width, height);
            for (let i = 0; i < petalCount; i++) {
                let p = petals[i];
                p.x += p.speedX;
                p.y += p.speedY;
                p.rotation += p.rotationSpeed;

                if (p.y > height) {
                    p.y = -20;
                    p.x = Math.random() * width;
                }
                if (p.x > width + 20) p.x = -20;
                if (p.x < -20) p.x = width + 20;

                drawPetal(p);
            }
            requestAnimationFrame(updatePetals);
        }

        updatePetals();
    }
});

// Copy to Clipboard Function for Gift Section
function copyToClipboard(text, btn) {
    navigator.clipboard.writeText(text).then(() => {
        const originalText = btn.innerHTML;
        btn.innerHTML = '<i class="fas fa-check"></i> Tersalin';
        btn.style.background = '#ffffff';
        btn.style.color = '#6c2331';

        setTimeout(() => {
            btn.innerHTML = originalText;
            btn.style.background = '';
            btn.style.color = '';
        }, 2000);
    }).catch(err => {
        console.error('Failed to copy!', err);
    });
}

function copyToClipboardIcon(text, btn) {
    navigator.clipboard.writeText(text).then(() => {
        btn.classList.add('copied');
        btn.innerHTML = ''; // Clear the far fa-copy icon, CSS will show checkmark

        setTimeout(() => {
            btn.classList.remove('copied');
            btn.innerHTML = '<i class="far fa-copy"></i>';
        }, 2000);
    }).catch(err => {
        console.error('Failed to copy!', err);
    });
}

// RSVP Form Submission Handler
const rsvpForm = document.getElementById('rsvpForm');
if (rsvpForm) {
    rsvpForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const name = document.getElementById('rsvpName').value;
        const status = document.getElementById('rsvpStatus').value;
        const msg = document.getElementById('rsvpMsg').value;

        // Example: Sending to WhatsApp
        const waNumber = "6281234567890"; // Ganti dengan nomor WhatsApp mempelai
        const waText = `Halo, saya ${name}.%0A%0AKonfirmasi Kehadiran: *${status}*%0A%0APesan/Doa:%0A${msg}`;
        const waLink = `https://wa.me/${waNumber}?text=${waText}`;

        // Open WhatsApp
        window.open(waLink, '_blank');

        // Reset form
        this.reset();

        // Change button text temporarily
        const btn = this.querySelector('.btn-submit');
        const origText = btn.innerHTML;
        btn.innerHTML = '<i class="fas fa-check"></i> Terkirim';
        setTimeout(() => {
            btn.innerHTML = origText;
        }, 3000);
    });
}
