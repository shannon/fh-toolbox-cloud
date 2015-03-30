# FeedHenry Toolbox MBaaS Server

This is a toolbox cloud app that exercises all the main components of fh-mbaas-api 

# Group Toolbox API

# cloud [/api/v1/cloud]

'$fh.cloud' endpoint.

## cloud [POST] 

$fh.cloud' endpoint.

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

$fh.service' endpoint.

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

$fh.hash' endpoint.

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

$fh.sec' endpoint.

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
            
# db [/api/v1/db/:type]

'$fh.db' endpoint.

## db [GET] 

$fh.db' endpoint.

+ Request

+ Response 200 (application/json)
    + Body
            {
              "count": 1,
              "list": [{
                "type":"entries",
                "guid":"55197e0e8fb7890e0e000003",
                "fields":{"firstname":"Feed","lastname":"Henry","email":"fh@feedhenry.com"}
              }]
            }
            
cache
health