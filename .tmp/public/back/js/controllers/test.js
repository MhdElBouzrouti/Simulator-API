"use strict";
angular.module("common", ["ngRoute", "ngResource", "pascalprecht.translate", "ui.bootstrap.showErrors", "ui.bootstrap.modal", "ui.bootstrap.dropdown"]).constant("commonConfig", {
  api: {
    timeout: 60,
    configureTimeout: 1,
    url: "/api/v1/"
  }, i18n: {"default": "en", languages: ["en"], mapping: {"en_*": "en", "*": "en"}}, notification: {autoClose: 10}
}).config(["$locationProvider", function (a) {
  a.html5Mode(!0)
}]).config(["$translateProvider", "commonConfig", function (a, b) {
  var c = b.i18n, d = c["default"];
  a.useSanitizeValueStrategy(null).registerAvailableLanguageKeys(c.languages, c.mapping).preferredLanguage(d).useStaticFilesLoader({
    prefix: "static/i18n/",
    suffix: ".json"
  }).fallbackLanguage(d)
}]).config(["showErrorsConfigProvider", function (a) {
  a.showSuccess(!0), a.trigger("input")
}]).config(["$httpProvider", function (a) {
  a.interceptors.push("HttpInterceptor")
}]), angular.module("dev", ["common", "ui.bootstrap.carousel", "grecaptcha", "validation.match"]).config(["$routeProvider", function (a) {
  a.when("/", {
    templateUrl: "views/home.html",
    controller: "HomeCtrl",
    pageClass: "home"
  }).when("/myapps", {
    templateUrl: "views/dashboard.html",
    controller: "DashboardCtrl",
    authenticated: !0,
    pageClass: "container dashboard"
  }).when("/myapps/:appId", {
    templateUrl: "views/application.html",
    controller: "ApplicationCtrl",
    authenticated: !0,
    pageClass: "container application"
  }).when("/signup", {
    templateUrl: "views/signup.html",
    controller: "SignupCtrl",
    pageClass: "container signup"
  }).when("/signup/:token", {
    templateUrl: "views/validate-account.html",
    controller: "ValidateAccountCtrl",
    pageClass: "container"
  }).when("/signin", {
    templateUrl: "views/signin.html",
    controller: "SigninCtrl",
    pageClass: "container signin"
  }).when("/forgot", {
    templateUrl: "views/forgot-password.html",
    controller: "ForgotPasswordCtrl",
    pageClass: "container change-password"
  }).when("/forgot/:token", {
    templateUrl: "views/change-password.html",
    controller: "ResetPasswordCtrl",
    pageClass: "container change-password"
  }).when("/apis", {
    templateUrl: "views/apis.html",
    controller: "ApisCtrl",
    pageClass: "container apis",
    reloadOnSearch: !1
  }).when("/password", {
    templateUrl: "views/change-password.html",
    controller: "ChangePasswordCtrl",
    authenticated: !0,
    pageClass: "container change-password"
  }).when("/terms/:termsId", {
    templateUrl: "views/terms.html",
    controller: "TncCtrl",
    authenticated: !0,
    pageClass: "container terms"
  }).when("/myapps/:appId/:action", {
    templateUrl: "views/add-api.html",
    controller: "AddApiCtrl",
    authenticated: !0,
    pageClass: "container addapi"
  }).when("/profile", {
    templateUrl: "views/profile.html",
    controller: "ProfileCtrl",
    pageClass: "container profile",
    authenticated: !0
  }).when("/tools", {
    templateUrl: "views/tools.html",
    controller: "ToolsCtrl",
    pageClass: "container tools"
  }).when("/tools/brand-guidelines", {
    templateUrl: "views/include-static.html",
    controller: "BrandCtrl",
    pageClass: "container technical-article"
  }).when("/tools/:content", {
    templateUrl: "views/all-static-content.html",
    controller: "AllStaticContentCtrl",
    pageClass: "container all-static-content"
  }).when("/support", {
    templateUrl: "views/support.html",
    controller: "SupportCtrl",
    pageClass: "container support"
  }).when("/support/technical-guides", {
    templateUrl: "views/technical-channel.html",
    controller: "TechnicalChannelCtrl",
    pageClass: "container technical-channel"
  }).when("/support/technical-guides/:article", {
    templateUrl: "views/include-static.html",
    controller: "TechnicalArticleCtrl",
    pageClass: "container technical-article"
  }).when("/support/contact-us", {
    templateUrl: "views/contact-us.html",
    controller: "ContactCtrl",
    pageClass: "container contact-us"
  }).when("/support/terms-and-conditions", {
    templateUrl: "views/include-static.html",
    controller: "GeneralTerms",
    pageClass: "container technical-article"
  }).when("/orange-apis-general-terms", {
    templateUrl: "views/include-static.html",
    controller: "GeneralTerms",
    pageClass: "container technical-article"
  }).when("/support/:content", {
    templateUrl: "views/all-static-content.html",
    controller: "AllStaticContentCtrl",
    pageClass: "container all-static-content"
  }).when("/apis/:apiId/:contentId?", {
    templateUrl: "views/api-content.html",
    controller: "ApiContentCtrl",
    pageClass: "api-content"
  }).when("/404", {
    templateUrl: "views/404.html",
    controller: "NotFoundCtrl",
    pageClass: "not-found"
  }).otherwise({redirectTo: "/404"})
}]).config(["showErrorsConfigProvider", function (a) {
  a.showSuccess(!0), a.trigger("input")
}]).config(["grecaptchaProvider", "commonConfig", "pfsConfig", function (a, b, c) {
  a.setLanguage(b.i18n["default"]), a.setParameters({sitekey: c.recaptcha})
}]).run(["$rootScope", "$translate", "$location", "$anchorScroll", "pfsConfig", "appConfig", "cookies", "analytics", function (a, b, c, d, e, f, g, h) {
  function i(a) {
    for (var b, c, d = a.length; d; b = Math.floor(Math.random() * d), c = a[--d], a[d] = a[b], a[b] = c);
    return a
  }

  function j() {
    m && clearTimeout(m);
    var b = new Date;
    b.setMonth(b.getMonth() + 13), g.set("acceptCookies", 1, {expires: b, path: "/"}), a.privacy = !1
  }

  a.appConfig = f, a.pfsConfig = e, h.init();
  for (var k = [], l = 0; l < 5; l++)k.push("orange-secondary-color-" + l);
  a.colors = i(k), a.load = function () {
    c.hash() && d()
  }, a.getContentsPath = function (a, b) {
    return (a.hidden || a.internal ? f.privateUrl : f.publicUrl) + a.id + "/current/" + b + "/"
  }, a.getGeneralContentsPath = function () {
    return f.publicUrl + "general/current/"
  };
  var m = !1;
  g.get("acceptCookies") || (a.privacy = !0, a.hidePrivacy = j, m = setTimeout(j, 2e4)), a.$on("$routeChangeStart", function (b, d) {
    a.load();
    var f = d && d.$$route, h = "undefined" != typeof g.get(e.authCookie.name);
    if (h && f && "/signin" === f.originalPath)b.preventDefault(); else if (!h && f && f.authenticated) {
      b.preventDefault();
      var i = c.path();
      c.path("/signin").search("r", i)
    }
  });
  var n = 0, o = "general.title";
  a.$on("$routeChangeSuccess", function (c, d) {
    a.breadcrumbs = [], b(o).then(function (b) {
      a.title = b
    }), a.description = "";
    var e = d.$$route;
    e && (a.pageClass = e.pageClass || "", 1 === n && j(), n++)
  }), a.setMeta = function (c) {
    var d = "menu." + c, e = "meta." + c;
    b([o, d, e]).then(function (b) {
      a.title = b[d] !== d ? b[o] + " - " + b[d] : b[o], a.description = b[e] !== e ? b[e] : ""
    })
  }, a.setTitle = function (c) {
    b(o).then(function (b) {
      a.title = b + " - " + c
    })
  }, a.setDescription = function (b) {
    a.description = b || ""
  }
}]), angular.module("dev").constant("appConfig", {
  publicUrl: "public/",
  privateUrl: "private/",
  home: {offers: {columns: 4, size: 8}, carousel: 5e3},
  password: {timeout: 120, pattern: "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^a-zA-Z0-9]).*$"},
  application: {
    stats: [{
      label: "application.stats.week",
      value: "days_7",
      queryUnit: "day"
    }, {label: "application.stats.month", value: "days_30", queryUnit: "day"}, {
      label: "application.stats.3months",
      value: "months_3",
      queryUnit: "week"
    }, {label: "application.stats.6months", value: "months_6", queryUnit: "week"}, {
      label: "application.stats.year",
      value: "years_1",
      queryUnit: "month"
    }]
  },
  contact: {
    types: [{group: "account", value: "account_activation_email"}, {
      group: "account",
      value: "account_issue"
    }, {group: "account", value: "account_delete", auth: !0}, {
      group: "account",
      value: "account_other"
    }, {group: "subscriptions", value: "subscriptions_coding_issue"}, {
      group: "subscriptions",
      value: "subscriptions_cloud_test_account",
      auth: !0
    }, {group: "subscriptions", value: "subscriptions_revoked", auth: !0}, {
      group: "subscriptions",
      value: "subscriptions_other"
    }, {group: "apis", value: "apis_mistake"}, {group: "apis", value: "apis_improvement"}, {
      group: "apis",
      value: "apis_business"
    }, {group: "apis", value: "apis_other"}],
    reasons: ["not_interested", "not_created", "too_complicated", "poor_service", "other"]
  },
  legal: [{name: "info", target: "_blank"}, {name: "about", target: "_blank"}, {name: "cookies", target: "_blank"}],
  footer: [{name: "apis", url: "/apis"}, {name: "tools", url: "/tools"}, {
    name: "support",
    url: "/support"
  }, {name: "more"}],
  apis: [{name: "Identity", url: "/apis?search=Identity"}, {
    name: "Payment",
    url: "/apis?search=Payment"
  }, {name: "Communication", url: "/apis?search=Communication"}, {
    name: "Cloud",
    url: "/apis?search=Cloud"
  }, {name: "IoT", url: "/apis?search=IoT"}, {name: "Proximity", url: "/apis?search=Proximity"}, {
    name: "Africa",
    url: "/apis?search=Africa"
  }, {name: "More", url: "/apis?search=More"}],
  tools: [{name: "code-samples-and-sdk"}, {name: "monitor", url: "/myapps"}, {
    name: "user-testing",
    target: "_blank"
  }, {name: "testing-kit", target: "_blank"}, {name: "brand-guidelines"}],
  support: [{name: "technical-guides"}, {name: "faq"}, {name: "stack", target: "_blank"}],
  more: [{name: "terms-and-conditions", url: "/orange-apis-general-terms"}, {
    name: "partner",
    target: "_blank"
  }, {name: "news", target: "_blank"}],
  jobs: ["application_software_developer", "blogger", "communication_new_media", "customer_relationship", "application_software_designer", "marketing", "sales_business_development", "senior_management", "strategy_consulting", "technical"],
  activities: ["accelerator_incubator", "content_aggregator", "corporate_enterprise", "device_hardwar_manufacturer", "digital_media_adversing_agency", "games_publisher", "independant_developer", "independant_software_vendor", "internet_services", "skills_consultancy", "systems_integrator", "software_application_publisher", "technology_vendor", "telecom_operator", "value_added_reseller", "venture_capital"],
  countries: ["AF", "AX", "AL", "DZ", "AS", "AD", "AO", "AI", "AQ", "AG", "AR", "AM", "AW", "AU", "AT", "AZ", "BS", "BH", "BD", "BB", "BY", "BE", "BZ", "BJ", "BM", "BT", "BO", "BA", "BW", "BV", "BR", "IO", "VG", "BN", "BG", "BF", "BI", "KH", "CM", "CA", "CV", "KY", "CF", "TD", "CL", "CN", "CX", "CC", "CO", "KM", "CG", "CD", "CK", "CR", "HR", "CU", "CW", "CY", "CZ", "DK", "DJ", "DM", "DO", "EC", "EG", "SV", "GQ", "ER", "EE", "ET", "FK", "FO", "FJ", "FI", "FR", "GF", "PF", "TF", "GA", "GM", "GE", "DE", "GH", "GI", "GR", "GL", "GD", "GP", "GU", "GT", "GG", "GN", "GW", "GY", "HT", "HM", "HN", "HK", "HU", "IS", "IN", "ID", "IR", "IQ", "IE", "IM", "IL", "IT", "CI", "JM", "JP", "JE", "JO", "KZ", "KE", "KI", "KW", "KG", "LA", "LV", "LB", "LS", "LR", "LY", "LI", "LT", "LU", "MO", "MK", "MG", "MW", "MY", "MV", "ML", "MT", "MH", "MQ", "MR", "MU", "YT", "MX", "FM", "MD", "MC", "MN", "ME", "MS", "MA", "MZ", "MM", "NA", "NR", "NP", "NL", "AN", "NC", "NZ", "NI", "NE", "NG", "NU", "NF", "MP", "KP", "NO", "OM", "PK", "PW", "PS", "PA", "PG", "PY", "PE", "PH", "PN", "PL", "PT", "PR", "QA", "RE", "RO", "RU", "RW", "BL", "SH", "KN", "LC", "MF", "PM", "VC", "WS", "SM", "ST", "SA", "SN", "RS", "SC", "SL", "SG", "SK", "SI", "SB", "SO", "ZA", "GS", "KR", "ES", "LK", "SD", "SR", "SJ", "SZ", "SE", "CH", "SY", "TW", "TJ", "TZ", "TH", "TL", "TG", "TK", "TO", "TT", "TN", "TR", "TM", "TC", "TV", "VI", "UG", "UA", "AE", "GB", "US", "UM", "UY", "UZ", "VU", "VA", "VE", "VN", "WF", "EH", "YE", "ZM", "ZW"]
}), angular.module("common").service("Notification", ["$rootScope", function (a) {
  function b(b, c, d, e) {
    a.$emit("notification.add", b, c, d, e)
  }

  this.success = function (a, c) {
    b("success", a, c)
  }, this.warn = function (a, c, d) {
    b("warning", a, c, d)
  }, this.error = function (a, c) {
    b("danger", a, c)
  }, this.clear = function (b) {
    a.$emit("notification.clear", b)
  }
}]).controller("NotificationCtrl", ["$scope", "$rootScope", "$timeout", "$translate", "$sce", "commonConfig", function (a, b, c, d, e, f) {
  function g(b) {
    for (var c = a.notifications, d = 0, e = -1, f = c.length; d < f; d++)if (c[d].id === b) {
      e = d;
      break
    }
    return e
  }

  function h(b) {
    var d = a.notifications, e = g(b), f = d[e];
    f && (d.splice(e, 1), f.promise && c.cancel(f.promise), delete n[f.type + f.message])
  }

  function i(b, d, g) {
    c(function () {
      if (!n[b + d]) {
        n[b + d] = !0;
        var h = g || m++;
        a.notifications.push({
          id: h,
          type: b,
          message: e.trustAsHtml(d),
          dismissable: !g,
          promise: "success" === b && c(function () {
            j(h)
          }, 1e3 * f.notification.autoClose)
        }), a.showNotifications = !0
      }
    }, 0)
  }

  function j(b) {
    var c = a.notifications;
    if (b === !0)for (var d = c.length; d > 0;)h(c[0].id), d--; else if (b)h(b); else for (var e = c.length - 1; e >= 0;)c[e].dismissable && h(c[e].id), e--;
    a.showNotifications = c.length > 0
  }

  function k(a, b, c, e) {
    d(b, c).then(function (c) {
      var d = l(b, c);
      d !== !1 ? i(a, d, e) : console.warn("i18n key not found", b)
    })
  }

  function l(a, b) {
    var c = !1;
    if (angular.isArray(a))for (var d = 0, e = a.length; d < e; d++) {
      var f = a[d];
      if (f !== b[f]) {
        c = b[f];
        break
      }
    } else a !== b && (c = b);
    return c
  }

  var m = 0, n = {};
  a.showNotifications = !1, a.notifications = [], a.closeNotification = h;
  var o = b.$on("notification.add", function (a, b, c, d, e) {
    k(b, c, d, e)
  });
  b.$on("$destroy", o);
  var p = b.$on("$routeChangeStart", function () {
    j()
  });
  b.$on("$destroy", p);
  var q = b.$on("notification.clear", function (a, b) {
    j(b)
  });
  b.$on("$destroy", q)
}]), angular.module("common").service("modalConfirm", ["$uibModal", function (a) {
  this.open = function (b, c, d) {
    return a.open({
      templateUrl: "common/views/modal-confirm.html",
      controller: "ModalConfirmCtrl",
      resolve: {
        title: function () {
          return b
        }, message: function () {
          return c
        }, messageParams: function () {
          return d || {}
        }
      }
    })
  }
}]).controller("ModalConfirmCtrl", ["$scope", "title", "message", "messageParams", function (a, b, c, d) {
  a.title = b, a.message = c, a.messageParams = d
}]), angular.module("common").service("toaster", ["$rootScope", function (a) {
  this.show = function () {
    a.$emit("toaster-show")
  }, this.hide = function () {
    a.$emit("toaster-hide")
  }
}]).directive("toaster", ["$rootScope", function (a) {
  return {
    replace: !0,
    restrict: "EA",
    transclude: !0,
    scope: !0,
    template: '<div class="toaster-container" ng-class="{\'toaster-hide\':hidden}"><div class="toaster"><ng-transclude></ng-transclude></div></div>',
    controller: ["$scope", function (a) {
      a.hidden = !0
    }],
    link: function (b) {
      a.$on("toaster-show", function () {
        b.hidden = !1
      }), a.$on("toaster-hide", function () {
        b.hidden = !0
      })
    }
  }
}]), angular.module("common").directive("floatingElement", ["$window", "$document", function (a, b) {
  return {
    restrict: "A", scope: {fixedBottom: "=", offset: "@"}, link: function (c, d) {
      function e() {
        var e = d[0], g = a.pageYOffset || b.prop("body").scrollTop;
        if (f || (f = e.getBoundingClientRect().top + g), g > f) {
          e.style.position = "fixed", e.style.top = "0px", e.style.bottom = "";
          var h = e.parentNode.getBoundingClientRect().bottom, i = e.getBoundingClientRect().bottom;
          c.offset && (e[c.offset].style.marginTop = e.offsetHeight + "px"), c.fixedBottom && i > h && (e.style.position = "absolute", e.style.top = "", e.style.bottom = "0px")
        } else e.style.position = "", e.style.top = "", e.style.bottom = "", c.offset && (e[c.offset].style.marginTop = "")
      }

      var f = !1;
      a.addEventListener("scroll", e), c.$on("$destroy", function () {
        a.removeEventListener("scroll", e)
      })
    }
  }
}]), angular.module("common").directive("loaderButton", function () {
  return {
    restrict: "A", scope: {loading: "=", disabled: "=ngDisabled"}, compile: function (a, b) {
      return a.addClass("loader-button"), b.icon && a.append(angular.element('<span class="default glyphicon ' + b.icon + '"></span>')), b.label && a.append(angular.element('<span class="default" translate="' + b.label + '"></span>')), a.append(angular.element('<span class="loader"><span class="glyphicon icon-reload_refresh rotate-infinite" aria-hidden="true"></span>' + (b.icon ? "" : '<span class="icon-label" translate="general.loading"></span>') + "</span>")), {
        pre: function (a, b) {
          var c = !1, d = function () {
            c = !0, b.addClass("loading")
          }, e = function () {
            b.removeClass("loading"), c = !1
          };
          a.$watch("loading", function () {
            b.attr("disabled", a.disabled || a.loading), a.loading && !c ? d() : !a.loading && c && e()
          })
        }
      }
    }
  }
}), angular.module("common").directive("autofocus", ["$timeout", function (a) {
  return {
    restrict: "A", link: function (b, c) {
      var d = c[0];
      d.focus && a(function () {
        d.focus()
      }, 100)
    }
  }
}]), angular.module("common").directive("backToTop", ["$window", "$document", function (a, b) {
  return {
    restrict: "A",
    template: '<button type="button" onclick="window.scrollTo(0,0)" ng-show="displayBackToTop" class="back-to-top" title="{{\'general.back-to-top\'|translate}}"><span class="glyphicon icon-arrow-up" aria-hidden="true"></span></button>',
    replace: !0,
    link: function (c) {
      function d() {
        var d = a.pageYOffset || b.prop("body").scrollTop;
        c.displayBackToTop = d > 300, c.$apply()
      }

      a.addEventListener("scroll", d), c.$on("$destroy", function () {
        a.removeEventListener("scroll", d)
      }), c.displayBackToTop = !1
    }
  }
}]), angular.module("common").service("Menu", ["$rootScope", function (a) {
  this.signedIn = function (b) {
    a.$emit("user.signedIn", b)
  }, this.signedOut = function () {
    a.$emit("user.signedOut")
  }
}]), angular.module("common").factory("Cache", ["$rootScope", "$q", function (a, b) {
  var c = {}, d = {}, e = {};
  return {
    setConfig: function (a) {
      e = a
    }, get: function (c, f) {
      var g = e[c], h = g.key || c, i = g.method || "query", j = d[h];
      if (!j) {
        var k = b.defer();
        if (j = d[h] = k.promise, !a[h]) {
          var l = "query" === i ? [] : {};
          l._loading = !0, a[h] = l, f = !0
        }
        f ? g.resource[i](g.params, function (b) {
          delete d[h], a[h] = b, k.resolve(b)
        }, function (b) {
          delete d[h], delete a[h], k.reject(b)
        }) : (delete d[h], k.resolve(a[h]))
      }
      return j
    }, getPartial: function (d, f, g, h) {
      var i = b.defer(), j = e[d], k = j.key || d, l = a[k], m = function () {
        c[k] = j.resource.get({id: f}, i.resolve, i.reject)
      };
      if (h && c[k] && !c[k]._loading && (g && c[k].id === f && (g(c[k]), g = null), c[k] = null), c[k] && c[k].id === f)i.resolve(c[k]); else if (g && l && !l._loading) {
        for (var n = !1, o = 0, p = l.length; o < p; o++) {
          var q = l[o];
          if (q.id === f) {
            g(q), m(), n = !0;
            break
          }
        }
        n || i.reject({status: 404})
      } else m();
      return i.promise
    }, find: function (c, d, f) {
      var g = e[c].key || c, h = b.defer(), i = function () {
        for (var b = !1, c = a[g], e = 0, i = c.length; e < i; e++) {
          var j = c[e];
          if (d(j, e)) {
            b = !0, h.resolve(f(j, e));
            break
          }
        }
        b || h.reject({status: 404})
      };
      return this.get(g).then(i)["catch"](h.reject), h.promise
    }, findById: function (a, b) {
      return this.find(a, function (a) {
        return a.id === b
      }, function (a) {
        return a
      })
    }, update: function (b, c) {
      var d = e[b].key || b, f = a[d];
      if (f && !f._loading)for (var g = 0, h = f.length; g < h; g++)if (f[g].id === c.id) {
        f[g] = c;
        break
      }
    }, remove: function (b, c) {
      var d = e[b].key || b, f = a[d];
      if (f && !f._loading)for (var g = 0, h = f.length; g < h; g++)if (f[g].id === c) {
        f.splice(g, 1);
        break
      }
    }
  }
}]), angular.module("common").factory("cookies", ["$document", function (a) {
  function b() {
    e = {};
    var b = a.prop("cookie");
    b = b ? b.replace(/ /g, "").split(";") : [];
    for (var c = 0, f = b.length; c < f; c++) {
      var g = b[c], h = g.indexOf("="), i = d(g.substring(0, h)), j = d(g.substring(h + 1));
      e[i] = {value: j}
    }
  }

  function c(b) {
    var c = e[b], d = c.options || {}, f = [encodeURIComponent(b), "=", encodeURIComponent(c.value), d.expires ? ";expires=" + d.expires.toUTCString() : "", d.path ? ";path=" + d.path : "", d.domain ? ";domain=" + d.domain : ""].join("");
    a.prop("cookie", f)
  }

  function d(a) {
    try {
      return decodeURIComponent(a)
    } catch (b) {
      return a
    }
  }

  var e = {};
  return {
    get: function (a) {
      return b(), e[a] && e[a].value
    }, set: function (a, b, d) {
      a && (e[a] = {value: b, options: d || {}}, c(a))
    }, remove: function (a, b, c) {
      a && (this.set(a, "", {path: b, domain: c, expires: new Date(0)}), delete e[a])
    }
  }
}]), angular.module("dev").controller("DashboardCtrl", ["$rootScope", "$scope", "$location", "Notification", "Application", "HttpInterceptor", "toaster", "Cache", function (a, b, c, d, e, f, g, h) {
  a.setMeta("myapps"), a.breadcrumbs = [{name: "menu.myapps"}], b.loading = !1, b.dashboardLoading = !0, b.steps = ["dashboard.howTo.step1", "dashboard.howTo.step2", "dashboard.howTo.step3", "dashboard.howTo.step4"], b.createApp = function () {
    b.loading = !0, d.clear(), e.save({name: b.name, description: b.description}, function (b) {
      c.path("/myapps/" + b.id), d.success("dashboard.declare.success", {name: b.name}), a.applications.push(b)
    }, function (a) {
      f.manageError(a, {prefix: "dashboard", keys: {403: 1}}), b.loading = !1
    })
  }, g.show(), h.getApplications(!0).then(function () {
    g.hide(), b.dashboardLoading = !1
  })["catch"](function (a) {
    g.hide(), b.dashboardLoading = !1, f.manageError(a)
  })
}]), angular.module("dev").controller("SignupCtrl", ["$rootScope", "$scope", "$location", "$http", "$sce", "$window", "commonConfig", "Notification", "Auth", "HttpInterceptor", "grecaptcha", "Cache", function (a, b, c, d, e, f, g, h, i, j, k, l) {
  function m() {
    p(), j.manageError({status: 500})
  }

  function n() {
    q = !0, l.getGeneral().then(function (a) {
      a.terms.status = "rejected", b.term = a.terms, b.profile.terms = {id: a.terms.id}, a.terms.url ? (b.downloadUrl = g.api.url + "download-terms/" + a.terms.url, o(a.terms.url)) : (q = !1, r = !0)
    })["catch"](function () {
      q = !1, r = !0, t && (b.loading = !1, m())
    })
  }

  function o(a) {
    d.get(a).success(function (a) {
      b.content = e.trustAsHtml(a), s = !0, q = !1, t && (b.step++, b.loading = !1)
    }).error(function () {
      q = !1, r = !0, t && (b.loading = !1, m())
    })
  }

  function p() {
    k.reset(), b.profile.captcha = ""
  }

  a.setMeta("signup"), a.breadcrumbs = [{name: "signup.title"}], b.profile = {employee: !0}, b.step = 0, b.loading = !1, b.signup = !0, b.profileSubmitLabel = "signup.next", b.submitLabel = "tnc.submit", b.subtitle = ["signup.subtitle-form", "signup.subtitle-tnc"];
  var q = !1, r = !1, s = !1, t = !1;
  b.submitProfile = function () {
    s ? (b.step++, f.scrollTo(0, 0)) : q ? (b.loading = !0, t = !0) : r && m()
  }, b.acceptTerms = function () {
    b.loading = !0, h.clear();
    var a = b.profile;
    a.terms.status = "accepted", i.signUp(a, function () {
      b.loading = !1, h.success("signup.success", {email: a.email}), c.path("/")
    }, function (c) {
      b.loading = !1, b.step = 0, t = !1, b.confirmEmail = a.email, p(), j.manageError(c, {
        prefix: "signup",
        keys: {401: 1, "412_201": 1}
      })
    })
  }, n()
}]), angular.module("dev").controller("SigninCtrl", ["$rootScope", "$scope", "$location", "$routeParams", "Notification", "Menu", "Auth", "HttpInterceptor", function (a, b, c, d, e, f, g, h) {
  a.setMeta("signin"), a.breadcrumbs = [], a.me = null, a.offers = null, b.auth = new g, b.loading = !1, b.signIn = function () {
    b.loading = !0, e.clear(), b.auth.$signIn(function () {
      b.loading = !1, f.signedIn(d.r || "/myapps")
    }, function (a) {
      b.loading = !1, b.auth.password = "", h.manageError(a, {
        prefix: "signin",
        keys: {401: 1, 404: 1, 412: 1}
      }, {email: b.auth.login})
    })
  }
}]), angular.module("dev").controller("ForgotPasswordCtrl", ["$rootScope", "$scope", "$location", "Notification", "Auth", "HttpInterceptor", function (a, b, c, d, e, f) {
  b.loading = !1, a.setMeta("forgot"), a.breadcrumbs = [{name: "password.forgot.title"}], b.forgot = function () {
    b.loading = !0, d.clear(), e.forgotPassword({email: b.email}, function (a) {
      204 === a ? d.warn("password.forgot.notActivated", {email: b.email}) : d.success("password.forgot.success"), c.path("/")
    }, function (a) {
      b.loading = !1, f.manageError(a)
    })
  }
}]), angular.module("dev").controller("ApisCtrl", ["$window", "$rootScope", "$scope", "$routeParams", "$location", "Cache", "HttpInterceptor", "toaster", "appConfig", "cookies", "Menu", "pfsConfig", function (a, b, c, d, e, f, g, h, i, j, k, l) {
  function m() {
    b.breadcrumbs = [{
      name: "menu.apis",
      href: "/apis"
    }], c.category && (0 === c.category.indexOf("internal_") ? b.breadcrumbs = [{name: "apis.internal"}, {name: c.category.substring("internal_".length, c.category.length)}] : b.breadcrumbs.push({name: c.category}))
  }

  function n(a, b) {
    var c, d, e = [];
    for (c = 0, d = -1; c < a.length; c++)c % b === 0 && (d++, e[d] = []), e[d].push(a[c]);
    return e
  }

  b.setMeta("apis"), b.breadcrumbs = [{name: "menu.apis"}];
  var o = angular.copy(i.apis);
  c.Math = Math, c.nbColumns = 4, c.category = d.search;
  var p = c.$on("$routeUpdate", function () {
    c.category = e.search().search, c.prepareOffers() && m()
  });
  c.$on("$destroy", p), c.prepareOffers = function () {
    var a, d, f, g = !1, h = b.offers, i = h.length;
    for (a = 0; a < o.length; a++)for (f = o[a], c.category && c.category === f.name ? (f.open = !0, g = !0) : f.open = !1, f.offers = [], d = 0; d < i; d++)h[d].tags.indexOf(f.name) === -1 || h[d].internal || f.offers.push(h[d]);
    c.categories = n(o, 4);
    var j = {};
    for (a = 0; a < i; a++) {
      var k = h[a];
      if (k.internal)for (d = 0; d < k.tags.length; d++)j[k.tags[d]] || (j[k.tags[d]] = []), j[k.tags[d]].push(k)
    }
    c.internalCategories = [];
    for (f in j) {
      var l = {name: f, offers: j[f]};
      c.category && c.category === "internal_" + f ? (l.open = !0, g = !0) : l.open = !1, c.internalCategories.push(l)
    }
    return c.internalCategories.sort(function (a, b) {
      return "more" === a.name.toLowerCase() ? 1 : "more" === b.name.toLowerCase() ? -1 : a.name > b.name ? 1 : a.name < b.name ? -1 : 0
    }), c.internalCategories = n(c.internalCategories, 4), !(c.category && !g) || (e.search(""), void e.path("/404").replace())
  };
  var q = b.$watch("offers", function (a) {
    a && a.length > 0 && (c.prepareOffers() && m(), c.active = !0)
  });
  c.$on("$destroy", q);
  var r = "undefined" != typeof j.get(l.authCookie.name);
  !r && b.me && k.signedOut(), h.show(), f.getOffers(!0)["catch"](g.managerError)["finally"](h.hide)
}]).directive("apisTile", function () {
  return {
    restrict: "A",
    templateUrl: "views/apis-tile.html",
    scope: {categories: "=", nbColumns: "=columns", url: "@", defaultClass: "@"}
  }
}), angular.module("dev").controller("ApplicationCtrl", ["$scope", "$routeParams", "$location", "$filter", "commonConfig", "appConfig", "Application", "HttpInterceptor", "toaster", "Cache", function (a, b, c, d, e, f, g, h, i, j) {
  function k(a) {
    return d("date")(a, "yyyy-MM-ddTHH:mm:ss'Z'")
  }

  function l(a) {
    var b = new Date, c = new Date(b.getTime()), d = a.value.split("_"), e = d[0], f = parseInt(d[1]);
    switch (e) {
      case"days":
        c.setDate(c.getDate() - f);
        break;
      case"months":
        c.setMonth(c.getMonth() - f);
        break;
      case"years":
        c.setFullYear(c.getFullYear() - f)
    }
    return {begin: k(c), end: k(b)}
  }

  a.tab = "basic", a.showTabs = !1, a.appId = b.appId, a.application = {}, a.dateStats = f.application.stats[1], i.show(), j.getApplication(a.appId, a.setPartialInfos, !0).then(function (b) {
    i.hide(), a.application = b, a.active = "revoked" !== b.clientIdStatus, a.refresh(b), a.updateTabs(), a.updateStats()
  })["catch"](function (a) {
    i.hide(), 404 === a.status ? c.path("/404").replace() : h.manageError(a)
  }), a.updateTabs = function () {
    for (var b = !1, c = 0, d = a.application.subscriptions, e = d.length; c < e; c++)if (d[c].product.authRequired) {
      b = !0;
      break
    }
    a.showTabs = b
  }, a.changeTab = function (b) {
    a.tab = b
  }, a.addOffer = function () {
    c.path("/myapps/" + a.application.id + "/addapi")
  }, a.toDateStr = function (a) {
    return d("date")(new Date(a), "dd/MM")
  }, a.updateStats = function (b) {
    a.statistics = null, a.statsDownloadUrl = null;
    var c = b && b.dateStats || a.dateStats, d = l(c);
    d.id = a.appId, d.unit = c.queryUnit, g.stats(d, function (b) {
      var c = {labels: b.dates || [], series: []};
      angular.forEach(b.data, function (a) {
        c.series.push({name: a.productName, data: a.values})
      }), a.statistics = c, a.statsDownloadUrl = [e.api.url, "csv/developers/me/applications/", a.appId, "/statistics?unit=day&begin=", d.begin, "&end=", d.end].join("")
    }, function (a) {
      h.manageError(a, {prefix: "application.stats", keys: {400: 1}})
    })
  }
}]), angular.module("dev").controller("ApplicationDetailsCtrl", ["$scope", "$rootScope", "$location", "$sce", "Notification", "Application", "HttpInterceptor", "modalConfirm", "Cache", "toaster", function (a, b, c, d, e, f, g, h, i, j) {
  function k() {
    var b = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      "\n": "<br/>"
    }, c = a.application.description.replace(/[&<>\n]/g, function (a) {
      return b[a] || a
    });
    a.description = d.trustAsHtml(c)
  }

  a.editApplication = {}, a.saving = !1, a.$parent.deletingApp = !1, b.setMeta("myapps.details"), b.breadcrumbs = [{
    href: "/myapps",
    name: "menu.myapps"
  }];
  var l = a.$parent.setPartialInfos = function (a) {
    b.breadcrumbs = [{href: "/myapps", name: "menu.myapps"}, {name: a.name}], k()
  }, m = a.$parent.refresh = function (b) {
    l(b), a.editApplication.name = a.application.name, a.editApplication.description = a.application.description
  };
  a.$parent.deleteApplication = function () {
    e.clear(), h.open("application.delete.modal", "application.delete.modal.message", {name: a.application.name}).result.then(function () {
      j.show(), a.$parent.deletingApp = !0, f["delete"]({id: a.application.id}, function () {
        j.hide(), a.$parent.deletingApp = !1, c.path("/myapps"), e.success("application.delete.success", {name: a.application.name}), i.removeApplication(a.application.id)
      }, function (b) {
        j.hide(), a.$parent.deletingApp = !1, 404 === b.status ? c.path("/404").replace() : g.manageError(b)
      })
    })
  }, a.toggleDetails = function () {
    a.isEditing = !a.isEditing, a.isEditing || (a.editApplication.name = a.application.name, a.editApplication.description = a.application.description)
  }, a.saveDetails = function () {
    a.saving = !0, e.clear(), f.update({
      id: a.application.id,
      name: a.editApplication.name,
      description: a.editApplication.description
    }, function (b) {
      a.saving = !1, a.isEditing = !1, a.$broadcast("show-errors-reset"), e.success("application.details.save.success"), a.application.name = b.name, a.application.description = b.description, m(a.application)
    }, function (b) {
      a.editApplication.name = a.application.name, a.editApplication.description = a.application.description, k(), g.manageError(b), a.saving = !1, a.isEditing = !1
    })
  }
}]), angular.module("dev").controller("ApplicationCredentialsCtrl", ["$scope", "$timeout", "$location", "appConfig", "Notification", "Application", "HttpInterceptor", "modalPassword", "modalConfirm", "toaster", function (a, b, c, d, e, f, g, h, i, j) {
  function k(c) {
    e.clear(), h.open("application.creds.passwordRequired").result.then(function (e) {
      b.cancel(l), l = b(function () {
        a.passwordValidated = !1, a.credentials = !1
      }, 1e3 * d.password.timeout), a.passwordValidated = e, c()
    })
  }

  a.credsLoading = !1, a.renewLoading = !1, a.passwordValidated = !1;
  var l;
  a.renewClientId = function () {
    a.passwordValidated ? i.open("application.renewKey.modal", "application.renewKey.modal.message").result.then(function () {
      e.clear(), j.show(), a.renewLoading = !0, f.credentials({
        id: a.application.id,
        action: "renew",
        token: a.passwordValidated
      }, function (b) {
        j.hide(), a.renewLoading = !1, a.credentials = {
          clientId: b.clientId,
          clientSecret: b.clientSecret,
          authorizationHeader: "Basic " + btoa(b.clientId + ":" + b.clientSecret)
        }, e.success("application.renewKey.success")
      }, function (b) {
        j.hide(), a.renewLoading = !1, a.passwordValidated = !1, 404 === b.status ? c.path("/404").replace() : g.manageError(b)
      })
    }) : k(a.renewClientId)
  }, a.showCrendentials = function () {
    k(function () {
      j.show(), a.credsLoading = !0, f.credentials({id: a.application.id, token: a.passwordValidated}, function (b) {
        j.hide(), a.credsLoading = !1, a.credentials = b, a.credentials.authorizationHeader = "Basic " + btoa(b.clientId + ":" + b.clientSecret), a.password = ""
      }, function (b) {
        j.hide(), a.credentials = !1, a.credsLoading = !1, a.password = "", a.passwordValidated = !1, 404 === b.status ? c.path("/404").replace() : g.manageError(b)
      })
    })
  }, a.hideCrendentials = function () {
    b.cancel(l), a.passwordValidated = !1, a.credentials = !1
  }
}]), angular.module("dev").controller("ApplicationSubscriptionsCtrl", ["$scope", "$window", "Notification", "ApplicationSubscription", "HttpInterceptor", "toaster", "modalConfirm", "modalConfigureApi", function (a, b, c, d, e, f, g, h) {
  a.configuring = {}, a.removeAPI = function (b, h) {
    c.clear();
    var i = h.offer.name, j = a.application.subscriptions;
    g.open("application.apis.remove.modal.title", "application.apis.remove.modal.message", {name: i}).result.then(function () {
      c.clear();
      var g = angular.element(b.target);
      g.attr("disabled", !0), f.show(), d["delete"]({id: h.id, appId: a.application.id}, function () {
        f.hide(), g.attr("disabled", !1);
        for (var b = 0, d = j.length; b < d; b++)if (j[b].id === h.id) {
          j.splice(b, 1);
          break
        }
        0 === j.length && (a.application.clientIdStatus = "pending"), c.success("application.apis.remove.success", {
          name: i,
          app: a.application.name
        }), a.updateTabs(), a.updateStats()
      }, function (a) {
        f.hide(), g.attr("disabled", !1), e.manageError(a, {
          prefix: "application.apis.remove",
          keys: {404: 1}
        }, {name: i})
      })
    })
  }, a.configureAPI = function (b) {
    c.clear(), a.configuring[b.id] = !0;
    var e = b.offer.name;
    d.configuration({appId: a.appId, id: b.id}, function (f) {
      a.configuring[b.id] = !1, f.url = f.url.replace(/^(http|https):/, ""), h.open("application.apis.configure", {name: e}, f).result.then(function (f) {
        "OK" === f ? c.success("application.apis.configure.success", {name: e}) : c.error("application.apis.configure.error", {name: e}), d.updateConfiguration({
          appId: a.appId,
          id: b.id
        }, {status: f})
      })
    }, function () {
      a.configuring[b.id] = !1, c.error("application.apis.configure.error", {name: e})
    })
  }, a.hasSubscribed = function (b) {
    var c = !1;
    return angular.forEach(a.application.subscriptions, function (a) {
      a.product.id === b.id && (c = !0)
    }), c
  }, b.configureAPI = a.configureAPI, a.$on("$destroy", function () {
    b.configure = null
  })
}]), angular.module("dev").controller("ValidateAccountCtrl", ["$rootScope", "$scope", "$routeParams", "$location", "Notification", "Menu", "Auth", "HttpInterceptor", function (a, b, c, d, e, f, g, h) {
  b.showInProgress = !0, a.setMeta("validate"), a.breadcrumbs = [], g.confirm({confirmToken: c.token}, function () {
    e.success("validateAccount.success"), f.signedIn("/myapps")
  }, function (a) {
    switch (b.showInProgress = !1, h.manageError(a, {prefix: "validateAccount", keys: {401: 1, 404: 1}}), a.status) {
      case 401:
        d.path("/forgot");
        break;
      default:
        d.path("/signin")
    }
  })
}]), angular.module("dev").controller("ApiContentCtrl", ["$rootScope", "$scope", "$routeParams", "$location", "$translate", "$anchorScroll", "$templateCache", "HttpInterceptor", "Cache", "toaster", "modalUseApi", function (a, b, c, d, e, f, g, h, i, j, k) {
  function l(b) {
    switch (j.hide(), b.status) {
      case 403:
        if (a.me)m(); else {
          var c = d.path();
          d.path("/signin").search({r: c})
        }
        break;
      case 404:
        m();
        break;
      default:
        h.manageError(b)
    }
  }

  function m() {
    d.path("/404").search({}).replace()
  }

  var n, o = [], p = c.contentId || "overview", q = ["overview", "getting-started", "api-reference", "code-sample", "pricing", "terms-and-conditions", "release-log", "faq"];
  b.versions = [], b.selected = {}, b.toggle = function (a) {
    a.open = !a.open
  }, b.expand = function (a, b) {
    a.open = !0;
    for (var c = 0, d = a.o, e = d.length; e > c; c++)d[c].open = b
  }, b.toggleErrors = function (a) {
    b.showErrors = a || !b.showErrors, f("errors")
  }, b.useApi = function () {
    if (a.me)k.open(b.offer); else {
      var c = d.path();
      d.path("/signin").search({r: c})
    }
  }, b.getPath = function (a, c) {
    var e;
    return c ? (e = "/apis/" + n.path + "/" + c, b.selected.id !== b.versions[0].id && (e += "?version=" + a)) : e = d.path() + "?version=" + a, e
  }, b.displayContent = function () {
    var f, h = 0, i = 0, j = [];
    for (o = b.selected.contents, h = 0; h < q.length; h++)for (i = 0; i < o.length; i++) {
      var k = o[i].type;
      k === q[h] && (k === p && (f = k, a.setDescription(o[i].description)), j.push(k))
    }
    if (b.displayedContents = j, e("apis.leftmenu." + p).then(function (b) {
        a.setTitle(n.name + " - " + b), a.breadcrumbs = [{
          href: "/apis",
          name: "menu.apis"
        }, {href: "/apis/" + c.apiId + "/", name: n.name}, {name: b}]
      }), f) {
      b.offer = n, b.type = f;
      var l = a.getContentsPath(n, b.selected.id) + f + ".html";
      g.remove(l), b.contentUrl = l
    } else d.path("/apis/" + n.path).search("version", b.selected.version)
  }, q.indexOf(p) !== -1 ? (b.active = !1, j.show(), i.getOfferByPath(c.apiId).then(function (a) {
    n = a;
    var c, e = angular.copy(n.product), f = n.previousProducts;
    if (b.versions.push(e), e.versionName = e.version + " (current)",
        f)for (var g = 0; g < f.length; g++) {
      var h = f[g];
      "deprecated" === h.status && (b.versions.push(h), h.versionName = h.version + " (deprecated)", d.search().version === h.version && (c = h))
    }
    c || (c = b.versions[0]), b.selected = c, b.displayContent(), j.hide(), b.active = !0
  })["catch"](l)) : l({status: 404})
}]), angular.module("dev").controller("ChangePasswordCtrl", ["$scope", "$rootScope", "$location", "Notification", "Auth", "HttpInterceptor", "Developer", function (a, b, c, d, e, f, g) {
  function h(b) {
    a.current = "", a.password = "", a.loading = !1, f.manageError(b, {
      prefix: "password.change",
      keys: {400: 1, 404: 1, "401_41": 1}
    })
  }

  function i(b) {
    e.password({token: b}, {password: a.password}, function () {
      c.path("/myapps"), d.success("password.change.success")
    }, h)
  }

  function j() {
    g.checkPassword({password: a.current}, function (a) {
      i(a.token)
    }, h)
  }

  b.setMeta("user.password"), b.breadcrumbs = [{name: "password.change.title"}], a.loading = !1, a.showCurrent = !0, a.subtitle = "password.change.subtitle", a.help = "password.change.help", a.changePassword = function () {
    d.clear(), a.loading = !0, j()
  }
}]), angular.module("dev").controller("ResetPasswordCtrl", ["$rootScope", "$scope", "$routeParams", "$location", "Notification", "Menu", "Auth", "HttpInterceptor", function (a, b, c, d, e, f, g, h) {
  a.setMeta("reset"), a.breadcrumbs = [{name: "password.reset.title"}], b.loading = !1, b.showCurrent = !1, b.subtitle = "password.reset.subtitle", b.help = "password.reset.help", b.changePassword = function () {
    e.clear(), b.loading = !0, g.password({token: c.token}, {password: b.password}, function () {
      e.success("password.reset.success"), f.signedIn("/myapps")
    }, function (a) {
      b.loading = !1, b.password = "", h.manageError(a, {
        prefix: "password.reset",
        keys: {401: 1, 404: 1}
      }), d.path("/forgot")
    })
  }
}]), angular.module("dev").service("modalPassword", ["$uibModal", function (a) {
  this.open = function (b) {
    return a.open({
      templateUrl: "views/modal-password.html",
      controller: "ModalPasswordCtrl",
      resolve: {
        message: function () {
          return b
        }
      }
    })
  }
}]).controller("ModalPasswordCtrl", ["$scope", "message", "Notification", "Developer", "HttpInterceptor", function (a, b, c, d, e) {
  a.loading = !1, a.message = b, a.checkPassword = function () {
    a.loading = !0, c.clear(), d.checkPassword({password: a.password}, function (b) {
      a.$close(b.token)
    }, function (b) {
      a.$dismiss(), a.loading = !1, e.manageError(b, {prefix: "password.check", keys: {400: 1, "401_41": 1}})
    })
  }
}]), angular.module("dev").controller("EndUserAuthCtrl", ["$scope", "$rootScope", "$uibModal", "Notification", "HttpInterceptor", "Application", "toaster", function (a, b, c, d, e, f, g) {
  function h(b, c) {
    a.error[b.attr("id")] = c
  }

  a.disabled = !0, a.loading = !1, a.error = [], a.submitLabel = "endUserAuth.submit", a.cancelLabel = "general.cancel";
  var i = !1, j = !1, k = a.$watch("$parent.application", function (b) {
    j = b, a.endUserAuth = angular.copy(b.auth) || {
        displayName: b.name,
        redirectUrls: [""]
      }, a.disabled = "revoked" === b.clientIdStatus, i = b.id
  });
  a.$on("$destroy", k), a.addRedirect = function () {
    a.endUserAuth.redirectUrls.push("")
  };
  var l = angular.element("<a/>")[0];
  a.validateRedirect = function (a, b) {
    if (l.href = b, b.indexOf("://") < 1)return h(a, "endUserAuth.redirect.scheme.required"), !1;
    var c = b.substring(0, b.indexOf("://"));
    return c.match(/^[a-zA-Z]+[a-zA-Z0-9+\-.]+$/) ? !b.match(/^(http|https)/) || l.hostname && "" !== l.hostname ? b.indexOf("://localhost") > -1 || b.indexOf("://127.0.0.1") > -1 ? (h(a, "endUserAuth.redirect.localhost"), !1) : b.indexOf("#") !== -1 ? (h(a, "endUserAuth.redirect.fragment"), !1) : l.search && l.search.match(/(code=|state=|scope=|error=|error_description=)/) ? (h(a, "endUserAuth.redirect.query"), !1) : !b.split("?")[0].match(/[~"'\(\)]/) || (h(a, "endUserAuth.redirect.invalid"), !1) : (h(a, "endUserAuth.redirect.host"), !1) : (h(a, "endUserAuth.redirect.scheme.invalid"), !1)
  }, a.cancel = function () {
    a.endUserAuth = angular.copy(j.auth) || {redirectUrls: [""]}
  }, a.removeRedirect = function (b) {
    a.endUserAuth.redirectUrls.splice(b, 1)
  }, a.submitAuth = function () {
    d.clear(), a.loading = !0, g.show(), f.auth({id: i}, a.endUserAuth).$promise.then(function (b) {
      a.endUserAuth = angular.copy(b), a.$parent.application.auth = b, g.hide(), a.onSuccess()
    })["catch"](function (b) {
      g.hide(), a.loading = !1, e.manageError(b, {prefix: "endUserAuth", keys: {404: 1}})
    })
  }, a.onSuccess = function () {
    a.loading = !1, d.success("endUserAuth.success")
  }, a.consentScreen = function () {
    c.open({templateUrl: "views/modal-consent-screen.html"})
  }
}]), angular.module("dev").controller("TncCtrl", ["$scope", "$rootScope", "$routeParams", "$http", "$sce", "$location", "commonConfig", "Notification", "HttpInterceptor", "Cache", "Developer", "Menu", "toaster", function (a, b, c, d, e, f, g, h, i, j, k, l, m) {
  function n() {
    t = b.$on("$routeChangeStart", function (b, c) {
      c && (!c.$$route || c.$$route && "/signin" !== c.$$route.originalPath && "/404" !== c.$$route.originalPath) ? b.preventDefault() : h.clear("terms" + a.termsId)
    }), a.$on("$destroy", t);
    var c = b.$on("user.signedOut", t);
    a.$on("$destroy", c)
  }

  function o(b, c) {
    a.loading = !1, 404 === c ? f.path("/404").replace() : i.manageError({data: b, status: c})
  }

  function p(b) {
    a.downloadUrl = g.api.url + "download-terms" + b, d.get(b).success(function (b) {
      a.loading = !1, a.content = e.trustAsHtml(b)
    }).error(o)
  }

  function q(b) {
    a.term = b, p(b.url)
  }

  function r(b, c) {
    h.clear(), a.loading = !0, m.show(), k[s ? "updateTerms" : "createTerms"]({itemId: s ? s.id : void 0}, {
      status: b,
      termsId: s ? void 0 : a.termsId
    }, function (d) {
      t && t(), m.hide(), a.onSuccess(d, b, c)
    }, function (a) {
      m.hide(), o(a.data, a.status)
    })
  }

  a.termsId = !1, a.loading = !0;
  var s = !1, t = !1;
  c.termsId ? (b.setMeta("support.terms-and-conditions"), b.breadcrumbs = [], a.termsId = c.termsId, a.submitLabel = "tnc.submit", a.cancelLabel = "tnc.decline", n()) : a.termsId = a.$parent.termsId, j.getDeveloperTerms(a.termsId).then(function (a) {
    s = a, q(a.terms)
  })["catch"](function () {
    j.getOfferTerms(a.termsId).then(q)["catch"](function () {
      o(null, 404)
    })
  }), a.onSuccess = function (b, d, e) {
    a.loading = !1;
    var f = b.terms, g = e, i = !1;
    "generic" === f.type && (g = "rejected" === d ? "tnc.genericDeclined" : e, i = "rejected" === d && "terms" + f.id), h.clear("terms" + f.id), h["rejected" === d ? "warn" : "success"](g, {
      id: f.id,
      name: f.name,
      api: f.product && f.product.name || ""
    }, i), l.signedIn(c.r || "/myapps")
  }, a.acceptTerms = function () {
    r("accepted", "tnc.accept.success")
  }, a.declineTerms = function () {
    r("rejected", "tnc.specificDeclined")
  }
}]), angular.module("dev").controller("AddApiCtrl", ["$scope", "$rootScope", "$http", "$q", "$routeParams", "$location", "$window", "toaster", "Notification", "Application", "ApplicationSubscription", "HttpInterceptor", "Cache", "commonConfig", function (a, b, c, d, e, f, g, h, i, j, k, l, m, n) {
  function o(a) {
    b.breadcrumbs = [{href: "/myapps", name: "menu.myapps"}, {
      href: "/myapps/" + a.id,
      name: a.name
    }, {name: u + ".breadcrumb"}]
  }

  function p(b, c, d) {
    b.disabled = c, b.group = "addapi." + d, a.offers.push(b), e.offer === b.id && (a.selected = b, a.updateSteps())
  }

  function q(b) {
    if (a.offers = [], angular.forEach(b.available, function (a) {
        p(a, !1, "api_addable")
      }), angular.forEach(b.subscribed, function (a) {
        p(a, !0, "api_already_in_app")
      }), angular.forEach(b.incompatible, function (a) {
        p(a, !1, "api_incompatible")
      }), v) {
      var c = a.selected;
      delete c.group, delete c.disabled, a.offers = [c]
    } else 0 === b.available.length && i.error("addapi.noOffer")
  }

  function r(b) {
    i.clear(), h.show(), a.loading = !0;
    var c = a.application, d = new k;
    d.offerId = a.selected.id, a.selected.product.parameters.length > 0 && (d.parameters = a.provisioningForm), d.$save({appId: c.id}, function (d) {
      c.subscriptions.push(d), b ? b(d) : (h.hide(), a.loading = !1, s(d), f.path("/myapps/" + c.id).search(""))
    }, function (b) {
      h.hide(), a.loading = !1, 404 === b.status ? f.path("/404").replace() : 412 === b.status && b.data && 204 === b.data.code ? i.error("addapi.provisioning.error", {message: b.data.description || b.data.message}) : l.manageError(b)
    })
  }

  function s(b) {
    var c = a.application, d = b.product, e = b.offer.name;
    d.restricted ? i.warn("addapi.validationRequired", {
      name: e,
      id: b.id
    }) : i.success(d.configurable ? "addapi.successConfigurable" : "addapi.success", {
      name: e,
      app: c.name,
      id: b.id
    }), b.developerNotification && i.warn("general.customMessage", {message: b.developerNotification}), v && i.warn("migrateapi.warn")
  }

  function t() {
    for (var b, c, d = 0, e = a.application; d < e.subscriptions.length; d++)if (b = e.subscriptions[d], b.offer.id === a.selected.id) {
      c = b.id;
      break
    }
    r()
  }

  var u = e.action, v = a.migrate = "migrateapi" === e.action;
  b.setMeta("myapps." + u), b.breadcrumbs = [{
    href: "/myapps",
    name: "menu.myapps"
  }, {name: u + ".breadcrumb"}], a.step = 0, a.steps = v ? ["migrate"] : ["choose"], a.loading = !0, a.isDisabled = {}, a.provisioningForm = [], a.addApiScope = !0, a.updateSteps = function () {
    var b = v ? ["migrate"] : ["choose"], c = a.selected, d = c.product;
    if (d.authRequired && !a.application.auth && b.splice(1, 0, "auth"), c && d.terms) {
      var e = d.terms;
      if (e) {
        var f = function () {
          b.splice(1, 0, "tnc"), a.termsId = e.id, a.term = e
        };
        m.getDeveloperTerms(e.id).then(function (a) {
          "accepted" !== a.status && f()
        })["catch"](f)
      }
    }
    a.steps = b
  }, a.next = function () {
    var b = a.selected;
    if (v || "addapi.api_incompatible" !== b.group)"tnc" === a.steps[a.step] && m.getDeveloper(!0), a.step === a.steps.length - 1 ? v ? t() : r() : a.step++, g.scrollTo(0, 0); else {
      var d = n.api.url + "developers/me/applications/" + a.application.id + "/offers/" + b.id + "/incompatibles";
      c.get(d).success(function (a) {
        var b = "";
        angular.forEach(a, function (a) {
          b += a.name + ", "
        }), b = b.substr(0, b.length - 2), i.error("addapi.incompatibleOffer", {offers: b})
      }).error(function () {
        i.error("addapi.incompatibleOffer.generic")
      })
    }
  }, a.back = function () {
    a.step--
  }, h.show();
  var w = [j.offers({id: e.appId}).$promise, m.getApplication(e.appId, o)];
  d.all(w).then(function (b) {
    var c = b[0], d = b[1];
    "revoked" === d.clientIdStatus ? (i.error("addapi.notAllowed", d), f.path("/application/" + d.id)) : (d.subscriptions = d.subscriptions || [], o(d), a.application = d, q(c))
  })["catch"](l.manageError)["finally"](function () {
    h.hide(), a.loading = !1
  })
}]), angular.module("dev").controller("ProfileCtrl", ["$scope", "$rootScope", "$location", "Notification", "HttpInterceptor", "toaster", "Cache", "Developer", function (a, b, c, d, e, f, g, h) {
  b.setMeta("user.profile"), b.breadcrumbs = [{name: "profile.title"}], a.loading = !1, a.signup = !1, a.profileSubmitLabel = "profile.submit", f.show(), g.getDeveloper().then(function (b) {
    f.hide(), a.profile = b
  })["catch"](f.hide), a.submitProfile = function () {
    a.loading = !0, d.clear();
    var f = angular.copy(a.profile);
    delete f.email, delete f.status, delete f.terms, delete f.type, h.update(f, function (e) {
      a.loading = !1, d.success("profile.success");
      var f = b.me, g = f.terms;
      f = b.me = e, f.terms = g, c.path("/")
    }, function (b) {
      a.loading = !1, e.manageError(b, {prefix: "profile", keys: {"412_201": 1}})
    })
  }
}]), angular.module("dev").controller("HomeCtrl", ["$scope", "$rootScope", "$http", "commonConfig", "appConfig", "Cache", "HttpInterceptor", "toaster", function (a, b, c, d, e, f, g, h) {
  b.breadcrumbs = [], b.setMeta("home"), a.categories = angular.copy(e.apis), a.nbColumns = 4, h.show(), c.get(d.api.url + "home").then(function (b) {
    a.partner = b.data
  })["catch"](g.manageError)["finally"](function () {
    h.hide()
  })
}]), angular.module("dev").controller("MenuCtrl", ["$rootScope", "$scope", "$location", "pfsConfig", "Cache", "Auth", "Notification", "cookies", "modalPartner", function (a, b, c, d, e, f, g, h, i) {
  function j(a) {
    e.getDeveloper(!0).then(function (b) {
      "partner" === b.type ? i.open() : k(b, a)
    })
  }

  function k(a, b) {
    for (var d, e = !1, f = a.terms || [], h = 0, i = f.length; h < i; h++) {
      var j = f[h];
      switch (j.status) {
        case"pending":
          d || (d = j);
          break;
        case"rejected":
          var k = j.terms;
          if ("generic" === k.type && "limited" === a.status)return void g.warn("tnc.genericDeclined", k, "terms" + k.id);
          break;
        case"accepted":
          "generic" === j.terms.type && (e = !0)
      }
    }
    if (d) {
      var l = e || "generic" !== d.terms.type ? "tnc.mustReaccept" : "tnc.mustSign";
      g.warn(l, d.terms, "terms" + d.terms.id), c.path("/terms/" + d.terms.id)
    } else b && c.path(b).search("r", null)
  }

  function l() {
    a.me = a.applications = a.offers = null;
    var b = d.authCookie;
    h.remove(b.name, b.path, b.domain), h.get(d.authCookie.name) || e.getOffers(!0)
  }

  b.menu = ["apis", "tools", "support"], b.showOrangeButton = !0, b.useDropDown = !0, b.user = {
    menu: [{id: "profile"}, {id: "password"}],
    isOpen: !1
  }, b.isActive = function (a) {
    return 0 === c.path().indexOf(a)
  }, b.open = function (a) {
    c.path(a).search("")
  }, b.toggleDropdown = function (a) {
    a.preventDefault(), a.stopPropagation(), b.user.isOpen = !b.user.isOpen
  }, b.signOut = function () {
    g.clear(!0), a.$emit("user.signedOut"), c.path("/").search("")
  };
  var m = a.$on("user.signedIn", function (a, b) {
    j(b)
  });
  b.$on("$destroy", m);
  var n = a.$on("user.signedOut", l);
  b.$on("$destroy", n), h.get(d.authCookie.name) && j()
}]), angular.module("dev").directive("formLocator", function () {
  return {
    link: function (a, b) {
      a.$emit("formLocator", b[0])
    }
  }
}).directive("iframeOnload", function () {
  return {
    scope: {callBack: "&iframeOnload"}, link: function (a, b) {
      b.on("load", function () {
        return a.callBack()
      })
    }
  }
}).service("modalConfigureApi", ["$uibModal", function (a) {
  this.open = function (b, c, d) {
    return a.open({
      templateUrl: "views/modal-configure-api.html",
      controller: "ModalConfigureApiCtrl",
      backdrop: "static",
      resolve: {
        title: function () {
          return b
        }, titleParams: function () {
          return c
        }, data: function () {
          return d
        }
      }
    })
  }
}]).controller("ModalConfigureApiCtrl", ["$window", "$timeout", "$scope", "$sce", "data", "title", "titleParams", "commonConfig", function (a, b, c, d, e, f, g, h) {
  function i(a) {
    var b = a.origin.replace(/^(http|https):/, "");
    if (0 === c.data.url.indexOf(b)) {
      var d = angular.fromJson(a.data);
      switch (d.type) {
        case"height":
          j = !0, c.$apply(function () {
            c.iframeHeight = d.value
          });
          break;
        case"exit":
          c.$close(d.value);
          break;
        case"cancel":
          c.$dismiss()
      }
    }
  }

  c.data = e, c.title = f, c.titleParams = g, c.iframeHeight = "0", c.loading = !0;
  var j = !1, k = c.$on("formLocator", function (a, c) {
    b(function () {
      c.setAttribute("action", e.url), c.submit()
    }, 0)
  });
  c.$on("$destroy", function () {
    a.removeEventListener && a.removeEventListener("message", i), k(), b.cancel(l)
  }), a.addEventListener && a.addEventListener("message", i);
  var l;
  c.iframeLoadedCallBack = function () {
    c.loading = !1, l = b(function () {
      j || c.$close("NOK")
    }, 1e3 * h.api.configureTimeout)
  }
}]), angular.module("dev").controller("ToolsCtrl", ["$rootScope", "$scope", function (a, b) {
  a.setMeta("tools"), a.breadcrumbs = [{name: "menu.tools"}], b.Math = Math
}]), angular.module("dev").controller("SupportCtrl", ["$rootScope", "$scope", function (a, b) {
  a.setMeta("support"), a.breadcrumbs = [{name: "menu.support"}], b.Math = Math, b.support = angular.copy(a.appConfig.support), b.support.push({
    name: "contactUs",
    url: "/support/contact-us"
  })
}]), angular.module("dev").controller("BrandCtrl", ["$rootScope", "$scope", "$templateCache", "Cache", function (a, b, c, d) {
  a.setMeta("tools.brand-guidelines"), a.breadcrumbs = [{
    name: "menu.tools",
    href: "/tools"
  }, {name: "menu.tools.brand-guidelines"}], b.staticTitle = "content.brand-guidelines.title";
  var e = a.getGeneralContentsPath() + "brand-guidelines.html";
  c.remove(e), b.staticUrl = e, d.getGeneral().then(function (b) {
    b = b.contents;
    for (var c = 0; c < b.length; c++)if ("brand-guideline" === b[c].type) {
      a.setDescription(b[c].description);
      break
    }
  })
}]), angular.module("dev").controller("GeneralTerms", ["$rootScope", "$scope", "$templateCache", "Cache", function (a, b, c, d) {
  a.setMeta("support.terms-and-conditions"), a.breadcrumbs = [{name: "menu.more.terms-and-conditions"}], b.staticTitle = "content.terms.title";
  var e = a.getGeneralContentsPath() + "terms-and-conditions.html";
  c.remove(e), b.staticUrl = e, d.getGeneral().then(function (b) {
    b = b.contents;
    for (var c = 0; c < b.length; c++)if ("terms-and-conditions" === b[c].type) {
      a.setDescription(b[c].description);
      break
    }
  })
}]), angular.module("dev").controller("TechnicalChannelCtrl", ["$rootScope", "$scope", "$http", "toaster", "HttpInterceptor", "Cache", function (a, b, c, d, e, f) {
  a.setMeta("support.technical-guides"), a.breadcrumbs = [{
    name: "menu.support",
    href: "/support"
  }, {name: "menu.support.technical-guides"}], d.show(), f.getGeneral().then(function (a) {
    b.articles = [], a = a.contents;
    for (var c = 0; c < a.length; c++)"technical-channel" === a[c].type && b.articles.push(a[c])
  })["catch"](function (a) {
    e.manageError(a)
  })["finally"](function () {
    d.hide()
  })
}]), angular.module("dev").controller("TechnicalArticleCtrl", ["$rootScope", "$scope", "$location", "$routeParams", "$templateCache", "Cache", function (a, b, c, d, e, f) {
  var g = d.article;
  a.setTitle(g), a.breadcrumbs = [{name: "menu.support", href: "/support"}, {
    name: "menu.support.technical-guides",
    href: "/support/technical-guides"
  }, {name: g}], b.staticTitle = d.article;
  var h = a.getGeneralContentsPath() + g + ".html";
  e.remove(h), b.staticUrl = h, f.getGeneral().then(function (b) {
    b = b.contents;
    for (var c = 0; c < b.length; c++)if (b[c].title === g) {
      a.setDescription(b[c].description);
      break
    }
  })
}]), angular.module("dev").controller("AllStaticContentCtrl", ["$rootScope", "$scope", "$location", "$http", "$routeParams", "$translate", "$templateCache", "toaster", "Cache", "HttpInterceptor", function (a, b, c, d, e, f, g, h, i, j) {
  function k(c) {
    h.show(), i.getOffers(!0).then(function (d) {
      for (var e = 0; e < d.length; e++)for (var f = d[e], h = f.product.contents, j = 0; j < h.length; j++)if (h[j].type === c) {
        var k = a.getContentsPath(f, f.product.id) + c + ".html";
        g.remove(k), b.data.push({id: f.id, name: f.name, url: k, isOpen: !1})
      }
      return i.getGeneral()
    }).then(function (d) {
      for (var e = d.contents, f = 0; f < e.length; f++)if (e[f].type === c) {
        var h = e[f].title, i = a.getGeneralContentsPath() + h + ".html";
        g.remove(i), b.data.push({id: h, name: h, url: i, isOpen: !1})
      }
    })["catch"](function (a) {
      j.manageError(a)
    })["finally"](function () {
      h.hide(), b.filterData = b.data
    })
  }

  a.breadcrumbs = [{name: "menu.support", href: "/support"}], b.data = [], b.tags = [], b.filterData = [];
  var l, m, n, o;
  switch (e.content) {
    case"faq":
      l = {name: "menu.support.faq"}, m = "faq", n = "content.faq.title", o = "filter.topic", a.setMeta("support.faq");
      break;
    case"code-samples-and-sdk":
      a.breadcrumbs = [{
        name: "menu.tools",
        href: "/tools"
      }], l = {name: "menu.tools.code-samples-and-sdk"}, m = "code-sample", n = "content.sdk.title", a.setMeta("tools.code-samples-and-sdk");
      break;
    default:
      c.path("/404")
  }
  b.title = n, b.filterTitle = o || "filter.api", m && (a.breadcrumbs.push(l), k(m)), b.selectTag = function () {
    var a;
    for (a = 0; a < b.data.length; a++)b.data[a].isOpen = !1;
    if (null === b.tag)b.filterData = b.data; else for (b.filterData = [], a = 0; a < b.data.length; a++) {
      var c = b.data[a];
      if (c.id === b.tag.id) {
        c.isOpen = !0, b.filterData.push(c);
        break
      }
    }
  }
}]), angular.module("dev").controller("ContactCtrl", ["$rootScope", "$scope", "$location", "$http", "appConfig", "commonConfig", "Cache", "HttpInterceptor", "Notification", "toaster", "modalConfirm", "grecaptcha", function (a, b, c, d, e, f, g, h, i, j, k, l) {
  function m() {
    o--, 0 === o && j.hide()
  }

  function n(a) {
    m(), h.manageError(a)
  }

  a.setMeta("support.contactUs"), a.breadcrumbs = [{
    name: "menu.support",
    href: "/support"
  }, {name: "menu.support.contactUs"}];
  var o = 1, p = e.contact.types;
  b.types = angular.copy(p), b.uploads = [], b.uploaded = [], j.show();
  var q, r = b.form = {};
  a.$watch("me", function (a) {
    a && (q = a, b.types.length === p.length && b.types.splice(0, 1), r.firstName = q.firstName, r.lastName = q.lastName, r.email = q.email, o++, j.show(), g.getApplications().then(m)["catch"](n))
  }), g.getOffers(!0).then(m)["catch"](n), b.checkAuth = function () {
    var a = b.form.type;
    !q && a && a.auth && k.open("menu.support.contactUs", "contactUs.auth-required").result.then(function () {
      var a = c.path();
      c.path("/signin").search("r", a)
    })
  }, b.send = function () {
    i.clear(), b.loading = !0;
    var a = angular.copy(b.form);
    a.type = a.type.value, q && (delete a.firstName, delete a.lastName, delete a.email), d.post(f.api.url + "support/request", a).success(function () {
      i.success("contactUs.success"), b.loading = !1, c.path("/")
    }).error(function (a, c) {
      b.loading = !1, b.form.captcha = "", l.reset(), h.manageError({data: a, status: c}, {
        prefix: "contact-us",
        keys: {401: 1, 404: 1}
      })
    })
  }
}]), angular.module("dev").controller("NotFoundCtrl", ["$rootScope", function (a) {
  a.breadcrumbs = null
}]), angular.module("dev").service("modalPartner", ["$uibModal", function (a) {
  this.open = function () {
    return a.open({templateUrl: "views/modal-partner.html", controller: "ModalPartnerCtrl", backdrop: "static"})
  }
}]).controller("ModalPartnerCtrl", ["$rootScope", "$scope", "$location", "$route", "Notification", "Auth", "Developer", "Cache", "HttpInterceptor", function (a, b, c, d, e, f, g, h, i) {
  b.signOut = function () {
    b.$dismiss(), a.$emit("user.signedOut"), d && d.current && d.current.$$route.authenticated && c.path("/signin"), e.clear(!0)
  }, b.migrate = function () {
    e.clear(), b.loading = !0, g.migrate({type: "developer"}, function (d) {
      b.loading = !1, a.me = d;
      for (var e = d.terms || [], f = 0, g = e.length; f < g; f++) {
        var i = e[f].terms;
        if ("generic" === i.type) {
          c.path("/terms/" + i.id).search("r", c.path());
          break
        }
      }
      b.$close(), h.getOffers(!0)
    }, function (a) {
      b.loading = !1, i.manageError(a)
    })
  }
}]), angular.module("dev").service("modalUseApi", ["$uibModal", function (a) {
  this.open = function (b) {
    return a.open({
      templateUrl: "views/modal-use-api.html",
      controller: "ModalUseApiCtrl",
      backdrop: "static",
      resolve: {
        offer: function () {
          return b
        }
      }
    })
  }
}]).controller("ModalUseApiCtrl", ["$rootScope", "$scope", "$location", "offer", "Cache", "HttpInterceptor", "toaster", "Notification", "Application", function (a, b, c, d, e, f, g, h, i) {
  b.tab = "add", b.offer = d, b.loading = !0, b.name = "", b.description = "", g.show(), e.getApplications(!0).then(function (a) {
    0 === a.length ? b.tab = "create" : 1 === a.length && (b.application = a[0])
  })["catch"](f.manageError)["finally"](function () {
    b.loading = !1, g.hide()
  }), b.changeTab = function (a) {
    b.tab = a
  }, b.addToApp = function () {
    b.loading = !0, h.clear(), g.show(), e.getApplication(b.application.id).then(function (a) {
      for (var e = 0, f = !1, g = a.subscriptions || []; e < g.length; e++)g[e].offer.id === d.id && (h.error("useapi.error.alreadyInApp", {
        app: a.name,
        offer: d.name
      }), f = !0);
      f || (b.$dismiss(), c.path("/myapps/" + b.application.id + "/addapi").search("offer", d.id))
    })["catch"](f.manageError)["finally"](function () {
      b.loading = !1, g.hide()
    })
  }, b.createApp = function () {
    b.loading = !0, h.clear(), g.show(), i.save({name: b.name, description: b.description}, function (e) {
      b.loading = !1, g.hide(), h.success("useapi.declare.success", {
        app: e.name,
        offer: d.name
      }), a.applications.push(e), b.$dismiss(), c.path("/myapps/" + e.id + "/addapi").search("offer", d.id)
    }, function (a) {
      f.manageError(a, {prefix: "dashboard", keys: {403: 1}}), b.loading = !1, g.hide()
    })
  }
}]), angular.module("dev").directive("tWidget", function () {
  return {
    restrict: "A",
    replace: !0,
    scope: {tLink: "=", tTitle: "@", tAllTitle: "@", tTarget: "@"},
    template: '<div class="tWidget clearfix"><h2 class="pull-left" translate="{{tTitle}}"></h2><a class="see-all pull-right btn btn-info" target="{{tTarget}}" href="{{tLink}}" translate="{{tAllTitle}}"></a></div>'
  }
}), angular.module("dev").directive("vWidget", function () {
  return {
    restrict: "A",
    transclude: !0,
    replace: !0,
    scope: {vLink: "=", vTarget: "@", vMessage: "=", vColor: "@"},
    template: '<a href="{{vLink}}" target="{{vTarget}}" class="vWidget clearfix"><div class="top {{vColor}}" ng-transclude></div><div class="content"><div class="ellipsis-fade message" ng-bind="vMessage"></div></div></a>'
  }
}).directive("hWidget", function () {
  return {
    restrict: "A",
    transclude: !0,
    replace: !0,
    scope: {hLink: "@", hTitle: "=", hDescription: "=", hTarget: "@", hExtra: "=", hButton: "@", hColor: "@"},
    template: '<a class="hWidget clearfix" href="{{hLink}}" target="{{hTarget}}"><div class="hLeft pull-left {{hColor}}" ng-transclude></div><div class="hRight"><h4 class="title" ng-class="{\'text-overflow\':hDescription}" ng-bind="hTitle"></h4><p class="description ellipsis-fade" ng-bind="hDescription" ng-if="hDescription"></p><p class="extra text-overflow" ng-bind="hExtra" ng-if="hExtra"></p><span class="btn btn-info" translate="{{hButton}}" ng-if="hButton"></span></div></a>'
  }
}), angular.module("dev").directive("customValidator", function () {
  return {
    restrict: "A", require: "ngModel", link: function (a, b, c, d) {
      if (d) {
        var e = a.$eval(c.customValidator);
        d.$parsers.unshift(function (a) {
          return e(b, a) ? a : void 0
        })
      }
    }
  }
}), angular.module("dev").directive("lineChart", ["$window", "$rootScope", function (a, b) {
  return {
    restrict: "A",
    scope: {data: "=", interpolateX: "=", titleX: "@", titleY: "@"},
    template: '<div class="ct-chart ct-perfect-fourth"></div>',
    link: function (c, d) {
      function e(c) {
        c instanceof a.Chartist.Line && (c.on("draw", function (a) {
          switch (a.type) {
            case"line":
              a.group._node.className.baseVal += " " + b.colors[a.index % b.colors.length]
          }
        }), c.on("created", function (a) {
          if (a.options) {
            if (a.options.axisX.title) {
              var b = new Chartist.Svg("text");
              b.text(a.options.axisX.title), b.addClass("ct-axis-title"), b.attr({
                x: a.axisX.axisLength / 2 + 50,
                y: a.axisY.axisLength + 50,
                "text-anchor": "middle"
              }), a.svg.append(b, !0)
            }
            if (a.options.axisY.title) {
              var c = new Chartist.Svg("text");
              c = new Chartist.Svg("text"), c.addClass("ct-axis-title"), c.text(a.options.axisY.title), c.attr({
                x: 0,
                y: a.axisY.axisLength / 2,
                transform: "rotate(90, 0, " + a.axisY.axisLength / 2 + ")",
                "text-anchor": "middle"
              }), a.svg.append(c, !0)
            }
          }
        }))
      }

      c.$watch("data", function (b) {
        if (b) {
          var f = {fullWidth: !0, plugins: [e], axisY: {low: 0, onlyInteger: !0}};
          c.interpolateX && (f.axisX = f.axisX || {}, f.axisX.labelInterpolationFnc = c.interpolateX), c.titleX && (f.axisX = f.axisX || {}, f.axisX.title = c.titleX), c.titleY && (f.axisY = f.axisY || {}, f.axisY.title = c.titleY), new a.Chartist.Line(".ct-chart", b, f)
        } else d.children()[0].innerHTML = ""
      })
    }
  }
}]), angular.module("dev").directive("anchor", ["$location", function (a) {
  return {
    link: function (b, c, d) {
      var e = d.href;
      if (0 === e.indexOf("#"))c.attr("href", a.absUrl().split("#")[0] + e), c.removeAttr("target"), c.attr("target", "_self"); else if (0 === e.indexOf("/")) {
        c.removeAttr("target");
        var f = /\.([0-9a-z]+)(?=[?#])|(\.)(?:[\w]+)$/;
        null !== e.match(f) && c.attr("target", "_blank")
      } else 0 !== e.indexOf("http://") && 0 !== e.indexOf("https://") || (c.removeAttr("target"), c.attr("target", "_blank"))
    }
  }
}]), angular.module("dev").factory("Auth", ["$resource", "commonConfig", function (a, b) {
  return a(b.api.url + "auth/:api/:confirmToken", {}, {
    signIn: {method: "POST", params: {api: "signin"}},
    signUp: {method: "POST", params: {api: "signup"}},
    forgotPassword: {
      method: "POST",
      params: {api: "password", confirmToken: "send"},
      interceptor: {
        response: function (a) {
          return a.status
        }
      }
    },
    password: {method: "POST", params: {api: "password", confirmToken: "update"}},
    confirm: {method: "GET", params: {api: "confirm"}}
  })
}]), angular.module("dev").factory("ApplicationSubscription", ["$resource", "commonConfig", function (a, b) {
  return a(b.api.url + "developers/me/applications/:appId/subscriptions/:id/:api", {
    appId: "@appId",
    id: "@id"
  }, {
    configuration: {method: "GET", params: {api: "configuration"}},
    updateConfiguration: {method: "PUT", params: {api: "configuration"}},
    migrate: {method: "GET", params: {action: "migrate"}}
  })
}]), angular.module("dev").config(["$provide", function (a) {
  a.decorator("Cache", ["$rootScope", "$delegate", "$q", "Developer", "Offer", "Application", "General", function (a, b, c, d, e, f, g) {
    var h = {}, i = {
      me: {method: "get", resource: d, params: {terms: !0}},
      offers: {resource: e, params: {terms: !0, sort: "name"}},
      applications: {resource: f},
      general: {method: "get", resource: g}
    };
    return b.setConfig(i), b.getDeveloper = function (a) {
      return b.get("me", a)
    }, b.getGeneral = function (a) {
      return b.get("general", a)
    }, b.getOffers = function (a) {
      return b.get("offers", a)
    }, b.getOfferByPath = function (a, b) {
      var d = c.defer(), e = h[a] = h[a] || {_loading: !0}, f = function () {
        i.offers.resource.get({id: a}, function (b) {
          h[a] = b, d.resolve(b)
        }, d.reject)
      };
      return e._loading ? f() : (d.resolve(e), b && f()), d.promise
    }, b.getApplications = function (a) {
      return b.get("applications", a)
    }, b.getApplication = function (a, c, d) {
      return b.getPartial("applications", a, c, d)
    }, b.removeApplication = function (a) {
      b.remove("applications", a)
    }, b.getDeveloperTerms = function (a) {
      var d = function (b) {
        for (var d = !1, e = c.defer(), f = 0, g = b.terms || [], h = g.length; f < h; f++) {
          var i = g[f], j = i.terms;
          if (j.id === a) {
            d = !0, e.resolve(i);
            break
          }
        }
        return d || e.reject({status: 404}), e.promise
      };
      return b.getDeveloper().then(d)
    }, b.getOfferTerms = function (a) {
      return b.find("offers", function (b) {
        return b.product.terms && b.product.terms.id === a
      }, function (a) {
        return a.product.terms
      })
    }, b
  }])
}]), angular.module("dev").factory("Developer", ["$resource", "commonConfig", function (a, b) {
  return a(b.api.url + "developers/me/:api/:itemId", {itemId: "@itemId"}, {
    update: {method: "PUT"},
    createTerms: {method: "POST", params: {api: "terms"}},
    updateTerms: {method: "PUT", params: {api: "terms"}},
    migrate: {method: "PATCH", params: {terms: !0}},
    checkPassword: {method: "POST", params: {api: "token"}}
  })
}]), angular.module("dev").factory("Application", ["$resource", "commonConfig", function (a, b) {
  return a(b.api.url + "developers/me/applications/:id/:api", {id: "@id"}, {
    update: {method: "PUT"},
    credentials: {method: "GET", params: {api: "credentials"}},
    stats: {method: "GET", params: {api: "statistics"}},
    auth: {method: "PUT", params: {api: "auth"}},
    offers: {method: "GET", params: {api: "offers", sort: "name"}}
  })
}]), angular.module("dev").factory("General", ["$resource", "commonConfig", function (a, b) {
  return a(b.api.url + "portals/developer")
}]), angular.module("dev").factory("Offer", ["$resource", "commonConfig", function (a, b) {
  return a(b.api.url + "offers/:id", {id: "@id"})
}]), angular.module("dev").service("analytics", ["$rootScope", "$location", "$window", "pfsConfig", function (a, b, c, d) {
  this.init = function () {
    var e = c.ga;
    e && (e("create", d.analytics, "auto"), a.$on("$viewContentLoaded", function () {
      e("send", "pageview", {page: b.url()})
    }))
  }
}]), angular.module("common").factory("HttpInterceptor", ["$rootScope", "$q", "$location", "$injector", "$timeout", "Menu", "Notification", "commonConfig", "cookies", "pfsConfig", function (a, b, c, d, e, f, g, h, i, j) {
  function k(a, b) {
    var c = a.data && a.data.code, d = l(a.status, b), e = l(a.status + (c ? "_" + c : ""), b), f = [e];
    return d !== e && (f = [e, d]), f.push("errors.*"), f
  }

  function l(a, b) {
    return (b && b.keys && b.keys[a] ? b.prefix + "." : "") + "errors." + a
  }

  function m() {
    var a = d.get("$route");
    return a && a.current && a.current.$$route.authenticated
  }

  function n() {
    if (f.signedOut(), m()) {
      var a = c.path();
      c.path("/signin").search("r", a)
    }
  }

  var o = !1;
  return {
    request: function (c) {
      c.timeout = 1e3 * h.api.timeout;
      var e = "undefined" != typeof i.get(j.authCookie.name), f = 0 === c.url.indexOf(h.api.url + "developers/me/") || e && c.url === h.api.url + "offers", g = function (a, c) {
        return o = !0, "partner" === a.type ? b.reject({config: {url: ""}}) : c
      };
      if (!o && f) {
        if (a.me && !a.me._loading)return g(a.me, c);
        var k = d.get("Cache");
        return k.getDeveloper().then(function (a) {
          return g(a, c)
        })
      }
      return c
    }, manageError: function (a, b, c) {
      switch (a.status) {
        case 401:
          var d = k(a);
          if (401 === a.status && m() && "errors.401_41" !== d[0])break;
          g.error(k(a, b), c);
          break;
        case 400:
        case 404:
        case 409:
        case 412:
        case 500:
          g.error(k(a, b), c)
      }
    }, responseError: function (a) {
      var d = a.config.url, f = a.status, i = 0 === d.indexOf(h.api.url);
      if (i)switch (f = f <= 0 ? 408 : f) {
        case 401:
          var j = k(a);
          "errors.401_42" === j[0] ? e(function () {
            n(), g.error(j)
          }, 100) : 0 !== d.indexOf(h.api.url + "auth/token") && e(n, 100);
          break;
        case 403:
        case 408:
        case 503:
          g.error(k(a));
          break;
        case 410:
        case 500:
        case 502:
        case 504:
          g.error("errors.*")
      } else if (d.indexOf(".html") !== -1 && "" !== d)switch (f) {
        case 401:
          var l = c.path();
          c.path("/signin").search("r", l);
          break;
        case 404:
          c.path("/404").replace();
          break;
        default:
          g.error("errors." + f)
      }
      return b.reject(a)
    }
  }
}]);
