import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CategoryEntity } from './category.entity';
import { CategoryCreateDto } from './dto/create-category.dto';
import { CategoryUpdateDto } from './dto/update-category.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categoryRepository: Repository<CategoryEntity>,
  ) {}

  async createCategory(
    categoryCreateDto: CategoryCreateDto,
  ): Promise<CategoryEntity> {
    const category = this.categoryRepository.create(categoryCreateDto);
    await this.categoryRepository.save(category);
    return category;
  }

  async getAllCategories(): Promise<CategoryEntity[]> {
    const categories = await this.categoryRepository.find();
    return categories;
  }

  async getOneCategory(id: number): Promise<CategoryEntity> {
    const category = await this.categoryRepository.findOneBy({ id });
    if (!category) {
      throw new NotFoundException(`Category with id ${id} not found`);
    }
    return category;
  }

  async updateCategory(
    id: number,
    categoryUpdateDto: CategoryUpdateDto,
  ): Promise<CategoryEntity> {
    const category = await this.categoryRepository.findOneBy({ id });
    if (!category) {
      throw new NotFoundException(`Category with id ${id} not found`);
    }
    const updatedCategory = this.categoryRepository.merge(
      category,
      categoryUpdateDto,
    );
    await this.categoryRepository.save(updatedCategory);
    return updatedCategory;
  }

  async deleteCategory(id: number): Promise<void> {
    const category = await this.categoryRepository.findOneBy({ id });
    if (!category) {
      throw new Error(`Category with id ${id} not found`);
    }
    if (this.hasTransactions(id)) {
      throw new Error(
        `Category with id ${id} has transactions and cannot be deleted`,
      );
    }
  }

  async hasTransactions(id: number): Promise<boolean> {
    const bank = await this.categoryRepository.findOne({
      where: { id: id },
      relations: ['transactions'],
    });
    return !!bank.transactions.length;
  }
}
