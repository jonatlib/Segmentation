(function( $ ){
    $.fn.segment = function(count, timeout, animate){
        var height = $(this).height();
        var width  = $(this).width();
        var segmentWidth = width / count;
        
        var elements = [];
        for(i = 0; i < count; i++){
            var e = document.createElement('div');
            $(e).css('z-index', '100');
            $(e).css('float', 'left');
            $(e).css('background', $(this).css('background'));
            $(e).css('height', height + 'px');
            $(e).css('width', segmentWidth + 'px');
            $(e).addClass('segment');
            $(e).appendTo( $(this) );
            elements.push(e);
        }
        
        $(this).css('overflow', 'show');
        $(this).css('background', 'none');
        
        $.each(elements, function(k, v){
            var position = {
                top: $(this).position().top,
                left: $(this).position().left + k * segmentWidth
            };
            
            $(v).css('position', 'absolute');
            $(v).css(position);
            
            setTimeout(function(){
                animate(v);
            }, timeout * k);
        });
    };
})( jQuery );