class CreateStoptimes < ActiveRecord::Migration[5.0]
  def change
    create_table :stoptimes do |t|
      t.string :trip_id
      t.string :time
      t.string :stop_id
      t.string :sequence
      t.timestamps
    end
  end
end
