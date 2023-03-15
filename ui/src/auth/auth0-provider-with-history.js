import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Auth0Provider } from '@auth0/auth0-react'

const Auth0ProviderWithHistory = ({ children }) => {
  const navigate = useNavigate()
  const domain = process.env.REACT_APP_AUTH0_DOMAIN
  const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID
  const audience = process.env.REACT_APP_AUTH0_AUDIENCE
  const redirect_uri = `${window.location.origin}/callback`

  const onRedirectCallback = (appState) => {
    navigate(appState?.returnTo || window.location.pathname)
  }

  if (!(domain && clientId && redirect_uri)) {
    return null;
  }

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri
      }}
      onRedirectCallback={onRedirectCallback}
      audience={audience}
    >
      {children}
    </Auth0Provider>
  )
}

export default Auth0ProviderWithHistory
