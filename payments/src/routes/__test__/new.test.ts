import request from 'supertest';
import { app } from '../../app';
import mongoose from 'mongoose'
import {Order} from '../../models/order';
import {OrderStatus} from '@cbanchio5tickets/common';

it('return 404 when purchasing an order that does not exists', async() => {

  await request(app)
  .post('/api/payments')
  .set('Cookie', global.signin())
  .send({
    token: 'jksahds',
    orderId: new mongoose.Types.ObjectId().toHexString()
  })
  .expect(404);
})

it('returns 401 when purchasing order that doesnt belong to user', async() => {
  const order = Order.build({
    id: new mongoose.Types.ObjectId().toHexString(),
    userId: new mongoose.Types.ObjectId().toHexString(),
    version: 0,
    price: 20,
    status: OrderStatus.Created

  });

  await order.save()

  await request(app)
  .post('/api/payments')
  .set('Cookie', global.signin())
  .send({
    token: 'jksahds',
    orderId: order.id
  })
  .expect(401);
})

it('returns 400 when purchasing cancelled order', async() => {
  const userId = new mongoose.Types.ObjectId().toHexString();

  const order = Order.build({
    id: new mongoose.Types.ObjectId().toHexString(),
    userId,
    version: 0,
    price: 20,
    status: OrderStatus.Cancelled

  });

  await order.save();

  await request(app)
  .post('/api/payments')
  .set('Cookie', global.signin(userId))
  .send({
    token: 'jksahds',
    orderId: order.id
  })
  .expect(400);

})