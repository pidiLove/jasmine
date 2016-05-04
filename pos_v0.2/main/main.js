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
  allItems.forEach(function (allItem) {
    inputs.forEach(function (input) {
      items.forEach(function (item) {
        if (item.item.barcode == allItem.barcode)
          flag = 1;
      });
      if (input == allItem.barcode && flag == 0)
        items.push({item: allItem, count: 0});
      else
        flag = 0;
    });

  });
  countSameNumber(items, inputs);

  return items;
}

function countSameNumber(items, inputs) {

  items.forEach(function (item) {
    inputs.forEach(function (input) {
      if (input == item.item.barcode) {
        item.count++;
      }
    });
  });
}

function buildCartItems(items) {
  var cartItems = [];

  items.forEach(function (item) {
    var subtotal = (item.count * item.item.price);
    cartItems.push({cartItem: item, subtotal: subtotal});
  });

  return cartItems;
}


function buildReceipt(cartItems) {
  var receipts = [];
  var total = 0;

  cartItems.forEach(function (cartItem) {
    total += cartItem.subtotal;
  });
  receipts = {receipts: cartItems, total: total};

  return receipts;
}

function print(receipts) {
  return ('***<没钱赚商店>收据***\n' + build(receipts) + '----------------------\n' +
  '总计：' + (receipts.total).toFixed(2) + '(元)\n' + '**********************');
}

function build(receipts) {
  var text = '';

  (receipts.receipts).forEach(function (citem) {
    text += ('名称：' + citem.cartItem.item.name + '，' + '数量：' + citem.cartItem.count + citem.cartItem.item.unit + '，' + '单价：' + (citem.cartItem.item.price).toFixed(2)
    + '(元)' + '，' + '小计：' + (citem.subtotal ).toFixed(2) + '(元)\n');
  });

  return text;
}















