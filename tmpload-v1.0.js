/*
tmpload jQuery Plugin v1.0
Copyright 2011, Mark Dalgleish

This content is released under the MIT License
github.com/markdalgleish/tmpload/blob/master/MIT-LICENSE.txt
*/
(function($, undefined) {
    //Template cache
    var templates = {};
    
    $.tmpload = function(obj, url) {
        if (url === undefined) {
            //Declaring template(s)
            if (typeof obj === "object") {
                if (obj.length) {
                    //Array of declaration objects
                    for (var i = 0; i < obj.length; i++) {
                        templates[obj[i].name] = obj[i].url;
                    }
                } else {
                    //A single declaration object
                    templates[obj.name] = obj.url;
                }
            }
            //Loading the template
            else if (typeof obj === "string") {
                if (typeof templates[obj] === "string") {
                    //The template hasn't been loaded yet

                    			// pipe() decorates the Deferred object returned by get(), so get().success()
					// passes precompiled template instead of raw html. 
					// get.fail() works undecorated as before.
					// The decorated Deferred object stores the precompiled template internally, so the 
					// compilation is called only once just after the HTTP GET.
					// 
					// Contrary to what the name suggests, Deferred object is not delaying the computation
					// - the computation (HTTP GET and template compilation) starts immediately and only 
					// synchronization is delayed.
					// 
					// So we cannot use Deferred to avoid executing get() twice. We need either an 
					// implementation of abstract memoized thunk or to simulate the 'already evaluated' 
					// check of the memoized thunk using typeof dfd === 'string' condition as the flag

					templates[obj] = $.get(templates[obj]).pipe(function (tmplStr)
					{
						// template() requires two arguments - the first argument can be null but it  
						// not optional in the documentation. However
						// but we pass template name here to support nested templates feature of 
						// jQuery templates
						return $.template(obj, tmplStr)
					})
                }
                    //The template has already been cached
                    return templates[obj];
            }
        //Declaring a single template
        } else {
            templates[obj] = url;
        }
    };
})(jQuery);