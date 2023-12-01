## EventX Backend

The backend consists of 2 lambdas for interacting with Kintone and Redis Cloud, 1 API Gateway fronting the Kintone Lambda, 1 cloudfront, and S3 bucket for image, Kintone account, and Redis Cloud.

Please read the README file of `kintone-lambda` and `redis-lambda` for more information how to deploy the lambda and API Gateway.


I don't have terraform or cloud formation, so please deploy manually if you'd like to replicate the deployment.

## S3 Bucket

1. Create S3 bucket in AWS console by going to this [page](https://s3.console.aws.amazon.com/s3/bucket/create)
2. Feel free to use any region (I use Singapore region) and choose unique name for bucket
3. Keep all default settings and click Create bucket
4. You can upload the image you want to use for the event in the bucket

## Cloudfront

1. Create cloudfront distribution in AWS console by going to this [page](https://us-east-1.console.aws.amazon.com/cloudfront/v4/home#/distributions/create)
2. Choose S3 bucket created earlier as Origin domain
3. Choose Origin access control settings (recommended) in Origin access
4. Click Create control setting, use default setting, and click Create
5. Choose https only in Viewer protocol policy
6. Keep all other default settings and click Create distribution

## Kintone
I assume you have basic knowledge of Kintone
1. Crate kintone account [here](https://www.kintone.com/en-sea/)
2. After account is ready, login and import `Event Management.zip` as app template and then create app or create app from template file and then upload `Event Management.zip`
3. In the newly craeted app, populate the fields with (dummy) events you want to test
4. Create API token for the Event app just created (feel free to give permission only for View Records as we don't update the record from front end) and note it as it will be used in Lambda environment variable
5. Also note your kintone subdomain (it is subdomain to your account e.g. `pq3ad2mhj123.kintone.com`)

## Redis Cloud
I assume you have basic knowledge of Redis
1. Create redis cloud account [here](https://redis.com/try-free/)
2. After account is ready, login and create new database, feel free to name it anything you like, I use Event as name.
3. Get the connection info from database Endpoint (there's a button called Connect - click on it)
4. Go to Redis Client, in Select your client choose Node.js, note the password, host, and port (host and port are under socket)