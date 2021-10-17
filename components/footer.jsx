const links = {
  '/': {
    text: 'Home',
  },
  '/profile/signup': {
    text: 'Sign Up',
  },
}

export default function Footer() {
  return (
    <footer className="justify-self-end w-10/12 m-6 mt-32">
      <div className="flex flex-row justify-center gap-4">
        {
          Object.entries(links).map(([key, value]) => {
            return (
              <p>
                <a href={key} className="hover:text-purple-500 focus:text-purple-500 text-lg">
                  {value.text}
                </a>
              </p>
            )
          })
        }
      </div>
    </footer>
  );
}
