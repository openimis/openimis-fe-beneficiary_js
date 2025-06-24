import React from 'react';
import { FormattedMessage } from '@openimis/fe-core';

const BeneficiaryTaskTableHeaders = () => [
  <FormattedMessage module="beneficiary" id="beneficiary.task.individual.id" />,
  <FormattedMessage module="beneficiary" id="beneficiary.task.benefitPlan.id" />,
  <FormattedMessage module="beneficiary" id="beneficiary.status" />,
];

const BeneficiaryTaskItemFormatters = () => [
  (beneficiary) => beneficiary?.id,
  (beneficiary) => beneficiary?.benefit_plan_id,
  (beneficiary) => beneficiary?.status,
];

export { BeneficiaryTaskTableHeaders, BeneficiaryTaskItemFormatters };
