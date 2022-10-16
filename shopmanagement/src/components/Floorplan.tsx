import { Location } from "../model/Location";
import { useMutation, useQuery } from "@tanstack/react-query";
import {Alert, CircularProgress, Fab} from "@mui/material";
import {useParams} from "react-router-dom";
import { useState } from "react";
import { useLocations } from "../hooks/useLocations";
import { Button } from "@mui/material";
import "./css/floorplan.css"
import { Add } from '@mui/icons-material';

export function Floorplan() {
  //const {innerWidth, innerHeight} = window;
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
        <div className="bgimage">
          <h1>Floorplan</h1>
          <ul>
            {locations.map((location) => (
                <div key={location.id} style={{position:"absolute", bottom:(location.x/936)*100+"%", left:(location.y/1920)*100+"%", height:location.height, width:location.width, border:"5px solid black"}}>
                  <Button className="addsign" href={"/locations/"+location.id}>
                  <Add />
                  </Button>
                </div>
            ))}
          </ul>
        </div>
      );
    }
    };