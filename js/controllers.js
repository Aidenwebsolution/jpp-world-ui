var globalItems = [];
if ($.jStorage.get("languageSet")) {
    console.log();
}

var translate = {};
var globalFunc = {};
var currentlang = '';
var globalLocale = moment.locale('hi');
var localLocale = moment();
angular.module('phonecatControllers', ['templateservicemod', 'navigationservice', 'ui.bootstrap', 'angular-flexslider'])

.controller('Home1Ctrl', function($scope, TemplateService, NavigationService, $timeout,$uibModal,$filter,$rootScope,$translate,$state) {
    //Used to name the .html file

    console.log("108");

    $scope.template = TemplateService.changecontent("home1");
    $scope.menutitle = NavigationService.makeactive("Panther World");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();
    $scope.facebookLogin = function() {
        window.location.href = "http://pantherworldadmin.jaipurpinkpanthers.com/user/loginFacebook";
    };
    $scope.twitterLogin = function() {
        window.location.href = "http://pantherworldadmin.jaipurpinkpanthers.com/user/loginTwitter";
    };
    $scope.Share = function() {
        $uibModal.open({
            animation: $scope.animationsEnabled,
            templateUrl: 'views/modal/share.html',
            size: 'md',
            windowClass: 'share',
            scope: $scope
        });
    };

         $scope.logs = function() {
          console.log("im in");
            $scope.modalLogsInstance = $uibModal.open({
                animation: true,
                templateUrl: 'views/modal/logs.html',
                scope: $scope,
            });
        };

    console.log("im in get pantherword");
        NavigationService.getpantherworldguesswho(function(data){
          console.log("im in get pantherword");
          console.log("data",data.data.data);
          $scope.pantherworldguesswho=data.data.data;
          $scope.pantherworldguesswho.image= $filter('serverimage1')($scope.pantherworldguesswho.image);
        });
        $scope.logs = function() {
          console.log("im in");
            $scope.modalLogsInstance = $uibModal.open({
                animation: true,
                templateUrl: 'views/modal/logs.html',
                scope: $scope,
            });
        };
        $scope.authentication=function(){
          NavigationService.getAuthenticate(function(data) {
            console.log(data);
              if (data.logged_in) {
                console.log("data",data.firstname);
                  $rootScope.userFirstName = data.firstname;
                        console.log("data",$rootScope.userFirstName);
                  $rootScope.loggedIn = true;
              } else {
                  $rootScope.loggedIn = false;
              }
          })
        }





        $scope.isCheckLoggedIn = function(value) {
                console.log("im authenticate");

              NavigationService.getAuthenticate(function(data) {
                    console.log("getAuthenticate", data);
                    console.log("data",data);
                    if (data.logged_in) {
                        console.log("im in true");
                          $rootScope.userFirstName = data.firstname;
                        $rootScope.loggedIn = true;

                        // $state.go('games');
                        if (value == 'GAMES') {
                            $state.go('games');
                        }
                        if (value == 'Gallery') {
                         window.location = "http://jaipurpinkpanthers.com/#/gallery";
                        }
                        if (value == 'WALLPAPERS') {
                           window.location = "http://jaipurpinkpanthers.com/#/wallpaper";
                        }
                        if (value == 'JPP') {
                             window.location = "http://jaipurpinkpanthers.com/#/jpp-tv";
                        }
                        
                        

                    } else {
                        $rootScope.loggedIn = false;
                        $scope.modalLogsInstance = $uibModal.open({
                            animation: true,
                            templateUrl: 'views/modal/logs.html',
                            scope: $scope
                        });
                    }
                })
            };

            $scope.signupdata = {};
            $scope.submitSignup = function(signupdata) {
                console.log("signupdata", signupdata);
                $scope.incorrectPass = false;
                $scope.isCheckedmsg = false;
                $scope.alreadyExist = false;
                $scope.succesSignup = false;
                if (signupdata) {
                    console.log("signupdata", signupdata);
                    if (signupdata.password == signupdata.confirmPass) {

                        $scope.incorrectPass = false;
                        NavigationService.submitSignup(signupdata, function(data) {
                            console.log("data", data);
                            if (data.logged_in) {
                                $rootScope.loggedIn = true;
                                $scope.succesSignup = true;
                                $scope.alreadyExist = false;
                                $timeout(function() {

                                    $scope.succesSignup = false;
                                    $scope.alreadyExist = false;
                                    $scope.signupdata = {};
                                    $scope.modalLogsInstance.close();
                                    $scope.authentication();
                                }, 2000);

                            } else {
                                $scope.succesSignup = false;
                                $rootScope.loggedIn = false;
                                console.log("im else");
                                $scope.alreadyExist = true;
                            }
                        })
                    } else {
                        $scope.incorrectPass = true;
                    }
                }
            };

            $scope.loginData = {};
            $scope.incorrectDetails = false;
            $scope.loginSubmit = function(loginData) {
                console.log("loginData", loginData);
                $scope.incorrectDetails = false;
                if (loginData) {

                    NavigationService.submitLogin(loginData, function(data) {
                        console.log("data", data);
                        if (data.logged_in) {
                            $scope.incorrectDetails = false;
                            $rootScope.loggedIn = true;
                            $scope.successlogin = true;
                            $timeout(function() {

                                $scope.successlogin = false;
                                $scope.incorrectDetails = false;
                                $scope.loginData = {};
                                $scope.modalLogsInstance.close();
                                $scope.authentication();
                            }, 2000);
                            console.log("im in");
                        } else {
                            $scope.incorrectDetails = true;
                            $rootScope.loggedIn = false;
                        }
                    })
                }
            }

    $scope.tabs = "design";
    $scope.classsa = 'active-tab';
    $scope.classsb = '';

    $scope.tabchanges = function(tab, a) {
        $scope.tabs = tab;
        if (a == 1) {
            $scope.classsa = 'active-tab';
            $scope.classsb = '';


        }
        if (a == 2) {
            $scope.classsb = 'active-tab';
            $scope.classsa = '';


        }


    };


      $scope.currentlang = $.jStorage.get("languageSet");
    console.log($scope.currentlang);

        globalFunc.changeLang = function() {
        $scope.currentlang = currentlang;
        console.log($scope.currentlang);
    };



        globalFunc.changeSlides = function(lang) {
        $scope.currentlang = lang;
        if (lang == 'hi') {
            $scope.news = $scope.hindibanner;
        } else {
            $scope.news = $scope.englishbanner;
        }
        // $scope.changeSlide($scope.news[0]);

    };

})

