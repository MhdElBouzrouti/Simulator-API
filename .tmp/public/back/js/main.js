/***
 Metronic AngularJS App Main Script
 ***/

/* Metronic App */
var MetronicApp = angular.module("MetronicApp", [
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
MetronicApp.config(['$ocLazyLoadProvider','$authProvider', function ($ocLazyLoadProvider,$authProvider) {
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
MetronicApp.factory('settings', ['$rootScope', function ($rootScope) {
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
MetronicApp.controller('AppController', ['$scope', '$rootScope', function ($scope, $rootScope) {
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
MetronicApp.controller('HeaderController', ['$scope','$auth', function ($scope,$auth) {
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
MetronicApp.controller('LogoutController', ['$scope','$auth','$location', function ($scope,$auth,$location) {
    if (!$auth.isAuthenticated()) { return; }
    $auth.logout()
      .then(function() {
        // toastr.info('You have been logged out');
        $location.path('/');
      });
}]);

/* Setup Layout Part - Sidebar */
MetronicApp.controller('SidebarController', ['$scope','$auth', function ($scope,$auth) {
  $scope.$on('$includeContentLoaded', function () {
    Layout.initSidebar(); // init sidebar
  });
  $scope.isAuthenticated=function () {
    return $auth.isAuthenticated();
  }
}]);



/* Setup Layout Part - Footer */
MetronicApp.controller('FooterController', ['$scope', function ($scope) {
  $scope.$on('$includeContentLoaded', function () {
    Layout.initFooter(); // init footer
  });
}]);

/* Setup Rounting For All Pages */
MetronicApp.config(['$stateProvider', '$urlRouterProvider','toastrConfig', function ($stateProvider, $urlRouterProvider,toastrConfig) {
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
            name: 'MetronicApp',
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
            name: 'MetronicApp',
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
            name: 'MetronicApp',
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
            name: 'MetronicApp',
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
            name: 'MetronicApp',
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
            name: 'MetronicApp',
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
    .state('confiOidc', {
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
    .state('configPartner', {
      url: "/configPartner",
      templateUrl: "views/configPartner.html",
      data: {pageTitle: 'Settings Dashboard'},
      controller: "ConfigPartnerController",
      resolve: {
        loginRequired: loginRequired,
        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
          return $ocLazyLoad.load({
            name: 'Configuration',
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
            name: 'Configuration',
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
    // Form Tools
    .state('formtools', {
      url: "/form-tools",
      templateUrl: "views/form_tools.html",
      data: {pageTitle: 'Form Tools'},
      controller: "GeneralPageController",
      resolve: {
        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
          return $ocLazyLoad.load([{
            name: 'MetronicApp',
            insertBefore: '#ng_load_plugins_before', // load the above css files before '#ng_load_plugins_before'
            files: [
              '../assets/global/plugins/bootstrap-fileinput/bootstrap-fileinput.css',
              '../assets/global/plugins/bootstrap-switch/css/bootstrap-switch.min.css',
              '../assets/global/plugins/bootstrap-markdown/css/bootstrap-markdown.min.css',
              '../assets/global/plugins/typeahead/typeahead.css',

              '../assets/global/plugins/fuelux/js/spinner.min.js',
              '../assets/global/plugins/bootstrap-fileinput/bootstrap-fileinput.js',
              '../assets/global/plugins/jquery-inputmask/jquery.inputmask.bundle.min.js',
              '../assets/global/plugins/jquery.input-ip-address-control-1.0.min.js',
              '../assets/global/plugins/bootstrap-pwstrength/pwstrength-bootstrap.min.js',
              '../assets/global/plugins/bootstrap-switch/js/bootstrap-switch.min.js',
              '../assets/global/plugins/bootstrap-maxlength/bootstrap-maxlength.min.js',
              '../assets/global/plugins/bootstrap-touchspin/bootstrap.touchspin.js',
              '../assets/global/plugins/typeahead/handlebars.min.js',
              '../assets/global/plugins/typeahead/typeahead.bundle.min.js',
              '../assets/pages/scripts/components-form-tools-2.min.js',

              'js/controllers/GeneralPageController.js'
            ]
          }]);
        }]
      }
    })

    // Date & Time Pickers
    .state('pickers', {
      url: "/pickers",
      templateUrl: "views/pickers.html",
      data: {pageTitle: 'Date & Time Pickers'},
      controller: "GeneralPageController",
      resolve: {
        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
          return $ocLazyLoad.load([{
            name: 'MetronicApp',
            insertBefore: '#ng_load_plugins_before', // load the above css files before '#ng_load_plugins_before'
            files: [
              '../assets/global/plugins/clockface/css/clockface.css',
              '../assets/global/plugins/bootstrap-datepicker/css/bootstrap-datepicker3.min.css',
              '../assets/global/plugins/bootstrap-timepicker/css/bootstrap-timepicker.min.css',
              '../assets/global/plugins/bootstrap-colorpicker/css/colorpicker.css',
              '../assets/global/plugins/bootstrap-datetimepicker/css/bootstrap-datetimepicker.min.css',

              '../assets/global/plugins/bootstrap-datepicker/js/bootstrap-datepicker.min.js',
              '../assets/global/plugins/bootstrap-timepicker/js/bootstrap-timepicker.min.js',
              '../assets/global/plugins/clockface/js/clockface.js',
              '../assets/global/plugins/bootstrap-colorpicker/js/bootstrap-colorpicker.js',
              '../assets/global/plugins/bootstrap-datetimepicker/js/bootstrap-datetimepicker.min.js',

              '../assets/pages/scripts/components-date-time-pickers.min.js',

              'js/controllers/GeneralPageController.js'
            ]
          }]);
        }]
      }
    })

    // Custom Dropdowns
    .state('dropdowns', {
      url: "/dropdowns",
      templateUrl: "views/dropdowns.html",
      data: {pageTitle: 'Custom Dropdowns'},
      controller: "GeneralPageController",
      resolve: {
        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
          return $ocLazyLoad.load([{
            name: 'MetronicApp',
            insertBefore: '#ng_load_plugins_before', // load the above css files before '#ng_load_plugins_before'
            files: [
              '../assets/global/plugins/bootstrap-select/css/bootstrap-select.min.css',
              '../assets/global/plugins/select2/css/select2.min.css',
              '../assets/global/plugins/select2/css/select2-bootstrap.min.css',

              '../assets/global/plugins/bootstrap-select/js/bootstrap-select.min.js',
              '../assets/global/plugins/select2/js/select2.full.min.js',

              '../assets/pages/scripts/components-bootstrap-select.min.js',
              '../assets/pages/scripts/components-select2.min.js',

              'js/controllers/GeneralPageController.js'
            ]
          }]);
        }]
      }
    })

    // Advanced Datatables
    .state('datatablesAdvanced', {
      url: "/datatables/managed.html",
      templateUrl: "views/datatables/managed.html",
      data: {pageTitle: 'Advanced Datatables'},
      controller: "GeneralPageController",
      resolve: {
        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
          return $ocLazyLoad.load({
            name: 'MetronicApp',
            insertBefore: '#ng_load_plugins_before', // load the above css files before '#ng_load_plugins_before'
            files: [
              '../assets/global/plugins/datatables/datatables.min.css',
              '../assets/global/plugins/datatables/plugins/bootstrap/datatables.bootstrap.css',

              '../assets/global/plugins/datatables/datatables.all.min.js',

              '../assets/pages/scripts/table-datatables-managed.min.js',

              'js/controllers/GeneralPageController.js'
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
MetronicApp.run(["$rootScope", "settings", "$state", function ($rootScope, settings, $state) {
  $rootScope.$state = $state; // state to be accessed from view
  $rootScope.$settings = settings; // state to be accessed from view
}]);
