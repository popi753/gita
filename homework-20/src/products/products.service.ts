import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { QueryParamsDto } from '../expenses/dto/queryParams.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { product } from './schemas/product.schema';
import { isValidObjectid } from '../common/is-valid-objectId.dto';



// 1) ყველა პროდუქტს უნდა ჰპონდეს ფასი, სახელი, კატეგორია, აღწერა, რაოდენობა, ვალიდაციისთვის გამოიყენეთ class-validator class-transformer


// 3) ყველა პროდუქტის გამოძახებისას დაადეთ გარდი და შეამოწმეთ თუ მოყვება იმეილი და ამ იმეილით ნაპოვნ იუზერს აქვს აქტიური საბსქრიფშენი დააბრუნოს ფასდაკებული პროდუქტები თუ არადა და დააბრუნოს ჩვეულებრივი პროდუქტები.
// * გაითვალისწინეთ თუ იმეილი არ გადაეცი ჰედერში პროდუქტების წამოღების დროს ერორი არ უნდა დაარტყას და ყველა პროდუქტი უნდა დააბრუნოს.



@Injectable()
export class ProductsService {

    constructor(
            @InjectModel("product") private productModel: Model<product>
        ){}

 

  async create(createProductDto: CreateProductDto) {
     try {
            const newProduct = await this.productModel.create(createProductDto);
            if (!newProduct) {
                throw new InternalServerErrorException({product : "could not create product"});        
            }
            return {success:true,newProduct};
        } catch (error) {
            throw new InternalServerErrorException(error)
        }
  }

  async findAll({page,take,priceFrom,priceTo,category}:QueryParamsDto, hasSubscription:boolean) {
      try {
                    const query: Record<string, any> = {
                    };
    
                    if (category) {
                        query.category = category;
                    }
                   
    
                            const priceFilter : Record<string, any>  = {};
                           if (priceFrom && !Number.isNaN(priceFrom)) {
                                   priceFilter.$gte = priceFrom
                                };
                   
                           if (priceTo && !Number.isNaN(priceTo)) {
                                   priceFilter.$lte = priceTo
                                };
                   
                           if (Object.keys(priceFilter).length) {
                                   query.price = priceFilter
                                };

                    const total = await this.productModel.countDocuments(query);
            
                    let products = await this.productModel.find(query)
                                                       .skip((page - 1) * take)
                                                       .limit(take);
            
                    const totalPages = Math.ceil(total / take);
    
                  
                     if (hasSubscription) {
                            products = products.map(e=>{
                                return {
                                     ...e.toObject(),
                                    price: e.price * 0.9
                                }
                            }) as any;
                        }
    
                    return {
                        page,
                        take,
                        total,
                        totalPages,
                        data:  products,
                    }
                    
            
                } catch (error) {
                    throw new InternalServerErrorException(error);
                };
  
  }

  async findOne(id: string, hasSubscription:boolean) {
            const product = await this.productModel.findById(id);
            if (!product) {
                throw new NotFoundException("product not found");
            }
            if (hasSubscription) {
                product.price *= 0.9;
            }

            return product;
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
        const updatedProduct = await this.productModel.findByIdAndUpdate(id,updateProductDto,{new:true});
        if (!updatedProduct) {
            throw new NotFoundException("product not found");
        }
        
        return {success:true,updatedProduct};
  }

  async remove(id: string) {
      const deletedProduct = await this.productModel.findByIdAndDelete(id);
        if (!deletedProduct) {
            throw new NotFoundException("product not found");
        }
        return {success:true,deletedProduct};
  }


