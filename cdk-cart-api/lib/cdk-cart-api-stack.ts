import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';

export class CdkCartApiStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const elasticBeanstalkApiUrl =
      process.env.ELASTIC_BEANSTALK_CART_API_URL ??
      'http://elena-cherpakova-cart-api-dev.ca-central-1.elasticbeanstalk.com';

    const api = new apigateway.RestApi(this, 'eb-cart-api', {
      restApiName: 'Elastic Bean Cart Service',
      defaultCorsPreflightOptions: {
        allowOrigins: apigateway.Cors.ALL_ORIGINS,
        allowMethods: apigateway.Cors.ALL_METHODS,
        allowHeaders: apigateway.Cors.DEFAULT_HEADERS,
        allowCredentials: true,
      },
    });

    //creating proxy server
    const proxyResource = api.root.addProxy({
      anyMethod: false,
    });
    const methodOptions = {
      requestParameters: {
        'method.request.path.proxy': true,
      },
    };

    const integration = new apigateway.HttpIntegration(
      `${elasticBeanstalkApiUrl}/{proxy}`,
      {
        proxy: true,
        httpMethod: 'ANY',
        options: {
          connectionType: apigateway.ConnectionType.INTERNET,
          requestParameters: {
            'integration.request.path.proxy': 'method.request.path.proxy',
          },
        },
      },
    );
    proxyResource.addMethod('ANY', integration, methodOptions);
  }
}
