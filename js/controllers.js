var globalItems = [];
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
        $scope.option = {};
        $scope.sendUserData = {};
        $scope.storeUserData = function(armyname, url1, url2, url3, url4, url5, url6, friend1, friend2, friend3, friend4, friend5, friend6) {
            if (armyname === undefined || url1 === undefined || url2 === undefined || url3 === undefined || url4 === undefined || url5 === undefined || url6 === undefined || friend1 === undefined || friend2 === undefined || friend3 === undefined || friend4 === undefined || friend5 === undefined || friend6 === undefined) {
                $scope.openerror();
            } else {
                $scope.sendUserData.armyName = armyname;
                $scope.sendUserData.friend1 = friend1;
                $scope.sendUserData.friend1image = url1;
                $scope.sendUserData.friend2 = friend2;
                $scope.sendUserData.friend2image = url2;
                $scope.sendUserData.friend3 = friend3;
                $scope.sendUserData.friend3image = url3;
                $scope.sendUserData.friend4 = friend4;
                $scope.sendUserData.friend4image = url4;
                $scope.sendUserData.friend5 = friend5;
                $scope.sendUserData.friend5image = url5;
                $scope.sendUserData.friend6 = friend6;
                $scope.sendUserData.friend6image = url6;
                $scope.pageShow = 3;
            }
        };
        $scope.submitAnswer = function(option) {
            console.log($scope.sendUserData);
            $scope.option = option;
            if (option.question1option === undefined || option.question2option === undefined || option.question3option === undefined || option.question4option === undefined || option.question5option === undefined) {
                $scope.openerror();
            } else {
                NavigationService.storeUserData($scope.sendUserData, function(data) {
                  console.log($scope.sendUserData);
                  console.log("success user data");
                  console.log(data);
                });
                NavigationService.storeAnswer($scope.option, function(data) {
                    if (data.value === true) {
                        $scope.submitData();
                        $scope.option = {};
                        $scope.sendUserData = {};
                        $scope.sendUserData.armyName = '';
                        $scope.sendUserData.friend1 = '';
                        $scope.sendUserData.friend1image = '';
                        $scope.sendUserData.friend2 = '';
                        $scope.sendUserData.friend2image = '';
                        $scope.sendUserData.friend3 = '';
                        $scope.sendUserData.friend3image = '';
                        $scope.sendUserData.friend4 = '';
                        $scope.sendUserData.friend4image = '';
                        $scope.sendUserData.friend5 = '';
                        $scope.sendUserData.friend5image = '';
                        $scope.sendUserData.friend6 = '';
                        $scope.sendUserData.friend6image = '';
                        $scope.obj='';
                         globalItems = [];

                    } else {
                        $scope.somethingwentwrong();
                    }


                });

            }

        };
        $scope.redirectAfterClose = function() {
            $state.reload();

        };
        // GET ALL FACEBOOK DETAILS
        NavigationService.getFacebookDetails(function(data) {
            $scope.obj = JSON.parse(data.data);
            $scope.obj = $scope.obj.data;
            console.log($scope.obj);
        });
        //Used to name the .html file
        $scope.pageShow = 1;
        $scope.goToPage = function(page, option) {
            $scope.pageShow = page;
        };

        $scope.item = {};
        $scope.lines = globalItems;
        $scope.insertSelectedFriends = function(item) {
            $scope.item = item;
            var object = $scope.item;
            if (item.toggle) {
                item.toggle = !(item.toggle);
                _.pull($scope.lines, $scope.item);
            } else if ($scope.lines.length < 6) {
                $scope.lines.push($scope.item);
                item.toggle = !(item.toggle);
            } else {}

        };
        $scope.registershow = true;
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


        $scope.openfrnds = function() {
            $uibModal.open({
                animation: $scope.animationsEnabled,
                templateUrl: 'views/modal/select-army.html',
                scope: $scope,
            });
        };

        $scope.openerror = function() {
            $uibModal.open({
                animation: $scope.animationsEnabled,
                templateUrl: 'views/modal/error-message.html',
                scope: $scope,
            });
        };
        $scope.somethingwentwrong = function() {
            $uibModal.open({
                animation: $scope.animationsEnabled,
                templateUrl: 'views/modal/somethingwentwrong.html',
                scope: $scope,
            });
        };
        $scope.submitData = function() {
            $uibModal.open({
                animation: $scope.animationsEnabled,
                templateUrl: 'views/modal/submitData.html',
                scope: $scope,
            });
        };

    })
    .controller('UltimateCtrl', function($scope, TemplateService, NavigationService, $timeout) {
        //Used to name the .html file

        console.log("Testing Consoles");

        $scope.template = TemplateService.changecontent("ultimate-panther");
        $scope.menutitle = NavigationService.makeactive("Ultimate Panther");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
    })
    .controller('SurveyCtrl', function($scope, TemplateService, NavigationService, $timeout) {
        //Used to name the .html file

        console.log("Testing Consoles");

        $scope.template = TemplateService.changecontent("jpp-survey");
        $scope.menutitle = NavigationService.makeactive("#JPP Survey");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
    })

.controller('headerctrl', function($scope, TemplateService, NavigationService, $state) {
    $scope.template = TemplateService;
    $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
        $(window).scrollTop(0);
    });
    NavigationService.callProfile(function(data) {
        console.log(data);
        if (data.value === true) {
            // $.jStorage.set("user",data);
            $scope.name = data.data.name;
            $scope.profileimage = data.data.profilePic;
            $scope.accesstoken = data.data.K120K200;
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
