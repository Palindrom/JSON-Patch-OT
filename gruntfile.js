module.exports = function(grunt) {

  grunt.initConfig({
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
  grunt.loadNpmTasks('grunt-bump');
};