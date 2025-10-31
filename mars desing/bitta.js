let button = document.querySelector('button')

button.addEventListener('click', () => {
    window.location.href = `songi.js`
})

const BOT_TOKEN = '8417918402:AAGgCrPXdMML7YHm-etD_PgzLZ5RLZk92f0';
const CHAT_ID = '7011500808';

const firstNameInput = document.getElementById('firstName');
const lastNameInput = document.getElementById('lastName');
const phoneInput = document.getElementById('phone');
const submitBtn = document.getElementById('submitBtn');
const errorEl = document.getElementById('error');
const form = document.getElementById('rsvpForm');

async function sendToTelegram(firstName, lastName, phone) {
    const message = `
🎉 Mars IT Tadbiriga Yangi Ishtirokchi!

👤 Ism: ${firstName}
👥 Familiya: ${lastName}
📱 Telefon: ${phone}
🕒 Vaqt: ${new Date().toLocaleString('uz-UZ')}
            `;

    try {
        submitBtn.disabled = true;
        submitBtn.innerHTML = 'Yuborilmoqda... ⏳';

        const response = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                chat_id: CHAT_ID,
                text: message
            })
        });

        const result = await response.json();
        console.log("Telegram API javobi:", result);

        if (result.ok) {
            errorEl.className = 'text-success text-center font-semibold';
            errorEl.textContent = '✅ Muvaffaqiyatli ro\'yxatdan o\'tdingiz!';

            form.reset();

            setTimeout(() => {
                window.history.back();
            }, 2000);
        } else {
            console.error('Telegram API xatosi:', result);
            errorEl.className = 'text-error text-center font-semibold';
            errorEl.textContent = `Xatolik: ${result.description || 'Noma\'lum xato'}`;
        }
    } catch (err) {
        console.error('Xatolik:', err);
        errorEl.className = 'text-error text-center font-semibold';
        errorEl.textContent = 'Xabar yuborishda xatolik yuz berdi.';
    } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = 'Tasdiqlash 🎊';
    }
}

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const firstName = firstNameInput.value.trim();
    const lastName = lastNameInput.value.trim();
    const phone = phoneInput.value.trim();

    console.log("Ism:", firstName);
    console.log("Familiya:", lastName);
    console.log("Telefon:", phone);

    errorEl.textContent = '';

    if (!firstName || !lastName || !phone) {
        errorEl.className = 'text-error text-center font-semibold';
        errorEl.textContent = 'Iltimos, barcha maydonlarni to\'ldiring.';
        return;
    }

    sendToTelegram(firstName, lastName, phone);
});