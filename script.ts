import { outputFile, readdir, readFile } from "fs-extra";
import * as logger from "@fengshangwuqi/logger";

import pkg from "./package.json";

(async () => {
  const name = pkg.name;
  const title = `> # ${name}`;
  const pkgDir = "examples";

  const targetArr = await readdir(pkgDir);
  const pkgPaths = targetArr.map(item => `${pkgDir}/${item}`);

  const promises = pkgPaths.map(path => {
    return readFile(`${path}/package.json`, "utf-8");
  });
  const content = await Promise.all(promises).then(data =>
    data
      .sort()
      .map((str, idx) => `- [${JSON.parse(str).name}](./${pkgPaths[idx]})`)
      .join("\n"),
  );

  await outputFile("./README.md", [title, content].join("\n\n"));

  logger.success(`generate ${name}`);
})();
