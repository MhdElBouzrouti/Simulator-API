define({ "api": [
  {
    "type": "post",
    "url": "/auth/callback?code=:code&state=:state&scope=:scope",
    "title": "Receive a code of authorization",
    "version": "0.2.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "code",
            "description": "<p>A Code of authorization</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "scope",
            "description": "<p>A scope of authorization</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "state",
            "description": "<p>A state of authorization</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example",
          "content": "POST /auth/callback?code=OFR-a1d08fcd....d35b&state=t8acxb5irr&scope=openid form_filling",
          "type": "url"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "AuthorizationError",
            "description": "<p>Error from Authorization Server (OIDC).</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "TokenError",
            "description": "<p>Error from token Server (OIDC).</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ResourceError",
            "description": "<p>Error from API resource.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "SimulatorError",
            "description": "<p>Error from Simulator API</p>"
          }
        ]
      }
    },
    "name": "CallBack_URL",
    "group": "Authorization",
    "filename": "api/controllers/AuthController.js",
    "groupTitle": "Authorization",
    "sampleRequest": [
      {
        "url": "http://checkandgo-orangegroup.rhcloud.com/auth/callback?code=:code&state=:state&scope=:scope"
      }
    ]
  },
  {
    "type": "post",
    "url": "/config",
    "title": "A configure of the backend",
    "version": "0.2.0",
    "group": "Configuration",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "integer",
            "optional": false,
            "field": "clientID",
            "description": "<p>A ID of the client (Service Provider)</p>"
          },
          {
            "group": "Parameter",
            "type": "integer",
            "optional": false,
            "field": "resourceID",
            "description": "<p>A ID of resource API</p>"
          },
          {
            "group": "Parameter",
            "type": "integer",
            "optional": false,
            "field": "oidcID",
            "description": "<p>A ID of OpenID Provider</p>"
          },
          {
            "group": "Parameter",
            "type": "integer",
            "optional": false,
            "field": "state",
            "description": "<p>A state of authorization</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example",
          "content": "{\n  \"clientID\":,\n  \"resourceID\":,\n  \"oidcID\":,\n  \"state\":\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "LockOfInformationError",
            "description": "<p>the lack of information to complete the operation.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "DataAccessError",
            "description": "<p>Errors access to the data.</p>"
          }
        ]
      }
    },
    "filename": "api/controllers/ConfigBackendController.js",
    "groupTitle": "Configuration",
    "name": "PostConfig",
    "sampleRequest": [
      {
        "url": "http://checkandgo-orangegroup.rhcloud.com/config"
      }
    ]
  },
  {
    "type": "get",
    "url": "/",
    "title": "Get a general information",
    "version": "0.2.0",
    "name": "Description_of_the_API",
    "group": "Index",
    "filename": "api/controllers/AuthController.js",
    "groupTitle": "Index",
    "sampleRequest": [
      {
        "url": "http://checkandgo-orangegroup.rhcloud.com/"
      }
    ]
  },
  {
    "type": "post",
    "url": "/login",
    "title": "Authentication of User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "username",
            "description": "<p>a username</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "password",
            "description": "<p>a password</p>"
          }
        ]
      }
    },
    "version": "0.2.0",
    "group": "Login",
    "filename": "api/controllers/LoginController.js",
    "groupTitle": "Login",
    "name": "PostLogin",
    "sampleRequest": [
      {
        "url": "http://checkandgo-orangegroup.rhcloud.com/login"
      }
    ]
  },
  {
    "type": "DELETE",
    "url": "/msisdn/:id",
    "title": "Delete a MSISDN",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "ID",
            "description": "<p>of a MSISDN</p>"
          }
        ]
      }
    },
    "version": "0.2.0",
    "group": "MSISDN",
    "filename": "api/controllers/MsisdnController.js",
    "groupTitle": "MSISDN",
    "name": "DeleteMsisdnId",
    "sampleRequest": [
      {
        "url": "http://checkandgo-orangegroup.rhcloud.com/msisdn/:id"
      }
    ]
  },
  {
    "type": "get",
    "url": "/msisdn/:id",
    "title": "Get a MSISDN",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>ID of MSISDN.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "country",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "createdAt",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "description",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "msisdn",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "updatedAt",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "id",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n   \"country\": \"France\",\n   \"createdAt\": \"2016-07-07T13:34:52.712Z\",\n   \"description\": \"User 1 - France - 33642199697\",\n   \"msisdn\": \"33642199697\",\n   \"updatedAt\": \"2016-07-07T13:38:49.449Z\",\n   \"id\": \"577e5a7c15e95041712f515a\"\n }",
          "type": "json"
        }
      ]
    },
    "group": "MSISDN",
    "version": "0.2.0",
    "filename": "api/controllers/MsisdnController.js",
    "groupTitle": "MSISDN",
    "name": "GetMsisdnId",
    "sampleRequest": [
      {
        "url": "http://checkandgo-orangegroup.rhcloud.com/msisdn/:id"
      }
    ]
  },
  {
    "type": "POST",
    "url": "/msisdn",
    "title": "Create a MSISDN",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "description",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "msisdn",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "country",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "POST /msisdn\n   {\n      \"description\": \"User x - France - 3364xxxxxxx\",\n      \"msisdn\": \"3364xxxxxxx\",\n      \"country\": \"France\"\n    }",
          "type": "json"
        }
      ]
    },
    "version": "0.2.0",
    "group": "MSISDN",
    "filename": "api/controllers/MsisdnController.js",
    "groupTitle": "MSISDN",
    "name": "PostMsisdn",
    "sampleRequest": [
      {
        "url": "http://checkandgo-orangegroup.rhcloud.com/msisdn"
      }
    ]
  },
  {
    "type": "PUT",
    "url": "/msisdn/:id",
    "title": "Edit a MSISDN",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "id",
            "description": "<p>ID of MSISDN</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "msisdn",
            "description": "<p>a phone number</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "description",
            "description": "<p>description of MSISDN</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example",
          "content": "PUT /msisdn/1a5e66cxxxxx\n {\n   \"msisdn\":\"336444xxxxx\",\n   \"description:\"User x - France - 336444xxxxx\"\n }",
          "type": "json"
        }
      ]
    },
    "version": "0.2.0",
    "group": "MSISDN",
    "filename": "api/controllers/MsisdnController.js",
    "groupTitle": "MSISDN",
    "name": "PutMsisdnId",
    "sampleRequest": [
      {
        "url": "http://checkandgo-orangegroup.rhcloud.com/msisdn/:id"
      }
    ]
  },
  {
    "type": "DELETE",
    "url": "/oidc/:id",
    "title": "Delete a OIDC Configuration",
    "version": "0.2.0",
    "group": "OIDC",
    "filename": "api/controllers/OidcController.js",
    "groupTitle": "OIDC",
    "name": "DeleteOidcId",
    "sampleRequest": [
      {
        "url": "http://checkandgo-orangegroup.rhcloud.com/oidc/:id"
      }
    ]
  },
  {
    "type": "get",
    "url": "/oidc/:id",
    "title": "Get a OIDC Configuration",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "optional": false,
            "field": "id",
            "description": ""
          }
        ]
      }
    },
    "version": "0.2.0",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "auth_uri",
            "description": ""
          },
          {
            "group": "Success 200",
            "optional": false,
            "field": "description",
            "description": ""
          },
          {
            "group": "Success 200",
            "optional": false,
            "field": "token_uri",
            "description": ""
          }
        ]
      }
    },
    "group": "OIDC",
    "filename": "api/controllers/OidcController.js",
    "groupTitle": "OIDC",
    "name": "GetOidcId",
    "sampleRequest": [
      {
        "url": "http://checkandgo-orangegroup.rhcloud.com/oidc/:id"
      }
    ]
  },
  {
    "type": "POST",
    "url": "/oidc",
    "title": "Create a OIDC Configuration",
    "version": "0.2.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "optional": false,
            "field": "auth_uri",
            "description": ""
          },
          {
            "group": "Parameter",
            "optional": false,
            "field": "description",
            "description": ""
          },
          {
            "group": "Parameter",
            "optional": false,
            "field": "token_uri",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example",
          "content": "POST /oidc\n{\n  \"auth_uri\": \"https://api.orange.com/openidconnect/fr/v1/authorize\",\n  \"description\": \"Orange France - OpenID Connect\",\n  \"token_uri\": \"https://api.orange.com/openidconnect/fr/v1/token\"\n}",
          "type": "json"
        }
      ]
    },
    "group": "OIDC",
    "filename": "api/controllers/OidcController.js",
    "groupTitle": "OIDC",
    "name": "PostOidc",
    "sampleRequest": [
      {
        "url": "http://checkandgo-orangegroup.rhcloud.com/oidc"
      }
    ]
  },
  {
    "type": "PUT",
    "url": "/msisdn/:id",
    "title": "Edit a OIDC Configuration",
    "version": "0.2.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "optional": false,
            "field": "id",
            "description": "<p>a ID of the OIDC</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example",
          "content": "PUT /oidc/2efxxxxx\n{\n  \"description\": \"Orange France - OpenID Connect\",\n  \"token_uri\": \"https://api.orange.com/openidconnect/fr/v1/token\",\n  \"auth_uri\": \"https://api.orange.com/openidconnect/fr/v1/authorize\"\n}",
          "type": "json"
        }
      ]
    },
    "group": "OIDC",
    "filename": "api/controllers/OidcController.js",
    "groupTitle": "OIDC",
    "name": "PutMsisdnId",
    "sampleRequest": [
      {
        "url": "http://checkandgo-orangegroup.rhcloud.com/msisdn/:id"
      }
    ]
  },
  {
    "type": "DELETE",
    "url": "/partner/:id",
    "title": "Delete a Partner",
    "version": "0.2.0",
    "group": "Partner",
    "filename": "api/controllers/PartnerController.js",
    "groupTitle": "Partner",
    "name": "DeletePartnerId",
    "sampleRequest": [
      {
        "url": "http://checkandgo-orangegroup.rhcloud.com/partner/:id"
      }
    ]
  },
  {
    "type": "get",
    "url": "/partner",
    "title": "Get a Partner",
    "version": "0.2.0",
    "group": "Partner",
    "filename": "api/controllers/PartnerController.js",
    "groupTitle": "Partner",
    "name": "GetPartner",
    "sampleRequest": [
      {
        "url": "http://checkandgo-orangegroup.rhcloud.com/partner"
      }
    ]
  },
  {
    "type": "POST",
    "url": "/partner",
    "title": "Create a Partner",
    "version": "0.2.0",
    "group": "Partner",
    "filename": "api/controllers/PartnerController.js",
    "groupTitle": "Partner",
    "name": "PostPartner",
    "sampleRequest": [
      {
        "url": "http://checkandgo-orangegroup.rhcloud.com/partner"
      }
    ]
  },
  {
    "type": "PUT",
    "url": "/partner/:id",
    "title": "Edit a Partner",
    "version": "0.2.0",
    "group": "Partner",
    "filename": "api/controllers/PartnerController.js",
    "groupTitle": "Partner",
    "name": "PutPartnerId",
    "sampleRequest": [
      {
        "url": "http://checkandgo-orangegroup.rhcloud.com/partner/:id"
      }
    ]
  },
  {
    "type": "post",
    "url": "/perform",
    "title": "Get a response time of call",
    "version": "0.2.0",
    "group": "Performance",
    "filename": "api/controllers/CallResourceApiController.js",
    "groupTitle": "Performance",
    "name": "PostPerform",
    "sampleRequest": [
      {
        "url": "http://checkandgo-orangegroup.rhcloud.com/perform"
      }
    ]
  },
  {
    "type": "DELETE",
    "url": "/resource/:id",
    "title": "Delete a Resource",
    "version": "0.2.0",
    "group": "Resource",
    "filename": "api/controllers/ResourceController.js",
    "groupTitle": "Resource",
    "name": "DeleteResourceId",
    "sampleRequest": [
      {
        "url": "http://checkandgo-orangegroup.rhcloud.com/resource/:id"
      }
    ]
  },
  {
    "type": "get",
    "url": "/resource",
    "title": "Get a resource",
    "version": "0.2.0",
    "group": "Resource",
    "filename": "api/controllers/ResourceController.js",
    "groupTitle": "Resource",
    "name": "GetResource",
    "sampleRequest": [
      {
        "url": "http://checkandgo-orangegroup.rhcloud.com/resource"
      }
    ]
  },
  {
    "type": "POST",
    "url": "/resource",
    "title": "Create a Resource",
    "version": "0.2.0",
    "group": "Resource",
    "filename": "api/controllers/ResourceController.js",
    "groupTitle": "Resource",
    "name": "PostResource",
    "sampleRequest": [
      {
        "url": "http://checkandgo-orangegroup.rhcloud.com/resource"
      }
    ]
  },
  {
    "type": "PUT",
    "url": "/resource/:id",
    "title": "Edit a Resource",
    "version": "0.2.0",
    "group": "Resource",
    "filename": "api/controllers/ResourceController.js",
    "groupTitle": "Resource",
    "name": "PutResourceId",
    "sampleRequest": [
      {
        "url": "http://checkandgo-orangegroup.rhcloud.com/resource/:id"
      }
    ]
  },
  {
    "type": "DELETE",
    "url": "/result/:id",
    "title": "Delete a Result",
    "version": "0.2.0",
    "group": "Result",
    "filename": "api/controllers/ResultController.js",
    "groupTitle": "Result",
    "name": "DeleteResultId",
    "sampleRequest": [
      {
        "url": "http://checkandgo-orangegroup.rhcloud.com/result/:id"
      }
    ]
  },
  {
    "type": "get",
    "url": "/result/:id",
    "title": "Get a Result",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "optional": false,
            "field": "id",
            "description": "<p>Id of Result</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "number",
            "optional": false,
            "field": "statusCode",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "url",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "number",
            "optional": false,
            "field": "responseTime",
            "description": "<p>response Time in MS</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "id",
            "description": "<p>Id of Result</p>"
          },
          {
            "group": "Success 200",
            "type": "number",
            "optional": false,
            "field": "updatedAt",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "json",
            "optional": false,
            "field": "result",
            "description": "<p>Get a result of the API</p>"
          }
        ]
      }
    },
    "version": "0.2.0",
    "group": "Result",
    "filename": "api/controllers/ResultController.js",
    "groupTitle": "Result",
    "name": "GetResultId",
    "sampleRequest": [
      {
        "url": "http://checkandgo-orangegroup.rhcloud.com/result/:id"
      }
    ]
  },
  {
    "type": "DELETE",
    "url": "/token/:id",
    "title": "Delete a Token",
    "version": "0.2.0",
    "group": "Token",
    "filename": "api/controllers/TokenController.js",
    "groupTitle": "Token",
    "name": "DeleteTokenId",
    "sampleRequest": [
      {
        "url": "http://checkandgo-orangegroup.rhcloud.com/token/:id"
      }
    ]
  },
  {
    "type": "get",
    "url": "/token/:id",
    "title": "Get a Token",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "id",
            "description": "<p>ID of the token.</p>"
          }
        ]
      }
    },
    "version": "0.2.0",
    "group": "Token",
    "filename": "api/controllers/TokenController.js",
    "groupTitle": "Token",
    "name": "GetTokenId",
    "sampleRequest": [
      {
        "url": "http://checkandgo-orangegroup.rhcloud.com/token/:id"
      }
    ]
  }
] });
