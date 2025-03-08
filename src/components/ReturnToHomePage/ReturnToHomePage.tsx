import Link from "next/link";

const ReturnToHomePage = () => {
  return (
    <div className="flex justify-center py-3">
      <Link className="page-content hover:underline" href={"/"}>
        <p className="float-left mx-3">{"<"}</p>
        <p className="">Powrót na stronę główną</p>
      </Link>
    </div>
  );
};

export default ReturnToHomePage;
