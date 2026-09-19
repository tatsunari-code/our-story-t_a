import Link from "next/link";

type MenuLinkProps = {
  href: string;
  en: string;
  ja: string;
};

export default function MenuLink({ href, en, ja }: MenuLinkProps) {
  return (
    <Link
      href={href}
      className="block border border-[#c8d1d5] px-6 py-6 text-center transition hover:bg-[#eef3f4]"
    >
      <p className="text-xs tracking-[0.3em] text-[#87969e]">{en}</p>

      <p className="mt-2 font-serif text-xl tracking-[0.08em]">{ja}</p>
    </Link>
  );
}
