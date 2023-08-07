---
# the default layout is 'page'
layout: tab
icon: fas fa-info-circle
order: 11
---

![](https://raw.githubusercontent.com/wiki/doctorfree/MusicPlayerPlus/img/mpplus.png){: .shadow }

MusicPlayerPlus is a character-based console and terminal window music player

- **_plus_** Beets media library management with preconfigured plugins
- **_plus_** Character-based spectrum visualizer `mppcava`
- **_plus_** Music Player Daemon and ALSA configuration management
- **_plus_** Mopidy Music Server with preconfigured extensions
- **_plus_** Navidrome Music Server/Streamer automated install/config/service
- **_plus_** Bliss acoustic analysis and song similarity database
- **_plus_** Essentia acoustic analysis and metadata extraction
- **_plus_** YAMS MPD Last.fm scrobbler running as a service
- **_plus_** Media fuzzy finder using `fzf`
- **_plus_** Album cover art download
- **_plus_** Bandcamp collections download
- **_plus_** Soundcloud favorites download
- **_plus_** Discogs user collection to markdown generator
- **_plus_** Automated setup, import and organization, metadata, playlists, ...

## Overview

The MusicPlayerPlus project provides integration and extension of several audio
packages designed to stream and play music. MusicPlayerPlus interacts with the
Music Player Daemon (MPD). Outputs from the MPD streaming audio server are used
as MusicPlayerPlus inputs for playback and visualization. MusicPlayerPlus
components are used to manage and control MPD and ALSA configuration.

MusicPlayerPlus integrations and extensions are primarily aimed at the
character-based terminal user. They enable an easy to use seamlessly
integrated control of audio streaming, playing, music library management,
and visualization in a lightweight character-based environment.

Audio streaming is provided by the Music Player Daemon (MPD).
At the core of MusicPlayerPlus is the `mpplus` command which acts as
a front-end for a variety of terminal and/or `tmux` sessions.

The `mpplus` command can be used to invoke:

- The lightweight character-based MPD client, `mpcplus`
- One or more terminal emulators running an MPD client and visualizer
- A tmux session using the tmux session manager `tmuxp`
- A spectrum visualizer
- A download of album cover art for every album in a music library
- Conversion of all WAV/M4A format media in a music library to MP3 format media
- An import of a music library to the Beets media library manager
- A download of lyrics for all songs in the music library without lyrics
- Analysis and retrieval of audio-based information for media matching a query
- YAMS MPD Last.fm scrobbler activation
- Any MPD client the user wishes to run
- One of several asciimatics animations optionally accompanied by audio
- A fuzzy listing and searching of the audio library using `fzf`

**[Note:]** Typical use of `mpplus` as a music player and spectrum visualizer
will invoke a `tmux` session to display the MPD client, spectrum visualizer, and
album cover art all in a single terminal window. MusicPlayerPlus configures
`tmux` with a custom key binding to exit tmux sessions. To exit an `mpplus`
tmux session, the `Alt-x` key binding can be used.

Integration is provided for:

- [mpd](https://www.musicpd.org/), the Music Player Daemon
- [mpcplus](https://github.com/doctorfree/mpcplus/README.md), character-based MPD client
- [beets](https://beets.io/), media library management system
- [essentia](https://github.com/doctorfree/mpplus-essentia/README.md), acoustic metadata analysis and extraction
- [mopidy](https://mopidy.com/), music server with cool extensions
- [navidrome](https://www.navidrome.org/), self-hosted music server and streamer
- [yams](https://github.com/Berulacks/yams/), MPD scrobbler for Last.fm
- [cava](https://github.com/karlstav/cava), an audio spectrum visualizer
- [mplayer](http://mplayerhq.hu/design7/info.html), a media player
- [fzf](https://github.com/junegunn/fzf), interactive fuzzy finder
- [asciimatics](https://github.com/peterbrittain/asciimatics) - automatically display a variety of character-based animation effects
- [asciinema](https://asciinema.org/) - automatically create ascii character-based video clips
- [tmux](https://github.com/tmux/tmux/wiki), a terminal multiplexer
- [tmuxp](https://github.com/tmux-python/tmuxp), a tmux session manager
- Enhanced key bindings for extended control of terminal windows and tmux sessions
- Several terminal emulators
  - kitty (the default MusicPlayerPlus terminal emulator)
  - cool-retro-term
  - gnome-terminal
  - tilix

The goal of MusicPlayerPlus is to provide the user with a sophisticated set
of complex music library tools that can be integrated and managed in a fairly
simple to understand fashion. Also, to make some cool looking powerful stuff
happen from the command-line in a character-based environment.
