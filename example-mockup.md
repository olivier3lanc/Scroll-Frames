---
title: Mockup
description: Use Scroll Frames with animated mockups.
layout: libdoc/page-split
category: Examples
order: 110
---

Example with a 3D phone mockup using [keyframes feature](usage.html#keyframes).

```html
<div    scroll-frames="mockup"
        data-url-mask="../img/phone/frame-|1 to 44|.webp"
        data-keyframes="0:0 to 30:0 to 70:100 to 100:100">
</div>
<!-- CSS FOR DEMO PURPOSE ONLY -->
<style>
    [scroll-frames] { 
        margin-top: 90vh;
        margin-bottom: 90vh;
        height: 300px;
        background-color: #F5F5F5;
    }
</style>
```
{:.playground .playground-pin title="3D phone mockup"}
