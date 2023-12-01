## Kintone Lambda and API GW

### Prerequisite
1. Node.js 20.x

### Install
1. Create new lambda in AWS console [here](https://ap-southeast-1.console.aws.amazon.com/lambda/home#/create/function)
4. Choose any name
5. Choose Node.js 20.x as Runtime
6. Choose arm64 as Architecture, and click Create function
7. Once lambda function created, go to Code tab
8. Copy paste `index.mjs` to the `index.mjs` in lambda Code
9. Go to Configuration tab, then Environment Variables on left hand side of the screen
10. Insert 2 environment variables with values coming from your Kintone environment: `KINTONE_API_TOKEN`, `KINTONE_BASE_URL`, feel free to check the code `index.mjs` to understand where it's used
11. Create new API Gateway in AWS console [here](https://ap-southeast-1.console.aws.amazon.com/apigateway/main/precreate)
12. Click Build on REST API
13. Choose New API, fill the API name that you prefer, and click Create API
14. Go to Resources in the newly created API Gateway, delete any method like (GET, OPTIONS) in /
15. Click Create resource from /
16. In Resource path, ensure / is selected and fill the Resource name, I use events, check CORS, and click Create resource
17. Choose /events from Resources, delete any existing method, and then click Create method
18. In Method type choose GET
19. Choose Lambda function in Integration type
20. Choose Lambda function for Kintone in Lambda function
21. Click Create method
22. Go to /events, click Enable CORS, and select all available Access-Control-Allow-Methods, and click Save
23. Click Models on left hand side of screen
24. Click Create Model, fill Name with KintoneRecords, Content Type with application/json, and Model schema with below, then click Create
```
{
  "type": "object",
  "properties": {
    "records": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "Text_0": {
            "type": "object",
            "properties": {
              "type": { "type": "string" },
              "value": { "type": "string" }
            }
          },
          "Rich_text": {
            "type": "object",
            "properties": {
              "type": { "type": "string" },
              "value": { "type": "string" }
            }
          },
          "Text": {
            "type": "object",
            "properties": {
              "type": { "type": "string" },
              "value": { "type": "string" }
            }
          },
          "Attachment": {
            "type": "object",
            "properties": {
              "type": { "type": "string" },
              "value": {
                "type": "array",
                "items": {
                  "type": "object",
                  "properties": {
                    "fileKey": { "type": "string" },
                    "name": { "type": "string" },
                    "contentType": { "type": "string" },
                    "size": { "type": "string" }
                  },
                  "required": ["fileKey", "name", "contentType", "size"]
                }
              }
            }
          },
          "$revision": {
            "type": "object",
            "properties": {
              "type": { "type": "string" },
              "value": { "type": "string" }
            }
          },
          "Updated_by": {
            "type": "object",
            "properties": {
              "type": { "type": "string" },
              "value": {
                "type": "object",
                "properties": {
                  "code": { "type": "string" },
                  "name": { "type": "string" }
                },
                "required": ["code", "name"]
              }
            }
          },
          "Updated_datetime": {
            "type": "object",
            "properties": {
              "type": { "type": "string" },
              "value": { "type": "string" }
            }
          },
          "Created_datetime": {
            "type": "object",
            "properties": {
              "type": { "type": "string" },
              "value": { "type": "string" }
            }
          },
          "Number_1": {
            "type": "object",
            "properties": {
              "type": { "type": "string" },
              "value": { "type": "string" }
            }
          },
          "Number_0": {
            "type": "object",
            "properties": {
              "type": { "type": "string" },
              "value": { "type": "string" }
            }
          },
          "Date_and_time": {
            "type": "object",
            "properties": {
              "type": { "type": "string" },
              "value": { "type": "string" }
            }
          },
          "Number": {
            "type": "object",
            "properties": {
              "type": { "type": "string" },
              "value": { "type": "string" }
            }
          },
          "Record_number": {
            "type": "object",
            "properties": {
              "type": { "type": "string" },
              "value": { "type": "string" }
            }
          },
          "Created_by": {
            "type": "object",
            "properties": {
              "type": { "type": "string" },
              "value": {
                "type": "object",
                "properties": {
                  "code": { "type": "string" },
                  "name": { "type": "string" }
                },
                "required": ["code", "name"]
              }
            }
          },
          "Link": {
            "type": "object",
            "properties": {
              "type": { "type": "string" },
              "value": { "type": "string" }
            }
          },
          "$id": {
            "type": "object",
            "properties": {
              "type": { "type": "string" },
              "value": { "type": "string" }
            }
          }
        },
        "required": ["Text_0", "Rich_text", "Text", "Attachment", "$revision", "Updated_by", "Updated_datetime", "Created_datetime", "Number_1", "Number_0", "Date_and_time", "Number", "Record_number", "Created_by", "Link", "$id"]
      }
    },
    "totalCount": {
      "type": ["integer", "null"]
    }
  },
  "required": ["records"]
}
```
25. Click Create Model, fill Name with EventRecords, Content Type with application/json, and Model schema with below, then click Create
```
{
  "type": "array",
  "items": {
    "type": "object",
    "properties": {
      "id": { "type": "integer" },
      "title": { "type": "string" },
      "date": { "type": "string", "format": "date" },
      "time": { "type": "string", "format": "time" },
      "duration": { "type": "string" },
      "venue": { "type": "string" },
      "numberOfTickets": { "type": "integer" },
      "image": { "type": "string" },
      "ticketPrice": { "type": "number" },
      "eventDescription": { "type": "string" }
    },
    "required": ["id", "title", "date", "time", "duration", "venue", "numberOfTickets", "image", "ticketPrice", "eventDescription"]
  }
}
```
26. Click Resources on left hand side of screen and go to GET under /events
27. In Method response, click Edit on Response 200, in Response body, click Add model if nothing is there, choose application/json as Content type and EventRecords as Model, click Save
28. In Integration response, Create template in Mapping templates
29. Fill application/json in Content type
30. Fill below in Template body and click Create template
```
#set($inputRoot = $input.path('$'))

[
#foreach($record in $inputRoot.records)
  {
    "id": $record.Record_number.value,
    "title": "$record.Text.value",
    "datetime": "$record.Date_and_time.value",
    "duration": $record.Number.value,
    "venue": "$record.Text_0.value",
    "numberOfTickets": $record.Number_0.value,
    "image": "$record.Attachment.value[0].name",
    "imageUrl": "$record.Link.value",
    "ticketPrice": $record.Number_1.value,
    "eventDescription": "$util.escapeJavaScript($record.Text_area.value).replaceAll("\\'","'")"
  }#if($foreach.hasNext),#end
#end
]
```
31. Click Deploy API, choose *New stage* in Stage, fill Stage name, and click Deploy
32. Go to Stages and then the newly created Stage, copy the Invoke URL, it will be used in `next.config.js` of the front end with key `KINTONE_API_GW_URL` under env