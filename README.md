# WanderLust – Full Stack Airbnb Clone

---

## **Project Overview**

WanderLust is a full-stack Airbnb-like platform that allows users to **post, view, and manage property listings**. It is built using **Node.js, Express.js, MongoDB, Mongoose, and EJS** for server-side rendering. This project demonstrates full-stack web development skills including **authentication, CRUD operations, file uploads, and interactive maps**.

---

## **Features**

- **User Authentication & Authorization**  
  - Secure sign-up and login using **Passport.js**.  
  - Only authenticated users can create, edit, or delete listings.  

- **CRUD Operations**  
  - Users can **create, read, update, and delete property listings**.  
  - Users can also post **reviews** for properties.  
  - All forms have **validations** and flash messages for feedback.  

- **Multi-Image Uploads**  
  - Users can upload multiple images for each listing.  
  - Images are stored and managed securely using **Cloudinary**.  

- **Interactive Map Integration**  
  - Uses **MapLibre GL JS** with **MapTiler tiles**.  
  - Displays property listings based on their geographic location.  
  - Users can also add locations to their listings.  

- **MVC Architecture**  
  - Structured backend for maintainability and clean code.  
  - Includes **robust error handling** and middleware management.  

---

## **Tech Stack**

- **Frontend:** EJS, HTML5, CSS3, Bootstrap 5  
- **Backend:** Node.js, Express.js  
- **Database:** MongoDB, Mongoose  
- **Authentication:** Passport.js  
- **File Uploads:** Cloudinary  
- **Maps:** MapLibre GL JS, MapTiler  
- **Other Tools:** Express-Session, Connect-Flash , Multer 

---

> Note: `node_modules` and `.env` are **not included**. Please create your own `.env` file with environment variables as shown below.

---

## **Environment Variables**

Create a `.env` file in the project root with the following variables:

CLOUD_NAME=your_cloudinary_cloud_name
CLOUD_KEY=your_cloudinary_api_key
CLOUD_SECRET=your_cloudinary_api_secret


## **Conclusion**

Thank you for checking out WanderLust! I hope you find it useful and inspiring.  
Contributions, suggestions, and feedback are welcome! Feel free to open an issue or submit a pull request.  

You can connect with me on [LinkedIn](https://www.linkedin.com/in/sakshimishraa/).  

Happy coding!
