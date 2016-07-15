angular.module('SimulatorPartner').controller('TestingController', function($rootScope, $scope, $http, $timeout,$location,$auth) {
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
  $scope.results=[];
  function loadData() {
    $http({
      method:'GET',
      url:'/result?sort=createdAt DESC'
    }).then(function (response) {
      console.log(response.data);
      $scope.results=response.data;

    },function (error) {
      console.log(error);
    });
  }
  loadData();

  $scope.removeData=function(id){
    $http.delete('/result/'+id).then(function (success) {
      loadData();
    });
  }
});
