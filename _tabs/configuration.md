---
# the default layout is 'page'
layout: post
icon: fas fa-info-circle
order: 3
toc: true
---

## Post Installation Configuration

**[Note:]** Extensive post-installation steps are covered here.
Minimal post-installation configuration required is the execution
of the command `mppinit`. If the MPD music library is located in
the default `$HOME/Music` directory then no further configuration
may be necessary. See the
[Quickstart](https://musicplayerplus.dev/quickstart) section.

After installing MusicPlayerPlus there are several recommended
configuration steps. If not already configured, the MPD server
will need to know where to locate your music library. This can
be configured by editing the MusicPlayerPlus configuration file
`~/.config/mpprc` and running the command `mppinit sync`.

### Client Configuration (required)

Initialize the MusicPlayerPlus configuration by executing the command:

```console
mppinit
```

Examine the generated configuration in `~/.config/mpprc` and make any desired changes.

The client configuration performed by `mppinit` includes the configuration
of an MPD user service. The configuration, files, and folders used by
this user level MPD service are stored in `~/.config/mpd/`. Examine the
generated MPD configuration file `~/.config/mpd/mpd.conf`.

### MusicPlayerPlus Configuration File

MusicPlayerPlus 2.0.1 release 3 and later provides the configuration file
`~/.config/mpprc` which serves as the primary source for MusicPlayerPlus
user configurable settings. This configuration file is the "source of truth"
for several settings including the music library location. Settings in
`mpprc` are propogated throughout several other component's configurations.

The settings in `mpprc` are *dynamic* and preserved across command invocations.
The dynamic nature of this configuration file means that options specified
on the `mpplus` command line or in the `mpplus` menu system are written back
out to `~/.config/mpprc` so the next invocation of `mpplus` will use the
previous invocation's options and settings as the default.

The default installed `mpprc` contains:

```shell
## MusicPlayerPlus runtime configuration
#
#  After modifying any of the following settings, run the command:
#    mppinit sync
#  as your normal MusicPlayerPlus user

## Music library location
#
MUSIC_DIR="~/Music"

# MPD client
MPD_CLIENT="mpcplus"

## General settings
#
# To enable any of these, set to 1
# For example, to enable cover art display in tmux sessions set COVER_ART=1
#
# Play audio during asciimatics animations
AUDIO=1
# Display cover art in tmux sessions
COVER_ART=1
# Display mpcplus and mppcava in a tmux session
USE_TMUX=1

## Terminal emulator / display mode
#
#  Can be one of: console, current, gnome, kitty, retro, simple, tilix
#  Where:
#    'console' will force a tmux session
#    'current' will force a tmux session in the current terminal window
#    'gnome' will use the gnome-terminal emulator if installed
#    'kitty' will use the Kitty terminal emulator if installed
#    'retro' will use cool-retro-term if installed
#    'simple' will use the ST terminal emulator if installed
#    'tilix' will use the Tilix terminal emulator if installed
#  Default fallback if none specified or not available is Kitty
#
#  Uncomment the preferred mode
#MPP_MODE=console
#MPP_MODE=current
#MPP_MODE=gnome
#MPP_MODE=retro
#MPP_MODE=simple
#MPP_MODE=tilix
MPP_MODE=kitty

## Service access
#
# The Bandcamp username can be found by visiting Bandcamp 'Settings' -> 'Fan'
# If you do not have a Bandcamp account, leave blank
BANDCAMP_USER=

# The Discogs username can be found by visiting discogs.com. Login, use the
# dropdown of your user icon in the upper right corner, click on 'Profile'.
# Your Discogs username is the last component of the profile URL.
DISCOGS_USER=
# The Discogs API token can be found by visiting
# https://www.discogs.com/settings/developers
DISCOGS_TOKEN=
# Location of the generated custom Discogs Obsidian vault
# Can be anywhere you have write permission
DISCOGS_DIR="~/Documents/Obsidian/Discogs"

# Your Last.fm username, api key, and api secret
# If you do not have a Last.fm account, leave blank
LASTFM_USER=
LASTFM_APIKEY=
LASTFM_SECRET=

# The Soundcloud user slug can be found by logging in to Soundcloud
# click on the username at top right then 'Profile'. The user slug
# is the last component of the URL when viewing your Soundcloud Profile.
# If you do not have a Soundcloud account, leave blank
SOUNDCLOUD_SLUG=

# Your Spotify client id and client secret
# If you do not have a Spotify account, leave blank
SPOTIFY_CLIENT=
SPOTIFY_SECRET=

# Your YouTube api key
# If you do not have a YouTube account, leave blank
YOUTUBE_APIKEY=
```

After `mppinit` completes the MusicPlayerPlus initialization, edit the
`~/.config/mpprc` configuration file and run `mppinit sync`.

### MPD Music Directory Configuration

**[Note:]** MusicPlayerPlus version 1.0.3 release 1 and later perform
an automated MPD user configuration and systemd service activation.
This is performed by the `mppinit` command. MusicPlayerPlus 1.0.3r1
and later installations need not perform the following manual procedures
but users may wish to review the automated MPD configuration and alter
the default MPD music directory location.

The default MPD and `mpcplus` music directory is set to:

`$HOME/Music`

If your media library resides in another location then perform the following
steps and run `mppinit sync`:

* Edit `$HOME/.config/mpprc` and set the `MUSIC_DIR` entry to the location of your music library (e.g. `vi ~/.config/mpprc`)
* Run the `mppinit sync` command

For example, to set the MPD music directory to the `/u/audio/music` directory,
edit `$HOME/.config/mpprc` and change the *MUSIC_DIR* setting:

```shell
MUSIC_DIR="/u/audio/music"
```

The *MUSIC_DIR* location must be writeable by your user.

Any time the MPD music directory is manually modified, run `mppinit sync`.

### Initializing the Beets media library management system

**[Note:]** Beets is NOT the now defunct music service purchased by Apple.
It is an open source media library management system.

MusicPlayerPlus includes the Beets media library management system
and preconfigured settings to allow easy integration with MPD and `mpcplus`.
Beets is an application that catalogs your music collection, automatically
improving its metadata. It then provides a suite of tools for manipulating
and accessing your music. Beets includes an extensive set of plugins that
can be used to enhance and extend the functionality of the media library
management Beets provides. Many Beets plugins are installed and configured
automatically by MusicPlayerPlus.

To get started using the Beets media library management system, it is
necessary to import your music library into the Beets database. This process
catalogs your music collection and improves its metadata. The default
Beets configuration provided by MusicPlayerPlus moves and tags files in the
music library during this process. It adds music library data to the Beets
database. To import your music library into Beets, issue the following command:

```console
mppinit import
```

or to skip WAV format media conversion and just perform the Beets import:

```console
mpplus -I
```

**[Note:]** If additional songs or albums are added to the music library
after the initial Beets import is performed, simply rerun `mppinit import`
or `beet import /path/to/new/items` to import any new library items.
To remove duplicates and retrieve metadata for the newly imported items,
run `mppinit metadata`.

After importing the music library into Beets, try playing something with:

```console
beet play QUERY
```

Where 'QUERY' is a valid
[Beets query](https://beets.readthedocs.io/en/stable/reference/query.html).
This can be a simple string like
"blue" or "love" or a more complicated expression as described in the
Beets query documentation. The Beets `play` plugin should match the
query string to songs in your music library, add those songs to the
MPD queue, and play them. Use `beet ls QUERY` to see what would be played.

**[Note:]** MusicPlayerPlus has configured the Beets play plugin
to use the command `/usr/share/musicplayerplus/scripts/mpcplay.sh`
to play media with this plugin. This script clears the MPD queue,
adds any songs matching the query to the queue, and plays the MPD queue.
In addition, two arguments are supported: `--shuffle` and `--debug`.
These additional arguments are passed using the `--args` feature.
For example, to play all media matching the string "velvet" and shuffle
the order of play, issue the command `beet play --args --shuffle velvet`.

Example usage of the `beet play` command:

* `beet play velvet`
* `beet play playlist:1970s`
* `beet play --args --shuffle playlist:1990s`
* `beet play --args "--debug --shuffle" green eyes`

For instructions on Beets media library setup and use see the
[MusicPlayerPlus Beets section](https://musicplayerplus.dev/beets).

Learn more about the Beets media library management system at
https://beets.io/

### Additional metadata analysis and retrieval

MusicPlayerPlus includes three methods for augmenting music library
metadata through acoustic analysis. These three methods are:

- AcousticBrainz metadata retrieval (deprecated)
    - initialized with `mppinit -a metadata`
- Blissify acoustic analysis of the MPD music library
    - initialized with `mppinit -b metadata`
- Essentia acoustic analysis and Beets metadata retrieval
    - initialized with `mppinit -e metadata`

### Acoustic analysis with Blissify

Acoustic analysis with Blissify does not require a prior Beets import.
The Blissify acoustic analysis creates a song similarity database for
all the songs in the MPD music library. Initialize the Blissify database
with the command `blissify update <mpd music directory>`. For example,
assuming the default MPD music directory:

```console
blissify update ~/Music
```

Blissify database initialization would have been automatically performed
during setup if metadata initialization were done with:

```console
mppinit -b metadata
```

After initialization of the Blissify database, the `blissify` command can
be used to create an MPD playlist based on song similarities. For example,
to make a 30 song playlist that queues the closest song to the currently
playing song, then the closest song to the second song, etc, effectively
making a "path" through the songs, execute the command:

```console
blissify playlist --seed-song 30
```

To save the current MPD playlist (queue), execute the command:

```console
mpc save <playlist-name>
```

Note that the acoustic analysis and database creation performed by
Blissify does not update the Beets library database. In order to add
this additional acoustic metadata to the Beets library it is necessary
to perform an acoustic analysis with Essentia or acoustic metadata
retrieval with AcousticBrainz, both described in the next sections.

### Acoustic analysis with Essentia

After completing the Beets music library import with either `mppinit import`
or `mpplus -I`, additional Beets metadata can be retrieved with the command:

```console
mppinit -e metadata
```

This will identify and delete duplicate tracks, retrieve album genres,
download album cover art, and optionally analyze and retrieve metadata
for all songs in the music library using the
[Essentia extractor](https://essentia.upf.edu/index.html) and
[Essentia trained models](https://essentia.upf.edu/models.html).

MusicPlayerPlus `mppinit -e metadata` uses Essentia for extracting acoustic
characteristics of music, including low-level spectral information, rhythm,
keys, scales, and much more, and automatic annotation by genres, moods, and
instrumentation.

This is the same sort of thing that
[AcousticBrainz](https://acousticbrainz.org/) does but the AcousticBrainz
project is no longer collecting data and will be withdrawn in 2023.
MusicPlayerPlus provides the same functionality using pre-compiled and
packaged Essentia binaries and models.

However, the process of analyzing, extracting, and retrieving metadata
can be time consuming for a large music library. The `mppinit -e metadata`
command performs several metadata retrieval steps in a non-interactive
manner and in the background so it can be left unattended if desired.

### Acoustic retrieval with AcousticBrainz

While it still exists the AcousticBrainz service can be queried to provide
a relatively quick way to update the Beets library with additional
acoustic metadata. The AcousticBrainz service has already analyzed the
acoustic characteristics of songs in the MusicBrainz catalog. To retrieve
this metadata for songs in your music library, after Beets import is complete,
run the command `mppinit -a metadata`. Or, at any time after Beets import
run the command `beet acousticbrainz`. The AcousticBrainz service is no longer
updated and will be retired in 2023.

The individual metadata retrieval steps performed automatically by
`mppinit [-a|-b|-e] metadata` can be performed manually using the instructions
in the [MusicPlayerPlus Beets section](https://musicplayerplus.dev/beets).

## Activating the YAMS scrobbler for Last.fm

YAMS is an acronym for "Yet Another MPD Scrobbler".
When YAMS is configured and running, any songs, artists, or albums
played through MPD get "scrobbled" to [Last.fm](https://www.last.fm).
This enables a tracking of your listening patterns and habits,
creating a fairly extensive set of statistics viewable on Last.fm.

Features:

- Authenticate with the new Last.fm Scrobbling API v2.0 - without the need to input/store your username/password locally.
- Update your profile's "Now Playing" track via Last.fm's "Now Playing" API
- Save failed scrobbles to a disk and upload them at a later date.
- Timing configuration (e.g. scrobble percentage, real world timing values for scrobbling, etc.).
- Prevent accidental duplicate scrobbles on rewind/playback restart/etc.
- Automatic daemonization and config file generation.

In order to activate the YAMS scrobbler you will need an account with Last.fm.
Free accounts with Last.fm include many of the service features and can
provide extensive listening history statistics. If you do not wish to
use Last.fm to analyze MPD track plays then this optional setup step
can be ignored and no action is required as MusicPlayerPlus disables
YAMS by default. Disable a previously activated YAMS service with the
command `mpplus -y`.

Activate the YAMS scrobbler for Last.fm with the command:

```console
mpplus -Y
```

The activation process must be run in a terminal window and will provide
you with a URL. Copy the URL and navigate to it using a web browser.
This will take you to Last.fm to authenticate if not already logged in
and authorize YAMS access. Once access is authorized there is no need
to authenticate for future Last.fm access with YAMS. There is also no
need to manually run the `yams` command as a user service is activated
to run it automatically. Basically, nothing else to do, just play music
and it will be scrobbled by YAMS.

YAMS creates a configuration file `$HOME/.config/yams/yams.yml`.

### Using YAMScrobbler with Libre.fm

YAMS works fine with Libre.fm, a Free Software replacement for Last.fm.
If you prefer to use Libre.fm rather than Last.fm, do the following:

- Set the `base_url` config variable to `https://libre.fm/2.0/` in `$HOME/.config/yams/yams.yml` (don't forget the trailing slash!)
- Delete any leftover `.lastfm_session` files
- Authenticate like you normally would with Last.fm, however replace `last.fm` with `libre.fm` in the authorization URL printed out by YAMS

## MPD Audio Output Configuration

Adjust the `audio_output` settings in `~/.config/mpd/mpd.conf`.
MPD must have at least one `audio_output` configured and in order
to use the spectrum visualizer as configured by default it is necessary
to configure a second `audio_output` in MPD.

The default MPD `audio_output` setting is `PulseAudio`. To modify the MPD audio
output, uncomment one of `ALSA`, `PulseAudio`, or `PipeWire` and restart MPD.

A FIFO `audio_output` is used as a data source for the spectrum visualizer.
To configure this output, add the following to `~/.config/mpd/mpd.conf`:

```
audio_output {
    type            "fifo"
    name            "Visualizer feed"
    path            "~/.config/mpd/mpd.fifo"
    format          "44100:16:2"
}
```

An example ALSA `audio_output` configuration in `~/.config/mpd/mpd.conf`:

```
audio_output {
	type		"alsa"
	name		"ALSA"
    buffer_time "50000"   # (50ms); default is 500000 microseconds (0.5s)
#	device		"hw:0,0"	# optional
#	mixer_type      "hardware"      # optional
#	mixer_device	"default"	# optional
#	mixer_control	"PCM"		# optional
#	mixer_index	"0"		# optional
}
```

Or, to use PulseAudio:

```
audio_output {
    type  "pulse"
    name  "pulse audio"
    device         "pulse"
    mixer_type      "hardware"
}
```

Output with PipeWire can also be configured:

```
audio_output {
    type  "pipewire"
    name  "PipeWire Sound Server"
}
```

MPD is a powerful and flexible music player server with many configuration
options. Additional MPD configuration may be desired. See the
[MPD User's Manual](https://mpd.readthedocs.io/en/stable/user.html)

## Fuzzy Finder Configuration

The `fzmp` command lists, searches, and selects media from the MPD
library using the `fzf` fuzzy finder command line utility. A default
`fzmp` configuration file for each user is created when the `mppinit`
command is executed. The `fzmp` configuration file is located at:

```
~/.config/mpcplus/fzmp.conf
```

The initial default `fzmp` configuration should suffice for most use cases.
Some of the interactive key bindings may need to be modified if they are
already in use by other utilities. For example, the default key binding to
switch to playlist view is 'F1' but the `xfce4-terminal` command binds 'F1'
by default to its help window. In this case either the `fzmp` playlist view
key binding must be changed or the XFCE4 terminal help window shortcut must
be disabled.

To disable the XFCE4 terminal help window shortcut, in `xfce4-terminal` select:

*Edit -> Preferences -> Advanced*

Select the *Disable help window shortcut key (F1 by default)* and Close
the Preferences dialog. The XFCE4 terminal help window shortcut will no
longer be bound to 'F1' and no modification to the playlist view key binding
for `fzmp` would be necessary.

To modify the `fzmp` playlist view key binding, edit the `fzmp` configuration
file `~/.config/mpcplus/fzmp.conf` and add a line like the following:

```console
playlist_view_key F6
```

This revised configuration would change the playlist view key binding from
'F1' to 'F6' and the XFCE4 terminal help window shortcut could remain enabled
and bound to 'F1'.

Several other `fzmp` bindings and options can be configured. See `man fzmp`
for details.

## Start MPD

**[Note:]** MusicPlayerPlus version 1.0.3 release 1 and later perform
an automated MPD user configuration and systemd service activation.
Initialization with `mppinit` for these installations should automatically
start the user MPD service. No further action should be required for
MusicPlayerPlus v1.0.3r1 or later installations.

Status of the MPD service can be checked with:

```console
systemctl --user status mpd.service
```

Installation and initialization of MusicPlayerPlus prior to v1.0.3r1
will need to start mpd as a system-wide service by executing the commands:

`sudo systemctl start mpd`

If you want MPD to start automatically on subsequent reboots, run:

`sudo systemctl enable mpd`

Alternatively, if you want MPD to start automatically when a client
attempts to connect:

`sudo systemctl enable mpd.socket`

## System verification checks

Once the music directory has been set correctly, album art downloaded,
music library imported, and `mppinit sync` has completed initialization,
some system checks can optionally be performed.

* Verify the `mpd` service is running and if not then start it:
    * `systemctl --user is-active mpd.service`
    * `systemctl --user start mpd.service`
* Update the MPD client database:
    * `mpc update`
* Verify the `mpd` service is enabled and if not enable it
    * `systemctl --user is-enabled mpd.service`
    * `systemctl --user enable mpd.service`
* Play music with `mpplus`
    * See the [online mpcpluskeys cheat sheet](https://github.com/doctorfree/MusicPlayerPlus/wiki/mpcpluskeys.1) or `man mpcpluskeys` for help navigating the `mpplus` windows
    * See the [online mpplus man page](https://github.com/doctorfree/MusicPlayerPlus/wiki/mpplus.1) or `man mpplus` for different ways to invoke the `mpplus` command

## Initialize Music Database

**[Note:]** MusicPlayerPlus version 1.0.3 release 1 and later perform an
automated MPD music database initialization during execution of `mppinit`.

For versions of MusicPlayerPlus prior to v1.0.3r1, initialize the music
database with an MPD client and update the database. The `mpcplus` MPD
client can be used for this or the standard `mpc` MPD client can be used.
With `mpcplus`, launch the `mpcplus` MPD client, verify the client window
has focus, and type `u` to update the database. With `mpc` simply execute
the command `mpc update`.

If your music library is very large this process can take several minutes
to complete. Once the music database has been updated you should see the
songs, albums, and playlists in your music library appear in the client view.

## Installing Mopidy

To install, configure, and activate Mopidy issue the command `mppinit mopidy`.
After Mopidy initialization completes, open `http://<ip address>:6680/iris`.
After adding music to the local music library, run `mopidy local scan`.

**[Note:]** In order to use the Mopidy-Beets extension, perform a
`mppinit import` and optionally `mppinit metadata` prior to `mppinit mopidy`.

The default music server in MusicPlayerPlus is the Music Player Daemon (MPD).
An alternate music server, Mopidy, is supported and can perform the same
functions as MPD, is compatible with MPD clients, and can be extended to
offer many more features.

Activating Mopidy will first deactivate MPD. The MusicPlayerPlus Mopidy
activation runs as a user level system service. Configuration for Mopidy
and Mopidy extensions resides in `$HOME/.config/mopidy/`. The MusicPlayerPlus
activation of Mopidy auto-configures Mopidy and the installed extensions.

In addition to the
[bundled Mopidy extensions](https://docs.mopidy.com/en/latest/),
the `mppinit mopidy` command installs the following Mopidy extensions:

- **Mopidy-Beets**
    - Mopidy extension for playing music from Beets' web plugin
- **Mopidy-Iris**
    - A comprehensive and mobile-friendly client that presents your library and extensions in a user-friendly and intuitive interface. Built using React and Redux
    - Open `http://<ip address>:6680/iris`
- **Mopidy-Mobile**
    - Fully control a Mopidy music server from your mobile device
    - Android App available on [Google Play](https://play.google.com/store/apps/details?id=at.co.kemmer.mopidy_mobile)
    - Other devices open `http://IP_Address:6680` in a browser
- **Mopidy-Mpd**
    - Mopidy extension for controlling Mopidy from MPD clients
- **Mopidy-Podcast**
    - Mopidy extension for searching and browsing podcasts
- **Mopidy-Podcast-iTunes**
    - Mopidy extension for searching and browsing iTunes podcasts
- **Mopidy-TuneIn**
    - A backend for playing music from the TuneIn online radio service
- **Mopidy-Scrobbler**
    - Mopidy extension for scrobbling music to Last.fm
    - Requires Last.fm username/password added to `~/.config/mopidy/mopidy.conf`

Additional Mopidy extensions can be installed and configured. For example,
to stream Spotify with Mopidy, install and configure the Mopidy-Spotify
extension. Learn more at https://mopidy.com/ext/

To view the effective Mopidy configuration run the command `mopidy config`.
This will display the full Mopidy configuration with passwords masked out
so that you can safely share the output with others for debugging.

**[Note:]** The Mopidy MPD extension provides compatibility with MPD
clients but does not implement all MPD features. MPD is much more powerful
and flexible in terms of its configurable inputs and outputs. After
activating Mopidy some features may not work the same as they did with MPD.
For example, spectrum visualization may fail or player stats may not be
available. However, Mopidy offers many features unavailable with MPD.
It's a tradeoff.

To re-activate MPD and disable Mopidy, issue the command `mppinit mpd`.
Easily switch back and forth between MPD and Mopidy with `mppinit mpd`
and `mppinit mopidy`. Note that MusicPlayerPlus continues to use the
configured `MUSIC_DIR` as the master music library location.
To change the location of the music library, edit
`~/.config/mpprc`, set `MUSIC_DIR` to the new location,
and run `mppinit sync` to synchronize the music library location across
Beets, MPD, Mopidy, and downloaders.

## Installing Navidrome

The default music server in MusicPlayerPlus is the Music Player Daemon (MPD).
An alternate music server and streamer, Navidrome, is also supported.
To install, configure, and activate Navidrome issue the command:

```console
mppinit navidrome
```

The MusicPlayerPlus Navidrome activation runs as a user level system service.
Configuration for Navidrome resides in `$HOME/.config/navidrome/navidrome.toml`.
The MusicPlayerPlus activation of Navidrome auto-configures, starts, and
enables the Navidrome service. The Navidrome log file can be found at
`$HOME/.config/navidrome/navidrome.log`.

After installing Navidrome, you need to create your first user. This will be
your admin user, a super user that can manage all aspects of Navidrome,
including the ability to manage other users. Browse to Navidrome’s homepage
at http://localhost:4533

Fill out the username and password you want to use, confirm the password and
click on the “Create Admin” button. You should now be able to browse and
listen to all your music.

**[Note:]** It usually take a couple of minutes for your music to start
appearing in Navidrome’s UI. Check the logs to see what is the scan progress.

**[Security Note:]** Navidrome comes with an embedded, full-featured HTTP
server but in order to provide additional security (e.g. SSL) Navidrome
should be run behind a reverse proxy like Nginx or Apache. MusicPlayerPlus
does not configure a reverse proxy for Navidrome. See the Navidrome network
configuration documentation at https://www.navidrome.org/docs/usage/security/
to get started securing Navidrome. To use the MusicPlayerPlus default
configuration of Navidrome, use `http://...` rather than `https://...`.

If all you want is a Navidrome streaming music server and you do not care
about Beets library management, additional downloads, or a Mopidy server
then setup can be accomplished with just `mppinit` followed by
`mppinit navidrome`.

### Navidrome clients

The Navidrome self-hosted music service can stream your music to many devices.

MusicPlayerPlus tested and recommended free open source Navidrome clients:

- **iPhone/iPad**
    - [iSub](http://www.subsonic.org/pages/apps.jsp#isub)
- **Android**
    - [Dsub](http://www.subsonic.org/pages/apps.jsp#dsub)
- **Linux/MacOS/Windows**
    - [Sonixd](https://github.com/jeffvli/sonixd)

Character based terminal/console Navidrome clients:

- **Linux/Windows**
    - [Jellycli](https://github.com/tryffel/jellycli)
- **Linux**
    - [Stmp](https://github.com/wildeyedskies/stmp)

Navidrome clients are not installed by MusicPlayerPlus. Install Navidrome
clients using your device's app store or following the installation
instructions at the client link above.

If you do not have or wish to use a Navidrome client, then most modern
browsers are supported Navidrome clients. To use a browser as a Navidrome
web client, open the URL `http://ip-address:4533` where *ip-address* is
the IP address of the Navidrome server.

For a list of Airsonic compatible applications, see
https://airsonic.github.io/docs/apps/

For a list of Subsonic compatible clients, see
https://www.navidrome.org/docs/overview/#apps

[Sonixd](https://github.com/jeffvli/sonixd) is a cross-platform desktop
Subsonic client compatible with Navidrome. On Apple MacOS, install sonixd
with Homebrew:

```console
brew install --cask sonixd
```

[Sublime](https://sublime-music.gitlab.io/sublime-music/index.html) is a
native Subsonic client compatible with Navidrome for the Linux Desktop.
See https://sublime-music.gitlab.io/sublime-music/index.html to install
Sublime on a variety of Linux distributions.

## Terminal Emulator Support

Supported terminal emulators in MusicPlayerPlus include `kitty`, `tilix`,
`gnome-terminal`, `st`, and `cool-retro-term`. Kitty is the default terminal
emulator used by MusicPlayerPlus except on Raspberry Pi OS where `st` is used
as the default.

**[Note:]** The [kitty terminal emulator](https://sw.kovidgoyal.net/kitty/)
is very cool. A default kitty theme is provided (the 'Music Player Plus' theme)
and should suffice for most users. An alternate kitty theme can be configured
using the kitty themes kitten. To use this kitten, run:

```console
kitty +kitten themes
```

An alternate terminal emulator can be specified on the `mpplus` command line:

```console
mpplus -c ... # indicates use the current terminal and a tmux session
mpplus -e ... # indicates use the simple terminal emulator (st)
mpplus -g ... # indicates use the gnome terminal emulator
mpplus -k ... # indicates use the kitty terminal emulator
mpplus -r ... # indicates use the cool-retro-term terminal emulator
mpplus -t ... # indicates use the tilix terminal emulator
```

If an alternate terminal emulator is not specified on the command line
then the default will be used unless console mode is detected. Console mode
is used when no DISPLAY can be opened (e.g. running on a console, running
over SSH without a display, running on a headless server). In console mode
MusicPlayerPlus utilizes `tmux` sessions to display the character-based music
player `mpcplus` and spectrum visualizer `mppcava`.

The `mppcava` spectrum visualizer looks better when the font used by the
terminal emulator in which it is running is a small sized font. Some
terminal emulators rely on a profile from which they draw much of
their configuration. Profiles are used in MusicPlayerPlus to provide
an enhanced visual presentation.

In order to use the Gnome, Simple, or Tilix terminal emulators they must be
installed manually (except on Raspberry Pi OS where the Simple terminal
emulator is installed if no supported terminal emulator is found).
If you wish to use the Gnome, Simple, or Tilix terminal emulators,
then use your system's package manager to install them prior to
initializing MusicPlayerPlus with the `mppinit` command. If either or both
of Gnome or Tilix terminal emulators are installed after MusicPlayerPlus
initialization with `mppinit` then run `mppinit profiles` after installing
gnome-terminal or tilix terminal emulator(s).

There are four terminal profiles in two terminal emulators used by
MusicPlayerPlus. The `gnome-terminal` emulator and the `tilix` terminal
emulator each have two custom profiles created during `mppinit` initialization.
These profiles are named "MusicPlayer" and "Visualizer".

The custom MusicPlayerPlus terminal profiles are used to provide font sizes
and background transparencies that enhance the visual appeal of both the
MusicPlayerPlus control window and the spectrum visualizer.

To modify these terminal emulator profiles, launch the desired terminal
emulator and modify the desired profile in the Preferences dialog.

## Discogs User Collection

MusicPlayerPlus includes support for the auto-generation of an
[Obsidian](https://obsidian.md) vault from either a [Discogs](https://discogs.com)
user collection or a local music library. The extremely rich data available from
Discogs can be used to generate markdown format files reflecting the artists,
albums, tracks, and items in your collection or library. The generated markdown
reflecting your Discogs collection or music library includes a preconfigured
Obsidian vault along with plugins, settings, and theme. The Obsidian Dataview
plugin can be used to query the Obsidian vault in a variety of ways similar to
a database of your library. Several example Dataview queries are included.

In order to use this facility, both `DISCOGS_USER` and `DISCOGS_TOKEN` must be
configured in `$HOME/.config/mpprc`. If these are set then the resulting Obsidian
vault from the either the command `mppinit discogs` or `mppinit discogs local`
will be located in the folder specified by `DISCOGS_DIR` in `mpprc`.

See the [Obsidian Custom Discogs README](https://github.com/doctorfree/Obsidian-Custom-Discogs#readme) for details on setup and maintenance of a Discogs Obsidian vault.

