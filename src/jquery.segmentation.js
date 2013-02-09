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
        
        var height = $(this).outerHeight();
        var width  = $(this).outerWidth();
        
        var sourcePosition = $(this).position();
        var sourceBackground = $(this).css('background'); 

        var segmentWidth  = parseInt(width / countX);
        var segmentHeight = parseInt(height / countY);
        
        var element = $(this).clone(); 
        
        $(this).css('overflow', 'show');
        $(this).css('background', 'none');
        $(this).html('');
        
        var elements = [];
        for(j = 0; j < countY; j++){
          for(i = 0; i < countX; i++){  
            var e = document.createElement('div');
            $(e).css('z-index', '100');
            $(e).css('float', 'left');
            $(e).css('overflow', 'hidden');
            $(e).css('height', segmentHeight + 'px');
            $(e).css('width',  segmentWidth  + 'px');
                        
            //var left = (width - i * segmentWidth);
            //var top = (height - j * segmentHeight);
            //$(e).css('background', sourceBackground);
            //$(e).css('background-position', left + 'px ' + top + 'px');
            
            $(element).clone().css({
              marginLeft: - i * segmentWidth,
              marginTop : - j * segmentHeight
            }).appendTo(e);
            
            var position = {
                top: sourcePosition.top + j * segmentHeight,
                left: sourcePosition.left + i * segmentWidth
            };
            $(e).css('position', 'absolute');
            $(e).css(position);
            
            $(e).addClass('segment');
            $(e).appendTo( $(this) );
           
            elements.push(e);
          }
        }        
        
        var removeElement = $(this);
        var remove = function(){
          removeElement.remove();
        };
        
        $.each( ( (!reverse) ? elements : elements.reverse() ) , function(k, v){
            setTimeout(function(){
                animate(v, k, elements.length, remove);
            }, timeout * k);
        });
    };
})( jQuery );