import { useMutation, useQuery } from "@tanstack/react-query";
import {
  Alert,
  CardMedia,
  CircularProgress,
  Fab,
  Select,
  TextField,
} from "@mui/material";
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
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  useProductProperties,
  useProperties,
} from "../../../hooks/useProperties";
import { useContext } from "react";
import UserContext, { IUserContext } from "../../../context/UserContext";
import { Role } from "../../../model/Role";

export function Properties() {
  const { id } = useParams();
  const { isLoading, isError, properties } = useProperties();
  const {
    isLoading: isLoadingProductProperties,
    isError: isErrorProductProperties,
    productProperties,
    isAddingProductProperty,
    isAddingProductPropertyError,
    deleteProductPropertyMutation,
    addProductPropertyMutation,
    isDeletingProductProperty,
    isDeletingProductPropertyError,
  } = useProductProperties(id!);
  const [isEditing, setIsEditing] = useState(false);
  /* Still error: when nothing is selected it gives null when trying to add 
  Fix: add 'Select one' option to select or set first id as selected state*/
  const [selectedProperty, setSelectedProperty] = useState<string | null>(null);
  const [selectedValue, setSelectedValue] = useState<string | null>(null);
  const { loggedIn, role } = useContext<IUserContext>(UserContext);

  function deleteProperty(value: number) {
    deleteProductPropertyMutation(value);
  }

  function addProductProperty(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (selectedProperty && selectedValue && id) {
      addProductPropertyMutation({
        productId: parseInt(id),
        propertyId: parseInt(selectedProperty),
        value: selectedValue,
      });
      setSelectedProperty(null);
      setSelectedValue(null);
    }
  }

  if (isLoading || isLoadingProductProperties) {
    return <CircularProgress />;
  } else if (!properties || !productProperties) {
    return <Alert severity="error">Product does not exist</Alert>;
  } else if (isError || isErrorProductProperties) {
    return <Alert severity="error">Property could not be loaded</Alert>;
  } else if (
    isEditing &&
    properties &&
    productProperties &&
    loggedIn &&
    role === Role.Admin
  ) {
    return (
      <>
        <Paper elevation={1} sx={{ p: 2, mb: 2 }}>
          <Typography variant="h6">Properties</Typography>
          <Divider sx={{ my: 2 }} />
          {productProperties.map((productProperty) => (
            <div key={productProperty.id}>
              <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                <Typography variant="body1" gutterBottom>
                  {
                    properties.find(
                      (property) => productProperty.propertyId === property.id
                    )?.name
                  }{" "}
                  : {productProperty.value}
                </Typography>
                <Box sx={{ flexGrow: 1 }} />
                <DeleteIcon
                  sx={{ color: "red", cursor: "pointer" }}
                  onClick={() => {
                    deleteProperty(productProperty.id);
                  }}
                />
              </Box>
            </div>
          ))}
          <Divider sx={{ my: 2 }} />
          <form onSubmit={addProductProperty}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Select
                  native
                  fullWidth
                  label="Property"
                  inputProps={{
                    name: "property",
                    id: "property",
                  }}
                  value={selectedProperty}
                  onChange={(e) => setSelectedProperty(e.target.value)}
                >
                  <option aria-label="None" value="" >Select an option</option>
                  {properties.map(
                    (property) =>
                      productProperties.find(
                        (productProperty) =>
                          productProperty.propertyId === property.id
                      ) === undefined && (
                        <option value={property.id}>{property.name}</option>
                      )
                  )}
                </Select>
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  required
                  id="value"
                  name="value"
                  label="Value"
                  fullWidth
                  autoComplete="value"
                  value={selectedValue}
                  onChange={(e) => setSelectedValue(e.target.value)}
                />
              </Grid>

              <Grid item xs={12} sm={2}>
                <Button
                  type="submit"
                  variant="contained"
                  sx={{ height: "100%" }}
                  color="primary"
                >
                  Add
                </Button>
              </Grid>
            </Grid>
          </form>
          <Button
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            color="primary"
            onClick={() => setIsEditing(false)}
          >
            Done
          </Button>
        </Paper>
      </>
    );
  } else {
    return (
      <>
        <Paper elevation={1} sx={{ p: 2, mb: 2 }}>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="h6">Properties</Typography>
            {loggedIn && role === Role.Admin && (
              <Fab
                size="small"
                color="primary"
                aria-label="edit"
                onClick={() => setIsEditing(true)}
              >
                <EditIcon />
              </Fab>
            )}
          </Box>
          <Divider />
          {productProperties.length > 0 ? (
            productProperties.map((productProperty) => (
              <div key={productProperty.id}>
                <Typography variant="body1" gutterBottom>
                  {
                    properties.find(
                      (property) => productProperty.propertyId === property.id
                    )?.name
                  }{" "}
                  : {productProperty.value}
                </Typography>
              </div>
            ))
          ) : (
            <Typography variant="body1" gutterBottom>
              No properties
            </Typography>
          )}
        </Paper>
      </>
    );
  }
}
