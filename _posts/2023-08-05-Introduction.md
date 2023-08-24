---
title: Introduction to MusicPlayerPlus
author: doctorfree
date: 2023-08-05 12:15:00 +0800
tags: [intro, info, introduction]
pin: true
img_path: "/posts/20230805"
---

## MusicPlayerPlus Introduction

[Mpcplus](https://github.com/doctorfree/MusicPlayerPlus/mpcplus){:target="_blank"}{:rel="noopener noreferrer"} is an mpd
client (compatible with [mopidy](https://mopidy.com){:target="_blank"}{:rel="noopener noreferrer"}) with a UI very similar
to `ncmpc`, but it provides new useful features such as support for regular
expressions for library searches, extended song format, items filtering, the
ability to sort playlists, and a local filesystem browser.

To use it, a functional ''mpd'' must be present on the system since
''mpcplus''/''mpd'' work together in a client/server relationship.

## Installation

To install download the latest Debian or RPM format package from the
[MusicPlayerPlus Releases](https://github.com/doctorfree/MusicPlayerPlus/releases){:target="_blank"}{:rel="noopener noreferrer"}.

## MPD Server Configuration

Edit `~/.config/mpd/mpd.conf`, uncomment the `music_directory` entry and
set the value to the location of your music library. For example,

```
music_directory  "/u/audio/Music"
```

Adjust the `audio_output` settings in `mpd.conf`. MPD must have at least
one `audio_output` configured and in order to use the spectrum visualizer
as configured by default it is necessary to configure a second `audio_output`
in MPD.

A FIFO `audio_output` is used as a data source for the Cava spectrum visualizer.
To configure this output, add the following to `~/.config/mpd/mpd.conf`:

```
audio_output {
    type            "fifo"
    name            "Visualizer feed"
    path            "/tmp/mpd.fifo"
    format          "44100:16:2"
}
```

An example ALSA `audio_output` configuration in `~/.config/mpd/mpd.conf`:

```
audio_output {
 type  "alsa"
 name  "My ALSA Device"
    buffer_time "50000"   # (50ms); default is 500000 microseconds (0.5s)
# device  "hw:0,0" # optional
# mixer_type      "hardware"      # optional
# mixer_device "default" # optional
# mixer_control "PCM"  # optional
# mixer_index "0"  # optional
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

MPD is a powerful and flexible music player server with many configuration
options. Additional MPD configuration may be desired. See the
[MPD User's Manual](https://mpd.readthedocs.io/en/stable/user.html){:target="_blank"}{:rel="noopener noreferrer"}

## Basic configuration

The shell "GUI" for ''mpcplus'' is highly customizable. Edit {{ic|$XDG_CONFIG_HOME/mpcplus/config}} to your liking. If, after installation, {{ic|$XDG_CONFIG_HOME/mpcplus/config}} has not been created, simply copy the sample config,
and edit at the very least the following three configuration options:

- '''mpd_host''' - Should point to the host on which ''mpd'' resides, can be "localhost", "127.0.0.1" or "::1" if on the same machine. To connect with a password, write "''password''@''host''"
- '''mpd_port''' - The default of ''mpd'' should be "6600"
- '''mpd_music_dir''' - The same directory value as specified in "music_directory" in {{ic|mpd.conf}}

For inspiration, see the following resources:

- Sample configuration file in {{ic|/usr/share/doc/musicplayerplus/mpcplus/config}}.

The sample mpcplus configuration and bindings files can be used to
initialize a user's mpcplus client configuration by executing the
`mppinit` command.

## Usage

The usage messages for `mpplus`, `mpcplus`, and `mppcava` provide a brief
summary of the command line options:

```
Usage: mpplus [-A] [-a] [-b] [-c] [-C client] [-D] [-d music_directory]
  [-g] [-f] [-h] [-i] [-jJ] [-k] [-m]
  [-M alsaconf|enable|disable|restart|start|stop|status]
  [-n num] [-N] [-p] [-P script] [-q] [-r] [-R] [-s song]
  [-S] [-t] [-T] [-u] [-v viz_comm] [-z fzmpopt]
MPCplus/Visualizer options:
 -A indicates display album cover art (implies tmux session)
 -c indicates use cantata MPD client rather than mpcplus
 -C 'client' indicates use 'client' MPD client rather than mpcplus
 -f indicates fullscreen display
 -g indicates do not use gradient colors for spectrum visualizer
 -i indicates start mpplus in interactive mode
 -h indicates half-height for visualizer window (with -f only)
 -P script specifies the ASCIImatics script to run in visualizer pane
 -q indicates quarter-height for visualizer window (with -f only)
 -r indicates use retro terminal emulator
 -t indicates use tilix terminal emulator
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
 -D indicates download album cover art
 -d 'music_directory' specifies the music directory to use for
  downloaded album cover art (without this option -D will use
  the 'music_directory' setting in '~/.config/mpd/mpd.conf'
 -k indicates kill MusicPlayerPlus tmux sessions and ASCIImatics scripts
 -M 'action' can be used to control the Music Player Daemon (MPD)
     or configure the ALSA sound system
  ALSA configuration will update the ALSA configuration in '/etc/asound.conf'
 -R indicates record tmux session with asciinema
 -T indicates use a tmux session for either ASCIImatics or mpcplus
 -z fzmpopt specifies the fzmp option and invokes fzmp to
  list/search/select media in the MPD library.
  Valid values for fzmpopt are 'a', 'A', 'g', 'p', or 'P'
 -u displays this usage message and exits
```

```
Usage: mpcplus [options]...
Options:
  -h [ --host ] HOST (=localhost)       connect to server at host
  -p [ --port ] PORT (=6600)            connect to server at port
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

The mpcplus MPD client has an extensive set of key bindings that allow
quick and easy control of MPD, searches, lyrics display, client navigation,
and much more via the keyboard. View the
[**mpcpluskeys man page**](https://github.com/doctorfree/MusicPlayerPlus/wiki/mpcpluskeys.1){:target="_blank"}{:rel="noopener noreferrer"} with the command
`man mpcpluskeys`.

```
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

All options are specified in a config file. See `~/.config/mppcava/`
```

### Example client invocations

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

`mpplus -c`

Open the mpcplus client in the cool-retro-term terminal and mppcava visualizer
in gnome-terminal:

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

### KEYS - MOVEMENT

- `[ Up k ]` - Move cursor up
- `[ Down j ]` - Move cursor down
- `[ [ ]` - Move cursor up one album
- `[ ] ]` - Move cursor down one album
- `[ { ]` - Move cursor up one artist
- `[ } ]` - Move cursor down one artist
- `[ Page Up ]` - Page up
- `[ Page Down ]` - Page down
- `[ Home ]` - Home
- `[ End ]` - End
- `[ Tab ]` - Switch to next screen in sequence
- `[ Shift-Tab ]` - Switch to previous screen
- `[ F1 ]` - Show help
- `[ 1 ]` - Show playlist
- `[ 2 ]` - Show browser
- `[ 3 ]` - Show search engine
- `[ 4 ]` - Show media library
- `[ 5 ]` - Show playlist editor
- `[ 6 ]` - Show tag editor
- `[ 7 ]` - Show outputs
- `[ 8 ]` - Show music visualizer
- `[ = ]` - Show clock
- `[ @ ]` - Show server info

### KEYS - GLOBAL

- `[ s ]` - Stop
- `[ p ]` - Pause
- `[ > ]` - Next track
- `[ < ]` - Previous track
- `[ Ctrl-H Backspace ]` - Replay playing song
- `[ f ]` - Seek forward in playing song
- `[ b ]` - Seek backward in playing song
- `[ - Left ]` - Decrease volume by 2%
- `[ Right + ]` - Increase volume by 2%
- `[ t ]` - Toggle space mode (select/add)
- `[ T ]` - Toggle add mode (add or remove/always add)
- `[ | ]` - Toggle mouse support
- `[ v ]` - Reverse selection
- `[ V ]` - Remove selection
- `[ B ]` - Select songs of album around the cursor
- `[ a ]` - Add selected items to playlist
- ``[ ` ]`` - Add random items to playlist
- `[ r ]` - Toggle repeat mode
- `[ z ]` - Toggle random mode
- `[ y ]` - Toggle single mode
- `[ R ]` - Toggle consume mode
- `[ Y ]` - Toggle replay gain mode
- `[ # ]` - Toggle bitrate visibility
- `[ Z ]` - Shuffle playlist
- `[ x ]` - Toggle crossfade mode
- `[ X ]` - Set crossfade
- `[ u ]` - Start music database update
- `[ : ]` - Execute command
- `[ Ctrl-F ]` - Apply filter
- `[ / ]` - Find item forward
- `[ ? ]` - Find item backward
- `[ , ]` - Jump to previous found item
- `[ . ]` - Jump to next found item
- `[ w ]` - Toggle find mode (normal/wrapped)
- `[ G ]` - Locate song in browser
- `[ ~ ]` - Locate song in media library
- `[ Ctrl-L ]` - Lock/unlock current screen
- `[ Left h ]` - Switch to master screen (left one)
- `[ Right l ]` - Switch to slave screen (right one)
- `[ E ]` - Locate song in tag editor
- `[ P ]` - Toggle display mode
- `[ \ ]` - Toggle user interface
- `[ ! ]` - Toggle displaying separators between albums
- `[ g ]` - Jump to given position in playing song (formats: mm:ss, x%)
- `[ i ]` - Show song info
- `[ I ]` - Show artist info
- `[ L ]` - Toggle lyrics fetcher
- `[ F ]` - Toggle fetching lyrics for playing songs in background
- `[ q ]` - Quit

### KEYS - PLAYLIST

- `[ Enter ]` - Play selected item
- `[ Delete ]` - Delete selected item(s) from playlist
- `[ c ]` - Clear playlist
- `[ C ]` - Clear playlist except selected item(s)
- `[ Ctrl-P ]` - Set priority of selected items
- `[ Ctrl-K m ]` - Move selected item(s) up
- `[ n Ctrl-J ]` - Move selected item(s) down
- `[ M ]` - Move selected item(s) to cursor position
- `[ A ]` - Add item to playlist
- `[ e ]` - Edit song
- `[ S ]` - Save playlist
- `[ Ctrl-V ]` - Sort playlist
- `[ Ctrl-R ]` - Reverse playlist
- `[ o ]` - Jump to current song
- `[ U ]` - Toggle playing song centering

### KEYS - BROWSER

- `[ Enter ]` - Enter directory/Add item to playlist and play it
- `[ Space ]` - Add item to playlist/select it
- `[ e ]` - Edit song
- `[ e ]` - Edit directory name
- `[ e ]` - Edit playlist name
- `[ 2 ]` - Browse MPD database/local filesystem
- ``[ ` ]`` - Toggle sort mode
- `[ o ]` - Locate playing song
- `[ Ctrl-H Backspace ]` - Jump to parent directory
- `[ Delete ]` - Delete selected items from disk
- `[ G ]` - Jump to playlist editor (playlists only)

### KEYS - SEARCH ENGINE

- `[ Enter ]` - Add item to playlist and play it/change option
- `[ Space ]` - Add item to playlist
- `[ e ]` - Edit song
- `[ y ]` - Start searching
- `[ 3 ]` - Reset search constraints and clear results

### KEYS - MEDIA LIBRARY

- `[ 4 ]` - Switch between two/three columns mode
- `[ Left h ]` - Previous column
- `[ Right l ]` - Next column
- `[ Enter ]` - Add item to playlist and play it
- `[ Space ]` - Add item to playlist
- `[ e ]` - Edit song
- `[ e ]` - Edit tag (left column)/album (middle/right column)
- ``[ ` ]`` - Toggle type of tag used in left column
- `[ m ]` - Toggle sort mode

### KEYS - PLAYLIST EDITOR

- `[ Left h ]` - Previous column
- `[ Right l ]` - Next column
- `[ Enter ]` - Add item to playlist and play it
- `[ Space ]` - Add item to playlist/select it
- `[ e ]` - Edit song
- `[ e ]` - Edit playlist name
- `[ Ctrl-K m ]` - Move selected item(s) up
- `[ n Ctrl-J ]` - Move selected item(s) down
- `[ Delete ]` - Delete selected playlists (left column)
- `[ Delete ]` - Delete selected item(s) from playlist (right column)
- `[ c ]` - Clear playlist
- `[ C ]` - Clear playlist except selected item(s)
- `[ Ctrl-P ]` - Set priority of selected items
- `[ Ctrl-K m ]` - Move selected item(s) up
- `[ n Ctrl-J ]` - Move selected item(s) down
- `[ M ]` - Move selected item(s) to cursor position
- `[ A ]` - Add item to playlist
- `[ e ]` - Edit song
- `[ S ]` - Save playlist
- `[ Ctrl-V ]` - Sort playlist
- `[ Ctrl-R ]` - Reverse playlist
- `[ o ]` - Jump to current song
- `[ U ]` - Toggle playing song centering

### KEYS - LYRICS

- `[ Space ]` - Toggle reloading lyrics upon song change
- `[ e ]` - Open lyrics in external editor
- ``[ ` ]`` - Refetch lyrics

# KEYS - TERMINAL WINDOWS

- `[ Alt-f ]` - Open the fuzzy finder to search/select media
- `[ Alt-r ]` - Raise/lower the spectrum visualizer window
- `[ Alt-1 ]` - Set xfce4-terminal window transparency to 90%
- `[ Alt-2 ]` - Set xfce4-terminal window transparency to 80%
- `[ Alt-3 ]` - Set xfce4-terminal window transparency to 70%
- `[ Alt-4 ]` - Set xfce4-terminal window transparency to 60%
- `[ Alt-5 ]` - Set xfce4-terminal window transparency to 50%
- `[ Alt-6 ]` - Set xfce4-terminal window transparency to 40%
- `[ Alt-7 ]` - Set xfce4-terminal window transparency to 30%
- `[ Alt-8 ]` - Set xfce4-terminal window transparency to 20%
- `[ Alt-9 ]` - Set xfce4-terminal window transparency to 10%
- `[ Alt-0 ]` - Set xfce4-terminal window 100% opaque

# KEYS - TMUX SESSIONS

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

When `mpcplus` is executed in a `tmux` session `Shift-Right Arrow` will switch
to a tmux window running the fuzzy media finder `fzmp`.

### KEYS - TINY TAG EDITOR

- `[ Enter ]` - Edit tag
- `[ y ]` - Save

### KEYS - TAG EDITOR

- `[ Enter ]` - Edit tag/filename of selected item (left column)
- `[ Enter ]` - Perform operation on all/selected items (middle
  column)
- `[ Space ]` - Switch to albums/directories view (left column)
- `[ Space ]` - Select item (right column)
- `[ Left h ]` - Previous column
- `[ Right l ]` - Next column
- `[ Ctrl-H Backspace ]` - Jump to parent directory (left column,
  directories view)

## Tips and tricks

### Remapping keys

A listing of key bindings and their respective functions is available from within mpcplus itself via hitting {{ic|F1}}. Users may remap any of the default keys simply by copying {{ic|/usr/share/doc/musicplayerplus/mpcplus/bindings}} to {{ic|$XDG_CONFIG_HOME/mpcplus/}} and editing it.

### Autoset Tags from Filename and vice versa

In the Tag Editor you can select a directory with music and then select the {{ic|Filename}} option in the middle section. This opens a little window with two options: {{ic|Get Tags from Filename}} and {{ic|Rename files}}.
If you choose {{ic|Get Tags From Filename}}, a popup with two windows is shown. On the left side you can enter a pattern that extracts the selected information from the filenames. You can also hit {{ic|Preview}} to see what the result would look like. On the right side you can see the legend containing all the possible keywords to be used for extraction.

A simple Example would be the pattern: {{ic|%a - %t}}. If your files are named according to this pattern (Artist - Title) then this pattern would extract this information and set the Tags for the File.

The other option {{ic|Rename Files}} does the exact opposite. It takes the Tags from the audio files and creates a Filename from them.

### Notification on song change

The {{ic|execute_on_song_change}} command can be coupled with ''notify-send'' to generate notifications whenever the song changes (and upon application launch). This is contingent upon having a notification server installed and configured. Edit {{ic|$XDG_CONFIG_HOME/mpcplus/config}}, for example:

execute_on_song_change = notify-send "Now Playing" "$(mpc --format '%title% \n%artist% - %album%' current)"
