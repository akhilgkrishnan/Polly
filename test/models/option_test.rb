require 'test_helper'

class OptionTest < ActiveSupport::TestCase
  def setup
    @poll = Poll.new(title: 'What is sum of 1 + 5?')
    Option.delete_all
    @option = Option.new(value: '6', poll: @poll)
  end

  test 'instance of option' do
    assert_instance_of Option, @option
  end

  test 'option is invalid without value' do
    @option.value = ''
    assert_not @option.valid?
  end

  test 'option should not be valid without poll' do
    @option.poll = nil
    assert_not @option.valid?
  end

  test 'option value should be of valid length' do
    @option.value = 's' * 100
    assert_not @option.valid?
  end
end
