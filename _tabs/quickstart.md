---
# the default layout is 'page'
icon: fas fa-arrow-circle-down
order: 1
---

## MusicPlayerPlus Quickstart

### Required setup

- Create a music library if you do not already have one
  - Default MusicPlayerPlus location for the music library is `$HOME/Music`
  - Recommended structure of the music library is `artist/album/songs`
- Install the latest Arch, Debian, or RPM format installation package from the [MusicPlayerPlus Releases](https://github.com/doctorfree/MusicPlayerPlus/releases) page
- Run the `mppinit` command as your normal user
  - Searches `$HOME/Music` and `$HOME/music` for music library location
  - The music library location can be specified with `mppinit -l /path/to/library`

### Optional additional setup steps

For many installations, installing the MusicPlayerPlus package and initializing
the user configuration with the `mppinit` command is all that need be done.

Some common additional setup steps that can be performed include:

- Configuring the music library location
- Download albums in your Bandcamp collections
- Download favorites in your Soundcloud account
- Converting WAV/M4A format media files to MP3 format
- Importing a music library into the Beets library management system
- Downloading album cover art
- Downloading additional lyrics
- Activation of YAMS scrobbler for Last.fm
- Analysis and retrieval of audio-based information for media matching a query

Configure the music library location by editing `~/.config/mpprc` and setting
`MUSIC_DIR` to your music library location (default setting is `~/Music`).
Optionally configure any additional settings in `~/.config/mpprc` such as
your preferred terminal emulator, Bandcamp username, Soundcloud slug, or
more. Any changes to `~/.config/mpprc` must be followed by running the command
`mppinit sync`.

**[Important Note:]** MusicPlayerPlus integrates several services, each of
which has its own configuration for the location of the music library. Because
of this, MusicPlayerPlus provides its own configuration file
`~/.config/mpprc`. The `MUSIC_DIR` setting in that config file is used as the
source of truth for the location of the music library. In order to keep all
of the services in sync with respect to the music library location, set the
location in `~/.config/mpprc` and run the command `mppinit sync`.
If the music library is moved to a new location, repeat this procedure.

Download albums in your Bandcamp collections with `mppinit bandcamp`.

Download favorites in your Soundcloud account with `mppinit soundcloud`.

#### Two step post-initialization setup

The following optional post-initialization steps can be performed individually
as described below or they can be performed in two steps using `mppinit`.

**Step 1**, import the music library into Beets:

```shell
mppinit import
```

The `mppinit import` command converts any WAV format media to MP3 format
and imports the music library into the Beets media library management system.

**[Note:]** A Beets import can take hours for a large music library.
A test import using a music library over 500GB in size, with nearly
4000 artists, 3000 albums, and over 30,000 tracks consumed nearly 12 hours.
Import times will vary from system to system and library to library
depending on several factors. The above test may provide a ballpark idea
of the length of time a Beets library import might take.

When the import is complete

**Step 2**, retrieve additional metadata:

```shell
mppinit metadata
```

The `mppinit metadata` command identifies and deletes duplicate tracks,
retrieves album genres from Last.fm, downloads album cover art, and
(optionally) analyzes and retrieves metadata for all songs in the music library.

**[Note:]** A Beets metadata retrieval can take hours for a large music library.
The MusicPlayerPlus default Beets configuration uses `ffmpeg` to compute
checksums for every track in the library to find duplicates.

An optional audio analysis can be performed during metadata retrieval.
MusicPlayerPlus provides several optional methods for acoustic analysis.
The method used for acoustic analysis and retrieval can be specified
on the command line:

- AcousticBrainz metadata retrieval (deprecated)
  - `mppinit -a metadata`
- Blissify acoustic analysis of the MPD music library (the default)
  - `mppinit -b metadata`
- Essentia acoustic analysis and Beets metadata retrieval (long)
  - `mppinit -e metadata`

If none of the `-a, -b, or -e` options are specified then acoustic
analysis, extraction, and retrieval is performed by Essentia.

The AcousticBrainz service is the fastest method but is being retired in
2023, the service is no longer being updated, and it is often inaccurate.

The Essentia acoustic analysis is the most thorough, adds acoustic
metadata to the Beets library management system, and provides the greatest
flexibility but at a cost of possibly days of analysis and extraction time.
Metadata analysis and extraction with Essentia is the default behavior.

The Blissify analysis creates a similarity database of all songs in the music
library. This can be used to automate the creation of playlists and other
actions. The drawback of using Blissify is it does not add acoustic metadata
to the Beets library so the results of a Blissify analysis are only available
to Blissify and not Beets.

**[Note:]** Acoustic analysis with `blissify` is currently not available on
Raspberry Pi installations due to lack of support for that architecture in
the `ffmpeg` library.

It is sometimes desirable to augment one acoustic analysis with another.
For example, the AcousticBrainz service seems to think a lot of songs
have 0 beets per minute and tags them erroneously. After retrieving
metadata using AcousticBrainz, list the songs that have a bpm value of 0:

```shell
beet list bpm:0
```

These songs can get an accurate setting for bpm and other audio parameters
by following the `mppinit -a metadata` command with `mpplus -X bpm:0`.

#### Individual commands post-initialization setup

Download albums in your Bandcamp collections with `mppinit bandcamp`.

Download favorites in your Soundcloud account with `mppinit soundcloud`.

Convert WAV or M4A format media files in your library to MP3 format files with
the command `mpplus -F` or `mpplus -G`. Conversion from WAV to MP3 allows these
files to be imported into the Beets media library management system. Conversion
from M4A (Apple ALAC) to MP3 allows these files to be streamed and played in all
browsers supporting HTML5 audio (not necessary with Navidrome streaming).

If you wish to manage your music library with Beets, import the music library
with the command `mpplus -I`.

Album cover art can be downloaded with the command `mpplus -D art`.

Bandcamp collections can be downloaded with the command `mpplus -D bandcamp`.

Soundcloud favorites can be downloaded with the command `mpplus -D soundcloud`.

Download additional lyrics with the command `mpplus -L`.

Activate the YAMS scrobbler for Last.fm with the command `mpplus -Y`.

Analysis and retrieval of audio-based information can be performed with
the command `mpplus -X 'query'` where 'query' is a Beets library query.
The special query term 'all' indicates the entire music library, i.e.
`mpplus -X all`. Alternatively, query the AcousticBrainz service with
`mpplus -x all` or create a "song similarity" database using Blissify
with `mpplus -B`.

These common additional setup steps and more are covered in greater
detail in the [MusicPlayerPlus Beets section](https://musicplayerplus.dev/beets)
and the
[Post Installation Configuration](https://musicplayerplus.dev/configuration#post-installation-configuration)
section.

### Quickstart summary

To summarize, a MusicPlayer quickstart can be accomplished by:

- Install the latest Arch, Debian, or RPM format installation package
- Run `mppinit` or `mppinit -l /path/to/library` as your normal user
- If the music library location was not properly detected:
  - Configure `MUSIC_DIR` by editing `~/.config/mpprc`
  - Run the command `mppinit sync`
- Optionally:
  - Modify user-specific settings in `~/.config/mpprc` and run `mppinit sync`
  - Download albums in your Bandcamp collections with `mppinit bandcamp`
  - Download favorites in your Soundcloud account with `mppinit soundcloud`
  - Perform these steps with the command `mppinit import`
    - Convert WAV format files to MP3 format with the command `mpplus -F`
    - Import your music library into Beets with the command `mpplus -I`
  - Perform these steps with the command `mppinit metadata`
    - Remove duplicate tracks with the command `beet duplicates -d`
    - Rename tracks left after duplicate removal with `beet move`
    - Download album cover art with the command `mpplus -D art`
    - Analyze and retrieve audio-based information with a command like:
      - `mpplus -B` creates a "song similarity" database with Blissify
        - `mpplus -X all` analyze the entire Beets library with Essentia
        - `mpplus -X 'query'` where 'query' is a Beets library query
        - `mpplus -x all` query AcousticBrainz for the entire Beets library
  - Activate the YAMS scrobbler for Last.fm with the command `mpplus -Y`
  - Download additional lyrics with the command `mpplus -L`

### Full Tilt Boogie

The entire full tilt boogie initialization, for those with both Bandcamp
and Soundcloud accounts with songs and albums in a collection or liked,
and who wish to apply thorough, reliable, complete, and accurate metadata:

```shell
# Initialize MusicPlayerPlus, activate Music Player Daemon
# This is the only required setup step
mppinit

# For Bandcamp and Soundcloud users, a convenient way to download
mppinit bandcamp
mppinit soundcloud

# Beets library import (can take hours)
mppinit import

# Install, configure, and activate Mopidy music server
mppinit mopidy

# Install, configure, and activate Navidrome streaming music server
mppinit navidrome

# Perform analysis and extraction of acoustic metadata with Essentia
# This background process can take hours or even days for a large library
mppinit metadata
```
