import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="sm:px-16 py-4 px-8 flex justify-between items-center gap-2 flex-wrap bg-[#161921]">
      <p className="text-base font-bold text-white">
        &copy; ShikiSphere {new Date().getFullYear()}
      </p>

      <Link href="/">
        <Image
          src="/logo.svg"
          alt="logo"
          width={47}
          height={44}
          className="object-contain"
        />
      </Link>

      <Link
        href="https://github.com/kanan88/shikisphere"
        target="_blank"
        rel="noreferrer"
        className="flex items-center gap-6"
      >
        <Image
          src="/github.svg"
          alt="github"
          width={19}
          height={19}
          className="object-contain"
        />
      </Link>
    </footer>
  );
};

export default Footer;
