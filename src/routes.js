const { addBooksHandler, getAllBooksHandler, getBooksByIdHandler, editBookByIdHndler, deleteBookByIdHndler } = require('./handler');
const routes = [
  {
    method: 'POST',
    path: '/books',
    handler: addBooksHandler,
    options:{
      cors: {
        origin: ['*'],
      },
    },
  },
  {
    method: 'GET',
    path: '/books',
    handler: getAllBooksHandler,
 },
 {
  method: 'GET',
  path: '/books/{id}',
  handler: getBooksByIdHandler,
},
{
  method: 'PUT',
  path: '/books/{id}',
  handler: editBookByIdHndler,
},
{
  method: 'DELETE',
  path: '/books/{id}',
  handler: deleteBookByIdHndler,
}
];

module.exports = routes;
