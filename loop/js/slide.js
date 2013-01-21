jQuery(function($) {

    /**
     * @class slide
     * @type {Object}
     */
    var slide = {};

    // implement slide
    (function() {

        // slide_selectorはクラスを指定する。
        // スクリプトで動的にコピーするのでIDだと重複する。
        var settings = {
            'slide_wrapper_selector' : '#slide_wrapper', /* HTMLDivElement */
            'slide_selector' : '.slide', /* HTMLUlElement */
            'increment_px': 75
        };
        var slides = [];
        var slides_width = 0;

        if ($(settings.slide_selector).length !== 1) {
            return this;
        }

        /**
         * initialize
         */
        function init() {

            slides[0] = $($(settings.slide_selector).get(0));

            // calculate slide_slides width
            $('li', settings.slide_selector).each(function () {
                slides_width += $(this).width();
            });
            $(slides[0]).css({
                'width': slides_width
            });

            // Deep copy slides[0]
            // coped slides[1] align right of slides[0]
            slides[1] = slides[0].clone(true);
            slides[1].css({
                position: 'absolute',
                top: 0,
                left: slides[0].width()
            });
            $(settings.slide_wrapper_selector).append(slides[1]);

        }

        /**
         * loop slide
         *
         * @method loop
         * @private
         * @param {Number} num index of slide
         */
        function loop(num) {
            var other = (num === 0) ? 1 : 0;
            if (parseInt(slides[num].css('left'), 10) < -slides[num].width()) {
                slides[num].css('left', parseInt(slides[other].css('left'), 10) + slides[num].width());
            }
        }

        /**
         * move slide
         *
         * @method move
         * @private
         */
        function move() {
            var i;
            for (i = 0; i < slides.length; i++) {
                slides[i].animate({
                    left: '-=' + settings.increment_px
                }, 'slow', loop(i));
            }

        }
        /**
         * click handler for button click event
         *
         * @method #move-left.click
         * @private
         * @param {Event} evt
         */
        $('#move-left').click(function(evt) {
            move();
//            return false;
        });

        // public method
        slide.init = init;

    }());

    slide.init();

});
