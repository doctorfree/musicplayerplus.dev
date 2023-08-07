---
# the default layout is 'page'
layout: tab
icon: fas fa-arrow-circle-down
order: 2
---

## MusicPlayerPlus Installation

MusicPlayerPlus v2.0.1 and later can be installed on Linux systems using
the Arch packaging format, the Debian packaging format, or the Red Hat
Package Manager (RPM).

### Supported platforms

MusicPlayerPlus has been tested successfully on the following platforms:

- **Arch Linux 2022.07.01**
  - `MusicPlayerPlus_<version>-<release>-any.pkg.tar.zst`
- **Ubuntu Linux 20.04**
  - `MusicPlayerPlus_<version>-<release>.deb`
- **Fedora Linux 36**
  - `MusicPlayerPlus_<version>-<release>.rpm`
- **CentOS Linux 8**
  - `MusicPlayerPlus_<version>-<release>.rpm`
- **Raspbian Linux 11**
  - `MusicPlayerPlus_<version>-<release>.deb`

### Debian package installation

Many Linux distributions, most notably Ubuntu and its derivatives, use the
Debian packaging system.

To tell if a Linux system is Debian based it is usually sufficient to
check for the existence of the file `/etc/debian_version` and/or examine the
contents of the file `/etc/os-release`.

To install on a Debian based Linux system, download the latest Debian format
package from the
[MusicPlayerPlus Releases](https://github.com/doctorfree/MusicPlayerPlus/releases).

Install the MusicPlayerPlus package by executing the command

```console
sudo apt install ./MusicPlayerPlus_<version>-<release>.deb
```

or

```console
sudo dpkg -i ./MusicPlayerPlus_<version>-<release>.deb
```

or, on a Raspberry Pi:

```console
sudo apt install ./MusicPlayerPlus_<version>-<release>.deb
```

or

```console
sudo dpkg -i ./MusicPlayerPlus_<version>-<release>.deb
```

### RPM Package installation

Red Hat Linux, SUSE Linux, and their derivatives use the RPM packaging
format. RPM based Linux distributions include Fedora, AlmaLinux, CentOS,
openSUSE, OpenMandriva, Mandrake Linux, Red Hat Linux, and Oracle Linux.

To install on an RPM based Linux system, download the latest RPM format
package from the
[MusicPlayerPlus Releases](https://github.com/doctorfree/MusicPlayerPlus/releases).

Install the MusicPlayerPlus package by executing the command

```console
sudo dnf localinstall ./MusicPlayerPlus_<version>-<release>.rpm
```

or

```console
sudo rpm -i ./MusicPlayerPlus_<version>-<release>.rpm
```

### Arch Package installation

Arch Linux, Manjaro, and other Arch Linux derivatives use the Pacman packaging
format. In addition to Arch Linux, Arch based Linux distributions include
ArchBang, Arch Linux, Artix Linux, ArchLabs, Asahi Linux, BlackArch,
Chakra Linux, EndeavourOS, Frugalware Linux, Garuda Linux,
Hyperbola GNU/Linux-libre, LinHES, Manjaro, Parabola GNU/Linux-libre,
SteamOS, and SystemRescue.

To install on an Arch based Linux system, download the latest Pacman format
package from the
[MusicPlayerPlus Releases](https://github.com/doctorfree/MusicPlayerPlus/releases).

Install the MusicPlayerPlus package by executing the command

```console
sudo pacman -U ./MusicPlayerPlus_<version>-<release>-any.pkg.tar.zst
```
