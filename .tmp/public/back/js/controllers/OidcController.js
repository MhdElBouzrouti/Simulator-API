angular.module('SimulatorPartner').controller('OidcController', function($rootScope, $scope, $http, $timeout,$location,$auth) {
    $scope.$on('$viewContentLoaded', function() {
        // initialize core components
        App.initAjax();
    });
  if(!$auth.isAuthenticated()){
    $location.path('/');
  }
    // set sidebar closed and body solid layout mode
    $rootScope.settings.layout.pageContentWhite = true;
    $rootScope.settings.layout.pageBodySolid = false;
    $rootScope.settings.layout.pageSidebarClosed = false;
  $scope.users=[];
  $http({
    method:'GET',
    url:'/user'
  }).then(function (response) {
    console.log(response.data);
    $scope.users=response.data;

  },function (error) {
    console.log(error);
  });
});
