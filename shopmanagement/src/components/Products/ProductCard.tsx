import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Product as Productmodel} from '../../model/Product';
import { CardActionArea } from '@mui/material';
import { Price } from './properties/Price';

export function ProductCard({product }: {product: Productmodel}) {
  return (
    <Card sx={{ height: "100%"}} >
      <CardActionArea href={ `/products/${product.id}` }>
        <CardMedia
          component="img"
          height="140"
          image={product.image}
          alt={product.name}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {product.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {product.description}
          </Typography>
          <Price product={product} />
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
