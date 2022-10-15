import { Location } from "../model/Location";
import { useMutation, useQuery } from "@tanstack/react-query";
import {Alert, CircularProgress, Fab} from "@mui/material";
import {useParams} from "react-router-dom";
import { useState } from "react";
import { useLocations } from "../hooks/useLocations";

export function Floorplan() {
    const {isLoading, isError, locations} = useLocations();
    if (isLoading) {
      return <CircularProgress />;
    } else 
    if (!locations) {
      return <Alert severity="error">There are no locations found</Alert>;
     } else if (isError) {
      return <Alert severity="error">Locations could not be loaded</Alert>;
    } else {
      return (
        <div>
          <h1>Floorplan</h1>
          <ul>
            {locations.map((location) => (
                <div key={location.id} style={{position:"absolute", bottom:location.x, left:location.y, height:location.height, width:location.width, backgroundColor:"black"}}>
                </div>
            ))}
          </ul>
        </div>
      );
    }
    };