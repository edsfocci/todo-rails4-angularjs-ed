class AddShareToTaskLists < ActiveRecord::Migration
  def change
    add_column :task_lists, :share, :boolean, default: false
  end
end
