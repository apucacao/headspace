require 'bundler'
Bundler.require

ENV['RACK_ENV'] ||= 'development'

$stdout.sync = true if ENV['RACK_ENV'] == 'development'

module Headspace
end

require 'headspace/webservice'
require 'headspace/application'
