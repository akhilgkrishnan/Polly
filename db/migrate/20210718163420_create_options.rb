class CreateOptions < ActiveRecord::Migration[6.1]
  def change
    create_table :options do |t|
      t.string :value
      t.integer :vote_count, default: 0
      t.references :poll, null: false, foreign_key: true, index: true

      t.timestamps
    end
  end
end
