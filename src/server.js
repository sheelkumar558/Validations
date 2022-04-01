const app = require("./index");
const connect = require("./configs/db");

app.listen(4444, async()=>{
    try{
      await connect();
      console.log("listening on port 4444");
    }catch(e){
        console.error({message:e.message});
    }
});