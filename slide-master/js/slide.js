jQuery(function($) {
    var slide = {}; 
    (function() {
        var i,
        group = [],
        groupWidth = 0,
        settings = {
            'slideSelector' : '#slide',
            'groupSelector' : '.slide-group',
            'increment': 75
        };

        if ($('.slide-group').length !== 1) {
            return this;
        }

        /**
         * initialize
         */
        function init() {

            group[0] = $(settings.groupSelector);
            
            // calculate slide-group width
            $('li', settings.groupSelector).each(function () {
                groupWidth += $(this).width();
            });
            group[0].css({
                'width': groupWidth
            });

            // group[0] is  deep copy
            // new group[1] align right of group[0]
            group[1] = group[0].clone(true);
            group[1].css({
                position: 'absolute',
                top: 0,
                left: group[0].width()
            });
            $(settings.slideSelector).append(group[1]);

            /**
             * for event:w
             * :w
             * click handler for button click event
             */ 
            $('#move-left').click(function(evt) {
                var i,
                callback = function (j) {
                    var index = (j === 0) ? 1 : 0;

                    if (parseInt(group[j].css('left'), 10) < -group[j].width()) {
                        group[j].css('left', parseInt(group[index].css('left'), 10) + group[j].width());
                    }
                };
                for (i = 0; i < group.length; i++) {
                    group[i].animate({
                        left: '-=' + settings.increment 
                    }, 'slow', callback(i));
                }
            });
        }
        slide.init = init;
    }());

    slide.init();
});
