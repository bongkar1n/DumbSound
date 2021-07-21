import "bootstrap/dist/css/bootstrap.min.css";
import { useContext, useEffect } from "react";

import Home from "./pages/Home";
import Play from "./pages/Play";
import PaymentAdmin from "./pages/PaymentAdmin";
import Payment from "./pages/Payment";
import PaymentUser from "./pages/PaymentUser";
import AddMusic from "./pages/AddMusic";
import AddArtist from "./pages/AddArtist";
import { Switch, Route, useHistory } from "react-router-dom";
import { UserContext } from "./context/UseContext";
import { API, setAuthToken } from "./config/api";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  const router = useHistory();
  const [state, dispatch] = useContext(UserContext);

  const checkUser = async () => {
    try {
      const response = await API.get("/check-auth");
      console.log(response);

      if (response.status === 404) {
        return dispatch({
          type: "AUTH_ERROR",
        });
      }

      let payload = response.data.data.user;
      payload.token = localStorage.token;

      dispatch({
        type: "USER_SUCCESS",
        payload,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkUser();
  }, []);

  return (
    // <Switch>
    //   <Route path="/home" component={Home} />
    //   <div>
    //     <Route path="/play" component={Play} />
    //     <Route path="/payment" component={Payment} />
    //   </div>
    // </Switch>
    // <Switch>
    //   {state.isLogin === false ? (
    //     <Route path="/home" component={Home} />
    //   ) : (
    //     <div>
    //       <Route path="/play" component={Play} />
    //       <Route path="/payment" component={Payment} />
    //       {state.user.listAs === 1 && (
    //         <div>
    //           <Route path="/admin" component={Admin} />
    //           <Route path="/music" component={AddMusic} />
    //           <Route path="/artist" component={AddArtist} />
    //         </div>
    //       )}
    //     </div>
    //   )}
    // </Switch>

    <Switch>
      {state.isLogin ? (
        <div>
          <Route path="/play" component={Play} />
          <Route path="/payment" component={PaymentUser} />
          {state.user.listAs === 1 && (
            <div>
              <Route path="/admin" component={PaymentAdmin} />
              <Route path="/music" component={AddMusic} />
              <Route path="/artist" component={AddArtist} />
            </div>
          )}
        </div>
      ) : (
        <Route path="/" component={Home} />
      )}
    </Switch>
  );
}

export default App;
