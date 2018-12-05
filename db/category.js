const { Pool } = require('pg');
const config = require('../config/config');
const pool = new Pool({
    connectionString: process.env.DATABASE_URL || config.dataBase,
  });
  
class Categorydb{
   
    static async viewAll(){
        let client = await pool.connect(); 
        
        try{ 
         // const { rows } = await client.query('SELECT categories.id, categories.name, sub_categories.id, sub_categories.name FROM categories join sub_categories on categories.id = sub_categories.categories_id where sub_categories.categories_id = categories.id;');
          const cat = await client.query('select * from categories', []);
          const sub = await client.query('select * from sub_categories', []);

            for(let i = 0; i < sub.rowCount; i++){
           
                if(cat.rows[sub.rows[i].categories_id - 1].subCat){
                    cat.rows[sub.rows[i].categories_id - 1].subCat.push(sub.rows[i]);
                }else 
                {
                    cat.rows[sub.rows[i].categories_id - 1].subCat = [];
                    cat.rows[sub.rows[i].categories_id - 1].subCat.push(sub.rows[i]);
                }
                
            }
         
         return cat.rows;
        }catch(error){
            return new Error('error');
        }
        finally{
            console.log('end');
          await client.release();
        }
    } 
    
}  

module.exports = Categorydb;