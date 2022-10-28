import { SuperlitApp } from "@superlit/framework";
import theme from "../theme";
import Router from "@superlit/routing";
import routes from "../routes";

export default function App() {
  return (
    <SuperlitApp theme={theme}>
      <Router.Container routes={routes} theme={theme} />
    </SuperlitApp>
  );
}
