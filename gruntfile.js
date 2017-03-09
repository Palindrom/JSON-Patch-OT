module.exports = function(grunt) {

  grunt.initConfig({
    uglify: {
      options: {
        beautify: {
          ascii_only: true,
        },
        sourceMap: true,
        sourceMapIncludeSources: true,
        preserveComments: "some"
      },
      default: {
        files: [
          {
            expand: true,     // Enable dynamic expansion.
            cwd: 'src/',      // Src matches are relative to this path.
            src: ['json-patch-ot.js'], // Actual pattern(s) to match.
            dest: 'dist/',   // Destination path prefix.
            ext: '.min.js',   // Dest filepaths will have this extension.
            extDot: 'first'   // Extensions in filenames begin after the first dot
          },
        ]
      }
    },
    bump: {
      options: {
        files: ['package.json', 'bower.json', 'src/*'],
        commit: true,
        commitMessage: '%VERSION%',
        commitFiles: ['package.json', 'bower.json', 'index.d.ts', 'src/*'],
        createTag: true,
        tagName: '%VERSION%',
        tagMessage: 'Version %VERSION%',
        push: false,
        // pushTo: 'origin',
        globalReplace: false,
        prereleaseName: false,
        regExp: false
      }
    }
  });
grunt.loadNpmTasks('grunt-contrib-uglify');
grunt.loadNpmTasks('grunt-bump');
};