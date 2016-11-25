# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20161123163234) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "lines", force: :cascade do |t|
    t.string   "line_identifier"
    t.string   "day"
    t.datetime "time_start"
    t.datetime "time_stop"
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
  end

  create_table "routes", force: :cascade do |t|
    t.string   "route_id"
    t.string   "agency_id"
    t.string   "route_short_name"
    t.string   "route_long_name"
    t.string   "route_desc"
    t.string   "route_type"
    t.string   "route_url"
    t.string   "route_text_color"
    t.datetime "created_at",       null: false
    t.datetime "updated_at",       null: false
  end

  create_table "stationlines", force: :cascade do |t|
    t.integer  "station_id"
    t.integer  "line_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["line_id"], name: "index_stationlines_on_line_id", using: :btree
    t.index ["station_id"], name: "index_stationlines_on_station_id", using: :btree
  end

  create_table "stations", force: :cascade do |t|
    t.string   "stop_id",                     null: false
    t.string   "code"
    t.string   "name"
    t.string   "latitude",                    null: false
    t.string   "longitude",                   null: false
    t.string   "stop_desc"
    t.string   "parent_station"
    t.string   "train_lines",    default: ""
    t.datetime "created_at",                  null: false
    t.datetime "updated_at",                  null: false
  end

  create_table "stoptimes", force: :cascade do |t|
    t.string   "trip_id"
    t.string   "arrival_time"
    t.string   "departure_time"
    t.string   "stop_id"
    t.string   "stop_sequence"
    t.string   "stop_headsign"
    t.string   "pickup_type"
    t.string   "drop_off_type"
    t.string   "shape_dist_traveled"
    t.datetime "created_at",          null: false
    t.datetime "updated_at",          null: false
  end

  create_table "trainpaths", force: :cascade do |t|
    t.string   "line_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "trips", force: :cascade do |t|
    t.string   "route_id"
    t.string   "service_id"
    t.string   "trip_id"
    t.string   "trip_headsign"
    t.string   "direction_id"
    t.string   "block_id"
    t.string   "shape_id"
    t.datetime "created_at",    null: false
    t.datetime "updated_at",    null: false
  end

end
