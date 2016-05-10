// JavaScript Document
var firstapp = angular.module('firstapp', [
  'ui.router',
  'phonecatControllers',
  'templateservicemod',
  'navigationservice'
]);

firstapp.config(function($stateProvider, $urlRouterProvider, $httpProvider, $locationProvider) {
  // for http request with session
  $httpProvider.defaults.withCredentials = true;

      $stateProvider
          .state('home', {
              url: "/home",
              templateUrl: "views/template.html",
              controller: 'HomeCtrl'
          })

          .state('jpp-tv', {
              url: "/jpp-tv",
              templateUrl: "views/template.html",
              controller: 'JPPTVCtrl'
          })

      .state('panthers-den', {
          url: "/panthers-den",
          templateUrl: "views/template.html",
          controller: 'DenCtrl'
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

      if(isproduction)
     {
       $locationProvider.html5Mode(true);
     }

     $urlRouterProvider.otherwise("/home");

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

//
// firstapp.config(function ($translateProvider) {
//   $translateProvider.translations('en', LanguageEnglish);
//   $translateProvider.translations('hi', LanguageHindi);
//   $translateProvider.preferredLanguage('en');
// });
