- Authentication
  register (user ka data save krna, token user ko dena)
  login 
  logout (token blacklisting)
  [otp based registration]

  user={
   username,
   email,
   password,
   bio,
   followers,
   profilepic,

  }

  cloud storage provider - image kit,
  jwtsecretgenerator

  why we dont't send password in response in bullet points.
npm i bcryptjs - secure password
crypto is low level
salt itni bar hashing krni h









- Post
   create = [
      caption string, imgurl string, user userOD, createdate:Date,
   ]
   can see the feed
   like posts (collection types)
   save posts


   npm i multer -  cloud storage provider - less pricing eg s3,image kit , cloudinary , express ko power deta h

- Users
   - following
   - followers

user ={
   username:String,
   email:String,
   password:String,
   bio:String,
   followers:Array,
   profile_image:String
}