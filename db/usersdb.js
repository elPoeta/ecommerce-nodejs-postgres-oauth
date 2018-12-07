const pool = require('./connection');

class Userdb{

 static async findUserByEmail(email){
        let client = await pool.connect(); 
     
        try{ 
            const user = await client.query('SELECT * FROM "user" WHERE email = $1', [email]);
            
            return user.rows[0];
        }catch(error){
            return new Error('error');
        }
        finally{
            
          await client.release();
        }
    }
   
    static async findUserById(id){
        let client = await pool.connect();
        try{

         const  user = await client.query('SELECT * FROM "user" WHERE id = $1', [id]);
     
         return user.rows[0];
        } 
        catch(error){
            return new Error('error');
        }
        finally{
           
          await client.release();
        }
    }
    
    static async insertUser(newUser){
        let client = await pool.connect();
        try{
        
            const user = await client.query('INSERT INTO "user" (oauth, email, name, last_name, image) VALUES($1,$2,$3,$4,$5) RETURNING *', [newUser.googleID, newUser.email, newUser.name, newUser.lastname, newUser.image]);
         
            return user.rows[0];
        
        } 
        catch(error){
            return new Error('error');
        }
        finally{
          
          await client.release();
        }
         }
}    

module.exports = Userdb;