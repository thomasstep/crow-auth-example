import Layout from '../components/layout';

export default function Home() {
  return (
    <Layout>
      <div className="flex flex-col min-h-screen md:w-2/5 w-4/5 justify-center items-center gap-6">
        <h1 className="text-6xl font-bold mt-6">
          Welcome to the <a href="https://crowauth.thomasstep.com/" className="hover:text-purple-500 focus:text-purple-500">Crow Auth</a> Example
        </h1>
      </div>

      <div
        className="flex flex-col md:flex-row gap-6 min-h-screen md:w-3/5 w-full items-center md:justiy-between justify-center"
      >
        <p className="mx-6">
          Crow makes authentication for your application easy and intuitive without needing to take over control.
        </p>
      </div>

      <div
        className="flex flex-col md:flex-row gap-6 min-h-screen md:w-3/5 w-full items-center md:justiy-between justify-center"
      >
        <p className="mx-6">
          There are no redirects just APIs.
        </p>
      </div>
    </Layout>
  )
}
