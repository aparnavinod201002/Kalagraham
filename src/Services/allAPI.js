import { commonAPI  } from "./commonAPI";
import { server_url } from "./server_url";


//register

export const RegisterAPI = async(users)=>{
    
    return await commonAPI('POST',`${server_url}/register`,users,"")

}
//login

export const loginAPI = async(user)=>{
    return await commonAPI('POST',`${server_url}/login`,user,"")
}

//districtReg

export const DistrictRegAPI = async(district)=>{
    return await commonAPI('POST',`${server_url}/DistrictReg`,district,"")
}
//district
export const DistrictAPI = async(reqHeader)=>{
    return await commonAPI('GET',`${server_url}/districts`,"",reqHeader)
}
export const LocationRegAPI = async(location)=>{
    return await commonAPI('POST',`${server_url}/LocationReg`,location,"")
}
//get location
export const LocationAPI = async(reqHeader)=>{
    return await commonAPI('GET',`${server_url}/locations`,"",reqHeader)
}

//districtReg

export const CategoryRegAPI = async(category)=>{
    return await commonAPI('POST',`${server_url}/CategoryReg`,category,"")
}
//district
export const CategoryAPI = async(reqHeader)=>{
    return await commonAPI('GET',`${server_url}/category`,"",reqHeader)
}
export const SubCategoryRegAPI = async(subcategory)=>{
    return await commonAPI('POST',`${server_url}/subcategory`,subcategory,"")
}

//get location
export const SubCategoryAPI = async(reqHeader)=>{
    return await commonAPI('GET',`${server_url}/subcategory`,"",reqHeader)
}
export const getLocationsByDistrictAPI=async(district)=>{
    return await commonAPI('GET',`${server_url}/locations/${district}`,"","")
}

//carnival reg


export const CarnivalRegAPI =async(reqBody,reqHeader)=>{
    return await commonAPI('POST',`${server_url}/carnival`,reqBody,reqHeader)
}
//get

export const CarnivalGetAPI =async()=>{
    return await commonAPI('GET',`${server_url}/carnivalget`,"","")
}
//
export const getDistLocAPI =async(location)=>{
    return await commonAPI('GET',`${server_url}/carnivals/${location}`,"","")
}
//
export const getSubCategoryByCategoryAPI=async(category)=>{
    return await commonAPI('GET',`${server_url}/subcategory/${category}`,"","")
}
export const RequestAPI =async(reqData)=>{
    return await commonAPI('POST',`${server_url}/request`,reqData,"")
}
export const RequestGetAPI =async(userId)=>{
    return await commonAPI('GET',`${server_url}/request/${userId}`,"","")
}
export const ImageGalleryRegAPI =async(formData,reqHeader)=>{
    return await commonAPI('POST',`${server_url}/imagegallary`,formData,reqHeader)
}

export const ImageGallaryGetAPI =async(userId)=>{
    return await commonAPI('GET',`${server_url}/imagegallaryget/${userId}`,"","")
}
export const VideoGalleryRegAPI =async(formData,reqHeader)=>{
    return await commonAPI('POST',`${server_url}/videogallary`,formData,reqHeader)
}

export const VideoGallaryGetAPI =async(userId)=>{
    return await commonAPI('GET',`${server_url}/videogallaryget/${userId}`,"","")
}
export const carnivalGetAPI =async(carnivalid)=>{
    return await commonAPI('GET',`${server_url}/carnivalid/${carnivalid}`,"","")
}
export const BookingAPI =async(bookingData)=>{
    return await commonAPI('POST',`${server_url}/booking`,bookingData,"")
}
export const PaymentAPI =async(paymentData,reqHeader)=>{
    return await commonAPI('POST',`${server_url}/payment`,paymentData,reqHeader)
}
export const GetUserAPI =async()=>{
    return await commonAPI('GET',`${server_url}/user`,"","")
}
export const GetBookingAPI =async(userId)=>{
    return await commonAPI('GET',`${server_url}/Booking/${userId}`,"","")
}
export const GetArtistAPI =async()=>{
    return await commonAPI('GET',`${server_url}/artist`,"","")
}

export const GetCarnivalDetailsAPI =async(id)=>{
    return await commonAPI('GET',`${server_url}/carnival/${id}`,"","")
}
export const ReplyAPI =async(reply)=>{
    return await commonAPI('POST',`${server_url}/reply`,reply,"")
}
export const PaymentGetAPI =async(userId)=>{
    return await commonAPI('GET',`${server_url}/payment/${userId}`,"","")
}


export const PaymentGetByIdAPI =async(id)=>{
    return await commonAPI('GET',`${server_url}/PaymentByBooking/${id}`,"","")
}
export const UserAPI =async(userId)=>{
    return await commonAPI('GET',`${server_url}/MyProfile/${userId}`,"","")
}
//delete booking view in user side
export const DeleteBookingAPI =async(bookingId)=>{
    return await commonAPI('DELETE',`${server_url}/booking/DeleteBooking/${bookingId}`,{},{})
}
export const DeleteCarnivalAPI =async(carnivalId)=>{
    return await commonAPI('DELETE',`${server_url}/carnival/DeleteBooking/${carnivalId}`,{},{})
}
export const DeleteCategoryAPI =async(categoryId)=>{
    return await commonAPI('DELETE',`${server_url}/category/DeleteCategory/${categoryId}`,{},{})
}
export const DeleteDistrictAPI =async(districtId)=>{
    return await commonAPI('DELETE',`${server_url}/district/DeleteDistrict/${districtId}`,{},{})
}
export const DeleteLocationAPI =async(locationId)=>{
    return await commonAPI('DELETE',`${server_url}/location/DeleteLocation/${locationId}`,{},{})
}

export const DeleteSubCategoryAPI =async(subcategoryId)=>{
    return await commonAPI('DELETE',`${server_url}/subcategory/DeleteSubCategory/${subcategoryId}`,{},{})
}
export const DeleteImageGallaryAPI =async(imagegallaryId)=>{
    return await commonAPI('DELETE',`${server_url}/imageGallary/DeleteImageGallary/${imagegallaryId}`,{},{})
}

export const DeleteVideoGallaryAPI =async(videogallaryId)=>{
    return await commonAPI('DELETE',`${server_url}/videoGallary/DeleteVideoGallary/${videogallaryId}`,{},{})
}
export const DeleteRequestAPI =async(requestId)=>{
    return await commonAPI('DELETE',`${server_url}/request/DeleteRequest/${requestId}`,{},{})
}
export const NewPasswordAPI = async(password)=>{
    
    return await commonAPI('POST',`${server_url}/forgotpassword`,password,"")

}


export const UpdateImageGalleryAPI = async(formData)=>{
    
    return await commonAPI('PUT',`${server_url}/editimage`,formData,"")

}
export const loginApiEmailAPI = async ({email} ) => {
    return await commonAPI("GET", `${server_url}/loginemail/${email}`, "", "");
  };
  
  export const IncomeAPI =async()=>{
    return await commonAPI('GET',`${server_url}/totalIncome`,"","")
}
export const MoreBookedCarnivalAPI =async()=>{
    return await commonAPI('GET',`${server_url}/morecarnival`,"","")
}
export const MostRequestedParticipationAPI =async()=>{
    return await commonAPI('GET',`${server_url}/mostparticipation`,"","")
}

export const TestimonyAPI = async(feedbackData)=>{
    return await commonAPI('POST',`${server_url}/testimony`,feedbackData,"")
}

export const GetTestimonyAPI = async()=>{
    return await commonAPI('GET',`${server_url}/gettestimony`,"","")
}

