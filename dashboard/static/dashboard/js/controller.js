app = angular.module('IoChickApp', []);
app.config(function ($interpolateProvider) {
    $interpolateProvider.startSymbol('{[{');
    $interpolateProvider.endSymbol('}]}');
});
app.config(['$httpProvider', function($httpProvider) {
    //initialize get if not there
    if (!$httpProvider.defaults.headers.get) {
        $httpProvider.defaults.headers.get = {};
    }

    // Answer edited to include suggestions from comments
    // because previous version of code introduced browser-related errors

    //disable IE ajax request caching
    $httpProvider.defaults.headers.get['If-Modified-Since'] = 'Mon, 26 Jul 1997 05:00:00 GMT';
    // extra
    $httpProvider.defaults.headers.get['Cache-Control'] = 'no-cache';
    $httpProvider.defaults.headers.get['Pragma'] = 'no-cache';
}]);
app.controller('DashboardController', function ($http, $interval, $timeout) {
    var self = this;
    this.dispositivos_conectados = [];
    this.loading = true;

    function atualizar_dados_dispositivos() {
        $http.get("/api/dispositivos_conectados/?format=json", {cache: false}).then(function (response) {
            self.dispositivos_conectados = response.data;

            // Percorrendo os dispositivos para obter os sensores de cada dispositivo
            self.dispositivos_conectados.forEach(function (dispositivo) {
                if (dispositivo.schema !== undefined) {
                    dispositivo.schema.forEach(function (sensor) {
                        atualizar_dados_sensor(dispositivo, sensor);
                    });
                }
            });
        }).catch(function (error, status){
            self.loading = false;
        });
    }

    function atualizar_dados_sensor(dispositivo, sensor) {
        $http.get("/api/obter_dados_dispositivo/" + dispositivo.uuid + "/" + sensor.sensor_id + "/?format=json", {cache: false}).then(function (response) {
            sensor.ultima_leitura = response.data[0];
            self.loading = false;
        }).catch(function (error, status){
            self.loading = false;
        });
    }

    this.ativar_atuador = function(dispositivo, sensor) {
        $http.get("/api/ativar_atuador/" + dispositivo.uuid + "/" + sensor.sensor_id + "/?format=json", {cache: false}).then(function (response) {
            self.loading = true;
            sensor.ultima_leitura.value = null;
            $timeout( function(){
                atualizar_dados_sensor(dispositivo, sensor);
            }, 3000);
        });
    };

    this.desativar_atuador = function(dispositivo, sensor) {
        $http.get("/api/desativar_atuador/" + dispositivo.uuid + "/" + sensor.sensor_id + "/?format=json", {cache: false}).then(function (response) {
            self.loading = true;
            sensor.ultima_leitura.value = null;
            $timeout( function(){
                atualizar_dados_sensor(dispositivo, sensor);
            }, 3000);
        });
    };

    function init() {
        self.loading = true;
        self.dispositivos_conectados = [];
        atualizar_dados_dispositivos();
    }

    // Inicializando as chamadas a API do KNoT.
    init();
    $interval(init, 30 * 1000)
});