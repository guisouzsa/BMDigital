// Gera favicon, ícones do app, logo para dados estruturados e imagem social
// a partir do símbolo BM em vetor (src/components/BmSymbol.tsx).
// Uso: node scripts/brand-assets.mjs
import fs from "node:fs";
import sharp from "sharp";

const src = fs.readFileSync("src/components/BmSymbol.tsx", "utf8");
const PATH = src.match(/BM_SYMBOL_PATH =\s*"([^"]+)"/)[1];
const BLUE = "#0A5CFF";
const INK = "#0B0B0D";

// Símbolo (1440x780) centralizado num quadrado, ocupando `scale` da largura.
function squareSvg({ size, bg, fg, radius = 0, scale = 0.64 }) {
  const w = size * scale;
  const k = w / 1440;
  const x = (size - w) / 2;
  const y = (size - 780 * k) / 2;
  const rect = bg ? `<rect width="${size}" height="${size}" rx="${radius}" fill="${bg}"/>` : "";
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">${rect}<path transform="translate(${x.toFixed(2)} ${y.toFixed(2)}) scale(${k.toFixed(5)})" fill="${fg}" fill-rule="evenodd" d="${PATH}"/></svg>`;
}
const png = (svg, out) => sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toFile(out);

// 1. Favicon vetorial (navegadores modernos)
fs.writeFileSync("src/app/icon.svg", squareSvg({ size: 512, bg: BLUE, fg: "#fff", radius: 112 }));

// 2. PNG em alta resolução (Android, atalhos) e apple-touch-icon (iOS aplica a máscara)
await png(squareSvg({ size: 512, bg: BLUE, fg: "#fff", radius: 112 }), "src/app/icon.png");
await png(squareSvg({ size: 180, bg: BLUE, fg: "#fff", scale: 0.62 }), "src/app/apple-icon.png");

// 3. favicon.ico com 16, 32 e 48px renderizados direto do vetor (sem ampliar imagem pequena).
//    Em tamanhos mínimos o símbolo ocupa mais área para continuar legível.
const icoSizes = [16, 32, 48];
const icoPngs = await Promise.all(
  icoSizes.map((s) =>
    sharp(Buffer.from(squareSvg({ size: s, bg: BLUE, fg: "#fff", radius: s * 0.2, scale: s <= 16 ? 0.8 : 0.72 })))
      .png()
      .toBuffer(),
  ),
);
{
  // Contêiner ICO com imagens PNG embutidas (formato suportado desde o Windows Vista)
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(icoSizes.length, 4);
  const dir = Buffer.alloc(16 * icoSizes.length);
  let offset = 6 + dir.length;
  icoSizes.forEach((s, i) => {
    const b = i * 16;
    dir.writeUInt8(s, b);
    dir.writeUInt8(s, b + 1);
    dir.writeUInt16LE(1, b + 4);
    dir.writeUInt16LE(32, b + 6);
    dir.writeUInt32LE(icoPngs[i].length, b + 8);
    dir.writeUInt32LE(offset, b + 12);
    offset += icoPngs[i].length;
  });
  fs.writeFileSync("src/app/favicon.ico", Buffer.concat([header, dir, ...icoPngs]));
}

// 4. Logo para dados estruturados (Google pede formato quadrado, mínimo 112px)
await png(squareSvg({ size: 512, bg: "#ffffff", fg: BLUE, scale: 0.7 }), "public/brand/logo-bm-512.png");
fs.writeFileSync("public/brand/bm-symbol.svg", `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 780"><path fill="${BLUE}" fill-rule="evenodd" d="${PATH}"/></svg>`);

// 5. Imagem social 1200x630: sóbria, editorial, sem brilhos
{
  const W = 1200, H = 630, k = 150 / 1440;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
    <rect width="${W}" height="${H}" fill="${INK}"/>
    <path transform="translate(80 80) scale(${k})" fill="${BLUE}" fill-rule="evenodd" d="${PATH}"/>
    <text x="80" y="340" font-family="Segoe UI, Arial, sans-serif" font-size="72" font-weight="700" fill="#ffffff" letter-spacing="-2">Do produto à</text>
    <text x="80" y="425" font-family="Segoe UI, Arial, sans-serif" font-size="72" font-weight="700" fill="#5B8DFF" letter-spacing="-2">venda fechada.</text>
    <line x1="80" y1="500" x2="1120" y2="500" stroke="#ffffff" stroke-opacity="0.15"/>
    <text x="80" y="550" font-family="Segoe UI, Arial, sans-serif" font-size="24" fill="#ffffff" fill-opacity="0.9">BM Digital</text>
    <text x="1120" y="550" text-anchor="end" font-family="Segoe UI, Arial, sans-serif" font-size="20" fill="#9CA3AF" letter-spacing="4">ASSESSORIA DE GROWTH E VENDAS</text>
  </svg>`;
  await png(svg, "src/app/opengraph-image.png");
  fs.copyFileSync("src/app/opengraph-image.png", "src/app/twitter-image.png");
}


console.log("ok");