  //use once, dont repeat
    // async insertDataToMongoDB(){
    //       const products = [
    //       {category:"entertainment",productName:"netflix",description:"streaming service",price:15,quantity:1},
    //       {category:"entertainment",productName:"spotify",description:"music streaming",price:10,quantity:1},
    //       {category:"entertainment",productName:"disney+",description:"streaming platform",price:12,quantity:1},
    //       {category:"electronics",productName:"laptop",description:"gaming laptop",price:1200,quantity:5},
    //       {category:"electronics",productName:"smartphone",description:"latest model",price:800,quantity:10},
    //       {category:"electronics",productName:"tablet",description:"10 inch screen",price:400,quantity:8},
    //       {category:"electronics",productName:"headphones",description:"wireless",price:150,quantity:20},
    //       {category:"electronics",productName:"smartwatch",description:"fitness tracker",price:250,quantity:15},
    //       {category:"clothing",productName:"t-shirt",description:"cotton",price:20,quantity:50},
    //       {category:"clothing",productName:"jeans",description:"denim",price:60,quantity:30},
    //       {category:"clothing",productName:"jacket",description:"winter jacket",price:120,quantity:15},
    //       {category:"clothing",productName:"sneakers",description:"running shoes",price:90,quantity:25},
    //       {category:"clothing",productName:"dress",description:"summer dress",price:70,quantity:20},
    //       {category:"books",productName:"fiction novel",description:"bestseller",price:18,quantity:40},
    //       {category:"books",productName:"cookbook",description:"recipes",price:25,quantity:30},
    //       {category:"books",productName:"textbook",description:"mathematics",price:80,quantity:10},
    //       {category:"books",productName:"magazine",description:"monthly issue",price:5,quantity:100},
    //       {category:"books",productName:"comic book",description:"superhero",price:8,quantity:60},
    //       {category:"food",productName:"coffee",description:"arabica beans",price:15,quantity:50},
    //       {category:"food",productName:"chocolate",description:"dark chocolate",price:5,quantity:80},
    //       {category:"food",productName:"pasta",description:"italian",price:3,quantity:100},
    //       {category:"food",productName:"olive oil",description:"extra virgin",price:12,quantity:40},
    //       {category:"food",productName:"honey",description:"organic",price:10,quantity:35},
    //       {category:"home",productName:"lamp",description:"desk lamp",price:35,quantity:25},
    //       {category:"home",productName:"pillow",description:"memory foam",price:40,quantity:30},
    //       {category:"home",productName:"blanket",description:"wool",price:55,quantity:20},
    //       {category:"home",productName:"curtains",description:"blackout",price:45,quantity:15},
    //       {category:"home",productName:"rug",description:"persian style",price:200,quantity:8},
    //       {category:"sports",productName:"yoga mat",description:"non-slip",price:30,quantity:40},
    //       {category:"sports",productName:"dumbbell set",description:"adjustable",price:100,quantity:12},
    //       {category:"sports",productName:"tennis racket",description:"professional",price:150,quantity:10},
    //       {category:"sports",productName:"basketball",description:"official size",price:25,quantity:30},
    //       {category:"sports",productName:"bicycle",description:"mountain bike",price:500,quantity:6},
    //       {category:"beauty",productName:"shampoo",description:"organic",price:12,quantity:50},
    //       {category:"beauty",productName:"moisturizer",description:"anti-aging",price:35,quantity:40},
    //       {category:"beauty",productName:"lipstick",description:"matte finish",price:18,quantity:60},
    //       {category:"beauty",productName:"perfume",description:"floral scent",price:80,quantity:20},
    //       {category:"beauty",productName:"nail polish",description:"quick dry",price:8,quantity:70},
    //       {category:"toys",productName:"lego set",description:"castle theme",price:60,quantity:15},
    //       {category:"toys",productName:"puzzle",description:"1000 pieces",price:20,quantity:25},
    //       {category:"toys",productName:"board game",description:"strategy",price:35,quantity:20},
    //       {category:"toys",productName:"action figure",description:"collectible",price:25,quantity:30},
    //       {category:"toys",productName:"doll",description:"fashion doll",price:30,quantity:25},
    //       {category:"automotive",productName:"car wax",description:"protective",price:15,quantity:40},
    //       {category:"automotive",productName:"tire pump",description:"portable",price:25,quantity:20},
    //       {category:"automotive",productName:"car cover",description:"waterproof",price:50,quantity:15},
    //       {category:"automotive",productName:"dash cam",description:"hd recording",price:100,quantity:10},
    //       {category:"automotive",productName:"floor mats",description:"all weather",price:40,quantity:25},
    //       {category:"entertainment",productName:"hbo max",description:"streaming service",price:14,quantity:1},
    //       {category:"entertainment",productName:"youtube premium",description:"ad-free",price:12,quantity:1}
    //   ];

    //     try {
    //         const db = await this.productModel.find();
    //         if (db.length < products.length) {
    //             await this.productModel.insertMany(products);
    //             return "data inserted successfully"
    //         }else{
    //             return "data already exists in database"    
    //         } 
    //     } catch (error) {
    //         throw new InternalServerErrorException(error)
    //     }
    // }

}
