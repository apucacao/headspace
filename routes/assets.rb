class App < Sinatra::Application
  get '/css/master.css' do
    scss :master
  end
end