var adminURL = "";
if (isproduction) {
  adminURL = "http://www.wohlig.co.in/demo/index.php";
} else {
  adminURL = "http://localhost/demo/index.php";
}

var navigationservice = angular.module('navigationservice', [])

.factory('NavigationService', function() {
  var navigation = [{
    name: "HOME",
    classis: "active",
    anchor: "home",
    subnav:[{
  name: "HOME1",
  classis: "active",
  link: "home1",
},]
  },

   {
    name: "JPP'TV'",
    anchor: "jpp-tv",
    classis: "active",
    subnav:[]
  }, {
    name: "THE PANTHER DEN",
    anchor: "panthers-den",
    classis: "active",
    subnav: [{
        name: "Panther Army",
        classis: "active",
        link: "panther-army",
    },
    {
        name: "Ultimate Panther",
        classis: "active",
        link: "#/ultimate-panther"
    },
    {
        name: "#AuctionWithAbhishek",
        classis: "active",
        link: "#/auction"
    }, {
        name: "#JPP Survey",
        classis: "active",
        link: "#/jpp-survey"
    }, ]
  }, {
    name: "GAMES",
    anchor: "games",
    classis: "active",
    subnav:[]
  }, {
    name: "NEWS & UPDATES",
    anchor: "news-updates",
    classis: "active",
    subnav:[]
  }, {
    name: "GALLERY",
    anchor: "gallery",
    classis: "active",
    subnav:[]
  }, {
    name: "PANTHER ROOM",
    anchor: "panther-room",
    classis: "active",
    subnav:[]
  }];

  return {
    getnav: function() {
      return navigation;
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
