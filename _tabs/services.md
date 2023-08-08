---
title: MusicPlayerPlus Services and Clients
layout: post
icon: fas fa-info-circle
order: 4
toc: true
---

## Introduction

MusicPlayerPlus includes several services, some installed by default and
others optionally installed with the `mppinit` command post-installation.
Clients that can be used to access these services are also provided.

## Services

The following services are included with MusicPlayerPlus:

- **Music Player Daemon (MPD)**
  - Installed, configured, and activated by default
- **MPD Stats Service**
  - Installed, configured, and activated by default
- **Beets Web Plugin Service**
  - Installed, configured, and activated by default
- **Mopidy Music Server**
  - Installed, configured, and activated with `mppinit mopidy`
  - When activated, deactivates MPD, MPD Stats, and YAMS services
- **Navidrome Music Streaming Server**
  - Installed, configured, and activated with `mppinit navidrome`
- **YAMS Last.FM Scrobbler**
  - Installed, configured, and activated with `mppinit yams`

All of the MusicPlayerPlus services are user-level systemd services and can
be controlled by the MusicPlayerPlus user without the need for `root` privilege.
The `mpplus -i` interactive menu system includes menu entries for controlling
each of these services as well as a status report on them by selecting the
"Manage Music Services" from the Main Menu. Alternately, each service can
be controlled from the command line using `systemctl --user ...`. For example,
to stop the MPD Stats Service, run the command `systemctl --user stop mpdstats`.

## Which services should be installed and activated

Depending upon the use case and personal preference, a variety of combinations
of MusicPlayerPlus services can be activated. Mopidy with the Mopidy-MPD
extension conflicts with the MPD service. YAMS and MPD Stats only work with
MPD. Therefore, if Mopidy is activated the MPD, YAMS, and MPD Stats services
are automatically deactivated. Similarly, if the MPD service is reactivated,
the YAMS and MPD Stats services are reactivated and Mopidy deactivated.

Choose which service you prefer, MPD or Mopidy, and activate it with either
`mppinit mopidy` or `mppinit mpd` (after activating Mopidy then deciding to
reactivate MPD). Using these two commands, `mppinit mopidy` and `mppinit mpd`,
it is easy to switch between the two conflicting services.

The advantage of MPD is its stability, maturity, flexibility, power, and
extensive configuration options. However, it is difficult to enable streaming
with MPD. The advantage of Mopidy is its streaming capability and the variety
of useful extensions, many of which are installed by default with
`mppinit mopidy`.

An even better streaming solution is provided by Navidrome. Activating
Navidrome enables access to the music library from any desktop, phone,
tablet, or remote device with a browser. There are numerous Navidrome clients
available for all devices and platforms. Activating Navidrome does not conflict
with any of the other MusicPlayerPlus services so it can be streaming the
music library while MPD or Mopidy is serving up the same library locally.
Navidrome can optionally scrobble to Last.FM so if that option is enabled
then deactivate the YAMS service.

### Common Service Configurations

MusicPlayerPlus provides several different selections of services appropriate
for a variety of use cases. All service configurations require a prior
MusicPlayerPlus initialization with `mppinit`. Some common MusicPlayerPlus
service configurations include:

- **Basic Music Player Daemon**
  - Configured automatically with `mppinit`
  - MPD enabled and active, all other services disabled
  - Use `mpplus`, `mpcplus`, `mpc`, etc to play music on local system
- **Music Player Daemon plus Beets**
  - Configured with `mppinit import`
  - MPD and Beets enabled and active, all other services disabled
  - Use `beet ...`, `mpplus`, `mpcplus`, `mpc`, to search, filter, play, ...
  - Enables the Beets web plugin at `http://<ip address>:8337`
- **Mopidy Music Server plus Beets**
  - Configured with `mppinit import`, and `mppinit mopidy`
  - Mopidy and Beets enabled and active, other services disabled
  - Use `beet ...`, `mpplus`, `mpcplus`, `mpc`, to search, filter, play, ...
  - Enables the Beets web plugin at `http://<ip address>:8337`
  - Enables the Mopidy web client at `http://<ip address>:6680`
- **Navidrome Streaming plus Mopidy Music Server plus Beets**
  - Configure with `mppinit import`, `mppinit mopidy`, `mppinit navidrome`
  - Navidrome, Mopidy and Beets enabled and active, other services disabled
  - Use `beet ...`, `mpplus`, `mpcplus`, `mpc`, to search, filter, play, ...
  - Enables the Beets web plugin at `http://<ip address>:8337`
  - Enables the Mopidy web client at `http://<ip address>:6680`
  - Enables the Navidrome web client at `http://<ip address>:4533`
  - Supports many clients available for all desktops, tablets, and phones
  - Run `mppinit import` after new `mppinit bandcamp|soundcloud` downloads
- **Navidrome Music Streaming Server without MPD/Mopidy/Beets**
  - Configure with `mppinit navidrome`
  - No need for `mppinit import|metadata|mopidy|yams`
  - Use `mpplus -i` menu system to stop and disable all other services
    - Select "Manage Music Services" from the Main Menu
    - If active, Stop and Disable MPD, Mopidy, and Beets
  - Navidrome enabled and active, other services disabled
  - Enables the Navidrome web client at `http://<ip address>:4533`
  - Supports many clients available for all desktops, tablets, and phones
  - No need for `mppinit import` after `mppinit bandcamp|soundcloud` downloads

## Clients

The following clients are included with MusicPlayerPlus:

- **mpplus MusicPlayerPlus front-end**
  - Installed by default, see `man mpplus`
  - Front-ends `mpcplus` MPD client and `mppcava` spectrum visualizer
  - Example: `mpplus`
- **mpcplus character-based feature-full MPD client**
  - Installed by default, see `man mpcplus`
  - Example: `mpcplus`
- **mpc command-line MPD client**
  - Installed by default, see `man mpc`
  - Examples: `mpc stop`, `mpc current`, `mpc play`
- **beet command-line interface to Beets**
  - Installed by default, see `man beet`
  - Examples: `beet play jethro tull`, `beet info -l aqualung`
- **Beets web client**
  - Installed by default
  - Open `http://<ip address>:8337`
- **Mopidy web client**
  - Installed, configured, and activated with `mppinit mopidy`
  - Open `http://<ip address>:6680`
- **Mopidy Iris web client**
  - Installed, configured, and activated with `mppinit mopidy`
  - Open `http://<ip address>:6680/iris`
- **Mopidy-Mobile**
  - Installed, configured, and activated with `mppinit mopidy`
  - Open `http://<ip address>:6680/mobile`
- **Navidrome web client**
  - Installed, configured, and activated with `mppinit navidrome`
  - Open `http://<ip address>:4533`
