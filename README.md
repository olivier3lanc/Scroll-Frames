---
layout: libdoc/page-split
permalink: index.html
unlisted: true
---
```html
<style>
    [my-scroll-frames="second"] { 
        position: sticky;
        top: 0;
    }
    [my-scroll-frames="third"] { 
        height:600px;
        margin-bottom: 100vh;
    }
</style>
<p>Scroll down</p>
<div    my-scroll-frames="first"
        data-json="../js/macbookpro.json"
        data-timeline="0:0 to 40:0 to 80:100 to 100:100"
        style="margin-top: 50vh; height: 80vh;">
</div>
<div style="height:100vh; margin-bottom:100vh">
    <div    my-scroll-frames="second"
            data-detector="second-detector"
            data-json="../js/example2.json"
            data-timeline="0:0 to 40:0 to 90:100 to 100:100"
            style="height: 500px;">
    </div>
    <div id="second-detector"></div>
</div>
<div    my-scroll-frames="third"
        data-mask="../img/matrix/matrix-frame-|1 to 44|.webp">
</div>
```
{:.playground title="Demo - Mobile phone mockup and Matrix"}
