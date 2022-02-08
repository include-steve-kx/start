/**
 * Get current browser viewpane heigtht
 */
 function get_window_height() {
    return window.innerHeight || 
           document.documentElement.clientHeight ||
           document.body.clientHeight || 0;
}

/**
 * Get current absolute window scroll position
 */
function get_window_Yscroll() {
    return window.pageYOffset || 
           document.body.scrollTop ||
           document.documentElement.scrollTop || 0;
}

/**
 * Get current absolute document height
 */
function get_doc_height() {
    return Math.max(
        document.body.scrollHeight || 0, 
        document.documentElement.scrollHeight || 0,
        document.body.offsetHeight || 0, 
        document.documentElement.offsetHeight || 0,
        document.body.clientHeight || 0, 
        document.documentElement.clientHeight || 0
    );
}

/**
 * Get current vertical scroll percentage
 */
function get_scroll_percentage() {
    return get_clamp_value(get_window_Yscroll() / (get_doc_height() - get_window_height())  * 100);
}

// helper function to map the final range between 0-100
function get_clamp_value(value) {
    return Math.min(Math.max(value, 0), 100);
}