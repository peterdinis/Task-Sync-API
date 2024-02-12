import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('app')
@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @ApiOperation({
        description: 'Simple endpoint that return Hello World',
    })
    @ApiResponse({
        status: 200,
    })
    @Get()
    getHello(): string {
        return this.appService.getHello();
    }
}
