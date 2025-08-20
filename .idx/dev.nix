{pkgs}: {
  channel = "unstable";
  packages = [
    pkgs.bun
  ];
  services = {
    docker.enable = true;
  };
  idx.extensions = [
    "biomejs.biome"
    "EditorConfig.EditorConfig"
    "usernamehw.errorlens"
    "tamasfe.even-better-toml"
    "YoavBls.pretty-ts-errors"
    "Codeium.codeium"
    "antfu.icons-carbon"
    "antfu.file-nesting"
    "bradlc.vscode-tailwindcss"
    "redhat.vscode-yaml"
  ];
}