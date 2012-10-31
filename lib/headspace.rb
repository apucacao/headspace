require 'bundler'
Bundler.require

ENV['RACK_ENV'] ||= 'development'

$stdout.sync = true if ENV['RACK_ENV'] == 'development'

module Headspace
end

require 'headspace/database'

Dir.glob(File.dirname(__FILE__) + "/headspace/helpers/*.rb") { |file| require file }
Dir.glob(File.dirname(__FILE__) + "/headspace/model/*.rb") { |file| require file }

require 'headspace/webservice'
require 'headspace/application'
