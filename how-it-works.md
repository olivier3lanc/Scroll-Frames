---
title: How it works
description: Scroll Frames is based on intersection
layout: libdoc/page
category: Getting started
order: 14
---

Scroll Frames uses multiple background images with CSS background-image property and multiple background-position.

**Intersection** is an abstract measurement name to appoint the position of each Scroll Frames element into the viewport. **For each Scroll Frame element**, a intersection is computed on scroll event.
## The intersection

| Intersection value | Description |
|- |- |
| `0` | Means the first frame is displayed, the element is not into the viewport yet. |
| `0.5` | Means the playback head displays the middle of the image sequence, the element is in the middle of its scroll into the viewport. |
| `1` | Means the last frame is displayed, the element is out of the viewport. |

Scroll Frames uses CSS to applies still frames as background image on each element you set.

```html
<div    scroll-frames="demo_matrix_1"
        data-url-mask="https://olivier3lanc.github.io/cinematics-resources/matrix_bullet_time_b/matrix_bullet_time_b_|1 to 197|.webp"
        data-background-size="cover">
    <p>
        <span>Intersection value</span>
        <strong class="demo_display-scroll-line">-</strong>
    </p>
</div>
<!-- CSS FOR DEMO PURPOSE ONLY -->
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
{:.playground title="Scroll to watch how intersection works"}

&copy; [The Matrix movie bullet time](https://www.warnerbros.com/movies/matrix)
