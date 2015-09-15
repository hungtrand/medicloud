/*!
 *  3.6.3
 * Author: mosaicpro
 * Licence: http://themeforest.net/licenses
 * Copyright 2015
 */

/*!
 *  3.6.3
 * Author: mosaicpro
 * Licence: http://themeforest.net/licenses
 * Copyright 2015
 */

(function ($) {

    // Find all YouTube videos
    var $allVideos = $("iframe[src^='http://player.vimeo.com'], iframe[src^='http://www.youtube.com']"),

    // The element that is fluid width
    $fluidEl = $("panel");

    // Figure out and save aspect ratio for each video
    $allVideos.each(function() {

        $(this)
            .data('aspectRatio', this.height / this.width)

            // and remove the hard coded width/height
            .removeAttr('height')
            .removeAttr('width');

    });

    // When the window is resized
    $(".gallery-grid .panel").resize(function() {

        var newWidth = $fluidEl.width();

        // Resize all videos according to their own aspect ratio
        $allVideos.each(function() {

            var $el = $(this);
            $el
                .width(newWidth)
                .height(newWidth * $el.data('aspectRatio'));

        });

    // Kick off one resize to fix all videos on page load
    }).resize();

})(jQuery);
(function ($) {
    "use strict";

    /**
     * jQuery plugin wrapper for compatibility with Angular UI.Utils: jQuery Passthrough
     */
    $.fn.tkOwlDefault = function () {

        if (! this.length) return;

        var c = this;
        c.owlCarousel({
            dots: true,
            items: c.data('items') || 4,
            responsive: {
                1200: {
                    items: c.data('itemsLg') || 4
                },
                992: {
                    items: c.data('itemsMg') || 3
                },
                768: {
                    items: c.data('itemsSm') || 3
                },
                480: {
                    items: c.data('itemsXs') || 2
                },
                0: {
                    items: 1
                }
            },
            rtl: this.data('rtl'),
            afterUpdate: function () {
                $(window).trigger('resize');
            }
        });

    };

    $(".owl-basic").each(function () {
        $(this).tkOwlDefault();
    });

})(jQuery);
(function ($) {
    "use strict";

    /**
     * jQuery plugin wrapper for compatibility with Angular UI.Utils: jQuery Passthrough
     */
    $.fn.tkOwlMixed = function () {

        if (! this.length) return;

        this.owlCarousel({
            items: 2,
            nav: true,
            dots: false,
            rtl: this.data('rtl'),
            navText: [ '<i class="fa fa-chevron-left"></i>', '<i class="fa fa-chevron-right"></i>' ],
            responsive: {
                1200: {
                    items: 2
                },
                0: {
                    items: 1
                }
            }
        });

    };

    $(".owl-mixed").tkOwlMixed();

})(jQuery);
(function ($) {
    "use strict";

    var syncPosition = function (e, target) {
        if (e.namespace && e.property.name === 'items') {
            target.trigger('to.owl.carousel', [e.item.index, 300, true]);
        }
    };

    /**
     * jQuery plugin wrapper for compatibility with Angular UI.Utils: jQuery Passthrough
     */
    $.fn.tkOwlPreview = function () {

        if (! this.length) return;

        var target = $(this.data('sync')),
            preview = this,
            rtl = this.data('rtl');

        if (! target.length) return;

        this.owlCarousel({
            items: 1,
            slideSpeed: 1000,
            dots: false,
            responsiveRefreshRate: 200,
            rtl: rtl,
            nav: true,
            navigationText: [ '<i class="fa fa-chevron-left"></i>', '<i class="fa fa-chevron-right"></i>' ]
        });

        this.on('change.owl.carousel', function(e){
            syncPosition(e, target);
        });

        target.owlCarousel({
            items: 5,
            responsive: {
                1200: {
                    items: 7
                },
                768: {
                    items: 6
                },
                480: {
                    items: 3
                },
                0: {
                    items: 2
                }
            },
            dots: false,
            nav: true,
            responsiveRefreshRate: 100,
            rtl: rtl,
            afterInit: function (el) {
                el.find(".owl-item").eq(0).addClass("synced");
            }
        });

        target.on('change.owl.carousel', function(e){
            syncPosition(e, preview);
        });

        target.find('.owl-item').click(function (e) {
            e.preventDefault();
            var item = $(this).data("owl-item");
            preview.trigger("to.owl.carousel", [item.index, 300, true]);
        });

    };

    $(".owl-preview").tkOwlPreview();

})(jQuery);
(function ($) {
    "use strict";

    /**
     * jQuery plugin wrapper for compatibility with Angular UI.Utils: jQuery Passthrough
     */
    $.fn.tkSlickDefault = function () {

        if (! this.length) return;

        if (typeof $.fn.slick == 'undefined') return;

        var c = this;
        
        c.slick({
            dots: true,
            slidesToShow: c.data('items') || 3,
            responsive: [
                {
                    breakpoint: 1200,
                    settings: {
                        slidesToShow: c.data('itemsLg') || 4
                    }
                },
                {
                    breakpoint: 992,
                    settings: {
                        slidesToShow: c.data('itemsMd') || 3
                    }
                },
                {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: c.data('itemsSm') || 3
                    }
                },
                {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: c.data('itemsXs') || 2
                    }
                },
                {
                    breakpoint: 0,
                    settings: {
                        slidesToShow: 1
                    }
                }
            ],
            rtl: this.data('rtl'),
            onSetPosition: function () {
                $(window).trigger('resize');
            }
        });

        $(document).on('sidebar.shown', function(){
            c.slickSetOption('dots', true, true);
        });

    };

    $(".slick-basic").each(function () {
        $(this).tkSlickDefault();
    });

})(jQuery);
/*!
 *  3.6.3
 * Author: mosaicpro
 * Licence: http://themeforest.net/licenses
 * Copyright 2015
 */

