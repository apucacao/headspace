module Sinatra
  module Sanitation
    module Helpers
      def sanitize_search_term (q)
        q.to_s.gsub(/&\|/, '').gsub(/\s/, ' & ')
      end
    end
  end

  helpers Sanitation::Helpers
end