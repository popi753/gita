import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { QueryParamsDto } from '../expenses/dto/queryParams.dto';



// 1) ყველა პროდუქტს უნდა ჰპონდეს ფასი, სახელი, კატეგორია, აღწერა, რაოდენობა, ვალიდაციისთვის გამოიყენეთ class-validator class-transformer


// 3) ყველა პროდუქტის გამოძახებისას დაადეთ გარდი და შეამოწმეთ თუ მოყვება იმეილი და ამ იმეილით ნაპოვნ იუზერს აქვს აქტიური საბსქრიფშენი დააბრუნოს ფასდაკებული პროდუქტები თუ არადა და დააბრუნოს ჩვეულებრივი პროდუქტები.
// * გაითვალისწინეთ თუ იმეილი არ გადაეცი ჰედერში პროდუქტების წამოღების დროს ერორი არ უნდა დაარტყას და ყველა პროდუქტი უნდა დააბრუნოს.



@Injectable()
export class ProductsService {
  private products = [
          {id:1,category:"entertainment",productName:"netflix",description:"streaming service",price:15,quantity:1},
          {id:2,category:"entertainment",productName:"spotify",description:"music streaming",price:10,quantity:1},
          {id:3,category:"entertainment",productName:"disney+",description:"streaming platform",price:12,quantity:1},
          {id:4,category:"electronics",productName:"laptop",description:"gaming laptop",price:1200,quantity:5},
          {id:5,category:"electronics",productName:"smartphone",description:"latest model",price:800,quantity:10},
          {id:6,category:"electronics",productName:"tablet",description:"10 inch screen",price:400,quantity:8},
          {id:7,category:"electronics",productName:"headphones",description:"wireless",price:150,quantity:20},
          {id:8,category:"electronics",productName:"smartwatch",description:"fitness tracker",price:250,quantity:15},
          {id:9,category:"clothing",productName:"t-shirt",description:"cotton",price:20,quantity:50},
          {id:10,category:"clothing",productName:"jeans",description:"denim",price:60,quantity:30},
          {id:11,category:"clothing",productName:"jacket",description:"winter jacket",price:120,quantity:15},
          {id:12,category:"clothing",productName:"sneakers",description:"running shoes",price:90,quantity:25},
          {id:13,category:"clothing",productName:"dress",description:"summer dress",price:70,quantity:20},
          {id:14,category:"books",productName:"fiction novel",description:"bestseller",price:18,quantity:40},
          {id:15,category:"books",productName:"cookbook",description:"recipes",price:25,quantity:30},
          {id:16,category:"books",productName:"textbook",description:"mathematics",price:80,quantity:10},
          {id:17,category:"books",productName:"magazine",description:"monthly issue",price:5,quantity:100},
          {id:18,category:"books",productName:"comic book",description:"superhero",price:8,quantity:60},
          {id:19,category:"food",productName:"coffee",description:"arabica beans",price:15,quantity:50},
          {id:20,category:"food",productName:"chocolate",description:"dark chocolate",price:5,quantity:80},
          {id:21,category:"food",productName:"pasta",description:"italian",price:3,quantity:100},
          {id:22,category:"food",productName:"olive oil",description:"extra virgin",price:12,quantity:40},
          {id:23,category:"food",productName:"honey",description:"organic",price:10,quantity:35},
          {id:24,category:"home",productName:"lamp",description:"desk lamp",price:35,quantity:25},
          {id:25,category:"home",productName:"pillow",description:"memory foam",price:40,quantity:30},
          {id:26,category:"home",productName:"blanket",description:"wool",price:55,quantity:20},
          {id:27,category:"home",productName:"curtains",description:"blackout",price:45,quantity:15},
          {id:28,category:"home",productName:"rug",description:"persian style",price:200,quantity:8},
          {id:29,category:"sports",productName:"yoga mat",description:"non-slip",price:30,quantity:40},
          {id:30,category:"sports",productName:"dumbbell set",description:"adjustable",price:100,quantity:12},
          {id:31,category:"sports",productName:"tennis racket",description:"professional",price:150,quantity:10},
          {id:32,category:"sports",productName:"basketball",description:"official size",price:25,quantity:30},
          {id:33,category:"sports",productName:"bicycle",description:"mountain bike",price:500,quantity:6},
          {id:34,category:"beauty",productName:"shampoo",description:"organic",price:12,quantity:50},
          {id:35,category:"beauty",productName:"moisturizer",description:"anti-aging",price:35,quantity:40},
          {id:36,category:"beauty",productName:"lipstick",description:"matte finish",price:18,quantity:60},
          {id:37,category:"beauty",productName:"perfume",description:"floral scent",price:80,quantity:20},
          {id:38,category:"beauty",productName:"nail polish",description:"quick dry",price:8,quantity:70},
          {id:39,category:"toys",productName:"lego set",description:"castle theme",price:60,quantity:15},
          {id:40,category:"toys",productName:"puzzle",description:"1000 pieces",price:20,quantity:25},
          {id:41,category:"toys",productName:"board game",description:"strategy",price:35,quantity:20},
          {id:42,category:"toys",productName:"action figure",description:"collectible",price:25,quantity:30},
          {id:43,category:"toys",productName:"doll",description:"fashion doll",price:30,quantity:25},
          {id:44,category:"automotive",productName:"car wax",description:"protective",price:15,quantity:40},
          {id:45,category:"automotive",productName:"tire pump",description:"portable",price:25,quantity:20},
          {id:46,category:"automotive",productName:"car cover",description:"waterproof",price:50,quantity:15},
          {id:47,category:"automotive",productName:"dash cam",description:"hd recording",price:100,quantity:10},
          {id:48,category:"automotive",productName:"floor mats",description:"all weather",price:40,quantity:25},
          {id:49,category:"entertainment",productName:"hbo max",description:"streaming service",price:14,quantity:1},
          {id:50,category:"entertainment",productName:"youtube premium",description:"ad-free",price:12,quantity:1}
      ]

