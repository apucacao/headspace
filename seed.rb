require './app'

require 'machinist/sequel'
require 'faker'

Link.blueprint do
  url { Faker::Internet.url }
  note { Faker::Lorem.words(10).join(' ') }
  owner { User.first }
end