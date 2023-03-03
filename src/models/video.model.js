const VideoModel = require("../db/schema/video.schema")
async function getVideoM() {
    try {
     let data =await VideoModel.find()
      return { message: data, success: true, token: null };
    } catch (error) {
      return { message: error, success: false, token: null };
    }
  }
  
async function postVideoM(body) {
    try {
     let data = await VideoModel.create(body)
      return { message: data, success: true, token: null };
    } catch (error) {
      return { message: error, success: false, token: null };
    }
  }
  
  module.exports = {
    getVideoM
  };
  