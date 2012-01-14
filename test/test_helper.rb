ENV['RACK_ENV']

require 'bundler'
Bundler.setup
Bundler.require(:default, :test)

require_relative '../app'
require_relative 'factories'

class TestHelper < MiniTest::Unit::TestCase
  def app()
    App
  end

  def setup
    DatabaseCleaner.strategy = :truncation
    DatabaseCleaner.clean_with(:truncation)
    DatabaseCleaner.start
  end

  def teardown
    DatabaseCleaner.clean
  end
end