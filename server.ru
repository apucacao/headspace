require 'headspace'

run Rack::URLMap.new(
  '/app' => Headspace::Application.new,
  '/api' => Headspace::WebService.new
)

