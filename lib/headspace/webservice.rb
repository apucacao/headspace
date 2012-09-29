require 'sinatra/base'
require 'sinatra/json'
require 'sinatra/reloader'

module Headspace
  class WebService < Sinatra::Base
    register Sinatra::Reloader if development?

  end
end