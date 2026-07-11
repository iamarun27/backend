- Authentication
  register (user ka data save krna, token user ko dena)
  login 
  logout (token backlisting)
  [otp based registration]

- Post
   create = [
      caption string, imgurl string, user userOD, createdate:Date,
   ]
   can see the feed
   like posts (collection types)
   save posts

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