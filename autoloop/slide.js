// global variable is jQuery
// top level variable in jQuery is infotown
/**
 * scrollslide.js
 *
 * Copyright 2012 Sawai Hiroshi
 * http://www.info-town.jp
 *
 */

jQuery(function($) {
    /**
     * utilities
     */
    // create object from object
    if (!Object.create) {
        (function () {
            function F() {}

            Object.create = function (object) {
                F.prototype = object;
                return new F();
            };
        }());
    }


    // namespace
    var infotown = {};
    infotown.namespace = function() {
        var object = this;
        return function(name) {
            if (typeof object[name] == "undefined") {
                object[name] = {};
            }
            return object[name];
        };
    }();

    
    // implement layout object and handler object
    (function() {
        /**
         * common property
         */
        var i,
            currentPageIndex = 0,
            pageSelector = '.page',
            group = [],
            inc = 980,
            intervalInc = 980,
            groupWidth = 0,
            settings = {
                'slideSelector' : '#slide-container',
                'groupSelector' : '.slide-group',
                'inc' : 980
            },
            options,
            timer;

                    
        /**
         * Create layout object
         */
        var layout = infotown.namespace('layout');

        /**
         * initialize layout object
         *
         * class name 'page' elemement align horizonal
         *
         * @param {jQuery} outer jQuery element
         * @param {String} direction slide direction (right,left) optional
         * @param {Number} height optional
         */
        function _init(outer, direction, height, top) {
            direction = direction || 'right';
            height = (height === 'auto') ? outer.height() : height;
            top = top || 0;
            outer.css({
                overflow: 'hidden',
                position: 'relative',
                width: $(window).width()
            });
            
            // list of pageSelector class
            // default pageSelector .page
            $(pageSelector, outer).each(function(i) {
               var distanceX;
               if (direction === 'right') {
                   distanceX = i * $('.page').width();
               } else if (direction === 'left') {
                   distanceX = -i * $('.page').width();
               }
               // .page class element layout
               $(this).css({
                   overflow: 'hidden',
                   width: $('.page').width(),
                   top: '0px',
                   left: distanceX
               });
            });

            $.extend(settings, options);
            group[0] = $(settings.groupSelector);
            
            // calculate slide-group width
            $('.page', settings.groupSelector).each(function () {
                groupWidth += $(this).width();
            });
            group[0].css('width', groupWidth);
            group[0].css({
                position: 'absolute',
                top: 0,
                left: 0
            });
            // set group copy
            group[1] = group[0].clone(true);
            group[1].css({
                position: 'absolute',
                top: 0,
                left: group[0].width()
            });
            $(settings.slideSelector).append(group[1]);

        }
        layout.init = _init;



        /**
         *  implement handler object
         */
        var handler = infotown.namespace('handler');

        /**
         * callback
         * follow other group so that loop realize
         *
         * @param {Number} i group index
         * @param {String} callee function name
         */
        function follow(i) {
            var j = (i === 0) ? 1 : 0;
            if (parseInt(group[i].css('left'), 10) < -group[i].width()) {
                group[i].css('left', parseInt(group[j].css('left'), 10) + group[i].width());
            }
            if (arguments[1] === 'intervalScroll') {
                if (typeof timer !== 'undefined') {
                    clearTimeout(timer);
                }
                timer = setTimeout(curryTimerCallback(intervalScroll, this), 3860);
            }

        }

        /**
         * scroll left on inc amout
         * @param {Number} i group index
         */
        function scroll(i) {
            group[i].animate({
                left: '-=' + inc 
            }, 1860, follow(i));
        }

        /**
         * call scroll
         */
        function next() {
            for (i = 0; i < group.length; i++) {
                scroll(i);
            }
        }
        handler.next = next;

        /**
         * setTimeout callback argument pattern
         */
        function curryTimerCallback() {
            var userFunc = arguments[0],
                args = Array.prototype.slice.call(arguments, 1);
            return function() {
                return userFunc.apply(this, args);
            };
        }

        /**
         * scroll interval
         */
        function intervalScroll() {
            var m, n;
            for (m = 0; m < group.length; m++) {
                 var n = (m === 0) ? 1 : 0;
                 if (parseInt(group[m].css('left'), 10) < -group[m].width() + 20) {
                     group[m].css('left', parseInt(group[n].css('left'), 10) + group[m].width());
                 }
             }

            for (i = 0; i < group.length; i++) {
                group[i].animate({
                    left: '-=' + intervalInc
                }, 1860, follow(i, 'intervalScroll'));
            }
        }

        /**
         * interval call scroll slide
         */
        function intervalNext() {
            setTimeout(intervalScroll, 500);
        }
        handler.intervalNext = intervalNext;

    }());



    (function() {
        var layout = infotown.namespace('layout');
        layout.init($('#slide-container'), 'right', 'auto');
        var handler = infotown.namespace('handler');
        // $('#next').click(function() {
        //    handler.next();
        // });
            handler.intervalNext();
    }());

});

