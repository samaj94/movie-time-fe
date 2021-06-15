const config = {
  s3: {
    REGION: "us-east-2",
    BUCKET: "movie-review-upload",
  },
  apiGateway: {
    REGION: "us-east-2",
    URL: "https://ljez3hjaab.execute-api.us-east-2.amazonaws.com/prod/",
  },
  cognito: {
    REGION: "us-east-2",
    USER_POOL_ID: "us-east-2_XFQwCBwa0",
    APP_CLIENT_ID: "6u0ob8jqjjj8ekoec9er7moqor",
    IDENTITY_POOL_ID: "us-east-2:1ed45069-6093-48cd-88b4-61e363a15ab9",
  },
};

export default config;