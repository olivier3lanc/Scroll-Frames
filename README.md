# Scroll Frames

Animate sequences of still frames on any DOM element in relation with its position into the viewport.

Scroll Frames is a javascript library intended to be used for cinematic usage on any web page. Scroll Frames binds scroll on still images sequences to craft cinematics on a web page. It applies CSS background image on any HTML tag from a sequence of images according to the position of this HTML tag.
## Key Features

* **Native Javascript**
* **No dependencies**
* **Easy to use** see [usage](usage.html)

## Browsers support

| Browser | Mobile | Desktop |
| :- | :-: | :-: |
| Chrome | ✅ | ✅ |
| Safari | ✅ | ✅ |
| Firefox | ✅ ¹ | ✅ ¹ |
| Opera | ✅ | ✅ |
| Chromium based browsers (Vivaldi, Brave, ...) | ✅ | ✅ |

<sup>(1) Firefox issue: Some troubles when user leaves the tab and comes back.</sup>

## Installation

Include Javascript file `scroll-frames.js` just before the end body tag `</body>`.

```html
<!-- Required -->
<script src="path/to/scroll-frames.js"></script>
```

## Usage

Scroll Frames can be applied on any HTML element, the script uses the following CSS properties: 

* _background-image_
* _background-position_
* _background-size_
* _background-repeat_

### Basic usage

* `scroll-frames` attribute
* `data-url-mask` attribute
* `data-json` attribute

Two attributes are mandatory to make Scroll Frames work.

* `scroll-frames="YOUR_OWN_UNIQUE_ID"` Each instance of Scroll Frames is set with `scroll-frames` attribute containing a unique value that defines the ID of the instance.
* `data-url-mask` or `data-json` to define the source of still images sequence.

```html
EXAMPLE WITH URL MASK
<div    scroll-frames="matrix"
        data-url-mask="https://olivier3lanc.github.io/cinematics-resources/matrix_bullet_time_b/matrix_bullet_time_b_|1 to 197|.webp">
</div>
EXAMPLE WITH JSON URL
<div    scroll-frames="matrix"
        data-json="https://url.com/path/to/file-containing-urls.json">
</div>
```


### URL mask

`data-url-mask` attribute

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

### JSON

`data-json` attribute

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

### Detector

`data-detector` attribute

By default, Scroll Frames use the specified element `scroll-frame="ID"` intersection value - or its position into the viewport. If `data-detector="ID_OF_ANOTHER_ELEMENT"` is set, Scroll Frames uses the intersection value of the specified HTML element.

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

### Keyframes

`data-keyframes` attribute

By default, playback head throughout image sequence is linear during scroll but it is possible to customize it with keyframes. No limitation on amount of keyframes.

```html
<p>Still frames start changing when element gets 40% (intersection 0.4) in the viewport and stop when element gets 60% (intersection 0.6) in the viewport.</p>
<p>Scroll down to see.</p>
<div    scroll-frames="matrix"
        data-url-mask="https://olivier3lanc.github.io/cinematics-resources/matrix_bullet_time_b/matrix_bullet_time_b_|1 to 197|.webp"
        data-keyframes="0:0 to 40:0 to 60:100 to 100:100">
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

Keyframes syntax description:

| Syntax | Description |
|- |- |
| `[number1]:[number2]` | Definition of a keypoint.|
|  _number1_ | Percentage of element into the viewport<br>0% means element is entering the viewport<br>100% means element leaves the viewport |
|  _number2_ | Position percentage of the playback head of the sequence.<br>0% is the first frame<br>100% is the last frame |
| `[space]to[space]` | Tween link between two keypoints.|

Example

```html
<!-- Description -->
<div data-keyframes="[number1]:[number2] to [number3]:[number4] to [number5]:[number6] to [number7]:[number8] (...)"></div>
<!-- Example -->
<div data-keyframes="0:0 to 40:0 to 60:100 to 100:100"></div>
"0:0" when element is entering viewport, playback head is set at 0%
" to " links two keypoints
"40:0" when intersection of the element is 0.4 (40%), playback head is still set at 0%
" to " links two keypoints
"60:100" when intersection of the element is 0.6 (60%), playback head is set at 100%
" to " links two keypoints
"100:100" when intersection of the element is 1 (100%), playback head is set at 100%
```

### Fit and adjust

* `data-background-position` attribute
* `data-background-repeat` attribute
* `data-background-size` attribute

This setting adjusts position of still frames into the element. Scroll Frames changes still frames as CSS background-image. You can customize applicable CSS properties by using the following dedidated data attributes:

| CSS Property | Default value | Data attribute |
|- |- |- | 
| _background-position_ | center | data-background-position |
| _background-repeat_ | no-repeat | data-background-repeat |
| _background-size_ | contain | data-background-size |

```html
<p>Default settings</p>
<div    scroll-frames="matrix1"
        data-url-mask="https://olivier3lanc.github.io/cinematics-resources/matrix_bullet_time_b/matrix_bullet_time_b_|1 to 197|.webp">
</div>

<p>Background size attribute set to cover</p>
<div    scroll-frames="matrix5"
        data-url-mask="https://olivier3lanc.github.io/cinematics-resources/matrix_bullet_time_b/matrix_bullet_time_b_|1 to 197|.webp"
        data-background-size="cover">
</div>

<p>Background repeat attribute set to repeat</p>
<div    scroll-frames="matrix2"
        data-url-mask="https://olivier3lanc.github.io/cinematics-resources/matrix_bullet_time_b/matrix_bullet_time_b_|1 to 197|.webp"
        data-background-repeat="repeat">
</div>

<p>Background position attribute set to 0%</p>
<div    scroll-frames="matrix3"
        data-url-mask="https://olivier3lanc.github.io/cinematics-resources/matrix_bullet_time_b/matrix_bullet_time_b_|1 to 197|.webp"
        data-background-position="0%">
</div>

<p>Background position attribute set to 100%</p>
<div    scroll-frames="matrix4"
        data-url-mask="https://olivier3lanc.github.io/cinematics-resources/matrix_bullet_time_b/matrix_bullet_time_b_|1 to 197|.webp"
        data-background-position="100%">
</div>
<style>
    [scroll-frames*="matrix"] { 
        height: 80vh;
        margin-bottom: 40vh;
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

## Credits

&copy; [The Matrix movie bullet time](https://www.warnerbros.com/movies/matrix)