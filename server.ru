require 'headspace'

run Rack::URLMap.new(
  '/' => Headspace::Application.new,
  '/api' => Headspace::WebService.new
)

