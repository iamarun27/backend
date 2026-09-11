export async function registerUser(req, res, next) {
  // try {
  //   throw new Error("Encounter an error while registering new user");
  // } catch (err) {
  //   err.status = 400
  //   next(err);
  // }

  res.status(201).json({
    message:'user registered successfully'
  })
}

// response = json format
//{ message:"user registered successfully"}

// username{type:String, required:true,},email,password
