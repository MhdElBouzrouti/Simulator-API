angular.module('MetronicApp').controller('ConfigOidcController', function($rootScope, $scope, $http, $timeout,$location,$auth) {
    $scope.$on('$viewContentLoaded', function() {
        // initialize core components
        App.initAjax();
    });
  if(!$auth.isAuthenticated()){
    $location.path('/');
  }
  // load data
  loadData();
  // send data
  $scope.addOidc=function () {
    // data structure
    var data={
      "auth_uri":$scope.auth_uri,
      "token_uri":$scope.token_uri,
      "description":$scope.description
    };
    // send data to the server
    $http.post('/oidc',data).then(function (success) {
      loadData();
    },function (failed) {

    });
  }
    // set sidebar closed and body solid layout mode
    $rootScope.settings.layout.pageContentWhite = true;
    $rootScope.settings.layout.pageBodySolid = false;
    $rootScope.settings.layout.pageSidebarClosed = false;
  $scope.oidcs=[];
  function loadData(){
    $http.get('/oidc?sort=updatedAt').then(function (success) {
      $scope.oidcs=success.data;
      console.log(success.data);
    });
  }

});
