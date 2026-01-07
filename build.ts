await Bun.build({
  entrypoints: ['index.ts'],
  minify: true,
  compile: {
    target: 'bun-linux-x64',
    outfile: 'build/server',
  }
});