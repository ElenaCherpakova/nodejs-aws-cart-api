import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as path from 'path';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';

export class CdkDeployStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const nestHandler = new lambda.Function(this, 'NestHandler', {
      runtime: lambda.Runtime.NODEJS_20_X,
      handler: 'main.handler',
      code: lambda.Code.fromAsset(path.join(__dirname, '../../dist')),
      environment: {
        NODE_ENV: 'production',
      },
    });
    // API Gateway to expose the Lambda function
    const api = new apigateway.RestApi(this, 'NestApiGateway', {
      restApiName: 'Nest Service',
      description: 'This service serves a Nest.js application.',
    });
    const integration = new apigateway.LambdaIntegration(nestHandler);
    
    //forward all requests to the Lambda function
    api.root.addProxy({
      defaultIntegration: integration,
    });
    
    new cdk.CfnOutput(this, 'NestApiGatewayUrl', {
      value: api.url,
      description:
        'The URL of the API Gateway endpoint for the Nest.js application',
    });
  }
}
