export default function Header({ title }) {
  return (
    <header>
      <div className="mx-auto p-4 bg-purple-600">
        <h1 className="text-center text-white font-semibold text-xl">
          {title}
        </h1>
      </div>
    </header>
  );
}
