

 function deleteJobb(id){
    const result=  confirm("Are you sure you want to delete this product");
 
    if(result){
     fetch('/deleteJob/' +id,{  method:'POST',}).
     
     then((res)=>{
         if(res.ok){
             location.reload();
         }
     });
    }
 }
 
  