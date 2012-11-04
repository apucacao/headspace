module Headspace
  class Application < Sinatra::Base
    get '/' do
      if authenticated?
        dataset = Model::Link.with_starred(current_user)
        @links = dataset.reverse_order(:created_at).limit(settings.page_size).all
        @rendered_links = @links.map { |link| handlebars('link', link) }
      end

      slim :app
    end
  end
end