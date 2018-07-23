app = angular.module('IoChickApp', []);
app.config(function($interpolateProvider) {
  $interpolateProvider.startSymbol('{[{');
  $interpolateProvider.endSymbol('}]}');
});
app.controller('DashboardController', function ($http) {
    self = this;
    this.dispositivos_conectados = [];

    $http.get("http://localhost:8000/api/dispositivos_conectados/?format=json").then(function(response) {
        self.dispositivos_conectados = response.data;
    });
});