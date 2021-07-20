class Poll < ApplicationRecord
  has_many :options, dependent: :destroy
  validates :title, presence: true, length: { maximum: 100 }
  accepts_nested_attributes_for :options, allow_destroy: true
  belongs_to :user
end
