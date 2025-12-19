import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class UserContextGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();

    request.user = {
      userId: request.headers['x-user-id'],
      organizationId: request.headers['x-org-id'],
      role: request.headers['x-user-role'],
    };

    return true;
  }
}
