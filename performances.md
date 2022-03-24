---
title: Performances
description: Things to be aware of using Scroll Frames
layout: libdoc/page
category: Getting started
order: 18
---

Scroll Frames applies still images on DOM elements, so bandwidth and performances are affected in relation with:

* **Image resolution**: Higher still frames resolutions (higher width and higher height) uses more bandwidth and device resources. Consider resizing properly your images sequences to your needs.
* **Image compression**: Low/lossless compression of still frames uses more bandwidth. Consider compressing properly your images sequences in modern format like WebP to save bandwidth.
* **Image format**: PNG, low compression JPEG files allow get high quality rendering but use a large amount of bandwidth, it is strongly recommended to use WebP format or highly compressed JPEG.
* **Amount of images**: The more Scroll Frames instances have still frames, the more bandwidth and device resources are required.
* **Amount of instances**: The more you set Scroll Frames instances on a page, the more bandwidth and device resources are required.
