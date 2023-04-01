import mongoose from "mongoose"

async function connect(){

    await mongoose.connect(process.env.REACT_APP_ATLAS_URI);
    console.log("connection successful");

}
export default connect

