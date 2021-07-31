import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Avatar, Button, Card, Grid, makeStyles, Typography, Container, CardMedia, CardContent } from "@material-ui/core"
import "./Nutrition.css"

const useStyles = makeStyles((theme) => ({
    root: {
        width: 'fit-content',
        height: 'fit-content',
        borderRadius: '10px',
        padding:'3%',
        backgroundColor:'#4682B4',
    },
  }));

export default function Nutrition({user, foodRecord, setFoodRecord}) {
    // window.location.reload()
    console.log(foodRecord)
    const navigate = useNavigate()
    const handleOnClick=()=>{
        navigate("/nutrition/record-nutrition")
    }
    const classes = useStyles();
    
    return(
       <div className="nutrition">
           <h1>Nutrition</h1>
           <Button className={classes.Button} variant="outlined" onClick={handleOnClick}>Record Nutrition</Button>
            
            <Grid  className="card">
                {foodRecord.map((food)=>{
                    const time = new Date(food.timestamp).toLocaleTimeString()
                    var date = new Date(food.timestamp).toLocaleDateString()
                    if (date === new Date().toLocaleDateString()){
                        date = "Today"
                    }
                    return (
                        <div className="card-div">
                        <Card className={classes.root} key={food.id} backgroundColor='#4682B4'>
                            <div className="all-info">
                               <Avatar src = {food.image_url} style={{ height: '150px', width: '150px' }}></Avatar>
                                <div className="info">
                                <h4 >
                                    Name: {food.name}
                                    <br/>
                                    Quantity: {food.quantity}
                                    <br/>
                                    Calories: {food.calories}
                                    <br/>
                                    Category: {food.category}
                                    <br/>
                                {date} at {time}
                    </h4>
                         </div>
                         </div>
                        </Card>
                        </div>
                    )
                })}
            </Grid> 
       </div>
      
    )
}