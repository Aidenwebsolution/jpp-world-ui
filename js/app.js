// JavaScript Document
var firstapp = angular.module('firstapp', [
    'ui.router',
    'phonecatControllers',
    'templateservicemod',
    'navigationservice',
    'pascalprecht.translate'
]);

firstapp.run(['$rootScope', '$window',
    function($rootScope, $window) {

        $window.fbAsyncInit = function() {
            FB.init({
                appId: '655719224579290',
                status: true,
                cookie: true,
                xfbml: true
            });
            // FB.ui({
            //     method: 'send',
            //     link: 'http://www.nytimes.com/interactive/2015/04/15/travel/europe-favorite-streets.html',
            // });
        };

        (function(d) {
            // load the Facebook javascript SDK

            var js,
                id = 'facebook-jssdk',
                ref = d.getElementsByTagName('script')[0];

            if (d.getElementById(id)) {
                return;
            }

            js = d.createElement('script');
            js.id = id;
            js.async = true;
            js.src = "//connect.facebook.net/en_US/all.js";

            ref.parentNode.insertBefore(js, ref);

        }(document));

    }
]);

firstapp.config(function($stateProvider, $urlRouterProvider, $httpProvider, $locationProvider) {
    // for http request with session
    $httpProvider.defaults.withCredentials = true;

    $stateProvider
        .state('home', {
            url: "/",
            templateUrl: "views/template.html",
            controller: 'Home1Ctrl'
        })

    .state('home1', {
            url: "/home1",
            templateUrl: "views/template.html",
            controller: 'HomeCtrl'
        })
        .state('comingsoon', {
            url: "/comingsoon",
            templateUrl: "views/template.html",
            controller: 'ComingSoonCtrl'
        })

    .state('panthers-den', {
            url: "/panthers-den",
            templateUrl: "views/template.html",
            controller: 'DenCtrl'
        })
        .state('panther-army', {
            url: "/panther-army/:level",
            templateUrl: "views/template.html",
            controller: 'ArmyCtrl'
        })

    .state('ultimate-panther', {
            url: "/ultimate-panther",
            templateUrl: "views/template.html",
            controller: 'UltimateCtrl'
        })
        // .state('auction', {
        //     url: "/auction",
        //     templateUrl: "views/template.html",
        //     controller: 'AuctionCtrl'
        // })
        .state('jpp-survey', {
            url: "/jpp-survey",
            templateUrl: "views/template.html",
            controller: 'SurveyCtrl'
        })

    .state('games', {
        url: "/games",
        templateUrl: "views/template.html",
        controller: 'GamesCtrl'
    })

    .state('news-updates', {
        url: "/news-updates",
        templateUrl: "views/template.html",
        controller: 'NewsCtrl'
    })

    .state('gallery', {
        url: "/gallery",
        templateUrl: "views/template.html",
        controller: 'GalleryCtrl'
    })

    .state('panther-room', {
        url: "/panther-room",
        templateUrl: "views/template.html",
        controller: 'RoomCtrl'
    });

    if (isproduction) {
        $locationProvider.html5Mode(true);
    }

    $urlRouterProvider.otherwise("/");

});


firstapp.directive('img', function($compile, $parse) {
    return {
        restrict: 'E',
        replace: false,
        link: function($scope, element, attrs) {
            var $element = $(element);
            if (!attrs.noloading) {
                $element.after("<img src='img/loading.gif' class='loading' />");
                var $loading = $element.next(".loading");
                $element.load(function() {
                    $loading.remove();
                    $(this).addClass("doneLoading");
                });
            } else {
                $($element).addClass("doneLoading");
            }
        }
    };
});
firstapp.directive('onlyDigits', function() {
    return {
        require: 'ngModel',
        link: function(scope, element, attr, ngModelCtrl) {
            function fromUser(text) {
                if (text) {
                    var transformedInput = text.replace(/[^0-9]/g, '');

                    if (transformedInput !== text) {
                        ngModelCtrl.$setViewValue(transformedInput);
                        ngModelCtrl.$render();
                    }
                    return transformedInput;
                }
                return undefined;
            }
            ngModelCtrl.$parsers.push(fromUser);
        }
    };
});

firstapp.directive('fancyboxBox', function($document) {
    return {
        restrict: 'EA',
        replace: false,
        link: function(scope, element, attr) {
            var $element = $(element);
            var target;
            if (attr.rel) {
                target = $("[rel='" + attr.rel + "']");
            } else {
                target = element;
            }

            target.fancybox({
                openEffect: 'fade',
                closeEffect: 'fade',
                closeBtn: true,
                helpers: {
                    media: {}
                }
            });
        }
    };
});

firstapp.config(function($translateProvider) {
    $translateProvider.translations('en', LanguageEnglish);
    $translateProvider.translations('hi', LanguageHindi);
    $translateProvider.preferredLanguage('en');
});
