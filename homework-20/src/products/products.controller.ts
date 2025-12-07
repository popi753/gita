import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe, UseGuards, Req } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { QueryParamsDto } from '../expenses/dto/queryParams.dto';
import { SubscriptionGuard } from '../guards/subscription.guard';
import { isValidObjectid } from '../common/is-valid-objectId.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @UseGuards(SubscriptionGuard)
  @Get()
  findAll(@Query() query:QueryParamsDto,@Req() req) {
    return this.productsService.findAll(query, req["subscription"]);
  }

  @UseGuards(SubscriptionGuard)
  @Get(':id')
  findOne(@Param() {id}:isValidObjectid, @Req() req) {
    return this.productsService.findOne(id, req["subscription"]);
  }

  @Patch(':id')
  update(@Param() {id}: isValidObjectid, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param() {id}: isValidObjectid) {
    return this.productsService.remove(id);
  }



  // insert many users at once
  //   use once dont repeat
    // @Post("/insertMany")
    // insertMany(){
    //     return this.productsService.insertDataToMongoDB();
    // }
}
