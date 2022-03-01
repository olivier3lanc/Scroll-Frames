---
title: Usage
description: How to use Scroll Frames
layout: libdoc/page
---
* 
{:toc}

## URL mask

If applicable, Scroll Frames allows to use a single string of characters to describe a collection of URL.

```html
<p>Scroll down and up to watch still frames changing</p>
<div    scroll-frames="matrix"
        data-url-mask="https://olivier3lanc.github.io/cinematics-resources/matrix_bullet_time_b/matrix_bullet_time_b_|1 to 197|.webp">
</div>
<style>
    [scroll-frames="matrix"] { 
        margin-top: 80vh;
        margin-bottom: 80vh;
        height: 80vh;
        background-color: #F5F5F5;
    }
    p {
        font-family: monospace;
        font-size: 16px;
        padding: 1em;
        margin: 0;
    } 
</style>
```
{:.playground title="URL mask"}

## JSON

If URL mask is not possible, Scroll Frames supports JSON format. JSON URL can be either relative to current page or absolute.

```html
<p>Scroll down and up to watch still frames changing</p>
<div    scroll-frames="matrix"
        data-json="../json/matrix_bullet_time_b.json">
</div>
<style>
    [scroll-frames="matrix"] { 
        margin-top: 80vh;
        margin-bottom: 80vh;
        height: 80vh;
        background-color: #F5F5F5;
    }
    p {
        font-family: monospace;
        font-size: 16px;
        padding: 1em;
        margin: 0;
    } 
</style>
```
{:.playground title="JSON file"}

JSON file must be set as follows, each still frame URL can be either absolute or relative.

```javascript
// Example of JSON
[
    { "url": "https://example.com/path/to/first-frame.webp"},
    { "url": "https://example.com/path/to/second-frame.webp"},
    { "url": "https://example.com/path/to/third-frame.webp"},
    //...
    { "url": "https://example.com/path/to/last-frame.webp"}
]
```

## Detector

If enabled, allows to detect the scroll line value from another HTML element.
## Timeline

By default, seeking through frames during scroll is linear but it is possible to customize it.

## Fit

Scroll Frames has some settigns dedicated to how the still frames are fit into their container.