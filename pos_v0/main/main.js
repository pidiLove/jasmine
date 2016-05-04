function printReceipt(inputs) {
  var items = buildItems(inputs);
  var cartItems = buildCartItems(items);
  var receipts = buildReceipt(cartItems);

  console.log(print(receipts));
}

function buildItems(inputs) {
  var items = [];

  inputs.forEach(function (input) {
    var subtotal = (input.count * input.price);
    items.push({item: input, subtotal: subtotal});
  });

  return items;
}

function buildCartItems(items) {
  var cartItems = [];

  items.forEach(function (item) {
    cartItems.push({cartItem: item});
  });

  return cartItems;
}

function buildReceipt(cartItems) {
  var receipts = [];
  var total = 0;

  cartItems.forEach(function (cartItem) {
    total += cartItem.cartItem.subtotal;
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
    text += ('名称：' + citem.cartItem.item.name + '，' + '数量：' + citem.cartItem.item.count + citem.cartItem.item.unit + '，' + '单价：' + (citem.cartItem.item.price).toFixed(2)
    + '(元)' + '，' + '小计：' + (citem.cartItem.subtotal).toFixed(2) + '(元)\n');
  });

  return text;
}





