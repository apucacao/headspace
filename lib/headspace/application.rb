require 'sinatra/base'
require 'sinatra/reloader'
require 'sinatra/capture'
require 'sinatra/content_for'
require 'sinatra/namespace'
require 'sinatra/json'
require 'logger'

require_relative 'database'

module Headspace
  class Application < Sinatra::Base
    register Sinatra::Namespace
    register Sinatra::Reloader if development?

    set :views, File.join(File.dirname(__FILE__), 'views')
    set :public_folder, File.join(File.dirname(__FILE__), '../../public')

    enable :logging

    use Rack::Session::Cookie, :secret => 'use something safer'

    use OmniAuth::Builder do
      provider :google_oauth2, ENV['GOOGLE_CLIENT_ID'], ENV['GOOGLE_CLIENT_SECRET'],
        :approval_prompt => 'auto'
    end

    use Rack::Flash, :accessorize => [:success, :notice, :error]

    set :page_size, 50

    configure do
      Sequel.extension :pagination
    end

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
  end

  Dir.glob(File.dirname(__FILE__) + "/helpers/*.rb") { |file| require file }

  Application.helpers Helpers::Auth
  Application.helpers Helpers::Sanitation
  Application.helpers Helpers::Typography
  Application.helpers Helpers::View
end

Dir.glob(File.dirname(__FILE__) + "/routes/*.rb") { |file| require file }
Dir.glob(File.dirname(__FILE__) + "/model/*.rb") { |file| require file }