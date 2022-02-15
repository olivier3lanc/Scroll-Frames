// SIDEBAR
let sidebar = function(cmd) {
    if (cmd === undefined) {
        jQuery('#libdoc-sidebar').toggleClass('m-anchor-top-right--sm m-anchor-top-right--md');
        jQuery('#libdoc-sidebar-overlay').toggleClass('m-anchor-top-right');
    }
    if (cmd == 'close') {
        jQuery('#libdoc-sidebar').addClass('m-anchor-top-right--sm m-anchor-top-right--md');
        jQuery('#libdoc-sidebar-overlay').addClass('m-anchor-top-right');
    }
    if (cmd == 'open') {
        jQuery('#libdoc-sidebar').removeClass('m-anchor-top-right--sm m-anchor-top-right--md');
        jQuery('#libdoc-sidebar-overlay').removeClass('m-anchor-top-right');
    }
}
// MODAL AJAX
let modalAjax = function(file) {
    const el_modal_content = document.querySelector('#libdoc-modal-content');
    if (typeof file == 'string' && el_modal_content !== null) {
        const url = site.url+site.baseurl+'/libdoc/ajax/'+file+'.html';
        fetch(url)
            .then(data => data.text())
            .then(data => {
                el_modal_content.innerHTML = data;
            })
    }
};
// COPY TO CLIPBOARD
let copyToClipboard = function(value) {
    if (typeof value == 'string') {
        // From https://stackoverflow.com/a/30905277
        // Create a "hidden" input
        var aux = document.createElement("input");
        // If it is an ID, use text of this element
        if (value.indexOf('#') === 0) {
            const id = value.split('#')[1];
            if (document.getElementById(id).tagName == 'INPUT') {
                value = document.getElementById(id).value;
            } else {
                value = document.getElementById(id).innerText;
            }
        }
        // Assign it the value of the specified element
        aux.setAttribute("value", value);
        // Append it to the body
        document.body.appendChild(aux);
        // Highlight its content
        aux.select();
        // Copy the highlighted text
        document.execCommand("copy");
        // Remove it from the body
        document.body.removeChild(aux);
        // Done
        alert('Code copied to clipboard:'+value);
    }
}
// Auto scroll to hash anchor
// jQuery(window).on('load', function() {
//     if (document.location.hash != "") {
//         var id = document.location.hash;
//         // console.log(jQuery(id).length);
//         if (jQuery(id).length == 1) {
//             var amountOfScroll = jQuery(id).offset().top;
//             console.log(amountOfScroll);
//             jQuery(window).scrollTop(amountOfScroll);
//         }
//     }
// });
jQuery(document).ready(function() {
    myToggle.update();
    //Manage external links
    jQuery('main a[href^="http"], .libdoc-sidebar-item a[href^="http"]').each(function(){
        // Only if link is not in .playground
        if (jQuery(this).closest('.playground').length == 0) {
            var link = jQuery(this).attr('href');
            //Check if it is an internal link (check if hostname is contained into the link string)
            if(link.indexOf(window.location.origin) != 0){
                jQuery(this)
                    .append('<span class="i-external-link u-ml-xxs"></span>')
                    // .append(' <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-external-link"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg> ')
                    .attr('target','_blank');
            }
        }
    });

    // RESPONSIVE TABLES
    document.querySelectorAll('main table').forEach(function(el_table) {
        el_table.querySelectorAll('th').forEach(function(el_th, index_th) {
            const nth_child = index_th + 1;
            const title = el_th.innerText;
            el_table.querySelectorAll('tbody tr td:nth-child('+nth_child+')').forEach(function(el_td) {
                el_td.setAttribute('data-title', title);
            });
        });
    });

    // CREATE TOC 
    var jQ_kramdownToc = jQuery('#markdown-toc').clone();
    if(jQ_kramdownToc.length > 0){
        // TOC generation
        const page_title = jQuery('main h1:first-child').eq(0).text();
        jQ_kramdownToc.children('li').addClass('u-bt-thin-dashed-alt');
        jQ_kramdownToc.find('ol,ul').addClass('u-ls-none u-m-none u-pl-xs');
        jQ_kramdownToc.find('a').addClass('c-btn m-translucid m-block-left m-xs c-text m-ff-lead m-reset');
        jQuery('#libdoc-toc-container').html(
            '<nav id="toc" class="u-sticky u-top-0 u-mh-100vh u-o-auto u-z-10">'+
                '<ol class="u-ls-none u-m-none u-p-none">'+
                    '<li><a href="#" class="c-btn m-translucid m-block-left u-pl-sm">'+page_title+'</a></li>'+
                    jQ_kramdownToc.html()+
                '</ol>'+
            '</nav>'
        );
    }
});
let resizer = {
    update: function() {
        const resizer_style = `
            <style>
                .resizer { display: flex; align-items: center; justify-content: center; position:absolute; z-index: 12; }                
                .resizer.resizer-width { 
                    top: 0%;
                    right: 0px;
                    width: 10px;
                    height: 100%;
                    cursor: col-resize;
                    background: var(--sg-background-stripes) var(--sg-color-primary-edge);
                    transition: none;
                }
                .resizer.resizer-width::before { 
                    content: '';
                    right: 10px;
                    position: absolute;
                    height: 100%;
                    border-left: var(--sg-border-thin-dashed-alt);
                }
                .resizer.resizer-width:hover { 
                    width: 100px; 
                    right: -50px;
                    background: transparent;
                    border-left: none;
                }
                .resizer.resizer-width:hover::before { 
                    right: calc(50% + 10px);
                }
                .resizer.resizer-width:hover::after { 
                    content: '';
                    width: 10px;
                    left: calc(50% - 10px);
                    position: absolute;
                    height: 100%;
                    cursor: col-resize;
                    background: var(--sg-background-stripes) var(--sg-color-primary-alt);
                }
                .resizer.resizer-height { bottom: 0%; left: 0px; width: 100%; height: 0px; cursor: row-resize; }
                .resizer.resizer-height:hover { height: 100px; bottom: -50px; }
                .resizer.resizer-height::after {
                    content: '';
                    height: 6px;
                    width: 50px;
                    background: var(--sg-background-stripes) var(--sg-color-primary-edge);
                    border: var(--sg-border-thin-solid-alt);
                    border-radius: var(--sg-border-radius-xl);
                }
                .resizer.resizer-width.resizer-height {
                    top: inherit;
                    bottom: -8px;
                    right: -8px;
                    left: inherit;
                    width: 16px;
                    height: 16px;
                    cursor: nwse-resize; 
                }
                .resizer.resizer-width.resizer-height:hover {
                    top: inherit;
                    bottom: -16px;
                    right: -16px;
                    left: inherit;
                    width: 32px;
                    height: 32px;
                }
                .resizer.resizer-width.resizer-height::after {
                    content: '';
                    position: absolute;
                    height: 16px;
                    width: 16px;
                    top: inherit;
                    left: inherit;
                    background: var(--sg-background-stripes) var(--sg-color-primary-edge);
                    border: var(--sg-border-thin-solid-alt);
                    border-top-left-radius: var(--sg-border-radius-xl);
                    border-bottom-right-radius: 0;
                    border-bottom-left-radius: 0;
                    border-top-right-radius: 0;
                }
                .resizer.resizer-width.resizer-height::before {
                    content: '';
                    position: absolute;
                    width: 36px;
                    height: 36px;
                    border-bottom: var(--sg-border-thin-dashed-alt);
                    right: 7px;
                    bottom: 7px;
                    border-right: var(--sg-border-thin-dashed-alt);
                } 
            </style>
        `;
        document.head.insertAdjacentHTML('beforeend', resizer_style);
        document.querySelectorAll('.resizeable').forEach(function(el, index) {
            const assigned_id = 'resizer_'+index;
            resizer.instances[assigned_id] = {
                el_resizer: document.createElement('div'),
                el_resizeable: el,
                startX: 0,
                startY: 0,
                startWidth: 0,
                startHeight: 0
            };
            resizer.instances[assigned_id].el_resizer.id = 'resizer_'+index;
            resizer.instances[assigned_id].el_resizer.setAttribute('title', 'Resize');
            if (el.classList.contains('resizeable-width') && el.classList.contains('resizeable-height')) {
                resizer.instances[assigned_id].el_resizer.classList.add('resizer', 'resizer-width', 'resizer-height', 'u-none--sm');
            } else if (el.classList.contains('resizeable-width')) {
                resizer.instances[assigned_id].el_resizer.classList.add('resizer', 'resizer-width', 'u-none--sm');
            } else if (el.classList.contains('resizeable-height')) {
                resizer.instances[assigned_id].el_resizer.classList.add('resizer', 'resizer-height', 'u-none--sm');
            } else {
                resizer.instances[assigned_id].el_resizer.classList.add('resizer', 'resizer-width', 'resizer-height', 'u-none--sm');
            }
            if (document.defaultView.getComputedStyle(resizer.instances[assigned_id].el_resizeable).position == 'static') {
                resizer.instances[assigned_id].el_resizeable.style.position = 'relative';
            }
            el.appendChild(resizer.instances[assigned_id].el_resizer);
            resizer.instances[assigned_id].el_resizer.addEventListener('mousedown', resizer.initDrag, false);
        })
    },
    instances: {},
    initDrag: function(e) {
        // console.log('initDrag: ');
        resizer.instances[e.target.id].startX = e.clientX;
        resizer.instances[e.target.id].startY = e.clientY;
        if (e.target.classList.contains('resizer-width')) {
            resizer.instances[e.target.id].startWidth = parseInt(document.defaultView.getComputedStyle(resizer.instances[e.target.id].el_resizeable).width, 10);
        }
        if (e.target.classList.contains('resizer-height')) {
            resizer.instances[e.target.id].startHeight = parseInt(document.defaultView.getComputedStyle(resizer.instances[e.target.id].el_resizeable).height, 10);
        }
        document.documentElement.addEventListener('mousemove', resizer.doDrag, false);
        document.documentElement.addEventListener('mouseup', resizer.stopDrag, false);
        resizer.instances[e.target.id].el_resizer.addEventListener('mouseleave', resizer.stopDrag, false);
        // console.log(resizer.instances[e.target.id]);
     },
     
     doDrag: function(e) {
        if (e.target.classList.contains('resizer-width')) {
            resizer.instances[e.target.id].el_resizeable.style.width = (resizer.instances[e.target.id].startWidth + e.clientX - resizer.instances[e.target.id].startX) + 'px';
        }
        if (e.target.classList.contains('resizer-height')) {
            resizer.instances[e.target.id].el_resizeable.style.height = (resizer.instances[e.target.id].startHeight + e.clientY - resizer.instances[e.target.id].startY) + 'px';
        }
     },
     
     stopDrag: function(e) {
        document.documentElement.removeEventListener('mousemove', resizer.doDrag, false);    
        document.documentElement.removeEventListener('mouseup', resizer.stopDrag, false);
     }
}
resizer.update();

