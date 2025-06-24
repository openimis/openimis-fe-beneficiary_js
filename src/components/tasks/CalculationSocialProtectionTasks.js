import React from 'react';
import { FormattedMessage } from '@openimis/fe-core';

const CalculationSocialProtectionTableHeaders = () => [
  <FormattedMessage module="beneficiary" id="bill.code" />,
  <FormattedMessage module="beneficiary" id="bill.name" />,
  <FormattedMessage module="beneficiary" id="bill.totalAmount" />,
  <FormattedMessage module="beneficiary" id="bill.dateValidFrom" />,
  <FormattedMessage module="beneficiary" id="bill.dateValidTo" />,
];

const CalculationSocialProtectionItemFormatters = () => [
  (bill) => bill?.code,
  (bill) => bill?.name,
  (bill) => bill?.totalAmount,
  (bill) => bill?.dateValidFrom,
  (bill) => bill?.dateValidTo,
];

export { CalculationSocialProtectionTableHeaders, CalculationSocialProtectionItemFormatters };
