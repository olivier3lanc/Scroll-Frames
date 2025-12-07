---
title: Sticky method
description: Place the scene always on top using detector.
layout: libdoc/page-split
category: Examples
order: 92
---

```html
<section>
    <div    scroll-frames="any_id"
            data-url-mask="https://olivier3lanc.me/cinematics-resources/timelapse_albertville/timelapse_albertville_|1 to 120|.webp"
            data-background-size="cover"
            data-detector="the_detector">
    </div>
    <hr id="the_detector">
</section>
<!-- CSS FOR DEMO PURPOSE ONLY -->
<style>
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