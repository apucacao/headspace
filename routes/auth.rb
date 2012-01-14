class App < Sinatra::Application
  namespace '/auth' do
    before do
      @auth = request.env['omniauth.auth']
    end

    get '/google_oauth2/callback' do
      user = User[:provider => @auth['provider'], :uid => @auth['uid']]

      if user
        user.update(:avatar => @auth['info']['image'])
      else
        user = User.create_from_auth_hash(@auth)
      end

      session[:user_id] = user.id
      redirect '/'
    end

    get '/failure' do
      
    end

    get '/logout' do
      session[:user_id] = nil
      redirect '/'
    end
  end
end