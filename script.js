function reveal() {
    var reveals = document.querySelectorAll(".reveal");
    for (var i = 0; i < reveals.length; i++) {
        var windowHeight = window.innerHeight;
        var elementTop = reveals[i].getBoundingClientRect().top;
        var elementVisible = 100;
        if (elementTop < windowHeight - elementVisible) {
            reveals[i].classList.add("active");
        }
    }
}
window.addEventListener("scroll", reveal);
reveal(); // Panggil saat halaman dimuat

// Fungsi pesanan terhubung ke WhatsApp
function orderItem(itemName) {
    // Ganti angka 6281234567890 di bawah dengan nomor WhatsApp Admin kalian yang aktif
    const noWA = "6281234567890";
    const pesan = encodeURIComponent("Halo Admin Chef's Kiss! Saya mau Pre-Order: " + itemName);
    window.open(`https://wa.me/${noWA}?text=${pesan}`, "_blank");
}