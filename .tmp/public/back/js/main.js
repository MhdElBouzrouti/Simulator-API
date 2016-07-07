/***
 AngularJS App Main Script
 ***/

/* Simulator App */
var SimulatorPartner = angular.module("SimulatorPartner", [
  "ui.router",
  "ui.bootstrap",
  "oc.lazyLoad",
  "ngSanitize",
  "chart.js",
  "toastr",
  "satellizer",
  "jsonFormatter"
]);

/* Configure ocLazyLoader(refer: https://github.com/ocombe/ocLazyLoad) */
SimulatorPartner.config(['$ocLazyLoadProvider','$authProvider', function ($ocLazyLoadProvider, $authProvider) {
  $ocLazyLoadProvider.config({
    // global configs go here
  });
  $authProvider.loginUrl = 'auth/login';
  $authProvider.tokenName = 'token';
  $authProvider.tokenPrefix = 'orange';

  $authProvider.oauth2({
    name: 'auth',
    clientId:'',
    url: 'auth/callback',
    authorizationEndpoint: '',
    redirectUri: 'http://checkandgo-orangegroup.rhcloud.com/auth/callback',
    requiredUrlParams: ['scope'],
    optionalUrlParams: ['display', 'state'],
    scope: ['form_filling'],
    scopePrefix: 'openid',
    scopeDelimiter: ' ',
    display: 'popup',
    oauthType: '2.0',
    popupOptions: {width: 1000, height: 700},
    state: function () {
      var rand = Math.random().toString(36).substr(2);
      return encodeURIComponent(rand);
    }
  });
}]);


/* Setup global settings */
SimulatorPartner.factory('settings', ['$rootScope', function ($rootScope) {
  // supported languages
  var settings = {
    layout: {
      pageSidebarClosed: false, // sidebar menu state
      pageContentWhite: true, // set page content layout
      pageBodySolid: false, // solid body color state
      pageAutoScrollOnLoad: 1000 // auto scroll to top on page load
    },
    assetsPath: '../assets',
    globalPath: '../assets/global',
    layoutPath: '../assets/layouts/layout2',
  };

  $rootScope.settings = settings;

  return settings;
}]);

/* Setup App Main Controller */
SimulatorPartner.controller('AppController', ['$scope', '$rootScope', function ($scope, $rootScope) {
  $scope.$on('$viewContentLoaded', function () {
    App.initComponents(); // init core components
    //Layout.init(); //  Init entire layout(header, footer, sidebar, etc) on page load if the partials included in server side instead of loading with ng-include directive
  });
}]);

/***
 Layout Partials.
 By default the partials are loaded through AngularJS ng-include directive. In case they loaded in server side(e.g: PHP include function) then below partial
 initialization can be disabled and Layout.init() should be called on page load complete as explained above.
 ***/

/* Setup Layout Part - Header */
SimulatorPartner.controller('HeaderController', ['$scope','$auth', function ($scope, $auth) {
  console.log($auth.getPayload());
  if($auth.isAuthenticated()){
  $scope.login=$auth.getPayload().sub;
  }else{
    $scope.login='';
  }
  $scope.isAuthenticated=function () {
    return $auth.isAuthenticated();
  }

  $scope.$on('$includeContentLoaded', function () {
    Layout.initHeader(); // init header
  });
}]);
SimulatorPartner.controller('LogoutController', ['$scope','$auth','$location', function ($scope, $auth, $location) {
    if (!$auth.isAuthenticated()) { return; }
    $auth.logout()
      .then(function() {
        // toastr.info('You have been logged out');
        $location.path('/');
      });
}]);

/* Setup Layout Part - Sidebar */
SimulatorPartner.controller('SidebarController', ['$scope','$auth', function ($scope, $auth) {
  $scope.$on('$includeContentLoaded', function () {
    Layout.initSidebar(); // init sidebar
  });
  $scope.isAuthenticated=function () {
    return $auth.isAuthenticated();
  }
}]);

/* Setup Layout Part - Footer */
SimulatorPartner.controller('FooterController', ['$scope', function ($scope) {
  $scope.$on('$includeContentLoaded', function () {
    Layout.initFooter(); // init footer
  });
}]);

