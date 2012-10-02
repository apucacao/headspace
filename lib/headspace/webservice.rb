require 'sinatra/base'
require 'sinatra/namespace'
require 'sinatra/json'
require 'sinatra/reloader'

module Headspace
  class WebService < Sinatra::Base
    register Sinatra::Namespace
    register Sinatra::Reloader if development?

  end
end

Dir.glob(File.dirname(__FILE__) + "/model/*.rb") { |file| require file }
Dir.glob(File.dirname(__FILE__) + "/webservice/*.rb") { |file| require file }
