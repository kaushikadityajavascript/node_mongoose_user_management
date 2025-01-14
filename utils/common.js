const catchAsync = require("./catchAsync");
const fs = require("fs");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("./customError");
const getPaginatedData = async (
  model,
  page = 1,
  pageSize = 10,
  filter = {}
) => {
  if (page === 0) {
    const count = 0;
    const totalPages = 0;
    const currentPage = page;
    const data = [];
    return { count, totalPages, currentPage, data };
  }

  const count = await model.count(filter);

  if (count === 0) {
    const totalPages = 0;
    const currentPage = page;
    const data = [];
    return { count, totalPages, currentPage, data };
  }
  const totalPages = Math.ceil(count / pageSize);
  const currentPage = Number(page);
  const offset = (currentPage - 1) * pageSize;
  const limit = pageSize;
  const query = {
    offset,
    limit,
    ...filter,
  };
  const data = await model.findAll(query);
  return { count, totalPages, currentPage, data };
};

const unlinkFile = catchAsync((req) => {
  fs.access(`public/uploads/${req.file.filename}`, fs.constants.F_OK, (err) => {
    if (err) {
      console.error(`File does not exist.`);
    } else {
      // eslint-disable-next-line security/detect-non-literal-fs-filename
      fs.unlink(`public/uploads/${req.file.filename}`, (error) => {
        if (error) {
          throw new CustomError(StatusCodes.INTERNAL_SERVER_ERROR, error);
        }
        req.file.filename = null;
      });
    }
  });
  fs.access(
    `public/uploads/${req.file.filename}`,
    fs.constants.F_OK,
    (errr) => {
      if (errr) {
        console.error(`File does not exist.`);
      } else {
        // eslint-disable-next-line security/detect-non-literal-fs-filename
        fs.unlink(`public/thumbnails/${req.file.filename}`, (err) => {
          if (err) {
            throw new CustomError(StatusCodes.INTERNAL_SERVER_ERROR, err);
          }
          req.file.filename = null;
        });
      }
    }
  );
});

module.exports = { getPaginatedData, unlinkFile };
