
$(function () {
  var objCha = {};
  var xx = localStorage.getItem("thach")
  if (xx) {
    objCha = JSON.parse(xx)
  }
  var html = '';
  var html1 = '';
  var p = 0;
  var u = 0;


  Object.keys(objCha).map(function (key, value) {



    var i = objCha[key]['price'] * objCha[key]['qty'];
    p = p + i;

    html += "<tr>" +
      "<td class='cart_product'>" +
      "<a href=''><img src=" + objCha[key]['img'] + " " + "alt=''></a>" +
      "</td>" +
      "<td class='cart_description'>" +
      "<h4><a href=''>" + objCha[key]['name'] + "</a></h4>" +
      "<p>Web ID:" + "<span>" + key + "</span>" + "</p>" +
      "</td>" +
      "<td class='cart_price'>" +
      "<p>" + "$" + objCha[key]['price'] + "</p>" +
      "</td>" +
      "<td class='cart_quantity'>" +
      "<div class='cart_quantity_button'>" +
      "<a class='cart_quantity_up'> + </a>" +
      "<input class='cart_quantity_input' type='text' name='quantity' value='" + objCha[key]['qty'] + "' autocomplete='off' size='2'>" +
      "<a class='cart_quantity_down'> - </a >" +
      "</div >" +
      "</td >" +
      "<td class='cart_total'>" +
      "<p class='cart_total_price'>" + i + "</p>" +
      "</td>" +
      "<td class='cart_delete'>" +
      "<a class='cart_quantity_delete'><i class='fa fa-times'></i></a>" +
      "</td>" +



      "</tr>"


    $("span.tt").text(p + "$");




  })
  $("table tbody").append(html);

  console.log(html)

  var sum = p;
  $("a.cart_quantity_delete").click(function () {
    var u = $(this).closest("tr").find("p.cart_total_price").text()

    var x = $(this).closest("tr").find('span').text();
    delete objCha[x];
    $(this).closest("tr").text("")
    // $(this).closest("body").find("span.tt").text;


    localStorage.setItem("thach", JSON.stringify(objCha));

    sum = sum - Number(u);
    console.log(u);
    $("span.tt").text(sum + "$");





  })
  console.log(objCha);

  $("a.cart_quantity_up").click(function () {


    var aa = $(this).closest("tr").find('span').text();
    objCha[aa]['qty'] += 1;
    $(this).closest("tr").find('input').val(objCha[aa]['qty']);
    console.log(objCha[aa]['qty']);
    $(this).closest("tr").find("p.cart_total_price").text(objCha[aa]['qty'] * objCha[aa]['price'])

    sum = sum + Number(objCha[aa]['price']);
    console.log(sum);
    $("span.tt").text(sum + "$");



    localStorage.setItem("thach", JSON.stringify(objCha));


  })


  $("a.cart_quantity_down").click(function () {
    u = u - 1;

    var aa = $(this).closest("tr").find('span').text();
  
    objCha[aa]['qty'] -= 1;
    
    
  

    $(this).closest("tr").find('input').val(objCha[aa]['qty']);


    console.log(objCha[aa]['qty'])
    $(this).closest("tr").find("p.cart_total_price").text(objCha[aa]['qty'] * objCha[aa]['price'])
   
    sum = sum - Number(objCha[aa]['price']);
    console.log(sum);
    $("span.tt").text(sum + "$");
    if (objCha[aa]['qty'] == 0) {
      delete objCha[aa];
      $(this).closest("tr").text("")
    }
    localStorage.setItem("thach", JSON.stringify(objCha));


  }
  )

console.log(objCha)









})