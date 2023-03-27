const  http=require('http');

const route=require('./route.js');


let server=http.createServer(route.Handler);

console.log(route.Stk);




server.listen(3000,()=>{
    console.log("server has satrted at port 3000")
})