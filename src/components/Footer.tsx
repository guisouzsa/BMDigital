import Image from "next/image";

export function Footer() {
  return (
    <footer data-tone="dark" className="border-t border-white/10 bg-ink pb-[calc(6rem+env(safe-area-inset-bottom))] text-white sm:pb-8">
      <div className="container-page flex flex-col items-start justify-between gap-4 pt-8 sm:flex-row sm:items-center">
        {/* Logo secundária: símbolo + nome */}
        <Image src="/images/logo-bm-digital-light.png" alt="BM Digital" width={389} height={93} sizes="130px" className="h-6 w-auto" />
        <p className="text-sm text-white/60">© {new Date().getFullYear()} BM Digital. Assessoria de growth e vendas.</p>
      </div>
    </footer>
  );
}
