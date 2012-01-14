module Sinatra
  module Auth
    module Helpers
      def current_user
        @current_user ||= User.find(:id => session[:user_id])
      end

      def authenticated?
        !!current_user
      end
    end
  end

  helpers Auth::Helpers
end