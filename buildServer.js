require('esbuild').build({
    entryPoints: ['./src/index.ts'],
    bundle: true,
    outfile: 'build/index.js',
    tsconfig: 'tsconfig.server.json',
    platform: 'node',
    external: ['pg-native', 'bcrypt'],
    plugins: [
      require('esbuild-plugin-copy').copy({
        assets: {
          from: ['./src/database/sql/**/*.sql'],
          // This is the oufile-directory of our esbuild config (see above)
          to: ['./'],
        },
        keepStructure: true
      })
    ],
  })
  .catch(() => process.exit(1))
