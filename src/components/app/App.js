import { BrowserRouter, Routes, Route } from "react-router-dom"
import './App.css';
import Register from "../Register/Register";
import Login from "../Login/Login";
import { AuthContextProvider, useAuthContext } from "../../Contexts/auth";
import apiClient from "../../services/apiClient";
import { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import Home from "../Home/Home"
import NotFound from "../NotFound/notFound";
import Activity from "../Activity/Activity";
import Nutrition from "../Nutrition/Nutrition";
import RecordNutrition from "../Nutrition/RecordNutrition";
import Sleep from "../Sleep/sleep";
import RecordSleep from "../Sleep/RecordSleep";


export default function AppContainer(){
    return (
        <AuthContextProvider>
            <App />
        </AuthContextProvider>
    )
}

const App = ()=> {

    const {user, setUser, initialized, setInitialized, error, setError} = useAuthContext()
    const [sleepRecord, setSleepRecord] = useState([])
    const [foodRecord, setFoodRecord] = useState([])
    
    //itinnialed by default is false i changed user?.email(true if email is found false if not) to !user?.email(fa)
    const isAuthenticated = Boolean(initialized && !user?.email)
    
    useEffect(() => {
      document.title="LifeTracker"
        const initApp = async () => {
          const { data } = await apiClient.fetchUserFromToken()
          if (data) setUser(data.user)
         
          setInitialized(true)
        }
        const token = localStorage.getItem("life_token")
        if (token) {
          apiClient.setToken(token)
          initApp()
        } else {
          setInitialized(true)
        }
      }, [isAuthenticated])

      useEffect(()=>{
        const fetchNutrition = async () =>{
          const {data, error} = await apiClient.fetchNutrition()
          if (error) setError(error)
          if (data?.food){
            setFoodRecord(data.food)
          }
        }
        fetchNutrition()
      },[])


        const clearAppState = () => {
        console.log("function is invoking")
        setUser({})
        setError(null)
      }
      const addSleep = (newSleepData)=>{
        setSleepRecord((oldSleepRecord)=>[newSleepData, ...oldSleepRecord])
      }
      const addFood = (newFoodData)=>{
        setFoodRecord(foodRecord=>[newFoodData, ...foodRecord])
      }
      const logoutUser = async () => {
        await apiClient.logoutUser()
        clearAppState()
      }
    
    return(
        <div className="App">
            <BrowserRouter>
            <Navbar user={user} error={error} isAuthenticated={isAuthenticated} logoutUser={logoutUser} />
                <Routes>
                    <Route path="/" element={ <Home />}/>
                    <Route path="/register" element={ <Register user={user} setUser={setUser} />}/>
                    <Route path="/login" element={ <Login user={user} setUser={setUser}/>}/>
                    <Route path="/not-found" element={<NotFound />}/>
                    <Route path="/Activity" element={<Activity user={user} foodRecord={foodRecord} />}/>
                    <Route path="/nutrition" element={<Nutrition user={user} foodRecord={foodRecord} setFoodRecord={setFoodRecord}/>}/>
                    <Route path="/nutrition/record-nutrition" element={<RecordNutrition addFood={addFood}/>} />
                    <Route path="/Sleep" element={<Sleep />} />
                    <Route path="/record-sleep" element={<RecordSleep addSleep={addSleep}/>} />
                </Routes>
            </BrowserRouter>
        </div>
    )
}