// PAGE FEATURED PLAYGROUND
// Get content from the URL and apply the playground
// iframe next to the code syntax highlighter  
const pageFeaturedPlayground = {
    update: function() {
        const   el_iframe_container = document.getElementById('libdoc-page-split'),
                el_featured_code = document.getElementById('libdoc-featured-code'),
                hash = window.location.hash.replace('#', '');

        if (el_iframe_container !== null && el_featured_code !== null && hash.length > 0) {
            const   stringified_sent_object = atob(hash),
                    sent_object = JSON.parse(stringified_sent_object),
                    sent_object_escaped = sent_object.content.replace(/&/g, "&amp;")
                                                .replace(/</g, "&lt;")
                                                .replace(/>/g, "&gt;")
                                                .replace(/"/g, "&quot;")
                                                .replace(/'/g, "&#039;");
            // console.log(`<pre><code class="language-html">${sent_object.content}</code></pre>`);
            el_featured_code.innerHTML = `<pre class="playground" title="${sent_object.options.title}"><code class="language-html">${sent_object_escaped}</code></pre>`;
            // Prism.highlightAll();
            // el_iframe_container.innerHTML = '<iframe src="'+site.url+site.baseurl+'/libdoc/playground.html#'+hash+'" class="u-transition-none u-absolute u-h-100 u-b-none u-w-100"></iframe>';
        }
    }
}
pageFeaturedPlayground.update();

// IFRAME MODE
const iframeModeEmbed = function(url) {
    if (typeof url == 'string') {
        const el_main = document.querySelector('main');
        if (el_main !== null) {
            el_main.innerHTML = '<iframe src="'+url+'" class="u-h-100vh u-w-100 u-bl-none u-bt-none u-br-none u-bb-thin-dashed-alt"></iframe>';
            sidebar('close');
            history.pushState(null, null, '?iframe_mode='+url);
            // Update link states into libdoc's navbar
            document.querySelectorAll('.libdoc-sidebar-item a').forEach(function(el) {
                const href = el.href;
                if (href == url) {
                    el.classList.add('u-br-large-solid');
                } else {
                    el.classList.remove('u-br-large-solid');
                }
            });
        }
    }
}
document.querySelectorAll('#libdoc-sidebar a[data-iframe-mode="true"]').forEach(function(el) {
    el.addEventListener('click', function(e) {
        e.preventDefault();
        iframeModeEmbed(el.href);
    })
});

// LOAD IFRAME AT PAGE LOAD
// If URL has iframe_mode as GET param
const searchParams = new URLSearchParams(location.search);
const iframe_mode_url = searchParams.get('iframe_mode');
if (iframe_mode_url !== null) {
    iframeModeEmbed(iframe_mode_url);
}

