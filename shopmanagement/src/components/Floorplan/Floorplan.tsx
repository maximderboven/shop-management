import { Shelf } from "../../model/Shelf";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Alert, CircularProgress, Fab } from "@mui/material";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useLocations } from "../../hooks/useShelf";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardActionArea from "@mui/material/CardActionArea";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import "./css/floorplan.css";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { Add } from "@mui/icons-material";
import { useProducts } from "../../hooks/useProducts";
import { useShelfsFromDepartment } from "../../hooks/useShelfs";
import {
  useStoredProducts,
  useStoredProductsFromShelfs,
} from "../../hooks/useStoredProducts";

export function Floorplan() {
  //const {innerWidth, innerHeight} = window;
  const { isLoadingProducts, isErrorProducts, products } = useProducts();
  const { id } = useParams();
  const { isErrorShelfsFromDepartment, isLoadingShelfsFromDepartment, shelfs } =
    useShelfsFromDepartment(id!);
  const { isErrorStoredProducts, isLoadingStoredProducts, storedproducts } =
    useStoredProducts();

  const onDragEnd = (result: any) => {
    if (!result.destination) {
      return;
    }
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
          <div className="sidebar">
            <Droppable droppableId="all-products" type="PRODUCT">
              {(provided, snapshot) => {
                return (
                  console.log(products),
                  (
                    <div ref={provided.innerRef} {...provided.droppableProps}>
                      {products?.map((product, index) => {
                        return (
                          <Draggable
                            key={product.id}
                            draggableId={product.id.toString()}
                            index={index}
                          >
                            {(provided, snapshot) => {
                              return (
                                <div
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                >
                                  <Card
                                    style={{
                                      width: "90px",
                                      height: "80px",
                                      objectFit: "cover",
                                    }}
                                  >
                                    <CardActionArea
                                      href={`/products/${product.id}`}
                                    >
                                      <CardMedia
                                        component="img"
                                        height="140"
                                        image={product.image}
                                        alt={product.name}
                                        style={{
                                          width: "90px",
                                          height: "50px",
                                          objectFit: "cover",
                                        }}
                                      />
                                      <CardContent>
                                        <Typography
                                          variant="body2"
                                          color="text.secondary"
                                        >
                                          {product.name}
                                        </Typography>
                                      </CardContent>
                                    </CardActionArea>
                                  </Card>
                                </div>
                              );
                            }}
                          </Draggable>
                        );
                      })}
                      {provided.placeholder}
                    </div>
                  )
                );
              }}
            </Droppable>
          </div>
          <div className="floorplan">
            {shelfs.map((location) => {
              <div
                key={location.id}
                style={{
                  position: "absolute",
                  bottom: (location.x / 936) * 100 + "%",
                  left: (location.y / 1920) * 100 + "%",
                  height: location.height,
                  width: location.width,
                  border: "5px solid black",
                }}
              >
                {storedproducts?.map((storedproduct) => {
                  if (storedproduct.shelfId === location.id) {
                    products?.map((product) => {
                      if (storedproduct.productId === product.id) {
                        return (
                          <Draggable
                            key={product.id}
                            draggableId={product.id.toString()}
                            index={index}
                          >
                            {(provided, snapshot) => {
                              return (
                                <div
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                >
                                  <Card
                                    style={{
                                      width: "90px",
                                      height: "80px",
                                      objectFit: "cover",
                                    }}
                                  >
                                    <CardActionArea
                                      href={`/products/${product.id}`}
                                    >
                                      <CardMedia
                                        component="img"
                                        height="140"
                                        image={product.image}
                                        alt={product.name}
                                        style={{
                                          width: "90px",
                                          height: "50px",
                                          objectFit: "cover",
                                        }}
                                      />
                                      <CardContent>
                                        <Typography
                                          variant="body2"
                                          color="text.secondary"
                                        >
                                          {product.name}
                                        </Typography>
                                      </CardContent>
                                    </CardActionArea>
                                  </Card>
                                </div>
                              );
                            }}
                          </Draggable>
                        );
                      }
                    });
                  }
                })}
              </div>;
            })}
          </div>
        </DragDropContext>
      </div>
    );
  }
}
