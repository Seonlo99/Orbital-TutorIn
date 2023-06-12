import { rootUrl } from "../config/config";

const UPLOAD_FOLDER_BASE_URL = process.env.NODE_ENV === "production" ? "" :`${rootUrl}/uploads/`; //

const stables = { UPLOAD_FOLDER_BASE_URL };

export default stables;
