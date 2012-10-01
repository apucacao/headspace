$: << File.expand_path(File.join(File.dirname(__FILE__)))
$: << File.expand_path(File.join(File.dirname(__FILE__), '..', 'lib'))

ENV['RACK_ENV'] = 'test'

require 'minitest/spec'
require 'minitest/autorun'
require 'minitest/reporters'

MiniTest::Reporters.use! MiniTest::Reporters::SpecReporter.new

require 'bundler'
Bundler.require(:test)
