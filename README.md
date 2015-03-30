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
