export default async function Footer() {
  return (
    <footer className="flex flex-col">
      <div className="pb-2 text-center">
        <p className="text-xs">
          Created by{' '}
          <a
            href="http://pablosantos.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="text-mainColor font-bold"
          >
            Pablo Santos
          </a>
        </p>
      </div>
    </footer>
  );
}
