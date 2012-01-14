Sequel.migration do
  change do
    create_table(:starred_links) do
      foreign_key :user_id, :users, :null => false
      foreign_key :link_id, :links, :null => false
      timestamp :created_at, :null => false
      primary_key([:user_id, :link_id])
    end
  end
end