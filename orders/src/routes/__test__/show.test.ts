import request from 'supertest';
import { app } from '../../app';
import { Ticket } from '../../models/ticket';
import mongoose from 'mongoose';
it('fetches the order', async() => {
  //create ticket

  const ticket = Ticket.build({
    title: 'concert',
    price: 20,
    id: new mongoose.Types.ObjectId().toHexString()
  });

  await ticket.save();

  const user = global.signin();

  //make a request to build order

  const {body: order} = await request(app)
  .post('/api/orders')
  .set('Cookie', user)
  .send({ticketId: ticket.id})
  .expect(201)

  //make request to fetch order

  const {body: fetchedOrder} = await request(app)
  .get(`/api/orders/${order.id}`)
  .set('Cookie', user)
  .send()
  .expect(200);

  expect(fetchedOrder.id).toEqual(order.id);
})

it('return error if user fetches another users order', async() => {
  //create ticket

  const ticket = Ticket.build({
    title: 'concert',
    price: 20,
    id: new mongoose.Types.ObjectId().toHexString()
  });

  await ticket.save();

  const user = global.signin();

  //make a request to build order

  const {body: order} = await request(app)
  .post('/api/orders')
  .set('Cookie', user)
  .send({ticketId: ticket.id})
  .expect(201)

  //make request to fetch order

  const {body: fetchedOrder} = await request(app)
  .get(`/api/orders/${order.id}`)
  .set('Cookie', global.signin())
  .send()
  .expect(401);


})
