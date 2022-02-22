---
layout: libdoc/page
permalink: index.html
unlisted: true
---

Scroll Frames is a javascript library that applies background image from a sequence of images on any HTML tag according to the position of this HTML tag.

```html
<p>Scroll down</p>
<div    scroll-frames="matrix2"
        data-mask="https://olivier3lanc.github.io/cinematics-resources/matrix_bullet_time_b/matrix_bullet_time_b_|1 to 197|.webp"
        data-background-size="cover">
</div>
<div    scroll-frames="matrix"
        data-mask="https://olivier3lanc.github.io/cinematics-resources/matrix_bullet_time_b/matrix_bullet_time_b_|1 to 197|.webp"
        data-detector="det1"
        data-background-repeat="no-repeat">
</div>
<hr id="det1">
<style>
    [scroll-frames*="matrix"] { 
        margin-top: 80vh;
        height: 80vh;
    }
    hr {
        margin-bottom: 100vh;
    }
</style>
```
{:.playground title="Demo"}
