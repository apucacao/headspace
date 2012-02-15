class App < Sinatra::Application
  get '/' do
    if authenticated?
      dataset = Link.with_starred(current_user)
      @links = dataset.reverse_order(:created_at).limit(settings.page_size).all
    end
    slim :app
  end
end