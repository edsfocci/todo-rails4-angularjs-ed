class TemplatesController < ApplicationController

  def index
    task_list = params[:id] && TaskList.find(params[:id])

    if task_list
      if user_signed_in? && current_user == task_list.owner
        authenticate_user!
      elsif task_list.share
        @task_list = task_list.to_json(only: :name, include: :tasks).html_safe
        render 'home/task_list'
      else
        redirect_to root_url
      end
    else
      authenticate_user!
    end
  end

  def template
    authenticate_user!
    render :template => 'templates/' + params[:path], :layout => nil
  end

end
