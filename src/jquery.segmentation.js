(function( $ ){
    $.fn.segment = function(params, timeout, animate){
        var countX = 1;
        var countY = 1;
        var reverse = false;
        if( typeof params === 'number' ){
          countX = params;
        }else if ( Array.isArray(params) ){
          countX = params[0];
          countY = params[1];
        }else if( typeof params === 'object' ){
          if(params['x'] != undefined) countX = params['x'];
          if(params['y'] != undefined) countY = params['y'];
          if(params['reverse'] != undefined) reverse = params['reverse'];
          //if(params[''] != undefined) = params['']; 
        }
        var height = $(this).height();
        var width  = $(this).width();

        var segmentWidth = width / countX;
        var segmentHeight = height / countY;
        
        var elements = [];
        for(j = 0; j < countY; j++){
          for(i = 0; i < countX; i++){  
            var e = document.createElement('div');
            $(e).css('z-index', '100');
            $(e).css('float', 'left');
            $(e).css('background', $(this).css('background'));
            
            var left = (width - i * segmentWidth);
            var top = (height - j * segmentHeight);
            
            $(e).css('background-position', left + 'px ' + top + 'px');
            $(e).css('height', segmentHeight + 'px');
            $(e).css('width',  segmentWidth  + 'px');
            
            var position = {
                top: $(this).position().top + j * segmentHeight,
                left: $(this).position().left + i * segmentWidth
            };
            $(e).css('position', 'absolute');
            $(e).css(position);
            
            $(e).addClass('segment');
            $(e).appendTo( $(this) );
           
            elements.push(e);
          }
        }
        
        $(this).css('overflow', 'show');
        $(this).css('background', 'none');
        
        
        $.each( ( (!reverse) ? elements : elements.reverse() ) , function(k, v){
            setTimeout(function(){
                animate(v);
            }, timeout * k);
        });
    };
})( jQuery );