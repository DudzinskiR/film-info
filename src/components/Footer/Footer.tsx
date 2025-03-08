import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <div className="bg-background-secondary flex justify-center">
      <div className="flex flex-row items-center justify-center page-content py-5 gap-5 text-gray-300">
        <p>This website is powered by the</p>
        <Link href={"https://www.themoviedb.org/"}>
          <Image
            alt="TMDB"
            src={
              "https://www.themoviedb.org/assets/2/v4/logos/v2/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg"
            }
            height={50}
            width={150}
          />
        </Link>
      </div>
    </div>
  );
};

export default Footer;
