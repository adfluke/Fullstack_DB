import { Injectable } from '@nestjs/common';
import { CreateFlightDto } from './dto/create-flight.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Flight } from './entities/flight.entity';
import { InjectConnection } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { UpdateFlightDto } from './dto/update-flight.dto';

@Injectable()
export class FlightService {
  constructor(
    @InjectRepository(Flight)
    private flightsRepository: Repository<Flight>,
    @InjectConnection()
    private readonly connection: Connection,
  ) {}
  async create(createFlightDto: CreateFlightDto) {
    return this.flightsRepository.save(createFlightDto);
  }

  async findAll(): Promise<Flight[]> {
    return this.flightsRepository.find();
  }
  async update(id: number, updateFlightDto: UpdateFlightDto) {
    return this.flightsRepository.update(id, updateFlightDto);
  }

  async remove(id: number): Promise<void> {
    await this.flightsRepository.delete(id);
  }
  async findByDepartureNoPlace(departure: string): Promise<Flight> {
    return this.connection.query(
      `SELECT * FROM flight WHERE flight.departure = "${departure}"`,
    );
  }
}
