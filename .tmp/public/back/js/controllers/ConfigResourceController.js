angular.module('SimulatorPartner').controller('ConfigResourceController', function($rootScope, $scope, $http, $timeout,$location,$auth) {
    $scope.$on('$viewContentLoaded', function() {
        // initialize core components
        App.initAjax();
    });
  if(!$auth.isAuthenticated()){
    $location.path('/');
  }
  $scope.addApiResource=function () {
    // data structure
    var data={
      "base":$scope.base_url,
      "offer":$scope.offer,
      "country":$scope.country,
      "version":$scope.version,
      "scope":$scope.scope,
      "path":$scope.path,
      "description":$scope.description
    };
    // send data to the server
    $http.post('/resource',data).then(function (success) {
      loadData();
    },function (failed) {

    });
  }

  $scope.apiResources=[];
  loadData();
    // set sidebar closed and body solid layout mode
    $rootScope.settings.layout.pageContentWhite = true;
    $rootScope.settings.layout.pageBodySolid = false;
    $rootScope.settings.layout.pageSidebarClosed = false;
  function loadData(){
    $http.get('/resource?sort=updatedAt').then(function (success) {
      $scope.apiResources=success.data;
      console.log(success.data);
    });
  }
  $scope.removeData=function(id){
    $http.delete('/resource/'+id).then(function (success) {
      loadData();
    });
  }

});

