console.log('big baba console nachricht')

document.getElementById('refreshBtn').addEventListener('click', () => {
    const img = document.getElementById('randomFace');
    img.src = `https://thispersondoesnotexist.com/?t=${Date.now()}`;
});