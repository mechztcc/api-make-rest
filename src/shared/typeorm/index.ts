import { createConnection } from 'typeorm';

createConnection().then((d) => {
  console.log('Connected at database successfully!');
});
