---
title: Play once fully visible
description: The scene plays once fully into the viewport using detector.
layout: libdoc/page-split
category: Examples
order: 94
---

```html
<section>
    <div    scroll-frames="timelapse_1"
            data-url-mask="https://olivier3lanc.github.io/cinematics-resources/timelapse_albertville/timelapse_albertville_|1 to 120|.webp"
            data-background-size="cover"
            data-detector="the_detector">
    </div>
    <hr id="the_detector">
</section>
<section>
    <div    scroll-frames="timelapse_2"
            data-url-mask="https://olivier3lanc.github.io/cinematics-resources/timelapse_roselend/timelapse_roselend_|1 to 120|.webp"
            data-background-size="cover"
            data-detector="the_detector_2">
    </div>
    <hr id="the_detector_2">
</section>

<!-- CSS FOR DEMO PURPOSE ONLY -->
<style>
    body { 
        padding-top: 80vh;
        padding-bottom: 80vh;
    }
    [scroll-frames] { 
        position: sticky;
        top: 0;
        left: 0;
        height: 100vh;
    }
    section {
        height: 200vh;
    }
    hr { opacity: 0 }
</style>
```
{:.playground .playground-pin title="Scroll down to view"}

&copy; [Timelapses by Olivier 3lanc](https://github.com/olivier3lanc/photographies)

