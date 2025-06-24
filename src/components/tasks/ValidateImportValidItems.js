import React from 'react';
import { FormattedMessage } from '@openimis/fe-core';

const ValidateImportValidItemsTaskTableHeaders = () => [
  <FormattedMessage module="beneficiary" id="benefitUploadRecord.benefitPlanCode" />,
  <FormattedMessage module="beneficiary" id="benefitUploadRecord.sourceName" />,
  <FormattedMessage module="beneficiary" id="benefitUploadRecord.workflow" />,
  <FormattedMessage module="beneficiary" id="benefitUploadRecord.percentageOfInvalidItems" />,
];

const ValidateImportValidItemsItemFormatters = () => [
  (dataUpload, jsonExt) => jsonExt?.benefit_plan_code,
  (dataUpload, jsonExt) => jsonExt?.source_name,
  (dataUpload, jsonExt) => jsonExt?.workflow,
  (dataUpload, jsonExt) => `${jsonExt?.percentage_of_invalid_items ?? 0} %`,
];

export { ValidateImportValidItemsTaskTableHeaders, ValidateImportValidItemsItemFormatters };
