import ReactDOM from "react-dom/client";
import React, { Suspense } from "react";
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router } from "react-router-dom";
import { BrowserTracing } from "@sentry/tracing";
import { ErrorBoundary } from "@sentry/react";
import * as Sentry from "@sentry/react";
import { TourProvider } from "@reactour/tour";
import Auth0ProviderWithHistory from "./auth/auth0-provider-with-history";
import AuthorizedApolloProvider from "./auth/authorized-apollo-provider";
import { NotificationProvider } from "./components/Notifications/NotificationContext";
import "./components/Internationalization/i18n";
import CircleSpinner from "./components/CircleSpinner/CircleSpinner";
import { Close } from "./components/UIOnboarding/Components/Components";

// TODO: Replace sentry's DSN
if (process.env.NODE_ENV === "production") {
  Sentry.init({
    dsn: "https://df467e90526b4e03a27bab12d5fd2fa2@o4504439295770624.ingest.sentry.io/4504439301275648",
    integrations: [new BrowserTracing()],
    tracesSampleRate: 1.0,
  });
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ErrorBoundary fallback={<p>An error has occured, you are in the error boundary now.</p>}>
    <Suspense fallback={<CircleSpinner />}>
      <Router>
        <Auth0ProviderWithHistory>
          <AuthorizedApolloProvider>
            <NotificationProvider>
              <TourProvider
                scrollSmooth={true}
                disableFocusLock={false}
                components={{ Close }}
                styles={{
                  maskWrapper: (base) => ({
                    ...base,
                    color: "black",
                  }),
                  badge: (base) => ({
                    ...base,
                    color: "white",
                    background: "#ff5e00",
                  }),
                  popover: (base) => ({
                    ...base,
                    background: "black",
                    borderRadius: "10px",
                    border: "1px solid #ff5e00",
                    paddingLeft: "20px",
                  }),
                }}
              >
                <App />
              </TourProvider>
            </NotificationProvider>
          </AuthorizedApolloProvider>
        </Auth0ProviderWithHistory>
      </Router>
    </Suspense>
  </ErrorBoundary>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

