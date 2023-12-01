## Redis Lambda

### Prerequisite
1. Node.js 18.x

### Install
1. Run `npm install`
2. Package your function using command `zip -r <package_name>.zip .`
3. Create new lambda in AWS console [here](https://ap-southeast-1.console.aws.amazon.com/lambda/home#/create/function)
4. Choose any name
5. Choose Node.js 18.x as Runtime
6. In Advanced Settings, check Enable function URL, and click Create function
7. Once lambda function created, go to Code tab.
8. Choose Upload from .zip file and upload the package created in step #2
9. Go to Configuration tab, then Environment Variables on left hand side of the screen
10. Insert 3 environment variables with values coming from your Redis cloud environment: `REDIS_HOST`, `REDIS_PASSWORD`, `REDIS_PORT`, feel free to check the code `index.js` to understand where it's used
11. Go to Function URL on left hand side of screen, click Edit
12. Check Configure cross-origin resource sharing (CORS)
13. Fill * in Allow origin
14. Choose * in Allow methods
15. Add these values: `access-control-allow-origin`, `content-type`, `access-control-allow-methods` in Expose headers and Allow headers, click Save
16. Copy the Function URL of lambda, it will be used in `next.config.js` of the front end with key `REDIS_API_URL` under env
