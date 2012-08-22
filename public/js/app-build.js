({
  appDir : './',
  baseUrl : './',
  optimize : 'uglify',
  dir : '../release',
  preserveLicenseComments: false,

  mainConfigFile: 'config.js',

  modules: [
    {
      name: 'main',
      include: ['app']
    }
  ]
})