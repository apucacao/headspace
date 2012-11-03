# credits: https://gist.github.com/945374
require 'tilt'

class HandlebarsTemplate < Tilt::Template
  def initialize_engine
    return if defined?(Handlebars)
    require 'handlebars'
  end

  def prepare
    @template = Handlebars.compile(data)
  end

  def render(context, locals, &block)
    "Templates.#{context.logical_path} = #{@template}"
  end
end