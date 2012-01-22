class App < Sinatra::Application
  DEFAULT_PAGE = 1
  DEFAULT_PER_PAGE = 15
  MAX_PER_PAGE = 50

  def get_links (dataset_name, options={})
    page = params['page'].to_i || DEFAULT_PAGE
    per_page = params['perPage'].to_i || DEFAULT_PER_PAGE

    if page < 0 || per_page < 0
      status 400
    else
      status 200
      page = DEFAULT_PAGE unless page > 0

      if per_page == 0
        per_page = DEFAULT_PER_PAGE
      elsif per_page > MAX_PER_PAGE
        per_page = MAX_PER_PAGE
      end

      dataset = Link.send("#{dataset_name}_for", current_user)
      dataset = dataset.full_text_search(:note, options['q']) if options.include?('q')
      dataset = dataset.reverse_order(:created_at).paginate(page, per_page)

      count = dataset.count

      start_index = (dataset.current_page - 1) * PER_PAGE + 1

      end_index = (count < PER_PAGE) ? (start_index + count - 1) : dataset.current_page * PER_PAGE

      {
        :links => dataset.all,
        :pagination => {
          :currentPage => dataset.current_page,
          :pageCount => dataset.page_count,
          :perPage => per_page,
          :nextPage => dataset.next_page,
          :prevPage => dataset.prev_page,
          :firstPage => dataset.first_page?,
          :lastPage => dataset.last_page?,
          :start => start_index,
          :end => end_index
        }
      }.to_json
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
      data[:owner] = current_user
      data.delete('starred')

      link = Link.new(data)

      if link.save
        status 200
        body(link.to_json)
      else
        status 400
        body({:error => link.errors}.to_json)
      end
    end

    # Update a link
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