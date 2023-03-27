const fs=require('fs');

const requestHandler =(req,res)=>{
    
    const url=req.url;
    const method=req.method;


if(url==='/'){
    fs.readFile('message.txt',{encoding:'utf-8'},(err,data)=>{
        if(err) {
            console.log(err);
        }
        console.log('data from file '+ data);
        res.write('<html>');
        res.write('<head><title>Message</title></head>');
        res.write(`<body>${data}<form action="/message" method="POST"><input type="text" name="message"><button type="submit">Submit</button></from></body>`);
        res.write('</html>');
       
       return res.end();
    });
  

}
else if (url==='/message' && method==="POST" ){
   const body=[]
   req.on('data',(chunk)=>{
    console.log(chunk);
      body.push(chunk);
   });
   return  req.on('end',()=>{
    const parsebody=Buffer.concat(body).toString();
    const message=parsebody.split('=')[1];
    console.log(parsebody);
    fs.writeFile('message.txt',message,(err)=>{
        if(err){
            console.log(err)
        }
        res.statusCode=302;
        res.setHeader('Location','/');
        return res.end();
    });
   });

}

else {
    res.setHeader('Content-Type','text/html');
    res.write('<html>');
    res.write('<head><title>my first page</title></head>');
    res.write('<body><h1> hello from node.js server</h1></body>');
    res.write('</html>');
   
    res.end();
}


    
    }


    // module.exports=requestHandler;

    // module.exports={
    //     Handler:requestHandler,
    //     Stk:"very hard text conde",
    // };

    exports.Handler=requestHandler;
    exports.stk="very hard text conde";
