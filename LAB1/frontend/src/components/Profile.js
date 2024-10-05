// import React, { useState, useEffect } from "react";
// import axios from "axios";

// axios.defaults.withCredentials = true; // Allow sending cookies with requests

// // Set the CSRF token from the cookie
// const csrftoken = document.cookie.split(';').find(cookie => cookie.trim().startsWith('csrftoken=')).split('=')[1];
// axios.defaults.headers.common['X-CSRFToken'] = csrftoken;

// function Profile() {
//   const [profileData, setProfileData] = useState({
//     nickname: "",
//     birthdate: "",
//     country: "",
//     city: "",
//     state: "",
//     profile_picture: null,
//   });
//   const [error, setError] = useState("");
//   const [isEditing, setIsEditing] = useState(false); // Track if the form is in editing mode

//   // Fetch profile data on component mount
//   useEffect(() => {
//     async function fetchProfile() {
//       try {
//         const response = await axios.get("http://localhost:8000/accounts/profile/");
//         setProfileData(response.data);
//       } catch (err) {
//         console.error(err);
//         setError("Failed to fetch profile data.");
//       }
//     }
//     fetchProfile();
//   }, []);

//   // Handle input changes
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setProfileData({
//       ...profileData,
//       [name]: value,
//     });
//   };

//   // Handle file input change (for profile picture)
//   const handleFileChange = (e) => {
//     setProfileData({
//       ...profileData,
//       profile_picture: e.target.files[0],
//     });
//   };

//   // Submit form to update profile
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const formData = new FormData();
//     Object.keys(profileData).forEach((key) => {
//       formData.append(key, profileData[key]);
//     });

//     try {
//       await axios.post("http://localhost:8000/accounts/profile/", formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       });
//       alert("Profile updated successfully!");
//       setIsEditing(false); // Exit editing mode after successful update
//     } catch (err) {
//       console.error(err);
//       setError("Failed to update profile. Please try again.");
//     }
//   };

//   return (
//     <div className="profile-page">
//       <h2>Profile Page</h2>
//       {error && <p className="error">{error}</p>}

//       <form onSubmit={handleSubmit}>
//         <div>
//           <label>Username</label>
//           <p>{profileData.nickname || "No nickname set"}</p>
//           {!isEditing && <button type="button" onClick={() => setIsEditing(true)}>Update</button>}
//         </div>

//         {isEditing && (
//           <>
//             <div>
//               <label>Birthdate</label>
//               <input type="date" name="birthdate" value={profileData.birthdate} onChange={handleChange} />
//             </div>
//             <div>
//               <label>Country</label>
//               <input type="text" name="country" value={profileData.country} onChange={handleChange} />
//             </div>
//             <div>
//               <label>City</label>
//               <input type="text" name="city" value={profileData.city} onChange={handleChange} />
//             </div>
//             <div>
//               <label>State</label>
//               <input type="text" name="state" value={profileData.state} onChange={handleChange} />
//             </div>
//             <div>
//               <label>Profile Picture</label>
//               <input type="file" name="profile_picture" onChange={handleFileChange} />
//             </div>
//             <button type="submit">Save Changes</button>
//           </>
//         )}
//       </form>
//     </div>
//   );
// }

// export default Profile;







// import React, { useState, useEffect } from "react";
// import axios from "axios";

// axios.defaults.withCredentials = true; // Allow sending cookies with requests

// // Set the CSRF token from the cookie
// const csrftoken = document.cookie.split(';').find(cookie => cookie.trim().startsWith('csrftoken=')).split('=')[1];
// axios.defaults.headers.common['X-CSRFToken'] = csrftoken;

// function Profile() {
//   const [profileData, setProfileData] = useState({
//     username: "",
//     email: "",
//     nickname: "",
//     birthdate: "",
//     country: "",
//     city: "",
//     state: "",
//     profile_picture: null,
//   });
//   const [error, setError] = useState("");
//   const [isEditing, setIsEditing] = useState(false); // Track if the form is in editing mode

//   // Fetch profile data on component mount
//   useEffect(() => {
//     async function fetchProfile() {
//       try {
//         const response = await axios.get("http://localhost:8000/accounts/profile/");
//         setProfileData(response.data);
//       } catch (err) {
//         console.error(err);
//         setError("Failed to fetch profile data.");
//       }
//     }
//     fetchProfile();
//   }, []);

//   // Handle input changes
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setProfileData({
//       ...profileData,
//       [name]: value,
//     });
//   };

//   // Handle file input change (for profile picture)
//   const handleFileChange = (e) => {
//     setProfileData({
//       ...profileData,
//       profile_picture: e.target.files[0],
//     });
//   };

//   // Submit form to update profile
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const formData = new FormData();
//     Object.keys(profileData).forEach((key) => {
//       formData.append(key, profileData[key]);
//     });

//     try {
//       await axios.post("http://localhost:8000/accounts/profile/", formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       });
//       alert("Profile updated successfully!");
//       setIsEditing(false); // Exit editing mode after successful update
//     } catch (err) {
//       console.error(err);
//       setError("Failed to update profile. Please try again.");
//     }
//   };

//   return (
//     <div className="profile-page">
//       <h2>Profile Page</h2>
//       {error && <p className="error">{error}</p>}

//       <form onSubmit={handleSubmit}>
//         <div>
//           <label>Username</label>
//           <p>{profileData.username ? `${profileData.username}` : "No username available"}</p>
        
//         </div>
        
//         <div>
//           <label>Email</label>
//           <p>{profileData.email ? `${profileData.email}` : "No email available"}</p>
//         </div>

//         {isEditing && (
//           <>
//             <div>
//               <label>Nickname</label>
//               <input type="text" name="nickname" value={profileData.nickname} onChange={handleChange} />
//             </div>
//             <div>
//               <label>Birthdate</label>
//               <input type="date" name="birthdate" value={profileData.birthdate} onChange={handleChange} />
//             </div>
//             <div>
//               <label>Country</label>
//               <input type="text" name="country" value={profileData.country} onChange={handleChange} />
//             </div>
//             <div>
//               <label>City</label>
//               <input type="text" name="city" value={profileData.city} onChange={handleChange} />
//             </div>
//             <div>
//               <label>State</label>
//               <input type="text" name="state" value={profileData.state} onChange={handleChange} />
//             </div>
//             <div>
//               <label>Profile Picture</label>
//               <input type="file" name="profile_picture" onChange={handleFileChange} />
//             </div>
//             <button type="submit">Save Changes</button>
//           </>
//         )}
        
//         {!isEditing && <button type="button" onClick={() => setIsEditing(true)}>Update Profile</button>}
//       </form>
//     </div>
//   );
// }

// export default Profile;












// import React, { useState, useEffect } from "react";
// import axios from "axios";

// axios.defaults.withCredentials = true; // Allow sending cookies with requests

// // Set the CSRF token from the cookie
// const csrftoken = document.cookie.split(';').find(cookie => cookie.trim().startsWith('csrftoken=')).split('=')[1];
// axios.defaults.headers.common['X-CSRFToken'] = csrftoken;

// function Profile() {
//   const [profileData, setProfileData] = useState({
//     username: "",
//     email: "",
//     nickname: "",
//     birthdate: "",
//     country: "",
//     city: "",
//     state: "",
//     profile_picture: null,
//   });
//   const [error, setError] = useState("");
//   const [isEditing, setIsEditing] = useState(false); // Track if the form is in editing mode

//   // Fetch profile data on component mount
//   useEffect(() => {
//     async function fetchProfile() {
//       try {
//         const response = await axios.get("http://localhost:8000/accounts/profile/");
//         setProfileData(response.data);
//       } catch (err) {
//         console.error(err);
//         setError("Failed to fetch profile data.");
//       }
//     }
//     fetchProfile();
//   }, []);

//   // Handle input changes
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setProfileData({
//       ...profileData,
//       [name]: value,
//     });
//   };

//   // Handle file input change (for profile picture)
//   const handleFileChange = (e) => {
//     setProfileData({
//       ...profileData,
//       profile_picture: e.target.files[0],
//     });
//   };

//   // Submit form to update profile
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const formData = new FormData();
//     Object.keys(profileData).forEach((key) => {
//       formData.append(key, profileData[key]);
//     });

//     try {
//       await axios.post("http://localhost:8000/accounts/profile/", formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       });
//       alert("Profile updated successfully!");
//       setIsEditing(false); // Exit editing mode after successful update
//     } catch (err) {
//       console.error(err);
//       setError("Failed to update profile. Please try again.");
//     }
//   };

//   return (
//     <div className="profile-page">
//       <h2>Profile Page</h2>
//       {error && <p className="error">{error}</p>}

//       <div>
//         <label>Username</label>
//         <p>{profileData.username ? `${profileData.username}` : "No username available"}</p>
//       </div>
      
//       <div>
//         <label>Email</label>
//         <p>{profileData.email ? `${profileData.email}` : "No email available"}</p>
//       </div>

//       {/* Show profile picture if it exists */}
//       {profileData.profile_picture ? (
//         <div>
//           <label>Profile Picture</label>
//           <img 
//             src={`http://localhost:8000/media/${profileData.profile_picture}`} 
//             alt="Profile" 
//             style={{ width: "100px", height: "100px", borderRadius: "50%" }} 
//           />
//         </div>
//       ) : (
//         <p>No profile picture uploaded</p>
//       )}

//       {isEditing ? (
//         <form onSubmit={handleSubmit}>
//           <div>
//             <label>Nickname</label>
//             <input
//               type="text"
//               name="nickname"
//               value={profileData.nickname || ""}
//               onChange={handleChange}
//             />
//           </div>
//           <div>
//             <label>Birthdate</label>
//             <input
//               type="date"
//               name="birthdate"
//               value={profileData.birthdate || ""}
//               onChange={handleChange}
//             />
//           </div>
//           <div>
//             <label>Country</label>
//             <input
//               type="text"
//               name="country"
//               value={profileData.country || ""}
//               onChange={handleChange}
//             />
//           </div>
//           <div>
//             <label>City</label>
//             <input
//               type="text"
//               name="city"
//               value={profileData.city || ""}
//               onChange={handleChange}
//             />
//           </div>
//           <div>
//             <label>State</label>
//             <input
//               type="text"
//               name="state"
//               value={profileData.state || ""}
//               onChange={handleChange}
//             />
//           </div>

//           <div>
//             <label>Update Profile Picture</label>
//             <input 
//               type="file" 
//               name="profile_picture" 
//               onChange={handleFileChange} 
//             />
//           </div>
          
//           <button type="submit">Save Changes</button>
//         </form>
//       ) : (
//         <button type="button" onClick={() => setIsEditing(true)}>Update Profile</button>
//       )}
//     </div>
//   );
// }

// export default Profile;













// import React, { useState, useEffect } from "react";
// import axios from "axios";

// axios.defaults.withCredentials = true; // Allow sending cookies with requests

// // Set the CSRF token from the cookie
// const csrftoken = document.cookie.split(';').find(cookie => cookie.trim().startsWith('csrftoken=')).split('=')[1];
// axios.defaults.headers.common['X-CSRFToken'] = csrftoken;

// function Profile() {
//   const [profileData, setProfileData] = useState({
//     username: "",
//     email: "",
//     nickname: "",
//     birthdate: "",
//     country: "",
//     city: "",
//     state: "",
//     profile_picture: null,
//   });
//   const [error, setError] = useState("");
//   const [isEditing, setIsEditing] = useState(false); // Track if the form is in editing mode

//   // Placeholder image URL for when there's no profile picture
//   const placeholderImage = "https://via.placeholder.com/150"; // You can replace this with any placeholder URL

//   // Fetch profile data on component mount
//   useEffect(() => {
//     async function fetchProfile() {
//       try {
//         const response = await axios.get("http://localhost:8000/accounts/profile/");
//         setProfileData(response.data);
//       } catch (err) {
//         console.error(err);
//         setError("Failed to fetch profile data.");
//       }
//     }
//     fetchProfile();
//   }, []);

//   // Handle input changes
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setProfileData({
//       ...profileData,
//       [name]: value,
//     });
//   };

//   // Handle file input change (for profile picture)
//   const handleFileChange = (e) => {
//     setProfileData({
//       ...profileData,
//       profile_picture: e.target.files[0],
//     });
//   };

//   // Submit form to update profile
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const formData = new FormData();
//     Object.keys(profileData).forEach((key) => {
//       formData.append(key, profileData[key]);
//     });

//     try {
//       await axios.post("http://localhost:8000/accounts/profile/", formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       });
//       alert("Profile updated successfully!");
//       setIsEditing(false); // Exit editing mode after successful update
//     } catch (err) {
//       console.error(err);
//       setError("Failed to update profile. Please try again.");
//     }
//   };

//   return (
//     <div className="profile-page">
//       <h2>Profile Page</h2>
//       {error && <p className="error">{error}</p>}

//       <div>
//         <label>Username</label>
//         <p>{profileData.username ? `${profileData.username}` : "No username available"}</p>
//       </div>
      
//       <div>
//         <label>Email</label>
//         <p>{profileData.email ? `${profileData.email}` : "No email available"}</p>
//       </div>

//       {/* Show profile picture if it exists, otherwise show a placeholder */}
//       <div>
//         <label>Profile Picture</label>
//         <img 
//           src={profileData.profile_picture ? `http://localhost:8000/media/${profileData.profile_picture}` : placeholderImage} 
//           alt="Profile" 
//           style={{ width: "150px", height: "150px", borderRadius: "50%" }} 
//         />
//       </div>

//       {isEditing ? (
//         <form onSubmit={handleSubmit}>
//           <div>
//             <label>Nickname</label>
//             <input
//               type="text"
//               name="nickname"
//               value={profileData.nickname || ""}
//               onChange={handleChange}
//             />
//           </div>
//           <div>
//             <label>Birthdate</label>
//             <input
//               type="date"
//               name="birthdate"
//               value={profileData.birthdate || ""}
//               onChange={handleChange}
//             />
//           </div>
//           <div>
//             <label>Country</label>
//             <input
//               type="text"
//               name="country"
//               value={profileData.country || ""}
//               onChange={handleChange}
//             />
//           </div>
//           <div>
//             <label>City</label>
//             <input
//               type="text"
//               name="city"
//               value={profileData.city || ""}
//               onChange={handleChange}
//             />
//           </div>
//           <div>
//             <label>State</label>
//             <input
//               type="text"
//               name="state"
//               value={profileData.state || ""}
//               onChange={handleChange}
//             />
//           </div>

//           <div>
//             <label>Update Profile Picture</label>
//             <input 
//               type="file" 
//               name="profile_picture" 
//               onChange={handleFileChange} 
//             />
//           </div>
          
//           <button type="submit">Save Changes</button>
//         </form>
//       ) : (
//         <button type="button" onClick={() => setIsEditing(true)}>Update Profile</button>
//       )}
//     </div>
//   );
// }

// export default Profile;











// import React, { useState, useEffect } from "react";
// import axios from "axios";

// axios.defaults.withCredentials = true; // Allow sending cookies with requests

// // Set the CSRF token from the cookie
// const csrftoken = document.cookie.split(';').find(cookie => cookie.trim().startsWith('csrftoken='));
// const csrfTokenValue = csrftoken ? csrftoken.split('=')[1] : null;
// axios.defaults.headers.common['X-CSRFToken'] = csrfTokenValue;

// console.log("CSRF Token:", csrfTokenValue); // Log the CSRF token

// function Profile() {
//   const [profileData, setProfileData] = useState({
//     username: "",
//     email: "",
//     nickname: "",
//     birthdate: "",
//     country: "",
//     city: "",
//     state: "",
//     profile_picture: null,
//   });
//   const [error, setError] = useState("");
//   const [isEditing, setIsEditing] = useState(false); // Track if the form is in editing mode

//   // Placeholder image URL for when there's no profile picture
//   const placeholderImage = "https://via.placeholder.com/150"; // You can replace this with any placeholder URL

//   // Fetch profile data on component mount
//   useEffect(() => {
//     async function fetchProfile() {
//       try {
//         const response = await axios.get("http://localhost:8000/accounts/profile/");
//         setProfileData(response.data); // Data from the Django model
//         console.log(response.data);
//       } catch (err) {
//         console.error(err);
//         setError("Failed to fetch profile data.");
//       }
//     }
//     fetchProfile();
//   }, []);

//   // Handle input changes
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setProfileData({
//       ...profileData,
//       [name]: value,
//     });
//   };

//   // // Handle file input change (for profile picture)
//   // const handleFileChange = (e) => {
//   //   setProfileData({
//   //     ...profileData,
//   //     profile_picture: e.target.files[0],
//   //   });
//   // };

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setProfileData({
//         ...profileData,
//         profile_picture: file, // Set the file correctly
//       });
//     }
//   };
  

//   // Submit form to update profile
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const formData = new FormData();

//       // Format the date_of_birth to YYYY-MM-DD if it exists
//     if (profileData.birthdate) {
//     const birthdate = new Date(profileData.birthdate);
//     const formattedDate = birthdate.toISOString().split('T')[0]; // Format as YYYY-MM-DD
//     formData.append("date_of_birth", formattedDate);
//     }


//     Object.keys(profileData).forEach((key) => {
//       if (key !== 'birthdate') { // Exclude birthdate as it's already formatted
//       formData.append(key, profileData[key]);
//     }
//     });

//   //    // Log FormData to check values
//   // for (let pair of formData.entries()) {
//   //   console.log(pair[0] + ': ' + pair[1]);
//   // }

//     try {
//       await axios.post("http://localhost:8000/accounts/profile/", formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//           "X-CSRFToken": csrfTokenValue,
//         },
//       });
//       alert("Profile updated successfully!");
//       setIsEditing(false); // Exit editing mode after successful update
//     } catch (err) {
//       console.error(err);
//       setError("Failed to update profile. Please try again.");
//     }
//   };

//   return (
//     <div className="profile-page">
//       <h2>Profile Page</h2>
//       {error && <p className="error">{error}</p>}

//       <div>
//         Username -   
//         <span>   {profileData.username || "No username available"}</span>
//       </div>
      
//       <div>
//         Email -   
//         <span>   {profileData.email || "No email available"}</span>
//       </div>

//       {/* Show profile picture if it exists, otherwise show a placeholder */}
//       <div>
//         <label></label>
//         <img 
//           src={profileData.profile_picture ? `http://localhost:8000${profileData.profile_picture}` : placeholderImage}
//           alt="Profile" 
//           style={{ width: "150px", height: "150px", borderRadius: "50%" }} 
//         />

//       <input
//         type="file"
//         name="profile_picture"
//         onChange={handleFileChange}
//         disabled={!isEditing} // Disable editing if not in edit mode
//       />
//       </div>


//       {/* Show all profile information */}
//       <div>
//         <label>Nickname</label>
//         <input
//           type="text"
//           name="nickname"
//           value={profileData.nickname || ""}
//           onChange={handleChange}
//           disabled={!isEditing} // Disable editing if not in edit mode
//         />
//       </div>

//       <div>
//         <label>Birthdate</label>
//         <input
//           type="date"
//           name="birthdate"
//           value={profileData.birthdate || ""}
//           onChange={handleChange}
//           disabled={!isEditing}
//         />
//       </div>

//       <div>
//         <label>Country</label>
//         <input
//           type="text"
//           name="country"
//           value={profileData.country || ""}
//           onChange={handleChange}
//           disabled={!isEditing}
//         />
//       </div>

//       <div>
//         <label>City</label>
//         <input
//           type="text"
//           name="city"
//           value={profileData.city || ""}
//           onChange={handleChange}
//           disabled={!isEditing}
//         />
//       </div>

//       <div>
//         <label>State</label>
//         <input
//           type="text"
//           name="state"
//           value={profileData.state || ""}
//           onChange={handleChange}
//           disabled={!isEditing}
//         />
//       </div>



//       {isEditing ? (
//         <form onSubmit={handleSubmit}>
//           <div>
//             <label>Update Profile Picture</label>
//             <input 
//               type="file" 
//               name="profile_picture" 
//               onChange={handleFileChange} 
//             />
//           </div>
          
//           <button type="submit">Save Changes</button>
//         </form>
//       ) : (
//         <button type="button" onClick={() => setIsEditing(true)}>Update Profile</button>
//       )}
//     </div>
//   );
// }

// export default Profile;

























import React, { useState, useEffect } from "react";
import axios from "axios";

axios.defaults.withCredentials = true; // Allow sending cookies with requests

// Set the CSRF token from the cookie
const csrftoken = document.cookie.split(';').find(cookie => cookie.trim().startsWith('csrftoken='));
const csrfTokenValue = csrftoken ? csrftoken.split('=')[1] : null;
axios.defaults.headers.common['X-CSRFToken'] = csrfTokenValue;

function Profile() {
  const [profileData, setProfileData] = useState({
    username: "",
    email: "",
    nickname: "",
    date_of_birth: "", // Change birthdate to date_of_birth to match the backend
    country: "",
    city: "",
    state: "",
    profile_picture: null,
  });
  const [error, setError] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const placeholderImage = "https://via.placeholder.com/150";

  useEffect(() => {
    async function fetchProfile() {
      try {
        const response = await axios.get("http://localhost:8000/accounts/profile/");
        // Format date_of_birth if it's available
        if (response.data.date_of_birth) {
          response.data.date_of_birth = response.data.date_of_birth.split('T')[0]; // Convert to YYYY-MM-DD
        }
        setProfileData(response.data);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch profile data.");
      }
    }
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData({
      ...profileData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileData({
        ...profileData,
        profile_picture: file,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    
    // Ensure that date_of_birth is in YYYY-MM-DD format
  if (profileData.date_of_birth) {
    const birthdate = new Date(profileData.date_of_birth);
    const formattedDate = birthdate.toISOString().split('T')[0]; // Format as YYYY-MM-DD
    console.log("Formatted Date:", formattedDate); // Log to check the format
    formData.append("date_of_birth", formattedDate);
  }

    // Append the other fields
  Object.keys(profileData).forEach((key) => {
    if (key === 'profile_picture' && profileData[key]) {
      console.log("Appending profile_picture:", profileData[key]); // Log the file being appended
    }
    formData.append(key, profileData[key]);
  });

    try {
      await axios.post("http://localhost:8000/accounts/profile/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "X-CSRFToken": csrfTokenValue,
        },
      });
      alert("Profile updated successfully!");
      setIsEditing(false);
    } catch (err) {
      console.error(err);
      setError("Failed to update profile. Please try again.");
    }
  };

  return (
    <div className="profile-page">
      <h2>Profile Page</h2>
      {error && <p className="error">{error}</p>}

      <div>
        Username - <span>{profileData.username || "No username available"}</span>
      </div>
      <div>
        Email - <span>{profileData.email || "No email available"}</span>
      </div>

      <div>
        <label></label>
        <img 
          src={profileData.profile_picture ? `http://localhost:8000${profileData.profile_picture}` : placeholderImage}
          alt="Profile" 
          style={{ width: "150px", height: "150px", borderRadius: "50%" }} 
        />
      </div>

      <div>
        <label>Profile Picture</label>
        <input
          type="file"
          name="profile_picture"
          onChange={handleFileChange}
          disabled={!isEditing}
        />
      </div>

      <div>
        <label>Nickname</label>
        <input
          type="text"
          name="nickname"
          value={profileData.nickname || ""}
          onChange={handleChange}
          disabled={!isEditing}
        />
      </div>

      <div>
        <label>Birthdate</label>
        <input
          type="date"
          name="date_of_birth" // Ensure this matches the backend
          value={profileData.date_of_birth || ""}
          onChange={handleChange}
          disabled={!isEditing}
        />
      </div>

      <div>
        <label>Country</label>
        <input
          type="text"
          name="country"
          value={profileData.country || ""}
          onChange={handleChange}
          disabled={!isEditing}
        />
      </div>

      <div>
        <label>City</label>
        <input
          type="text"
          name="city"
          value={profileData.city || ""}
          onChange={handleChange}
          disabled={!isEditing}
        />
      </div>

      <div>
        <label>State</label>
        <input
          type="text"
          name="state"
          value={profileData.state || ""}
          onChange={handleChange}
          disabled={!isEditing}
        />
      </div>

      {isEditing ? (
        <button type="button" onClick={handleSubmit}>Save Changes</button>
      ) : (
        <button type="button" onClick={() => setIsEditing(true)}>Update Profile</button>
      )}
    </div>
  );
}

export default Profile;
