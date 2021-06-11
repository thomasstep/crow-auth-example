import Head from 'next/head'

export default function ApiDocs() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <main className="flex flex-col items-center justify-center flex-1 text-center">
        <div className="flex flex-col-reverse md:flex-row justify-center my-6">
          <h1 className="text-6xl font-bold mt-6">
            Crow Authentication's API
          </h1>
        </div>

        <p className="mx-6">
          Crow makes authentication for your application easy and intuitive without needing to take over control.
        </p>

      </main>
    </div>
  )
}
