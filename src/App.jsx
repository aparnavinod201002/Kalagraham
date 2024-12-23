
import { Route,  Routes } from 'react-router-dom'
import './App.css'
import Dashboard from './Pages/Dashboard'

import DistrictView from './Pages/DistrictView'
import LocationView from './Pages/LocationView'
import CategoryView from './Pages/CategoryView'
import SubcategoryView from './Pages/SubcategoryView'
import CarnivalView from './Pages/CarnivalView'
import Home from './Pages/Home'

import ViewCarnival from './Pages/ViewCarnival'
import Header1 from './Components/Header1'
import ImageGallery from './Pages/ImageGallery'

import MyRequests from './Pages/MyRequests'
import Index from './User/Index'

import ViewmoreCarnival from './User/ViewmoreCarnival'
import Booking from './User/Booking'
import Payment from './User/Payment'
import ArtistReg from './Pages/ArtistReg'
import UserReg from './User/UserReg'
import Login from './Guest/Login'
import VideoGallary from './Pages/VideoGallary'
import UsersView from './Pages/usersView'
import BookingView from './Pages/BookingView'
import RequestsViewAdmin from './Pages/RequestsViewAdmin'
import ArtistView from './Pages/ArtistView'
import ImageView from './Pages/ImageView'
import VideoView from './Pages/VideoView'
import BookingViewUser from './User/BookingViewUser'
import MyProfile from './Components/MyProfile'
import MyProfileArtist from './Components/MyProfileArtist'
import { useContext } from 'react'
import { TokenAuthContext } from '../ContextAPI/TokenAuth'



function App() {
  const{isAuthorized,setIsAuthorized}=useContext(TokenAuthContext)
  return (
    <>
    
      <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/Dashboard' element={<Dashboard/>}/>
      <Route path='/DistrictView' element={isAuthorized?<DistrictView/>:<Home/>}/>
      <Route path='/LocationView' element={isAuthorized?<LocationView/>:<Home/>}/>
      <Route path='/CategoryView' element={isAuthorized?<CategoryView/>:<Home/>}/>
      <Route path='/SubcategoryView' element={isAuthorized?<SubcategoryView/>:<Home/>}/>
      <Route path='/CarnivalView' element={isAuthorized?<CarnivalView/>:<Home/>}/>
      
     
      <Route path='/ArtistReg' element={<ArtistReg/>}/>
      <Route path='/ViewCarnival' element={<ViewCarnival/>}/>
      <Route path='/SendRequest' element={isAuthorized?<ViewCarnival/>:<Home/>}/>
      <Route path='/Header1' element={<Header1/>}/>
      <Route path='/ImageGallery' element={isAuthorized?<ImageGallery/>:<Home/>}/>
      <Route path='/VideoGallary' element={isAuthorized?<VideoGallary/>:<Home/>}/>
     
      <Route path='/MyRequest' element={isAuthorized?<MyRequests/>:<Home/>}/>
      <Route path='/index' element={<Index/>}/>
      <Route path='/ViewmoreCarnival' element={isAuthorized?<ViewmoreCarnival/>:<Home/>}/>
      <Route path='/Booking' element={isAuthorized?<Booking/>:<Home/>}/>
      <Route path='/Payment' element={isAuthorized?<Payment/>:<Home/>}/>
      <Route path='/UserReg' element={<UserReg/>}/>
      <Route path='/Login' element={<Login/>}/>
      <Route path='/usersView' element={isAuthorized?<UsersView/>:<Home/>}/>
      <Route path='/BookingView/:userId' element={isAuthorized?<BookingView/>:<Home/>}/>
      <Route path='/artistsView' element={isAuthorized?<ArtistView/>:<Home/>}/>
      <Route path='/requests/:userId' element={isAuthorized?<RequestsViewAdmin/>:<Home/>}/>
      <Route path='/imagegallaryget/:userId' element={isAuthorized?<ImageView/>:<Home/>}/>
      <Route path='/VideoView/:userId' element={isAuthorized?<VideoView/>:<Home/>}/>
      <Route path='/BookingViewUser' element={isAuthorized?<BookingViewUser/>:<Home/>}/>
      <Route path='/MyProfile' element={isAuthorized?<MyProfile/>:<Home/>}/>
      <Route path='/MyProfileArtist' element={isAuthorized?<MyProfileArtist/>:<Home/>}/>
      
     
     
      </Routes>
    </>
  )
}

export default App
