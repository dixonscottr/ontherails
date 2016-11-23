class CreateLines < ActiveRecord::Migration[5.0]
  def change
    create_table :lines do |t|
      t.string :line_identifier
      t.string :day
      t.string :time
      t.timestamps
    end
  end
end
