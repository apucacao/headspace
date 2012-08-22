({
  appDir : './',
  baseUrl : './',
  optimize : 'uglify',
  dir : '../release',

  mainConfigFile: 'config.js',

  modules: [
    {
      name: 'main',
      include: ['app']
    }
  ]
})