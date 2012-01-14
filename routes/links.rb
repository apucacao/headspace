class App < Sinatra::Application
  namespace '/links' do
    before do
      content_type :json
    end

    get '/?' do
      Link.with_starred(current_user).all.to_json
    end

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
        body(link.errors.to_json)
      end
    end

    put '/:link_id' do
      data = JSON.parse(request.body.read.to_s)
      
      if !data
        status 400
      else
        link = Link.find(:id => params[:link_id])
        if !link  
          status 404
        else
          starred = !!(data['starred'] || false)
          if starred
            current_user.add_starred_link(link)
          else
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