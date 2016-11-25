class CreateStations < ActiveRecord::Migration[5.0]
  # def change
  #   create_table :stations do |t|
  #     t.string :division, null: false
  #     t.string :line, null: false
  #     t.string :name, null: false
  #     t.string :latitude, null: false
  #     t.string :longitude, null: false
  #     t.string :r1
  #     t.string :r2
  #     t.string :r3
  #     t.string :r4
  #     t.string :r5
  #     t.string :r6
  #     t.string :r7
  #     t.string :r8
  #     t.string :r9
  #     t.string :r10
  #     t.string :r11
  #     t.timestamps
  #   end
  # end
  def change
    create_table :stations do |t|
      t.string :stop_id, null: false
      t.string :code
      t.string :name
      t.string :latitude, null: false
      t.string :longitude, null: false
      t.string :stop_desc
      t.string :parent_station
      t.string :train_lines, default: ""


      t.timestamps
    end
  end
end
