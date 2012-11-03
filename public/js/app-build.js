({
  optimize: 'uglify',
  preserveLicenseComments: false,
  inlineText: true,

  name: 'vendor/almond.js',
  include: 'main',
  out: 'headspace.js',

  mainConfigFile: 'config.js',

  pragmasOnSave: {
    //removes Handlebars.Parser code (used to compile template strings) set
    //it to `false` if you need to parse template strings even after build
    excludeHbsParser : true,
    // kills the entire plugin set once it's built.
    excludeHbs: true,
    // removes i18n precompiler, handlebars and json2
    excludeAfterBuild: true
  }
})