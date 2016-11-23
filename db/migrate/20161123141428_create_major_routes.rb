class CreateMajorRoutes < ActiveRecord::Migration[5.0]
  def change
    create_table :major_routes do |t|

      t.timestamps
    end
  end
end
