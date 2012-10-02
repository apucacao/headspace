require 'sinatra/base'
require 'sinatra/namespace'
require 'sinatra/json'
require 'sinatra/reloader'

module Headspace
  class WebService < Sinatra::Base
    register Sinatra::Namespace
    register Sinatra::Reloader if development?

    use Rack::Session::Cookie, :secret => 'use something safer'

    use OmniAuth::Builder do
      provider :google_oauth2, ENV['GOOGLE_CLIENT_ID'], ENV['GOOGLE_CLIENT_SECRET'],
        :approval_prompt => 'auto'
    end

    set :page_size, 50

    helpers Helpers::Auth
  end
end

Dir.glob(File.dirname(__FILE__) + "/webservice/*.rb") { |file| require file }
