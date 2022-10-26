import { useMutation, useQuery } from "@tanstack/react-query";
import { Alert, CardMedia, CircularProgress, Fab } from "@mui/material";
import { useParams } from "react-router-dom";
import { useState } from "react";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import {
  useProductProperties,
  useProperties,
} from "../../../hooks/useProperties";

export function Properties() {
  const { id } = useParams();
  const { isLoading, isError, properties } = useProperties();
  const {
    isLoadingProductProperties,
    isErrorProductProperties,
    productProperties,
  } = useProductProperties(id!);

  if (isLoading || isLoadingProductProperties) {
    return <CircularProgress />;
  } else if (!properties || !productProperties) {
    return <Alert severity="error">Product does not exist</Alert>;
  } else if (isError || isErrorProductProperties) {
    return <Alert severity="error">Property could not be loaded</Alert>;
  } else {
    return (
      <div>
        <Paper elevation={1} sx={{ p: 2, mb: 2 }}>
          <Typography variant="h6" gutterBottom>
            Properties
          </Typography>
          <Divider />
          {productProperties.map((productProperty) => (
            <div>
              <Typography variant="body1" gutterBottom>
                {
                  properties.find(
                    (property) => productProperty.propertyId === property.id
                  )?.name
                }{" "}
                : {productProperty.value}
              </Typography>
            </div>
          ))}
        </Paper>
      </div>
    );
  }
}
