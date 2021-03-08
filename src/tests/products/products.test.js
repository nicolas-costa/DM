const request = require('supertest');
const app = require('./../../../index');
const db = require('../../models');

it('should get 404 when the product doesnt exists',
    async (done) => {
        const res = await request(app).get('/api/products/foobar');

        expect(res.statusCode)
            .toEqual(404);
        done();
    });

it('should get 200 when the product exists',
    async (done) => {
        const { Product } = db;
        await Product.create({
            name: 'teste1',
            price: 10,
        });

        const res = await request(app).get('/api/products/teste1');

        expect(res.statusCode)
            .toEqual(200);
        done();
    });


