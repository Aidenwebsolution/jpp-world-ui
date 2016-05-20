angular.module('phonecatControllers', ['templateservicemod', 'navigationservice', 'ui.bootstrap', 'ngAnimate', 'ngSanitize', 'angular-flexslider'])

.controller('Home1Ctrl', function($scope, TemplateService, NavigationService, $timeout) {
    //Used to name the .html file

    console.log("108");

    $scope.template = TemplateService.changecontent("home1");
    $scope.menutitle = NavigationService.makeactive("HOME");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();
    TemplateService.header = "";
    $scope.facebookLogin = function() {
        window.location.href = "http://jppworld.in:1337/user/loginFacebook";
    };
    $scope.twitterLogin = function() {
        window.location.href = "http://jppworld.in:1337/user/loginTwitter";
    };
})

.controller('HomeCtrl', function($scope, TemplateService, NavigationService, $timeout) {
    //Used to name the .html file

    console.log("Testing Consoles");

    $scope.template = TemplateService.changecontent("home");
    $scope.menutitle = NavigationService.makeactive("HOME");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();

})

.controller('JPPTVCtrl', function($scope, TemplateService, NavigationService, $timeout) {
    //Used to name the .html file

    console.log("Testing Consoles");

    $scope.template = TemplateService.changecontent("jpp-tv");
    $scope.menutitle = NavigationService.makeactive("JPP 'TV'");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();
})

.controller('DenCtrl', function($scope, TemplateService, NavigationService, $timeout) {
    //Used to name the .html file
    $scope.template = TemplateService.changecontent("panthers-den");
    $scope.menutitle = NavigationService.makeactive("THE PANTHER DEN");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();


})

.controller('GamesCtrl', function($scope, TemplateService, NavigationService, $timeout) {
        //Used to name the .html file

        console.log("Testing Consoles");

        $scope.template = TemplateService.changecontent("games");
        $scope.menutitle = NavigationService.makeactive("GAMES");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
    })
    .controller('NewsCtrl', function($scope, TemplateService, NavigationService, $timeout) {
        //Used to name the .html file

        console.log("Testing Consoles");

        $scope.template = TemplateService.changecontent("news-updates");
        $scope.menutitle = NavigationService.makeactive("NEWS & UPDATES");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
    })

.controller('GalleryCtrl', function($scope, TemplateService, NavigationService, $timeout) {
        //Used to name the .html file

        console.log("Testing Consoles");

        $scope.template = TemplateService.changecontent("gallery");
        $scope.menutitle = NavigationService.makeactive("GALLERY");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();

    })
    .controller('RoomCtrl', function($scope, TemplateService, NavigationService, $timeout) {
        //Used to name the .html file

        console.log("Testing Consoles");

        $scope.template = TemplateService.changecontent("panther-room");
        $scope.menutitle = NavigationService.makeactive("PANTHER ROOM");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
    })




