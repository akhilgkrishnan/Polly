# frozen_string_literal: true

class PollsController < ApplicationController
  before_action :load_poll, only: %i[show update destroy]
  def index
    polls = Poll.all
    render status: :ok, json: { polls: polls }
  end

  def show
    render status: :ok, json: { poll: @poll.as_json(include: {
                                                      options: {
                                                        only: %i[id value vote_count]
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

  def update
    if @poll.update(poll_params)
      render status: :ok, json: { notice: t('successfully_updated', type: 'Poll') }
    else
      errors = @poll.errors.full_messages
      render status: :unprocessable_entity, json: { errors: errors }
    end
  end

  def destroy
    if @poll.destroy
      render status: :ok, json: { notice: t('successfully_deleted', type: 'Poll') }
    else
      render status: :unprocessable_entity, json: { errors:
      @task.errors.full_messages.to_sentence }
    end
  end

  private

  def load_poll
    @poll = Poll.find_by!(id: params[:id])
  rescue ActiveRecord::RecordNotFound => e
    render json: { errors: e }
  end

  def poll_params
    params.require(:poll).permit(:title, options_attributes: %i[id value vote_count])
  end
end
