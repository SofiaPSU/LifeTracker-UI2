import { Card, Grid, Avatar, Button, makeStyles} from "@material-ui/core"
import { flexbox } from "@material-ui/system";
import { useNavigate } from "react-router";
import "./Activity.css"

const useStyles = makeStyles((theme) => ({
    root: {
        display:'flex',
        backgroundColor:'#4682B4',
        padding: '3%',
    },
    h2:{
        color:'white',
    }
  }));
export default function Activity({ user, foodRecord }){
    console.log(foodRecord)
    const navigate = useNavigate()
    const handleOnClick=()=>{
        navigate("/nutrition/record-nutrition")
    }
    const classes= useStyles()
    const avgCal =() =>{
        var avg = 0
        var date = new Date()
       foodRecord.forEach(function (item, index){
           if (new Date(foodRecord[index].timestamp).toLocaleDateString()=== date.toLocaleDateString())
           avg += foodRecord[index].calories
       }) 
       console.log(avg)
       return avg
        
    }
    return (
        <div className="Activity">
            <Grid>
                <h1 className="title">Daily Activity for {user.username}</h1>
            <Card className={classes.root}>
                <Avatar variant ="square" style={{ height: '150px', width: '150px' }} src="https://images.unsplash.com/photo-1498837167922-ddd27525d352?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8Zm9vZHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"/>
                
                <h2 className={classes.h2}>Nutrition <br />Daily Calories: {avgCal()} <br/> <Button className={classes.h2} variant ="outlined" onClick={handleOnClick}>Log Meal</Button> </h2>
            </Card>
            </Grid>
        </div>
    )
}