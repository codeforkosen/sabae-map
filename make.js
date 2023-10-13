import { CSV } from "https://js.sabae.cc/CSV.js";
import { ArrayUtil } from "https://js.sabae.cc/ArrayUtil.js";

await Deno.mkdir("cate", { recursive: true });

const data = await CSV.fetchJSON("./sabae.csv");

const cates = ArrayUtil.toUnique(data.map(d => d.category));
for (const cate of cates) {
  console.log(cate);
  const d = data.filter(d => d.category == cate);
  await Deno.writeTextFile("cate/" + cate + ".csv", CSV.stringify(d));
  const html = `<!DOCTYPE html><html lang="ja"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width"><link rel="icon" href="data:">
<title>鯖江${cate}マップ</title>
</head><body>
<h1>鯖江${cate}マップ</h1>
<script type="module" src="https://code4fukui.github.io/csv-map/csv-map.js"></script>
<csv-map src="./${cate}.csv"></csv-map>
<a href=../csvmap.html>全部</a>、
${cates.map(c => `<a href=${c}.html>${c}</a>`).join("、")}<br>
<a href="./">deck.gl 3D地図バージョン</a>
<hr>
<a href=https://github.com/codeforkosen/sabae-map/>src on GitHub</a>
</body>
</html>
`;
  await Deno.writeTextFile("cate/" + cate + ".html", html);
}

console.log(cates.map(c => `<a href=cate/${c}.html>${c}</a>`).join("、") + "<br>");
