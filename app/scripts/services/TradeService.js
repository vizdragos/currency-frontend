(function () {
	'use strict';

	angular
		.module('currencyApp')
		.factory('TradeService', [
			'TradeResource',
			tradeService
		]
	);

	function tradeService(TradeResource) {
		return {
			findAll: findAll,
			save: save
		};

		function findAll() {
			return TradeResource.query();
		}

		function save(trade) {
			return TradeResource.save(trade);
		}
	}

})();
