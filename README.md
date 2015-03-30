# FeedHenry Toolbox MBaaS Server

This is a toolbox cloud app that exercises all the main components of fh-mbaas-api 

# Group Toolbox API

# cloud [/api/v1/cloud]

Get Hello from the cloud.

## cloud [POST] 

+ Request (application/json)
    + Body
            {
              "name": "FeedHenry"
            }

+ Response 200 (application/json)
    + Body
            {
              "msg": "Hello from the cloud FeedHenry!"
            }
            
# service [/api/v1/service]

'$fh.service' endpoint.

## service [POST] 

+ Request (application/json)
    + Body
            {
              "guid": "JVYX4wZxnuLqvAX8G6Z5VnYL",
              "path": "/hello",
              "method": "POST",
              "params": { "name": "FeedHenry" }
            }

+ Response 200 (application/json)
    + Body
            {
              "msg": "Hello from your MBaaS Service FeedHenry!"
            }
            

# hash [/api/v1/hash]

'$fh.hash' endpoint.

## hash [POST] 

+ Request (application/json)
    + Body
            {
              "algorithm": "MD5",
              "text": "hello"
            }

+ Response 200 (application/json)
    + Body
            {
              "hashvalue": "5d41402abc4b2a76b9719d911017c592"
            }

# sec [/api/v1/sec]

'$fh.sec' endpoint.

## sec [POST] 

+ Request (application/json)
    + Body
            {
              "act": "keygen",
              "params": { "algorithm": "AES", "keysize": 128 }
            }

+ Response 200 (application/json)
    + Body
            {
              "iv": "ead77e6e2ae59a2d0549523d9bcbe6b1",
              "secretkey": "b9195d145b99a4609c7f0fd77290dd75" 
            }
            
# db/:type [/api/v1/db/:type]

'$fh.db' endpoint. "type" can be any collection name

## db/:type [GET] 

+ Response 200 (application/json)
    + Body
            {
              "count": 1,
              "list": [{
                "type": "entries",
                "guid": "55197e0e8fb7890e0e000003",
                "fields": { "firstname": "Feed", "lastname": "Henry", "email": "fh@feedhenry.com" }
              }]
            }
            
## db/:type [POST] 

+ Request
    + Body
            {
              "fields": { "firstname": "Feed", "lastname": "Henry", "email": "fh@feedhenry.com" }
            }

+ Response 200 (application/json)
    + Body
            {
              "type": "entries",
              "guid": "55197e0e8fb7890e0e000003",
              "fields": { "firstname": "Feed", "lastname": "Henry", "email": "fh@feedhenry.com" }
            }
            
## db/:type [DELETE] 

+ Response 200 (application/json)
    + Body
            {
              "status": "ok",
              "count": 1
            }
            
# db/:type/:guid [/api/v1/db/:type/:guid]

'$fh.db' endpoint. "guid" should be replaced with actual guid.

## db/:type/:guid [GET] 

+ Response 200 (application/json)
    + Body
            {
              "type": "entries",
              "guid": "55197e0e8fb7890e0e000003",
              "fields": { "firstname": "Feed", "lastname": "Henry", "email": "fh@feedhenry.com" }
            }
            
## db/:type/:guid [POST] 

+ Request
    + Body
            {
              "fields": { "firstname": "Feed", "lastname": "Henry", "email": "fh@feedhenry.com" }
            }

+ Response 200 (application/json)
    + Body
            {
              "type": "entries",
              "guid": "55197e0e8fb7890e0e000003",
              "fields": { "firstname": "Feed", "lastname": "Henry", "email": "fh@feedhenry.com" }
            }
            
## db/:type/:guid [DELETE] 

+ Response 200 (application/json)
    + Body
            {
              "type": "entries",
              "guid": "55197e0e8fb7890e0e000003",
              "fields": { "firstname": "Feed", "lastname": "Henry", "email": "fh@feedhenry.com" }
            }
            
# cache/:key [/api/v1/cache/:key]

'$fh.cache' endpoint. "key" can be any key.

## cache/:key [GET] 

+ Response 200 (application/json)
    + Body
            {
              "value": "FeedHenry",
              "expire": 1427735500789
            }
            
## cache/:key [POST] 

+ Request
    + Body
            {
              "value": "FeedHenry"
            }

+ Response 200 (application/json)
    + Body
            {
              "value": "FeedHenry",
              "expire": 1427735500789
            }
            
## cache/:key [DELETE] 

+ Response 200 (application/json)
    + Body
            { 
              "message": "cache cleared"
            }

# health [/api/v1/health]

health checkpoint

## health [GET] 

+ Response 200 (application/json)
    + Body
            {
              "status": "ok",
              "summary": "No issues to report. All tests passed without error",
              "details": "..."
            }
            
