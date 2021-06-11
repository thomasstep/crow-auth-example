export default function Home() {
  return (
    <div className="flex flex-col items-center justify-start min-h-screen py-2">
      <header className="flex flex-row items-stretch justify-between w-10/12 m-6">
        <p className="font-bold">
          <a href="/" className="hover:text-purple-500 focus:text-purple-500">
            Crow Auth Example
          </a>
        </p>
        <p>
          <a href="/profile" className="hover:text-purple-500 focus:text-purple-500">
            Profile
          </a>
        </p>
      </header>

      <div className="flex md:flex-row justify-center my-6">
        <h1 className="text-6xl font-bold mt-6">
          Welcome to <a href="/" className="hover:text-purple-500 focus:text-purple-500">Crow Auth's Example</a>
        </h1>
      </div>

      <p className="mx-6">
        Crow makes authentication for your application easy and intuitive without needing to take over control.
      </p>

      <p className="mx-6">
        There are no redirects just APIs.
      </p>
    </div>
  )
}
