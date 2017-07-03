// JavaScript Document
var firstapp = angular.module('firstapp', [
    'ui.router',
    'phonecatControllers',
    'templateservicemod',
    'navigationservice',
    'pascalprecht.translate'
]);

firstapp.run(['$rootScope', '$window',
    function ($rootScope, $window) {

        $window.fbAsyncInit = function () {
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

        (function (d) {
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

firstapp.config(function ($stateProvider, $urlRouterProvider, $httpProvider, $locationProvider) {
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
        // .state('ComingSoooon', {
        //     url: "/comingsoon",
        //     templateUrl: "views/template.html",
        //     controller: 'ComingSooonCtrl'
        // })
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

    .state('crossword', {
        url: "/crossword",
        templateUrl: "views/template.html",
        controller: 'CrosswordCtrl'
    })

    .state('rapid', {
        url: "/rapid-fire",
        templateUrl: "views/template.html",
        controller: 'RapidCtrl'
    })


    .state('rapid-play', {
        url: "/rapid-fire-play/:id",
        templateUrl: "views/template.html",
        controller: 'RapidPlayCtrl'
    })

    .state('rapid-score', {
            url: "/rapid-fire-score/:id",
            templateUrl: "views/template.html",
            controller: 'RapidScoreCtrl'
        })
        .state('match', {
            url: "/match",
            templateUrl: "views/template.html",
            controller: 'MatchCtrl'
        })


    .state('guess', {
        url: "/guess",
        templateUrl: "views/template.html",
        controller: 'GuessCtrl'
    })
    .state('guess-who', {
        url: "/guess-who",
        templateUrl: "views/template.html",
        controller: 'GuessCtrl'
    })
    .state('guess-play', {
        url: "/guess-play/:id",
        templateUrl: "views/template.html",
        controller: 'GuessPlayCtrl'
    })

    .state('guess-score', {
            url: "/guess-score/:id",
            templateUrl: "views/template.html",
            controller: 'GuessScoreCtrl'
        })
    
    
    .state('match-panthers', {
        url: "/match-panthers",
        templateUrl: "views/template.html",
        controller: 'MatchCtrl'
    })
    .state('match-play', {
        url: "/match-play/:id",
        templateUrl: "views/template.html",
        controller: 'MatchPlayCtrl'
    })

    .state('match-score', {
            url: "/match-score/:id",
            templateUrl: "views/template.html",
            controller: 'MatchScoreCtrl'
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


firstapp.directive('img', function ($compile, $parse) {
    return {
        restrict: 'E',
        replace: false,
        link: function ($scope, element, attrs) {
            var $element = $(element);
            if (!attrs.noloading) {
                $element.after("<img src='img/loading.gif' class='loading' />");
                var $loading = $element.next(".loading");
                $element.load(function () {
                    $loading.remove();
                    $(this).addClass("doneLoading");
                });
            } else {
                $($element).addClass("doneLoading");
            }
        }
    };
});
firstapp.directive('onlyDigits', function () {
    return {
        require: 'ngModel',
        link: function (scope, element, attr, ngModelCtrl) {
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
firstapp.directive("focus", function() {
    return {
        restrict: "A",
        link: function($scope, element) {
            element.on("input", function(e) {
                if(element.val().length == element.attr("maxlength")) {
                    var $nextElement = element.next();
                    if($nextElement.length) {
                        $nextElement[0].focus();
                    }
                }
            });
        }
    }
});
firstapp.filter('serverimage1', function () {
    return function (input) {
        if (input) {
            return tempimgurl + input;
        } else {
            return "";
        }
    };
});

firstapp.directive('fancyboxBox', function ($document) {
    return {
        restrict: 'EA',
        replace: false,
        link: function (scope, element, attr) {
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

firstapp.filter('hindimonth', function () {
    return function (date, onlymonth) {
        date = new Date(date);
        var onlyday = date.getDate();
        var onlyyear = date.getFullYear();
        var day = "";
        var dayname = "";
        if (date) {
            if (onlymonth) {

                switch (date.getMonth()) {
                    case 0:
                        day = "जनवरी";
                        break;
                    case 1:
                        day = "फरवरी";
                        break;
                    case 2:
                        day = "मार्च";
                        break;
                    case 3:
                        day = "अप्रैल";
                        break;
                    case 4:
                        day = "मई";
                        break;
                    case 5:
                        day = "जून";
                        break;
                    case 6:
                        day = "जुलाई";
                        break;
                    case 7:
                        day = "अगस्त";
                        break;
                    case 8:
                        day = "सितम्बर";
                        break;
                    case 9:
                        day = "अक्टूबर";
                        break;
                    case 10:
                        day = "नवंबर";
                        break;
                    case 11:
                        day = "दिसंबर";
                        break;
                };
                return onlyday + " " + day + " " + onlyyear;
            } else {
                switch (date.getMonth()) {
                    case 0:
                        day = "जनवरी";
                        break;
                    case 1:
                        day = "फरवरी";
                        break;
                    case 2:
                        day = "मार्च";
                        break;
                    case 3:
                        day = "अप्रैल";
                        break;
                    case 4:
                        day = "मई";
                        break;
                    case 5:
                        day = "जून";
                        break;
                    case 6:
                        day = "जुलाई";
                        break;
                    case 7:
                        day = "अगस्त";
                        break;
                    case 8:
                        day = "सितम्बर";
                        break;
                    case 9:
                        day = "अक्टूबर";
                        break;
                    case 10:
                        day = "नवंबर";
                        break;
                    case 11:
                        day = "दिसंबर";
                        break;
                };
                switch (date.getDay()) {
                    case 0:
                        dayname = "रविवार";
                        break;
                    case 1:
                        dayname = "सोमवार";
                        break;
                    case 2:
                        dayname = "मंगलवर";
                        break;
                    case 3:
                        dayname = "बुधवार";
                        break;
                    case 4:
                        dayname = "गुरुवार";
                        break;

                    case 5:
                        dayname = "शुक्रवार";
                        break;
                    case 6:
                        dayname = "शनिवार";
                        break;
                };
                return dayname + " " + onlyday + " " + day + " " + onlyyear;

            }
        }
    };
});


firstapp.config(function ($translateProvider) {
    $translateProvider.translations('en', LanguageEnglish);
    $translateProvider.translations('hi', LanguageHindi);
    $translateProvider.preferredLanguage('en');
});
