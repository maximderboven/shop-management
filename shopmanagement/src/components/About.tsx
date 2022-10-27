import {Card, CardMedia, CardContent, Typography} from "@mui/material";
import AboutImage from '../assets/img/kdglogo.png'

export default function About() {
    return (
        <Card sx={{maxWidth: 600, mx: 'auto', mt: '2rem'}}>
            <CardMedia
                component="img"
                image={AboutImage}
                alt="about"
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    UI3Shop
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Maxim Derboven - 2022-2023
                </Typography>
            </CardContent>
        </Card>
    );
}
