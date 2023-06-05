const spotifyPlayer = document.getElementById('container-music');

spotifyPlayer.addEventListener('click', () => {
  const player = spotifyPlayer.contentWindow.document.getElementById('app-player');
  console.log('hola');

  if (player) {
    const isPlaying = player.getAttribute('aria-checked') === 'true';

    if (isPlaying) {
      player.querySelector('[data-testid="control-pause"]').click();
    } else {
      player.querySelector('[data-testid="control-play"]').click();
    }
  }
});
