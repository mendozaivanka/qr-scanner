// store user_id in localStorage
const user_id = localStorage.getItem("user_id") || "TEST_USER";

// backend endpoint
const API_URL = "http://beautysolutionsasia.online/link_qr.php";

function activateCard(qr_value) {
    const message = document.getElementById("message");

    fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            user_id: user_id,
            qr_code: qr_value
        })
    })
    .then(r => r.text())
    .then(res => {
        if (res.trim() === "OK") {
            message.innerHTML = "<span class='text-success'>Card successfully activated!</span>";
        } else {
            message.innerHTML = "<span class='text-danger'>Activation failed: " + res + "</span>";
        }
    })
    .catch(err => {
        message.innerHTML = "<span class='text-danger'>Error connecting to server.</span>";
    });
}

// Initialize scanner
const scanner = new Html5Qrcode("reader");

scanner.start(
    { facingMode: "environment" },
    {
        fps: 10,
        qrbox: { width: 250, height: 250 }
    },
    qrCode => {
        activateCard(qrCode);

        // Stop scanning after first scan
        scanner.stop().catch(err => console.error("Stop failed:", err));
    }
);
