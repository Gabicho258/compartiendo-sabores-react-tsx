import { Button, Card, CardActions, CardContent,  Typography } from '@mui/material'
import React from 'react'

interface EjemploProps {
    title: string,
    description: string
}




export const Ejemplo: React.FC<EjemploProps> = ({title, description}) => {
  return (
    <Card sx={{ maxWidth: 345 }}>
      
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  )
}
