angular.module('MetronicApp').controller('PerformanceController', function ($rootScope, $scope, $http, $timeout,$location,$auth) {
  $scope.$on('$viewContentLoaded', function () {
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

  $scope.tokens = [];
  $scope.performResults = [];

  $scope.labels_api = [];
  $scope.series_api = [];
  $scope.data_api = [
    []
  ];


  $http({
    method: 'GET',
    url: '/token?limit=1&sort=createdAt DESC',
  }).then(function (response) {
    $scope.tokens = response.data;

  }, function (error) {
    console.log(error);
  });
$scope.callResource=function () {
  var token_id=$scope.selectedToken;
  var position=getItem(token_id,$scope.tokens);
  var accessToken=$scope.tokens[position].access_token;
  var times=$scope.times;
  var url=$scope.tokens[position].resource;
  $scope.series_api.push($scope.tokens[position].resource);

  $http({
    method: 'POST',
    url: '/perfom',
    data:  {
      accessToken:accessToken,
      times: times,
      url: url
    }
  }).then(function (response) {
    console.log(response.data);
    $scope.performResults = response.data;
    loadData();

  }, function (error) {
    console.log(error);
    loadData();
  });


}

  function  loadData(){
    $scope.data_api[0]=[];
    $scope.labels_api=[];
    for(var i=0;i< $scope.performResults.length;i++){
      $scope.data_api[0].push($scope.performResults[i].responseTime);
      $scope.labels_api.push(i+1);
    }
  }


  // get Selected Item
  function getItem(id,list){
    for(var i=0;i<list.length;++i){
      if(list[i].id==id)
        return i;
    }
    return -1;
  }
});
