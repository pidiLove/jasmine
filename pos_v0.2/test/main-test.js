describe('pos', function() {

  describe("buildItems testing", function () {
    var allItems;
    var inputs;

      allItems = loadAllItems();
      inputs = [
        'ITEM000000',
        'ITEM000000',
        'ITEM000000',
        'ITEM000000',
        'ITEM000000',
        'ITEM000001',
        'ITEM000001',
        'ITEM000004'
      ];
    it('should print correct text', function() {
      var expectText =
        [{
          item: {
            barcode: 'ITEM000000',
            name: '可口可乐',
            unit: '瓶',
            price: 3.00,

          },
          count:5
        },
          {
            item: {
              barcode: 'ITEM000001',
              name: '雪碧',
              unit: '瓶',
              price: 3.00,

            },
            count:2
          },
          {
            item: {
              barcode: 'ITEM000004',
              name: '电池',
              unit: '个',
              price: 2.00,

            },
            count:1
          }];



      expect(buildItems(inputs)).toEqual(expectText);
    });
  });

  describe("buildCartItems testing", function () {
    var allItems;
    var inputs;

    allItems = loadAllItems();
    inputs = [{
      item: {
        barcode: 'ITEM000000',
        name: '可口可乐',
        unit: '瓶',
        price: 3.00,

      },
      count:5
    },
      {
        item: {
          barcode: 'ITEM000001',
          name: '雪碧',
          unit: '瓶',
          price: 3.00,

        },
        count:2
      },
      {
        item: {
          barcode: 'ITEM000004',
          name: '电池',
          unit: '个',
          price: 2.00,

        },
        count:1
      }];

    it('should print correct text', function() {
      var expectText =
        [
          {
            cartItem:{
              item: {
                barcode: 'ITEM000000',
                name: '可口可乐',
                unit: '瓶',
                price: 3.00,

              },
              count:5
            },
            subtotal:15.00
          },
          {
            cartItem:{
              item: {
                barcode: 'ITEM000001',
                name: '雪碧',
                unit: '瓶',
                price: 3.00,

              },count:2
            },
            subtotal:6.00
          },


          {
            cartItem:{
              item: {
                barcode: 'ITEM000004',
                name: '电池',
                unit: '个',
                price: 2.00,

              },
              count:1
            },
            subtotal:2.00
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
            barcode: 'ITEM000000',
            name: '可口可乐',
            unit: '瓶',
            price: 3.00,

          },
          count:5
        },
        subtotal:15.00
      },
      {
        cartItem:{
          item: {
            barcode: 'ITEM000001',
            name: '雪碧',
            unit: '瓶',
            price: 3.00,

          },count:2
        },
        subtotal:6.00
      },
      {
        cartItem:{
          item: {
            barcode: 'ITEM000004',
            name: '电池',
            unit: '个',
            price: 2.00,

          },
          count:1
        },
        subtotal:2.00
      }];
    it('should print correct text', function() {
      var expectText =
      {
        receipts: [
          {
            cartItem:{
              item: {
                barcode: 'ITEM000000',
                name: '可口可乐',
                unit: '瓶',
                price: 3.00,

              },
              count:5
            },
            subtotal:15.00
          },
          {
            cartItem:{
              item: {
                barcode: 'ITEM000001',
                name: '雪碧',
                unit: '瓶',
                price: 3.00,

              },count:2
            },
            subtotal:6.00
          },
          {
            cartItem:{
              item: {
                barcode: 'ITEM000004',
                name: '电池',
                unit: '个',
                price: 2.00,

              },
              count:1
            },
            subtotal:2.00
          }
        ],
        total: 23.00
      } ;

      expect(buildReceipt(inputs)).toEqual(expectText);
    });
  });

  describe("print testing", function () {
    var inputs;

    inputs = {
      receipts: [
        {
          cartItem:{
            item: {
              barcode: 'ITEM000000',
              name: '可口可乐',
              unit: '瓶',
              price: 3.00,

            },
            count:5
          },
          subtotal:15.00
        },
        {
          cartItem:{
            item: {
              barcode: 'ITEM000001',
              name: '雪碧',
              unit: '瓶',
              price: 3.00,

            },count:2
          },
          subtotal:6.00
        },
        {
          cartItem:{
            item: {
              barcode: 'ITEM000004',
              name: '电池',
              unit: '个',
              price: 2.00,

            },
            count:1
          },
          subtotal:2.00
        }
      ],
      total: 23.00
    } ;
    it('should print correct text', function () {
      var expectText =
        '***<没钱赚商店>收据***\n' +
        '名称：可口可乐，数量：5瓶，单价：3.00(元)，小计：15.00(元)\n' +
        '名称：雪碧，数量：2瓶，单价：3.00(元)，小计：6.00(元)\n' +
        '名称：电池，数量：1个，单价：2.00(元)，小计：2.00(元)\n' +
        '----------------------\n' +
        '总计：23.00(元)\n' +
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
      'ITEM000000',
      'ITEM000000',
      'ITEM000000',
      'ITEM000000',
      'ITEM000000',
      'ITEM000001',
      'ITEM000001',
      'ITEM000004'
    ];
  });

  it('should print correct text', function() {

    spyOn(console, 'log');

    printReceipt(inputs);

    var expectText =
      '***<没钱赚商店>收据***\n' +
      '名称：可口可乐，数量：5瓶，单价：3.00(元)，小计：15.00(元)\n' +
      '名称：雪碧，数量：2瓶，单价：3.00(元)，小计：6.00(元)\n' +
      '名称：电池，数量：1个，单价：2.00(元)，小计：2.00(元)\n' +
      '----------------------\n' +
      '总计：23.00(元)\n' +
      '**********************';

    expect(console.log).toHaveBeenCalledWith(expectText);
  });
});
});
