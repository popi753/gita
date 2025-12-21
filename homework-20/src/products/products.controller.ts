import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe, UseGuards, Req } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { QueryParamsDto } from '../expenses/dto/queryParams.dto';
import { SubscriptionGuard } from '../guards/subscription.guard';
import { isValidObjectid } from '../common/is-valid-objectId.dto';
import { ApiBody, ApiCreatedResponse, ApiForbiddenResponse, ApiOkResponse, ApiOperation, ApiParam } from '@nestjs/swagger';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @ApiOperation({ summary: 'Create a new product' })
  @ApiCreatedResponse({ description: 'Product created successfully', example: { name: 'Laptop', price: 999.99, description: 'A Great laptop' } })
  @ApiBody({ type: CreateProductDto })
  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @ApiOperation({ summary: 'Get all products with pagination and subscription check' })
  @ApiOkResponse({ description: 'List of products with pagination', example:{
                    page : 1,
                    take : 10,
                    total : 100,
                    totalPages : 10,
                    data:  [{name: "Laptop", price: 999.99, description: "A Great laptop"}],
                }})
  @ApiForbiddenResponse({ description: 'Forbidden', example: { error: 'Subscription required to access products' } })
  @UseGuards(SubscriptionGuard)
  @Get()
  findAll(@Query() query:QueryParamsDto,@Req() req) {
    return this.productsService.findAll(query, req["subscription"]);
  }

  @ApiOperation({ summary: 'Get a product by id with subscription check' })
  @ApiOkResponse({ description: 'Product found', example: { name: 'Laptop', price: 999.99, description: 'A Great laptop' } })
  @ApiForbiddenResponse({ description: 'Forbidden', example: { error: 'Subscription required to access products' } })
  @ApiParam({ name: 'id', required: true, type: String })
  @UseGuards(SubscriptionGuard)
  @Get(':id')
  findOne(@Param() {id}:isValidObjectid, @Req() req) {
    return this.productsService.findOne(id, req["subscription"]);
  }

  @ApiOperation({ summary: 'Update a product by id' })
  @ApiOkResponse({ description: 'Product updated successfully', example: { name: 'Laptop', price: 899.99, description: 'An Updated laptop' } })
  @ApiParam({ name: 'id', required: true, type: String })
  @Patch(':id')
  update(@Param() {id}: isValidObjectid, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(id, updateProductDto);
  }

  @ApiOperation({ summary: 'Delete a product by id' })
  @ApiOkResponse({ description: 'Product deleted successfully', example: { success: true, product: { name: 'Laptop', price: 999.99, description: 'A Great laptop' } } })
  @ApiParam({ name: 'id', required: true, type: String })
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
