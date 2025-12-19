import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Issue } from './issue.entity';
import { ActivityLog } from '../activity/activity.entity';

@Injectable()
export class IssuesService {
  constructor(
    @InjectRepository(Issue)
    private readonly issueRepo: Repository<Issue>,
    @InjectRepository(ActivityLog)
    private readonly activityRepo: Repository<ActivityLog>,
  ) {}

  create(dto, user) {
    return this.issueRepo.save({
      ...dto,
      status: 'OPEN',
      organizationId: user.organizationId,
    });
  }

  findAll(user) {
    return this.issueRepo.find({
      where: { organizationId: user.organizationId },
    });
  }

  async findOne(id: number, user) {
    const issue = await this.issueRepo.findOne({
      where: { id, organizationId: user.organizationId },
    });
    if (!issue) throw new NotFoundException('Issue not found');
    return issue;
  }

  async update(id: number, dto, user) {
    if (user.role !== 'ADMIN') {
      throw new ForbiddenException('Only ADMIN can update issues');
    }

    const issue = await this.findOne(id, user);

    if (dto.status && dto.status !== issue.status) {
      await this.activityRepo.save({
        issueId: id,
        action: `Status changed to ${dto.status}`,
        performedBy: user.userId,
        organizationId: user.organizationId,
      });
    }

    if (dto.assigneeId && dto.assigneeId !== issue.assigneeId) {
      await this.activityRepo.save({
        issueId: id,
        action: `Assigned to ${dto.assigneeId}`,
        performedBy: user.userId,
        organizationId: user.organizationId,
      });
    }

    Object.assign(issue, dto);
    return this.issueRepo.save(issue);
  }

  async delete(id: number, user) {
    if (user.role !== 'ADMIN') {
      throw new ForbiddenException('Only ADMIN can delete issues');
    }

    const issue = await this.findOne(id, user);
    return this.issueRepo.remove(issue);
  }
}
