require 'test_helper'

class PollsControllerTest < ActionDispatch::IntegrationTest
  test 'list all polls in the database' do
    Poll.create(title: 'Which is the best country')
    Poll.create(title: 'Which is the best state in india?')
    get polls_url
    assert_response :success
    response_body = response.parsed_body
    assert_equal Poll.all.count, response_body['polls'].length
  end

  test 'create poll with blank title' do
    post polls_url, params: { poll: { title: '' } }
    assert_response :unprocessable_entity
    response_json = response.parsed_body
    assert_equal response_json['errors'], "Title can't be blank"
  end

  test 'delete a poll, should remove the poll from databse' do
    Poll.create(title: 'Which is the best country')
    test = Poll.create(title: 'Which is the best state in india?')
    delete "/polls/#{test.id}"
    assert_equal Poll.all.count, 1
  end
end
