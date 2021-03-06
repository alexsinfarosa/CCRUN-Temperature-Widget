import React, { Component } from "react";
import { inject, observer } from "mobx-react";

import { Map, TileLayer, CircleMarker, Tooltip } from "react-leaflet";

// material-ui
import { withStyles } from "@material-ui/core/styles";
import withRoot from "../withRoot";

import { stations } from "../assets/stationList";
import { returnBoundingBox } from "../utils/utils";

// styles
const styles = theme => ({
  root: {
    width: "100%",
    height: 550
  }
});

class StationsMap extends Component {
  render() {
    const { classes } = this.props;
    const { station, setStation } = this.props.appStore.paramsStore;

    const stationList = stations.map(stn => (
      <CircleMarker
        key={stn.name}
        center={[stn.lat, stn.lon]}
        radius={stn.sid === "nycthr" ? 10 : 6}
        color={station && stn.sid === station.sid ? "#843EA4" : "#221E22"}
        onClick={() => setStation(stn)}
      >
        <Tooltip>
          <span>{stn.name}</span>
        </Tooltip>
      </CircleMarker>
    ));

    return (
      <div className={classes.root}>
        <Map
          bounds={returnBoundingBox(stations)}
          style={{ width: "100%", height: "100%" }}
          zoomControl={false}
        >
          <TileLayer url="https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_nolabels/{z}/{x}/{y}{r}.png" />
          {stationList}
        </Map>
      </div>
    );
  }
}

export default withRoot(
  withStyles(styles)(inject("appStore")(observer(StationsMap)))
);
