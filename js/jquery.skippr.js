(function () {    

    var Skippr = (function () {

        function Skippr(element, options) {

        	var _ = this,
                timer;
            
            _.settings = $.extend($.fn.skippr.defaults, options);
            _.$element = $(element);
            _.$parent = _.$element.parent();
            _.$photos = _.$element.children();
			_.count = _.$photos.length;
            _.countString = String(_.count);
			_.init();
    
        }

        Skippr.prototype.init = function() {

        	var _ = this;

        	_.setup();
        	_.navClick();
            _.arrowClick();

            if(_.settings.autoPlay == true) {
                _.autoPlay();
                _.autoPlayPause();
            }


        }

        Skippr.prototype.setup = function() {

        	var _ = this;
                
            if (_.settings.childrenElementType == 'img') {
                var makeDivs = [];

                for (i = 0; i < _.count; i++) {
                    var src = _.$photos.eq(i).attr('src'),
                        insert = '<div style="background-image: url(' + src + ')"></div>';

                    makeDivs.push(insert);
                }
                 makeDivs.join("");
                 _.$element.append(makeDivs);
                 _.$element.find('img').remove();
                 _.$photos = _.$element.children();
            }

        	_.$photos.not(":first-child").hide();
        	_.$photos.eq(0).addClass('visible');
        	_.$element.addClass('skippr');
        	_.navBuild();
            if(_.settings.arrows == true) {
                _.arrowBuild();
            }

        };

        Skippr.prototype.arrowBuild = function() {

            var _ = this,
                previous,
                next,
                startingPrevious = _.count; // what will be the first previous slide?

            previous = '<nav class="skippr-arrow skippr-previous" data-slider="' + startingPrevious + '"></nav>';
            next = '<nav class="skippr-arrow skippr-next" data-slider="2"></nav>';

            _.$element.append(previous + next);

        };

        Skippr.prototype.arrowClick = function() {
            
            var _ = this;
            
            $(".skippr-arrow").click(function(){

                _.change($(this));

            });

        };

        Skippr.prototype.navBuild = function() {

        	var _ = this,
        		container,
        		navElements = [];
            if (_.settings.navType == "block") {
                var styleClass = "skippr-nav-element-block";
            } else if(_.settings.navType == "bubble") {
               var styleClass = "skippr-nav-element-bubble"; 
            }

        	for (var i = 0; i < _.count; i++) { 
        		//cycle through slideshow divs and display correct number of bubbles.
        		var insert;

        		if (i == 0) {
        			//check if first bubble, add respective active class.
        	 		insert = "<div class='skippr-nav-element " + styleClass + " skippr-nav-element-active' data-slider='" + (i + 1) + "'></div>";
        		} else {
        			insert = "<div class='skippr-nav-element " + styleClass + "' data-slider='" + (i + 1) + "'></div>";
        		}
        		//insert bubbles into an array.
        		navElements.push(insert); 
        	};
        	//join array elements into a single string.
        	navElements = navElements.join(""); 
        	// append html to bubbles container div.
        	container = '<nav class="skippr-nav-container">' + navElements + '</nav>';

        	_.$element.append(container);

        };

        Skippr.prototype.navClick = function() {

        	var _ = this;

        	_.$element.find('.skippr-nav-element').click(function(){
                _.change($(this));
        	});

        };

        Skippr.prototype.change = function(element) {

            var _ = this,
                item = element.attr('data-slider'),
                currentItem = $(".skippr-nav-element-active").attr('data-slider'),
                nextData = $(".skippr-next").attr('data-slider'),
                previousData = $(".skippr-previous").attr('data-slider');

            if(item != currentItem) { //prevents animation for repeat click.

                _.$photos.eq(item - 1).css('z-index', '10').siblings('div').css('z-index', '9');
                
                _.$photos.eq(item - 1).fadeIn(_.settings.speed, function() {
                    $(".visible").fadeOut('fast',function(){
                        $(this).removeClass('visible');
                        _.$photos.eq(item - 1).addClass('visible');
                    });
                }); 

                $(".skippr-nav-element").eq(item - 1).addClass('skippr-nav-element-active').siblings().removeClass('skippr-nav-element-active');
                
                var nextDataAddString = Number(item) + 1,
                    previousDataAddString = Number(item) - 1;

                if ( item == _.count ){ 
                    $(".skippr-next").attr('data-slider', '1' );
                } else {
                    $(".skippr-next").attr('data-slider', nextDataAddString );
                }
                
                if (item == 1) {
                    $(".skippr-previous").attr('data-slider', _.countString );
                }  else {
                   $(".skippr-previous").attr('data-slider', previousDataAddString ); 
                }

            }

        };

        Skippr.prototype.autoPlay = function() {

            var _ = this;

            timer = setInterval(function(){
                var activeElement = $(".skippr-nav-element-active"),
                    activeSlide = activeElement.attr('data-slider');

                if( activeSlide == _.count ) {
                  var elementToInsert = $(".skippr-nav-element").eq(0); 
                } else {
                    var elementToInsert = activeElement.next();
                }

                _.change(elementToInsert);
                    
            },_.settings.autoPlayDuration);

        

        };

        Skippr.prototype.autoPlayPause = function() {

            var _ = this;

            _.$parent.hover(function(){
                clearInterval(timer);
            }, function() {
                _.autoPlay();
            });

        };

        return Skippr;

    })();

    $.fn.skippr = function (options) {
        var instance;
        instance = this.data('skippr');
        if (!instance) {
            return this.each(function () {
                return $(this).data('skippr', new Skippr(this,options));
            });
        }
        if (options === true) return instance;
        if ($.type(options) === 'string') instance[options]();
        return this;
    };

    $.fn.skippr.defaults = {
        
        speed: 500,
        navType: 'block',
        childrenElementType : 'div',
        arrows: true,
        autoPlay: false,
        autoPlayDuration: 5000
       
    };

    // $(function () {
    //     return new Skippr($('[data-skippr]'));
    // }); 

}).call(this);