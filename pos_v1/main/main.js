function printReceipt(inputs) {
  var items = buildItems(inputs);
  var cartItems = buildCartItems(items);
  var receipts = buildReceipt(cartItems);

  console.log(print(receipts));
}

function buildItems(inputs) {
  var items = [];
  var flag = 0;
  var allItems = loadAllItems();
  var promotions = loadPromotions();

  allItems.forEach(function (allItem) {
    inputs.forEach(function (input) {
      items.forEach(function (item) {
        if (item.item.barcode == allItem.barcode)
          flag = 1;
      });
      var s = input.split('-');
      if (s[0] == allItem.barcode && flag == 0)
        items.push({item: allItem, count: 0});
      else
        flag = 0;
    });
  });
  countSameNumber(items, inputs);

  return items;
}
function buildCartItems(items) {
  var cartItems = [];

  items.forEach(function (item) {
    cartItems.push({cartItem: item, discountSubtotal:(item.count * item.item.price), subtotal: (item.count * item.item.price)});
  });

  return cartItems;
}

function catchdiscount(cartItem) {
  var promotions = loadPromotions();

  promotions.forEach(function (promotion) {
    if (promotion.type == 'BUY_TWO_GET_ONE_FREE')
      (promotion.barcodes).forEach(function (barcode) {
        if (cartItem.cartItem.item.barcode == barcode)
          cartItem.discountSubtotal = (cartItem.cartItem.count - 1) * cartItem.cartItem.item.price;
      });
    });
}
function countSameNumber(items, inputs) {
  items.forEach(function (item) {
    inputs.forEach(function (input) {
      var s = input.split('-');

      if (s[0] == item.item.barcode && input.length == 10) {
        item.count++;
      }
      if (input.length != 10 && item.item.barcode == s[0]) {
        item.count = parseInt(s[1]);
      }
    });
  });
}

function buildReceipt(cartItems) {
  var receipts = [];
  var total = 0;
  var discountTotal = 0;

  cartItems.forEach(function (cartItem) {
    catchdiscount(cartItem);
    total += cartItem.subtotal;
    discountTotal += cartItem.discountSubtotal;
  });
  receipts = {receipt: cartItems, total: total, discountTotal: discountTotal};

  return receipts;
}

function print(receipts) {
  return ('***<没钱赚商店>收据***\n' + build(receipts) + '----------------------\n' +
  '总计：' + ((receipts.discountTotal).toFixed(2)) + '(元)\n' + '节省：' + ((receipts.total - receipts.discountTotal).toFixed(2)) +
  '(元)\n' + '**********************');
}

function build(receipts) {
  var text = '';

  (receipts.receipt).forEach(function (citem) {
    text += ('名称：' + citem.cartItem.item.name + '，' + '数量：' + citem.cartItem.count + citem.cartItem.item.unit + '，' + '单价：' +
    (citem.cartItem.item.price).toFixed(2)
    + '(元)' + '，' + '小计：' + (citem.discountSubtotal).toFixed(2) + '(元)\n');
  });

  return text;
}




