.controller('ArmyCtrl', function($scope, TemplateService, NavigationService, $timeout, $uibModal, $state) {
  console.log("In army ctrl ");
  // GET ALL FACEBOOK DETAILS
  NavigationService.getFacebookDetails(function(data) {
      console.log("heyy");
      console.log(data);
      $scope.obj = JSON.parse(data.data);
      console.log(  $scope.obj);
      _($scope.obj.data).forEach(function(value) {
    console.log(value);
  });
  });
        //Used to name the .html file
        $scope.pageShow = 1;
        $scope.goToPage = function(page, option) {
            $scope.pageShow = page;
        };
        $scope.submitAnswer = function(option) {
            console.log("In ans");
            console.log(option);
            $scope.option = option;
            NavigationService.storeAnswer($scope.option, function(data) {
                console.log(data);
                if (data.value !== true && data.data !== "Logout Successful") {
                    // $.jStorage.set("user",data);
                    $scope.name = data.name;
                    $scope.profileimage = data.profilePic;
                    $scope.accesstoken = data.K120K200;
                } else {
                    $state.go('home');
                }

            });
        };
        console.log("Testing Consoles");
        $scope.registershow = true;
        console.log("Testing Consoles");
        $scope.toggleForms = function(choice) {
            $scope.registershow = false;
            $scope.friendsshow = false;
            $scope.challengeshow = false;
            if (choice == 'register') {
                $scope.registershow = true;
            } else if (choice == 'friends') {
                $scope.friendsshow = true;
            } else {
                $scope.challengeshow = true;
            }
        };
        $scope.template = TemplateService.changecontent("panther-army");
        $scope.menutitle = NavigationService.makeactive("Panther Army");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();

        // $scope.section1 = true;
        // $scope.section2 = false;
        // $scope.section3 = false;
        $scope.openfrnds = function() {
            $uibModal.open({
                animation: $scope.animationsEnabled,
                templateUrl: 'views/modal/select-army.html',
                controller: 'ArmyCtrl',
            });
        };
        // $scope.closefrnds = function() {
        //
        // };
        $scope.frnds = [{
            image: 'img/Abhi.png',
            name: 'Abhishek Bachan'
        }, {
            image: 'img/Abhi.png',
            name: 'Abhishek Bachan'
        }, {
            image: 'img/Abhi.png',
            name: 'Abhishek Bachan'
        }, {
            image: 'img/Abhi.png',
            name: 'Abhishek Bachan'
        }, {
            image: 'img/Abhi.png',
            name: 'Abhishek Bachan'
        }, {
            image: 'img/Abhi.png',
            name: 'Abhishek Bachan'
        }, {
            image: 'img/Abhi.png',
            name: 'Abhishek Bachan'
        }, {
            image: 'img/Abhi.png',
            name: 'Abhishek Bachan'
        }, {
            image: 'img/Abhi.png',
            name: 'Abhishek Bachan'
        }, {
            image: 'img/Abhi.png',
            name: 'Abhishek Bachan'
        }, {
            image: 'img/Abhi.png',
            name: 'Abhishek Bachan'
        }, {
            image: 'img/Abhi.png',
            name: 'Abhishek Bachan'
        }, {
            image: 'img/Abhi.png',
            name: 'Abhishek Bachan'
        }, {
            image: 'img/Abhi.png',
            name: 'Abhishek Bachan'
        }, {
            image: 'img/Abhi.png',
            name: 'Abhishek Bachan'
        }, ]
    })
    .controller('UltimateCtrl', function($scope, TemplateService, NavigationService, $timeout) {
        //Used to name the .html file

        console.log("Testing Consoles");

        $scope.template = TemplateService.changecontent("ultimate-panther");
        $scope.menutitle = NavigationService.makeactive("Ultimate Panther");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
    })
    // .controller('AuctionCtrl', function($scope, TemplateService, NavigationService, $timeout) {
    //   //Used to name the .html file
    //
    //   console.log("Testing Consoles");
    //
    //   $scope.template = TemplateService.changecontent("auction");
    //   $scope.menutitle = NavigationService.makeactive("#AuctionWithAbhishek");
    //   TemplateService.title = $scope.menutitle;
    //   $scope.navigation = NavigationService.getnav();
    // })
    .controller('SurveyCtrl', function($scope, TemplateService, NavigationService, $timeout) {
        //Used to name the .html file

        console.log("Testing Consoles");

        $scope.template = TemplateService.changecontent("jpp-survey");
        $scope.menutitle = NavigationService.makeactive("#JPP Survey");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
    })

// $scope.mySlides = [
//   'http://flexslider.woothemes.com/images/kitchen_adventurer_cheesecake_brownie.jpg',
//   'http://flexslider.woothemes.com/images/kitchen_adventurer_lemon.jpg',
//   'http://flexslider.woothemes.com/images/kitchen_adventurer_donut.jpg',
//   'http://flexslider.woothemes.com/images/kitchen_adventurer_caramel.jpg'
// ];

.controller('headerctrl', function($scope, TemplateService, NavigationService, $state) {
    $scope.template = TemplateService;
    $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
        $(window).scrollTop(0);
    });
    NavigationService.callProfile(function(data) {
        console.log(data);
        if (data.value !== true && data.data !== "Logout Successful") {
            // $.jStorage.set("user",data);
            $scope.name = data.name;
            $scope.profileimage = data.profilePic;
            $scope.accesstoken = data.K120K200;
        } else {
            $state.go('home');
        }

    });

    $scope.logout = function() {
        NavigationService.logout(function(data) {
            console.log(data);
            if (data.value === true) {
                $state.go('home');
            } else if (data.value === false) {
                location.reload();
            }
        });
    };
})

.controller('languageCtrl', function($scope, TemplateService, $translate, $rootScope) {

    $scope.changeLanguage = function() {
        console.log("Language CLicked");

        if (!$.jStorage.get("language")) {
            $translate.use("hi");
            $.jStorage.set("language", "hi");
        } else {
            if ($.jStorage.get("language") == "en") {
                $translate.use("hi");
                $.jStorage.set("language", "hi");
            } else {
                $translate.use("en");
                $.jStorage.set("language", "en");
            }
        }
        //  $rootScope.$apply();
    };


})

;
