const { nanoid } = require('nanoid');
const books = require('./books');


const addBooksHandler = (request, h) => {
  const { name, year, author, summary, publisher,pageCount,readPage,reading } = request.payload;

  if (name === undefined) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku, Mohon nama buku di isi',
    });
    response.code(400);
  }

  if (readPage > pageCount){
    const response = h.response({
      status:'fail',
      message: 'Gagal menambahkan buku, readPage tidak boleh lebiih besar dari pageCount ',
    });
    response.code(400);
  }

  const id = nanoid(16);
  const createdAt = new Date().toISOString();
  const updatedAt = createdAt;
  const finished = (pageCount === readPage);
  const newBooks = {
    id, name, year, author, summary, publisher, pageCount, readPage, finished,reading, createdAt, updatedAt,
  };

  books.push(newBooks);

  const isSuccess = books.filter((book) => book.id === id).length > 0;

  if (isSuccess) {
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil ditambahkan',
      data: {
        bookId: id,
      },
    });
    response.code(201);
    return response;
  }
  const response = h.response({
    status: 'fail',
    message: 'Catatan gagal ditambahkan',
  });
  response.code(500);
  return response;
};

const getAllBooksHandler = (request, h) => {
  const {reading} = request.query;

  if (reading !== undefined){
    const book = books.filter(
      (book) => Number(book.reading) === Number(reading),
    );

    const response = h.response({
      status: 'success',
      data:{
        books: book.map((book) => ({
          id: book.id,
          name: book.name,
          publisher: boook.publisher,
        }),
        ),
      },
    });

    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'success',
    data: {
      books: books.map((book) => ({
        id: book.id,
        name: book.name,
        publisher: book.publisher,
      }),
      )
    }
  });
  response.code(200);
  return response;
}

const getBooksByIdHandler = (request, h) => {
  const { id } = request.params;
 
  const book = books.filter((n) => n.id === id)[0];
 
 if (book !== undefined) {
    return {
      status: 'success',
      data: {
        book,
      },
    };
  }
 
  const response = h.response({
    status: 'fail',
    message: 'Catatan tidak ditemukan',
  });
  response.code(404);
  return response;
};


const editBookByIdHndler = (request, h) => {
  const { id } = request.params;
  const {
    name, year, author, summary, publisher, pageCount, readPage, reading,
  } = request.payload;
  const updatedAt = new Date().toISOString();
  const index = books.findIndex((book) => book.id === id);

  if (index !== -1) {
    if (name === undefined) {
      const response = h.response({
        status: 'fail',
        message: 'Gagal memperbarui buku. Mohon isi nama buku',
      });
      response.code(400);

      return response;
    }

    if (pageCount < readPage) {
      const response = h.response({
        status: 'fail',
        message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
      });
      response.code(400);

      return response;
    }

    const finished = (pageCount === readPage);

    books[index] = {
      ...books[index],
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      finished,
      reading,
      updatedAt,
    };

    const response = h.response({
      status: 'success',
      message: 'Buku berhasil diperbarui',
    });
    response.code(200);

    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Gagal memperbarui buku. Id tidak ditemukan',
  });
  response.code(404);

  return response;
};

const deleteBookByIdHndler = (request, h) => {
  const { id } = request.params;

  const index = books.findIndex((note) => note.id === id);

  if (index !== -1) {
    books.splice(index, 1);
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil dihapus',
    });
    response.code(200);

    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Buku gagal dihapus. Id tidak ditemukan',
  });
  response.code(404);

  return response;
};
 
module.exports = { addBooksHandler, getAllBooksHandler, getBooksByIdHandler, editBookByIdHndler, deleteBookByIdHndler};

