Sequel.migration do
  change do
    create_table(:links) do
      primary_key :id
      # http://www.boutell.com/newfaq/misc/urllength.html
      String :url, :size => 2083, :null => false
      String :note, :size => 140, :null => false
      timestamp :created_at, :null => false
      timestamp :updated_at, :null => false
      foreign_key :owner_id, :users, :key => :id, :null => false
      full_text_index [:url, :note]
    end
  end
end