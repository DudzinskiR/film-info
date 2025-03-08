import Link from "next/link";

const NotFound = () => {
  return (
    <div className="flex items-center mt-10 flex-col gap-10">
      <div className="text-3xl">Ups... Podana strona nie istnieje</div>
      <Link className="text-xl border-2 p-3" href={"/"}>
        Powrót do strony głównej
      </Link>
    </div>
  );
};

export default NotFound;
