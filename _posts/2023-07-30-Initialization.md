---
title: MusicPlayerPlus Initialization Benchmarks
author: doctorfree
date: 2023-07-30 16:20:00 +0800
tags: [data, benchmarks, stats, info, initialization]
pin: true
img_path: "/posts/20230730"
---

## MusicPlayerPlus Initialization Times

Test MusicPlayerPlus initialization runs and resulting times.

Commands performed after a fresh install and library creation:

- `mppinit`
- `mppinit import`
- `mppinit metadata` or `mppinit -a metadata`

## Fedora Linux 35 with 10GB library

### Summary

- 10GB library with 700 tracks
- 10 minute import
- 40 minute extraction or 20 minute retrieval
- Approximate 1 hour initialization or 1/2 hour using AcousticBrainz

### System

- **OS**: Fedora Linux 35 (Workstation Edition)
- **CPU**: Intel i7-7700K (8) @ 4.500GHz
- **GPU**: AMD ATI Radeon RX 470/480/570/570X/580/58
- **Memory**: 872MiB / 11909MiB

### Library

**Total size**: 9.5 GiB

- **Tracks**: 704
- **Artists**: 64
- **Albums**: 50
- **Album artists**: 25

### Total elapsed times during mppinit

- **Duplicates**: 0 days 00 hr 04 min 26 sec
- **Import**: 0 days 00 hr 11 min 26 sec
- **Genre retrieval**: 0 days 00 hr 02 min 21 sec
- **Acoustic extraction**: 0 days 00 hr 39 min 27 sec

Using AcousticBrainz rather than computing acoustic analysis with Essentia:

- **Duplicates**: 0 days 00 hr 04 min 23 sec
- **Import**: 0 days 00 hr 08 min 38 sec
- **Genre retrieval**: 0 days 00 hr 02 min 23 sec
- **Acoustic retrieval**: 0 days 00 hr 16 min 04 sec

## Ubuntu Linux 20.04 with 500GB library

### Summary

- 500GB library with 31,000 tracks
- 7 hour import
- 17 hour acousting metadata retrieval
- Approximate 35 hour initialization (using AcousticBrainz)

### System

- **OS**: Ubuntu Linux 20.04
- **CPU**: Intel Celeron CPU G1840 @ 2.80GHz, 2609 MHz
- **GPU**: ATI RX Vega56
- **Memory**: 32GiB

### Library

**Total size**: 504.4 GiB

- **Tracks**: 31072
- **Artists**: 3873
- **Albums**: 2990
- **Album artists**: 1425

### Total elapsed times during mppinit

- **Duplicates**: 0 days 08 hr 05 min 21 sec
- **Import**: 0 days 07 hr 01 min 27 sec
- **Genre retrieval**: 0 days 02 hr 58 min 08 sec
- **Acoustic retrieval**: 0 days 17 hr 22 min 13 sec

### Computing acoustic analysis locally with Essentia

After the AcousticBrainz retrieval of audio metadata completed,
many tracks were tagged with a beats per minute (bpm) of zero. This is
incorrect and an issue with AcousticBrainz. To correct this and other
acoustic metadata, the audio files can be selectively analyzed using Essentia.

Computing acoustic analysis locally with Essentia after AcousticBrainz run:

- **Tracks in library**: 31072
- **Tracks with zero bpm**: 17714
- **Execute**: `mpplus -X bpm:0`
- **Acoustic extraction**: 2 days 03 hr 15 min 24 sec