(function ($) {

    $(function () {

        var cssSelectorOptions = {
            videoPlay : ".video-play",
            play : ".play",
            pause : ".pause",
            stop : ".stop",
            seekBar : ".seek-bar",
            playBar : ".play-bar",
            mute : ".mute",
            unmute : ".unmute",
            volumeBar : ".volume-bar",
            volumeBarValue : ".volume-bar-value",
            volumeMax : ".volume-max",
            playbackRateBar : ".playback-rate-bar",
            playbackRateBarValue : ".playback-rate-bar-value",
            currentTime : ".current-time",
            duration : ".duration",
            title : ".title",
            fullScreen : ".full-screen",
            restoreScreen : ".restore-screen",
            repeat : ".repeat",
            repeatOff : ".repeat-off",
            gui : ".gui",
            noSolution : ".no-solution"
        },
        stateClassOptions = {
            playing : "state-playing",
            seeking : "state-seeking",
            muted : "state-muted",
            looped : "state-looped",
            fullScreen : "state-full-screen",
            noVolume : "state-no-volume"
        };

        $("#jquery_jplayer_audio_1").jPlayer({
            ready: function () {
                $(this).jPlayer("setMedia", {
                    title: "Miaow - Bubble",
                    m4a: "http://jplayer.org/audio/m4a/Miaow-07-Bubble.m4a",
                    oga: "http://jplayer.org/audio/ogg/Miaow-07-Bubble.ogg"
                });
            },
            play: function () {
                $(this).jPlayer("pauseOthers");
            },
            timeFormat: {
                padMin: false
            },
            swfPath: "js/jplayer",
            supplied: "m4a,oga",
            cssSelectorAncestor: "#audio",
            useStateClassSkin: true,
            autoBlur: false,
            smoothPlayBar: true,
            remainingDuration: true,
            keyEnabled: true,
            keyBindings: {
                loop: null,
                muted: null,
                volumeUp: null,
                volumeDown: null
            },
            wmode: "window",
            cssSelector: cssSelectorOptions,
            stateClass: stateClassOptions
        });

        $("#jquery_jplayer_audio_social_cover").jPlayer({
            ready: function () {
                $(this).jPlayer("setMedia", {
                    title: "Miaow - Bubble",
                    m4a: "http://jplayer.org/audio/m4a/Miaow-07-Bubble.m4a",
                    oga: "http://jplayer.org/audio/ogg/Miaow-07-Bubble.ogg"
                });
            },
            play: function () {
                $(this).jPlayer("pauseOthers");
            },
            timeFormat: {
                padMin: false
            },
            swfPath: "js/jplayer",
            supplied: "m4a,oga",
            cssSelectorAncestor: "#audio_social_cover",
            useStateClassSkin: true,
            autoBlur: false,
            smoothPlayBar: true,
            remainingDuration: true,
            keyEnabled: true,
            keyBindings: {
                loop: null,
                muted: null,
                volumeUp: null,
                volumeDown: null
            },
            wmode: "window",
            cssSelector: cssSelectorOptions,
            stateClass: stateClassOptions
        });

        $("#jquery_jplayer_video_1").jPlayer({
            ready: function (b) {
                var c = $(this).jPlayer("setMedia", {
                    title: "Big Buck Bunny Trailer",
                    m4v: "http://jplayer.org/video/m4v/Big_Buck_Bunny_Trailer.m4v",
                    ogv: "http://jplayer.org/video/ogv/Big_Buck_Bunny_Trailer.ogv",
                    webmv: "http://jplayer.org/video/webm/Big_Buck_Bunny_Trailer.webm",
                    poster: "http://jplayer.org/video/poster/Big_Buck_Bunny_Trailer_480x270.png"
                });
                if (b.jPlayer.status.noFullWindow) {
                    var d = $(c.jPlayer("option", "wrapper"));
                    d.find(".screen-control").hide();
                    d.find(".bar").css({
                        right: "0"
                    });
                }
                var e = function () {
                    var a = c.data("jPlayer").ancestorJq.width(),
                        b = 9 * a / 16;

                    c.jPlayer("option", "size", {
                        width: a + "px",
                        height: b + "px"
                    });

                };
                var f = $.jPlayer.platform;
                if (f.ipad || (f.iphone || (f.ipod || b.jPlayer.flash.used))) {
                    $(window).on("resize", function() {
                        e();
                    });
                    e();
                }
            },
            timeFormat: {
                padMin: false
            },
            swfPath: "js/jplayer",
            supplied: "webmv, ogv, m4v",
            cssSelectorAncestor: "#video",
            size: {
                width: "100%",
                height: "auto",
                cssClass: "video-responsive"
            },
            sizeFull: {
                cssClass: "video-full"
            },
            autohide: {
                full: false,
                restored: false
            },
            play: function () {
                //$(this).jPlayer("option", "autohide", {
                //    full: true,
                //    restored: true
                //});
                $(this).jPlayer("pauseOthers");
            },
            pause: function () {
                //$(this).jPlayer("option", "autohide", {
                //    full: false,
                //    restored: false
                //});
            },
            click: function (b) {
                $(this).jPlayer(b.jPlayer.status.paused ? "play" : "pause");
            },
            useStateClassSkin: true,
            autoBlur: false,
            smoothPlayBar: !($.jPlayer.browser.msie && $.jPlayer.browser.version < 9),
            remainingDuration: true,
            keyEnabled: true,
            cssSelector: cssSelectorOptions,
            stateClass: stateClassOptions
        });

        new jPlayerPlaylist({
            jPlayer: "#jquery_playlist_1_player",
            cssSelectorAncestor: "#jquery_playlist_1"
        }, [
            {
                title:"Cro Magnon Man",
                artist:"The Stark Palace",
                mp3:"http://www.jplayer.org/audio/mp3/TSP-01-Cro_magnon_man.mp3",
                oga:"http://www.jplayer.org/audio/ogg/TSP-01-Cro_magnon_man.ogg",
                poster: "http://www.jplayer.org/audio/poster/The_Stark_Palace_640x360.png"
            },
            {
                title:"Incredibles Teaser",
                artist:"Pixar",
                m4v: "http://www.jplayer.org/video/m4v/Incredibles_Teaser.m4v",
                ogv: "http://www.jplayer.org/video/ogv/Incredibles_Teaser.ogv",
                webmv: "http://www.jplayer.org/video/webm/Incredibles_Teaser.webm",
                poster: "http://www.jplayer.org/video/poster/Incredibles_Teaser_640x272.png"
            },{
                title:"Finding Nemo Teaser",
                artist:"Pixar",
                m4v: "http://www.jplayer.org/video/m4v/Finding_Nemo_Teaser.m4v",
                ogv: "http://www.jplayer.org/video/ogv/Finding_Nemo_Teaser.ogv",
                webmv: "http://www.jplayer.org/video/webm/Finding_Nemo_Teaser.webm",
                poster: "http://www.jplayer.org/video/poster/Finding_Nemo_Teaser_640x352.png"
            }
        ], {
            playlistOptions: {
                enableRemoveControls: false
            },
            swfPath: "js/jplayer",
            supplied: "webmv, ogv, m4v, oga, mp3",
            useStateClassSkin: true,
            autoBlur: false,
            smoothPlayBar: true,
            keyEnabled: true,
            audioFullScreen: true,
            size: {
                width: "100%",
                height: "auto",
                cssClass: "video-responsive"
            },
            sizeFull: {
                cssClass: "video-full"
            },
            cssSelector: cssSelectorOptions,
            stateClass: stateClassOptions
        });

        new jPlayerPlaylist({
            jPlayer: "#jquery_playlist_2_player",
            cssSelectorAncestor: "#jquery_playlist_2"
        }, [
            {
                title:"Cro Magnon Man",
                mp3:"http://www.jplayer.org/audio/mp3/TSP-01-Cro_magnon_man.mp3",
                oga:"http://www.jplayer.org/audio/ogg/TSP-01-Cro_magnon_man.ogg"
            },
            {
                title:"Your Face",
                mp3:"http://www.jplayer.org/audio/mp3/TSP-05-Your_face.mp3",
                oga:"http://www.jplayer.org/audio/ogg/TSP-05-Your_face.ogg"
            },
            {
                title:"Cyber Sonnet",
                mp3:"http://www.jplayer.org/audio/mp3/TSP-07-Cybersonnet.mp3",
                oga:"http://www.jplayer.org/audio/ogg/TSP-07-Cybersonnet.ogg"
            },
            {
                title:"Tempered Song",
                mp3:"http://www.jplayer.org/audio/mp3/Miaow-01-Tempered-song.mp3",
                oga:"http://www.jplayer.org/audio/ogg/Miaow-01-Tempered-song.ogg"
            },
            {
                title:"Hidden",
                mp3:"http://www.jplayer.org/audio/mp3/Miaow-02-Hidden.mp3",
                oga:"http://www.jplayer.org/audio/ogg/Miaow-02-Hidden.ogg"
            },
            {
                title:"Lentement",
                mp3:"http://www.jplayer.org/audio/mp3/Miaow-03-Lentement.mp3",
                oga:"http://www.jplayer.org/audio/ogg/Miaow-03-Lentement.ogg"
            },
            {
                title:"Lismore",
                mp3:"http://www.jplayer.org/audio/mp3/Miaow-04-Lismore.mp3",
                oga:"http://www.jplayer.org/audio/ogg/Miaow-04-Lismore.ogg"
            },
            {
                title:"The Separation",
                mp3:"http://www.jplayer.org/audio/mp3/Miaow-05-The-separation.mp3",
                oga:"http://www.jplayer.org/audio/ogg/Miaow-05-The-separation.ogg"
            },
            {
                title:"Beside Me",
                mp3:"http://www.jplayer.org/audio/mp3/Miaow-06-Beside-me.mp3",
                oga:"http://www.jplayer.org/audio/ogg/Miaow-06-Beside-me.ogg"
            },
            {
                title:"Bubble",
                mp3:"http://www.jplayer.org/audio/mp3/Miaow-07-Bubble.mp3",
                oga:"http://www.jplayer.org/audio/ogg/Miaow-07-Bubble.ogg"
            },
            {
                title:"Stirring of a Fool",
                mp3:"http://www.jplayer.org/audio/mp3/Miaow-08-Stirring-of-a-fool.mp3",
                oga:"http://www.jplayer.org/audio/ogg/Miaow-08-Stirring-of-a-fool.ogg"
            },
            {
                title:"Partir",
                mp3:"http://www.jplayer.org/audio/mp3/Miaow-09-Partir.mp3",
                oga:"http://www.jplayer.org/audio/ogg/Miaow-09-Partir.ogg"
            },
            {
                title:"Thin Ice",
                mp3:"http://www.jplayer.org/audio/mp3/Miaow-10-Thin-ice.mp3",
                oga:"http://www.jplayer.org/audio/ogg/Miaow-10-Thin-ice.ogg"
            }
        ], {
            playlistOptions: {
                enableRemoveControls: false
            },
            swfPath: "js/jplayer",
            supplied: "oga, mp3",
            useStateClassSkin: true,
            autoBlur: false,
            smoothPlayBar: true,
            keyEnabled: true,
            cssSelector: cssSelectorOptions,
            stateClass: stateClassOptions
        });

    });

})(jQuery);
/*!
 *  3.6.3
 * Author: mosaicpro
 * Licence: http://themeforest.net/licenses
 * Copyright 2015
 */

