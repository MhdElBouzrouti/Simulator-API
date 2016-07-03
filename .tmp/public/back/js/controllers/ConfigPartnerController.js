angular.module('MetronicApp').controller('ConfigPartnerController', function($rootScope, $scope, $http, $timeout,$location,$auth) {
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
  $scope.addPartner=function () {
    // data structure
    var data={
      "client_id":$scope.client_id,
      "client_secret":$scope.client_secret,
      "redirect_uri":$scope.redirect_uri,
      "description":$scope.description
    };
    // send data to the server
    $http.post('/partner',data).then(function (success) {
      loadData();
    },function (failed) {

    });
  }
  $scope.partners=[];
    // set sidebar closed and body solid layout mode
    $rootScope.settings.layout.pageContentWhite = true;
    $rootScope.settings.layout.pageBodySolid = false;
    $rootScope.settings.layout.pageSidebarClosed = false;
  function loadData(){
    $http.get('/partner?sort=updatedAt').then(function (success) {
      $scope.partners=success.data;
      console.log(success.data);
    });
  }

});
