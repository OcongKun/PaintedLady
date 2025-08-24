document.addEventListener("DOMContentLoaded", () => {
    
    const treeTrunkElement = document.querySelector(".tree-trunk");
    const leafCanopyElement = document.querySelector(".leaf-canopy");
    const messageBox = document.getElementById("final-message");
    const mainMessageElement = document.getElementById("main-message"); 

    const messages = [
        "HIIII PINAAAA, SELAMAT ULANG TAHUN YANG KE-19!!! 🎉🎂🎈",
        "Semoga hari ini kamu dipeluk hangat oleh semua yang kamu cintai. Aku nggak tahu apakah aku termasuk di lingkaran itu, tapi dari jauh aku tetap mendoakanmu dengan tulus. Kamu selalu punya cara untuk bikin dunia jadi sedikit lebih terang, bahkan ketika aku cuma bisa melihat dari sudut bayangan.",
        "Semoga tahun yang ke-19 ini membawa kamu ke banyak hal baik yang kamu tunggu-tunggu. Aku ga tahu apa aja yang udah kamu lalui belakangan ini, tapi aku yakin kamu udah berjuang keras sampai bisa berdiri di titik sekarang.",
        "Aku cuma mau bilang... ",
        "Terimakasih karena pernah jadi bagian dari cerita hidupku, sekecil apapun itu. Ada hal-hal yang nggak bisa aku ucapin langsung, tapi di balik semua diam, aku tetap berharap yang terbaik buat kamu.",
        "Semoga kamu sehat, dikelilingi orang-orang yang bikin kamu merasa cukup, dan semoga kamu selalu menemukan alasan untuk tersenyum, bahkan di hari-hari paling sepi.",
        "Jadi, selamat ulang tahun ya, Pinaa. Semoga hari ini dan seterusnya, kamu selalu dikelilingi oleh cinta, tawa, dan kebahagiaan. Kamu layak dapetin semua itu.",
        "Selamat bertambah umur, Pinaaaa. Tetaplah jadi kamu yang kuat, yang hangat, yang selalu meninggalkan kesan di hati orang lain, termasuk aku.",
        "Dan ingat, di balik semua ini, ada seseorang yang selalu mendoakan yang terbaik untukmu, meskipun dari kejauhan. Semoga hari-harimu ke depan penuh dengan petualangan baru, tawa yang tulus, dan cinta yang mendalam.",
        "Happy B'day, Pinaa! 🎉🎂 Semoga hari-harimu selalu cerah dan penuh kebahagiaan!",
        "Kamu pasti bisa tamatin game Stikes ini meski dengan nerf Hemophobia WKWKWK",
        "Dulu aku sempet buat kayak gini pas kamu ulang tahun ke-18, tapi ilmu ku masih cetek wkwk. Jadi ya begituu deh. Sekarang aku udah belajar banyak hal, jadi aku coba buat lagi yang lebih baik, meski hasilnya masih jauh dari kepuasan wkwwk",
        "Aku harap kamu suka dengan semua usaha yang aku lakukan untuk bikin ini. Aku pengen banget bikin sesuatu yang spesial buat kamu, walaupun aku nggak yakin ini bakal sesuai harapanmu atau ngga wkwkw.",
        "Terimakasih sudah membaca sampe sini, semoga kamu suka yaa :D"
    ];
    let currentMessageIndex = 0; 

    const countdownTimerElement = document.getElementById("countdown-timer");
    const ageMessageElement = document.getElementById("age-message");
    const birthdayContainer = document.getElementById("birthday-effect-container");
    const music = document.getElementById("background-music");
    let birthdayModeActivated = false;

    document.body.addEventListener("click", () => {
        if (music.paused) {
            music.play().catch(e => console.error("Audio playback failed:", e));
        }
    }, { once: true });

    setTimeout(() => {
        treeTrunkElement.style.height = "250px";
    }, 1000);

    setTimeout(() => {
        leafCanopyElement.style.transform = "scale(1)";
        createPixelCanopy(2000);
    }, 2500);

    setTimeout(() => {
        messageBox.style.opacity = "1";
        mainMessageElement.textContent = messages[0];
        currentMessageIndex = 1;
        startTimer();
    }, 4000);

    messageBox.addEventListener('click', () => {
        mainMessageElement.style.opacity = 0;

        setTimeout(() => {
            mainMessageElement.textContent = messages[currentMessageIndex];
            mainMessageElement.style.opacity = 1;
            currentMessageIndex = (currentMessageIndex + 1) % messages.length;
        }, 400);
    });

    function createPixelCanopy(pixelCount) {
        const colors = ["#C54B8C", "#FF5CCD", "#A94064", "#C154C1", "#ff00a9"];
        const canopyWidth = leafCanopyElement.offsetWidth;
        const canopyHeight = leafCanopyElement.offsetHeight;
        const fragment = document.createDocumentFragment();
        const maxRadius = Math.min(canopyWidth, canopyHeight) * 0.45;
        for (let i = 0; i < pixelCount; i++) {
            const pixel = document.createElement("div");
            pixel.classList.add("pixel");
            let angle = Math.random() * 2 * Math.PI;
            let radius = maxRadius * Math.sqrt(Math.random());
            let x = radius * Math.cos(angle);
            let y = radius * Math.sin(angle);
            pixel.style.left = `${canopyWidth / 2 + x}px`;
            pixel.style.top = `${canopyHeight / 2 + y}px`;
            pixel.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            fragment.appendChild(pixel);
            setTimeout(() => { pixel.style.opacity = "1"; }, Math.random() * 2000);
        }
        leafCanopyElement.appendChild(fragment);
    }

    function startTimer() {
        const startDate = new Date("2006-08-25T00:00:00");
        setInterval(() => {
            const now = new Date();
            const diff = now - startDate;
            const days = Math.floor(diff / 86400000);
            const hours = Math.floor((diff % 86400000) / 3600000);
            const minutes = Math.floor((diff % 3600000) / 60000);
            const seconds = Math.floor((diff % 60000) / 1000);
            countdownTimerElement.textContent = `Sudah menempuh: ${days} hari, ${hours} jam, ${minutes} menit, ${seconds} detik`;
            let age = now.getFullYear() - startDate.getFullYear();
            const monthDiff = now.getMonth() - startDate.getMonth();
            if (monthDiff < 0 || (monthDiff === 0 && now.getDate() < startDate.getDate())) {
                age--;
            }
            ageMessageElement.textContent = `(Usia kamu: ${age} tahun)`;
            if (age >= 18 && !birthdayModeActivated) {
                birthdayModeActivated = true;
                activateBirthdayMode();
            }
        }, 1000);
    }

    function activateBirthdayMode() {
        document.body.classList.add("birthday-mode");
        setInterval(createMatrixText, 400);
        document.body.addEventListener("click", createFireworksOnClick);
    }

    function createMatrixText() {
        const text = document.createElement("div");
        text.classList.add("matrix-text");
        text.textContent = "Happy Birthday!!!";
        text.style.left = `${Math.random() * 95}vw`;
        text.style.animationDuration = `${Math.random() * 10 + 10}s`;
        birthdayContainer.appendChild(text);
        setTimeout(() => text.remove(), 20000);
    }

    function createFireworksOnClick(e) {
        if (!messageBox.contains(e.target)) {
            for (let i = 0; i < 30; i++) {
                const particle = document.createElement("div");
                particle.classList.add("firework-particle");
                const angle = Math.random() * 360;
                const distance = Math.random() * 100 + 50;
                particle.style.width = `${Math.random() * 4 + 1}px`;
                particle.style.height = particle.style.width;
                particle.style.left = `${e.clientX}px`;
                particle.style.top = `${e.clientY}px`;
                document.body.appendChild(particle);
                const targetX = e.clientX + distance * Math.cos((angle * Math.PI) / 180);
                const targetY = e.clientY + distance * Math.sin((angle * Math.PI) / 180);
                particle.animate([
                    { transform: 'translate(0, 0)', opacity: 1 },
                    { transform: `translate(${targetX - e.clientX}px, ${targetY - e.clientY}px)`, opacity: 0 }
                ], {
                    duration: 800,
                    easing: 'ease-out'
                }).onfinish = () => particle.remove();
            }
        }
    }

});