(function ($) {
    "use strict";

    $(window).bind('enterBreakpoint480', function () {
        $('.chat-window-container .panel:not(:last)').remove();
        $('.chat-window-container .panel').attr('id', 'chat-0001');
    });

    $(window).bind('enterBreakpoint768', function () {
        if ($('.chat-window-container .panel').length == 3) {
            $('.chat-window-container .panel:first').remove();
            $('.chat-window-container .panel:first').attr('id', 'chat-0001');
            $('.chat-window-container .panel:last').attr('id', 'chat-0002');
        }
    });

})(jQuery);
(function ($) {

    // match anything
    $.expr[ ":" ].containsNoCase = function (el, i, m) {
        var search = m[ 3 ];
        if (! search) return false;
        return new RegExp(search, "i").test($(el).text());
    };

    // Search Filter
    function searchFilterCallBack($data, $opt) {
        var search = $data instanceof jQuery ? $data.val() : $(this).val(),
            opt = typeof $opt == 'undefined' ? $data.data.opt : $opt;

        var $target = $(opt.targetSelector);
        $target.show();

        if (search && search.length >= opt.charCount) {
            $target.not(":containsNoCase(" + search + ")").hide();
        }
    }

    // input filter
    $.fn.searchFilter = function (options) {
        var opt = $.extend({
            // target selector
            targetSelector: "",
            // number of characters before search is applied
            charCount: 1
        }, options);

        return this.each(function () {
            var $el = $(this);
            $el.off("keyup", searchFilterCallBack);
            $el.on("keyup", null, {opt: opt}, searchFilterCallBack);
        });

    };

    // Filter by All/Online/Offline
    $(".chat-filter a").on('click', function (e) {

        e.preventDefault();
        $('.chat-contacts li').hide();
        $('.chat-contacts').find($(this).data('target')).show();

        $(".chat-filter li").removeClass('active');
        $(this).parent().addClass('active');

        $(".chat-search input").searchFilter({targetSelector: ".chat-contacts " + $(this).data('target')});

        // Filter Contacts by Search and Tabs
        searchFilterCallBack($(".chat-search input"), {
            targetSelector: ".chat-contacts " + $(this).data('target'),
            charCount: 1
        });
    });

    // Trigger Search Filter
    $(".chat-search input").searchFilter({targetSelector: ".chat-contacts li"});

})(jQuery);

