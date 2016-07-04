angular.module('SimulatorPartner').controller('DashboardController', function($rootScope, $scope, $http, $timeout,$location,$auth) {
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
  //
  $scope.labels_api = ["January", "February", "March", "April", "May", "June", "July"];
  $scope.series_api= ['Form filling', 'check id'];
  $scope.data_api = [
    [20, 10, 44, 10, 0, 6, 10],
    [12, 35, 40, 19, 15, 27, 10]
  ];
  //
  $scope.labels_status = ["200", "404"];
  $scope.data_status = [124, 9];
  $scope.colours=["#E87E04","#3598DC","#26C281","#E08283","#F3C200","#9B59B6"];
  $scope.colours_status=["#26C281","#E87E04","#E08283","#F3C200","#9B59B6"];
  $scope.users=[];
  $scope.users_length=0;
  $scope.partner_length=0;
  $scope.resource_length=0;
  // get users
  $http({
    method:'GET',
    url:'/user'
  }).then(function (response) {
    $scope.users=response.data;
    $scope.users_length=response.data.length;
  },function (error) {
    console.log(error);
  });
  // get results
  $http({
    method:'GET',
    url:'/result?statusCode=200'
  }).then(function (response) {
    $scope.status_200=response.data.length;
  },function (error) {
    console.log(error);
  });
  // get results
  $http({
    method:'GET',
    url:'/result?statusCode=404'
  }).then(function (response) {
    $scope.status_404=response.data.length;
  },function (error) {
    console.log(error);
  });
  // get Partners
  $http({
    method:'GET',
    url:'/partner'
  }).then(function (response) {
    $scope.partner_length=response.data.length;
  },function (error) {
    console.log(error);
  });
  // get APi calls
  $http({
    method:'GET',
    url:'/resource'
  }).then(function (response) {
    $scope.resource_length=response.data.length;
  },function (error) {
    console.log(error);
  });
});