  create(createProductDto: CreateProductDto) {
    const {category,description,price,productName,quantity} = createProductDto;
     try {
            let id = Math.ceil(Math.random()*100);
            while(this.products.find(e=>e.id===id)){
                id++
            }
            
            
            const newProduct = {
                id,
                category,
                productName,
                description,
                price,
                quantity,
            }

            this.products.push(newProduct);

            return {success:true,newProduct}

        } catch (error) {
            throw new InternalServerErrorException(error)
        }
  }

  findAll({page,take,priceFrom,priceTo,category}:QueryParamsDto, hasSubscription:boolean) {
     try {
                    const start = (page-1)*take
                    const end = page*take
            
                    let filteredProducts = this.products;
    
                    if (category) {
                        filteredProducts = filteredProducts.filter(e=>{
                            return (e.category === category)
                        })
                    }
    
                    if (priceFrom || priceTo) {
                        filteredProducts = filteredProducts.filter(e=>{
                            if (priceFrom && priceTo) {
                                return e.price >= priceFrom && e.price <= priceTo
                            } else if (priceFrom) {
                                return e.price >= priceFrom
                            } else if (priceTo) {
                                return e.price <= priceTo
                            }
                            return true
                        })
                    }
    
    
                    let paginatedProducts = filteredProducts.slice(start, end);

                    
                        if (hasSubscription) {
                            paginatedProducts = paginatedProducts.map(e=>{
                                return {
                                    ...e,
                                    price: e.price * 0.9
                                }
                            })
                        }

    
                    return {
                        page,
                        take,
                        total: filteredProducts.length,
                        data:  paginatedProducts
                    }
                    
            
                } catch (error) {
                    throw new InternalServerErrorException(error);
                };
  }

  findOne(id: number, hasSubscription:boolean) {
            const product = this.products.find(e=>e.id===id);
            if (!product) {
                throw new NotFoundException("product not found");
            }
            if (hasSubscription) {
                product.price *= 0.9;
            }

            return product;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
        const productIndex = this.products.findIndex(e=>e.id===id);
        if (productIndex === -1) {
            throw new NotFoundException("product not found");
        }
        
        const updatedProduct = {...this.products[productIndex], ...updateProductDto};
        
        this.products[productIndex] = updatedProduct;
        return {success:true,updatedProduct};
  }

  remove(id: number) {
      const productIndex = this.products.findIndex(e=>e.id===id);
        if (productIndex === -1) {
            throw new NotFoundException("product not found");
        }

        const product = this.products[productIndex];
        this.products.splice(productIndex,1);
        return {success:true,product};
  }
}
