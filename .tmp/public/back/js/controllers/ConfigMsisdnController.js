angular.module('SimulatorPartner').controller('ConfigMsisdnController', function($rootScope, $scope, $http, $timeout,$location,$auth) {
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
  $scope.addMsisdn=function () {
    // data structure
    var data={
      "country":$scope.country,
      "msisdn":$scope.msisdn,
      "description":$scope.description
    };
    // send data to the server
    $http.post('/msisdn',data).then(function (success) {
      $scope.country="";
      $scope.msisdn="";
      $scope.description="";

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
    $http.get('/msisdn?sort=updatedAt').then(function (success) {
      $scope.msisdns=success.data;
      console.log(success.data);
    });
  }

});
