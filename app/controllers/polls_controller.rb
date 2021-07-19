# frozen_string_literal: true

class PollsController < ApplicationController
  skip_before_action :verify_authenticity_token
  def index
    polls = Poll.all
    render status: :ok, json: { polls: polls }
  end

  def create
    poll = Poll.new(poll_params)
    if poll.save
      render status: :ok, json: { notice: t('successfully_created', type: 'Poll') }
    else
      errors = poll.errors.full_messages.to_sentence
      render status: :unprocessable_entity, json: { errors: errors }
    end
  end

  private

  def poll_params
    params.require(:poll).permit(:title, options_attributes: %i[value])
  end
end
