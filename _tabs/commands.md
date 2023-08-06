---
# the default layout is 'page'
icon: fas fa-arrow-circle-down
order: 7
---

## MusicPlayerPlus Commands

MusicPlayerPlus adds the following commands to your system:

- **mpplus** : Primary user interface, invokes an MPD client, spectrum visualizer, and more
- **mpcplus** : Featureful NCurses MPD client, compiled with spectrum visualizer
- **mppinit** : One-time initializaton of a user's mpcplus configuration
- **mppcover** : Display album cover art for currently playing song
- **mppdl** : Downloads audio tracks from Bandcamp, Soundcloud, or a URL
- **mpcplus-tmux** : Runs mpcplus, a visualizer, and displays album art in a tmux session
- **mppsplash-tmux** : Runs mppsplash, a visualizer, in a tmux session
- **mppsplash** : Fun ascii art screens using ASCIImatics animations. Ascii art commands:
  - **mppjulia** : ASCIImatics animated zoom on a Julia Set
  - **mppplasma** : ASCIImatics animated plasma graphic
  - **mpprocks** : ASCIImatics animated MusicPlayerPlus splash screen
- **raise_cava** : Raises the mppcava spectrum visualizer window
- **set_term_trans** : Sets an xfce4-terminal window's transparency level
- **fzmp** : Browse, search, and manage MPD library using `fzf` fuzzy finder and `mpc` MPD client
- **artist_to_albumartist** : Copies the Artist tag to the AlbumArtist tag
- **create_playlist** : Create a new playlist using a Beets query
- **listyt** : List YouTube video titles and urls
- **bliss-analyze** : Acoustic analysis of audio files
- **blissify** : Create MPD playlists using song similarity
- **essentia_streaming_extractor_music** : Analyze and extract acoustic characteristics
- **mpd-configure** : Create an MPD configuration file optimized for bit perfect playback
- **mpd-monitor** : Display info on currently playing MPD song

The `bliss-analyze` and `blissify` commands are currently not available on
Raspberry Pi installations due to lack of support for that architecture in
the `ffmpeg` library.

**[Note:]** MusicPlayerPlus functions as a front-end and management system for
any MPD/Mopidy/Navidrome client. The default MPD client is `mpcplus` but any
MPD client can be configured by setting `MPD_CLIENT` in `~/.config/mpprc`.
While `mpcplus` is the recommended MPD client, `ncmpcpp` is also supported
with some integration for visualizer data source management. Other MPD clients
available for use with MusicPlayerPlus include ncmpc, pms, vimpc, pimpd2,
nncmpp, mmtc, and mpq.

Additional detail and info can be found in the
[MusicPlayerPlus Wiki](https://github.com/doctorfree/MusicPlayerPlus/wiki).
