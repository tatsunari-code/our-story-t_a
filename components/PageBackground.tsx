export default function PageBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden bg-[#f8f7f3]">
      <div className="absolute -left-24 top-[8%] h-64 w-64 rounded-full bg-[#c9e2e8] opacity-60 blur-3xl" />

      <div className="absolute -right-24 top-[30%] h-72 w-72 rounded-full bg-[#d2e4e9] opacity-70 blur-3xl" />

      <div className="absolute -left-20 top-[58%] h-56 w-56 rounded-full bg-[#d5e5e9] opacity-40 blur-3xl" />

      <div className="absolute -right-20 top-[82%] h-64 w-64 rounded-full bg-[#dce8eb] opacity-40 blur-3xl" />
    </div>
  );
}
