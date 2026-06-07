import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();

    // Здесь мы проверяем, приходит ли Authorization header вообще.
    console.log('Authorization header:', request.headers.authorization);

    return super.canActivate(context);
  }

  handleRequest<TUser = unknown>(
    err: unknown,
    user: TUser,
    info: unknown,
  ): TUser {
    // Здесь мы смотрим, почему Guard не пропускает request.
    console.log('JWT Guard error:', err);
    console.log('JWT Guard user:', user);
    console.log('JWT Guard info:', info);

    if (err || !user) {
      throw err || new UnauthorizedException();
    }

    return user;
  }
}
