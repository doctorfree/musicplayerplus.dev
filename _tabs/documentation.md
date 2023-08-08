---
layout: post
icon: fas fa-user-circle
order: 5
toc: true
post_style: page
---

## MusicPlayerPlus Documentation

**[NEW:]** MusicPlayerPlus documentation is now available on [Read the Docs](https://musicplayerplus.readthedocs.io/en/latest/)

All MusicPlayerPlus commands have manual pages. Execute `man <command-name>`
to view the manual page for a command. The `mpplus` frontend is the primary
user interface for MusicPlayerPlus and the manual page for `mpplus` can be
viewed with the command `man mpplus`. Most commands also have
help/usage messages that can be viewed with the **-u** argument option,
e.g. `mpplus -u`.

## README for MusicPlayerPlus configuration

- [**config/README.md**](https://github.com/doctorfree/MusicPlayerPlus/blob/master/config/README.md) - Overview and details of the MusicPlayerPlus configuration

## README for mpcplus MPD client

- [**mpcplus/README.md**](https://github.com/doctorfree/mpcplus/README.md) - Introduction to the mpcplus MPD client

## README for tmuxp configs

- [**config/tmuxp/README.md**](https://github.com/doctorfree/MusicPlayerPlus/blob/master/config/tmuxp/README.md) - How to invoke the MusicPlayerPlus provided `tmuxp` session configurations

## Man Pages

- [**mpplus**](https://github.com/doctorfree/MusicPlayerPlus/blob/master/markdown/mpplus.1.md) : Primary MusicPlayerPlus user interface
- [**mppcava**](https://github.com/doctorfree/MusicPlayerPlus/blob/master/markdown/mppcava.1.md) : Audio Spectrum Visualizer
- [**mppjulia**](https://github.com/doctorfree/MusicPlayerPlus/blob/master/markdown/mppjulia.1.md) : asciimatics animation of a Julia Set
- [**mpprocks**](https://github.com/doctorfree/MusicPlayerPlus/blob/master/markdown/mpprocks.1.md) : asciimatics animation of MusicPlayerPlus intro
- [**mppplasma**](https://github.com/doctorfree/MusicPlayerPlus/blob/master/markdown/mppplasma.1.md) : asciimatics animation with Plasma effect
- [**mppinit**](https://github.com/doctorfree/MusicPlayerPlus/blob/master/markdown/mppinit.1.md) : MusicPlayerPlus initialization
- [**mppcover**](https://github.com/doctorfree/MusicPlayerPlus/blob/master/markdown/mppcover.1.md) : Displays album cover art for currently playing song
- [**mppdl**](https://github.com/doctorfree/MusicPlayerPlus/blob/master/markdown/mppdl.1.md) : Downloads audio tracks from Bandcamp, Soundcloud, or a URL
- [**mpcplus-tmux**](https://github.com/doctorfree/MusicPlayerPlus/blob/master/markdown/mpcplus-tmux.1.md) : MusicPlayerPlus in a tmux session
- [**mpcplus**](https://github.com/doctorfree/MusicPlayerPlus/blob/master/markdown/mpcplus.1.md) : MusicPlayerPlus MPD client
- [**mpcpluskeys**](https://github.com/doctorfree/MusicPlayerPlus/blob/master/markdown/mpcpluskeys.1.md) : Cheat sheet for `mpcplus` MPD client navigation
- [**mppsplash-tmux**](https://github.com/doctorfree/MusicPlayerPlus/blob/master/markdown/mppsplash-tmux.1.md) : MusicPlayerPlus asciimatics animations in a tmux session
- [**mppsplash**](https://github.com/doctorfree/MusicPlayerPlus/blob/master/markdown/mppsplash.1.md) : MusicPlayerPlus asciimatics animations
- [**mpd-configure**](https://github.com/doctorfree/MusicPlayerPlus/blob/master/markdown/mpd-configure.1.md) : MPD configuration generator
- [**mpd-monitor**](https://github.com/doctorfree/MusicPlayerPlus/blob/master/markdown/mpd-monitor.1.md) : Display info on currently playing MPD song
- [**beet**](https://github.com/doctorfree/MusicPlayerPlus/blob/master/markdown/beet.1.md) : Beets media library management command-line interface
- [**beetsconfig**](https://github.com/doctorfree/MusicPlayerPlus/blob/master/markdown/beetsconfig.5.md) : Beets media library management configuration
- [**bandcamp-dl**](https://github.com/doctorfree/MusicPlayerPlus/blob/master/markdown/bandcamp-dl.1.md) : Download Bandcamp collections
- [**blissify**](https://github.com/doctorfree/MusicPlayerPlus/blob/master/markdown/blissify.1.md) : create MPD playlists using song similarity database
- [**scdl**](https://github.com/doctorfree/MusicPlayerPlus/blob/master/markdown/scdl.1.md) : Download Soundcloud favorites
- [**fzmp**](https://github.com/doctorfree/MusicPlayerPlus/blob/master/markdown/fzmp.1.md) : List and search MPD media using fuzzy find
- [**artist_to_albumartist**](https://github.com/doctorfree/MusicPlayerPlus/blob/master/markdown/artist_to_albumartist.1.md) : Copies the Artist tag to the AlbumArtist tag
- [**listyt**](https://github.com/doctorfree/MusicPlayerPlus/blob/master/markdown/listyt.1.md) : List YouTube video titles and urls
- [**yt-dlp**](https://github.com/doctorfree/MusicPlayerPlus/blob/master/markdown/yt-dlp.1.md) : Download YouTube and other sites videos and audio
- [**create_playlist**](https://github.com/doctorfree/MusicPlayerPlus/blob/master/markdown/create_playlist.1.md) : Create playlists using Beets queries

## Usage

The primary MusicPlayerPlus user interface is the `mpplus` command.
The default action of the `mpplus` command is to open the `mpcplus`
MPD client and the `mppcava` spectrum visualizer. The command
`mpplus -i` displays a series of interactive menus from which most
of the MusicPlayerPlus tasks can be launched.

The `mpc` command provides a quick and easy command line interface
to control the Music Player Daemon playback. The `mpc` command has
many command line options, see `man mpc` for a full description.
To get started with simple MPD playback control using `mpc`:

**mpc toggle**
: start playback if stopped or paused, and pause playback if playing

**mpc stop**
: stop playback

**mpc next**
: move to next song in playlist

**mpc prev**
: move to previous song in playlist

**mpc volume +|- percent**
: increase or decrease volume by 'percent'

The `beet play [QUERY]` command can be used to specify a song or songs
to play where 'QUERY' is a Beets query matching songs in the music library.

The usage messages for `mppinit`, `mpplus`, `mpcplus`, and `mppcava`
provide a brief summary of the command line options.

The `mppinit` performs one-time initializations:

```text
Usage: mppinit [-a] [-b] [-d] [-e] [-l music_dir] [-o] [-q] [-r] [-U] [-y] [-u] [bandcamp|discogs|discogs local|import|kitty|metadata|mopidy|mpd|navidrome|soundcloud|sync|yams]
Where:
 '-a' use AcousticBrainz for acoustic audio analysis (deprecated)
 '-b' use Blissify for MPD acoustic audio analysis
 '-d' install latest Beets development branch rather than
  the latest stable release (for testing purposes)
 '-e' use Essentia for Beets acoustic audio analysis (default)
 '-l music_dir' specifies the location of the music library
 '-o' indicates overwrite any pre-existing configuration
 '-q' indicates quiet execution, no status messages
 '-r' indicates remove service
  supported service removals: mopidy navidrome
 '-U' indicates do not upgrade installed Python modules
 '-y' indicates answer 'yes' to all and proceed
 '-u' displays this usage message and exits

 'bandcamp' downloads all albums in your Bandcamp collections
 'discogs' generates an Obsidian vault from your Discogs user collection
 'discogs local' generates an Obsidian vault from your local music library
  (DISCOGS_USER and DISCOGS_TOKEN in '~/.config/mpprc must be set)
 'import' performs a Beets music library import
 'kitty' installs the Kitty terminal emulator
 'metadata' performs a library metadata update
 'mopidy' installs and configures Mopidy extensible music server
  Note: activating Mopidy deactivates MPD
 'mpd' activates the MPD music server and deactivates Mopidy
 'navidrome' installs and configures Navidrome music server
  Note: 'mppinit navidrome <version>' can be used to specify
  an alternate version of Navidrome to download and install
 'soundcloud' downloads all favorites in your Soundcloud account
 'sync' synchronizes MusicPlayerPlus configuration across configs
 'yams' activates the YAMS Last.fm scrobbler service


'mppinit' must be run as the MusicPlayerPlus user, not root.
'mppinit' must be run prior to 'mppinit sync', 'mppinit kitty',
 'mppinit metadata', 'mppinit bandcamp', 'mppinit mopidy',
 'mppinit navidrome', 'mppinit soundcloud', or 'mppinit import'

```

The `mpplus` command serves as a general user interface for all of the
MusicPlayerPlus capabilities:

```text
Usage: mpplus [-A] [-a] [-b] [-B] [-c] [-C client] [-E] [-e] [-F] [-f]
 [-G] [-g] [-D art|bandcamp|soundcloud] [-d music_directory] [-h]
 [-H] [-I] [-i] [-jJ] [-k] [-K] [-L] [-m] [-n num] [-N]
 [-M alsaconf|enable|disable|restart|start|stop|status] [-p]
 [-P script] [-q] [-r] [-R] [-s song] [-S] [-t] [-T on|off] [-uU]
 [-v viz_comm] [-w|W] [-x query] [-X query] [-y] [-Y] [-z fzmpopt]
MPCplus/Visualizer options:
 -A indicates display album cover art (implies tmux session)
 -C 'client' indicates use 'client' MPD client rather than mpcplus
 -E indicates do not use gradient colors for spectrum visualizer
 -f indicates fullscreen display
 -h indicates half-height for visualizer window (with -f only)
 -H indicates disable use of extended window manager hints
 -P script specifies the ASCIImatics script to run in visualizer pane
 -q indicates quarter-height for visualizer window (with -f only)
 -c indicates use current terminal emulator / console mode
 -e indicates use simple terminal emulator
 -g indicates use gnome terminal emulator
 -k indicates use kitty terminal emulator
 -r indicates use retro terminal emulator
 -t indicates use tilix terminal emulator
 -U indicates use tmuxp to create tmux sessions
 -v 'viz_comm' indicates use visualizer 'viz_comm' rather than mppcava
ASCIImatics animation options:
 -a indicates play audio during ASCIImatics display
 -b indicates use backup audio during ASCIImatics display
 -j indicates use Julia Set scenes in ASCIImatics display
 -J indicates Julia Set with several runs using different parameters
 -m indicates use MusicPlayerPlus scenes in ASCIImatics display
 -n num specifies the number of times to cycle ASCIImatics scenes
 -N indicates use alternate comments in Plasma ASCIImatics scenes
 -p indicates use Plasma scenes in ASCIImatics display
 -s song specifies a song to accompany an ASCIImatics animation
  'song' can be the full pathname to an audio file or a
  relative pathname to an audio file in the MPD music library
  or $HOME/Music/
 -S indicates display ASCIImatics splash animation
General options:
 -B indicates analyze MPD music dir with Blissify and exit
 -D 'art' indicates download album cover art and exit
 -D 'bandcamp' indicates download Bandcamp songs and exit
 -D 'soundcloud' indicates download Soundcloud songs and exit
 -d 'music_directory' specifies the music directory to use for
  downloaded album cover art. Without this option -D will use
  the 'MUSIC_DIR' setting in '~/.config/mpprc'
 -F indicates convert WAV format files in the music library
  to MP3 format files and exit. A subsequent 'mpplus -I' import
  will be necessary to import these newly converted music files.
 -G indicates convert M4A format files in the music library
  to MP3 format files and exit. A subsequent 'mpplus -I' import
  will be necessary to import these newly converted music files.
 -I indicates import albums and songs from 'music_directory' to beets and exit
  In conjunction with '-I', the '-A' flag disables auto-tagging
 -i indicates start mpplus in interactive mode
 -K indicates kill MusicPlayerPlus tmux sessions and ASCIImatics scripts
 -L indicates download lyrics to the Beets library and exit
 -M 'action' can be used to control the Music Player Daemon (MPD)
     or configure the ALSA sound system
  ALSA configuration will update the ALSA configuration in '/etc/asound.conf'
 -R indicates record tmux session with asciinema
  Asciinema is not installed by MusicPlayerPlus
  To record tmux sessions with asciinema, use your system's
  package manager to install it (e.g. apt install asciinema)
 -T 'on|off' specifies whether to use a tmux session
 -w indicates write metadata during beets import
 -W indicates do not write metadata during beets import
 -x 'query' uses AcousticBrainz to retrieve audio-based information
  for all music library media matching 'query'. A query
  of 'all' performs the retrieval on the entire music library.
 -X 'query' performs an analysis and retrieval, using Essentia,
  of audio-based information for all music library media
  matching 'query'. A query of 'all' performs the analysis
  and retrieval on the entire music library.
 -Y initializes the YAMS last.fm scrobbler service
 -y disables the YAMS last.fm scrobbler service
 -z fzmpopt specifies the fzmp option and invokes fzmp to
  list/search/select media in the MPD library.
  Valid values for fzmpopt are 'a', 'A', 'g', 'p', or 'P'
 -u displays this usage message and exits
```

The `mpcplus` command is an MPD client and acts as the primary
MusicPlayerPlus music player:

```text
Usage: mpcplus [options]...
Options:
  -h [ --host ] HOST (=localhost)       connect to server at host
  -p [ --port ] PORT (=6600)            connect to server at port
  --current-song [=FORMAT(=<format string>)]
                                        print current song using given format
                                        and exit
  -c [ --config ] PATH (=~/.config/mpcplus/config AND ~/.mpcplus/config)
                                        specify configuration file(s)
  --ignore-config-errors                ignore unknown and invalid options in
                                        configuration files
  --test-lyrics-fetchers                check if lyrics fetchers work
  -b [ --bindings ] PATH (=~/.config/mpcplus/bindings AND ~/.mpcplus/bindings)
                                        specify bindings file(s)
  -s [ --screen ] SCREEN                specify the startup screen
  -S [ --slave-screen ] SCREEN          specify the startup slave screen
  -? [ --help ]                         show help message
  -v [ --version ]                      display version information
  -q [ --quiet ]                        suppress logs and excess output
```

The mpcplus MPD client has a customized set of key bindings that allow
quick and easy control of MPD, searches, lyrics display, client navigation,
and much more via the keyboard. View the
[**mpcpluskeys man page**](https://github.com/doctorfree/MusicPlayerPlus/blob/master/markdown/mpcpluskeys.1.md) with the command
`man mpcpluskeys`.

The `mppsplash` command can be used to display a variety of character
based animations optionally accompanied by audio:

```text
Usage: mppsplash [-A] [-a] [-b] [-C] [-c num] [-d] [-jJ] [-m] [-p] [-s song] [-u]
Where:
 -A indicates use all effects
 -a indicates play audio during ASCIImatics display
 -b indicates use backup audio during ASCIImatics display
 -C indicates use alternate comments in Plasma effect
 -c num specifies the number of times to cycle
 -d indicates enable debug mode
 -j indicates use Julia Set effect
 -J indicates Julia Set with several runs using different parameters
 -m indicates use MusicPlayerPlus effect
 -p indicates use Plasma effect
 -s song specifies the audio file to play as accompaniment
  'song' can be the full pathname to an audio file or a relative
  pathname to an audio file in the MPD music library or
  $HOME/Music/
 -u displays this usage message and exits
```

The `mppcava` command is the MusicPlayerPlus custom character based
audio spectrum visualizer:

```text
Usage : mppcava [options]
Visualize audio input in terminal.

Options:
    -p          path to config file
    -v          print version

Keys:
        Up        Increase sensitivity
        Down      Decrease sensitivity
        Left      Decrease number of bars
        Right     Increase number of bars
        r         Reload config
        c         Reload colors only
        f         Cycle foreground color
        b         Cycle background color
        q         Quit

All options are specified in a config file. See `$HOME/.config/mppcava/config`
```

## Example client invocations

The `mpplus` command is intended to serve as the primary interface to invoke
the `mpcplus` MPD client and `mppcava` spectrum visualizer. The `mpplus` command
utilizes several different terminal emulators and can also be used to invoke
any specified MPD client. Some example invocations of `mpplus` follow.

Open the mpcplus client and spectrum visualizer in fullscreen mode:

`mpplus -f`

Open the mpcplus client and mppcava visualizer in fullscreen mode using the
tilix terminal emulator and displaying the visualizer using quarter-height:

`mpplus -f -q -t`

Open the cantata MPD graphical client and mppcava visualizer:

`mpplus -C cantata`

Open the mpcplus client in the cool-retro-term terminal and mppcava visualizer
in kitty:

`mpplus -r`

Browse, list, search, and select media in the MPD library using the
`fzf` fuzzy finder utility.

Search artist then filter by album using `fzf`:

`mpplus -z a`

Search all songs in the library using `fzf`:

`mpplus -z A`

Search the current playlist using `fzf`:

`mpplus -z p`

The mpcplus MPD client can be opened directly without using mpplus.
Similarly, the mppcava spectrum visualizer can be opened directly without mpplus.

`mpcplus` # In one terminal window

`mppcava` # In another terminal window

To test the mpcplus lyrics fetchers:

`mpcplus --test-lyrics-fetchers`

## Adding Album Cover Art

The `mpcplus` MPD client is a character-based application. As such, it is
difficult to display graphical images. However, this limitation can be
overcome using `tmux` and additional tools. In this way we can add album
cover art to MusicPlayerPlus when using the character-based `mpcplus` client.

See [Adding album art to MusicPlayerPlus](https://github.com/doctorfree/MusicPlayerPlus/blob/master/config/README.md) to get
started integrating album art in MusicPlayerPlus.

An album cover art downloader is included in MusicPlayerPlus. To download
cover art for all of the albums in your MPD music directory, run the command:

```console
mpplus -D art
```

Cover art for each album is saved as the file `cover.jpg` in the album folder.
Existing cover art is preserved. If an album has incorrect album cover art and
Beets library management has been activated with `mppinit import`, update the
album cover art for that album with the command `beet fetchart -f <query>`
where `<query>` is a Beets query that identifies that album. For example,
to update the album cover art for the album "Eldorado" by Electric Light
Orchestra, issue the command `beet fetchart -f electric eldorado`.

## Custom key bindings

A few custom key bindings are configured during MusicPlayerPlus initialization
with the `mppinit` command. These are purely for convenience and can be altered
or removed if desired.

Tmux custom key bindings are defined in `$HOME/.tmux.conf`.
MusicPlayerPlus custom key bindings for tmux sessions include the following:

- `[ Alt-PgDn ]` - Next window
- `[ Shift-Right ]` - Next window
- `[ Alt-PgUp ]` - Previous window
- `[ Shift-Left ]` - Previous window
- `[ Alt-x ]` - Prompt to kill session
- `[ Alt-X ]` - Kill session
- `[ Alt-Left ]` - Move pane focus to left
- `[ Alt-Right ]` - Move pane focus to right
- `[ Alt-Up ]` - Move pane focus up
- `[ Alt-Down ]` - Move pane focus down
- `[ Prefix q ]` - Prompt to kill session
- `[ Prefix Q ]` - Kill session

The tmux prefix key is remapped from `Ctrl-b` to `Ctrl-a` and the status bar
is configured to display a `Ctrl` message when the prefix key is pressed.

The MusicPlayerPlus tmux customization enables tmux mouse mode. The mouse can
be used to select and resize tmux panes and windows.

There are hundreds of tmux key bindings. To view the currently configured
tmux key bindings, execute the command `tmux list-keys`.

Custom key bindings are also defined for the `mpcplus` music player client
command. Mpcplus custom key bindings are defined in
`$HOME/.config/mpcplus/bindings`. MusicPlayerPlus custom key bindings for
`mpcplus` include the following:

- `[ Alt-c ]` - Display album cover art for currently playing song
- `[ Alt-f ]` - Open the fuzzy finder to search/select media
- `[ Alt-m ]` - Open the MPD monitor in a terminal window
- `[ Alt-r ]` - Raise/lower the spectrum visualizer window

### Tmux session exit issues

In addition to the `Alt-x` and `Alt-X` key bindings above to kill the current
tmux session, MusicPlayerPlus tmux key bindings include `Ctrl-a q` and
`Ctrl-a Q` which also are mapped to `kill-session` in a similar manner. This
is because some terminal emulators, in particular iTerm2, may already have key
bindings for the `Alt` key or the Meta key may be something other than `Alt`.

In a MusicPlayerPlus tmux session, if `Alt-x` and `Alt-X` do not initiate
a `kill-session` then use the configured tmux prefix key (e.g. `Ctrl-a`)
followed by `q` or `Q` to exit the current tmux session.

If a MusicPlayerPlus tmux session has been initiated over SSH using the
Terminal app on macOS then it may be necessary to configure the Terminal
profile in use to "Use Option as Meta key" in order to recognize the custom
tmux key bindings using the `Alt` key. To configure the Terminal app profile
in this manner, go to `Terminal -> Preferences -> Profiles`. Select the
profile you are using (usually "Basic Default") and select the `Keyboard` tab.
Click the "Use Option as Meta key" checkbox and exit Terminal preferences.
