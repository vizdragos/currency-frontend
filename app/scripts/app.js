'use strict';

/**
 * @ngdoc overview
 * @name currencyApp
 * @description
 * # currencyApp
 *
 * Main module of the application.
 */
angular
	.module('currencyApp', [
		'ngAnimate',
		'ngAria',
		'ngCookies',
		'ngMessages',
		'ngResource',
		'ngRoute',
		'ngSanitize',
		'ngTouch',
		'ui.router'
	])

	.constant('CONSTANTS', {
		apiUrl: '/currency-backend'
	})

	.config([
		'$stateProvider',
		'$urlRouterProvider',
		function ($stateProvider, $urlRouterProvider) {

			$urlRouterProvider.otherwise('/trades');

			$stateProvider
				.state('trades', {
					url: '/trades',
					templateUrl: 'views/trades.html',
					controller: 'TradeController as vm'
				})

				.state('about', {
					url: '/about',
					templateUrl: 'views/about.html'
				});
		}]);
