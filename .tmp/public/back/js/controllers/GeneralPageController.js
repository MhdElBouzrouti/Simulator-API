/* Setup general page controller */
angular.module('SimulatorPartner').controller('GeneralPageController', ['$rootScope', '$scope', 'settings','$auth', function($rootScope, $scope, settings,$auth) {
    $scope.$on('$viewContentLoaded', function() {
    	// initialize core components
    	App.initAjax();

    	// set default layout mode
    	$rootScope.settings.layout.pageContentWhite = true;
        $rootScope.settings.layout.pageBodySolid = false;
        $rootScope.settings.layout.pageSidebarClosed = false;
    });
  $rootScope.isAuthenticated=function () {
    return $auth.isAuthenticated();
  }
}]);
