require 'test_helper'

class PollsControllerTest < ActionDispatch::IntegrationTest
  def setup
    @user = User.create!(first_name: 'Sam',
                         last_name: 'Smith',
                         email: 'sam@example.com',
                         password: 'welcome',
                         password_confirmation: 'welcome')
    @headers = headers(@user)
  end
  test 'list all polls in the database' do
    @user.polls.create(title: 'Which is the best country')
    @user.polls.create(title: 'Which is the best state in india?')
    get polls_url
    assert_response :success
    response_body = response.parsed_body
    assert_equal Poll.all.count, response_body['polls'].length
  end

  test 'create poll with blank title' do
    post polls_url, params: { poll: { title: '' } }, headers: @headers
    assert_response :unprocessable_entity
    response_json = response.parsed_body
    assert_equal response_json['errors'], "Title can't be blank"
  end

  test 'delete a poll, should remove the poll from databse' do
    @user.polls.create(title: 'Which is the best country')
    test = @user.polls.create(title: 'Which is the best state in india?')
    delete "/polls/#{test.id}", headers: @headers
    assert_equal 1, Poll.all.count
  end
end
