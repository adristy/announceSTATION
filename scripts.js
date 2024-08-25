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
    resultDiv.style.marginTop = '20px'; 
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
            if (team.Keterangan === "Lolos") {
                resultDiv.innerHTML = `
                    <h1>Hello, ${team.NamaTim}!</h1>
                    <h3><strong class="approve"> Selamat! </strong> Tim kamu berhasil melangkah ke babak selanjutnya: <strong style="font-style: italic;"> Semifinal. </strong></h3>
                    <p>Kami mengharapkan konfirmasi tim kamu dengan cara menghubungi <strong style="font-style: italic;">Contact Person</strong> di bawah ini:<br>
                    <p>
                        <strong>Fairuz Afghan Bahari</strong><br>
                        WA : 0815 1528 4076 / Line : fairuzafghann<br>
                        <strong>Mawar Jannah Ghaliyah</strong><br>
                        WA : 0859 3344 7994 / Line : mawarjannah
                    </p>
                    <p style="font-style: italic;">See you soon in Surabaya!</p>
                `;
            } else if (team.Keterangan === "Tidak") {
                resultDiv.innerHTML = `
                    <h1>Hello, ${team.NamaTim}!</h1>
                    <h3><span class="reject">Maaf,</span> dengan berat hati kami mengumumkan bahwa tim kamu gagal melangkah baik ke dalam babak Semifinal maupun <em>waiting list.</em></h3>
                    <p>Namun, jangan berkecil hati karena masih terdapat banyak kesempatan di luar sana yang dapat mewadahi skill dan potensi kamu!</p>
                    <p><em>We do like to wish your tim good luck for the future and hope you will reach your success soon!</em></p>
                `;
            } else if (team.Keterangan === "Waiting") {
                resultDiv.innerHTML = `
                    <h1>Hello, ${team.NamaTim}!</h1>
                    <h3>Kami dari Pekan Raya Statistika 2024 ingin mengumumkan bahwa tim kamu masuk ke dalam <span class="waiting" style="font-style: italic;">waiting list semifinal</span> STATION 2024.</h3>
                    <p>Kami akan menghubungi perwakilan dari tim kamu jika terdapat <em>spot</em> yang tersedia sebagai <em>Semifinalist</em>.</p>
                    <p style="font-style: italic;">Please wait for the good news until <strong>September 2nd!</strong></p>
                `;
            }
        } else {
            resultDiv.innerHTML = `
                <h1>Maaf!</h1>
                <p>Nomor Peserta yang Anda masukkan <strong style="color: red;">tidak ditemukan</strong>. Silakan periksa kembali nomor yang Anda masukkan.</p>
                <p>Jika Anda merasa ini adalah kesalahan, hubungi panitia di <a href="mailto:contact@example.com">contact@example.com</a>.</p>
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
