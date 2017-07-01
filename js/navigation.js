var mainurl = "http://admin.jaipurpinkpanthers.com/index.php/"


var imgurl = "http://admin.jaipurpinkpanthers.com/uploads/";

var adminurl1 = mainurl + "json/";

var tempUrl = "http://admin.jaipurpinkpanthers.com/index.php/json/";
var tempimgurl = "http://admin.jaipurpinkpanthers.com/uploads/";

adminurl = "http://admin.jaipurpinkpanthers.com/";


var navigationservice = angular.module('navigationservice', [])

.factory('NavigationService', function ($http) {
    var navigation = [{
            name: "Fixtures & Results",
            // classis: "active",
            // link: "http://jaipurpinkpanthers.com/fixtures",
            url: "comingsoon",
            //     subnav:[{
            //   name: "HOME1",
            //   classis: "active",
            //   link: "home1",
            // },]
        },

        {
            name: "Panther World",
            url: "panther",
            // id:"panther",
            // classis: "active",
            subnav: []
                // {
                //     name: "Wallpapers",
                //     url: "wallpaper",
                //     classis: "active"
                // }, {
                //     name: "Gallery",
                //     url: "gallery",
                //     classis: "active"
                // }, {
                //     name: "Games",
                //     link: "jpp-tv",
                //     classis: "active"
                // }, {
                //     name: "JPP TV",
                //     url: "jpp-tv",
                //     classis: "active"
                // }
        }, {
            name: "Tickets",
            // link: "http://jaipurpinkpanthers.com/ticket",
            url: "comingsoon",
            classis: "active",
            // subnav: [{
            //         name: "Panther Army",
            //         classis: "active",
            //         link: "panther-abrmy",
            //     }, {
            //         name: "Ultimate Panther",
            //         classis: "active",
            //         link: "#/ultimate-panther"
            //     },
            //     {
            //         name: "#JPP Survey",
            //         classis: "active",
            //         link: "#/jpp-survey"
            //     },
            // ]
        }, {
            name: "Merchandise",
            // link: "http://jaipurpinkpanthers.com/ticket-merchandise",
            url: "comingsoon",
            classis: "active",
            subnav: []
        }, {
            name: "Players",
            link: "http://jaipurpinkpanthers.com/#/players",
            // url: "ComingSoooon",
            classis: "active",
            subnav: []
        }, {
            name: "News",
            link: "http://jaipurpinkpanthers.com/#/news-media",
            classis: "active",
            // subnav: []
        }, {
            name: "About",
            link: " http://jaipurpinkpanthers.com/#/about-us",
            classis: "active",
            subnav: []
        }, {
            name: "Fan Corner",
            link: "http://jaipurpinkpanthers.com/#/fan-corner",
            classis: "active",
            // subnav: []
        }
    ];

    return {
        getnav: function () {
            return navigation;
        },
        // callProfile: function (callback) {
        //     //console.log('Navigation form data: ', formData);
        //     $http({
        //         url: adminurl + 'user/profile',
        //         method: 'POST',
        //         withCredentials: true

        //     }).then(function (data)b {
        //         data = data.data;
        //         callback(data);
        //     });
        // }

        getAuthenticate: function (callback) {
            $http.get(adminurl + "authenticate").success(callback);
        },
        storeAnswer: function (option, callback) {
            //console.log('Navigation form data: ', formData);
            $http({
                url: adminurl + 'question/storeAnswer',
                method: 'POST',
                withCredentials: true,
                data: option

            }).then(function (data) {
                data = data.data;
                callback(data);
            });
        },
        storeUserData: function (data, callback) {
            $http({
                url: adminurl + 'user/storeUserData',
                method: 'POST',
                withCredentials: true,
                data: data

            }).then(function (data) {
                data = data.data;
                callback(data);
            });
        },
        getFacebookDetails: function (callback) {
            $http.get(adminurl + "user/getFacebookDetails").then(function (data) {
                data = data.data;
                callback(data);
            });
        },
        logout: function (callback) {
            $http({
                url: adminurl + 'register/logout',
                method: 'POST',
                withCredentials: true

            }).then(function (data) {
                data = data.data;
                callback(data);
            });
        },
        storeLevel: function (data, callback) {
            $http({
                url: adminurl + 'question/storeLevel2',
                method: 'POST',
                withCredentials: true,
                data: data

            }).then(function (data) {
                data = data.data;
                callback(data);
            });
        },
        sendMessage: function (data, callback) {
            FB.ui({
                method: 'send',
                link: 'http://www.nytimes.com/interactive/2015/04/15/travel/europe-favorite-streets.html',
                redirect_uri: "http://jaipurpinkpanthers.com/pantherworld"
            });
        },
        makeactive: function (menuname) {
            for (var i = 0; i < navigation.length; i++) {
                if (navigation[i].name == menuname) {
                    navigation[i].classis = "active";
                } else {
                    navigation[i].classis = "";
                }
            }
            return menuname;
        },
        checkLevel: function (callback) {
            $http({
                url: adminurl + 'question/getQuestionDetail',
                method: 'POST',
                withCredentials: true
            }).then(function (data) {
                data = data.data;
                callback(data);
            });
        },
        getpantherworldguesswho: function (callback) {
            $http.get(tempUrl + "getpantherworldguesswho").then(callback);
        },
        getAuthenticate: function (callback) {
            $http.get(tempUrl + "authenticate").success(callback);
        },
        submitLogin: function (loginData, callback) {
            $http({
                url: tempUrl + 'login',
                method: 'POST',
                withCredentials: true,
                data: loginData
            }).success(callback);
        },
        forgotPassword: function (formData, callback) {
            $http({
                url: tempUrl + 'forgotpassword',
                method: 'POST',
                withCredentials: true,
                data: formData
            }).success(callback);
        },
        forgotPasswordSubmit: function (formData, callback) {
            $http({
                url: tempUrl + 'forgotpasswordsubmit',
                method: 'POST',
                withCredentials: true,
                data: formData
            }).success(callback);
        },
        submitSignup: function (formData, callback) {
            $http({
                url: tempUrl + 'signup',
                method: 'POST',
                withCredentials: true,
                data: formData
            }).success(callback);
        },
        signupOtpSubmit: function (formData, callback) {
            $http({
                url: tempUrl + 'signupotpsubmit',
                method: 'POST',
                withCredentials: true,
                data: formData
            }).success(callback);
        },
        // submitSignup: function (formData, callback) {
        //     $http({
        //         url: tempUrl + 'signup',
        //         method: 'POST',
        //         withCredentials: true,
        //         data: formData
        //     }).success(callback);
        // },
        logoutUser: function (callback) {
            $http.get(tempUrl + "logout").success(callback);
        },
        changeTimerRapid: function () {
            var rapidTimer = $.jStorage.get("rapidTimer");
            var returnVal;
            if (rapidTimer && rapidTimer != 1) {
                returnVal = rapidTimer - 1;
                $.jStorage.set("rapidTimer", returnVal);
            } else if (rapidTimer != 1) {
                $.jStorage.set("rapidTimer", 90);
                returnVal = 90;
            } else {
                $.jStorage.set("rapidTimer", null);
                returnVal = 0;
            }
            return returnVal;
        },
         saveScore: function (formData, callback) {
           //console.log(formData,"scoreeee");
            $http({
                url: tempUrl + 'savescore',
                method: 'POST',
                withCredentials: true,
                data: formData
            }).success(callback);
        }

    };
});