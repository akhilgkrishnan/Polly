# frozen_string_literal: true

class PollsController < ApplicationController
  skip_before_action :verify_authenticity_token
  before_action :load_poll, only: [:show]
  def index
    polls = Poll.all
    render status: :ok, json: { polls: polls }
  end

  def show
    render status: :ok, json: { poll: @poll.as_json(include: {
                                                      options: {
                                                        only: %i[id value]
                                                      }
                                                    }) }
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

  def load_poll
    @poll = Poll.find_by!(id: params[:id])
  rescue ActiveRecord::RecordNotFound => e
    render json: { errors: e }
  end

  def poll_params
    params.require(:poll).permit(:title, options_attributes: %i[value])
  end
end
