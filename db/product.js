const pool = require('./connection');

class Productdb{
    static async view(param){
        let client = await pool.connect(); 
  
        try{ 
           let product;
            switch(param.from){
                case 'category':
                     
                        if(param.id == 0){
                            product = await client.query(`SELECT * FROM product 
                                                WHERE product.stock > 0 
                                                AND is_available = true;`, []);
         
                        }else{
                            product = await client.query(`SELECT product.id, product.name, product.price, product.stock, 
                                                         product.image, product.is_available FROM product 
                                                         INNER JOIN sub_categories on sub_categories.id = product.sub_categories_id 
                                                         INNER JOIN categories ON sub_categories.categories_id = categories.id
                                                         WHERE categories.id = $1 AND product.stock > 0 AND product.is_available = true;`,[param.id]);  
                         }
                        break;
                case 'subCategory':
                      
                            product = await client.query(`SELECT product.id, product.name, product.price, product.stock, 
                                                        product.image, product.is_available, product.sub_categories_id  
                                                        FROM product WHERE product.sub_categories_id = $1 
                                                        AND product.stock > 0 AND product.is_available = true;`,[param.id]);      
                break;
                default:
                    throw new Error('error');
            }
            
         return product.rows;
            
        }catch(error){
            return new Error('error');
        }
        finally{
            console.log('end');
          await client.release();
        }
    }

    static async searchByName(param){
        let client = await pool.connect(); 
  
        try{ 
            const product = await client.query(`SELECT product.id, product.name, product.price, 
            product.stock, product.image, product.is_available, product.sub_categories_id  
            FROM product WHERE LOWER(name) LIKE LOWER($1) 
            AND product.stock > 0 AND product.is_available = true;`,[`%${param.word}%`]);
           
           return product.rows;
            
        }catch(error){
            return new Error('error');
        }
        finally{
            console.log('end');
          await client.release();
        }
   }

}

module.exports = Productdb;

/*
queries

all products
SELECT * FROM product WHERE product.stock > 0 AND is_available = true;

by id
SELECT * FROM product WHERE id = $1 AND product.stock > 0 AND is_available = true;

by category
SELECT product.id, product.name, product.price, product.stock, product.image, product.is_available  
FROM product INNER JOIN sub_categories on sub_categories.id = product.sub_categories_id 
INNER JOIN categories ON sub_categories.categories_id = categories.id
WHERE categories.id = $1 AND product.stock > 0 AND product.is_available = true;

by subcategory
SELECT product.id, product.name, product.price, product.stock, product.image, product.is_available, product.sub_categories_id  
FROM product WHERE product.sub_categories_id = $1 AND product.stock > 0 AND product.is_available = true;

by name like
SELECT product.id, product.name, product.price, product.stock, product.image, product.is_available, product.sub_categories_id  
FROM product WHERE LOWER(name) LIKE LOWER(%$1%) AND product.stock > 0 AND product.is_available = true;


  const product = await client.query(`SELECT * FROM product WHERE product.stock > 0 AND is_available = true;`, []);
           
  const product = await client.query(`SELECT * FROM product WHERE id = $1 AND product.stock > 0 AND is_available = true;`,[1]);
           
  const product = await client.query(`SELECT product.id, product.name, product.price, product.stock, 
           product.image, product.is_available FROM product 
           INNER JOIN sub_categories on sub_categories.id = product.sub_categories_id 
           INNER JOIN categories ON sub_categories.categories_id = categories.id
           WHERE categories.id = $1 AND product.stock > 0 AND product.is_available = true;`,[3]); 

   const product = await client.query(`SELECT product.id, product.name, product.price, product.stock, 
           product.image, product.is_available, product.sub_categories_id  
           FROM product WHERE product.sub_categories_id = $1 
           AND product.stock > 0 AND product.is_available = true;`,[3]);
           
    const product = await client.query(`SELECT product.id, product.name, product.price, 
          product.stock, product.image, product.is_available, product.sub_categories_id  
          FROM product WHERE LOWER(name) LIKE LOWER($1) 
          AND product.stock > 0 AND product.is_available = true;`,['%copa%']);
          
*/