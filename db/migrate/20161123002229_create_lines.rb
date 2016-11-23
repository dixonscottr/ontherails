class CreateLines < ActiveRecord::Migration[5.0]
  def change
    create_table :lines do |t|
      t.string :line_identifier
      t.string :day
      t.datetime :time_start
      t.datetime :time_stop
      t.timestamps
    end
  end
end
