import { execSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.join(__dirname, "..", "public");

const captures = [
  { url: "https://bnirise.com/", output: "bni-rise-community-dashboard.jpg" },
  {
    url: "https://habitat.id/",
    output: "habitat-ecosystem-smart-venue.jpg",
    waitMs: 8000,
  },
  {
    url: "https://gavrainvest.co.id/",
    output: "gavra-trading-education-platform.jpg",
  },
  {
    url: "https://www.livebold.id/",
    output: "la-live-bold-personality-test.jpg",
  },
];

for (const { url, output, waitMs = 3000 } of captures) {
  const outputPath = path.join(publicDir, output);
  const command = [
    "npx --yes playwright@1.49.1 screenshot",
    `--viewport-size="1280,720"`,
    `--wait-for-timeout=${waitMs}`,
    `"${url}"`,
    `"${outputPath}"`,
  ].join(" ");

  process.stdout.write(`Capturing ${url} -> ${output}... `);
  execSync(command, { stdio: "inherit", cwd: publicDir });
  process.stdout.write("done\n");
}
