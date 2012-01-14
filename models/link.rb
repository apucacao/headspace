class Link < Sequel::Model
  many_to_one :owner, :class => :User

  dataset_module do
    def with_starred (user)
      select_all(:links).select_more([[{:starred_links__link_id => :links__id}, true]].case(false).as(:starred)).left_join(:starred_links, :user_id => user.id, :link_id => :id)
    end
  end

  def validate
    super
    errors.add(:url, 'cannot be empty') if !url || url.empty?
    errors.add(:url, 'is not a valid URL') unless url =~ /^https?:\/\//
    errors.add(:note, 'cannot be empty') if !note || note.empty?
    errors.add(:owner_id, 'must point to a valid User') if !owner
  end

  def to_json (*args)
    {
      'id'         => self.id,
      'url'        => self.url,
      'note'       => self.note,
      'created_at' => self.created_at.iso8601,
      'starred'    => self[:starred]
    }.to_json(*args)
  end
end