/* Setup Rounting For All Pages */
SimulatorPartner.config(['$stateProvider', '$urlRouterProvider','toastrConfig', function ($stateProvider, $urlRouterProvider, toastrConfig) {
  // Redirect any unmatched url
  $urlRouterProvider.otherwise("/");

  angular.extend(toastrConfig, {
    target: 'html'
  });

  $stateProvider

  // Dashboard
    .state('dashboard', {
      url: "/dashboard",
      templateUrl: "views/dashboard.html",
      data: {pageTitle: 'Admin Dashboard'},
      controller: "DashboardController",
      resolve: {
        loginRequired: loginRequired,
        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
          return $ocLazyLoad.load({
            name: 'SimulatorPartner',
            insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
            files: [
              '../assets/global/plugins/morris/morris.css',
              '../assets/global/plugins/morris/morris.min.js',
              '../assets/global/plugins/morris/raphael-min.js',
              '../assets/global/plugins/jquery.sparkline.min.js',
              '../assets/pages/scripts/dashboard.min.js',
              'js/controllers/DashboardController.js'
            ]
          });
        }]
      }
    })
    .state('header', {
      controller:"HeaderController",
      resolve: {
        loginRequired: loginRequired,
      }
    })
    .state('sidebar', {
      controller:"SidebarController",
      resolve: {
        loginRequired: loginRequired,
      }
    })
    .state('logout', {
      url: "/logout",
      controller: "LogoutController",
    })
    .state('oidc', {
      url: "/oidc",
      templateUrl: "views/oidc.html",
      data: {pageTitle: 'Oidc Dashboard'},
      controller: "OidcController",
      resolve: {
        loginRequired: loginRequired,
        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
          return $ocLazyLoad.load({
            name: 'SimulatorPartner',
            insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
            files: [
              '../assets/global/plugins/morris/morris.css',
              '../assets/global/plugins/morris/morris.min.js',
              '../assets/global/plugins/morris/raphael-min.js',
              '../assets/global/plugins/jquery.sparkline.min.js',
              '../assets/pages/scripts/dashboard.min.js',
              'js/controllers/OidcController.js'
            ]
          });
        }]
      }
    })
    .state('testing', {
      url: "/testing",
      templateUrl: "views/testing.html",
      data: {pageTitle: 'Testing API'},
      controller: "TestingController",
      resolve: {
        loginRequired: loginRequired,
        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
          return $ocLazyLoad.load({
            name: 'SimulatorPartner',
            insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
            files: [
              '../assets/global/plugins/morris/morris.css',
              '../assets/global/plugins/morris/morris.min.js',
              '../assets/global/plugins/morris/raphael-min.js',
              '../assets/global/plugins/jquery.sparkline.min.js',

              '../assets/pages/scripts/dashboard.min.js',
              'js/controllers/TestingController.js'
            ]
          });
        }]
      }
    })
    .state('simulator', {
      url: "/front",
      templateUrl: "views/ux_simulator.html",
      data: {pageTitle: 'Partner Simulator'},
      controller: "UxSimulatorController",
      resolve: {
        loginRequired: loginRequired,

        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
          return $ocLazyLoad.load({
            name: 'SimulatorPartner',
            insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
            files: [
              '../assets/global/plugins/morris/morris.css',
              '../assets/global/plugins/morris/morris.min.js',
              '../assets/global/plugins/morris/raphael-min.js',
              '../assets/global/plugins/jquery.sparkline.min.js',

              '../assets/pages/scripts/dashboard.min.js',
              'js/controllers/UxSimulatorController.js'
            ]
          });
        }]
      }
    })
    .state('performance', {
      url: "/performance",
      templateUrl: "views/performance.html",
      data: {pageTitle: 'API Performance'},
      controller: "PerformanceController",
      resolve: {
        loginRequired: loginRequired,
        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
          return $ocLazyLoad.load({
            name: 'SimulatorPartner',
            insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
            files: [
              '../assets/global/plugins/morris/morris.css',
              '../assets/global/plugins/morris/morris.min.js',
              '../assets/global/plugins/morris/raphael-min.js',
              '../assets/global/plugins/jquery.sparkline.min.js',

              '../assets/pages/scripts/dashboard.min.js',
              'js/controllers/PerformanceController.js'
            ]
          });
        }]
      }
    })
    .state('login', {
      url: "/",
      templateUrl: "views/login.html",
      data: {pageTitle: 'login'},
      controller: "LoginController",
      resolve: {
          skipIfLoggedIn: skipIfLoggedIn,
        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
          return $ocLazyLoad.load({
            name: 'SimulatorPartner',
            insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
            files: [
              '../assets/global/plugins/morris/morris.css',
              '../assets/pages/css/login.css',
              '../assets/global/plugins/morris/morris.min.js',
              '../assets/global/plugins/morris/raphael-min.js',
              '../assets/global/plugins/jquery.sparkline.min.js',
              '../assets/pages/scripts/login.min.js',

              '../assets/pages/scripts/dashboard.min.js',
              'js/controllers/LoginController.js'
            ]
          });
        }]
      }
    })
    .state('configOidc', {
      url: "/configOidc",
      templateUrl: "views/configOidc.html",
      data: {pageTitle: 'Settings Dashboard'},
      controller: "ConfigOidcController",
      resolve: {
        loginRequired: loginRequired,
        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
          return $ocLazyLoad.load({
            name: 'OIDC',
            insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
            files: [
              '../assets/global/plugins/morris/morris.css',
              '../assets/global/plugins/morris/morris.min.js',
              '../assets/global/plugins/morris/raphael-min.js',
              '../assets/global/plugins/jquery.sparkline.min.js',
              '../assets/pages/scripts/dashboard.min.js',
              'js/controllers/ConfigOidcController.js'
            ]
          });
        }]
      }
    })
    .state('configMsisdn', {
      url: "/configMsisdn",
      templateUrl: "views/configMsisdn.html",
      data: {pageTitle: 'Settings MSISDN'},
      controller: "ConfigMsisdnController",
      resolve: {
        loginRequired: loginRequired,
        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
          return $ocLazyLoad.load({
            name: 'SimulatorPartner',
            insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
            files: [
              '../assets/global/plugins/morris/morris.css',
              '../assets/global/plugins/morris/morris.min.js',
              '../assets/global/plugins/morris/raphael-min.js',
              '../assets/global/plugins/jquery.sparkline.min.js',
              '../assets/pages/scripts/dashboard.min.js',
              'js/controllers/ConfigMsisdnController.js'
            ]
          });
        }]
      }
    })
    .state('configPartner', {
      url: "/configPartner",
      templateUrl: "views/configPartner.html",
      data: {pageTitle: 'Settings Dashboard'},
      controller: "ConfigPartnerController",
      resolve: {
        loginRequired: loginRequired,
        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
          return $ocLazyLoad.load({
            name: 'SimulatorPartner',
            insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
            files: [
              '../assets/global/plugins/morris/morris.css',
              '../assets/global/plugins/morris/morris.min.js',
              '../assets/global/plugins/morris/raphael-min.js',
              '../assets/global/plugins/jquery.sparkline.min.js',
              '../assets/pages/scripts/dashboard.min.js',
              'js/controllers/ConfigPartnerController.js'
            ]
          });
        }]
      }
    })
    .state('configResource', {
      url: "/configResource",
      templateUrl: "views/configResource.html",
      data: {pageTitle: 'Setting Dashboard'},
      controller: "ConfigResourceController",
      resolve: {
        loginRequired: loginRequired,
        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
          return $ocLazyLoad.load({
            name: 'SimulatorPartner',
            insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
            files: [
              '../assets/global/plugins/morris/morris.css',
              '../assets/global/plugins/morris/morris.min.js',
              '../assets/global/plugins/morris/raphael-min.js',
              '../assets/global/plugins/jquery.sparkline.min.js',
              '../assets/pages/scripts/dashboard.min.js',
              'js/controllers/ConfigResourceController.js'
            ]
          });
        }]
      }
    })

  function skipIfLoggedIn($q, $auth,$location) {
    var deferred = $q.defer();
    if ($auth.isAuthenticated()) {
      //deferred.reject();
      $location.path('/front');
    } else {
      deferred.resolve();
    }
    return deferred.promise;
  }

  function loginRequired($q, $location, $auth) {
    var deferred = $q.defer();
    if ($auth.isAuthenticated()) {
      deferred.resolve();
    } else {
      $location.path('/');
    }
    return deferred.promise;
  }

}]);

/* Init global settings and run the app */
SimulatorPartner.run(["$rootScope", "settings", "$state", function ($rootScope, settings, $state) {
  $rootScope.$state = $state; // state to be accessed from view
  $rootScope.$settings = settings; // state to be accessed from view
}]);
