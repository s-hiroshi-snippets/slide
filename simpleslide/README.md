simpleslide
===========

simple slides javascript

Usage
----------
1. index.html Read jQuery and slide.js in header. 
```html
    <header>
        <script src="js/jquery-1.7.2.min.js"></script>
        <script src="js/slide.js"></script>
    </header>
```

2. index.html read stylesheet in header.
```html
    <link rel="stylesheet" type="text/css" href="css/style.css">
```

3. Markup slide in body  
most simple markup example.
```html
    <div class="slide">
        <div class="view">
            <div class="item active"><img src="sample1.jpg" alt="slide1, photo1"></div>
            <div class="item"><img src="sample2.jpg" alt="slide1, photo2"></div>
            <div class="item"><img src="sample3.jpg" alt="slide1, photo3"></div>
        </div><!-- /view -->
        <div class="nav">
            <div class="item"><span>1</span></div>
            <div class="item"><span>2</span></div>
            <div class="item"><span>3</span></div>
        </div><!-- /nav -->
    </div><!-- /slide -->
```

4. Execute slide()
execute slide method
```html
    <head>
        <script>
            jQuery(function($) {
                $('.slide').slide();
            });
        </script>
    </head>
```
