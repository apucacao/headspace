require 'sinatra/base'
require 'sinatra/reloader'
require 'sinatra/capture'
require 'sinatra/content_for'
require 'sinatra/namespace'
require 'sinatra/json'
require 'logger'

module Headspace
  class Application < Sinatra::Base
    register Sinatra::Namespace
    register Sinatra::Reloader if development?

    set :views, File.join(File.dirname(__FILE__), 'templates')
    set :public_folder, File.join(File.dirname(__FILE__), '../../public')

    enable :logging

    use Rack::Session::Cookie, :secret => 'use something safer'

    use OmniAuth::Builder do
      provider :google_oauth2, ENV['GOOGLE_CLIENT_ID'], ENV['GOOGLE_CLIENT_SECRET'],
        :approval_prompt => 'auto'
    end

    set :page_size, 50

    helpers do
      include Rack::Utils
      include Sinatra::ContentFor
      include Sinatra::JSON

      alias_method :h, :escape_html

      def development?
        Application.development?
      end

      def production?
        Application.production?
      end
    end

    helpers Helpers::Auth
    helpers Helpers::Sanitation
    helpers Helpers::Typography
    helpers Helpers::View
  end
end

Dir.glob(File.dirname(__FILE__) + "/application/*.rb") { |file| require file }

