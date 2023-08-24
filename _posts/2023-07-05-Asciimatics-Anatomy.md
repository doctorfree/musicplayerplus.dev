---
title: Anatomy of an ASCIImatics Script
author: doctorfree
date: 2023-07-05 14:35:00 +0800
tags: [design, script, asciimatics, animation]
pin: true
img_path: "/posts/20230705"
---

## Anatomy of an ASCIImatics Script

This document examines the design, structure, features, and coding of
a scripted [ASCIImatics](https://github.com/peterbrittain/asciimatics){:target="_blank"}{:rel="noopener noreferrer"}
animation. As an example we use the `asciimpplus` command from the
[MusicPlayerPlus project](https://github.com/doctorfree/MusicPlayerPlus){:target="_blank"}{:rel="noopener noreferrer"}.
This script displays an ASCIImatics animation featuring ascii art for that
project. It is complex enough to illustrate many of the features available
in ASCIImatics while remaining simple enough to act as an example.

The included code fragments will be annotated with comments where necessary
to provide a clearer explanation of what is intended. Comments in Python
begin with the hash character (`#`) and extend to the end of that line.

## Script Usage

First let's look at this ASCIImatics script's usage in normal use to
understand how it is supposed to function.

### Synopsis

The `asciimpplus` is invoked from the command line with the following options:

**asciimpplus** [-h] [-d] [-a AUDIO] [-c CYCLE] [-f font]

We use the standard Python
[argparse](https://docs.python.org/3/library/argparse.html){:target="_blank"}{:rel="noopener noreferrer"} facility
to process the script's command line arguments.

### Command Line Options

**-h, --help**
: show a help message and exit

**-a AUDIO, --audio AUDIO**
: audio file to play during effects

**-c CYCLE, --cycle CYCLE**
: number of times to cycle through effects

**-d, --debug**
: enable debug mode

**-f FONT, --font FONT**
: Font for FigletText in Cycle effect, default 'small'

### Description

The _asciimpplus_ command plays one of the ASCIImatics animations included in
MusicPlayerPlus. Command line options can be used to tell _asciimpplus_ to play
animations for a specified number of cycles, which audio file to use as
accompaniment, and specify the font used in the Cycle effect.

### Examples

**asciimpplus**
: Without options asciimpplus will display an ASCIImatics animation featuring MusicPlayerPlus. These will continue until the 'q' key is pressed.

**asciimpplus -c 10**
: Plays the MusicPlayerPlus ASCIImatics animation 10 times then exits

**asciimpplus -a /usr/share/doc/musicplayerplus/music/Epic_Dramatic-Yuriy_Bespalov.wav -c 5**
: Plays the MusicPlayerPlus ASCIImatics animation 5 times accompanied by audio then exits

**asciimpplus -f big**
: Plays the ASCIImatics animation using the 'big' FigletText font for the Cycle effect

## Program Flow

When invoked from the command line the script initiates the following flow.

### Module Imports

The script first imports the Python and ASCIImatics modules it utilizes:

```python
#!/usr/bin/env python3
#
# Import the standard Python modules we use
from __future__ import division
import argparse
import os
import signal, tempfile
import subprocess
import sys
import time
from random import randint, choice
from pyfiglet import Figlet

# This script uses several ASCIImatics effects and renderers, imported here
from asciimatics.effects import Scroll, Mirage, Wipe, Cycle, Matrix, \
    BannerText, Stars, Print
from asciimatics.particles import RingFirework, SerpentFirework, StarFirework, \
    PalmFirework
from asciimatics.renderers import FigletText, Rainbow, Fire
from asciimatics.scene import Scene
from asciimatics.screen import Screen
from asciimatics.exceptions import ResizeScreenError
```

### Argument Processing

Command line arguments are processed using `argparse`:

```python
    parser = argparse.ArgumentParser()
    parser.add_argument("-a", "--audio", help="audio file to play during effects")
    parser.add_argument("-c", "--cycle", help="number of times to cycle back through effects")
    parser.add_argument("-d", "--debug", default=False, action='store_true', help="Output hopefully useful debugging statements")
    parser.add_argument("-f", "--font", help="Font for FigletText in Cycle effect, default 'small'")
    args = parser.parse_args()

    if args.audio:
        song = args.audio
    else:
        song = None
    if args.cycle:
        numcycles = args.cycle
    else:
        numcycles = None
    if args.debug:
        debug = True
    else:
        debug = False
    if args.font:
        font = args.font
    else:
        font = "small"
```

### Initialization and FIFO creation

This script uses the `mplayer` command to optionally play music
during the animation. The initial setup includes the creation of
a named pipe (FIFO) to communicate with the `mplayer` process.

```python
    # Initialize the handle to the mplayer subprocess to None
    play_song = None
    # A temporary directory to hold the mplayer FIFO is created
    tmpdir = tempfile.mkdtemp()
    # The name of the mplayer FIFO is generated
    fifo = os.path.join(tmpdir, 'mplayer.fifo')
    # Catch Ctrl-c and use the signal handler 'signal_handler'
    # This is needed to cleanup temporary files/dirs created here
    # and also to fade the audio volume so exiting is not jarring
    signal.signal(signal.SIGINT, signal_handler)
    # In the argument processing above we set `song = None` if no audio
    # argument was provided on the command line. We use this to check
    # if we are playing audio with mplayer. If not playing audio, we
    # do not create the FIFO or attempt to send mplayer commands.
    if song is not None:
        if debug:
            print("Using mplayer FIFO " + fifo)
        os.mkfifo(fifo)
        if debug:
            print("MPlayer starting: mplayer -novideo -volume 80 -really-quiet -nolirc -slave -input file=" + fifo + " " + song)
        # MPlayer is quite flexible and powerful. We use its ability to read
        # from a named pipe in slave mode to send commands to the mplayer process
        # by writing to the FIFO created above with `os.mkfifo(fifo)`
        play_song = subprocess.Popen(
            ["mplayer", "-novideo", "-volume", "80", "-really-quiet", "-nolirc", "-slave", "-input", "file=" + fifo, song],
            stdout=subprocess.DEVNULL,
            stderr=subprocess.STDOUT)
```

### Main Program Screen.wrapper

A typical ASCIImatics script will enter a while loop, calling
`Screen.wrapper()` with a class containing the effects and renderers
defined in the script. Here we examine the flow of the main body of
the program when invoking the screen wrapper class.

```python
    while True:
        try:
            # `_mpplus` is our class, defined in a subsequent section below
            Screen.wrapper(_mpplus)

            # Again, we only deal with the FIFO when playing audio with mplayer
            if song is not None:
                # If playing audio, open the FIFO and write mplayer commands
                with open(fifo, "w") as mp_fifo:
                    if debug:
                        print("Fading volume")
                    for vol in range(80, 0, -5):
                        print("volume " + str(vol) + " 1",
                                flush=True, file=mp_fifo)
                        time.sleep(0.1)
                    if debug:
                        print("Stopping mplayer")
                    print("stop", flush=True, file=mp_fifo)
                    if debug:
                        print("Resetting volume")
                    print("volume 80 1", flush=True, file=mp_fifo)
                    if debug:
                        print("Exiting mplayer")
                    print("quit", flush=True, file=mp_fifo)
                os.remove(fifo)

            # Always remove the temporary directory, even if not playing audio
            if debug:
                print("Removing mplayer FIFO")
            os.rmdir(tmpdir)

            # Check to see if the audio is still playing and if so, kill it
            if play_song is not None:
                song_status = play_song.poll()
                if song_status is None:
                    os.kill(play_song.pid, signal.SIGTERM)

            # Exit the ASCIImatics animation
            sys.exit(0)
        except ResizeScreenError:
            pass
```

### Signal Handler

The `signal_handler` setup above with
`signal.signal(signal.SIGINT, signal_handler)`
will perform similar actions as is done in the main program flow
described above in the case of program execution interruption.
Again we clean up temporary files/directories and fade the audio.

```python
    def signal_handler(signal_number, frame):
        if debug:
            print("In signal handler with\nsignal number = " + str(signal_number))
            print("frame = " + str(frame))
        # Only cleanup FIFO if audio was enabled
        if play_song is not None:
            with open(fifo, "w") as mp_fifo:
                if debug:
                    print("Fading volume in signal handler")
                for vol in range(80, 0, -5):
                    print("volume " + str(vol) + " 1", flush=True, file=mp_fifo)
                    time.sleep(0.1)
                if debug:
                    print("Stopping mplayer in signal handler")
                print("stop", flush=True, file=mp_fifo)
                if debug:
                    print("Resetting volume in signl handler")
                print("volume 80 1", flush=True, file=mp_fifo)
                if debug:
                    print("Exiting mplayer in signal handler")
                print("quit", flush=True, file=mp_fifo)
            if debug:
                print("Removing mplayer FIFO in signal handler")
            os.remove(fifo)
        os.rmdir(tmpdir)
        sys.exit(0)
```

### ASCIImatics Effects and Renderers

`_mpplus` is our ASCIImatics effects and renderers class. This is the class
provided as the argument to `Screen.wrapper` in the main program while loop.
Here we define ASCImatics `scenes` which are then played for the specified
number of cycles.

```python
def _mpplus(screen):
    # Start with an empty list of scenes
    scenes = []
    # Get the center of the screen
    center = (screen.width // 2, screen.height // 2)

    # The text we want to use for this first scene
    text = Figlet(font="banner", width=200).renderText("MusicPlayer")
    width = max([len(x) for x in text.split("\n")])

    # Define our first effects, create a scene from these effects,
    # and add the scene to our list of scenes.
    effects = [
        Print(screen,
              Fire(screen.height, 80, text, 0.4, 40, screen.colours),
              0,
              speed=1,
              transparent=False),
        Print(screen,
              FigletText("MusicPlayer", "banner"),
              screen.height - 9, x=(screen.width - width) // 2 + 1,
              colour=Screen.COLOUR_BLACK,
              bg=Screen.COLOUR_BLACK,
              speed=1),
        Print(screen,
              FigletText("MusicPlayer", "banner"),
              screen.height - 9,
              colour=Screen.COLOUR_WHITE,
              bg=Screen.COLOUR_WHITE,
              speed=1),
    ]
    scenes.append(Scene(effects, 100))

    # The text we want to use for the second scene
    text = Figlet(font="banner", width=200).renderText("Plus!")
    width = max([len(x) for x in text.split("\n")])

    # Similar to the first scene with different text, same effects,
    # create and add the scene to our list of scenes.
    effects = [
        Print(screen,
              Fire(screen.height, 80, text, 0.4, 60, screen.colours),
              0,
              speed=1,
              transparent=False),
        Print(screen,
              FigletText("    Plus!    ", "banner"),
              screen.height - 9, x=(screen.width - width) // 2 + 1,
              colour=Screen.COLOUR_BLACK,
              bg=Screen.COLOUR_BLACK,
              speed=1),
        Print(screen,
              FigletText("    Plus!    ", "banner"),
              screen.height - 9,
              colour=Screen.COLOUR_WHITE,
              bg=Screen.COLOUR_WHITE,
              speed=1),
    ]
    scenes.append(Scene(effects, 100))

    # Repeat this process for as many scenes as you wish with whatever
    # effects each scene might have. This animation has quite a few scenes
    # utilizing many ASCIImatics effects and renderers.
    #
    # The ever popular Matrix screen effect
    effects = [
        Matrix(screen, stop_frame=200),
        Mirage(
            screen,
            FigletText("MusicPlayerPlus"),
            center[1] - 3,
            Screen.COLOUR_GREEN,
            start_frame=100,
            stop_frame=200),
        Wipe(screen, start_frame=150),
        Cycle(
            screen,
            FigletText("MusicPlayerPlus"),
            center[1] - 3,
            start_frame=200)
    ]
    scenes.append(Scene(effects, 250, clear=False))

    # A banner effect
    effects = [
        BannerText(
            screen,
            Rainbow(screen, FigletText(
                "ASCIImatics and ASCIInema Integration", font='slant')),
            center[1] - 3,
            Screen.COLOUR_GREEN)
    ]
    scenes.append(Scene(effects))

    # The Mirage effect with scrolling using FigletText
    effects = [
        Scroll(screen, 3),
        Mirage(
            screen,
            FigletText("Conceived and"),
            screen.height,
            Screen.COLOUR_GREEN),
        Mirage(
            screen,
            FigletText("written by"),
            screen.height + 8,
            Screen.COLOUR_GREEN),
        Mirage(
            screen,
            FigletText("Ronald Joe Record"),
            screen.height + 16,
            Screen.COLOUR_GREEN)
    ]
    scenes.append(Scene(effects, (screen.height + 24) * 3))

    # Lots of banners
    effects = [
        BannerText(
            screen,
            Rainbow(screen, FigletText(
                "Music Player Plus", font='banner3-D')),
            center[1] - 3,
            Screen.COLOUR_CYAN),
        Stars(screen, (screen.width + screen.height) // 2, stop_frame=0)
    ]
    scenes.append(Scene(effects))

    effects = [
        BannerText(
            screen,
            Rainbow(screen, FigletText(
                "ASCII MPD Client", font='banner3-D')),
            center[1] - 3,
            Screen.COLOUR_CYAN),
        Stars(screen, (screen.width + screen.height) // 2, stop_frame=0)
    ]
    scenes.append(Scene(effects))

    effects = [
        BannerText(
            screen,
            Rainbow(screen, FigletText(
                "Album Cover Art", font='banner3-D')),
            center[1] - 3,
            Screen.COLOUR_CYAN),
        Stars(screen, (screen.width + screen.height) // 2, stop_frame=0)
    ]
    scenes.append(Scene(effects))

    # Effects and renderers can be chained.
    # Here is an example of FigletText being fed to the Rainbow renderer
    # which is then fed to the Mirage effect. The screen is then wiped and
    # FigletText is fed to Rainbow to the Cycle effect.
    effects = [
        Mirage(
            screen,
            Rainbow(screen, FigletText("Spectrum")),
            center[1] - 5,
            Screen.COLOUR_GREEN,
            stop_frame=200),
        Mirage(
            screen,
            Rainbow(screen, FigletText("Visualizer")),
            center[1] + 2,
            Screen.COLOUR_GREEN,
            stop_frame=200),
        Wipe(screen, start_frame=150),
        Cycle(
            screen,
            Rainbow(screen, FigletText("Spectrum")),
            center[1] - 5,
            start_frame=200),
        Cycle(
            screen,
            Rainbow(screen, FigletText("Visualizer")),
            center[1] + 2,
            start_frame=200)
    ]

    # ASCIImatics has a fire effect (above) and a fireworks effect
    for _ in range(20):
        fireworks = [
            (PalmFirework, 25, 30),
            (PalmFirework, 25, 30),
            (StarFirework, 25, 35),
            (StarFirework, 25, 35),
            (StarFirework, 25, 35),
            (RingFirework, 20, 30),
            (SerpentFirework, 30, 35),
        ]
        firework, start, stop = choice(fireworks)
        effects.insert(
            1,
            firework(screen,
                     randint(0, screen.width),
                     randint(screen.height // 8, screen.height * 3 // 4),
                     randint(start, stop),
                     start_frame=randint(0, 250)))
    scenes.append(Scene(effects))

    # There is also a Stars effect
    effects = [
        Cycle(
            screen,
            FigletText("MusicPlayerPlus", font=font),
            center[1] - 8,
            stop_frame=200),
        Cycle(
            screen,
            FigletText("ROCKS!", font=font),
            center[1] + 3,
            stop_frame=200),
        Stars(screen, (screen.width + screen.height) // 2, stop_frame=200)
    ]
    scenes.append(Scene(effects, 200))

    # Stars with fireworks
    effects = [
        Stars(screen, screen.width),
    ]
    for _ in range(20):
        fireworks = [
            (PalmFirework, 25, 30),
            (PalmFirework, 25, 30),
            (StarFirework, 25, 35),
            (StarFirework, 25, 35),
            (StarFirework, 25, 35),
            (RingFirework, 20, 30),
            (SerpentFirework, 30, 35),
        ]
        firework, start, stop = choice(fireworks)
        effects.insert(
            1,
            firework(screen,
                     randint(0, screen.width),
                     randint(screen.height // 8, screen.height * 3 // 4),
                     randint(start, stop),
                     start_frame=randint(0, 250)))

    # Finish off with Rainbow rendered FigletText
    effects.append(Print(screen,
                         Rainbow(screen, FigletText("MUSIC")),
                         center[1] - 6,
                         speed=1,
                         start_frame=100))
    effects.append(Print(screen,
                         Rainbow(screen, FigletText("PLAYER PLUS!")),
                         center[1] + 1,
                         speed=1,
                         start_frame=100))
    scenes.append(Scene(effects, 300))

    # All of the scenes have been defined. Send them to the `play()` method.
    # Here we check if a number of cycles was specified on the command line.
    # If not then play forever. If cycles was specified then do not repeat.
    if numcycles is None:
        screen.play(scenes, stop_on_resize=True)
    else:
        screen.play(scenes, stop_on_resize=True, repeat=False)
```

## Entire Program

Putting all these together we have the entire ASCIImatics animation script
for `asciimpplus`:

```python
#!/usr/bin/env python3

from __future__ import division
import argparse
import os
import signal, tempfile
import subprocess
import sys
import time
from random import randint, choice
from pyfiglet import Figlet

from asciimatics.effects import Scroll, Mirage, Wipe, Cycle, Matrix, \
    BannerText, Stars, Print
from asciimatics.particles import RingFirework, SerpentFirework, StarFirework, \
    PalmFirework
from asciimatics.renderers import FigletText, Rainbow, Fire
from asciimatics.scene import Scene
from asciimatics.screen import Screen
from asciimatics.exceptions import ResizeScreenError


def _mpplus(screen):
    scenes = []
    center = (screen.width // 2, screen.height // 2)

    text = Figlet(font="banner", width=200).renderText("MusicPlayer")
    width = max([len(x) for x in text.split("\n")])

    effects = [
        Print(screen,
              Fire(screen.height, 80, text, 0.4, 40, screen.colours),
              0,
              speed=1,
              transparent=False),
        Print(screen,
              FigletText("MusicPlayer", "banner"),
              screen.height - 9, x=(screen.width - width) // 2 + 1,
              colour=Screen.COLOUR_BLACK,
              bg=Screen.COLOUR_BLACK,
              speed=1),
        Print(screen,
              FigletText("MusicPlayer", "banner"),
              screen.height - 9,
              colour=Screen.COLOUR_WHITE,
              bg=Screen.COLOUR_WHITE,
              speed=1),
    ]
    scenes.append(Scene(effects, 100))

    text = Figlet(font="banner", width=200).renderText("Plus!")
    width = max([len(x) for x in text.split("\n")])

    effects = [
        Print(screen,
              Fire(screen.height, 80, text, 0.4, 60, screen.colours),
              0,
              speed=1,
              transparent=False),
        Print(screen,
              FigletText("    Plus!    ", "banner"),
              screen.height - 9, x=(screen.width - width) // 2 + 1,
              colour=Screen.COLOUR_BLACK,
              bg=Screen.COLOUR_BLACK,
              speed=1),
        Print(screen,
              FigletText("    Plus!    ", "banner"),
              screen.height - 9,
              colour=Screen.COLOUR_WHITE,
              bg=Screen.COLOUR_WHITE,
              speed=1),
    ]
    scenes.append(Scene(effects, 100))

    effects = [
        Matrix(screen, stop_frame=200),
        Mirage(
            screen,
            FigletText("MusicPlayerPlus"),
            center[1] - 3,
            Screen.COLOUR_GREEN,
            start_frame=100,
            stop_frame=200),
        Wipe(screen, start_frame=150),
        Cycle(
            screen,
            FigletText("MusicPlayerPlus"),
            center[1] - 3,
            start_frame=200)
    ]
    scenes.append(Scene(effects, 250, clear=False))

    effects = [
        BannerText(
            screen,
            Rainbow(screen, FigletText(
                "ASCIImatics and ASCIInema Integration", font='slant')),
            center[1] - 3,
            Screen.COLOUR_GREEN)
    ]
    scenes.append(Scene(effects))

    effects = [
        Scroll(screen, 3),
        Mirage(
            screen,
            FigletText("Conceived and"),
            screen.height,
            Screen.COLOUR_GREEN),
        Mirage(
            screen,
            FigletText("written by"),
            screen.height + 8,
            Screen.COLOUR_GREEN),
        Mirage(
            screen,
            FigletText("Ronald Joe Record"),
            screen.height + 16,
            Screen.COLOUR_GREEN)
    ]
    scenes.append(Scene(effects, (screen.height + 24) * 3))

    effects = [
        BannerText(
            screen,
            Rainbow(screen, FigletText(
                "Music Player Plus", font='banner3-D')),
            center[1] - 3,
            Screen.COLOUR_CYAN),
        Stars(screen, (screen.width + screen.height) // 2, stop_frame=0)
    ]
    scenes.append(Scene(effects))

    effects = [
        BannerText(
            screen,
            Rainbow(screen, FigletText(
                "ASCII MPD Client", font='banner3-D')),
            center[1] - 3,
            Screen.COLOUR_CYAN),
        Stars(screen, (screen.width + screen.height) // 2, stop_frame=0)
    ]
    scenes.append(Scene(effects))

    effects = [
        BannerText(
            screen,
            Rainbow(screen, FigletText(
                "Album Cover Art", font='banner3-D')),
            center[1] - 3,
            Screen.COLOUR_CYAN),
        Stars(screen, (screen.width + screen.height) // 2, stop_frame=0)
    ]
    scenes.append(Scene(effects))

    effects = [
        Mirage(
            screen,
            Rainbow(screen, FigletText("Spectrum")),
            center[1] - 5,
            Screen.COLOUR_GREEN,
            stop_frame=200),
        Mirage(
            screen,
            Rainbow(screen, FigletText("Visualizer")),
            center[1] + 2,
            Screen.COLOUR_GREEN,
            stop_frame=200),
        Wipe(screen, start_frame=150),
        Cycle(
            screen,
            Rainbow(screen, FigletText("Spectrum")),
            center[1] - 5,
            start_frame=200),
        Cycle(
            screen,
            Rainbow(screen, FigletText("Visualizer")),
            center[1] + 2,
            start_frame=200)
    ]

    for _ in range(20):
        fireworks = [
            (PalmFirework, 25, 30),
            (PalmFirework, 25, 30),
            (StarFirework, 25, 35),
            (StarFirework, 25, 35),
            (StarFirework, 25, 35),
            (RingFirework, 20, 30),
            (SerpentFirework, 30, 35),
        ]
        firework, start, stop = choice(fireworks)
        effects.insert(
            1,
            firework(screen,
                     randint(0, screen.width),
                     randint(screen.height // 8, screen.height * 3 // 4),
                     randint(start, stop),
                     start_frame=randint(0, 250)))
    scenes.append(Scene(effects))

    effects = [
        Cycle(
            screen,
            FigletText("MusicPlayerPlus", font=font),
            center[1] - 8,
            stop_frame=200),
        Cycle(
            screen,
            FigletText("ROCKS!", font=font),
            center[1] + 3,
            stop_frame=200),
        Stars(screen, (screen.width + screen.height) // 2, stop_frame=200)
    ]
    scenes.append(Scene(effects, 200))

    effects = [
        Stars(screen, screen.width),
    ]
    for _ in range(20):
        fireworks = [
            (PalmFirework, 25, 30),
            (PalmFirework, 25, 30),
            (StarFirework, 25, 35),
            (StarFirework, 25, 35),
            (StarFirework, 25, 35),
            (RingFirework, 20, 30),
            (SerpentFirework, 30, 35),
        ]
        firework, start, stop = choice(fireworks)
        effects.insert(
            1,
            firework(screen,
                     randint(0, screen.width),
                     randint(screen.height // 8, screen.height * 3 // 4),
                     randint(start, stop),
                     start_frame=randint(0, 250)))

    effects.append(Print(screen,
                         Rainbow(screen, FigletText("MUSIC")),
                         center[1] - 6,
                         speed=1,
                         start_frame=100))
    effects.append(Print(screen,
                         Rainbow(screen, FigletText("PLAYER PLUS!")),
                         center[1] + 1,
                         speed=1,
                         start_frame=100))
    scenes.append(Scene(effects, 300))

    if numcycles is None:
        screen.play(scenes, stop_on_resize=True)
    else:
        screen.play(scenes, stop_on_resize=True, repeat=False)


if __name__ == "__main__":

    def handler(signal_number, frame):
        if debug:
            print("In signal handler with\nsignal number = " + str(signal_number))
            print("frame = " + str(frame))
        if play_song is not None:
            with open(fifo, "w") as mp_fifo:
                if debug:
                    print("Fading volume in signal handler")
                for vol in range(80, 0, -5):
                    print("volume " + str(vol) + " 1", flush=True, file=mp_fifo)
                    time.sleep(0.1)
                if debug:
                    print("Stopping mplayer in signal handler")
                print("stop", flush=True, file=mp_fifo)
                if debug:
                    print("Resetting volume in signl handler")
                print("volume 80 1", flush=True, file=mp_fifo)
                if debug:
                    print("Exiting mplayer in signal handler")
                print("quit", flush=True, file=mp_fifo)
            if debug:
                print("Removing mplayer FIFO in signal handler")
            os.remove(fifo)
        os.rmdir(tmpdir)
        sys.exit(0)

    parser = argparse.ArgumentParser()
    parser.add_argument("-a", "--audio", help="audio file to play during effects")
    parser.add_argument("-c", "--cycle", help="number of times to cycle back through effects")
    parser.add_argument("-d", "--debug", default=False, action='store_true', help="Output hopefully useful debugging statements")
    parser.add_argument("-f", "--font", help="Font for FigletText in Cycle effect, default 'small'")
    args = parser.parse_args()

    if args.audio:
        song = args.audio
    else:
        song = None
    if args.cycle:
        numcycles = args.cycle
    else:
        numcycles = None
    if args.debug:
        debug = True
    else:
        debug = False
    if args.font:
        font = args.font
    else:
        font = "small"

    play_song = None
    tmpdir = tempfile.mkdtemp()
    fifo = os.path.join(tmpdir, 'mplayer.fifo')
    signal.signal(signal.SIGINT, handler)
    if song is not None:
        if debug:
            print("Using mplayer FIFO " + fifo)
        os.mkfifo(fifo)
        if debug:
            print("MPlayer starting: mplayer -novideo -volume 80 -really-quiet -nolirc -slave -input file=" + fifo + " " + song)
        play_song = subprocess.Popen(
            ["mplayer", "-novideo", "-volume", "80", "-really-quiet", "-nolirc", "-slave", "-input", "file=" + fifo, song],
            stdout=subprocess.DEVNULL,
            stderr=subprocess.STDOUT)

    while True:
        try:
            Screen.wrapper(_mpplus)

            if song is not None:
                with open(fifo, "w") as mp_fifo:
                    if debug:
                        print("Fading volume")
                    for vol in range(80, 0, -5):
                        print("volume " + str(vol) + " 1",
                                flush=True, file=mp_fifo)
                        time.sleep(0.1)
                    if debug:
                        print("Stopping mplayer")
                    print("stop", flush=True, file=mp_fifo)
                    if debug:
                        print("Resetting volume")
                    print("volume 80 1", flush=True, file=mp_fifo)
                    if debug:
                        print("Exiting mplayer")
                    print("quit", flush=True, file=mp_fifo)
                os.remove(fifo)

            if debug:
                print("Removing mplayer FIFO")
            os.rmdir(tmpdir)

            if play_song is not None:
                song_status = play_song.poll()
                if song_status is None:
                    os.kill(play_song.pid, signal.SIGTERM)

            sys.exit(0)
        except ResizeScreenError:
            pass
```

## Video

See what the script looks like in action by viewing this YouTube video:

[![MusicPlayerPlus Intro](https://i.imgur.com/UH2A21h.png)](https://www.youtube.com/watch?v=r7XLA9tO45Q "MusicPlayerPlus ASCIImatics Intro"){:target="_blank"}{:rel="noopener noreferrer"}

## Author

Written by Ronald Record <github@ronrecord.com>

## Licensing

ASCIIMPPLUS is distributed under an Open Source license.
See the file LICENSE in the ASCIIMPPLUS source distribution
for information on terms &amp; conditions for accessing and
otherwise using ASCIIMPPLUS and for a DISCLAIMER OF ALL WARRANTIES.
