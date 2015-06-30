'use strict';


angular.module('Yeopen')
	

	.directive('yeFadeDisplay', function(){
		return function($scope, element, attrs) {
			$scope.$watch(attrs.yeFadeDisplay,function(value){
				if (typeof value === 'undefined'){
					element.hide();
				} else if (value === true) {	
					element.slideDown();
				} else {
					element.slideUp();
				}
        	});
		}
	})
        .directive('yeToggleActive', function(){
            return function($scope, element, attrs) {
                if (Modernizr.touch){
                    element.click(function(event){
                        event.preventDefault();
                        $('.active').removeClass('active');
                        element.addClass('active');
                        return false;
                    });
                } else {
                    element.click(function(event){
                        event.preventDefault();
                        element.toggleClass('active');
                    });
                    element.focusout(function(event){
                        event.preventDefault();
                        element.toggleClass('active');
                    });
                }
            };
	})
          .directive('yeToggleMouseOut', function(){
            return function($scope, element, attrs) {
                if (Modernizr.touch){
                    element.click(function(event){
                        event.preventDefault();
                        $('.active').removeClass('active');
                        element.addClass('active');
                        return false;
                    });
                    element.focusout(function(event){
                        event.preventDefault();
                        element.removeClass('active');
                    });
                }
            };
	})
        .directive('yeToggleActiveOnlyOne', function(){
            return function($scope, element, attrs) {
                element.click(function(event){
                    event.preventDefault();
                    $('.active').removeClass('active');
                    element.addClass('active');
                    return false;
                });
            };  
        })
        .directive('yeShowOnTouch', function(){
            return function($scope, element, attrs) {
                if (Modernizr.touch){
                    element.show();
                } 
            }
        })
        .directive('yeCheckActive', function(){
            return function($scope, element, attrs) {
                element.click(function(event){
                    
                    //  if yeAddActive
                    if ( typeof $(event.target).attr( 'ye-add-active' ) != 'undefined') {
                        var activeElm = $('.active.check-active').not($(event.target).attr( 'ye-add-active' ));;
                    } else {
                        var activeElm = $('.active.check-active');
                    }

                    if ( activeElm.length > 0 ) {
                        if ( $(event.target).parents().filter('.active.check-active').length == 0 ) {
                            activeElm.removeClass('active');
                        }
                    }
                    
                });
            };
	})
        .directive('yeAddActive', function(){
            return function($scope, element, attrs) {

                var activeElement = attrs.yeAddActive ? $( attrs.yeAddActive ) : element;
                activeElement.addClass('check-active');
                
                element.click(function(event){
                    event.preventDefault();
                    activeElement.addClass('active');
                });
            };
	})
	.directive('yeEnter', function () {
	    return function (scope, element, attrs) {
	        element.bind("keydown keypress", function (event) {
	            if(event.which === 13) {
	            	scope.$apply(function (){
	                	scope.$eval(attrs.yeEnter);
	                });
	                event.preventDefault();
	            }
	        });
	    };
	})
        .directive('imageonload', function() {
            return {
                restrict: 'A',
                link: function(scope, element) {
                  element.on('load', function() {
                    // Set visibility: true + remove spinner overlay
                      element.show();
                      element.removeClass('spinner-hide');
                      element.addClass('spinner-show');
                      element.parent().find('.loading').remove();
                  });
                  scope.$watch('ngSrc', function() {
                    // Set visibility: false + inject temporary spinner overlay
                      element.hide();
                      element.addClass('spinner-hide');
                      // element.parent().append('<span class="spinner"></span>');
                  });
                }
            };
        });