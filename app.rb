# Headspace
# =========

# Headspace is a shared stream of links.

# Set the environment, defaulting to dev
ENV['RACK_ENV'] ||= 'development'

# Automatically require all gems listed in the Gemfile
require 'bundler'
Bundler.require

require 'sinatra/reloader'
require 'sinatra/capture'
require 'sinatra/content_for'
require 'sinatra/namespace'
require 'logger'

# Application
# -----------
class App < Sinatra::Application
  register Sinatra::Namespace

  # Configuration
  # -------------
  # Let's us generate paths relative to the app
  set :root, lambda { |*args| File.join(File.dirname(__FILE__), *args) }
  set :run, lambda { __FILE__ == $0 and not running? }

  enable :logging

  # Enable session cookie middleware
  use Rack::Session::Cookie, :secret => 'use something safer'

  use OmniAuth::Builder do
    provider :google_oauth2, ENV['GOOGLE_CLIENT_ID'], ENV['GOOGLE_CLIENT_SECRET']
  end

  use Rack::Flash, :accessorize => [:success, :notice, :error]

  configure do
    Compass.configuration do |config|
      config.project_path = File.dirname(__FILE__)
      config.sass_dir = 'views'
    end

    set :scss, Compass.sass_engine_options
  end

  # Specific to the dev environment
  configure :development do
    # Ensure that code is automatically reloaded
    register Sinatra::Reloader

    set :database, Sequel.postgres('headspace_dev', :user => 'root', :password => 'qwerty'), :loggers => [Logger.new($stdout)]
  end

  configure :production do
    set :database, Sequel.postgres('headspace', :user => 'root', :password => 'qwerty'), :loggers => [Logger.new($stdout)]
  end

  configure :test do
    set :database, Sequel.sqlite
  end

  helpers do
    include Rack::Utils
    include Sinatra::ContentFor
    alias_method :h, :escape_html

    def development?
      App.development?
    end
  end
end

# Import all our modules
Dir['./{helpers,models,routes}/*.rb'].each { |file| require file }

# Run the application if it is executed directly. (ie. not thru config.ru)
App.run! if App.run?
