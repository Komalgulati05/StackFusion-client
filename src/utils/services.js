import axios from "axios";
import { FORMAPI, VIEWAPI } from "./Routes";
 export const BASE_URL = "https://stackfusion-server-production.up.railway.app/api"; //devlopment//

// export const BASE_URL = "http://localhost:5000/api"; //devlopment//


axios.defaults.baseURL = BASE_URL;



export const Formdata = async (data) => {

  try {
    const response = await axios.post(FORMAPI, data, {
      headers: { "Content-Type": "application/json" },
    });

    if (response.status === 200) {
      return { res: response.data }
    } else {
      return response.data;
    }

  } catch (err) {
    if (err.response) throw err.response.data;
    else throw err.message;
  }
}

export const View = async () => {

  try {
    const response = await axios.get(VIEWAPI, {
      headers: { "Content-Type": "application/json" },
    });

    if (response.status === 200) {
      return { res: response.data }
    } else {
      return response.data;
    }

  } catch (err) {
    if (err.response) throw err.response.data;
    else throw err.message;
  }
}