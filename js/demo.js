const els_demo = document.querySelectorAll('[scroll-frames^="demo_"]');
if (els_demo.length > 0) {
    window.addEventListener('scroll', function(evt) {
        els_demo.forEach(function(el) {
            const value = scrollFrames.getScrollLine(el);
            const el_display_scroll_line = el.querySelector('.demo_display-scroll-line');
            if (el_display_scroll_line !== null) {
                el_display_scroll_line.innerText = value;
            }
        })
    }, false)
}