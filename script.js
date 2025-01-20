// Mendapatkan elemen dari HTML
const startBtn = document.getElementById("submitBtn");
const openingScene = document.getElementById("opening-scene");
const scene1 = document.getElementById("scene1");
const scene2 = document.getElementById("scene2");
const yesBtn = document.querySelector(".yes-btn");
const noBtn = document.querySelector(".no-btn");
const question = document.querySelector(".question");
const igVideo = document.getElementById("igVideo"); // Ambil elemen video untuk 0120.mp4
const scene2Audio = document.getElementById("scene2-audio");
const backgroundAudio = document.getElementById("background-audio");

// Event listener untuk tombol submit
startBtn.addEventListener("click", () => {
    const name = document.getElementById('userName').value;
    if (name) {
        // Simpan nama di local storage
        localStorage.setItem('userName', name);
        console.log("Nama yang dimasukkan: " + name);
        
        // Kirim nama ke server
        fetch('http://localhost:3000/send-email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: name })
        })
        .then(response => response.json())
        .then(data => {
            console.log(data.message); // Tampilkan pesan setelah menyimpan
        })
        .catch(error => {
            console.error('Error saving name:', error);
        });

        // Sembunyikan scene pembukaan
        openingScene.style.display = "none";
        
        // Tampilkan scene 1
        scene1.style.display = "block"; // Pastikan scene1 ditampilkan
        
        // Memutar audio untuk scene 1
        backgroundAudio.play().catch(error => {
            console.log("Pemutaran audio scene 1 gagal: ", error);
        });
    } else {
        alert("NAMA NJIR.");
    }
});

// Mengubah teks dan video ketika tombol Yes diklik
yesBtn.addEventListener("click", () => {
    console.log("Tombol gakk!! diklik"); // Log untuk debugging

    // Hentikan audio untuk scene 1
    backgroundAudio.pause();
    backgroundAudio.currentTime = 0;

    // Sembunyikan scene 1 dan tampilkan scene 2
    scene1.style.display = "none";
    scene2.style.display = "block";

    // Memutar video
    igVideo.play().catch(error => {
        console.log("Pemutaran video gagal: ", error);
    });

    // Memutar audio untuk scene 2
    scene2Audio.play().catch(error => {
        console.log("Pemutaran audio scene 2 gagal: ", error);
    });
});

// Mengubah teks dan video ketika tombol No diklik
noBtn.addEventListener("click", () => {
    console.log("Tombol BANGET diklik"); // Log untuk debugging

    // Hentikan audio untuk scene 1
    backgroundAudio.pause();
    backgroundAudio.currentTime = 0;

    // Sembunyikan scene 1
    scene1.style.display = "none";

    // Tampilkan scene 2
    scene2.style.display = "block";

    // Memutar video
    igVideo.play().catch(error => {
        console.log("Pemutaran video gagal: ", error);
    });

    // Memutar audio untuk scene 2
    scene2Audio.play().catch(error => {
        console.log("Pemutaran audio scene 2 gagal: ", error);
    });
});

// Fungsi untuk mengambil dan menampilkan nama-nama
function fetchAndDisplayNames() {
    fetch('http://localhost:3000/get-names')
        .then(response => response.json())
        .then(names => {
            const namesList = document.getElementById('namesList');
            namesList.innerHTML = ''; // Kosongkan daftar sebelumnya
            names.forEach(name => {
                const listItem = document.createElement('li');
                listItem.textContent = name;
                namesList.appendChild(listItem);
            });
        })
        .catch(error => {
            console.error('Error fetching names:', error);
        });
}

// Panggil fungsi untuk mengambil dan menampilkan nama-nama saat halaman dimuat
window.onload = fetchAndDisplayNames;

// Membuat tombol No bergerak secara acak saat hover
noBtn.addEventListener("mouseover", () => {
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const noBtnRect = noBtn.getBoundingClientRect();

    // Hitung posisi maksimum untuk memastikan tombol tetap berada di dalam viewport
    const maxX = viewportWidth - noBtnRect.width;
    const maxY = viewportHeight - noBtnRect.height;

    // Hitung posisi acak di dalam batas viewport
    const randomX = Math.floor(Math.random() * maxX);
    const randomY = Math.floor(Math.random() * maxY);

    noBtn.style.position = "fixed"; // Pastikan posisi tombol adalah fixed
    noBtn.style.left = randomX + "px";
    noBtn.style.top = randomY + "px";
});
