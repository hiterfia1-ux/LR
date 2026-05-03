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
        speed: 800, // Slightly faster for responsiveness
        allowTouchMove: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        touchStartPreventDefault: false,
    });

    // 2. Audio logic
    const btnBuka = document.getElementById('btn-buka');
    const coverPage = document.getElementById('cover-page');
    const bgMusic = document.getElementById('bg-music');
    const musicBtn = document.getElementById('music-btn');
    const autoplayBtn = document.getElementById('autoplay-btn');

    let isPlaying = false;
    let isAutoPlaying = true;

    const togglePlay = () => {
        if (!bgMusic) return;
        if (isPlaying) {
            bgMusic.pause();
            isPlaying = false;
        } else {
            bgMusic.play();
            isPlaying = true;
        }
        updateMusicUI();
    };

    const updateMusicUI = () => {
        if (isPlaying) {
            musicBtn.classList.add('active', 'music-record-active');
        } else {
            musicBtn.classList.remove('active', 'music-record-active');
        }
    };

    if (musicBtn) {
        musicBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            togglePlay();
        });
    }

    if (btnBuka) {
        btnBuka.addEventListener('click', () => {
            coverPage.classList.add('opened');
            if (bgMusic) {
                bgMusic.play().then(() => {
                    isPlaying = true;
                    updateMusicUI();
                });
            }
            setTimeout(() => { coverPage.style.display = 'none'; }, 1000);
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
        const petalCount = 20; // Reduced count for performance

        for (let i = 0; i < petalCount; i++) {
            petals.push({
                x: Math.random() * width,
                y: Math.random() * height - height,
                size: Math.random() * 8 + 8,
                speedX: Math.random() * 1.5 - 0.75,
                speedY: Math.random() * 0.8 + 0.8,
                rotation: Math.random() * 360,
                rotationSpeed: Math.random() * 1.5 - 0.75
            });
        }

        function drawPetal(p) {
            ctx.save();
            ctx.translate(p.x, p.y);
            ctx.rotate((p.rotation * Math.PI) / 180);
            ctx.beginPath();
            ctx.ellipse(0, 0, p.size, p.size / 2, 0, 0, Math.PI * 2);
            ctx.fillStyle = "rgba(163, 140, 118, 0.35)";
            ctx.fill();
            ctx.restore();
        }

        let lastTime = 0;
        function updatePetals(time) {
            // Only animate if tab is visible to save battery/CPU
            if (document.hidden) {
                requestAnimationFrame(updatePetals);
                return;
            }

            // Cap at ~60fps
            if (time - lastTime < 16) {
                requestAnimationFrame(updatePetals);
                return;
            }
            lastTime = time;

            ctx.clearRect(0, 0, width, height);
            for (let i = 0; i < petalCount; i++) {
                let p = petals[i];
                p.x += p.speedX;
                p.y += p.speedY;
                p.rotation += p.rotationSpeed;

                if (p.y > height + 20) {
                    p.y = -20;
                    p.x = Math.random() * width;
                }
                if (p.x > width + 20) p.x = -20;
                if (p.x < -20) p.x = width + 20;

                drawPetal(p);
            }
            requestAnimationFrame(updatePetals);
        }

        requestAnimationFrame(updatePetals);
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

