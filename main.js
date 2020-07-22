function getItemQuantity(barcodes) {
    let cartItem = [];
    for (let i = 0; i < barcodes.length; i++) {//todo
        let isContain = false;
        for (let p = 0; p < i; p++) {
            if (barcodes[p] === barcodes[i]) {
                isContain = true;
            }
        }
        if (isContain) {
            continue;
        }
        let num = 0;
        for (let j = 0; j < barcodes.length; j++) {
            if (barcodes[i] === barcodes[j]) {
                num++;
            }
        }
        cartItem.push({ itemCode: barcodes[i], quantity: num });

    }
    return cartItem;

}
function getItemInformation(cartItem) {//to do
    let cartItemDetails = [];
    for (let i = 0; i < cartItem.length; i++) {
        for (let j = 0; j < database.length; j++) {
            if (cartItem[i].itemCode === database[j].barcode) {
                cartItemDetails.push({
                    itemCode: cartItem[i].itemCode, itemName: database[j].name,
                    quantity: cartItem[i].quantity, unitPrice: database[j].price
                })
            }
        }
    }
    return cartItemDetails;

}
function getItemSubtotal(cartItemDetails) {
    let cartItemDetailsWithTotalPrice = [];
    for (let i = 0; i < cartItemDetails.length; i++) {
        let total = cartItemDetails[i].unitPrice * cartItemDetails[i].quantity;
        cartItemDetails[i].totalPrice = total;
    }
    return cartItemDetails;

}
function getTotalPrice(cartItemDetailsWithTotalPrice) {
    let totalPrice = 0;
    for (let i = 0; i < cartItemDetailsWithTotalPrice.length; i++) {
        totalPrice += cartItemDetailsWithTotalPrice[i].totalPrice;
    }
    return totalPrice;

}
function formatLine(cartItemDetailsWithTotalPrice){
    let lineStr = "";
    for (let i = 0; i < cartItemDetailsWithTotalPrice.length; i++) {// to do
        lineStr += "Name: " + cartItemDetailsWithTotalPrice[i].itemName + ", Quantity: " + cartItemDetailsWithTotalPrice[i].quantity
            + ", Unit price: " + cartItemDetailsWithTotalPrice[i].unitPrice + " (yuan), Subtotal: "
            + cartItemDetailsWithTotalPrice[i].totalPrice + " (yuan)\n";
    }
    return lineStr;
}
function formatData(lineStr, total) {
    let str = '\n' + "***<store earning no money>Receipt ***\n";
    str += lineStr;
    str += "----------------------\n";
    str += "Total: " + total + " (yuan)\n";
    str += "**********************";
    return str;



}
function printData(str){
    console.log(str);
}
function printReceipt(barcodes) {
    let res = getItemSubtotal(getItemInformation(getItemQuantity(barcodes)));
    printData(formatData(formatLine(res), getTotalPrice(res)));
}

let database = [//to do
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

const barcodes = [
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
