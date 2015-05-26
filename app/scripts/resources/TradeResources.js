(function () {
	'use strict';

	angular
		.module('currencyApp')
		.factory('TradeResource', [
			'$resource',
			'CONSTANTS',
			TradeResource
		]
	);

	function TradeResource($resource, CONSTANTS) {
		return $resource(CONSTANTS.apiUrl + '/trades/:id',
			{
				id: '@id'
			},
			{
				'update': {
					method: 'PUT'
				}
			});
	}

})();
