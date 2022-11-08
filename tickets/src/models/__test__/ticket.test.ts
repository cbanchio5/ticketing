import { Ticket } from "../ticket";

it('implements optimistic concurrency control', async() => {
//create instance of ticket

const ticket = Ticket.build({
  title: 'concert',
  price: 5,
  userId: '123'
})

//save ticket to DB

await ticket.save();

//fetch ticket twice

const firstInstance = await Ticket.findById(ticket.id);
const secondInstance = await Ticket.findById(ticket.id);

//make 2 separate changes to the fetched ticket
firstInstance!.set({price: 10});
secondInstance!.set({price: 15});
//save 1st fetched ticket
await firstInstance!.save();


//save the second fetched ticket and expect an error

try {
  await secondInstance!.save();
} catch(err) {
  return
}
throw new Error('Should not reach this point');

});

it('increments the version number on multiple saves', async() => {

  const ticket = Ticket.build({
    title: 'concert',
    price: 5,
    userId: '123'
  });

  await ticket.save();

  expect(ticket.version).toEqual(0);

  await ticket.save();

  expect(ticket.version).toEqual(1);

  await ticket.save();

  expect(ticket.version).toEqual(2);

});
