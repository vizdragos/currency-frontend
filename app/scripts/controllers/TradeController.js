(function () {
	'use strict';

	angular
		.module('currencyApp')
		.controller('TradeController', [
			'CONSTANTS',
			'TradeService',
			TradeController
		]
	);

	function TradeController(CONSTANTS, TradeService) {
		var vm = this;


		var COUNTRIES = ['RO', 'FR', 'EN', 'DE', 'US'],
			CURRENCIES = ['EUR', 'GBP', 'RON', 'USD'];

		vm.refresh = function refresh() {

			TradeService.findAll()
				.$promise.then(function (trades) {
					vm.trades = angular.copy(trades);
					vm.tradesViaSocket = angular.copy(trades);

					angular.forEach(trades, function (trade) {
						_filterTradesPerCountry(trade);
					});
				})
		}

		vm.refresh();

		vm.sendMockTrade = function sendMockTrade() {
			TradeService.save(_generateMock());
		}

		function _generateMock() {
			var mockTrade = {
				userId: Math.floor((Math.random() * 150) + 1).toString(),
				currencyFrom: CURRENCIES[Math.floor((Math.random() * 4) + 0)],
				currencyTo: CURRENCIES[Math.floor((Math.random() * 4) + 0)],
				amountSell: 1000 * Math.random().toFixed(2),
				amountBuy: 0,
				rate: Math.random().toFixed(2),
				timePlaced: Math.floor((Math.random() * 31) + 1).toString() + '-May-15 ' + Math.floor((Math.random() * 12) + 1).toString() + ':' + Math.floor((Math.random() * 60) + 1).toString() + ':' + Math.floor((Math.random() * 60) + 1).toString(),
				originatingCountry: COUNTRIES[Math.floor((Math.random() * 5) + 0)]
			};
			mockTrade.amountBuy = mockTrade.amountSell / mockTrade.rate;

			return mockTrade;
		}

		//SOCKETIO
		var socket = {
			client: null,
			stomp: null
		};

		function _notify(/** Message */ message) {
			var trade = angular.fromJson(message.body);
			vm.tradesViaSocket.push(trade);
			_filterTradesPerCountry(trade);
		};

		function _reconnect() {
			setTimeout(_initSockets, 10000);
		};

		function _initSockets() {
			socket.client = new SockJS(CONSTANTS.apiUrl + '/notify');
			socket.stomp = Stomp.over(socket.client);
			socket.stomp.connect({}, function () {
				socket.stomp.subscribe("/topic/notify", _notify);
			});
			socket.client.onclose = _reconnect;
		};

		_initSockets();


		// CHART
		vm.labels = [];
		vm.data = [];

		var tradesPerCountry = {};

		function _filterTradesPerCountry(trade) {
			if (tradesPerCountry[trade.originatingCountry]) {
				tradesPerCountry[trade.originatingCountry] = tradesPerCountry[trade.originatingCountry] + 1;
			} else {
				tradesPerCountry[trade.originatingCountry] = 1;
			}

			_updateChartLabels();
			_updateChartData();
		}

		function _updateChartLabels() {
			var labels = [];
			for (var prop in tradesPerCountry) {
				labels.push(prop);
			}
			vm.labels = labels;
		};

		function _updateChartData() {
			var data = [];
			for (var prop in tradesPerCountry) {
				data.push(tradesPerCountry[prop]);
			}
			vm.data = data;
		};
	}

})();
