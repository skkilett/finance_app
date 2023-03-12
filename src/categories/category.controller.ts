import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { CategoryCreateDto } from './dto/create-category.dto';
import { CategoryResponseDto } from './dto/response-category.dto';
import { CategoryUpdateDto } from './dto/update-category.dto';
import { CategoriesResponseDto } from './dto/response-categories.dto';
import { CategoriesService } from './category.service';

@ApiTags('Category')
@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoriesService) {}

  @ApiOperation({ summary: 'Create a new category' })
  @ApiCreatedResponse({ type: CategoryResponseDto })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @Post()
  async create(
    @Body() categoryCreateDto: CategoryCreateDto,
  ): Promise<CategoryResponseDto> {
    const category = await this.categoryService.createCategory(
      categoryCreateDto,
    );
    return new CategoryResponseDto(category);
  }

  @ApiOperation({ summary: 'Get all categories' })
  @ApiOkResponse({ type: CategoriesResponseDto })
  @Get()
  async getAll(): Promise<CategoriesResponseDto> {
    const categories = await this.categoryService.getAllCategories();
    return new CategoriesResponseDto(categories);
  }

  @ApiOperation({ summary: 'Get a category by ID' })
  @ApiParam({ name: 'id', type: Number, description: 'Category ID' })
  @ApiOkResponse({ type: CategoryResponseDto })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @Get(':id')
  async getOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<CategoryResponseDto> {
    const category = await this.categoryService.getOneCategory(id);
    return new CategoryResponseDto(category);
  }

  @ApiOperation({ summary: 'Update a category by ID' })
  @ApiParam({ name: 'id', type: Number, description: 'Category ID' })
  @ApiOkResponse({ type: CategoryResponseDto })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() categoryUpdateDto: CategoryUpdateDto,
  ): Promise<CategoryResponseDto> {
    const category = await this.categoryService.updateCategory(
      id,
      categoryUpdateDto,
    );
    return new CategoryResponseDto(category);
  }

  @ApiOperation({ summary: 'Delete a category by ID' })
  @ApiParam({ name: 'id', type: Number, description: 'Category ID' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.categoryService.deleteCategory(id);
  }
}
