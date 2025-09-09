let count = 0;
let multiplier = 1;

const cookieBtn = document.getElementById('cookieBtn');
const countDisplay = document.getElementById('count');
const clickSound = new Audio('click.mp3');
const message = document.getElementById('message'); // animated message element

let messageVisible = false; // prevent spamming the message

// Click cookie
cookieBtn.addEventListener('click', () => {
    count += multiplier;
    countDisplay.textContent = count;

    // Play click sound
    const clickSoundClone = clickSound.cloneNode();
    clickSoundClone.play();

    // Create falling cookie
    const cookie = document.createElement('img');
    cookie.src = 'cookie.png';
    cookie.classList.add('falling-cookie');

    // Random horizontal position
    const randomX = Math.random() * (window.innerWidth - 40);
    cookie.style.left = randomX + 'px';
    cookie.style.top = '0px';
    document.body.appendChild(cookie);

    // Animate falling
    setTimeout(() => {
        cookie.style.transform = `translateY(500px) rotate(${Math.random() * 360}deg)`;
        cookie.style.opacity = 0;
    }, 10);

    setTimeout(() => cookie.remove(), 1510);
});

// Handle upgrades
const upgrades = document.querySelectorAll('.upgrade');
upgrades.forEach(upg => {
    upg.dataset.baseCost = upg.dataset.cost;

    upg.addEventListener('click', () => {
        let cost = parseInt(upg.dataset.cost);
        const mult = parseInt(upg.dataset.multiplier);

        if (count >= cost) {
            // Buy upgrade
            count -= cost;
            multiplier += mult; // stack multiplier
            countDisplay.textContent = count;

            // Scale price
            cost = Math.floor(cost * 1.5);
            upg.dataset.cost = cost;

            // Update button text
            upg.textContent = `${upg.textContent.split('(')[0]}(${cost} 🍪)`;
        } else {
            // Inside the else block for not enough cookies
            if (!messageVisible) {
                messageVisible = true;

                // Apply bounce up animation
                message.style.animation = 'bounceUp 0.6s forwards';

                // After a short delay, bounce down
                setTimeout(() => {
                    message.style.animation = 'bounceDown 0.6s forwards';
                    // unlock after animation finishes
                    setTimeout(() => {
                        messageVisible = false;
                    }, 600);
                }, 900); // message stays for ~0.9s before bouncing down
            }

        }
    });
});
