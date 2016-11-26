class CreatePoints < ActiveRecord::Migration[5.0]
  def change
    create_table :points do |t|
      t.string :shape_id
      t.float :latitude
      t.float :longitude
      t.string :sequence
      t.timestamps
    end
  end
end
