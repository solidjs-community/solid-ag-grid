import { defineConfig } from "tsup";
import * as preset from "tsup-preset-solid";
import pkg from "./package.json";

const preset_options: preset.PresetOptions = {
  entries: [
    {
      entry: "src/index.tsx",
      server_entry: true,
    },
  ],
  drop_console: true,
  cjs: true,
};

export default defineConfig((config) => {
  const watching = !!config.watch;
  const parsedOptions = preset.parsePresetOptions(preset_options, watching);

  if (!watching) {
    const package_fields = preset.generatePackageExports(parsedOptions);
    console.log(`\npackage.json: \n${JSON.stringify(package_fields, null, 2)}\n\n`);
    preset.writePackageJson(package_fields);
  }

  const tsupOptions = preset.generateTsupOptions(parsedOptions).map((tsupOption) => ({
    ...tsupOption,
    name: pkg.name,
    dts: !tsupOption.dts
      ? undefined
      : {
          footer: `declare module '${pkg.name}'`,
        },
  }));

  return tsupOptions;
});
