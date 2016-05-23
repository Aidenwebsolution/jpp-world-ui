var adminURL = "";
// if (isproduction) {
//     adminURL = "http://www.wohlig.co.in/demo/index.php";
// } else {
    adminurl = "http://jppworld.in:1337/";
// }

var navigationservice = angular.module('navigationservice', [])

.factory('NavigationService', function($http) {
    var navigation = [{
            name: "HOME",
            classis: "active",
            anchor: "home",
            //     subnav:[{
            //   name: "HOME1",
            //   classis: "active",
            //   link: "home1",
            // },]
        },

        {
            name: "JPP 'TV'",
            anchor: "jpp-tv",
            classis: "active",
            subnav: []
        }, {
            name: "THE PANTHER DEN",
            anchor: "panthers-den",
            classis: "active",
            subnav: [{
                    name: "Panther Army",
                    classis: "active",
                    link: "panther-army",
                }, {
                    name: "Ultimate Panther",
                    classis: "active",
                    link: "#/ultimate-panther"
                },
                // {
                //     name: "#AuctionWithAbhishek",
                //     classis: "active",
                //     link: "#/auction"
                // },
                {
                    name: "#JPP Survey",
                    classis: "active",
                    link: "#/jpp-survey"
                },
            ]
        }, {
            name: "GAMES",
            anchor: "games",
            classis: "active",
            subnav: []
        }, {
            name: "NEWS & UPDATES",
            anchor: "news-updates",
            classis: "active",
            subnav: []
        }, {
            name: "GALLERY",
            anchor: "gallery",
            classis: "active",
            subnav: []
        }, {
            name: "PANTHER ROOM",
            anchor: "panther-room",
            classis: "active",
            subnav: []
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

            }).success(callback);
        },
        storeAnswer: function(option,callback) {
            //console.log('Navigation form data: ', formData);
            $http({
                url: adminurl + 'question/storeAnswer',
                method: 'POST',
                withCredentials: true,
                data:option

            }).success(callback);
        },
        storeUserData: function(data,callback) {
            $http({
                url: adminurl + 'user/storeUserData',
                method: 'POST',
                withCredentials: true,
                data:data

            }).success(callback);
        },
        getFacebookDetails: function(callback) {
            $http.get(adminurl + "user/getFacebookDetails").success(callback);
        },
        logout: function(callback) {
            //console.log('Navigation form data: ', formData);
            $http({
                url: adminurl + 'register/logout',
                method: 'POST',
                withCredentials: true

            }).success(callback);
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

    };
});
