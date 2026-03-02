// ========== 8 Mart Core Logic ==========

// 1. Arxa fon çiçək animasiyası
function createFloatingHearts() {
  const container = document.querySelector('.hearts-container');
  if (!container) return;
  const hearts = ['🌸', '🌺', '🌷', '🌹', '✨', '💜'];
  setInterval(() => {
    const heart = document.createElement('span');
    heart.className = 'floating-heart';
    heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
    heart.style.left = Math.random() * 100 + '%';
    heart.style.fontSize = (Math.random() * 15 + 15) + 'px';
    container.appendChild(heart);
    setTimeout(() => heart.remove(), 10000);
  }, 1500);
}

// 2. Çarx Parametrləri
const gifts = [
  { name: 'Böyük Buket 💐', color: '#9b32dc', emoji: '💐' },
  { name: 'Şam Yeməyi 🕯️', color: '#ff6b9d', emoji: '🕯️' },
  { name: 'Xüsusi Parfüm ✨', color: '#ffd700', emoji: '✨' },
  { name: 'SPA Günü 🧖‍♀️', color: '#e91e63', emoji: '🧖‍♀️' },
  { name: 'Şokolad Qutusu 🍫', color: '#ffaa00', emoji: '🍫' },
  { name: 'Sürpriz Hədiyyə 🎁', color: '#ff5c8d', emoji: '🎁' }
];

let startAngle = 0;
const arc = Math.PI / (gifts.length / 2);
let spinTimeout = null;
let spinAngleStart = 10;
let spinTime = 0;
let spinTimeTotal = 0;

function drawWheel() {
  const canvas = document.getElementById("wheel-canvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  const outsideRadius = 150;
  const textRadius = 110;
  const insideRadius = 40;

  ctx.clearRect(0,0,320,320);
  for(let i = 0; i < gifts.length; i++) {
    const angle = startAngle + i * arc;
    ctx.fillStyle = gifts[i].color;
    ctx.beginPath();
    ctx.arc(160, 160, outsideRadius, angle, angle + arc, false);
    ctx.arc(160, 160, insideRadius, angle + arc, angle, true);
    ctx.fill();
    ctx.save();
    ctx.fillStyle = "white";
    ctx.translate(160 + Math.cos(angle + arc / 2) * textRadius, 160 + Math.sin(angle + arc / 2) * textRadius);
    ctx.rotate(angle + arc / 2 + Math.PI / 2);
    ctx.fillText(gifts[i].name, -ctx.measureText(gifts[i].name).width / 2, 0);
    ctx.restore();
  }
}

function spinWheel() {
  spinAngleStart = Math.random() * 10 + 10;
  spinTime = 0;
  spinTimeTotal = Math.random() * 3 + 4 * 1000;
  rotateWheel();
}

function rotateWheel() {
  spinTime += 30;
  if(spinTime >= spinTimeTotal) {
    stopRotateWheel();
    return;
  }
  const spinAngle = spinAngleStart - easeOut(spinTime, 0, spinAngleStart, spinTimeTotal);
  startAngle += (spinAngle * Math.PI / 180);
  drawWheel();
  spinTimeout = setTimeout(rotateWheel, 30);
}

function stopRotateWheel() {
  clearTimeout(spinTimeout);
  const degrees = startAngle * 180 / Math.PI + 90;
  const arcd = arc * 180 / Math.PI;
  const index = Math.floor((360 - degrees % 360) / arcd);
  const gift = gifts[index];
  
  document.getElementById('result-section').style.display = 'block';
  document.getElementById('gift-name-display').innerText = gift.name;
  document.getElementById('gift-emoji-display').innerText = gift.emoji;
}

function easeOut(t, b, c, d) {
  const ts = (t /= d) * t;
  const tc = ts * t;
  return b + c * (tc + -3 * ts + 3 * t);
}

// 3. Linkdən Məlumatı Oxumaq
window.onload = function() {
  createFloatingHearts();
  drawWheel();
  
  const urlParams = new URLSearchParams(window.location.search);
  const data = urlParams.get('d');
  
  if (data) {
    const decoded = JSON.parse(LZString.decompressFromEncodedURIComponent(data));
    document.getElementById('girl-name-display').innerText = decoded.n;
    document.getElementById('love-message-display').innerText = decoded.m;
    
    // Loader-i bağlamaq (Gift box klikləndə)
    document.getElementById('gift-box-container').onclick = function() {
        document.getElementById('gift-box-lid').style.transform = 'translateY(-100px) rotate(-20deg)';
        setTimeout(() => {
            document.querySelector('.page-loader').style.opacity = '0';
            setTimeout(() => document.querySelector('.page-loader').remove(), 800);
        }, 500);
    };
  }
};
