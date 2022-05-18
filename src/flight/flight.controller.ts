import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { FlightService } from './flight.service';
import { CreateFlightDto } from './dto/create-flight.dto';
import { UpdateFlightDto } from './dto/update-flight.dto';

@Controller('flight')
export class FlightController {
  constructor(private readonly flightService: FlightService) {}
  @Post('/create')
  async create(@Body() createFlightDto: CreateFlightDto) {
    return this.flightService.create(createFlightDto);
  }
  @Get()
  async find() {
    return this.flightService.findAll();
  }
  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateFlightDto: UpdateFlightDto,
  ) {
    return this.flightService.update(id, updateFlightDto);
  }

  @Delete(':id')
  async Delete(@Param('id') id: number) {
    return this.flightService.remove(id);
  }
  @Get(':departure')
  async findFlightNoPlace(@Param('departure') departure: string) {
    return this.flightService.findByDepartureNoPlace(departure);
  }
}
