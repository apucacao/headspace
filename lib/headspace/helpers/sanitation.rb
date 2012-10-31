module Headspace
  module Helpers
    module Sanitation
      def sanitize_search_term (q)
        q.to_s.gsub(/&\|/, '').gsub(/\s/, ' & ')
      end
    end
  end
end