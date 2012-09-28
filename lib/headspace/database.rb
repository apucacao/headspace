module Headspace
  DB = Sequel.connect(ENV['HEADSPACE_DATABASE'])
  DB.loggers = [Logger.new($stdout)]
end