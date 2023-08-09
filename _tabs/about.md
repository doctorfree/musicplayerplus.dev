---
# the default layout is 'page'
icon: fas fa-info-circle
order: 10
---

<div data-align="center">
  <img
    src="https://raw.githubusercontent.com/wiki/doctorfree/MusicPlayerPlus/img/musicplayerplus.png"
    style="width: 783px; height: 140px"
    alt="MusicPlayerPlus"
  />
</div>

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

<div align="center">
  <h2 id="connect">Connect</h2>
  <p align="center">
    <a href="https://ronrecord.com" target="_blank" rel="noopener">
      <img align="center"
      style="width:40px;height:40px"
      alt="domain"
      src="https://raw.githubusercontent.com/doctorfree/doctorfree/master/icons/domain.png"
    /></a>
    <a href="https://www.reddit.com/user/No-Blackberry-3160" target="_blank" rel="noopener">
      <img align="center"
      style="width:40px;height:40px"
      alt="reddit"
      src="https://raw.githubusercontent.com/doctorfree/doctorfree/master/icons/reddit.png"
    /></a>
    <a href="https://github.com/doctorfree" target="_blank" rel="noopener">
      <img align="center"
      style="width:40px;height:40px"
      alt="github"
      src="https://raw.githubusercontent.com/doctorfree/doctorfree/master/icons/github.png"
    /></a>
    <a href="https://gitlab.com/doctorfree" target="_blank" rel="noopener">
      <img align="center"
      style="width:40px;height:40px"
      alt="gitlab"
      src="https://raw.githubusercontent.com/doctorfree/doctorfree/master/icons/gitlab.png"
    /></a>
    <a href="https://twitter.com/ronrecord" target="_blank" rel="noopener">
      <img align="center"
      style="width:40px;height:40px"
      alt="twitter"
      src="https://raw.githubusercontent.com/doctorfree/doctorfree/master/icons/twitter.png"
    /></a>
    <a href="https://youtube.com/c/doctorfree" target="_blank" rel="noopener">
      <img align="center"
      style="width:40px;height:40px"
      alt="youtube"
      src="https://raw.githubusercontent.com/doctorfree/doctorfree/master/icons/youtube.png"
    /></a>
    <a href="https://linkedin.com/in/ronrecord" target="_blank" rel="noopener">
      <img align="center"
      style="width:40px;height:40px"
      alt="linkedin"
      src="https://raw.githubusercontent.com/doctorfree/doctorfree/master/icons/linkedin.png"
    /></a>
    <a href="https://instagram.com/doctorfree" target="_blank" rel="noopener">
      <img align="center"
      style="width:40px;height:40px"
      alt="instagram"
      src="https://raw.githubusercontent.com/doctorfree/doctorfree/master/icons/instagram.png"
    /></a>
    <a href="https://noc.social/@doctorwhen" target="_blank" rel="noopener">
      <img align="center"
      style="width:40px;height:40px"
      alt="mastodon"
      src="https://raw.githubusercontent.com/doctorfree/doctorfree/master/icons/mastodon.png"
    /></a>
    <a href="https://en.wikipedia.org/wiki/User:Doctorfree" target="_blank" rel="noopener">
      <img align="center"
      style="width:40px;height:40px"
      alt="wikipedia"
      src="https://raw.githubusercontent.com/doctorfree/doctorfree/master/icons/wikipedia.png"
    /></a>
  </p>
</div>
