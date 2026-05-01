document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Logika Buka Undangan & Swiper ---
    const btnOpen = document.getElementById('open-invitation');
    const coverPage = document.getElementById('cover-page');
    let swiperInstance = null;
    
    btnOpen.addEventListener('click', () => {
        // Efek transisi naik (slide up)
        coverPage.classList.add('opened');
        
        // Inisialisasi Swiper setelah diclick agar tidak bentrok
        if (!swiperInstance) {
            swiperInstance = new Swiper(".mySwiper", {
                direction: "vertical",
                pagination: {
                    el: ".swiper-pagination",
                    clickable: true,
                },
                mousewheel: true, // bisa dislide pake mouse wheel di desktop
                keyboard: {
                    enabled: true,
                },
                speed: 800, // Smooth transition
            });
        }
        
        // Mainkan musik
        const bgMusic = document.getElementById('bg-music');
        const musicBtn = document.getElementById('music-btn');
        
        if (bgMusic) {
            bgMusic.play().then(() => {
                musicBtn.classList.remove('hidden');
                musicBtn.classList.add('playing');
            }).catch(err => {
                console.log("Browser memblokir autoplay audio:", err);
                musicBtn.classList.remove('hidden');
                musicBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
            });
        }
        
        // Tunggu transisi selesai, lalu hilangkan elemen cover dari interaksi
        setTimeout(() => {
            coverPage.style.display = 'none';
        }, 1000);
    });

    // --- 2. Logika Hitung Mundur (Countdown) ---
    // Target Tanggal: 7 Juni 2026, Jam 16:00:00
    const countDownDate = new Date("Jun 7, 2026 16:00:00").getTime();

    const updateTimer = () => {
        const now = new Date().getTime();
        const distance = countDownDate - now;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById("days").innerText = days < 10 ? '0' + days : days;
        document.getElementById("hours").innerText = hours < 10 ? '0' + hours : hours;
        document.getElementById("minutes").innerText = minutes < 10 ? '0' + minutes : minutes;
        document.getElementById("seconds").innerText = seconds < 10 ? '0' + seconds : seconds;

        if (distance < 0) {
            clearInterval(timerInterval);
            document.getElementById("days").innerText = "00";
            document.getElementById("hours").innerText = "00";
            document.getElementById("minutes").innerText = "00";
            document.getElementById("seconds").innerText = "00";
        }
    };

    const timerInterval = setInterval(updateTimer, 1000);
    updateTimer(); 

    // --- 3. Logika Tombol Musik ---
    const musicBtn = document.getElementById('music-btn');
    const bgMusic = document.getElementById('bg-music');
    
    if (musicBtn && bgMusic) {
        musicBtn.addEventListener('click', () => {
            if (bgMusic.paused) {
                bgMusic.play();
                musicBtn.classList.add('playing');
                musicBtn.innerHTML = '<i class="fa-solid fa-compact-disc"></i>';
            } else {
                bgMusic.pause();
                musicBtn.classList.remove('playing');
                musicBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
            }
        });
    }
});

// --- 4. Fungsi Salin Nomor Rekening ---
function copyRekening(elementId) {
    const rekeningText = document.getElementById(elementId).innerText;
    navigator.clipboard.writeText(rekeningText).then(() => {
        alert("Nomor rekening berhasil disalin: " + rekeningText);
    }).catch(err => {
        console.error('Gagal menyalin teks: ', err);
        alert("Gagal menyalin. Silakan salin secara manual.");
    });
}
