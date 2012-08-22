({
  optimize : 'uglify',
  preserveLicenseComments: false,

  name: 'vendor/almond.js',
  include: 'main',
  out: 'headspace.js',

  mainConfigFile: 'config.js'
})