const data = require("./data.json");
const fs = require("fs");
const path = require("path");
exports.getProducts = (req,res)=>{
    const {limit,searchProduct} = req.query;
    let d = data;
    if(searchProduct){
        d = d.filter(p=>p.title.toLowerCase().includes(searchProduct.toLowerCase()));
    }
    if(limit){
        d = d.slice(0,limit);
    }
    res.status(200).json({success:true,data:d});
}

exports.postProducts = (req,res)=>{
    console.log(req.body+" Welcome ");
    let d = data;
    const {productName} = req.body;
    const {content} = req.body;
    d.push(Object.assign(content,{
        id:d.length+1,
        title:productName
    }));

    fs.writeFileSync(path.resolve(__dirname+"/data.json"),JSON.stringify(d,null,4),(e)=>{
        if(e)
        {
            console.log(e);
            res.status(200).json({success:true,msg:e});
        }

    });
    res.status(200).json({success:true,msg:"Added"});
}

exports.putProducts = (req,res)=>{
    const {id} = req.body;
    const {content} = req.body;
    console.log(typeof(id));
    let v = data.findIndex(e=>e.id==id);
    console.log(data.find(e=>e.id==id));
    if(v!=-1){
        console.log("exits");
        let d = data;
        d[v] = content;
        fs.writeFileSync(path.resolve(__dirname)+"/data.json",JSON.stringify(d,null,4),(e)=>{
            if(e){
                console.log(e);
                res.status(200).json({success:false,msg:e});
            }
        });
        res.status(200).json({success:true,msg:"Updated"});
    }else{
        res.status(200).json({success:false,msg:"Failed"});
    }
}

exports.deleteProducts = (req,res)=>{
    const {id} = req.body;
    console.log(typeof(id));
    let v = data.find(e=>e.id==id);
    console.log(data.find(e=>e.id==id));
    if(v){
        console.log("exits");
        let d = data.filter(e=>e.id!=id);
        fs.writeFileSync(path.resolve(__dirname)+"/data.json",JSON.stringify(d,null,4),(e)=>{
            if(e){
                console.log(e);
                res.status(200).json({success:false,msg:e});
            }
        });
        res.status(200).json({success:true,msg:"Deleted"});
    }else{
        res.status(200).json({success:false,msg:"Failed"});
    }
}

// let d = data;
// const product = data.find(p => p.name)