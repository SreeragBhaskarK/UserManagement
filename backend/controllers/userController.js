import pool from "../config/connection.js"

export const home_get = (req, res) => {
    try {
        
    } catch (err) {

    }
}

export const login_post = (req, res) => {

}

export const signup_post = async (req, res) => {
    const userData = req.body
    console.log("kdjfkjdk", userData);
    const client = await pool.connect();
    try {
        const query = 'INSERT INTO users (name) VALUES ($1) RETURNING *';
        const values = [userData.name]
        const result = await client.query(query, values);
        console.log(result);
        res.status(200).json({ success: true })
    }
    catch (err) {
        console.log(err.message
        );
        res.status(404).json({ success: false })
    }
    finally {
        client.release()
    }

}