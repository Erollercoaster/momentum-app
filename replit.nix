{ pkgs }: {
  deps = [
    pkgs.sass
    pkgs.nodePackages.vscode-langservers-extracted
    pkgs.nodePackages.typescript-language-server
  ];
}