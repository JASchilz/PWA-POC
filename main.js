// --- CONFIG ---
// Replace this with your hosted MP3 URL (absolute URL recommended)
const AUDIO_URL = 'https://jaschilz.github.io/PWA-POC/example.mp3';

// --- SETUP ---
const player = document.getElementById('player');
const playPauseBtn = document.getElementById('playPauseBtn');
player.src = AUDIO_URL;

// --- PLAY / PAUSE ---
playPauseBtn.addEventListener('click', async () => {
  if (player.paused) {
    try {
      await player.play();
      playPauseBtn.textContent = 'Pause';
    } catch (err) {
      console.error('Playback failed:', err);
    }
  } else {
    player.pause();
    playPauseBtn.textContent = 'Play';
  }
});

// --- MEDIA SESSION API ---
// Enables lock-screen + headset play/pause controls
if ('mediaSession' in navigator) {
  navigator.mediaSession.metadata = new MediaMetadata({
    title: 'Sample Audiobook',
    artist: 'Unknown',
    album: 'Proof of Concept',
  });

  navigator.mediaSession.setActionHandler('play', () => {
    player.play();
    playPauseBtn.textContent = 'Pause';
  });
  navigator.mediaSession.setActionHandler('pause', () => {
    player.pause();
    playPauseBtn.textContent = 'Play';
  });
}

// --- REGISTER SERVICE WORKER ---
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('service-worker.js')
    .then(() => console.log('Service worker registered'))
    .catch(err => console.error('SW registration failed', err));
}
