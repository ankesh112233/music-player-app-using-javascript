// Song and playlist data
let songs = [
    { id: 1, name: 'Song 1', artist: 'Artist 1', genre: 'Pop', image: 'image1.jpg', url: 'song1.mp3' },
    { id: 2, name: 'Song 2', artist: 'Artist 2', genre: 'Rock', image: 'image2.jpg', url: 'song2.mp3' },
    { id: 3, name: 'Song 3', artist: 'Artist 3', genre: 'Jazz', image: 'image3.jpg', url: 'song3.mp3' },
    // ... More songs
  ];
  
  let playlists = [];
  
  let currentSongIndex = -1; // Keep track of the current song
  let isPlaying = false; // Track whether the song is playing
  
  // Elements
  const songListContainer = document.getElementById('song-list');
  const currentSongInfo = document.getElementById('current-song-info');
  const currentSongImage = document.getElementById('current-song-image');
  const songNameElement = document.getElementById('song-name');
  const songArtistElement = document.getElementById('song-artist');
  const prevButton = document.getElementById('prev-song');
  const playPauseButton = document.getElementById('play-pause');
  const nextButton = document.getElementById('next-song');
  const addToPlaylistButton = document.getElementById('add-to-playlist');
  const playlistListContainer = document.getElementById('playlist-list');
  const themeToggleButton = document.getElementById('toggle-theme');
  
  // Render songs list
  function renderSongsList() {
    songListContainer.innerHTML = '';
    songs.forEach((song) => {
      const songCard = document.createElement('div');
      songCard.classList.add('song-card');
      songCard.innerHTML = `
        <img src="${song.image}" alt="${song.name}">
        <h4>${song.name}</h4>
        <p>${song.artist}</p>
      `;
      songCard.addEventListener('click', () => playSong(song.id));
      songListContainer.appendChild(songCard);
    });
  }
  
  // Play song
  function playSong(songId) {
    currentSongIndex = songs.findIndex(song => song.id === songId);
    const currentSong = songs[currentSongIndex];
    songNameElement.textContent = currentSong.name;
    songArtistElement.textContent = currentSong.artist;
    currentSongImage.src = currentSong.image;
    
    // Logic for playing the song
    isPlaying = true;
    playPauseButton.textContent = 'Pause';
    // Add logic to play the audio using an audio player
  }
  
  // Play/Pause button toggle
  playPauseButton.addEventListener('click', () => {
    if (isPlaying) {
      // Pause the song
      playPauseButton.textContent = 'Play';
      isPlaying = false;
    } else {
      // Play the song
      playPauseButton.textContent = 'Pause';
      isPlaying = true;
    }
  });
  
  // Prev and Next buttons
  prevButton.addEventListener('click', () => {
    if (currentSongIndex > 0) {
      playSong(songs[currentSongIndex - 1].id);
    }
  });
  
  nextButton.addEventListener('click', () => {
    if (currentSongIndex < songs.length - 1) {
      playSong(songs[currentSongIndex + 1].id);
    }
  });
  
  // Add to playlist
  addToPlaylistButton.addEventListener('click', () => {
    const playlistName = prompt("Enter playlist name:");
    if (playlistName) {
      const playlist = { name: playlistName, songs: [songs[currentSongIndex]] };
      playlists.push(playlist);
      renderPlaylists();
    }
  });
  
  // Render playlists
  function renderPlaylists() {
    playlistListContainer.innerHTML = '';
    playlists.forEach((playlist, index) => {
      const playlistCard = document.createElement('div');
      playlistCard.classList.add('playlist-card');
      playlistCard.innerHTML = `
        <h4>${playlist.name}</h4>
        <button onclick="viewPlaylist(${index})">View</button>
      `;
      playlistListContainer.appendChild(playlistCard);
    });
  }
  
  // View playlist
  function viewPlaylist(index) {
    const playlist = playlists[index];
    alert(`Playlist: ${playlist.name}\nSongs: ${playlist.songs.map(song => song.name).join(', ')}`);
  }
  
  // Toggle theme
  themeToggleButton.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
    document.body.classList.toggle('light-theme');
  });
  
  // Initialize
  renderSongsList();
  renderPlaylists();
  