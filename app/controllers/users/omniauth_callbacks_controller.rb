class Users::OmniauthCallbacksController < Devise::OmniauthCallbacksController
  PROVIDERS = {
    facebook:       'Facebook',
    google_oauth2:  'Google'
  }

  def all
    user = User.from_omniauth(request.env['omniauth.auth'])

    if user.persisted?
      if is_navigational_format?
        set_flash_message(:notice, :success,
          kind: PROVIDERS[params[:action].to_sym])
      end
      sign_in_and_redirect user, event: :authentication
    else
      # Removing extra as it can overflow some session stores (google_oauth2)
      session['devise.omniauth_data'] =
        request.env['omniauth.auth'].except(:extra)
      redirect_to new_user_registration_url,
        alert: user.errors.full_messages.join("\n")
    end
  end

  PROVIDERS.each do |provider, _|
    alias_method provider, :all
  end

  def failure
    redirect_to root_path
  end
end
