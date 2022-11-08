import { useDepartments } from "../../hooks/useDepartments";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { Alert, CircularProgress } from "@mui/material";
import { Link } from "react-router-dom";
import {
  useStoredProducts
} from "../../hooks/useStoredProducts";
import { useShelfs } from "../../hooks/useShelfs";
import { ShelfProduct } from "../../model/ShelfProduct";
import { Shelf } from "../../model/Shelf";
import { StoredProductCard } from "../Products/StoredProductCard";
import '../../styles/main.scss'
import {useContext} from "react";
import UserContext, { IUserContext } from "../../contexts/UserContext";
import { Role } from "../../model/Role";

export function Departments() {
  const { loggedIn, role } = useContext<IUserContext>(UserContext);
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
  } else if (!(loggedIn && (role === Role.Admin))) {
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
                    <Grid container spacing={4} alignItems="stretch">
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
                            sx={{display: "flex", flexDirection: "column"}}>
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
