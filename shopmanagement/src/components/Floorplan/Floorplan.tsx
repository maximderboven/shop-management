import { Shelf } from "../../model/Shelf";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  Alert,
  Box,
  Chip,
  CircularProgress,
  Fab,
  Grid,
  Paper,
  Snackbar,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { useState, useContext } from "react";
import { useLocations } from "../../hooks/useShelf";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardActionArea from "@mui/material/CardActionArea";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import "./css/floorplan.css";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { Add, ConstructionOutlined, Stroller } from "@mui/icons-material";
import { useProducts } from "../../hooks/useProducts";
import { useShelfsFromDepartment } from "../../hooks/useShelfs";
import CancelIcon from "@mui/icons-material/Cancel";
import { useStoredProducts } from "../../hooks/useStoredProducts";
import { DraggableProduct } from "./DraggableProduct";
import { getColor } from "../../utils/colorgrading";
import { useDepartmentWithId } from "../../hooks/useDepartments";
import { ShelfProduct, ShelfProductData } from "../../model/ShelfProduct";
import AddStockDialog from "./AddStockDialog";
import EditStockDialog from "./EditStockDialog";
import UserContext, { IUserContext } from "../../context/UserContext";
import { Role } from "../../model/Role";
import { Price } from "../Products/properties/Price";
import EditIcon from "@mui/icons-material/Edit";
import HelpIcon from '@mui/icons-material/Help';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

