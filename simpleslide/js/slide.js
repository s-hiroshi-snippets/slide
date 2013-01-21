jQuery(function($) {
    $.fn.slide = function() {
        var view = [],
            viewitem = [],
            nav = [],
            navitem = [];

        $(this).each(function(i) {
            view[i] = $('.view', $(this));
            viewitem[i] = $('.item', view[i]);
            nav[i] = $('.nav', $(this));
            navitem[i] = $('.item', nav[i]);

            // clickイベント
            $(navitem[i]).each(function(j) {
                $(navitem[i][j]).click(function() {
                    var k;
                    for (k = 0; k < navitem[i].length; k++) {
                        $(viewitem[i][k]).removeClass('active');
                    }
                    $(viewitem[i][j]).addClass('active');
                });
            });

            // hover
            $(navitem[i]).each(function(j) {
                $(navitem[i][j]).hover(function() {
                    $(this).addClass('mouseover');
                }, function() {
                    $(this).removeClass('mouseover');
                });
            });

        });

        return this;
    };
});
