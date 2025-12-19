import {
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Param,
  Body,
  Req,
} from '@nestjs/common';
import { IssuesService } from './issues.service';
import { CreateIssueDto } from './dto/create-issue.dto';
import { UpdateIssueDto } from './dto/update-issue.dto';

@Controller('issues')
export class IssuesController {
  constructor(private readonly issuesService: IssuesService) {}

  @Post()
  create(@Body() dto: CreateIssueDto, @Req() req) {
    return this.issuesService.create(dto, req.user);
  }

  @Get()
  findAll(@Req() req) {
    return this.issuesService.findAll(req.user);
  }

  @Get(':id')
  findOne(@Param('id') id: number, @Req() req) {
    return this.issuesService.findOne(+id, req.user);
  }

  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() dto: UpdateIssueDto,
    @Req() req,
  ) {
    return this.issuesService.update(+id, dto, req.user);
  }

  @Delete(':id')
  delete(@Param('id') id: number, @Req() req) {
    return this.issuesService.delete(+id, req.user);
  }
}
