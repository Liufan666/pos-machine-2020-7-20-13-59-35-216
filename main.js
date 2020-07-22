function getItemQuantity(barcodes){
    let cartItem=[];
    for(let i=0;i<barcodes.length;i++){
        let isContain = false;
        for(let p=0;p<i;p++){
            if(barcodes[p]==barcodes[i]){
                isContain = true;
            }
        }
        if(isContain){
            continue;
        }
        let num=0;
        for(let j=0;j<barcodes.length;j++){
            if(barcodes[i]==barcodes[j]){
                num++;
            }
        }
        cartItem.push({itemCode:barcodes[i],quantity:num});

    }
    return cartItem;

}
function getItemInformation(cartItem){
    let cartItemDetails=[];
    for(let i=0;i<cartItem.length;i++){
        for(let j=0;j<database.length;j++){
            if(cartItem[i].itemCode==database[j].barcode){
                cartItemDetails.push({itemCode:cartItem[i].itemCode,itemName:database[j].name,
                    quantity:cartItem[i].quantity,unitPrice:database[j].price})
            }
        }
    }
    return cartItemDetails;

}
function getItemSubtotal(cartItemDetails){
    let cartItemDetailsWithTotalPrice =[];
    for(let i=0;i<cartItemDetails.length;i++){
        let total = cartItemDetails[i].unitPrice * cartItemDetails[i].quantity;
        cartItemDetailsWithTotalPrice.push({itemCode:cartItemDetails[i].itemCode,
            itemName:cartItemDetails[i].itemName,quantity:cartItemDetails[i].quantity,
            unitPrice:cartItemDetails[i].unitPrice,totalPrice:total})
    }
    return cartItemDetailsWithTotalPrice;

}
function getTotalPrice(cartItemDetailsWithTotalPrice){
    let total=0;
    for(let i=0;i<cartItemDetailsWithTotalPrice.length;i++){
        total += cartItemDetailsWithTotalPrice[i].totalPrice;
    }
    return total;

}
function formatData(cartItemDetailsWithTotalPrice,total){
    let str ='\n'+"***<store earning no money>Receipt ***\n";
    for(let i=0;i<cartItemDetailsWithTotalPrice.length;i++){
        str += "Name: "+cartItemDetailsWithTotalPrice[i].itemName+", Quantity: "+cartItemDetailsWithTotalPrice[i].quantity
        +", Unit price: "+cartItemDetailsWithTotalPrice[i].unitPrice+" (yuan), Subtotal: "
        +cartItemDetailsWithTotalPrice[i].totalPrice+" (yuan)\n";
    }
    str += "----------------------\n";
    str += "Total: "+total+" (yuan)\n";
    str += "**********************";
    return str;



}
function printReceipt(barcodes){
    let res = getItemSubtotal(getItemInformation(getItemQuantity(barcodes)));
    console.log(formatData(res,getTotalPrice(res)));
}

let database = [
    {
       barcode: 'ITEM000000',
       name: 'Coca-Cola',
       price: 3
     },
     {
       barcode: 'ITEM000001',
       name: 'Sprite',
       price: 3
     },
     {
       barcode: 'ITEM000002',
       name: 'Apple',
       price: 5
     },
     {
       barcode: 'ITEM000003',
       name: 'Litchi',
       price: 15
     },
     {
       barcode: 'ITEM000004',
       name: 'Battery',
       price: 2
     },
     {
       barcode: 'ITEM000005',
       name: 'Instant Noodles',
       price: 4
     }
 ];

 let barcodes = [
    'ITEM000000',
    'ITEM000000',
    'ITEM000000',
    'ITEM000000',
    'ITEM000000',
    'ITEM000001',
    'ITEM000001',
    'ITEM000004'
  ];


printReceipt(barcodes);
module.exports = {
    printReceipt
};
