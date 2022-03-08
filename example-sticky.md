---
title: Sticky method
description: Place the scene always on top using detector.
layout: libdoc/page-split
category: Examples
order: 120
---

```html
<section>
    <div    scroll-frames="demo_matrix_1"
            data-url-mask="https://olivier3lanc.github.io/cinematics-resources/matrix_bullet_time_b/matrix_bullet_time_b_|1 to 197|.webp"
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

&copy; [The Matrix movie bullet time](https://www.warnerbros.com/movies/matrix)
