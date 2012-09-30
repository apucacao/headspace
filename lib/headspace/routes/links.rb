module Headspace
  class Application < Sinatra::Base
    def get_links (dataset_name, options={})
      page = params.include?('page') ? params['page'].to_i : 1

      if page <= 0
        status 400
      else
        status 200
        dataset = Model::Link.send("#{dataset_name}_for", current_user)

        # TODO: move this into a helper
        if options.include?('q')
          term = sanitize_search_term(options['q'])
          dataset = dataset.full_text_search(:note, term)
        end

        dataset = dataset.reverse_order(:created_at)
        dataset = dataset.limit(settings.page_size, (page - 1) * settings.page_size)

        # FIXME: PG search for a dangling single quote was throws
        # a syntax error. Sequel escapes literals already, yet a
        # couple of corner cases still cause an error. So until
        # I can figure out what is going wrong, the user will see no
        # results for these searches.
        body(dataset.all.to_json) rescue [].to_json
      end
    end

    before '/links/*' do
      redirect '/' unless authenticated?
      content_type :json
    end

    # Get all links
    get '/links/' do
      results = get_links(:all, params)
      puts ">>> #{results}"
      results
    end

    # Get starred links
    get '/links/starred/' do
      get_links(:starred, params)
    end

    # Create a link
    post '/links/?' do
      data = JSON.parse(request.body.read.to_s)
      starred = data['starred']
      data[:owner] = current_user
      data.delete('starred')

      link = Model::Link.new(data)

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
    put '/links/:link_id' do
      data = JSON.parse(request.body.read.to_s)

      if !data
        status 400
      else
        link = Model::Link.with_starred(current_user).first(:id => params[:link_id])
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