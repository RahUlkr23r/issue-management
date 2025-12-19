import { IsOptional } from 'class-validator';

export class UpdateIssueDto {
  @IsOptional()
  status?: string;

  @IsOptional()
  assigneeId?: string;
}
