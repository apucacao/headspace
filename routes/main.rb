class App < Sinatra::Application
  get '/' do
    @links = Link.with_starred(current_user).all if authenticated?
    slim :app
  end
end