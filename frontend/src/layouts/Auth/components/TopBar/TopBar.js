import { AppBar, Toolbar, Typography } from "@material-ui/core";
import React from "react";
import DashboardOutlinedIcon from '@material-ui/icons/DashboardOutlined';

function TopBar() {
  return (
    <AppBar color="primary">
      <Toolbar>
        <DashboardOutlinedIcon />
        <Typography
          variant="h5"
          color="inherit"
          style={{ paddingLeft: "10px" }}
        >
          ESKO Seating Bus Application
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default TopBar;
