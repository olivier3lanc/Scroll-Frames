---
title: Play once fully visible
description: The scene plays once fully into the viewport using detector.
layout: libdoc/page-split
category: Examples
order: 94
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
<section>
    <div    scroll-frames="demo_matrix_2"
            data-url-mask="https://olivier3lanc.github.io/cinematics-resources/matrix_morpheus_smith_a/matrix_morpheus_smith_a_|1 to 103|.webp"
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

### Credits

* &copy; [The Matrix movie bullet time](https://www.warnerbros.com/movies/matrix)
* &copy; [D A R K](https://www.netflix.com/fr/title/80100172)