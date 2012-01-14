Sequel.migration do
  change do
    create_table(:users) do
      primary_key :id
      String :provider, :null => false
      String :uid, :null => false
      String :name, :null => false
      String :email, :null => false
      String :avatar
      
      timestamp :created_at, :null => false
      timestamp :updated_at, :null => false

      index [:provider, :uid], :unique => true
    end
  end
end