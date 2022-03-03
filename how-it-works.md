---
title: How it works
description: How Scroll Frames works
layout: libdoc/page
---

## The _scroll line_

**Scroll line** is an abstract name to appoint the position of each Scroll Frames element into the viewport.

* `0` means the first frame
* `1` means the last frame

Scroll Frames uses CSS to applies still frames as background image.

```html
<div    scroll-frames="demo_matrix_1"
        data-url-mask="https://olivier3lanc.github.io/cinematics-resources/matrix_bullet_time_b/matrix_bullet_time_b_|1 to 197|.webp"
        data-background-size="cover">
    <p>
        <span>Scroll line value</span>
        <strong class="demo_display-scroll-line">-</strong>
    </p>
</div>
<style>
    [scroll-frames*="matrix"] { 
        margin-top: 100vh;
        margin-bottom: 110vh;
        height: 90vh;
    }
    p {
        position: fixed;
        top: 0;
        right: 0;
        margin: 0;
        color: white;
        background-color: black;
        font-size: 16px;
        padding: 1em;
        font-family: monospace;
    }
    p > span {
        font-size: 12px;
        text-transform: uppercase;
    }
    .demo_display-scroll-line {
        display: block;
        width: 5em;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
</style>
```
{:.playground title="Demo"}