.controller('HomeCtrl', function($scope, TemplateService, NavigationService, $timeout) {
    //Used to name the .html file

    console.log("Testing Consoles");

    $scope.template = TemplateService.changecontent("home");
    $scope.menutitle = NavigationService.makeactive("Home");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();


})

.controller('ComingSoonCtrl', function($scope, TemplateService, NavigationService, $timeout) {
    //Used to name the .html file
    $scope.template = TemplateService.changecontent("comingsoon");
    $scope.menutitle = NavigationService.makeactive("Coming Soon");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();
})
.controller('ComingSooonCtrl', function($scope, TemplateService, NavigationService, $timeout) {
    //Used to name the .html file
    $scope.template = TemplateService.changecontent("comingSoon");
    $scope.menutitle = NavigationService.makeactive("Coming Soon");
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

.controller('RapidCtrl', function($scope, TemplateService, NavigationService, $timeout ,$uibModal) {
    //Used to name the .html file

    console.log("Testing Consoles");

    $scope.template = TemplateService.changecontent("rapid");
    $scope.menutitle = NavigationService.makeactive("Rapid Fire");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();

   $scope.share = function(){
          $uibModal.open({
            animation: true,
            templateUrl: "views/modal/share.html",
            scope: $scope
        });
      };
      $scope.sect1= true;
      $scope.quiz = true;
      $scope.score = true;
         $scope.go=function(){
            $scope.quiz= false;
               $scope.sect1= false;
      }
      $scope.next=function(){
          $scope.quiz = true;
            $scope.score= false;
      }

// // var countdownNumberEl=[];
// var countdown = 90;
// var countdownNumberEl = document.getElementsByClassName('countdown-number')[0];
// // countdownNumberEl.textContent=[];



// countdownNumberEl.textContent = countdown;

// // console.log("Testing Consoles " , countdown) ; 
// // console.log("Testing Consoles " , countdownNumberEl) ; 

// setInterval(function() {
//   countdown = --countdown < 0 ? 90 : countdown;

//   countdownNumberEl.textContent = countdown;
// }, 1000);

})

.controller('GuessCtrl', function($scope, TemplateService, NavigationService, $timeout ,$uibModal) {
    //Used to name the .html file

    console.log("Testing Consoles");

    $scope.template = TemplateService.changecontent("guess");
    $scope.menutitle = NavigationService.makeactive("Guess Who");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();

   $scope.share = function(){
          $uibModal.open({
            animation: true,
            templateUrl: "views/modal/share.html",
            scope: $scope
        });
      };
      $scope.sect1= true;
      $scope.quiz = true;
      $scope.score = true;
         $scope.go=function(){
            $scope.quiz= false;
               $scope.sect1= false;
      }
      $scope.next=function(){
          $scope.quiz = true;
            $scope.score= false;
      }

})

.controller('MatchCtrl', function($scope, TemplateService, NavigationService, $timeout ,$uibModal) {
    //Used to name the .html file

    console.log("Testing Consoles");

    $scope.template = TemplateService.changecontent("match");
    $scope.menutitle = NavigationService.makeactive("Match");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();

   $scope.share = function(){
          $uibModal.open({
            animation: true,
            templateUrl: "views/modal/share.html",
            scope: $scope
        });
      };
      $scope.sect1= true;
      $scope.quiz = true;
      $scope.score = true;
         $scope.go=function(){
            $scope.quiz= false;
               $scope.sect1= false;
      }
      $scope.next=function(){
          $scope.quiz = true;
            $scope.score= false;
      }

})

.controller('CrosswordCtrl', function($scope, TemplateService, NavigationService, $timeout) {
    //Used to name the .html file

    console.log("Testing Consoles");

    $scope.template = TemplateService.changecontent("crossword");
    $scope.menutitle = NavigationService.makeactive("Crossword");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();
})




.controller('DenCtrl', function($scope, TemplateService, NavigationService, $timeout) {
    //Used to name the .html file
    $scope.template = TemplateService.changecontent("panthers-den");
    $scope.menutitle = NavigationService.makeactive("The Panther Den");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();


})

.controller('GamesCtrl', function($scope, TemplateService, NavigationService, $timeout, $filter,$interval) {
        //Used to name the .html file

        console.log("Testing Consoles");

        $scope.template = TemplateService.changecontent("games");
        $scope.menutitle = NavigationService.makeactive("Games");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();

        // 2017-05-09T05:51:26.652Z
$scope.latestmatch={};
$scope.latestmatch.startTimedate= new Date('Wed May 10 2017 18:19:38 GMT+0530 (IST)');
$scope.latestmatch.startTimedate =$scope.latestmatch.startTimedate.setDate($scope.latestmatch.startTimedate.getDate() + 31);



            $scope.refreshTimer = function(eventTime) {
              $scope.countdown={};
              eventTime = new Date(eventTime);
                console.log(eventTime);
                $scope.rightNow = new Date();
                $scope.diffTime = eventTime - $scope.rightNow;
                var duration = moment.duration($scope.diffTime, 'milliseconds');
                  $interval(function() {
                  duration = moment.duration(duration - 1000, 'milliseconds');
                  console.log("duration",duration._data.days);
                    $scope.countdown.days = duration._data.days;
                    $scope.countdown.hours = duration._data.hours;
                    $scope.countdown.minutes = duration._data.minutes;
                    $scope.countdown.seconds = duration._data.seconds;

                }, 1000);
            };

$scope.refreshTimer($scope.latestmatch.startTimedate);

    })
    .controller('NewsCtrl', function($scope, TemplateService, NavigationService, $timeout) {
        //Used to name the .html file

        console.log("Testing Consoles");

        $scope.template = TemplateService.changecontent("news-updates");
        $scope.menutitle = NavigationService.makeactive("News & Updates");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
    })

.controller('GalleryCtrl', function($scope, TemplateService, NavigationService, $timeout) {
        //Used to name the .html file

        console.log("Testing Consoles");

        $scope.template = TemplateService.changecontent("gallery");
        $scope.menutitle = NavigationService.makeactive("Gallery");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();

    })
    .controller('RoomCtrl', function($scope, TemplateService, NavigationService, $timeout) {
        //Used to name the .html file

        console.log("Testing Consoles");

        $scope.template = TemplateService.changecontent("panther-room");
        $scope.menutitle = NavigationService.makeactive("Panther Room");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
    })

.controller('ArmyCtrl', function($scope, TemplateService, NavigationService, $timeout, $state, $uibModal) {
        $scope.template = TemplateService.changecontent("panther-army");
        $scope.menutitle = NavigationService.makeactive("Panther Army");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        $scope.game2 = {
            accuracy1: "",
            accuracy2: ""
        };

        NavigationService.callProfile(function(data) {
            if (data.value != true) {
                $state.go('home');
            } else {
                switch ($state.params.level) {
                    case 'level1':
                        $scope.pageShow = 1;
                        break;
                    case 'level2':
                        console.log("demodemodemo");
                        NavigationService.checkLevel(function(data) {
                            console.log(data);
                            if (!data.data.accuracy || data.data.accuracy === '') {
                                console.log("in if");
                                $scope.pageShow = 4;
                            } else {
                                console.log("in else");
                                $scope.pageShow = 7;
                            }
                        })
                        break;
                    default:

                }

            }
        });

        $scope.option = {};
        $scope.sendUserData = {};
        $scope.games = {};
        $scope.games.speedTime = 0;
        $scope.games.speedClick = 0;
        $scope.task3 = [{
            "custdiv": "inp-row",
            "textfield": [{
                "text": "K",
                "class": "des"
            }, {
                "text": "",
                "class": ""
            }, {
                "text": "",
                "class": ""
            }, {
                "text": "",
                "class": ""
            }, {
                "text": "",
                "class": ""
            }, {
                "text": "",
                "class": ""
            }, {
                "text": "",
                "class": "spl"
            }, {
                "text": "S",
                "class": "des"
            }, {
                "text": "",
                "class": ""
            }, {
                "text": "",
                "class": ""
            }, {
                "text": "",
                "class": ""
            }, {
                "text": "",
                "class": ""
            }]
        }, {
            "custdiv": "inp-ro",
            "textfield": [{
                "text": "C",
                "class": "des"
            }, {
                "text": "",
                "class": "spl"
            }, {
                "text": "",
                "class": ""
            }, {
                "text": "",
                "class": ""
            }, {
                "text": "",
                "class": ""
            }]
        }, {
            "custdiv": "inpu-ro",
            "textfield": [{
                "text": "S",
                "class": "des"
            }, {
                "text": "",
                "class": ""
            }, {
                "text": "",
                "class": "spl"
            }, {
                "text": "",
                "class": ""
            }, {
                "text": "N",
                "class": "des"
            }, {
                "text": "",
                "class": ""
            }, {
                "text": "",
                "class": ""
            }, {
                "text": "",
                "class": ""
            }, {
                "text": "",
                "class": ""
            }, {
                "text": "",
                "class": ""
            }]
        }, {
            "custdiv": "input-ro",
            "textfield": [{
                "text": "R",
                "class": "des"
            }, {
                "text": "",
                "class": ""
            }, {
                "text": "",
                "class": ""
            }, {
                "text": "",
                "class": ""
            }, {
                "text": "",
                "class": "spl"
            }, {
                "text": "R",
                "class": "des"
            }, {
                "text": "",
                "class": ""
            }, {
                "text": "",
                "class": ""
            }, {
                "text": "",
                "class": ""
            }]
        }, {
            "custdiv": "input-row",
            "textfield": [{
                "text": "R",
                "class": "des"
            }, {
                "text": "",
                "class": ""
            }, {
                "text": "",
                "class": ""
            }, {
                "text": "",
                "class": ""
            }, {
                "text": "",
                "class": ""
            }, {
                "text": "",
                "class": "spl"
            }, {
                "text": "N",
                "class": "des"
            }, {
                "text": "",
                "class": ""
            }, {
                "text": "",
                "class": ""
            }, {
                "text": "",
                "class": ""
            }, {
                "text": "",
                "class": ""
            }, {
                "text": "",
                "class": ""
            }]
        }, {
            "custdiv": "input-rowing",
            "textfield": [{
                "text": "N",
                "class": "des"
            }, {
                "text": "",
                "class": ""
            }, {
                "text": "",
                "class": ""
            }, {
                "text": "",
                "class": ""
            }, {
                "text": "",
                "class": ""
            }, {
                "text": "",
                "class": "spl"
            }, {
                "text": "",
                "class": ""
            }, {
                "text": "G",
                "class": "des"
            }, {
                "text": "",
                "class": ""
            }, {
                "text": "",
                "class": ""
            }, {
                "text": "",
                "class": ""
            }, {
                "text": "",
                "class": ""
            }, {
                "text": "",
                "class": ""
            }]
        }, {
            "custdiv": "input-rowg",
            "textfield": [{
                "text": "J",
                "class": "des"
            }, {
                "text": "",
                "class": ""
            }, {
                "text": "",
                "class": ""
            }, {
                "text": "",
                "class": ""
            }, {
                "text": "",
                "class": ""
            }, {
                "text": "",
                "class": "spl"
            }, {
                "text": "S",
                "class": "des"
            }, {
                "text": "",
                "class": ""
            }, {
                "text": "",
                "class": ""
            }, {
                "text": "",
                "class": ""
            }, {
                "text": "",
                "class": ""
            }]
        }, {
            "custdiv": "input-rowig",
            "textfield": [{
                "text": "R",
                "class": "des"
            }, {
                "text": "",
                "class": ""
            }, {
                "text": "",
                "class": ""
            }, {
                "text": "",
                "class": "spl"
            }, {
                "text": "",
                "class": ""
            }, {
                "text": "",
                "class": ""
            }, {
                "text": "",
                "class": ""
            }, {
                "text": "",
                "class": ""
            }]
        }];

        var inc = 0;
        var first = new Date();
        var second = new Date();


        //task integration
        $scope.kabaddiClick = function() {
            inc++;
            if (inc === 1) {
                first = new Date();

            }
            second = new Date();
            var a = moment(first);
            var b = moment(second);
            $scope.games.speedTime = b.diff(a, 'seconds');
            $scope.games.speedClick = inc;

        }
        $scope.createJson = [];

        $scope.textChange = function() {
                var text = "";
                _.each($scope.task3, function(n) {
                    var spl = _.filter(n.textfield, {
                        class: "spl"
                    });
                    text += spl[0].text;
                });
                $scope.games.intelligence = text;
                console.log(text);
            }
            // $scope.pinkCharacters  = function() {
            //
            //
            // };
        $scope.levelTwo = function() {
                $scope.games.accuracy = $scope.game2.accuracy1 + " " + $scope.game2.accuracy2;
                console.log($scope.games);
                NavigationService.storeLevel($scope.games, function(data) {
                    console.log(data);
                    if (data.value === true) {
                        $scope.submitData();
                    } else {
                        $scope.somethingwentwrong();
                    }
                })

            }
            // $scope.sendMessage = function() {
            //     // NavigationService.sendMessage($scope.messageToFriends, function(data, status) {
            //     //     console.log(data);
            //     // })
            //     var encoded = encodeURI("http://www.facebook.com/dialog/send?app_id=655719224579290&link=http://www.nytimes.com/interactive/2015/04/15/travel/europe-favorite-streets.html&redirect_uri=http://jaipurpinkpanthers.com/pantherworld/");
            //     console.log(encoded);
            //     // window.location.href = encoded;
            // }
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

                var dualScreenLeft = window.screenLeft != undefined ? window.screenLeft : screen.left;
                var dualScreenTop = window.screenTop != undefined ? window.screenTop : screen.top;

                var width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
                var height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;

                var left = ((width / 2) - (800 / 2)) + dualScreenLeft;
                var top = ((height / 2) - (500 / 2)) + dualScreenTop;
                var newWindow = window.open("http://www.facebook.com/dialog/send?app_id=655719224579290&link=http://jaipurpinkpanthers.com/panther-army.html&redirect_uri=http://jaipurpinkpanthers.com/pantherworld", "Send Message", 'scrollbars=yes, width=800, height=500, top=' + top + ', left=' + left);
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
                        $scope.obj = '';
                        globalItems = [];

                    } else {
                        $scope.somethingwentwrong();
                    }


                });

            }

        };
        $scope.redirectAfterClose = function() {
            // $state.reload();
            switch ($state.params.level) {
                case 'level1':
                    $scope.pageShow = 5;
                    break;
                case 'level2':
                    $scope.pageShow = 6;
                    break;
                default:

            }
        };
        // GET ALL FACEBOOK DETAILS
        NavigationService.getFacebookDetails(function(data) {
            $scope.obj = JSON.parse(data.data);
            $scope.obj = $scope.obj.data;
            console.log($scope.obj);
        });
        //Used to name the .html file
        // $scope.pageShow = 1;
        $scope.goToPage = function(page, option) {
            $scope.pageShow = page;
        };

        //check if registered

        $scope.checkIfRegistered = function() {
            NavigationService.callProfile(function(data) {
                console.log(data);
                if (data.value === true) {
                    if (data.data.friend1 !== '' || data.data.friend2 !== '' || data.data.friend3 !== '' || data.data.friend4 !== '' || data.data.friend5 !== '' || data.data.friend6 !== '') {
                        // do not allow to fill form
                        // $scope.doNotRegister();
                        $scope.pageShow = 7;
                    } else {
                        $scope.goToPage(2);
                    }
                }
            });
        };

        $scope.messageToFriends = [];
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
            $scope.messageToFriends = $scope.lines;
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
        $scope.doNotRegister = function() {
            $uibModal.open({
                animation: $scope.animationsEnabled,
                templateUrl: 'views/modal/doNotRegister.html',
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

.controller('headerctrl', function($scope, TemplateService, NavigationService, $state,$rootScope,$uibModal,$timeout ) {
    $scope.template = TemplateService;
    $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
        $(window).scrollTop(0);
    });
    console.log($state.current.name);
    NavigationService.callProfile(function(data) {
        console.log(data);
        if (data.value === true) {
            // $.jStorage.set("user",data);
            $scope.name = data.data.name;
            $scope.profileimage = data.data.profilePic;
            $scope.accesstoken = data.data.K120K200;
        } else {
            if ($state.current.name == "panther-army") {
                // $state.go('home');

            }
        }

    });
    $scope.tabs = "design";
    $scope.classsa = 'active-tab';
    $scope.classsb = '';

    $scope.tabchanges = function(tab, a) {
        $scope.tabs = tab;
        if (a == 1) {
            $scope.classsa = 'active-tab';
            $scope.classsb = '';


        }
        if (a == 2) {
            $scope.classsb = 'active-tab';
            $scope.classsa = '';


        }


    };
    $scope.logs = function() {
      console.log("im in");
        $scope.modalLogsInstance = $uibModal.open({
            animation: true,
            templateUrl: 'views/modal/logs.html',
            scope: $scope,
        });
    };

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

    $scope.logoutUser = function() {
        $rootScope.loggedIn = false;
        NavigationService.logoutUser(function(data) {
            console.log("im in logout", data);
        })
    };

    $scope.authentication=function(){
      NavigationService.getAuthenticate(function(data) {
        console.log(data);
          if (data.logged_in) {
            console.log("data",data.firstname);
              $rootScope.userFirstName = data.firstname;
                    console.log("data",$rootScope.userFirstName);
              $rootScope.loggedIn = true;
          } else {
              $rootScope.loggedIn = false;
          }
      })
    }
$scope.authentication();


            $scope.signupdata = {};
            $scope.submitSignup = function(signupdata) {
                console.log("signupdata", signupdata);
                $scope.incorrectPass = false;
                $scope.isCheckedmsg = false;
                $scope.alreadyExist = false;
                $scope.succesSignup = false;
                if (signupdata) {
                    console.log("signupdata", signupdata);
                    if (signupdata.password == signupdata.confirmPass) {

                        $scope.incorrectPass = false;
                        NavigationService.submitSignup(signupdata, function(data) {
                            console.log("data", data);
                            if (data.logged_in) {
                                $rootScope.loggedIn = true;
                                $scope.succesSignup = true;
                                $scope.alreadyExist = false;
                                $timeout(function() {

                                    $scope.succesSignup = false;
                                    $scope.alreadyExist = false;
                                    $scope.signupdata = {};
                                    $scope.modalLogsInstance.close();
                                    $scope.authentication();
                                }, 2000);

                            } else {
                                $scope.succesSignup = false;
                                $rootScope.loggedIn = false;
                                console.log("im else");
                                $scope.alreadyExist = true;
                            }
                        })
                    } else {
                        $scope.incorrectPass = true;
                    }
                }
            };

            $scope.loginData = {};
            $scope.incorrectDetails = false;
            $scope.loginSubmit = function(loginData) {
                console.log("loginData", loginData);
                $scope.incorrectDetails = false;
                if (loginData) {

                    NavigationService.submitLogin(loginData, function(data) {
                        console.log("data", data);
                        if (data.logged_in) {
                            $scope.incorrectDetails = false;
                            $rootScope.loggedIn = true;
                            $scope.successlogin = true;
                            $timeout(function() {

                                $scope.successlogin = false;
                                $scope.incorrectDetails = false;
                                $scope.loginData = {};
                                $scope.modalLogsInstance.close();
                                $scope.authentication();
                            }, 2000);
                            console.log("im in");
                        } else {
                            $scope.incorrectDetails = true;
                            $rootScope.loggedIn = false;
                        }
                    })
                }
            }

})

// .controller('languageCtrl', function($scope, TemplateService, $translate, $rootScope) {
//
//     $scope.changeLanguage = function() {
//         console.log("Language CLicked");
//
//         if (!$.jStorage.get("language")) {
//             $translate.use("hi");
//             $.jStorage.set("language", "hi");
//         } else {
//             if ($.jStorage.get("language") == "en") {
//                 $translate.use("hi");
//                 $.jStorage.set("language", "hi");
//             } else {
//                 $translate.use("en");
//                 $.jStorage.set("language", "en");
//             }
//         }
//
//     };
//
//
// })
.controller('languageCtrl', function($scope, $state, TemplateService, $translate, $rootScope, $uibModal) {
    var siteLanguage = $.jStorage.get('languageSet');
    $scope.languageActive = siteLanguage;

    console.log($state);

    $scope.language = 'img/lan-' + siteLanguage + '.jpg';
    if (siteLanguage) {
        $translate.use(siteLanguage);
        $.jStorage.set("languageSet", siteLanguage);
        if ($state.current.name == 'home') {
            globalFunc.changeSlides(siteLanguage);
        }
    }

    var languagePicker = {};
    $scope.changeLanguage = function(val) {
        $translate.use(val);
        if ($state.current.name == 'home') {
            globalFunc.changeSlides(val);
        }
        $.jStorage.set("languageSet", val);
        $scope.language = 'img/lan-' + val + '.jpg';
        languagePicker.close();
        $scope.languageActive = val;
    };
    $scope.changeLanguage2 = function(val) {
        currentlang = val;
        console.log('currentlang', currentlang);
        $translate.use(val);
        if ($state.current.name == 'home') {
            globalFunc.changeSlides(val);
        }
        $.jStorage.set("languageSet", val);
        $scope.languageActive = val;
        globalFunc.changeLang();
    };
    $scope.languagePicker = function() {
        // languagePicker = $uibModal.open({
        //     animation: true,
        //     templateUrl: 'views/modal/language-picker.html',
        //     size: 'md',
        //     backdrop: 'static',
        //     scope: $scope,
        //     keyboard: false
        // });
    };

    if (!siteLanguage) {
        $scope.languagePicker();
    }

})
