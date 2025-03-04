import { plugin } from 'nexus';
import { printedGenTyping, printedGenTypingImport } from 'nexus/dist/utils';
import { ValidateOptions } from 'yup/lib/types';

import { ValidatePluginErrorConfig, ValidationError } from './error';
import { resolver } from './resolver';

const ValidateResolverImport = printedGenTypingImport({
  module: '@joosepalviste/nexus-validate',
  bindings: ['ValidateResolver'],
});

const fieldDefTypes = printedGenTyping({
  optional: true,
  name: 'validate',
  description: 'Validate mutation arguments.',
  type: 'ValidateResolver<TypeName, FieldName>',
  imports: [ValidateResolverImport],
});

export interface ValidatePluginConfig {
  formatError?: (config: ValidatePluginErrorConfig) => Error;
  yupValidateOptions?: ValidateOptions;
}

export const validatePlugin = (validateConfig: ValidatePluginConfig = {}) => {
  return plugin({
    name: 'NexusValidate',
    description: 'The validate plugin provides validation for arguments.',
    fieldDefTypes: fieldDefTypes,
    onCreateFieldResolver: resolver(validateConfig),
  });
};

export * from './resolver';
export * from './error';
export { ValidationError };
