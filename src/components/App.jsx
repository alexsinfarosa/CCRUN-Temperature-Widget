import React, { Component } from "react";
import { inject, observer } from "mobx-react";

import withRoot from "../withRoot";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

// components
import StationsMap from "./StationsMap";

import Row from "./Row";

const styles = theme => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing.unit * 2
  },
  centered: {
    display: "flex",
    flex: 1,
    height: 330,
    justifyContent: "center",
    alignItems: "center"
  },
  legend: {
    color: "white",
    fontWeight: "bold",
    letterSpacing: 1,
    textAlign: "center"
  },
  formControl: {
    minWidth: 140,
    width: "15%",
    marginleft: 8,
    marginRight: 8
  }
});

class App extends Component {
  state = {
    isOpen: false
  };

  handleOpen = () => {
    this.setState({ isOpen: true });
  };

  handleClose = () => {
    this.setState({ isOpen: false });
  };

  render() {
    const { classes } = this.props;
    const {
      station,
      avgTemps,
      avgPcpns,
      seasonalExtreme
    } = this.props.appStore.paramsStore;

    return (
      <Grid container className={classes.root} spacing={32}>
        <Grid item xs={12} sm={4}>
          <Typography variant="display1" gutterBottom>
            <div>
              Viewing Climate Conditions at{" "}
              <span style={{ color: "#843EA4" }}>{station.name}</span>
            </div>
          </Typography>

          <StationsMap />

          <div style={{ marginTop: 32, marginBottom: 32 }}>
            <Typography variant="caption" paragraph align="justify">
              Each climate gauge is based on daily data from the{" "}
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="ftp://ftp.ncdc.noaa.gov/pub/data/papers/200686ams12.4tofree.pdf"
              >
                ThreadEx
              </a>{" "}
              dataset developed by the{" "}
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="http://www.nrcc.cornell.edu/"
              >
                Northeast Regional Climate Center
              </a>
            </Typography>
            <Typography variant="caption" paragraph align="justify">
              The long-term time series of each variable is sorted and divided
              into four segments each containing one quarter of the total
              available data. The lowest 25% of the values are considered below
              normal (blue) and the highest 25% are considered above normal
              (red). The remaining 50% of the values are divided in half to give
              the slightly below (green) and slightly above normal (gold)
              categories. In cases where the slightly below and slightly above
              categories contain the same values, they are combined into a
              single normal (tan) category
            </Typography>
            <Typography variant="caption" paragraph align="justify">
              The slightly larger, highlighted segment shows the category in
              which the current year falls. A new record (gray shading) occurs
              when either the current year’s value falls above the highest or
              below the lowest historical value. Each variable’s historical
              record can be viewed and the data downloaded by clicking on the
              gauge.
            </Typography>
          </div>
        </Grid>

        <Grid item xs={12} sm={8}>
          <Row type="TEMPERATURE" row={avgTemps} />
          <Row type="PRECIPITATION" row={avgPcpns} />
          <Row type="SEASONAL EXTREME" row={seasonalExtreme} />
        </Grid>
      </Grid>
    );
  }
}
export default withRoot(withStyles(styles)(inject("appStore")(observer(App))));
