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
  }, {
    name: "JPP'TV'",
    anchor: "jpp-tv",
    classis: "active"
  }, {
    name: "THE PANTHER DEN",
    anchor: "panthers-den",
    classis: "active"
  }, {
    name: "GAMES",
    anchor: "games",
    classis: "active"
  }, {
    name: "NEWS & UPDATES",
    anchor: "news-updates",
    classis: "active"
  }, {
    name: "GALLERY",
    anchor: "gallery",
    classis: "active"
  }, {
    name: "PANTHER ROOM",
    anchor: "panther-room",
    classis: "active"
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
