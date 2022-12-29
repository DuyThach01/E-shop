
$(document).ready(function () {
    
    $("a.btn").click(function () {


        var objcon = {};
        var objCha = {};
      


        var a = $(this).closest(".single-products").find("img").attr("src")
        var b = $(this).closest(".overlay-content").find("span").text();
        var c = $(this).closest(".single-products").find("p.b").text();
        var d = $(this).closest(".col-sm-4").attr("id");

        objcon["img"] = a;
        objcon["price"] = b;
        objcon["name"] = c;


        var yy = localStorage.getItem("thach");
        if (yy) {
            objCha = JSON.parse(yy);
            var oo = objCha[d]
            if (oo) {
                objcon['qty'] = objCha[d]["qty"] + 1;
            } else {
                objcon['qty'] = 1;
            }
        } else {
            objcon['qty'] = 1;
        }


        objCha[d] = objcon;
        localStorage.setItem("thach", JSON.stringify(objCha));

        //  localStorage.clear();
        console.log(objCha)
       


       
        var yy = localStorage.getItem("thach");
        if (yy) {
            objCha = JSON.parse(yy);}
            var sum=0;
        Object.keys(objCha).map(function (key, value) {
           
            sum = sum + objCha[key]['qty'];
            $("span.o").html(sum);

            });
            
       



        })
        var yy = localStorage.getItem("thach");
        if (yy) {
            objCha = JSON.parse(yy);}
            var sum=0;
        Object.keys(objCha).map(function (key, value) {
           
            sum = sum + objCha[key]['qty'];
            $("span.o").html(sum);

            });
        
       
      

    })