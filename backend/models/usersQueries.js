
import {USER_TABLE,ADMIN_TABLE} from '../config/tables.js'
// queries

//getting
export const getUsers = `SELECT * FROM ${USER_TABLE};`
export const getUsersById = `SELECT * FROM ${USER_TABLE} WHERE id = $1`;

//signup

export const addUser = `INSERT INTO ${USER_TABLE} (name,email,phone,password) VALUES($1,$2,$3,$4);`

//login 
export const loginUser = `SELECT * FROM ${USER_TABLE} WHERE email = $1`;

//delete
export const deleteUser = `DELETE FROM ${USER_TABLE} WHERE id = $1 `

//update userData

export const updateUser = `UPDATE ${USER_TABLE} SET name = $1 , email = $2 , phone = $3 WHERE id = $4`

// upload image url

export const uploadImages = `UPDATE ${USER_TABLE} SET image = $1 WHERE id=$2`
