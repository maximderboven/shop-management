import { Product as ProductModel } from "../../../model/Product";
import { Alert, CircularProgress, Fab } from "@mui/material";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import { useStoredProductsFromProduct } from "../../../hooks/useStoredProducts";
import { Link } from "react-router-dom";
import { getColor } from "../../../utils/colorgrading";
import { useShelfs } from "../../../hooks/useShelfs";
import { useDepartments } from "../../../hooks/useDepartments";
import { useContext } from "react";
import UserContext, { IUserContext } from "../../../contexts/UserContext";
import { Role } from "../../../model/Role";


export function Stock({ product }: { product: ProductModel }) {
  const { loggedIn, role } = useContext<IUserContext>(UserContext);
  const { isLoading, isError, storedproducts } = useStoredProductsFromProduct(
    product.id
  );
  const { isLoadingShelfs, isErrorShelfs, shelfs } = useShelfs();
  const { isLoadingDepartments, isErrorDepartments, departments } =
    useDepartments();

  if (isLoading || isLoadingShelfs || isLoadingDepartments) {
    return <CircularProgress />;
  } else if (!storedproducts || !shelfs || !departments) {
    return <Alert severity="error">Product does not exist</Alert>;
  } else if (isError || isErrorShelfs || isErrorDepartments) {
    return <Alert severity="error">Property could not be loaded</Alert>;
  } else {
    return (
      <div>
        <Paper elevation={1} sx={{ p: 2, mb: 2 }}>
          <Typography variant="h6" gutterBottom>
            Stock & Locations
          </Typography>
          <Divider />
          {storedproducts.map((storedproduct) => (
            <>
              {shelfs!.map((shelf) => (
                <>
                  {shelf.id === storedproduct.shelfId
                    ? departments!.map((department) => (
                        <>
                          {department.id === shelf.departmentId ? (
                            <>
                              <Box
                                sx={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                  p: 1,
                                  m: 1,
                                  bgcolor: (loggedIn && (role === Role.Admin)) ? getColor(
                                    1 -
                                      storedproduct.quantity /
                                        storedproduct.MaxQuantity
                                  ) : "white",
                                  borderRadius: 1,
                                }}
                              >
                                <Typography
                                  variant="h5"
                                  component="h2"
                                  style={{
                                    display: "flex",
                                    justifyContent: "flex-start",
                                  }}
                                >
                                  {storedproduct.quantity}/
                                  {storedproduct.MaxQuantity} -{" "}
                                  {department.name}
                                </Typography>
                                <Link
                                  to={`/floorplan/${department.id}/${product.id}`}
                                  style={{
                                    display: "flex",
                                    justifyContent: "flex-end",
                                  }}
                                >
                                  <Button>View Floorplan</Button>
                                </Link>
                              </Box>
                            </>
                          ) : null}
                        </>
                      ))
                    : null}
                </>
              ))}
            </>
          ))}
        </Paper>
      </div>
    );
  }
}
