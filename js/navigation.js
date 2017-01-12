var adminURL = "";
// if (isproduction) {
//     adminURL = "http://www.wohlig.co.in/demo/index.php";
// } else {
// adminurl = "http://jppworld.in:1337/";
// adminurl = "http://192.168.1.105:1337/";
adminurl = "http://pantherworldadmin.jaipurpinkpanthers.com/";
// }

var navigationservice = angular.module('navigationservice', [])

.factory('NavigationService', function($http) {
    var navigation = [{
            name: "Fixtures & Results",
            classis: "active",
            link: "http://jaipurpinkpanthers.com/fixtures",
            //     subnav:[{
            //   name: "HOME1",
            //   classis: "active",
            //   link: "home1",
            // },]
        },

        {
            name: "Panther World",
            link: "home1",
            classis: "active",
            // subnav: []
        }, {
            name: "Tickets",
            link: "http://jaipurpinkpanthers.com/ticket",
            classis: "active",
            // subnav: [{
            //         name: "Panther Army",
            //         classis: "active",
            //         link: "panther-army",
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
            name: "Merchandize",
            link: "http://jaipurpinkpanthers.com/ticket-merchandise",
            classis: "active",
            subnav: []
        }, {
            name: "Players",
            link: "http://jaipurpinkpanthers.com/players",
            classis: "active",
            subnav: []
        }, {
            name: "About",
            link: "http://jaipurpinkpanthers.com/about-us",
            classis: "active",
            subnav: []
        }, {
            name: "News",
            link: "http://jaipurpinkpanthers.com/news-media",
            classis: "active",
            // subnav: []
        }, {
            name: "Fan Corner",
            link: "http://jaipurpinkpanthers.com/fan-corner",
            classis: "active",
            // subnav: []
        }
    ];

    return {
        getnav: function() {
            return navigation;
        },
        callProfile: function(callback) {
            //console.log('Navigation form data: ', formData);
            $http({
                url: adminurl + 'user/profile',
                method: 'POST',
                withCredentials: true

            }).then(function(data){
              data=data.data;
              callback(data);
            });
        },
        storeAnswer: function(option, callback) {
            //console.log('Navigation form data: ', formData);
            $http({
                url: adminurl + 'question/storeAnswer',
                method: 'POST',
                withCredentials: true,
                data: option

            }).then(function(data){
              data=data.data;
              callback(data);
            });
        },
        storeUserData: function(data, callback) {
            $http({
                url: adminurl + 'user/storeUserData',
                method: 'POST',
                withCredentials: true,
                data: data

            }).then(function(data){
              data=data.data;
              callback(data);
            });
        },
        getFacebookDetails: function(callback) {
            $http.get(adminurl + "user/getFacebookDetails").then(function(data){
              data=data.data;
              callback(data);
            });
        },
        logout: function(callback) {
            $http({
                url: adminurl + 'register/logout',
                method: 'POST',
                withCredentials: true

            }).then(function(data){
              data=data.data;
              callback(data);
            });
        },
        storeLevel: function(data, callback) {
            $http({
                url: adminurl + 'question/storeLevel2',
                method: 'POST',
                withCredentials: true,
                data: data

            }).then(function(data){
              data=data.data;
              callback(data);
            });
        },
        sendMessage: function(data, callback) {
            FB.ui({
                method: 'send',
                link: 'http://www.nytimes.com/interactive/2015/04/15/travel/europe-favorite-streets.html',
                redirect_uri: "http://jaipurpinkpanthers.com/pantherworld"
            });
        },
        makeactive: function(menuname) {
            for (var i = 0; i < navigation.length; i++) {
                if (navigation[i].name == menuname) {
                    navigation[i].classis = "active";
                } else {
                    navigation[i].classis = "";
                }
            }
            return menuname;
        },
        checkLevel: function(callback) {
            $http({
                url: adminurl + 'question/getQuestionDetail',
                method: 'POST',
                withCredentials: true
            }).then(function(data){
              data=data.data;
              callback(data);
            });
        },

    };
});
