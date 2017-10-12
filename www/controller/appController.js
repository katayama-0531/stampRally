var app = ons.bootstrap("navi", ["onsen"]);
app.controller('AppController', function($scope) {
    console.log("AppController");
});
ons.ready(function() {
    console.log("Onsen UI is ready!");
});