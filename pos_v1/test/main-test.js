describe('pos', function() {

  describe("buildItems testing", function () {
    var allItems;
    var inputs;

    allItems = loadAllItems();
    inputs = [
      'ITEM000001',
      'ITEM000001',
      'ITEM000001',
      'ITEM000001',
      'ITEM000001',
      'ITEM000003-2',
      'ITEM000005',
      'ITEM000005',
      'ITEM000005'
    ];

    it('should print correct text', function() {
      var expectText =
        [{
          item: {
            barcode: 'ITEM000001',
            name: '雪碧',
            unit: '瓶',
            price: 3.00,

          },
          count:5
        },
          {
            item: {
              barcode: 'ITEM000003',
              name: '荔枝',
              unit: '斤',
              price: 15.00,

            },
            count:2
          },
          {
            item: {
              barcode: 'ITEM000005',
              name: '方便面',
              unit: '袋',
              price: 4.5,

            },
            count:3
          }];



      expect(buildItems(inputs)).toEqual(expectText);
    });
  });
  describe("buildCartItems testing", function () {
    var allItems;
    var inputs;

    allItems = loadAllItems();
    inputs =  [{
      item: {
        barcode: 'ITEM000001',
        name: '雪碧',
        unit: '瓶',
        price: 3.00,

      },
      count:5
    },
      {
        item: {
          barcode: 'ITEM000003',
          name: '荔枝',
          unit: '斤',
          price: 15.00,

        },
        count:2
      },
      {
        item: {
          barcode: 'ITEM000005',
          name: '方便面',
          unit: '袋',
          price: 4.5,

        },
        count:3
      }];

    it('should print correct text', function() {
      var expectText =
        [
          {
            cartItem:{
              item: {
                barcode: 'ITEM000001',
                name: '雪碧',
                unit: '瓶',
                price: 3.00,

              },
              count:5
            },
            discountSubtotal:15.00,
            subtotal:15.00
          },
          {cartItem:{
            item: {
              barcode: 'ITEM000003',
              name: '荔枝',
              unit: '斤',
              price: 15.00,

            },
            count:2
            },
            discountSubtotal:30.00,
            subtotal:30.00
          },


          {cartItem:{
            item: {
              barcode: 'ITEM000005',
              name: '方便面',
              unit: '袋',
              price: 4.5,

            },
            count:3
            },
            discountSubtotal:13.5,
            subtotal:13.5
          }];


      expect(buildCartItems(inputs)).toEqual(expectText);
    });
  });

  describe("buildReceipts testing", function () {
    var allItems;
    var inputs;

    allItems = loadAllItems();
    inputs =  [
      {
        cartItem:{
          item: {
            barcode: 'ITEM000001',
            name: '雪碧',
            unit: '瓶',
            price: 3.00,

          },
          count:5
        },
        discountSubtotal:15.00,
        subtotal:15.00
      },
      {cartItem:{
        item: {
          barcode: 'ITEM000003',
          name: '荔枝',
          unit: '斤',
          price: 15.00,

        },
        count:2
      },
        discountSubtotal:30.00,
        subtotal:30.00
      },
      {cartItem:{
        item: {
          barcode: 'ITEM000005',
          name: '方便面',
          unit: '袋',
          price: 4.5,

        },
        count:3
      },
        discountSubtotal:13.5,
        subtotal:13.5
      }];
    it('should print correct text', function() {
      var expectText =
      {
          receipt:[{
            cartItem:{
              item: {
                barcode: 'ITEM000001',
                name: '雪碧',
                unit: '瓶',
                price: 3.00,

              },
              count:5
            },
            discountSubtotal:12.00,
            subtotal:15.00
          },
          {cartItem:{
            item: {
              barcode: 'ITEM000003',
              name: '荔枝',
              unit: '斤',
              price: 15.00,

            },
            count:2
          },
            discountSubtotal:30.00,
            subtotal:30.00
          },
            {cartItem:{
            item: {
              barcode: 'ITEM000005',
              name: '方便面',
              unit: '袋',
              price: 4.5,

            },
            count:3
          },
            discountSubtotal:9,
            subtotal:13.5
          }],
        discountTotal: 51,
        total: 58.5
      }
      expect(buildReceipt(inputs)).toEqual(expectText);
    });
  });

  describe("print testing", function () {
    var inputs;
    inputs =  {
      receipt:[{
        cartItem:{
          item: {
            barcode: 'ITEM000001',
            name: '雪碧',
            unit: '瓶',
            price: 3.00,

          },
          count:5
        },
        discountSubtotal:12.00,
        subtotal:15.00
      },
        {cartItem:{
          item: {
            barcode: 'ITEM000003',
            name: '荔枝',
            unit: '斤',
            price: 15.00,

          },
          count:2
        },
          discountSubtotal:30.00,
          subtotal:30.00
        },


        {cartItem:{
          item: {
            barcode: 'ITEM000005',
            name: '方便面',
            unit: '袋',
            price: 4.5,

          },
          count:3
        },
          discountSubtotal:9,
          subtotal:13.5
        }],
      discountTotal: 51,
      total: 58.5

    }
    it('should print correct text', function () {

      var expectText =
        '***<没钱赚商店>收据***\n' +
        '名称：雪碧，数量：5瓶，单价：3.00(元)，小计：12.00(元)\n' +
        '名称：荔枝，数量：2斤，单价：15.00(元)，小计：30.00(元)\n' +
        '名称：方便面，数量：3袋，单价：4.50(元)，小计：9.00(元)\n' +
        '----------------------\n' +
        '总计：51.00(元)\n' +
        '节省：7.50(元)\n' +
        '**********************';

      expect(print(inputs)).toEqual(expectText);
    });
  });

  describe("integration testing", function () {
  var allItems;
  var inputs;

  beforeEach(function() {
    allItems = loadAllItems();
    inputs = [
      'ITEM000001',
      'ITEM000001',
      'ITEM000001',
      'ITEM000001',
      'ITEM000001',
      'ITEM000003-2',
      'ITEM000005',
      'ITEM000005',
      'ITEM000005'
    ];
  });

  it('should print correct text', function() {

    spyOn(console, 'log');

    printReceipt(inputs);

    var expectText =
      '***<没钱赚商店>收据***\n' +
      '名称：雪碧，数量：5瓶，单价：3.00(元)，小计：12.00(元)\n' +
      '名称：荔枝，数量：2斤，单价：15.00(元)，小计：30.00(元)\n' +
      '名称：方便面，数量：3袋，单价：4.50(元)，小计：9.00(元)\n' +
      '----------------------\n' +
      '总计：51.00(元)\n' +
      '节省：7.50(元)\n' +
      '**********************';

    expect(console.log).toHaveBeenCalledWith(expectText);
  });
});
});
