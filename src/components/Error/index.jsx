export default function Error({ title, description }) {
  return (
    <div className="flex flex-col items-center justify-center p-4 m-4 text-white font-semibold bg-red-500 rounded-lg">
      <h1 className="uppercase">{title}</h1>
      <p>{description}</p>
    </div>
  );
}
