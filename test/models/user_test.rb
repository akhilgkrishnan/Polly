require 'test_helper'

class UserTest < ActiveSupport::TestCase
  def setup
    @user = User.new(
      first_name: "Akhil", 
      last_name: "G Krishnan", 
      email: "akhil@test.com", 
      password: "sample",
      password_confirmation: "sample"
    )
  end
  def test_user_should_be_not_be_valid_and_saved_without_email
    @user.email = ''
    assert_not @user.valid?
  
    @user.save
    assert_equal ["Email can't be blank", 'Email is invalid'],
                  @user.errors.full_messages
  end

  def test_user_should_not_be_valid_and_saved_if_email_not_unique
    @user.save!
  
    test_user = @user.dup
    assert_not test_user.valid?
  
    assert_equal ['Email has already been taken'],
                  test_user.errors.full_messages
  end

  def test_reject_email_of_invalid_length
    @user.email = ('a' * 50) + '@test.com'
    assert @user.invalid?
  end

  def test_validation_should_accept_valid_addresses
    valid_emails = %w[user@example.com USER@example.COM US-ER@example.org
                      first.last@example.in user+one@example.ac.in]
  
    valid_emails.each do |email|
      @user.email = email
      assert @user.valid?
    end
  end
  
  def test_validation_should_reject_invalid_addresses
    invalid_emails = %w[user@example,com user_at_example.org user.name@example.
                        @sam-sam.com sam@sam+exam.com fishy+#.com]
  
    invalid_emails.each do |email|
      @user.email = email
      assert @user.invalid?
    end
  end

  def test_user_should_not_be_saved_without_password
    @user.password = nil
    assert_not @user.save
    assert_equal ["Password can't be blank"],
                  @user.errors.full_messages
  end
  
  def test_user_should_not_be_saved_without_password_confirmation
    @user.password_confirmation = nil
    assert_not @user.save
    assert_equal ["Password confirmation can't be blank"],
                  @user.errors.full_messages
  end
end