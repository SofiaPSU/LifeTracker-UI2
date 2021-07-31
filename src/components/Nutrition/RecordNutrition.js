import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import apiClient from '../../services/apiClient';
import "./RecordNutrition.css"
import { useNavigate } from 'react-router-dom';
import {  useState } from 'react';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', 
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));


export default function RecordNutrition({ addFood }) {
    const navigate = useNavigate()
    const classes = useStyles()
    const [isLoading, setIsLoading] =useState(false)
    const [errors, setErrors] = useState({})
    const [form, setForm] = useState({
        name:"",
        quantity: 1,
        calories:0,
        category:"",
        image_url:"",
    })
    const handleOnSubmit = async() =>{
        setIsLoading(true)
        const nutritionData = {
            name: form.name,
            quantity: form.quantity,
            calories: form.calories,
            category: form.category,
            image_url: form.image_url
        }
        const {data, error} = await apiClient.recordNutrition(nutritionData)
        if(data){
            console.log(data.nutrition)
            setForm({
                name:"",
                quantity: 1,
                calories:0,
                category:"",
                image_url:"",
            })
            addFood(data.nutrition)
           navigate("/nutrition")
           if (error){
               console.log(error)
               setErrors((e)=>({...e,form:error}))
           }
           setIsLoading(false)
        }
       
     
    }
    const handleOnInputChange = (event) =>{
        setForm((f)=> ({...f,[event.target.name]: event.target.value}))
    }
  

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <h1 className="text">
         Enter Nutrition Data
        </h1>
        {errors?.form && <span className="error">{errors.form}</span>}
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} >
              <TextField
                autoComplete="name"
                name="name"
                variant="outlined"
                required
                fullWidth
                id="name"
                label={<span className="text">Name</span> }
                autoFocus
                value={form.name}
                onChange={handleOnInputChange}
              />
            </Grid>
            <Grid item xs={12} >
              <TextField
                variant="outlined"
                required
                fullWidth
                id="quantity"
                label={<span className="text">Quantity</span> }
                name="quantity"
                autoComplete="quantity"
                value={form.quantity}
                onChange={handleOnInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="calories"
                label={<span className="text">Calories</span> }
                name="calories"
                autoComplete="calories"
                value={form.calories}
                onChange={handleOnInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="category"
                label={<span className="text">Category</span> }
                name="category"
                autoComplete="category"
                value={form.category}
                onChange={handleOnInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="image_url"
                label={<span className="text">Image Url</span> }
                id="image_url"
                autoComplete="image_url"
                value={form.image_url}
                onChange={handleOnInputChange}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            color="primary"
            variant="outlined"
            className={classes.submit}
           disabled={isLoading}
            onClick={handleOnSubmit}
          >
            <div component="h1" variant="button" className="text">
            {isLoading ? "Loading..." : "Submit"}
            </div>
          </Button>
        </form>
      </div>
    </Container>
  )
}