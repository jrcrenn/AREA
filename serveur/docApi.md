# AREA API definition

## User

* GET /user/signIn
  * request query :
    * username : *String*
    * password : *String*
  * answer body :

    ```json
    {
        "token" : "String"
    }
    ```

---

* POST /user/signUp
  * request query :
    * username : *String*
    * password : *String*
  * answer body :

    ```json
    {
        "token" : "String"
    }
    ```

---
---

## Services

* GET /user/service
  * request query :
    * token : *String*
  * answer body :

    ```json
    {
        "services" : [
            "Facebook",
            "service2"
        ]
    }
    ```

* POST /user/service
  * request query :
    * token : *String*
    * service : *String*
    * tokenService : *String*
  * answer body :

    ```json
    {
        "success": 1,
        "message": "success"
    }
    ```

    ```json
    {
        "success": 0,
        "message": "setvice not found"
    }
    ```

---
---

## AREA

* GET /area/listActions
  * request query :
    * token : *String*
  * answer body :

    ```json
    [
        {
            "actionId":1,
            "actionName":"Post FB",
            "serviceName":"Facebook",
            "actionDescription":"New post on my FB",
            "actionParam1Description":"The person that posted on my FB",
            "actionVariable1Description":"post content",
            "actionVariable2Description":"NULL"
        }
    ]
    ```

---

* GET /area/listReactions
  * request query :
    * token : *String*
  * answer body :

    ```json
    [
        {
            "reactionId":1,
            "serviceName":"Facebook",
            "reactionName":"Post FB on my wall",
            "reactionDescription":"Post something on my FB",
            "reactionParam1Description":"The post content",
            "reactionParam2Description":"NULL",
        },
        {
            "reactionId":2,
            "serviceName":"Facebook",
            "reactionName":"Post FB on friend's wall",
            "reactionDescription":"Post something on friend's FB",
            "reactionParam1Description":"The post content",
            "reactionParam2Description":"Friend's ID name",
        },
        {
            "reactionId":3,
            "serviceName":"GMAIL",
            "reactionName":"Send an Email",
            "reactionDescription":"Send a gmail email",
            "reactionParam1Description":"Email content",
            "reactionParam2Description":"Email receiver",
        }
    ]
    ```
---

* GET /user/desactivateArea
  * request query :
    * token : *String*
    * areaId : *String*
  * answer body :

    ```json
    {
        "success": 1,
        "message": "success"
    }
    ```

---

* GET /user/activateArea
  * request query :
    * token : *String*
    * areaId : *String*
  * answer body :

    ```json
    {
        "success": 1,
        "message": "success"
    }
    ```

---

* GET /user/area
  * request query :
    * token : *String*
  * answer body :

    ```json
    [
        {
            "name": "AREA1",
            "description": "When pierre post on my FB, send an email",
            "id":"01",
            "activated": 1,
            "action" : {
                "action_id":1,
                "param1":"1222",
            },
            "reaction" : {
                "reaction_id":1,
                "param1":"Salut pierre tu viens de recevoir : {{actionVariable1}}",
                "param2":"pierre@pierre.com"
            }
        }
    ]
    ```

---

* POST /user/area
  * request query :
    * token : *String*
  * request body :

    ```json
    {
        "name": "AREA1",
        "description": "When pierre send me an email, send an email",
        "activated": 1,
        "action" : {
            "action_id":2,
            "param1":"*"
        },
        "reaction" : {
            "reaction_id":2,
            "param1":"Salut pierre tu viens de recevoir : {{actionVariable1}}",
            "param2":"pierre@cavapas.fr"
        }
    }
    ```

  * answer body :

    ```json
    {
        "success": 1,
        "message": "success"
    }
    ```

    ```json
    {
        "success": 0,
        "message": "setvice action not found"
    }
    ```


---

* DELETE /user/area
  * request query :
    * token : *String*
    * areaId : *String*
  * answer body :

    ```json
    {
        "success": 1,
        "message": "success"
    }
    ```

    ```json
    {
        "success": 0,
        "message": "area not found"
    }
    ```

---
---

## Gmail specific Code

Connexion : Webview to get token and then send get it and push through post service
* GET /getAuth/gmail
  * answer body :

    ```json
    [
        {
            "token":"token"
        }
    ]
    ```

    ```json
    {
        "success": 0,
        "message": "Service not connected"
    }
    ```

## Github specific Code

Connexion : Webview to get token and then send get it and push through post service
* GET /getAuth/github
  * answer body :

    ```json
    [
        {
            "token":"token"
        }
    ]
    ```

    ```json
    {
        "success": 0,
        "message": "Service not connected"
    }
    ```

## Github specific Code

Connexion : Webview to get token and then send get it and push through post service
* GET /getAuth/outlook
  * answer body :

    ```json
    [
        {
            "token":"token"
        }
    ]
    ```

    ```json
    {
        "success": 0,
        "message": "Service not connected"
    }
    ```

## Twitter specific Code

Connexion : Webview to get token and then send get it and push through post service
* GET /getAuth/twitter
  * answer body :

    ```json
    [
        {
            "token":"token"
        }
    ]
    ```

    ```json
    {
        "success": 0,
        "message": "Service not connected"
    }
    ```