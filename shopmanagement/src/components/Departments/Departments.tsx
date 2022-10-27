import { Product } from "../../model/Product";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useDepartments } from "../../hooks/useDepartments";
import { useState } from "react";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { Alert, CircularProgress, Divider } from "@mui/material";
import { ProductCard } from "../Products/ProductCard";
import { Link } from "react-router-dom";
import {
  useStoredProducts,
  useStoredProductsFromShelfs,
} from "../../hooks/useStoredProducts";
import { useProducts } from "../../hooks/useProducts";
import { useShelfs } from "../../hooks/useShelfs";
import { Department } from "../../model/Department";
import { ShelfProduct } from "../../model/ShelfProduct";
import { Shelf } from "../../model/Shelf";
import { StoredProductCard } from "../Products/StoredProductCard";
import './css/departments.css'
import {useContext} from "react";
import UserContext, { IUserContext } from "../../context/UserContext";

export function Departments() {
  const { email } = useContext<IUserContext>(UserContext);
  const { isLoadingDepartments:isLoading, isErrorDepartments:isError, departments } = useDepartments();
  const { isLoadingStoredProducts, isErrorStoredProducts, storedproducts } =
    useStoredProducts();
  const { isLoadingShelfs, isErrorShelfs, shelfs } = useShelfs();

  function mapProductsToDepartment(
    departmentId: number,
    storedproducts: ShelfProduct[],
    shelfs: Shelf[]
  ) {
    let ShelfsInDepartment = shelfs.filter(
      (s) => s.departmentId === departmentId
    );
    let StoredProductsOnShelf = storedproducts.filter((storedproduct) =>
      ShelfsInDepartment.some((shelf) => shelf.id === storedproduct.shelfId)
    );
    return StoredProductsOnShelf;
  }
  if (isLoading || isLoadingStoredProducts || isLoadingShelfs) {
    return <CircularProgress />;
  } else if (!departments || !storedproducts || !shelfs) {
    return <Alert severity="error">Product does not exist</Alert>;
  } else if (isError || isErrorStoredProducts || isErrorShelfs) {
    return <Alert severity="error">Product could not be loaded</Alert>;
  } else if (departments.length === 0) {
    return <Alert severity="info">No departments found</Alert>;
  } else if (!email) {
    return (<Alert severity="info">You are not logged in</Alert>);
  } else {
    return (
      <div>
        <Box
          sx={{
            bgcolor: "background.paper",
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
              Departments
            </Typography>
          </Container>
        </Box>
        <Container>
          <Grid container spacing={4}>
            {departments.map((department) => (
              <Grid item key={department.id} xs={12}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    p: 1,
                    m: 1,
                    bgcolor: "background.paper",
                    borderRadius: 1,
                  }}
                >
                  <Typography
                    variant="h5"
                    component="h2"
                    style={{ display: "flex", justifyContent: "flex-start" }}
                  >
                    {department.name}
                  </Typography>
                  <Link
                    to={`/floorplan/${department.id}`}
                    style={{ display: "flex", justifyContent: "flex-end" }}
                  >
                    <Button>View Floorplan</Button>
                  </Link>
                </Box>

                <Grid item key={department.id} xs={12}>
                  <Container>
                    <Grid container spacing={4}>
                      {mapProductsToDepartment(
                        department.id,
                        storedproducts!,
                        shelfs!
                      )
                        .sort(
                          (a, b) =>
                            a.quantity / a.MaxQuantity -
                            b.quantity / b.MaxQuantity
                        )
                        .map((storedproduct) => (
                          <Grid
                            item
                            key={storedproduct.id}
                            xs={12}
                            sm={6}
                            md={4}
                          >
                            <StoredProductCard storedproduct={storedproduct} />
                          </Grid>
                        ))}
                    </Grid>
                  </Container>
                </Grid>
              </Grid>
            ))}
          </Grid>
        </Container>
      </div>
    );
  }
}
