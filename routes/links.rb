class App < Sinatra::Application

  def get_links (dataset_name, options={})
    page = params.include?('page') ? params['page'].to_i : 1

    if page <= 0
      status 400
    else
      status 200
      dataset = Link.send("#{dataset_name}_for", current_user)
      dataset = dataset.full_text_search(:note, options['q']) if options.include?('q')
      dataset = dataset.reverse_order(:created_at)
      dataset = dataset.limit(settings.page_size, (page - 1) * settings.page_size)
      dataset.all.to_json
    end
  end

  namespace '/links' do
    before do
      redirect '/' unless authenticated?
      content_type :json
    end

    # Get all links
    get '/' do
      get_links(:all, params)
    end

    # Get starred links
    get '/starred/' do
      get_links(:starred, params)
    end

    # Create a link
    post '/?' do
      data = JSON.parse(request.body.read.to_s)
      starred = data['starred']
      data[:owner] = current_user
      data.delete('starred')

      link = Link.new(data)

      if link.save
        current_user.add_starred_link(link) if starred
        link[:starred] = starred
        status 200
        body(link.to_json)
      else
        status 400
        body({:error => link.errors}.to_json)
      end
    end

    # Update a link
    # FIXME: rewrite...was under the effects of a nice glass of Ouzo...
    put '/:link_id' do
      data = JSON.parse(request.body.read.to_s)

      if !data
        status 400
      else
        link = Link.with_starred(current_user).first(:id => params[:link_id])
        if !link
          status 404
        else
          starred = !!(data['starred'] || false)
          if starred && !link[:starred]
            current_user.add_starred_link(link)
          elsif !starred && link[:starred]
            current_user.remove_starred_link(link)
          end
          link[:starred] = starred
          status 200
          body(link.to_json)
        end
      end
    end
  end
end