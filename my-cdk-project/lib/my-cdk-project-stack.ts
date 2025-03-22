import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';
import * as iam from 'aws-cdk-lib/aws-iam';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class MyCdkProjectStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Create S3 bucket with student ID
    const myBucket = new s3.Bucket(this, 'Martin5124Bucket', {
      versioned: true,
      removalPolicy: cdk.RemovalPolicy.DESTROY,  // Only for dev/test environments
      autoDeleteObjects: true,  // Required for removalPolicy.DESTROY
      bucketName: `martin-5124-bucket-${cdk.Stack.of(this).account}-${cdk.Stack.of(this).region}`,
    });

    // Create DynamoDB table with student ID
    const myTable = new dynamodb.Table(this, 'Martin5124Table', {
      partitionKey: { name: 'id', type: dynamodb.AttributeType.STRING },
      tableName: 'martin-5124-table',
      removalPolicy: cdk.RemovalPolicy.DESTROY,  // Only for dev/test environments
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,  // Free tier eligible
    });

    // Create Lambda function with student ID
    const myLambda = new lambda.Function(this, 'Martin5124Lambda', {
      runtime: lambda.Runtime.NODEJS_18_X,
      handler: 'index.handler',
      functionName: 'martin-5124-function',
      code: lambda.Code.fromInline(`
        exports.handler = async function(event) {
          console.log('Lambda invoked!');
          return { 
            statusCode: 200, 
            body: JSON.stringify({
              message: 'Hello from Martin 5124!',
              timestamp: new Date().toISOString()
            })
          };
        }
      `),
      environment: {
        BUCKET_NAME: myBucket.bucketName,
        TABLE_NAME: myTable.tableName,
        STUDENT_ID: '5124',
      },
    });

    // Grant Lambda permissions to access S3 and DynamoDB
    myBucket.grantReadWrite(myLambda);
    myTable.grantReadWriteData(myLambda);

    // Output the bucket name and Lambda function ARN
    new cdk.CfnOutput(this, 'BucketName', {
      value: myBucket.bucketName,
      description: 'The name of the S3 bucket',
    });

    new cdk.CfnOutput(this, 'LambdaFunctionArn', {
      value: myLambda.functionArn,
      description: 'The ARN of the Lambda function',
    });

    new cdk.CfnOutput(this, 'DynamoDBTableName', {
      value: myTable.tableName,
      description: 'The name of the DynamoDB table',
    });

    // The code that defines your stack goes here

    // example resource
    // const queue = new sqs.Queue(this, 'MyCdkProjectQueue', {
    //   visibilityTimeout: cdk.Duration.seconds(300)
    // });
  }
}
