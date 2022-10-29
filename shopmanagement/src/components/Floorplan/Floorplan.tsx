import { Shelf } from "../../model/Shelf";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Alert, CircularProgress, Fab } from "@mui/material";
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

export function Floorplan() {
  //const {innerWidth, innerHeight} = window;
  const { loggedIn, role } = useContext<IUserContext>(UserContext);
  const { isLoadingProducts, isErrorProducts, products } = useProducts();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<number | null>(null);
  const [selectedShelf, setSelectedShelf] = useState<number | null>(null);
  const { id,productId } = useParams();
  const { isErrorShelfsFromDepartment, isLoadingShelfsFromDepartment, shelfs } =
    useShelfsFromDepartment(id!);
  const {
    isErrorStoredProducts,
    isLoadingStoredProducts,
    storedproducts,
    storeProductMutation,
    deleteProductMutation,
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

  const editStoredProduct = (data: ShelfProduct) => {
    storeProductMutation({ ...data});
  };

  const deleteStoredProduct = (id: number) => {
    deleteProductMutation(id);
  };

  const onDragEnd = (result: any) => {
    if (!result.destination) {
      return;
    }
    setSelectedProduct(result.draggableId);
    setSelectedShelf(result.destination.droppableId);
    setIsDialogOpen(true);
    console.log(result.source.index);
    console.log(result.destination.droppableId);
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
      <div className="wrapper bgimage">
        <DragDropContext onDragEnd={onDragEnd}>
          {(loggedIn && (role === Role.Admin)) && (
          <div className="sidebar">
            <Droppable droppableId="products">
              {(provided) => (
                <ul
                  className="products"
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {products.map((product, index) => {
                    return (
                      <DraggableProduct product={product} index={product.id} />
                    );
                  })}
                  {provided.placeholder}
                </ul>
              )}
            </Droppable>
          </div>
          )}
          <div className="main">
            <Typography variant="h4">Floorplan: {department?.name} </Typography>
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
                              height: shelf.height,
                              width: shelf.width,
                              border: "5px solid",
                              borderColor: (loggedIn && (role === Role.Admin)) ? getColor(
                                1 -
                                  storedproduct.quantity /
                                    storedproduct.MaxQuantity
                              ) : (storedproduct.productId.toString() === productId) ? "Gold" : "black",
                            }}
                          >
                            {products.map((product) => {
                              if (product.id === storedproduct.productId) {
                                return (
                                  <div className="product">
                                    {(loggedIn && (role === Role.Admin)) && (
                                    <CancelIcon
                                      onClick={() =>
                                        deleteStoredProduct(storedproduct.id)
                                      }
                                      style={{
                                        cursor: "pointer",
                                        position: "absolute",
                                        bottom: (shelf.x / 750) * 100 + "%",
                                        right: -18,
                                        color: "red",
                                        zIndex: 100,
                                      }}
                                    />
                                    )}
                                    <img
                                      src={product?.image}
                                      alt={product?.name}
                                      style={{
                                        position: "absolute",
                                        height: shelf.height - 10,
                                        width: shelf.width - 10,
                                      }}
                                    />
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
                            height: shelf.height,
                            width: shelf.width,
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
          </div>
        </DragDropContext>
        <AddStockDialog
          isOpen={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
          productId={selectedProduct!}
          shelfId={selectedShelf!}
          onSubmit={storeProduct}
        />
      </div>
    );
  }
}
