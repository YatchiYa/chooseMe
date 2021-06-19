/*!

=========================================================
* Material Dashboard PRO React - v1.9.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-pro-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react"; 
import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.material.blue.light.css';
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";

import AuthLayout from "layouts/Auth.js";
//import RtlLayout from "layouts/RTL.js";
import AdminLayout from "layouts/Admin.js";

import "assets/scss/material-dashboard-pro-react.scss?v=1.9.0";
import { store } from "./Store";
import { Provider } from "react-redux";
import { LocalizationProvider } from '@material-ui/pickers';
import moment from "moment";
import MomentAdapter from "@material-ui/pickers/adapter/moment";
import { SnackbarProvider } from "notistack";


const hist = createBrowserHistory();

ReactDOM.render(
    <Provider store={store}>
        <SnackbarProvider
            maxSnack={3}
            anchorOrigin={{
                vertical: "top",
                horizontal: "right",
            }}
        >
            <LocalizationProvider dateLibInstance={moment} dateAdapter={MomentAdapter}>
                <Router history={hist}>
                    <Switch>
                        <Route path="/auth" component={AuthLayout} />
                        <Route path="/admin" component={AdminLayout} />
                        <Redirect from="/" to="/auth/pick" />
                    </Switch>
                </Router>
            </LocalizationProvider>
        </SnackbarProvider>
    </Provider>,
    document.getElementById("root")
);
