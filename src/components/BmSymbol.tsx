import type { SVGProps } from "react";

// Símbolo BM em vetor, redesenhado sobre o logo oficial (public/images/logo-bm.png).
export const BM_SYMBOL_PATH =
  "M5 12H560C660 12 735 100 735 210C735 290 690 355 615 380C705 400 765 480 765 580C765 690 675 775 560 775H5V285H478C500 285 515 268 515 246C515 224 500 207 478 207H5ZM195 482V572H485C510 572 530 552 530 527C530 502 510 482 485 482ZM760 160C770 200 768 290 695 372L995 652L1212 470V775H1437V2L1010 345L775 147C768 142 758 150 760 160Z";

export function BmSymbol({ title, ...props }: SVGProps<SVGSVGElement> & { title?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1440 780"
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      {...props}
    >
      {title && <title>{title}</title>}
      <path fill="currentColor" fillRule="evenodd" d={BM_SYMBOL_PATH} />
    </svg>
  );
}
