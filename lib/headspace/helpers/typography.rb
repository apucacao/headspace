module Headspace
  module Helpers
    module Typography
      include Sinatra::Capture

      def typogruby(&blk)
        Typogruby.improve(capture(&blk))
      end
    end
  end
end