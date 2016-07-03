angular.module('MetronicApp').controller('LoginController', function($rootScope, $scope, $http, $timeout,$auth,$location) {
  $scope.$on('$viewContentLoaded', function() {
        App.initAjax(); // initialize core components

    });
  if($auth.isAuthenticated()){
    $location.path('/dashboard');
  }
    // set sidebar closed and body solid layout mode
    $rootScope.settings.layout.pageContentWhite = true;
    $rootScope.settings.layout.pageBodySolid = true;
    $rootScope.settings.layout.pageSidebarClosed = true;
  $scope.login=function () {
    $auth.login($scope.login_user).then(function () {
      $location.path('/dashboard');
    });
    $rootScope.isAuthenticated=function () {
     return $auth.isAuthenticated();
   }
  }
});
