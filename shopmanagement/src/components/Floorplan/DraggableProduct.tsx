import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardActionArea from "@mui/material/CardActionArea";
import Typography from "@mui/material/Typography";
import '../../styles/floorplan.scss'
import { Draggable } from "react-beautiful-dnd";
import { Product } from "../../model/Product";

export function DraggableProduct({product,index}: {product: Product, index: number}) {
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
                margin: "5px" 
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
