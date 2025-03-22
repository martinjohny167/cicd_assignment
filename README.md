# AWS CDK Project with S3, Lambda, and DynamoDB

This project demonstrates the use of AWS CDK to create three AWS resources that are eligible for the AWS Free Tier:
- Amazon S3 Bucket for storing static files
- AWS Lambda Function for serverless computing
- Amazon DynamoDB Table for NoSQL database operations

## Prerequisites

- Node.js (v14 or later)
- AWS CDK CLI (`npm install -g aws-cdk`)
- AWS Account and configured AWS CLI credentials

## Project Structure

```
my-cdk-project/
├── bin/
│   └── my-cdk-project.ts      # CDK app entry point
├── lib/
│   └── my-cdk-project-stack.ts # Main stack implementation
├── test/                      # Unit tests
├── cdk.json                   # CDK configuration
└── package.json              # Project dependencies
```

## Resources Created

1. **S3 Bucket**
   - Versioned storage
   - Configured for development/testing (auto-deletion enabled)

2. **Lambda Function**
   - Node.js 18.x runtime
   - Basic handler that returns a JSON response
   - Permissions to access S3 and DynamoDB

3. **DynamoDB Table**
   - Partition key: 'id' (String)
   - On-demand capacity mode (Free tier eligible)
   - Configured for development/testing (auto-deletion enabled)

## Deployment

1. Install dependencies:
   ```bash
   npm install
   ```

2. Build the project:
   ```bash
   npm run build
   ```

3. Deploy the stack:
   ```bash
   cdk deploy
   ```

## Important Notes

- This stack is configured for development/testing with `RemovalPolicy.DESTROY`
- Resources are created with Free Tier eligible configurations
- Make sure to review the AWS Free Tier limits for your account

## Cleanup

To destroy the stack and all resources:
```bash
cdk destroy
```

## Security Considerations

- The stack is configured for development/testing purposes
- For production use:
  - Remove `RemovalPolicy.DESTROY`
  - Configure appropriate encryption
  - Review IAM permissions
  - Enable CloudWatch logging 