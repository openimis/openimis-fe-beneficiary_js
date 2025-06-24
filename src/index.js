// Disable due to core architecture
/* eslint-disable camelcase */
/* eslint-disable import/prefer-default-export */
import flatten from 'flat';
import React from 'react';
import { FormattedMessage } from '@openimis/fe-core';
import messages_en from './translations/en.json';
import reducer from './reducer';
import BenefitPackagePage from './pages/BenefitPackagePage';
import BeneficiaryStatusPicker from './pickers/BeneficiaryStatusPicker';
import {
  BenefitPlanBeneficiariesTabPanel,
  BenefitPlanBeneficiariesTabLabel,
} from './components/BenefitPlanBeneficiariesTabPanel';
import {
  BenefitPlanBeneficiariesListTabPanel,
  BenefitPlanBeneficiariesListTabLabel,
} from './components/BenefitPlanBeneficiariesListTab';
import {
  BenefitPlanBeneficiariesActiveTabLabel,
  BenefitPlanBeneficiariesActiveTabPanel,
} from './components/BenefitPlanBeneficiariesActiveTab';
import {
  BenefitPlanBeneficiariesPotentialTabLabel,
  BenefitPlanBeneficiariesPotentialTabPanel,
} from './components/BenefitPlanBeneficiariesPotentialTab';
import {
  BenefitPlanBeneficiariesSuspendedTabLabel,
  BenefitPlanBeneficiariesSuspendedTabPanel,
} from './components/BenefitPlanBeneficiariesSuspendedTab';
import {
  BenefitPlanBeneficiariesGraduatedTabLabel,
  BenefitPlanBeneficiariesGraduatedTabPanel,
} from './components/BenefitPlanBeneficiariesGraduatedTab';
import {
  BenefitPackageBenefitsTabLabel,
  BenefitPackageBenefitsTabPanel,
} from './components/BenefitPackageBenefitsTab';
import {
  BenefitPackageGrievancesTabLabel,
  BenefitPackageGrievancesTabPanel,
} from './components/BenefitPackageGrievancesTab';
import BenefitPlanSearcherForEntities from './components/BenefitPlanSearcherForEntities';
import { BenefitPackageMembersTabLabel, BenefitPackageMembersTabPanel } from './components/BenefitPackageMembersTab';
import { BeneficiaryTaskItemFormatters, BeneficiaryTaskTableHeaders } from './components/tasks/BeneficiaryTasks';
import {
  CalculationSocialProtectionItemFormatters,
  CalculationSocialProtectionTableHeaders,
} from './components/tasks/CalculationSocialProtectionTasks';
import {
  UploadResolutionTaskTableHeaders,
  UploadResolutionItemFormatters,
  UploadConfirmationPanel,
} from './components/tasks/BeneficiaryUploadApprovalTask';
import BeneficiaryPicker from './pickers/BeneficiaryPicker';

const ROUTE_BENEFIT_PLAN = 'benefitPlans/benefitPlan';
const ROUTE_BENEFIT_PACKAGE = 'benefitPackage';

const DEFAULT_CONFIG = {
  translations: [{ key: 'en', messages: flatten(messages_en) }],
  reducers: [{ key: 'beneficiary', reducer }],
  'core.Router': [
    {
      path: `${ROUTE_BENEFIT_PLAN}/:benefit_plan_uuid?/${ROUTE_BENEFIT_PACKAGE}/individual/:beneficiary_uuid?`,
      component: BenefitPackagePage,
    },
    {
      path: `${ROUTE_BENEFIT_PLAN}/:benefit_plan_uuid?/${ROUTE_BENEFIT_PACKAGE}/group/:group_beneficiaries_uuid?`,
      component: BenefitPackagePage,
    },
  ],
  refs: [
    { key: 'beneficiary.route.benefitPackage', ref: ROUTE_BENEFIT_PACKAGE },
    { key: 'beneficiary.BeneficiaryStatusPicker', ref: BeneficiaryStatusPicker },
    { key: 'beneficiary.BenefitPlanSearcherForEntities', ref: BenefitPlanSearcherForEntities },
    { key: 'beneficiary.BeneficiaryPicker', ref: BeneficiaryPicker },
  ],
  'benefitPlan.TabPanel.label': [
    BenefitPlanBeneficiariesTabLabel,
  ],
  'benefitPlan.TabPanel.panel': [
    BenefitPlanBeneficiariesTabPanel,
  ],
  'benefitPlan.BeneficiaryTabPanel.label': [
    BenefitPlanBeneficiariesListTabLabel,
    BenefitPlanBeneficiariesPotentialTabLabel,
    BenefitPlanBeneficiariesActiveTabLabel,
    BenefitPlanBeneficiariesGraduatedTabLabel,
    BenefitPlanBeneficiariesSuspendedTabLabel,
  ],
  'benefitPlan.BeneficiaryTabPanel.panel': [
    BenefitPlanBeneficiariesListTabPanel,
    BenefitPlanBeneficiariesPotentialTabPanel,
    BenefitPlanBeneficiariesActiveTabPanel,
    BenefitPlanBeneficiariesGraduatedTabPanel,
    BenefitPlanBeneficiariesSuspendedTabPanel,
  ],
  'benefitPackage.TabPanel.label': [
    BenefitPackageMembersTabLabel,
    BenefitPackageBenefitsTabLabel,
    BenefitPackageGrievancesTabLabel,
  ],
  'benefitPackage.TabPanel.panel': [
    BenefitPackageMembersTabPanel,
    BenefitPackageBenefitsTabPanel,
    BenefitPackageGrievancesTabPanel,
  ],
  'tasksManagement.tasks': [{
    text: <FormattedMessage module="beneficiary" id="beneficiary.tasks.title" />,
    tableHeaders: BeneficiaryTaskTableHeaders,
    itemFormatters: BeneficiaryTaskItemFormatters,
    taskSource: ['BeneficiaryService'],
  },
  {
    text: <FormattedMessage module="beneficiary" id="calculation.tasks.title" />,
    tableHeaders: CalculationSocialProtectionTableHeaders,
    itemFormatters: CalculationSocialProtectionItemFormatters,
    taskSource: ['calcrule_social_protection'],
  },
  {
    text: <FormattedMessage module="beneficiary" id="validation_import_valid_items.tasks.title" />,
    tableHeaders: UploadResolutionTaskTableHeaders,
    itemFormatters: UploadResolutionItemFormatters,
    taskSource: ['import_valid_items'],
    confirmationPanel: UploadConfirmationPanel,
  },
  ],
};

export const BeneficiaryModule = (cfg) => ({ ...DEFAULT_CONFIG, ...cfg });
