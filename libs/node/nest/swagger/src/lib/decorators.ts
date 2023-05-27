import {
  applyDecorators,
  Controller,
  Delete,
  Get,
  Post,
  Put,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { capitalize } from 'lodash';

function getApiQuery(projection: any) {
  return ApiQuery({
    description: 'A list of projections for mongodb queries',
    name: 'projection',
    required: false,
    isArray: true,
    enum: projection,
  });
}

export function ControllerDecorators(name: string) {
  return applyDecorators(Controller(name), ApiTags(capitalize(name)));
}

export function SwaggerGetDecorators<T>(
  projection: any,
  response: any,
  searchType: any
) {
  return applyDecorators(
    Get(),
    ApiOkResponse({
      description: 'The resources has been successfully retrieved',
      type: response,
      isArray: true,
    }),
    ApiQuery({
      description: 'A list of projections for mongodb queries',
      name: 'search',
      type: searchType,
    }),
    ApiQuery({
      description: 'Limit of items to fetch',
      name: 'limit',
      required: false,
      type: Number,
      example: 0,
      examples: {
        low: {
          value: 10,
          description: 'ten value',
          summary: 'A sample limit value 10',
        },
        high: {
          value: 50,
          description: 'fifty value',
          summary: 'A sample limit value 50',
        },
      },
    }),
    getApiQuery(projection)
    // ApiNotFoundResponse(),
  );
}

export function SwaggerGetByIdDecorators(projection: any, response: any) {
  return applyDecorators(
    Get(':id'),
    getApiQuery(projection),
    ApiOkResponse({
      description: 'The resources has been successfully retrieved',
      type: response,
    })
  );
}

export function SwaggerDeleteByIdDecorators() {
  return applyDecorators(
    Delete(':id'),
    ApiOkResponse({
      description: 'The resource has been successfully deleted',
      type: String,
    }),
    ApiParam({
      description: 'Resource id to delete',
      name: 'id',
    }),
    ApiNotFoundResponse()
  );
}

export function SwaggerPostDecorators(type: any) {
  return applyDecorators(
    Post(),
    ApiCreatedResponse({
      description: 'The record has been successfully created.',
      type: type,
    }),
    ApiBadRequestResponse()
  );
}

export function SwaggerPutDecorators(type: any) {
  return applyDecorators(
    Put(':id'),
    ApiOkResponse({
      description: 'The resources has been successfully updated',
      type: type,
    }),
    ApiNotFoundResponse()
  );
}
