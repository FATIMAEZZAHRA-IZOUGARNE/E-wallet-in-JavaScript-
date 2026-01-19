import { Injectable } from '@nestjs/common';
import * as fs from 'fs/promises';
import * as path from 'path';

@Injectable()
export class UsersService {
    constructor(){}
    private filePath= path.join(process.cwd(),'src/db','data.json');

    async signup(user:any){
        const db = await fs.readFile(this.filePath,'utf-8');
        const data = JSON.parse(db);
        console.log('data avant signup:', data);

         // vérifier si l'utilisateur existe
        const exist= await this.finduserbyemail(user.email);
        const parsedDb = JSON.parse(db);
        if(exist){
            return{
                success:false,
                message:"user already exist ",

            }
        }
         const newUser = await this.createnewuser(user);
         data.users.push(newUser);

         await fs.writeFile(this.filePath,JSON.stringify(data,null,2));
         return { success:true, message:"User created successfully", user:newUser };

         console.log('ok');
    }
            
        

    
        //------------------
    async finduserbyemail(email:String){
        //recuperation fichier data
         const db = await fs.readFile(this.filePath,'utf-8');

         //transformer
         const data = JSON.parse(db);

         return data.users.find(u=>u.email===email);

    }

    //-------------------------
    async createnewuser(user:any){
        const newuser={
            id: Date.now().toString(),
            name : user.name,
            email : user.email,
            password : user.password,
            
        }
        return newuser;
    }
    

}
