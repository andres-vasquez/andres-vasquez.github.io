angular.module('portfolioApp')
  .config(function($routeProvider){
    $routeProvider.when('/nav',{
      templateUrl:'/src/components/navMenu/navMenu.html'
    })

  });
