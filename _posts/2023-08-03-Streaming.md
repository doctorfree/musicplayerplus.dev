---
title: Streaming Music with MusicPlayerPlus
author: doctorfree
date: 2023-08-03 16:55:00 +0800
categories: [Blogging, Tutorial]
tags: [streaming, music, audio, stream]
pin: true
img_path: "/posts/20230803"
---

## Streaming music with MusicPlayerPlus

There are a number of different ways to stream music on Linux. Two will
be described here - streaming with the Music Player Daemon (MPD), and
streaming with the mStream server. While MPD has built-in support for
streaming with HTTP, this solution is single user and has gaps between
songs. MPD can be used to stream music with the Satellite setup. Another
convenient, cross-platform streaming server solution is
[mStream](https://github.com/IrosTheBeggar/mStream), a personal music
streaming server. You can use mStream to stream your music from your
home computer to any device, anywhere.

Both mStream and MPD Satellite setup will be described here.

## Motivation

Why Stream? Why Host Your Own Server? Here are a few reasons I stream my
own music from my own server:

- **Listen Anywhere**
  : You can access your music collection from anywhere. With mStream you can also sync your collection between your devices for offline access

- **Own Your Music**
  : No Ads and your content will never get removed

- **Quality**
  : To the audiophiles and FLAC enthusiasts, you can stream your music uncompressed

- **Good for Artists**
  : Buying music directly from artists means your money goes directly to them

## Streaming music with mStream

| Main                                                                                                  |                                                Shared                                                |                                                                                              Admin |
| :---------------------------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------: | -------------------------------------------------------------------------------------------------: |
| ![main](https://raw.githubusercontent.com/wiki/doctorfree/MusicPlayerPlus/img/mstreamv5.png?raw=true) | ![shared](https://raw.githubusercontent.com/wiki/doctorfree/MusicPlayerPlus/img/shared.png?raw=true) | ![admin](https://raw.githubusercontent.com/wiki/doctorfree/MusicPlayerPlus/img/admin.png?raw=true) |

MusicPlayerPlus chose mStream as an example music streaming server for
several reasons:

- Cross platform support
- Light on memory and CPU
- Tested on multi-terabyte libraries
- Runs on ARM boards like the Raspberry Pi
- Multiple clients including clients for both Android and iOS
  - Free mStream clients are not restricted or limited or burdened by ads
- Open source license
- NPM integration with PM2 suport

If you want to setup mStream on a MusicPlayerPlus installation then here
is an introductory guide.

### Dependencies

- NodeJS v10 or greater
  - [How to Install NodeJS](https://nodejs.org/en/download/package-manager/)
- NPM
- git

#### Supported File Formats

- flac
- mp3
- mp4
- wav
- ogg
- opus
- aac
- m4a

### Installing mStream

```shell
git clone https://github.com/IrosTheBeggar/mStream.git

cd mStream

# Install dependencies and run
npm run-script wizard
```

### Running mStream as a Background Process

We will use [PM2](https://pm2.keymetrics.io/) to run mStream as a background process

```shell
# Install PM2
npm install -g pm2

# Run app
pm2 start cli-boot-wrapper.js --name mStream
```

[See the PM2 docs for more information](https://pm2.keymetrics.io/docs/usage/quick-start/)

### Updating mStream

To update mStream just pull the changes from git and reboot your server

```shell
git pull
npm install --only=prod
# Reboot mStream with PM2
pm2 restart all
```

### Android App

[![mStream Android App](https://raw.githubusercontent.com/wiki/doctorfree/MusicPlayerPlus/img/play-store-logo.png)](https://play.google.com/store/apps/details?id=mstream.music&hl=en_US&gl=US)

[This App is Open Source. See the Source Code](https://github.com/IrosTheBeggar/mstream_music/releases)

### iOS App

[![mStream iOS App](https://raw.githubusercontent.com/wiki/doctorfree/MusicPlayerPlus/img/app-store-logo.png)](https://apps.apple.com/us/app/mstream-player/id1605378892)

### Credits

mStream is built on top some great open-source libraries:

- [music-metadata](https://github.com/Borewit/music-metadata) - The best metadata parser for NodeJS
- [LokiJS](https://github.com/techfort/LokiJS) - A native, in-memory, database written in JavaScript. LokiJS is the reason mStream is so fast and easy to install
- [Butterchurn](https://github.com/jberg/butterchurn) - A clone of Milkdrop Visualizer written in JavaScript

## Streaming music with MPD Satellite setup

While HTTP streaming allows the user to broadcast its music over HTTP,
the satellite setup allows multiple users to listen to different songs
at the same time, on separate machines without gaps between songs.

### Topology

The satellite setup involves two or more machines: a _server_ and
multiple _clients_. The _server_ is typically the machine that has the
music files. It runs an MPD instance that will browse these files and
build a database. The _clients_ are the machines that will actually play
the music (e.g. your phone or your laptop). They will also run MPD
instances, though these ones will fetch the database from the server MPD
and play the music. You might notice that MPD on the server is not
necessary, however it greatly increases the speed to list all songs, as
the client's MPD will not have to browse all the files remotely.

Besides, you will need a way for the server to make the music files
available to the clients. MPD supports multiple
<a href="https://www.musicpd.org/doc/html/plugins.html#storage-plugins"
class="external text" rel="nofollow">storage plugins</a> to fetch the
music with. For example, if you choose the curl plugin, you will need a
[WebDAV](https://wiki.archlinux.org/title/WebDAV "WebDAV") server on the
server.

Finally, you will need a secure communication tunnel between the server
and each client. This is because the protocol used to control MPD is not
encrypted and does not provide authentication. A
<a href="https://wiki.archlinux.org/title/VPN" class="mw-redirect"
title="VPN">VPN</a> or a SSH tunnel will be useful here.

### Configuration

On the server, write the configuration file for the MPD instance that
will build the database. MusicPlayerPlus installs a user-level MPD
configuration file as `$HOME/.config/mpd/mpd.conf`:

```
    pid_file            "/run/mpd/mpd.pid"
    playlist_directory  "/var/lib/mpd/playlists"
    music_directory     "/path/to/your/music/"

    database {
        plugin           "simple"
        path             "/var/lib/mpd/mpd.db"
        cache_directory  "/var/lib/mpd/cache"
    }

    audio_output {
        type  "null"
        name  "This server does not need to play music, but it can"
    }
```

Then, setup either the
[WebDAV](https://wiki.archlinux.org/title/WebDAV "WebDAV") server, the
[NFS](https://wiki.archlinux.org/title/NFS "NFS") server or the
[Samba](https://wiki.archlinux.org/title/Samba "Samba") share.

On each client, write the configuration file for the MPD instance that
will play the music:

`/etc/mpd.conf`:

```
    pid_file            "/run/mpd/mpd.pid"
    playlist_directory  "/var/lib/mpd/playlists"

    # WebDAV setup
    music_directory     "https://optional_user:optional_password@example.com/path/to/your/music/"

    # NFS setup
    music_directory     "nfs://example.com/path/to/your/music/"

    # Samba setup
    music_directory     "smb://example.com/path/to/your/music/"

    # Note the proxy here
    database {
        plugin  "proxy"
        host    "example.com"
        port    "6600"
    }

    audio_output {
        type  "alsa"
        name  "Some output name"
    }
```

**Note:**

- libsmbclient has a serious bug which causes MPD to crash, and
  therefore this plugin is disabled by default and should not be used
  until the bug is fixed
  <a href="https://bugzilla.samba.org/show_bug.cgi?id=11413"
  class="external autonumber" rel="nofollow">[1]</a>
- On Android the configuration file needs to be at the root of the
  user storage, alongside the `Android` folder. Also, files MPD writes
  to need to lie in the application folder, generally in `/data`. For
  example:

`/storage/emulated/0/mpd.conf`:

```
    music_directory  "http://example.com/Music"
    log_file         "/data/user/0/org.musicpd/cache/log"
    state_file       "/data/user/0/org.musicpd/cache/state"

    audio_output {
        type  "sles"
        name  "Android only supports OpenSL ES"
    }
```
