angular.module('SimulatorPartner').controller('UxSimulatorController', function($rootScope, $scope, $http, $timeout,$auth,$window,SatellizerConfig,$location,$auth) {
    $scope.$on('$viewContentLoaded', function() {
        // initialize core components
        App.initAjax();
    });
  if(!$auth.isAuthenticated()){
    $location.path('/');
  }

  $scope.oidcs=[];
  $scope.apiResources=[];
  $scope.partners=[];
  $scope.result_api;

  var selectedOption={
    oidcId:-1,
    resourceId:-1,
    partnerId:-1,
    msisdnId:-1
  };

  $scope.configuration={
    client_id:'',
    api_resource:'',
    scope:''
  };

  $scope.selectedOption=selectedOption;

  // 1 - Send Configuration to the Server
  $scope.sendConfig=function () {
    console.log($scope.selectedOption);
    $http.post('/config',$scope.selectedOption).then(function (succed) {
      console.log(succed);
    },function (failed) {
      console.log(failed);
    });
  };
  // 2 - Give Consent to service provider
  $scope.authorization=function () {
    $scope.result_api={};
    // get oidc information
    var id_oidc =getItem($scope.selectedOption.oidcId,$scope.oidcs);
    if(id_oidc !=-1)
      var auth_uri=$scope.oidcs[id_oidc].auth_uri;

    // get partner information
    var id_partner =getItem($scope.selectedOption.partnerId,$scope.partners);
    if(id_partner!=-1){
      var client_id=$scope.partners[id_partner].client_id;
      $scope.configuration.client_id=client_id;
    // get redirect id information
      var redirect_uri=$scope.partners[id_partner].redirect_uri;
    }
    var id_resource = getItem($scope.selectedOption.resourceId,$scope.apiResources);
    if(id_resource!=-1) var scope=$scope.apiResources[id_resource].scope;
    $scope.configuration.scope=scope;
    $scope.configuration.api_resource=$scope.apiResources[id_resource].base+'/'+$scope.apiResources[id_resource].offer+'/'+$scope.apiResources[id_resource].country+'/'+$scope.apiResources[id_resource].version+'/'+$scope.apiResources[id_resource].path;

    SatellizerConfig.providers['auth'].clientId=client_id;
    SatellizerConfig.providers['auth'].authorizationEndpoint=auth_uri;
    SatellizerConfig.providers['auth'].scope=[scope];
    $auth.authenticate('auth').then(function(response) {
      $scope.result_api=response.data;
      console.log(response);
    },function (error) {
      $scope.result_api=error.data;
    });

  }
  $scope.isAuthenticated=function () {
    return $auth.isAuthenticated();
  }


  // OpenID Provider
  $http.get('/oidc').then(function (succed) {
    $scope.oidcs=succed.data;
  },function (failed) {
  });

  // API Resource
  $http.get('/resource').then(function (succed) {
    $scope.apiResources=succed.data;
  },function (failed) {
  });

  // Partner Data
  $http.get('/partner').then(function (succed) {
    $scope.partners=succed.data;
  },function (failed) {
  });


    // set sidebar closed and body solid layout mode
    $rootScope.settings.layout.pageContentWhite = true;
    $rootScope.settings.layout.pageBodySolid = false;
    $rootScope.settings.layout.pageSidebarClosed = false;

  // get Selected Item
  function getItem(id,list){
    for(var i=0;i<list.length;++i){
      if(list[i].id==id)
        return i;
    }
    return -1;
  }
});
