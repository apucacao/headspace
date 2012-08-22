class User < Sequel::Model
  plugin :timestamps, :update_on_create => true

  one_to_many :contributions, :class => :Link, :key => :owner_id
  many_to_many :starred_links, :class => :Link, :order => :created_at,
    :join_table => :starred_links, :left_key => :user_id, :right_key => :link_id,
    :after_load => proc{|v, objs| objs.each{|o| o[:starred] = true}}

  def self.create_from_auth_hash(auth)
    create do |user|
      user.provider = auth['provider']
      user.uid = auth['uid']
      user.name = auth['info']['name']
      user.email = auth['info']['email']
      user.avatar = auth['info']['image']
    end
  end
end