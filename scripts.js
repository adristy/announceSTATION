document.addEventListener('DOMContentLoaded', () => {
    let database = [];

    // Fetch data from JSON file
    fetch('datasemifinal.json')
        .then(response => response.json())
        .then(data => {
            database = data;
        })
        .catch(error => console.error('Error fetching the JSON data:', error));

    const announcementForm = document.querySelector('.input-form');
    const resultDiv = document.createElement('div');
    const titleElement = document.querySelector('.title'); // Element for "ELIMINATION ROUND"
    const subtitleElement = document.querySelector('.subtitle'); // Element for "ANNOUNCEMENT"

    resultDiv.id = 'result';
    resultDiv.style.color = 'white'; 
    resultDiv.style.marginTop = '10px'; 
    document.querySelector('.announcement-section').appendChild(resultDiv);

    announcementForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const nomorPesertaInput = document.getElementById('nomor-peserta').value.trim();

        // Check if input is a number
        if (!/^\d+$/.test(nomorPesertaInput)) {
            resultDiv.innerHTML = '<p class="error" style="font-size: 14px; color: red;">Nomor Peserta harus berupa angka.</p>';
            return;
        }

        // Check if NoPeserta exists in the database
        const team = database.find(entry => entry.NoPeserta.toString() === nomorPesertaInput);

        // Hide the form and the title and subtitle after submission
        announcementForm.style.display = 'none';
        titleElement.style.display = 'none'; 
        subtitleElement.style.display = 'none';

        // Set text alignment to left after submission
        resultDiv.style.textAlign = 'left';

        if (team) {
            const nilai = team.Nilai; // Mengambil nilai dari database
            if (team.Keterangan === "Lolos") {
                resultDiv.innerHTML = `
                    <h1>Hello, ${team.NamaTim}!</h1>
                    <h3><strong class="approve"> Selamat! </strong> Tim kamu berhasil melangkah ke babak selanjutnya: <strong style="font-style: italic;"> Semifinal. </strong></h3>
                    <p>Nilai tim kamu: <strong>${nilai}</strong> <em>(Hasil Akumulasi Nilai Peserta dengan Switch Tab yang tercatat)</em></p>
                    <p>Kami mengharapkan konfirmasi tim kamu dengan cara menghubungi <strong style="font-style: italic;">Contact Person</strong> di bawah ini:<br>
                    <p>
                        <strong>Raihan Abiyyu Briantama</strong><br>
                        WA: <a href="https://wa.me/6282116132950">0821 1613 2950</a><br>
                        <strong>Gilang Hanif Hendrawan</strong><br>
                        WA: <a href="https://wa.me/6288803505896">0888 0350 5896</a>
                    </p>

                    <p><em>See you soon in Surabaya</em> ^-^</p>
                `;
            } else if (team.Keterangan === "Tidak") {
                resultDiv.innerHTML = `
                    <h1>Hello, ${team.NamaTim}!</h1>
                    <h3><span class="reject">Maaf,</span> dengan berat hati kami mengumumkan bahwa tim kamu gagal melangkah baik ke dalam babak Semifinal maupun <em>waiting list.</em></h3>
                    <p>Nilai tim kamu: <strong>${nilai}</strong> <em>(Hasil Akumulasi Nilai Peserta dengan Switch Tab yang tercatat)</em></p>
                    <p>Namun, jangan berkecil hati karena masih terdapat banyak kesempatan di luar sana yang dapat mewadahi skill dan potensi kamu!</p>
                    <p><em>We do like to wish your tim good luck for the future and hope you will reach your success soon!</em></p>
                `;
            } else if (team.Keterangan === "Waiting") {
                resultDiv.innerHTML = `
                    <h1>Hello, ${team.NamaTim}!</h1>
                    <h3>Kami dari Pekan Raya Statistika 2024 ingin mengumumkan bahwa tim kamu masuk ke dalam <span class="waiting" style="font-style: italic;">waiting list semifinal</span> STATION 2024.</h3>
                    <p>Nilai tim kamu: <strong>${nilai}</strong> <em>(Hasil Akumulasi Nilai Peserta dengan Switch Tab yang tercatat)</em></p>
                    <p>Kami akan menghubungi perwakilan dari tim kamu jika terdapat <em>slot</em> yang tersedia sebagai <em>Semifinalist</em>.</p>
                    <p><em>Please wait for the good news until <strong>31st August 2024, at 23:59</strong></em> ^-^</p>
                `;
            }
        } else {
            resultDiv.innerHTML = `
                <h1>Maaf!</h1>
                <p>Nomor Peserta yang Anda masukkan <strong style="color: red;">tidak ditemukan</strong>. Silakan periksa kembali nomor yang Anda masukkan.</p>
                <p>Jika Anda merasa ini adalah kesalahan, hubungi panitia di </p>
                <p>
                        <strong>Fairuz Afghan Bahari</strong><br>
                        WA: <a href="https://wa.me/6281515284076">0815 1528 4076</a><br>
                        <strong>Mawar Jannah Ghaliyah</strong><br>
                        WA: <a href="https://wa.me/6285933447994">0859 3344 7994</a><br>
                    </p>
            `;
        }
    });

    // Function to change footer image based on screen width
    function updateFooterImage() {
        const footerImage = document.querySelector('.footer img');
        if (window.innerWidth <= 767) {
            footerImage.src = 'images/footermobile.png';
        } else {
            footerImage.src = 'images/footer.svg';
        }
    }

    // Initial check
    updateFooterImage();

    // Listen for window resize to update the image
    window.addEventListener('resize', updateFooterImage);
});
