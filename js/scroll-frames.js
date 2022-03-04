const scrollFrames = {
    defaults: {
        style: {
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'contain',
            backgroundPosition: 'center'
        }
    },
    // Scroll line
    // @el - object - The DOM object to detect
    // Returns float between 0 and 1
    // value == 0 means the element is not visible yet
    // value between 0 and 1 means the element is currently visible into the viewport
    // 0 means the element starts into the viewport
    // 1 means the element has just finished to run through the viewport
    // value == 1 means the element has past the viewport is not visible anymore
    getScrollLine: function(el) {
        let response = -1;
        if (typeof el == 'object') {
            const detector_id = el.dataset.detector;
            if (detector_id !== undefined) {
                const el_detector = document.getElementById(detector_id);
                if (el_detector !== null) {
                    el = el_detector;
                }
            }
            if (typeof el.getBoundingClientRect == 'function') {
                const box = el.getBoundingClientRect();
                const el_offset_top = box.top + window.pageYOffset - document.documentElement.clientTop;
                const el_height = el.clientHeight;
                const window_scroll_top = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
                const window_height = window.document.documentElement.clientHeight;
                response = (window_scroll_top + window_height - el_offset_top) / (window_height + el_height);
            }
        }
        // Limits between 0 and 1
        if (response > 1) {
            response = 1;
        }
        if (response < 0) {
            response = 0;
        }
        return response;
    },
    anims: {},
    // Set up the animations
    update: function() {
        // Scan for instances
        let elems_anims = document.querySelectorAll('[scroll-frames]');
        if (elems_anims !== null) {
            elems_anims.forEach(function(el_anim) {
                // Get the anim ID
                const anim_id = el_anim.getAttribute('scroll-frames');
                // Get the URL mask
                const anim_url_mask = el_anim.dataset.urlMask;
                // Get the JSON URL
                const anim_json_url = el_anim.dataset.json;
                // Get the anim keyframes
                let anim_keyframes = el_anim.dataset.keyframes;
                // Set default keyframes if unset
                if (anim_keyframes === undefined) {
                    anim_keyframes = '0:0 to 100:100';
                }
                
                // Check id validity
                if (anim_id.length > 0 && anim_id !== undefined) {
                    // Init instance before fetch
                    scrollFrames.anims[anim_id] = {
                        ready: false,
                        transfer: false,
                        backgroundImage: '',
                        backgroundSizes: []
                    }
                    // Mask
                    if (anim_url_mask !== undefined && anim_json_url === undefined) {
                        const anim_mask_array = anim_url_mask.split('|');
                        if (anim_mask_array.length == 3) {
                            const anim_mask_interval = anim_mask_array[1].split(' to ');
                            const anim_mask_i_start = parseInt(anim_mask_interval[0]);
                            const anim_mask_i_end = parseInt(anim_mask_interval[1]);
                            let json_from_mask = [];
                            // console.log(anim_mask_i_start,anim_mask_i_end);
                            for (let frame_index = anim_mask_i_start; frame_index <= anim_mask_i_end; frame_index++) {
                                json_from_mask.push({
                                    url: anim_mask_array[0] + frame_index + anim_mask_array[2]
                                });
                            }
                            // console.log(json_from_mask)
                            scrollFrames.build(json_from_mask, el_anim, anim_id, anim_keyframes);
                        }
                    }
                    // Test if valid JSON URL
                    if (anim_json_url !== undefined && anim_url_mask === undefined) {
                        if (anim_json_url.indexOf('.json') == anim_json_url.length - 5) {
                            // Let's fetch
                            fetch(anim_json_url).then(function(response) {
                                const contentType = response.headers.get("content-type");
                                if(contentType && contentType.indexOf("application/json") !== -1) {
                                    return response.json().then(function(json) {
                                        scrollFrames.build(json, el_anim, anim_id, anim_keyframes);
                                    });
                                } else {
                                    console.log(anim_json_url+" is not a valid JSON URL!");
                                }
                            });
                        }
                    }
                }
            });
        }
    },
    build: function(json, el_anim, anim_id, anim_keyframes) {
        // Background image string and background size object
        let backgroundImage = '';
        let backgroundSizes = [];
        console.log(json);
        json.forEach(function(data, index) {
            backgroundImage += 'url('+data.url+')';
            if (index < json.length - 1) {
                backgroundImage += ',';
            }
            let backgroundSize = '';
            // Set background size value from this element or use default
            let backgroundSizeProperty = scrollFrames.defaults.style.backgroundSize;
            if (el_anim.dataset.backgroundSize !== undefined) {
                backgroundSizeProperty = el_anim.dataset.backgroundSize;
            }
            json.forEach(function(bsData, bsIndex) {
                if (bsIndex == index) {
                    backgroundSize += backgroundSizeProperty;
                } else {
                    backgroundSize += '0%';
                }
                if (bsIndex < json.length - 1) {
                    backgroundSize += ',';
                }
            });
            backgroundSizes.push(backgroundSize);
        });
        // Write the CSS multiple background-image property for this anim
        scrollFrames['anims'][anim_id]['backgroundImage'] = backgroundImage;
        // Write the CSS multiple background-size property for this anim
        scrollFrames['anims'][anim_id]['backgroundSizes'] = backgroundSizes;
        // Build the transfer function from keyframes
        scrollFrames['anims'][anim_id]['transfer'] = function(scroll_line) {
            let response = 0;
            if (typeof scroll_line == 'number') {
                // Keypoints
                if (anim_keyframes.indexOf(':') > 0) {
                    // example: 0:0 to 70:0 to 100:100
                    // console.log(anim_id);
                    const fromToArray = anim_keyframes.split(' to ');
                    let xa = 0;
                    let ya = fromToArray[0].split(':')[1];
                    let xb = 1;
                    let yb = 1;
                    // console.log(fromToArray);
                    fromToArray.forEach(function(keypoint, keyPointIndex) {
                        // If not last
                        if (keyPointIndex < fromToArray.length - 1) {
                            const positionCurrent = parseFloat(keypoint.split(':')[0]) / 100;
                            const positionNext = parseFloat(fromToArray[keyPointIndex + 1].split(':')[0]) / 100;
                            
                            if (scroll_line >= positionCurrent && scroll_line <= positionNext) {
                                // console.log(positionCurrent, scroll_line, positionNext);
                                xa = positionCurrent;
                                ya = parseFloat(keypoint.split(':')[1]);
                                xb = positionNext;
                                yb = parseFloat(fromToArray[keyPointIndex + 1].split(':')[1]);
                            }
                        }
                    });
                    const coef = (yb - ya) / (xb - xa);
                    const y0 = yb - coef * xb;
                    response = (coef * scroll_line + y0) / 100;
                    // console.log(anim_id, response);
                    // console.log('scroll_line:'+scroll_line, 'yb:'+yb, 'ya:'+ya, 'xb:'+xb, 'xa:'+xa, 'response:'+response);
                }
            }
            return response;
        }
        // Write it is OK ready to be used
        scrollFrames['anims'][anim_id]['ready'] = true;
        // Write the DOM element
        scrollFrames['anims'][anim_id]['el'] = document.querySelector('[scroll-frames="'+anim_id+'"]');
        // If optional detector is set
        if (scrollFrames['anims'][anim_id]['el'] !== null) {
            const optional_detector_id = scrollFrames['anims'][anim_id]['el'].dataset.detector;
            if (optional_detector_id !== undefined) {
                const el_detector = document.getElementById(optional_detector_id);
                if (el_detector !== null) {
                    scrollFrames['anims'][anim_id]['el_detector'] = el_detector;
                }
            }
        }

        // Apply the background-image property on element
        el_anim.style.backgroundImage = scrollFrames['anims'][anim_id]['backgroundImage'];
        // Apply other style properties
        Object.keys(scrollFrames.defaults.style).forEach(function(property) {
            // If CSS property is set through dataset on el_anim, use it 
            if (el_anim.dataset[property] !== undefined) {
                el_anim.style[property]  = el_anim.dataset[property];
            }
            // Otherwise use default
            else {
                el_anim.style[property]  = scrollFrames.defaults.style[property];
            }
        });
        // Start 
        scrollFrames.frame();
        // Apply listener
        window.addEventListener('scroll', scrollFrames.raf);
    },
    raf: function() {
        window.requestAnimationFrame(scrollFrames.frame);
    },
    frame: function() {
        // Scan all anims ids
        Object.keys(scrollFrames.anims).forEach(function(anim_id, anim_index) {
            // If current anim is ready
            if (scrollFrames['anims'][anim_id]['ready'] && scrollFrames['anims'][anim_id]['el'] !== null) {
                let current_scroll_line = 0;
                if (scrollFrames['anims'][anim_id]['el_detector'] !== null && scrollFrames['anims'][anim_id]['el_detector'] !== undefined) {
                    current_scroll_line = scrollFrames.getScrollLine(scrollFrames['anims'][anim_id]['el_detector']);
                } else {
                    current_scroll_line = scrollFrames.getScrollLine(scrollFrames['anims'][anim_id]['el']);
                }
                const frameIndex = scrollFrames['anims'][anim_id]['transfer'](current_scroll_line);
                const index = Math.round(frameIndex * (scrollFrames['anims'][anim_id]['backgroundSizes'].length - 1));
                // console.log(anim_id, current_scroll_line, frameIndex);
                // Apply proper background-size property
                scrollFrames['anims'][anim_id]['el']['style']['background-size'] = scrollFrames['anims'][anim_id]['backgroundSizes'][index];
            }
        });
    }
}
scrollFrames.update();



