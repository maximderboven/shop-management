import {
  Alert,
  Box,
  CircularProgress,
  Grid,
  Paper,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { useState, useContext } from "react";
import Typography from "@mui/material/Typography";
import '../../styles/floorplan.scss';
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useProducts } from "../../hooks/useProducts";
import { useShelfsFromDepartment } from "../../hooks/useShelfs";
import { useStoredProducts } from "../../hooks/useStoredProducts";
import { DraggableProduct } from "./DraggableProduct";
import { useDepartmentWithId } from "../../hooks/useDepartments";
import { ShelfProduct, ShelfProductData } from "../../model/ShelfProduct";
import AddStockDialog from "./AddStockDialog";
import EditStockDialog from "./EditStockDialog";
import UserContext, { IUserContext } from "../../contexts/UserContext";
import { Role } from "../../model/Role";
import HelpIcon from "@mui/icons-material/Help";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { ShelfOnFloorplan } from "./ShelfOnFloorplan";

export function Floorplan() {
  //const {innerWidth, innerHeight} = window;
  const { loggedIn, role } = useContext<IUserContext>(UserContext);
  const { isLoadingProducts, isErrorProducts, products } = useProducts();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<number | null>(null);
  const [selectedShelfProduct, setSelectedShelfProduct] = useState<ShelfProduct | null>(null);
  const [selectedShelf, setSelectedShelf] = useState<number | null>(null);
  const { id, productId } = useParams();
  const { isErrorShelfsFromDepartment, isLoadingShelfsFromDepartment, shelfs } = useShelfsFromDepartment(id!);
  const {
    isErrorStoredProducts,
    isLoadingStoredProducts,
    storedproducts,
    storeProductMutation,
    editStoredProductMutation,
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
    isLoadingDepartmentWithId ||
    isLoadingShelfsFromDepartment ||
    isLoadingStoredProducts
  ) {
    return <CircularProgress />;
  } else if (!products || !shelfs) {
    return <Alert severity="error">Product does not exist</Alert>;
  } else if (
    isErrorProducts ||
    isErrorDepartmentWithId ||
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
              <Paper sx={{ width: "calc(100% - 10px)", margin: "5px" }}>
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
                  {storedproducts!.filter(
                    (storedproduct) => storedproduct.shelfId === shelf.id
                  ).length > 0 ? (
                    storedproducts!
                      .filter(
                        (storedproduct) => storedproduct.shelfId === shelf.id
                      )
                      .map((storedproduct) => {
                        return (
                          <ShelfOnFloorplan
                            shelf={shelf}
                            storedproduct={storedproduct}
                            products={products}
                            selectedproduct={productId}
                            onClickEdit={onClickEdit}
                          />
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
