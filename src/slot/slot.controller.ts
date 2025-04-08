import { Controller, Get, Post, Body, Req, UseGuards } from '@nestjs/common';
import { SlotService } from './slot.service';
import { CreateSlotDto } from './dto/create-slot.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from 'src/common/enums/role.enum';
import { RolesGuard } from 'src/common/guards/roles.guard';

@Controller('slot')
export class SlotController {
  constructor(private readonly slotService: SlotService) { }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.SUPER_ADMIN)
  @Post()
  create(@Body() createSlotDto: CreateSlotDto, @Req() req: any) {
    const doctorId = req.user.id;
    return this.slotService.create(createSlotDto, doctorId);
  }

  @Get()
  findAll() {
    return this.slotService.findAll();
  }

}
