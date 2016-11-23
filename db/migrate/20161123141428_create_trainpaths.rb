class CreateTrainpaths < ActiveRecord::Migration[5.0]
  def change
    create_table :trainpaths do |t|
      t.string :line_id
      t.timestamps
    end
  end
end
