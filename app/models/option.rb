class Option < ApplicationRecord
  belongs_to :poll
  validates :value, presence: true, length: { maximum: 50 }
end
