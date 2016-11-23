class CreateLines < ActiveRecord::Migration[5.0]
  def change
    create_table :lines do |t|
      t.references :station
      t.timestamps
    end
  end
end
