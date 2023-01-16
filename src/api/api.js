const axios = require("axios");

async function getResquest(url, data) {
  const res = await axios({
    url: `${process.env.BASE_URL}/${url}`,
    method: "GET",
    headers: {},
    data,
    withCredentials: true,
  });
  return res;
}
async function getResquestWithId(url, data, id) {
  const res = await axios({
    url: `${process.env.BASE_URL}/${url}/${id}`,
    method: "GET",
    headers: {},
    data,
    withCredentials: true,
  });
  return res;
}
async function postResquest(url, data) {
  const res = await axios({
    url: `${process.env.BASE_URL}/${url}`,
    method: "POST",
    headers: {},
    data: data,
    withCredentials: true,
  });
  return res;
}
async function postResquestWithId(url, data, id) {
  const res = await axios({
    url: `${process.env.BASE_URL}/${url}/${id}`,
    method: "POST",
    headers: {},
    data,
    withCredentials: true,
  });
  return res;
}

module.exports = {
  getResquest,
  getResquestWithId,
  postResquest,
  postResquestWithId,
};
