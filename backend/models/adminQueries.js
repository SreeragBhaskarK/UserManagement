// queries
import {ADMIN_TABLE} from '../config/tables.js'
//login Admin
export const loginAdmin = `SELECT * FROM ${ADMIN_TABLE} WHERE email = $1`;