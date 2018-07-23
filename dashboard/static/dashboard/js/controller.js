app = angular.module('IoChickApp', []);
app.config(function ($interpolateProvider) {
    $interpolateProvider.startSymbol('{[{');
    $interpolateProvider.endSymbol('}]}');
});
app.controller('DashboardController', function ($http, $interval) {
    var self = this;
    this.dispositivos_conectados = [];
    this.loading = true;

    function atualizar_dados_dispositivos() {
        $http.get("http://localhost:8000/api/dispositivos_conectados/?format=json").then(function (response) {
            self.dispositivos_conectados = response.data;

            // Percorrendo os dispositivos para obter os sensores de cada dispositivo
            self.dispositivos_conectados.forEach(function (dispositivo) {
                if (dispositivo.schema !== undefined) {
                    dispositivo.schema.forEach(function (sensor) {
                        atualizar_dados_sensor(dispositivo, sensor);
                    });
                }
            });
        });
    }

    function atualizar_dados_sensor(dispositivo, sensor) {
        $http.get("http://localhost:8000/api/obter_dados_dispositivo/" + dispositivo.uuid + "/" + sensor.sensor_id + "/?format=json").then(function (response) {
            sensor.ultima_leitura = response.data[0];
            self.loading = false;
            return sensor;
        });
    }

    this.ativar_atuador = function(dispositivo, sensor) {
        $http.get("http://localhost:8000/api/ativar_atuador/" + dispositivo.uuid + "/" + sensor.sensor_id + "/?format=json").then(function (response) {
            self.loading = true;
            sensor = atualizar_dados_sensor(dispositivo, sensor);

            if (self.dispositivos_conectados.indexOf(sensor) !== -1) {
                self.dispositivos_conectados[index] = sensor;
            }
        });
    };

    this.desativar_atuador = function(dispositivo, sensor) {
        $http.get("http://localhost:8000/api/desativar_atuador/" + dispositivo.uuid + "/" + sensor.sensor_id + "/?format=json").then(function (response) {
            self.loading = true;
            sensor = atualizar_dados_sensor(dispositivo, sensor);

            if (self.dispositivos_conectados.indexOf(sensor) !== -1) {
                self.dispositivos_conectados[index] = sensor;
            }
        });
    };

    function init() {
        self.loading = true;
        self.dispositivos_conectados = [];
        atualizar_dados_dispositivos();

        // Repetindo as chamadas a cada 10 segundos.
        $interval(init, 10 * 1000);
    }

    // Inicializando as chamadas a API do KNoT.
    init();
});