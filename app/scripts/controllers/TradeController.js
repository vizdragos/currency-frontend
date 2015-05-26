(function () {
	'use strict';

	angular
		.module('currencyApp')
		.controller('TradeController', [
			'TradeService',
			TradeController
		]
	);

	function TradeController(TradeService) {
		var vm = this;

		var COUNTRIES = ['RO', 'FR', 'EN', 'DE', 'US'],
			CURRENCIES = ['EUR', 'GBP', 'RON', 'USD'];

		vm.refresh = function refresh() {
			vm.trades = TradeService.findAll();
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
				timePlaced: Math.floor((Math.random() * 31) + 1).toString() + '-May-15 ' + Math.floor((Math.random() * 12) + 1).toString() + ':' + Math.floor((Math.random() * 60) + 1).toString()+ ':' + Math.floor((Math.random() * 60) + 1).toString(),
				originatingCountry: COUNTRIES[Math.floor((Math.random() * 5) + 0)]
			};
			mockTrade.amountBuy = mockTrade.amountSell / mockTrade.rate;

			return mockTrade;
		}
	}

})();
