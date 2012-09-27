module Headspace
  module Helpers
    module Auth
      def current_user
        @current_user ||= Headspace::Model::User.find(:id => session[:user_id])
      end

      def authenticated?
        !!current_user
      end
    end
  end
end