export function Floorplan() {
  //const {innerWidth, innerHeight} = window;
  const { loggedIn, role } = useContext<IUserContext>(UserContext);
  const { isLoadingProducts, isErrorProducts, products } = useProducts();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<number | null>(null);
  const [selectedShelfProduct, setSelectedShelfProduct] =
    useState<ShelfProduct | null>(null);
  const [selectedShelf, setSelectedShelf] = useState<number | null>(null);
  const { id, productId } = useParams();
  const { isErrorShelfsFromDepartment, isLoadingShelfsFromDepartment, shelfs } =
    useShelfsFromDepartment(id!);
  const {
    isErrorStoredProducts,
    isLoadingStoredProducts,
    storedproducts,
    storeProductMutation,
    deleteProductMutation,
    isEditingStoredProduct,
    editStoredProductMutation,
    isErrorEditingStoredProduct,
  } = useStoredProducts();
  const { isLoadingDepartmentWithId, isErrorDepartmentWithId, department } =
    useDepartmentWithId(id!);

  const storeProduct = (
    data: ShelfProductData,
    shelfId: number,
    productId: number
  ) => {
    storeProductMutation({ ...data, shelfId, productId });
  };

  const editStoredProduct = (data: ShelfProductData) => {
    editStoredProductMutation({
      ...data,
      id: selectedShelfProduct!.id,
      shelfId: selectedShelf!,
      productId: selectedProduct!,
    });
  };

  const deleteStoredProduct = (id: number) => {
    deleteProductMutation(id);
  };

  const onClickEdit = (product: ShelfProduct) => {
    setSelectedShelfProduct(product);
    setSelectedProduct(product.productId);
    setSelectedShelf(product.shelfId);
    setIsEditDialogOpen(true);
  };

  const onDragEnd = (result: any) => {
    if (!result.destination) {
      return;
    }
    setSelectedProduct(result.draggableId);
    setSelectedShelf(result.destination.droppableId);
    setIsAddDialogOpen(true);
  };

  if (
    isLoadingProducts ||
    isLoadingShelfsFromDepartment ||
    isLoadingStoredProducts
  ) {
    return <CircularProgress />;
  } else if (!products || !shelfs) {
    return <Alert severity="error">Product does not exist</Alert>;
  } else if (
    isErrorProducts ||
    isErrorShelfsFromDepartment ||
    isErrorStoredProducts
  ) {
    return <Alert severity="error">Error while loading product</Alert>;
  } else {
    return (
      <Grid container className="wrapper bgimage">
        <DragDropContext onDragEnd={onDragEnd}>
          {loggedIn && role === Role.Admin && (
            <Grid
              item
              sm={2}
              sx={{ display: { xs: "none", sm: "block" } }}
              className="sidebar"
            >
              <Paper sx={{ width:"calc(100% - 10px)", margin: "5px" }}>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>

                <Typography variant="h6" sx={{ margin: "5px" }}>
                  Products
                </Typography>
                <Tooltip title="Drag and drop products on the floorplan to place them into the store.">
                  <IconButton aria-label="help">
                    <HelpIcon />
                  </IconButton>
                </Tooltip>
                </Box>

              </Paper>
              <Droppable isDropDisabled={true} droppableId="products">
                {(provided) => (
                  <ul
                    className="products"
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    {products.map((product, index) => {
                      return (
                        <DraggableProduct
                          product={product}
                          index={product.id}
                        />
                      );
                    })}
                    {provided.placeholder}
                  </ul>
                )}
              </Droppable>
            </Grid>
          )}
          <Grid item sm={10} xs={12} className="main">
            <Typography variant="h4">
              Department: {department?.name}{" "}
            </Typography>
            {shelfs.map((shelf) => {
              return (
                <>
                  {/* Check shelf for a storedproduct
                if it has -> get the product and make a div
                if it has not -> make an empty div*/}
                  {storedproducts!.filter(
                    (storedproduct) => storedproduct.shelfId === shelf.id
                  ).length > 0 ? (
                    storedproducts!
                      .filter(
                        (storedproduct) => storedproduct.shelfId === shelf.id
                      )
                      .map((storedproduct) => {
                        return (
                          <div
                            className="shelf"
                            key={shelf.id}
                            style={{
                              position: "absolute",
                              bottom: (shelf.x / 936) * 100 + "%",
                              left: (shelf.y / 1920) * 100 + "%",
                              height: (shelf.height / 936) * 100 + "%",
                              width: (shelf.width / 1920) * 100 + "%",
                              border: "5px solid",
                              borderColor:
                                loggedIn && role === Role.Admin
                                  ? getColor(
                                      1 -
                                        storedproduct.quantity /
                                          storedproduct.MaxQuantity
                                    )
                                  : storedproduct.productId.toString() ===
                                    productId
                                  ? "Gold"
                                  : "black",
                            }}
                          >
                            {products.map((product) => {
                              if (product.id === storedproduct.productId) {
                                return (
                                  <div className="product">
                                    {loggedIn && role === Role.Admin && (
                                      <CancelIcon
                                        onClick={() =>
                                          deleteStoredProduct(storedproduct.id)
                                        }
                                        sx={{
                                          display: { xs: "none", sm: "block" },
                                        }}
                                        style={{
                                          cursor: "pointer",
                                          position: "absolute",
                                          top: 0,
                                          right: 0,
                                          color: "red",
                                          zIndex: 100,
                                        }}
                                      />
                                    )}
                                    <div className="wrap">
                                      <img
                                        src={product?.image}
                                        alt={product?.name}
                                        style={{
                                          position: "absolute",
                                          height: "100%",
                                          width: "100%",
                                        }}
                                      />
                                    </div>
                                    <div className="text">
                                      <span>
                                        {product?.name}
                                        <br />
                                        <Price product={product} />
                                        <br />
                                        {loggedIn && role === Role.Admin ? (
                                          <Chip
                                            onClick={() =>
                                              onClickEdit(storedproduct)
                                            }
                                            icon={<EditIcon />}
                                            style={{
                                              backgroundColor: getColor(
                                                1 -
                                                  storedproduct.quantity /
                                                    storedproduct.MaxQuantity
                                              ),
                                            }}
                                            sx={{
                                              display: {
                                                xs: "none",
                                                sm: "block",
                                              },
                                            }}
                                            label={
                                              storedproduct.quantity +
                                              "/" +
                                              storedproduct.MaxQuantity
                                            }
                                          />
                                        ) : null}
                                      </span>
                                    </div>
                                  </div>
                                );
                              }
                            })}
                          </div>
                        );
                      })
                  ) : (
                    <Droppable droppableId={shelf.id.toString()}>
                      {(provided) => (
                        <div
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                          key={shelf.id}
                          style={{
                            position: "absolute",
                            bottom: (shelf.x / 936) * 100 + "%",
                            left: (shelf.y / 1920) * 100 + "%",
                            height: (shelf.height / 936) * 100 + "%",
                            width: (shelf.width / 1920) * 100 + "%",
                            border: "5px solid black",
                          }}
                        >
                          {provided.placeholder}
                        </div>
                      )}
                    </Droppable>
                  )}
                </>
              );
            })}
          </Grid>
        </DragDropContext>
        <AddStockDialog
          isOpen={isAddDialogOpen}
          onClose={() => setIsAddDialogOpen(false)}
          productId={selectedProduct!}
          shelfId={selectedShelf!}
          onSubmit={storeProduct}
        />
        <EditStockDialog
          product={selectedShelfProduct!}
          isOpen={isEditDialogOpen}
          onClose={() => setIsEditDialogOpen(false)}
          onSubmit={editStoredProduct}
        />
      </Grid>
    );
  }
}
