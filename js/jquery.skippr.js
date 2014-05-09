(function () {    

    var Skippr = (function () {

        function Skippr(element, options) {
        	var _ = this;
            
            _.settings = $.extend($.fn.skippr.defaults, options);
            _.$element = $(element);
            _.$photos = _.$element.children();
			_.count = _.$photos.length;

			_.init();
            
        }

        Skippr.prototype.init = function() {

        	var _ = this;
        	_.setup();
        	_.navClick();

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
                next;

            previous = '<nav class="skippr-arrow skippr-previous"></nav>';
            next = '<nav class="skippr-arrow skippr-next"></nav>';

            _.$element.append(previous + next);
        };

        Skippr.prototype.arrowClick = function() {
            //TODO: complete arrow click functionality.
            var _ = this;


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
        		var item = $(this).attr('data-slider'),
        			currentItem = $(".skippr-nav-element-active").attr('data-slider');

        		if(item != currentItem) { //prevents animation for repeat click.
        			_.$photos.eq(item - 1).css('z-index', '10').siblings('div').css('z-index', '9');
        			
        			_.$photos.eq(item - 1).fadeIn(_.settings.speed, function() {
        				$(".visible").fadeOut('fast',function(){
        					$(this).removeClass('visible');
        					_.$photos.eq(item - 1).addClass('visible');
        				});
        			});
        			$(this).addClass('skippr-nav-element-active').siblings().removeClass('skippr-nav-element-active');
        		}
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
        arrows: true
       
    };

    $(function () {
        return new Skippr($('[data-skippr]'));
    }); 

}).call(this);



