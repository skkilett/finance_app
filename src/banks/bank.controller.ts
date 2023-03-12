/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { BankResponseDto } from './dto/response-bank.dto';
import { BanksResponseDto } from './dto/response-banks.dto';
import { BankCreateDto } from './dto/create-bank.dto';
import { BankUpdateDto } from './dto/update-bank.dto';
import { BankService } from './bank.service';
import { BankEntity } from './bank.entity';

@ApiTags('banks')
@Controller('banks')
export class BankController {
  constructor(private readonly bankService: BankService) {}

  @Get()
  @ApiOperation({ summary: 'Get all banks' })
  @ApiOkResponse({ type: BanksResponseDto })
  async getAllBanks(): Promise<BanksResponseDto> {
    const banks: BankEntity[] = await this.bankService.getAllBanks();
    return new BanksResponseDto(banks);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get bank by ID' })
  @ApiOkResponse({ type: BankResponseDto })
  @ApiNotFoundResponse({ description: 'Bank not found' })
  @ApiParam({ name: 'id', type: Number })
  async getBankById(@Param('id') id: number): Promise<BankResponseDto> {
    const bank: BankResponseDto = await this.bankService.getBankById(id);
    return new BankResponseDto(bank);
  }

  @Post()
  @ApiOperation({ summary: 'Create new bank' })
  @ApiOkResponse({ type: BankResponseDto })
  @ApiBadRequestResponse({ description: 'Invalid bank data provided' })
  async createBank(@Body() bankDto: BankCreateDto): Promise<BankResponseDto> {
    const bank: BankResponseDto = await this.bankService.createBank(bankDto);
    return new BankResponseDto(bank);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update existing bank' })
  @ApiOkResponse({ type: BankResponseDto })
  @ApiBadRequestResponse({ description: 'Invalid bank data provided' })
  @ApiNotFoundResponse({ description: 'Bank not found' })
  @ApiParam({ name: 'id', type: Number })
  async updateBank(
    @Param('id') id: number,
    @Body() bankDto: BankUpdateDto,
  ): Promise<BankResponseDto> {
    const bank: BankResponseDto = await this.bankService.updateBank(id, bankDto);
    return new BankResponseDto(bank);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete existing bank' })
  @ApiOkResponse({ description: 'Bank deleted successfully' })
  @ApiNotFoundResponse({ description: 'Bank not found' })
  @ApiParam({ name: 'id', type: Number })
  async deleteBank(@Param('id') id: number): Promise<void> {
    await this.bankService.deleteBank(id);
  }
}
