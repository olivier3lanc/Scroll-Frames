---
title: D A R K
description: Playhead moves once the detection element gets into the viewport.
layout: libdoc/page-split
category: Examples
order: 100
---

```html
<section>
    <div    scroll-frames="demo"
            data-url-mask="https://olivier3lanc.github.io/folio-dark/img/particles-b/particles-b-|1 to 101|.webp"
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

&copy; [D A R K](https://www.netflix.com/fr/title/80100172)