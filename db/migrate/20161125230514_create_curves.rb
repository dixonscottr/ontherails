class CreateCurves < ActiveRecord::Migration[5.0]
  def change
    create_table :curves do |t|
      t.string :line_id
      t.references :point
      t.timestamps
    end
  end
end
