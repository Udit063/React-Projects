const region = process.env.REACT_APP_AWS_REGION || "us-east-1";
const accessKeyId = process.env.REACT_APP_AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.REACT_APP_AWS_SECRET_ACCESS_KEY;

// Only include credentials if both values are provided. If either is
// missing, don't set `credentials` here so the SDK can fall back to other
// credential providers (or fail with a clearer message). Supplying an
// object with undefined values causes the SDK error: "Resolved credential
// object is not valid" which you saw in the console.
const awsConfig = { region };
if (accessKeyId && secretAccessKey) {
  awsConfig.credentials = { accessKeyId, secretAccessKey };
} else {
  // Helpful runtime warning during development.
  // (In production do NOT store keys in the frontend — use Cognito/Amplify or a backend.)
  // eslint-disable-next-line no-console
  console.warn(
    "AWS credentials not found in environment. `awsConfig` will not include credentials. " +
      "Set REACT_APP_AWS_ACCESS_KEY_ID and REACT_APP_AWS_SECRET_ACCESS_KEY in a .env.local for local testing or use a secure auth flow."
  );
}

export default awsConfig;
