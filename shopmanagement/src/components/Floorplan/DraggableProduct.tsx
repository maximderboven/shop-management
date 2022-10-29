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
  useStoredProducts
} from "../../hooks/useStoredProducts";
import { Product } from "../../model/Product";

export function DraggableProduct({product,index}: {product: Product, index: number}) {
  //const {innerWidth, innerHeight} = window;

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
              <CardActionArea href={`/products/${product.id}`}>
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
                  <Typography variant="body2" color="text.secondary">
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
