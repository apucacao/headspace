module Headspace
  class Application < Sinatra::Base
    before '/auth/*' do
      @auth = request.env['omniauth.auth']
    end

    get '/auth/google_oauth2/callback' do
      user = Headspace::Model::User[:provider => @auth['provider'], :uid => @auth['uid']]

      if user
        user.update(:avatar => @auth['info']['image'])
      else
        user = Headspace::Model::User.create_from_auth_hash(@auth)
      end

      session[:user_id] = user.id
      redirect '/'
    end

    get '/auth/failure' do
      redirect '/'
    end

    get '/auth/logout' do
      session[:user_id] = nil
      redirect '/'
    end
  end
end