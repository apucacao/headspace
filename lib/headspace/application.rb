require 'sinatra/base'
require 'sinatra/reloader'
require 'sinatra/capture'
require 'sinatra/content_for'
require 'sinatra/namespace'
require 'sinatra/json'
require 'logger'

Dir.glob(File.dirname(__FILE__) + "/helpers/*.rb") { |file| require file }

module Headspace
  class Application < Sinatra::Base
    register Sinatra::Namespace

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

    configure :development do
      register Sinatra::Reloader
      set :database, Sequel.connect('postgres://apucacao@localhost/headspace_dev')
      database.loggers = [Logger.new($stdout)]
    end

    configure :production do
      set :database, Sequel.connect(ENV['HEADSPACE_DATABASE_URL']), :loggers => [Logger.new($stdout)]
    end

    configure :test do
      set :database, Sequel.sqlite
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

    helpers Helpers::Auth
    helpers Helpers::Sanitation
    helpers Helpers::Typography
    helpers Helpers::View
  end
end

Dir.glob(File.dirname(__FILE__) + "/routes/*.rb") { |file| require file }
Dir.glob(File.dirname(__FILE__) + "/model/*.rb") { |file| require file }