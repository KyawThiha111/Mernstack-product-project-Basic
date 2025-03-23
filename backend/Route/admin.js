import { registerAdmin,addedPatientToAdmin,loginAdmin,SeeEachAdmin } from "../Controller/admin.js";
import { Router } from "express";
const route = Router();
route.post("/registernewadmin",registerAdmin);
route.put("/addpatientstoadmin",addedPatientToAdmin)
route.get("/displayadmins/:id",SeeEachAdmin);
route.post("/loginadmin",loginAdmin)
export default route;