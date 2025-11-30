import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe, UseGuards, Req } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { QueryParamsDto } from '../expenses/dto/queryParams.dto';
import { UserService } from "../users/users.service";
import { SubscriptionGuard } from '../guards/subscription.guard';


// 1) ყველა პროდუქტს უნდა ჰპონდეს ფასი, სახელი, კატეგორია, აღწერა, რაოდენობა, ვალიდაციისთვის გამოიყენეთ class-validator class-transformer


// 3) ყველა პროდუქტის გამოძახებისას დაადეთ გარდი და შეამოწმეთ თუ მოყვება იმეილი და ამ იმეილით ნაპოვნ იუზერს აქვს აქტიური საბსქრიფშენი დააბრუნოს ფასდაკებული პროდუქტები თუ არადა და დააბრუნოს ჩვეულებრივი პროდუქტები.
// * გაითვალისწინეთ თუ იმეილი არ გადაეცი ჰედერში პროდუქტების წამოღების დროს ერორი არ უნდა დაარტყას და ყველა პროდუქტი უნდა დააბრუნოს.


@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @UseGuards(new SubscriptionGuard(new UserService))
  @Get()
  findAll(@Query() query:QueryParamsDto,@Req() req) {
    return this.productsService.findAll(query, req["subscription"]);
  }

  @UseGuards(new SubscriptionGuard(new UserService))
  @Get(':id')
  findOne(@Param("id", ParseIntPipe) id:number,@Req() req) {
    return this.productsService.findOne(id, req["subscription"]);
  }

  @Patch(':id')
  update(@Param("id", ParseIntPipe) id: number, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param("id", ParseIntPipe) id:number) {
    return this.productsService.remove(id);
  }
}
