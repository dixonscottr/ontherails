class CreateStoptimes < ActiveRecord::Migration[5.0]
  def change
    create_table :stoptimes do |t|
      t.string :trip_id
      t.string :arrival_time
      t.string :departure_time
      t.string :stop_id
      t.string :stop_sequence
      t.string :stop_headsign
      t.string :pickup_type
      t.string :drop_off_type
      t.string :shape_dist_traveled

      t.timestamps
    end
  end
end
