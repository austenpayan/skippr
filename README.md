skippr
======

####A fast & light jQuery plugin for creating tasteful slideshows.

###[Demo & Instructions](http://www.iamapioneer.com/plugins/skippr)

Install via bower `bower install skippr`

======
##The Setup.
Include jquery.skippr.css inside your head tag and jquery.skippr.js just before the closing body tag. Be sure to include jQuery before jquery.skippr.js
```html

<head>
    <title>Your Awesome Website</title>        
    <link rel="stylesheet" href="css/jquery.skippr.css">
</head>
<body>
        

        
    <script src="http://code.jquery.com/jquery-1.11.0.min.js"></script>
    <script src="js/jquery.skippr.js"></script>
</body>

```
Create a target element with divs inside, one for each slide, and add a background image with css or the style attribute. Skippr targets div tags inside of the selected element with background-images applied to them. Put this target element inside of a container element styled and positioned to your liking. The target element will completely fill it's parent container element.
 
**Note: The container element must have a specified width and height, and position other than static to work properly.

```html

<div id="container">
    <div id="theTarget">
        <div style="background-image: url(img/image1.jpg)"></div>
        <div style="background-image: url(img/image2.jpg)"></div>
        <div style="background-image: url(img/image3.jpg)"></div>
        <div style="background-image: url(img/image4.jpg)"></div>
        <div style="background-image: url(img/image5.jpg)"></div>
    </div>    
</div>

```
##Initiate
Just select the target element with jQuery and call the skippr method. Thats it!

```javascript

$(document).ready(function(){

    $("#theTarget").skippr();

});

```
##Options
Pass in an options object as a parameter to the skippr method for customization.

```javascript

// Defaults   
    $("#theTarget").skippr({

        transition: 'slide',
        speed: 1000,
        easing: 'easeOutQuart',
        navType: 'block',
        childrenElementType: 'div',
        arrows: true,
        autoPlay: false,
        autoPlayDuration: 5000,
        keyboardOnAlways: true,
        hidePrevious: false

    });

```

| Property Name | Type | Values | Description | Default |
|---------------|------|---------|-------------|--------|
| transition   | string  | fade,slide | Specify the type of transition you want your slideshow to perform. Currently, Skippr accepts either 'fade' or 'slide'. The Slide transitions are acccelerated using velocity.js by Julian Shapiro.| slide |
| speed          | int | any int | Enter length of time in milliseconds you want the transition between slides to take. | 500 |
| easing       | string | jQuery UI easing values  | enter the camelCase name of the easing property you want to use with slide transitions. All jquery UI easing properties are accepted. | easeOutQuart |
| navType     |  string | block, bubble | Enter a string of what shape you want the navigation elements to be. Skippr currently takes either "block" or "bubble". | block |
| childrenElementType |    string  |  div, img   | choose the children element type of the target element.      |      div    |           
|    arrows         |  bool        |  true,false     |  boolean value determining whether or not to display navigation arrows.        |  true    |
|  autoPlay           |  bool        | true,false      |   boolean value determining whether or not to use auto-playing functionality in the slideshow.       |   false        |
|  autoPlayDuration  |  int        |  any int     |   sets the amount of time in milliseconds to display each slide when autoPlay is running.       |   5000        |
|  keyboardOnAlways    |   bool       |  true,false     |  boolean value determining whether to enable keyboard arrow keys to work at all times OR only when the skippr slidehow is being hovered over.     |   true   |
|  hidePrevious    |   bool       |  true,false      |   boolean value determining whether or not to hide previous arrow when first slide is showing.       |   false   |













