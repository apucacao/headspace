Sequel.migration do
  change do
    alter_table :links do
      drop_index [:url, :note]
      add_full_text_index [:note]
    end
  end
end