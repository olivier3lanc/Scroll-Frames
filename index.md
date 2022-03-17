---
layout: libdoc/page-split
unlisted: true
---

Scroll Frames is a javascript library intended to be used for cinematic usage on any web page. Scroll Frames binds scroll on still images sequences to craft cinematics on a web page. It applies CSS background image on any HTML tag from a sequence of images according to the position of this HTML tag.

## Support


| Browser | Mobile | Desktop |
| :- | :-: | :-: |
| Chrome | ✅ | ✅ |
| Safari | ✅ | ✅ |
| Firefox | ✅ ¹ | ✅ ¹ |
| Opera | ✅ | ✅ |
| Chromium based browsers (Vivaldi, Brave, ...) | ✅ | ✅ |

<sup>(1) Firefox issue: Some troubles when user leaves the tab and comes back.</sup>

Featured example &copy; [Mad Max Fury Road credits](https://www.warnerbros.com/movies/mad-max-fury-road)

```html
<section>
    <div    scroll-frames="matrix1"
            data-url-mask="https://olivier3lanc.github.io/cinematics-resources/mad_max_fury_road_opening_scene_a/mad_max_fury_road_opening_scene_a_|1 to 63|.webp"
            data-detector="detector"
            data-background-size="cover">
        <p>Scroll down and up</p>
    </div>
    <div id="detector"></div>
</section>
<style>
    section {
        height: 200vh;
    }
    [scroll-frames="matrix1"] {
        height: 100vh;
        position: sticky;
        top: 0;
    }
    [scroll-frames="matrix1"] > p {
        box-sizing: border-box;
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        margin: 0;
        padding: 1em;
        color: white;
        font-family: monospace;
        font-size: 20px;
    }
</style>
```
{:.playground title="Fury Road Demo"}
