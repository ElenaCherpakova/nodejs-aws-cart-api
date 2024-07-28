import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as path from 'path';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';
import * as dotenv from 'dotenv';
import { HttpMethod } from 'aws-cdk-lib/aws-events';
dotenv.config({ path: path.join(__dirname, '..', '.env') });
export class CdkDeployStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const nestHandler = new lambda.Function(this, 'NestHandler', {
      runtime: lambda.Runtime.NODEJS_20_X,
      handler: 'main.handler',
      code: lambda.Code.fromAsset(path.join(__dirname, '../../dist')),

      environment: {
        DB_HOST: process.env.DB_HOST!,
        DB_PORT: process.env.DB_PORT!,
        DB_USER: process.env.DB_USER!,
        DB_PASSWORD: process.env.DB_PASSWORD!,
        DB_NAME: process.env.DB_NAME!,
      },
    });

    // API Gateway to expose the Lambda function
    const api = new apigateway.RestApi(this, 'importCartApi', {
      restApiName: 'importCartApi',
      cloudWatchRole: true,
      defaultCorsPreflightOptions: {
        allowOrigins: apigateway.Cors.ALL_ORIGINS,
        allowMethods: apigateway.Cors.ALL_METHODS,
        allowHeaders: apigateway.Cors.DEFAULT_HEADERS,
      },
    });
    const integration = new apigateway.LambdaIntegration(nestHandler, {
      proxy: true,
    });
    api.root.addProxy({
      defaultIntegration: integration,
    });
    api.root.addMethod(HttpMethod.GET, integration);
  }
}
