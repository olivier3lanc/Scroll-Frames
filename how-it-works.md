---
title: How it works
description: How Scroll Frames works
layout: libdoc/page
---

* `0` means the first frame
* `1` means the last frame

Scroll Frames uses CSS to applies still frames as background image.

```html
<div    scroll-frames="demo_matrix_1"
        data-url-mask="https://olivier3lanc.github.io/cinematics-resources/matrix_bullet_time_b/matrix_bullet_time_b_|1 to 197|.webp"
        data-background-size="cover">
    <p class="demo_display-scroll-line">Scroll</p>
</div>
<style>
    [scroll-frames*="matrix"] { 
        margin-top: 100vh;
        margin-bottom: 110vh;
        height: 90vh;
    }
    .demo_display-scroll-line {
        color: white;
        background-color: black;
        font-size: 16px;
        padding: 1em;
        font-family: monospace;
        width: 5em;
        white-space: nowrap;
        overflow: hidden;
        position: fixed;
        top: 0;
        right: 0;
        text-overflow: ellipsis;
        margin: 0;
    }
</style>
```
{:.playground title="Demo"}
