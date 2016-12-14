export function routerCfg($stateProvider, $urlRouterProvider) {
    'ngInject';

    console.log($stateProvider);

    $stateProvider
        .state('sd', {
            url: '/'
        });

    $urlRouterProvider.otherwise('/');
}
