async function testM() {
  try {
   let data = {message:"Backend Running..."}
    return { message: data, success: true, token: null };
  } catch (error) {
    return { message: error, success: false, token: null };
  }
}

module.exports = {
  testM
};
