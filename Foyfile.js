const { fs, task } = require("foy");
const manifestJson = require("./manifest.json");
const packageJson = require("./package.json");

task("build", async (ctx) => {
	await ctx.exec("webpack --mode=production");
	await fs.mkdirp("./dist");
	await ctx.exec(`zip -D -r ./dist/${packageJson.name}-${manifestJson.version}.zip ./css ./out ./manifest.json`);
});
