import axios from "axios"
import apiServer from "./api-server"

export default async function MainRequest(path, { method = "GET", data = undefined, ...others } = {}) {
  try {
    const ex_axios = axios.create({
      baseURL: apiServer
    })
    const defaultConfig = {
      ...others,
      url: String(path),
      method: String(method),
      data: data
    }
    const requestdata = await ex_axios.request(defaultConfig)
    return {
      status: requestdata.status,
      statusText: requestdata.statusText,
      headers: requestdata.headers,
      data: requestdata.data
    }
  } catch(e) {
    console.log("[MainRequest Error]:", e.message)
    const responsedata = (e.response)
    if(!!responsedata) {
      return {
        status: responsedata.status,
        statusText: responsedata.statusText,
        headers: responsedata.headers,
        data: responsedata.data
      }
    }
    return {
      status: -30,
      statusText: "It seems like there is a problem on the client side. Is your internet connection working normally?",
      headers: {},
      data: {}
    }
  }
}