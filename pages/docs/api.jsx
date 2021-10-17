import Layout from '../../components/layout';
import ApiEndpointCard from '../../components/apiEndpointCard';

const endpoints = [
  {
    name: 'Application Sign In',
    path: '/v1/application/signin',
    method: 'POST',
    body: {
      applicationId: 'asdf1234jkl',
      applicationSecret: 'lkj431fdsa',
    },
    successResponse: {
      code: 200,
      data: {
        token: 'ey...',
      },
    },
    errorResponses: [
      {
        code: 400,
        reason: 'Missing input',
      },
      {
        code: 401,
        reason: 'Invalid secret',
      },
      {
        code: 404,
        reason: 'Application does not exist',
      },
    ],
    customInformation: (
      <>
        <p>
          This endpoint authenticates your Crow Application before it is allowed to make calls on the application users' behalf like signing in and resetting a password.
        </p>
        <p>
          On a successful response, the token is the application's JWT. The application's JWT must be passed in subsequent calls as a Bearer Token.
        </p>
      </>
    ),
  },
  {
    name: 'Sign Up',
    path: '/v1/signup',
    method: 'POST',
    body: {
      email: 'user@email.com',
      password: 'password',
    },
    successResponse: {
      code: 201,
    },
    errorResponses: [
      {
        code: 400,
        reason: 'Missing input',
      },
      {
        code: 403,
        reason: 'Crow Application is in a suspended or disabled state',
      },
      {
        code: 403,
        reason: 'User already exists',
      },
      {
        code: 500,
        reason: 'Application owner has not configured verification URL',
      },
    ],
    customInformation: (
      <>
        <p>
          This endpoint allows a new user to sign up for your application. After the email and password are sent to Crow, an email will be sent to the user-supplied address containing a verification token and the link that you have configured for your application. The link will also contain the verification token as a query parameter named verificationToken.
        </p>
        <p>
          To make the experience better for your users, I suggest dynamically populating a field based on the query parameter instead of forcing them to manually copy and paste.
        </p>
        <p>
          Another possibilty could be to send the user directly to an API endpoint that handles verification automatically based on the query parameter passed to it, then redirects the user to a webpage instead of having them click a button to verify.
        </p>
      </>
    ),
  },
  {
    name: 'Verify',
    path: '/v1/verify',
    method: 'POST',
    body: {
      verificationToken: '1234567890',
    },
    successResponse: {
      code: 200,
      data: {
        email: 'verifiedUser@email.com',
      },
    },
    errorResponses: [
      {
        code: 400,
        reason: 'Missing input',
      },
      {
        code: 403,
        reason: 'Crow Application is in a suspended or disabled state',
      },
      {
        code: 404,
        reason: 'Incorrect verification token',
      },
      {
        code: 500,
        reason: 'Could not find correct email associated with this token',
      },
    ],
    customInformation: (
      <>
        <p>
          This endpoint goes hand-in-hand with the sign up endpoint. The verification supplied to the user via email will need to be sent to Crow in order to verify their identity. This endpoint is there the verification token needs to be sent. On a successful verification, Crow will return the newly verified user's email address.
        </p>
        <p>
          Extending the sign up endpoint's suggestion of hosting a page where the user needs to enter their verification token and click a button, this endpoint would need to be called as a result of the user clicking the button. Any action needed on your application's part could happen based on a successful response from Crow.
        </p>
        <p>
          Extending the sign up endpoint's other suggestion of using an API endpoint for the verification URL configuration, the user interaction with a verification button can be circumvented. The API call to Crow's /v1/verify can take place and your application's business logic can follow a successful verification.
        </p>
      </>
    ),
  },
  {
    name: 'Sign In',
    path: '/v1/signin',
    method: 'POST',
    body: {
      email: 'user@email.com',
      password: 'password',
    },
    successResponse: {
      code: 200,
      data: {
        token: 'ey...',
      },
    },
    errorResponses: [
      {
        code: 400,
        reason: 'Missing input',
      },
      {
        code: 401,
        reason: 'Invalid password',
      },
      {
        code: 403,
        reason: 'Crow Application is in a disabled state',
      },
      {
        code: 404,
        reason: 'User does not exist',
      },
    ],
    customInformation: (
      <>
        <p className="mb-4">
          This endpoint signs a user in based on their stored email and password. On successful authentication, a token is returned that is the user's JWT.
        </p>
        <p className="mb-4">
          The way in which your application stores this JWT is up to you, but I suggest storing it as a cookie in the user's browser. This will allow your application to read and verify the user's identity on subsequent calls made from the UI.
        </p>
        <p className="mb-4">
          To verify the JWT, I suggest using the public JWKS hosted by Crow at <a className="underline" href="https://crowauth.com/v1/jwks.json">https://crowauth.com/v1/jwks.json</a>. Using a library like npm's <code>jose</code>, allows for quick and easy verification of a JWT using the public key set.
        </p>
        <p className="mb-4">
          Another method of verifying the JWT (although I do not suggest it) is using the public key as a file. The file is hosted by Crow at <a className="underline" href="https://crowauth.com/v1/crow-auth.key.pub">https://crowauth.com/v1/crow-auth.key.pub</a> and available for download.
        </p>
        <p className="mb-4">
          After the JWT is verified, the library that you choose to use should return the payload of the JWT. An example of what this would look like can be seen in the example <a className="underline" href="https://github.com/thomasstep/crow-auth-example/blob/6c033c2966f31cbe0610b0ff125da1a77fc0f627/pages/api/user.js#L10">Next.js Application</a>. The payload will contain the email address of the user currently holding the JWT.
        </p>
        <p className="mb-4">
          Some other claims for verifying the JWT include <code>iss</code> and <code>aud</code>. The <code>iss</code> (or Issuer) will always be <code>https://api.crowauth.com</code> and the <code>aud</code> (or Audience) will always be the email address of the user. These claims should be verified before accepting the JWT as valid.
        </p>
      </>
    ),
  },
  {
    name: 'Send Reset Password Email',
    path: '/v1/reset-password/send-email',
    method: 'POST',
    body: {
      email: 'user@email.com',
    },
    successResponse: {
      code: 201,
    },
    errorResponses: [
      {
        code: 400,
        reason: 'Missing input',
      },
      {
        code: 403,
        reason: 'Crow Application is in a disabled state',
      },
      {
        code: 404,
        reason: 'User does not exist',
      },
      {
        code: 500,
        reason: 'Application owner has not configured reset password URL',
      },
    ],
    customInformation: (
      <>
        <p>
          This endpoint sends a user an email containing a token that will allow them to change their password. Similarly to the sign up endpoint, the email will be sent including a link to the reset password URL that you have configured in the Crow console. That link will include the reset password token as a query parameter.
        </p>
        <p>
          To make the experience better for your users, I suggest dynamically populating a field based on the query parameter instead of forcing them to manually copy and paste.
        </p>
        <p>
          Unfortunately, sending the user directly to an  API endpoint that handles resetting their password automatically is not possible since the new password must be passed to the corresponding Crow endpoint for resetting a password.
        </p>
      </>
    ),
  },
  {
    name: 'Reset Password',
    path: '/v1/reset-password',
    method: 'POST',
    body: {
      resetToken: '1234567890',
      password: 'newPassword',
    },
    successResponse: {
      code: 201,
    },
    errorResponses: [
      {
        code: 400,
        reason: 'Missing input',
      },
      {
        code: 403,
        reason: 'Crow Application is in a disabled state',
      },
      {
        code: 403,
        reason: 'Incorrect reset token',
      },
      {
        code: 500,
        reason: 'Could not find correct email associated with this token',
      },
    ],
    customInformation: (
      <>
        <p>
          This endpoint allows a user to reset their password using a token sent to their email address. The request requires the reset token verifying that the user is who they say they are and a new password.
        </p>
        <p>
          To make the experience better for your users, I suggest dynamically populating the reset token field based on the query parameter instead of forcing the user to manually copy and paste. However, the user will need to manually enter their new password.
        </p>
        <p>
          After the user enters their new password and reset token, I suggest passing the information directly through to Crow. On a successful reset, your application can take any measures necessary.
        </p>
      </>
    ),
  },
];

export default function ApiDocs() {
  return (
    <Layout>
      <main className="flex flex-col lg:w-3/5 w-full items-center justify-start flex-1 text-center">
        <div className="flex flex-col justify-center gap-6 my-6">
          <h1 className="text-6xl font-bold mt-6">
            Crow Auth's API
          </h1>
          <p>Check the <a href="https://crowauth.com/docs/api" className="underline hover:text-purple-500 focus:text-purple-500">official documentation</a> as this might be out of date.</p>
        </div>

        {
          endpoints.map((endpoint) => {
            return (
              <ApiEndpointCard key={endpoint.path} endpoint={endpoint}>
                {endpoint.customInformation}
              </ApiEndpointCard>
            );
          })
        }

      </main>
    </Layout>
  )
}
