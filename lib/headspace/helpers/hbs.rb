# credits: https://gist.github.com/945374
require 'tilt'
require 'steering'

class HandlebarsTemplate < Tilt::Template
  def self.engine_initialized?
    defined? ::Steering
  end

  def initialize_engine
    require_template_library 'steering'
  end

  def prepare
    @engine = Steering.context_for(data)
  end

  def evaluate(context, locals, &block)
    @output ||= @engine.call('template', locals)
  end
end

Tilt.register HandlebarsTemplate, '.handlebars', '.hbs'

module Headspace
  module Handlebars
    module Helpers
      def handlebars(template, *args)
        path = File.join(settings.handlebars_directory, "#{template.to_s}.#{settings.handlebars_extension}")
        data = File.read(path)
        Steering.context_for(data).call('template', *args)
      end
    end

    def self.registered(app)
      app.helpers Helpers
      app.set :handlebars_directory, 'handlebars'
      app.set :handlebars_extension, 'handlebars'
    end
  end
end