(function ($) {
    "use strict";

    var container = $('.chat-window-container');

    // Click User
    $(".chat-contacts li").on('click', function () {

        if ($('.chat-window-container [data-user-id="' + $(this).data('userId') + '"]').length) return;

        // If user is offline do nothing
        if ($(this).attr('class') === 'offline') return;

        var source = $("#chat-window-template").html();
        var template = Handlebars.compile(source);

        var context = {user_image: $(this).find('img').attr('src'), user: $(this).find('.contact-name').text()};
        var html = template(context);

        var clone = $(html);

        clone.attr("data-user-id", $(this).data("userId"));

        container.find('.panel:not([id^="chat"])').remove();

        var count = container.find('.panel').length;

        count ++;
        var limit = $(window).width() > 768 ? 3 : 1;
        if (count >= limit) {
            container.find('#chat-000'+ limit).remove();
            count = limit;
        }

        clone.attr('id', 'chat-000' + parseInt(count));
        container.append(clone).show();

        clone.show();
        clone.find('> .panel-body').removeClass('display-none');
        clone.find('> input').removeClass('display-none');
    });

    // Change ID by No. of Windows
    function chatLayout() {
        container.find('.panel').each(function (index, value) {
            $(this).attr('id', 'chat-000' + parseInt(index + 1));
        });
    }

    // remove window
    $("body").on('click', ".chat-window-container .close", function () {
        $(this).parent().parent().remove();
        chatLayout();
        if ($(window).width() < 768) $('.chat-window-container').hide();
    });

    // Chat heading collapse window
    $('body').on('click', '.chat-window-container .panel-heading', function (e) {
        e.preventDefault();
        $(this).parent().find('> .panel-body').toggleClass('display-none');
        $(this).parent().find('> input').toggleClass('display-none');
    });

})(jQuery);

/*!
 *  3.6.3
 * Author: mosaicpro
 * Licence: http://themeforest.net/licenses
 * Copyright 2015
 */

(function ($) {
    "use strict";

    $('.share textarea').on('keyup', function () {
        $(".share button")[ $(this).val() === '' ? 'hide' : 'show' ]();
    });

    if (! $("#scroll-spy").length) return;

    var offset = $("#scroll-spy").offset().top;

    $('body').scrollspy({target: '#scroll-spy', offset: offset});

})(jQuery);
