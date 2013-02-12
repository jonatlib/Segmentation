(function( $ ){
    
    function getParams(params, value, def){
        if(params[value] == undefined) return def;
        return params[value];
    }
    
    $.fn.segment = function(params){
        if($(this).length > 1){
            var result = [];
            $.each($(this), function(k, v){
                result.push( $(v).segment(params, timeout, animate) );
            });
            return result;
        }
        
        var height = $(this).outerHeight();
        var width  = $(this).outerWidth();
        
        var countX = getParams(params, 'x', width / getParams(params, 'size', 100));
        var countY = getParams(params, 'y', height / getParams(params, 'size', 100));
        var reverse = getParams(params, 'reverse', false);
        
        var sourcePosition = $(this).position();

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
        
        var getter = getParams(params, 'getter', function(elements){
            if(reverse){
                return elements.reverse();
            }else{
                return elements;
            }
        });
        
        var itterator = getParams(params, 'itterator', function(elements, index){
            return elements[index];
        });
        
        var animate = getParams(params, 'animate', function( el ){
            $(el).fadeOut(getParams(params, 'duration', 800), function(){
                $(el).remove();
                if(index >= length - 1) remove();
            });
        });
        var timeout = getParams(params, 'timeout', 50);
        
        var el = getter(elements);
        $.each(el , function(k, v){
            setTimeout(function(){
                animate(itterator(el, k), k, elements.length, remove);
            }, timeout * k);
        });
        
        var done = getParams(params, 'done', function(r){
            r();
        });
        
        setTimeout(function(){
            done(remove);
        }, timeout * elements.length + getParams(params, 'duration', 800));
        
        return this;
    };
})( jQuery );