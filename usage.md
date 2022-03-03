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

Assuming you have the following sequence of still images with absolute or relative URL :

```html
https://example.org/path/to_file_1.webp
https://example.org/path/to_file_2.webp
https://example.org/path/to_file_3.webp
...
https://example.org/path/to_file_64.webp

or

../img/path/to_file_1.webp
../img/path/to_file_2.webp
../img/path/to_file_3.webp
...
../img/path/to_file_64.webp

```

Scroll Frames supports the following syntax abstraction for absolute or relative URL :

```html
<div scroll-frames="foo"
     data-url-mask="https://example.org/path/to_file_|1 to 64|.webp"></div>
or
<div scroll-frames="foo"
     data-url-mask="../img/path/to_file_|1 to 64|.webp"></div>
```

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

By default, Scroll Frames use the specified element `scroll-frame="ID"` scroll line value. If `data-detector="ID_OF_ANOTHER_ELEMENT"` is set, Scroll Frames uses the scroll line value of the specified HTML element.

```html
<p>Frames change in relation with the position of the `hr` element.</p>
<div    scroll-frames="matrix"
        data-url-mask="https://olivier3lanc.github.io/cinematics-resources/matrix_bullet_time_b/matrix_bullet_time_b_|1 to 197|.webp"
        data-detector="the-detector">
</div>
<hr id="the-detector">
<style>
    [scroll-frames="matrix"] { 
        height: 80vh;
        background-color: #F5F5F5;
    }
    hr {
        margin-bottom: 100vh;
    }
    p {
        font-family: monospace;
        font-size: 16px;
        padding: 1em;
        margin: 0;
    } 
</style>
```
{:.playground title="Detector"}

## Timeline and keyframes

By default, playback head throughout image sequence is linear during scroll but it is possible to customize it with keyframes. No limitation on amount of keyframes.

```html
<p>Still frames start changing when element gets 40% (scroll line 0.4) in the viewport and stop when element gets 60% (scroll line 0.6) in the viewport.</p>
<div    scroll-frames="matrix"
        data-url-mask="https://olivier3lanc.github.io/cinematics-resources/matrix_bullet_time_b/matrix_bullet_time_b_|1 to 197|.webp"
        data-timeline="0:0 to 40:0 to 60:100 to 100:100">
</div>
<style>
    [scroll-frames="matrix"] { 
        height: 80vh;
        margin-top: 80vh;
        margin-bottom: 80vh;
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
{:.playground title="Timeline and keyframes"}

Timeline and keyframes syntax description:

| Syntax | Description |
|- |- |
| `[number1]:[number2]` | Definition of a keypoint.|
|  _number1_ | Percentage of element into the viewport<br>0% means element is entering the viewport<br>100% means element leaves the viewport |
|  _number2_ | Position percentage of the playback head of the sequence.<br>0% is the first frame<br>100% is the last frame |
| `[space]to[space]` | Tween link between two keypoints.|

Example

```html
<!-- Description -->
<div data-timeline="[number1]:[number2] to [number3]:[number4] to [number5]:[number6] to [number7]:[number8] (...)"></div>
<!-- Example -->
<div data-timeline="0:0 to 40:0 to 60:100 to 100:100"></div>
"0:0" when element is entering viewport, playback head is set at 0%
" to " links two keypoints
"40:0" when scroll line of the element is 0.4 (40%), playback head is still set at 0%
" to " links two keypoints
"60:100" when scroll line of the element is 0.6 (60%), playback head is set at 100%
" to " links two keypoints
"100:100" when scroll line of the element is 1 (100%), playback head is set at 100%
```



## Fit

Scroll Frames has some settigns dedicated to how the still frames are fit into their container.