const request = require('supertest');
const app = require('./../../../index');
const db = require('../../models');

it('should get 404 when the purchase doesnt exists',
    async (done) => {

        const res = await request(app).get(`/api/orders/${-1}`);

        expect(res.statusCode)
            .toEqual(404);
        done();
    });

it('should get 200 when the purchase exists',
    async (done) => {
        const { Product, Purchase, ProductPurchase } = db;
        const product = await Product.create({
            name: 'product_test1',
            price: 10,
            quantity: 2
        });

        const purchase = await Purchase.create();

        await ProductPurchase.create({
            product_id: product.id,
            purchase_id: purchase.id
        });

        const res = await request(app).get(`/api/orders/${purchase.id}`);

        expect(res.statusCode)
            .toEqual(200);
        done();
    });

it('should get 200 when listing all purchases',
    async (done) => {
        const res = await request(app).get(`/api/orders/`);

        expect(res.statusCode)
            .toEqual(200);
        done();
    });


