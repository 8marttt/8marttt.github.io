// Floating Background
function createFloatingHearts() {
  const container = document.querySelector('.hearts-container');
  const hearts = ['🌸', '🌺', '🌷', '🌹', '✨'];
  setInterval(() => {
    const heart = document.createElement('span');
    heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
    heart.style.left = Math.random() * 100 + '%';
    heart.style.position = 'absolute';
    heart.style.fontSize = '20px';
    heart.style.animation = `float 10s linear`;
    container.appendChild(heart);
    setTimeout(() => heart.remove(), 10000);
  }, 1000);
}

// Link yaratma funksiyası
document.getElementById('creator-form')?.addEventListener('submit', function(e) {
  e.preventDefault();
  const name = document.getElementById('girl-name').value;
  const msg = document.getElementById('love-message').value;
  
  // LZString ilə datanı şifrələmək olar (burada sadə versiya)
  const baseUrl = window.location.href.split('index.html')[0];
  const finalLink = `${baseUrl}view.html?n=${encodeURIComponent(name)}&m=${encodeURIComponent(msg)}`;
  
  document.getElementById('link-text').innerText = finalLink;
  document.getElementById('link-result').style.display = 'block';
});

createFloatingHearts();

