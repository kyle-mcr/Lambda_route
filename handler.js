'use strict';

const request = require('sync-request');

// const API_URL = process.env.API_URL;


module.exports.routing = (event, context, callback) => {

  const body = JSON.parse(event.body)
  const afid = body?.properties?.afid?.value ?? ""
  const cid = body?.properties?.cid?.value ?? ""
  const clickid = body?.properties?.clickid?.value ?? ""
  console.log("affiliate ID is:", afid)
  console.log("campaign ID is:", cid)
  console.log("click ID is:", clickid)
  try {
    sendToLinkTrust(clickid, cid, afid);
  } catch (err) {
    console.log(err);
    callback(err);
  }

  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: "Information Sent"
    }),
  };
  callback(null, response);
};



const sendToLinkTrust = (clickid, cid, afid) => {
 
  const API_URL = `http://route1.lnjmp.com/click.track?CID=${cid}&AFID=${afid}&ClickID=${clickid}`
  console.log(API_URL)

  const resp = request('POST', API_URL)

  // Use getBody to check if there was an error.
  resp.getBody();
}
