import request from 'supertest';
import { app } from '../../app';
import { Ticket } from '../../models/ticket';

it('has a route handler listening to /api/tickets for post requets', async()=> {
  const response = await request(app)
  .post('/api/tickets')
  .send({});

  expect(response.status).not.toEqual(404);
});

it('can only be access if user is signed in', async()=> {
  const response = await request(app)
  .post('/api/tickets')
  .send({});

  expect(response.status).toEqual(401);
});

it('returns a status other than 401 is user is signed in', async()=> {

  const response = await request(app)
  .post('/api/tickets').set('Cookie', global.signin())
  .send({});

  expect(response.status).not.toEqual(401);
});

it('returns an error if invalid title is provided', async()=> {
  await request(app)
  .post('/api/tickets')
  .set('Cookie', global.signin())
  .send({
    title: '',
    price: '12'
  }).expect(400);

  await request(app)
  .post('/api/tickets')
  .set('Cookie', global.signin())
  .send({
    price: '12'
  }).expect(400);

});

it('returns an error if invalid price is provided', async()=> {
  await request(app)
  .post('/api/tickets')
  .set('Cookie', global.signin())
  .send({
    title: 'title',
    price: ''
  }).expect(400);

  await request(app)
  .post('/api/tickets')
  .set('Cookie', global.signin())
  .send({
    title: 'title'
  }).expect(400);

  await request(app)
  .post('/api/tickets')
  .set('Cookie', global.signin())
  .send({
    price: '-12'
  }).expect(400);

});

it('creates a ticket for valid input', async()=> {

  let tickets = await Ticket.find({});
  expect(tickets.length).toEqual(0);

  await request(app)
  .post('/api/tickets')
  .set('Cookie', global.signin())
  .send({
    title:'title',
    price:'12'
  }).expect(201)

  tickets = await Ticket.find({});
  expect(tickets.length).toEqual(1);
});
