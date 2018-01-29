import fetch from "unfetch";
import config from "../config";

class photosService {
  static constructUrl() {
    return `https://api.unsplash.com/collections/399194/photos/?client_id=${
      config.unsplash
    }`;
  }
}

export default photosService;