// POC
// let el = document.getElementById('test');
// // With fetch
// fetch('../js/fakedata/frames.json').then(function(response) {
//     var contentType = response.headers.get("content-type");
//     if(contentType && contentType.indexOf("application/json") !== -1) {
//         return response.json().then(function(json) {
//             // traitement du JSON
//             // Background image string and background size object
//             let backgroundImage = '';
//             let backgroundSizes = [];
//             json.frames.forEach(function(url, index) {
//                 backgroundImage += 'url('+url.url+')';
//                 if (index < json.frames.length - 1) {
//                     backgroundImage += ',';
//                 }
//                 let backgroundSize = '';
//                 json.frames.forEach(function(url, bsIndex) {
//                     if (bsIndex == index) {
//                         backgroundSize += 'cover';
//                     } else {
//                         backgroundSize += '0%';
//                     }
//                     if (bsIndex < json.frames.length - 1) {
//                         backgroundSize += ',';
//                     }
//                 });
//                 backgroundSizes.push(backgroundSize);
//             });
//             el.style.backgroundImage = backgroundImage;
//             // console.log(backgroundSizes);

//             // Scroll
//             let window_scroll_top = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
//             const window_height = window.document.documentElement.clientHeight;
//             const body = document.body;
//             const html = document.documentElement;
//             const document_height = Math.max(
//                 body.offsetHeight,
//                 body.scrollHeight,
//                 html.clientHeight,
//                 html.offsetHeight,
//                 html.scrollHeight
//             );
//             let index = 0, previousIndex = 0;
//             let frame = function() {
//                 window_scroll_top = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
//                 //index = window_scroll_top / (document_height - window_height);
//                 index = Math.round((window_scroll_top / (document_height - window_height)) * (backgroundSizes.length - 1));
                
//                 if (previousIndex !== index) {
//                     // console.log(index);
//                 }
//                 previousIndex = index;
//                 // for (const property in actual_JSON['frames'][index]) {
//                 //     if (Object.hasOwnProperty.call(actual_JSON['frames'][index], property)) {
//                 //         el.style[property] = actual_JSON['frames'][index][property];
//                 //     }
//                 // }
//                 // el.style.backgroundImage = 'url('+actual_JSON['frames'][index]+')';
//                 el.style.backgroundSize = backgroundSizes[index];

//             };
//             window.addEventListener('scroll', frame);
//         });
//     } else {
//         console.log("Oops, nous n'avons pas du JSON!");
//     }
// });


// JSON with XHR
// let xobj = new XMLHttpRequest();
//     xobj.overrideMimeType("application/json");
// xobj.open('GET', '../js/fakedata/frames.json', true); // Replace 'my_data' with the path to your file
// xobj.onreadystatechange = function () {
//     if (xobj.readyState == 4 && xobj.status == "200") {
//         // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
        
//     }
// };
// xobj.send(null);

