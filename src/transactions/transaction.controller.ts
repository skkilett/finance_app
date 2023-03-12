import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { TransactionCreateDto } from './dto/create-transaction.dto';
import { TransactionResponseDto } from './dto/response-transaction.dto';
import { TransactionsResponseDto } from './dto/response-transactions.dto';
import { TransactionService } from './transaction.service';
import { StatisticsResponseDto } from './dto/statistics-dto/statistics -response.dto';
import { StatisticsRequestDto } from './dto/statistics-dto/statistics-request.dto';

@ApiTags('Transaction')
@Controller('transactions')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @ApiOperation({ summary: 'Create a new transaction' })
  @ApiCreatedResponse({ type: TransactionResponseDto })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @Post()
  async create(
    @Body() transactionCreateDto: TransactionCreateDto,
  ): Promise<TransactionResponseDto> {
    const transaction = await this.transactionService.createTransaction(
      transactionCreateDto,
    );
    console.log(transaction.categories);
    return new TransactionResponseDto(transaction);
  }

  @ApiOperation({ summary: 'Get all transactions' })
  @ApiOkResponse({ type: TransactionsResponseDto })
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'perPage', required: false })
  @Get()
  async getAllTransactions(
    @Query('page', ParseIntPipe) page?: number,
    @Query('perPage', ParseIntPipe) perPage?: number,
  ): Promise<TransactionsResponseDto> {
    const transactions = await this.transactionService.getAllTransactions(
      page,
      perPage,
    );
    return new TransactionsResponseDto(transactions);
  }

  @ApiOperation({ summary: 'Delete a transaction by ID' })
  @ApiParam({ name: 'id', type: Number, description: 'Transaction ID' })
  @ApiOkResponse({ description: 'Transaction deleted successfully' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.transactionService.deleteTransaction(id);
  }

  @Get('statistics')
  @ApiOkResponse({ type: StatisticsResponseDto })
  async getStatistics(
    @Body() statisticsRequestDto: StatisticsRequestDto,
  ): Promise<StatisticsResponseDto> {
    const statistics = await this.transactionService.getStatistics(
      statisticsRequestDto,
    );
    return new StatisticsResponseDto(statistics);
  }
}
